'use client';

import React, { useState } from 'react';
import { collection, getDocs, query, where, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useProfile } from '@/components/profile-provider';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  RefreshCw, CheckCircle2, AlertTriangle, ArrowRight,
  Loader2, PackageSearch, Truck, Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ─────────────────────────────────────────────────────────────────────────────
// Infer warehouse from shipment origin address
// ─────────────────────────────────────────────────────────────────────────────
function inferWarehouse(origin: string = ''): {
  location: 'UK Warehouse' | 'US Warehouse' | 'Lagos Warehouse' | 'Out of State';
  region: 'UK' | 'US' | 'NG';
} {
  const o = origin.toLowerCase();
  if (o.includes('united kingdom') || o.includes('uk')) return { location: 'UK Warehouse', region: 'UK' };
  if (o.includes('united states') || o.includes('usa')) return { location: 'US Warehouse', region: 'US' };
  return { location: 'Lagos Warehouse', region: 'NG' };
}

interface ShipmentRow {
  docId: string;
  id: string;
  customerName: string;
  customerEmail: string;
  customerId: string;
  customerPhone: string;
  originAddress: string;
  packages: any[];
  bookingDate: Date;
  status: string;
  synced?: boolean;
  syncing?: boolean;
  error?: string;
}

export default function SyncShipmentsPage() {
  const { profile: adminProfile } = useProfile();
  const [rows, setRows] = useState<ShipmentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [scanned, setScanned] = useState(false);

  // ── Step 1: scan for unsynced shipments ────────────────────────────────────
  const handleScan = async () => {
    setLoading(true);
    setRows([]);
    setScanned(false);

    try {
      // Get all shipment IDs already linked in package_receipts
      const receiptSnap = await getDocs(
        query(collection(db, 'package_receipts'), where('source', '==', 'ship.countycargo.com'))
      );
      const syncedShipmentIds = new Set(
        receiptSnap.docs.map(d => d.data().assignedShipment).filter(Boolean)
      );

      // Get all import shipments
      const shipSnap = await getDocs(
        query(collection(db, 'shipments'), where('shipmentType', '==', 'import'))
      );

      const unsynced: ShipmentRow[] = [];

      for (const d of shipSnap.docs) {
        const data = d.data();
        const sid = data.id as string;

        // Skip if already synced
        if (syncedShipmentIds.has(sid)) continue;

        const bookingDate = data.bookingDate?.toDate?.() ?? new Date();

        unsynced.push({
          docId: d.id,
          id: sid,
          customerName: `${data.customer?.firstname ?? ''} ${data.customer?.lastname ?? ''}`.trim() || data.email || '—',
          customerEmail: data.customer?.email || data.email || '',
          customerId: data.userId || data.customer?.uid || '',
          customerPhone: data.customer?.phone_number || '',
          originAddress: data.originAddress || '',
          packages: data.packages || [],
          bookingDate,
          status: data.status || 'Unpaid',
        });
      }

      // Sort newest first
      unsynced.sort((a, b) => b.bookingDate.getTime() - a.bookingDate.getTime());
      setRows(unsynced);
      setScanned(true);

      toast({
        title: `Scan Complete`,
        description: unsynced.length
          ? `Found ${unsynced.length} shipment(s) not yet in Inbound.`
          : 'All shipments are already synced! ✅',
      });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Scan failed', description: e.message });
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: sync a single row ──────────────────────────────────────────────
  const syncRow = async (row: ShipmentRow) => {
    if (!adminProfile) return;

    setRows(prev => prev.map(r => r.docId === row.docId ? { ...r, syncing: true, error: undefined } : r));

    try {
      const { location, region } = inferWarehouse(row.originAddress);
      const now = Timestamp.now();

      const pkgPromises = (row.packages.length > 0 ? row.packages : [{}]).map((pkg: any, idx: number) =>
        addDoc(collection(db, 'package_receipts'), {
          // Customer
          customerId:    row.customerId,
          customerName:  row.customerName,
          customerEmail: row.customerEmail,
          customerPhone: row.customerPhone,

          // Package
          trackingNumber: pkg.trackingNumber || `${row.id}-PKG${idx + 1}`,
          weight:  pkg.weight ?? 0,
          length:  pkg.length ?? null,
          width:   pkg.width  ?? null,
          height:  pkg.height ?? null,
          comment: pkg.description || '',
          qty:     1,
          courier: '',
          sender:  '',

          // Location
          location,
          region,

          // Status
          status:             'inbound',
          verificationStatus: 'pending',
          verified:           false,
          visibleToCustomer:  true,

          // Shipment link
          assignedShipment:  row.id,
          weeklyShipmentId:  null,

          // Invoice
          invoiceId:     null,
          invoiceStatus: 'unpaid',

          // Notification
          notifiedAt:        now,
          notifiedCustomer:  false,
          notificationSent:  false,
          notificationSentAt: null,
          notifiedBy: {
            uid:  adminProfile.uid,
            name: `${adminProfile.firstname} ${adminProfile.lastname}`,
          },

          // Source
          source:    'ship.countycargo.com',
          receiptId: `RCP-${Math.floor(10000 + Math.random() * 90000)}`,

          // Meta
          createdAt: now,
          updatedAt: now,
          statusHistory: [{
            status:    'inbound',
            timestamp: now,
            updatedBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
            note:      `Synced from shipment ${row.id} by admin.`,
          }],
        })
      );

      await Promise.all(pkgPromises);

      setRows(prev => prev.map(r => r.docId === row.docId ? { ...r, syncing: false, synced: true } : r));
    } catch (e: any) {
      setRows(prev => prev.map(r => r.docId === row.docId ? { ...r, syncing: false, error: e.message } : r));
    }
  };

  // ── Step 2 (bulk): sync all unsynced rows ──────────────────────────────────
  const handleSyncAll = async () => {
    if (!adminProfile) return;
    const pending = rows.filter(r => !r.synced);
    if (!pending.length) return;

    setSyncing(true);
    let done = 0;
    for (const row of pending) {
      await syncRow(row);
      done++;
    }
    setSyncing(false);
    toast({ title: `✅ Sync Complete`, description: `${done} shipment(s) imported to Inbound.` });
  };

  const unsyncedCount = rows.filter(r => !r.synced).length;
  const syncedCount = rows.filter(r => r.synced).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl text-blue-950 tracking-tight flex items-center gap-2">
            <Globe className="h-7 w-7 text-blue-500" />
            Sync from ship.countycargo.com
          </h1>
          <p className="text-sm text-blue-700/70 font-medium mt-1">
            Import existing customer shipments into the Inbound Packages dashboard.
            All new shipments sync automatically — this is for historic records only.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={handleScan}
            disabled={loading}
            variant="outline"
            className="rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50 gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageSearch className="h-4 w-4" />}
            Scan for Unsynced
          </Button>

          {unsyncedCount > 0 && (
            <Button
              onClick={handleSyncAll}
              disabled={syncing}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 shadow-lg shadow-blue-200"
            >
              {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Sync All ({unsyncedCount})
            </Button>
          )}
        </div>
      </div>

      {/* How it works banner */}
      <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5 flex flex-col md:flex-row md:items-center gap-4 text-sm text-blue-800">
        <Globe className="h-8 w-8 text-blue-500 shrink-0" />
        <div className="flex-1">
          <p className="font-bold text-blue-900 mb-1">How it works</p>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-700">
            <span className="bg-blue-100 px-2 py-1 rounded-lg">📦 Customer books shipment</span>
            <ArrowRight className="h-3 w-3 text-blue-400" />
            <span className="bg-blue-100 px-2 py-1 rounded-lg">🌐 ship.countycargo.com</span>
            <ArrowRight className="h-3 w-3 text-blue-400" />
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">✅ Auto-syncs to Inbound</span>
            <ArrowRight className="h-3 w-3 text-blue-400" />
            <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded-lg">🚚 Move to Shipment</span>
            <ArrowRight className="h-3 w-3 text-blue-400" />
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">📄 Generate Invoice</span>
          </div>
          <p className="text-xs text-blue-600 mt-2">This page only shows <strong>historic</strong> shipments that were created before the auto-sync was enabled.</p>
        </div>
      </div>

      {/* Stats */}
      {scanned && (
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-blue-100 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-blue-950">{rows.length}</p>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Found</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-amber-700">{unsyncedCount}</p>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mt-1">Pending</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-emerald-700">{syncedCount}</p>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mt-1">Synced</p>
          </div>
        </div>
      )}

      {/* Table */}
      {(loading || rows.length > 0 || scanned) && (
        <div className="rounded-xl border border-blue-200 overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-blue-50/50 border-b border-blue-200/50">
                  <th className="px-4 py-3 text-left font-bold text-blue-900">Shipment ID</th>
                  <th className="px-4 py-3 text-left font-bold text-blue-900">Customer</th>
                  <th className="px-4 py-3 text-left font-bold text-blue-900">Origin</th>
                  <th className="px-4 py-3 text-left font-bold text-blue-900">Pkgs</th>
                  <th className="px-4 py-3 text-left font-bold text-blue-900">Booked</th>
                  <th className="px-4 py-3 text-left font-bold text-blue-900">Status</th>
                  <th className="px-4 py-3 text-center font-bold text-blue-900">Sync</th>
                </tr>
              </thead>
              <tbody>
                {loading && Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td>
                    ))}
                  </tr>
                ))}

                {!loading && rows.map(row => (
                  <tr
                    key={row.docId}
                    className={cn(
                      'border-b border-blue-100/50 transition-colors',
                      row.synced ? 'bg-emerald-50/30' : 'hover:bg-blue-50/30'
                    )}
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-blue-700">{row.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-blue-950">{row.customerName}</p>
                      <p className="text-xs text-muted-foreground">{row.customerEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {row.originAddress || '—'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                        {row.packages.length || 1}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {format(row.bookingDate, 'dd MMM yyyy')}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={cn(
                        'text-xs border-0',
                        row.status === 'Unpaid' ? 'bg-amber-100 text-amber-700' :
                        row.status === 'Awaiting Confirmation' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-600'
                      )}>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.synced ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Synced
                        </span>
                      ) : row.error ? (
                        <span className="inline-flex items-center gap-1 text-xs text-red-500 font-medium" title={row.error}>
                          <AlertTriangle className="h-3.5 w-3.5" /> Failed
                        </span>
                      ) : (
                        <button
                          onClick={() => syncRow(row)}
                          disabled={row.syncing || syncing}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-1.5 transition-all disabled:opacity-50"
                        >
                          {row.syncing
                            ? <Loader2 className="h-3 w-3 animate-spin" />
                            : <Truck className="h-3 w-3" />}
                          Sync to Inbound
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {!loading && scanned && rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-muted-foreground">
                      <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
                      <p className="font-semibold text-emerald-700">All shipments are synced!</p>
                      <p className="text-xs mt-1">Every import shipment already has an Inbound entry.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!scanned && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground gap-4">
          <PackageSearch className="h-16 w-16 opacity-20" />
          <div>
            <p className="font-semibold text-lg">Ready to Scan</p>
            <p className="text-sm">Click "Scan for Unsynced" to find shipments not yet in Inbound.</p>
          </div>
          <Button
            onClick={handleScan}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 shadow-lg shadow-blue-200 mt-2"
          >
            <PackageSearch className="h-4 w-4" />
            Scan Now
          </Button>
        </div>
      )}
    </div>
  );
}
