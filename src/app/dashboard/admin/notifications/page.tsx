'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageReceipt } from '@/lib/types';
import { sendPackageInboundNotification } from '@/lib/user-actions';
import { useProfile } from '@/components/profile-provider';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Search, Bell, CheckCircle2, Send, ExternalLink, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ── County Cargo shipping portal base URL ─────────────────────────────────────
const SHIP_BASE = 'https://ship.countycargo.com';

export default function NotificationsPage() {
  const { profile: adminProfile } = useProfile();
  const [rows, setRows] = useState<PackageReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'pending' | 'sent'>('pending');
  const [notifying, setNotifying] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title = 'Notifications | County Cargo';

    // Fetch all package_receipts that have been logged (all should appear here)
    const unsub = onSnapshot(collection(db, 'package_receipts'), snap => {
      const docs = snap.docs
        .map(d => {
          const data = d.data();
          return {
            ...data,
            docId: d.id,
            notifiedAt: data.notifiedAt
              ? (data.notifiedAt as Timestamp).toDate()
              : new Date(),
          } as PackageReceipt;
        })
        .sort((a, b) => b.notifiedAt.getTime() - a.notifiedAt.getTime());
      setRows(docs);
      setLoading(false);
    }, err => {
      console.error(err);
      setLoading(false);
    });

    return unsub;
  }, []);

  const pending = rows.filter(r => !r.notifiedCustomer && r.notificationStatus !== 'sent');
  const sent = rows.filter(r => r.notifiedCustomer || r.notificationStatus === 'sent');

  const visible = tab === 'pending' ? pending : sent;

  const filtered = useMemo(() => {
    if (!search) return visible;
    const s = search.toLowerCase();
    return visible.filter(r =>
      r.customerName?.toLowerCase().includes(s) ||
      r.trackingNumber?.toLowerCase().includes(s) ||
      r.customerEmail?.toLowerCase().includes(s)
    );
  }, [visible, search]);

  const handleResend = async (row: PackageReceipt) => {
    if (!adminProfile) return;
    setNotifying(prev => new Set(prev).add(row.docId));
    try {
      await sendPackageInboundNotification({ receipt: row, adminProfile });
      toast({ title: 'Notification Sent', description: `${row.customerName} has been notified.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setNotifying(prev => { const s = new Set(prev); s.delete(row.docId); return s; });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl md:text-3xl text-blue-950 tracking-tight">Notifications</h1>
        <p className="text-sm text-blue-700/70 font-medium">
          All customer package notifications. Tracking links open on{' '}
          <a
            href={SHIP_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline underline-offset-2 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
          >
            ship.countycargo.com <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border-2 border-blue-100 bg-white p-4 text-center shadow-sm">
          <p className="text-3xl font-black text-blue-950">{rows.length}</p>
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Total Packages</p>
        </div>
        <div className="rounded-2xl border-2 border-amber-100 bg-white p-4 text-center shadow-sm">
          <p className="text-3xl font-black text-amber-700">{pending.length}</p>
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mt-1">Pending Notification</p>
        </div>
        <div className="rounded-2xl border-2 border-emerald-100 bg-white p-4 text-center shadow-sm">
          <p className="text-3xl font-black text-emerald-700">{sent.length}</p>
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mt-1">Notified</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-blue-50/50 rounded-xl border border-blue-100/50 w-fit">
        {[
          { id: 'pending', label: 'Pending', count: pending.length },
          { id: 'sent', label: 'Sent', count: sent.length },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border shadow-sm',
              tab === t.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-blue-100'
                : 'bg-white text-blue-600 border-blue-100 hover:bg-blue-50'
            )}
          >
            {t.label}
            <span className={cn(
              'px-1.5 py-0.5 rounded-lg text-[10px] font-black',
              tab === t.id ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-600'
            )}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white p-3 shadow-sm">
        <Search className="h-4 w-4 text-blue-400 shrink-0" />
        <Input
          placeholder="Search customer name, tracking number, email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-8 text-sm border-0 bg-transparent focus-visible:ring-0 shadow-none"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-blue-200 overflow-hidden shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-blue-50/50 border-b border-blue-200/50">
                <th className="px-4 py-4 text-left font-bold text-blue-900 whitespace-nowrap">Tracking ID</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Customer</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Contact</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Location</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Status</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Notification</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900 whitespace-nowrap">Track on Ship Portal</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Receipt</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900 whitespace-nowrap">Date Added</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-blue-100/50">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td>
                  ))}
                </tr>
              ))}

              {!loading && filtered.map(row => (
                <tr key={row.docId} className="border-b border-blue-200/70 hover:bg-blue-50/50 transition-colors group">
                  {/* Tracking ID */}
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-bold text-blue-700">
                      {row.trackingNumber || '—'}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3 font-semibold text-blue-950">{row.customerName}</td>

                  {/* Contact */}
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div>{row.customerPhone || '—'}</div>
                    <div>{row.customerEmail}</div>
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3 text-xs">{row.location}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <Badge
                      className={cn(
                        'text-xs border-0 capitalize',
                        row.status === 'inbound' ? 'bg-violet-100 text-violet-700' :
                        row.status === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                        row.status === 'shipped' ? 'bg-sky-100 text-sky-700' :
                        row.status === 'delivered' ? 'bg-emerald-200 text-emerald-900' :
                        'bg-amber-100 text-amber-700'
                      )}
                    >
                      {row.status?.replace(/_/g, ' ') || 'inbound'}
                    </Badge>
                  </td>

                  {/* Notification status */}
                  <td className="px-4 py-3">
                    {row.notifiedCustomer || row.notificationStatus === 'sent' ? (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1 text-xs">
                        <CheckCircle2 className="h-3 w-3" /> Sent
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1 text-xs">
                        <Bell className="h-3 w-3" /> Pending
                      </Badge>
                    )}
                  </td>

                  {/* Track Link → ship.countycargo.com */}
                  <td className="px-4 py-3">
                    {row.trackingNumber ? (
                      <a
                        href={`${SHIP_BASE}/track/${encodeURIComponent(row.trackingNumber)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Track Package
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">No tracking #</span>
                    )}
                  </td>

                  {/* Receipt */}
                  <td className="px-4 py-3">
                    {row.receiptId ? (
                      <Link
                        href={`/dashboard/admin/batch-add-package/receipt/${row.receiptId}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:underline transition-colors"
                      >
                        <Printer className="h-3 w-3" />
                        View Receipt
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">—</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {format(row.notifiedAt, 'dd MMM yyyy')}
                  </td>

                  {/* Resend action */}
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleResend(row)}
                      disabled={notifying.has(row.docId)}
                      title={row.notifiedCustomer ? 'Re-send notification' : 'Send notification'}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sky-600 transition-colors disabled:opacity-50"
                    >
                      {notifying.has(row.docId)
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <Send className="h-3.5 w-3.5" />}
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-muted-foreground">
                    <Bell className="h-10 w-10 opacity-20 mx-auto mb-2" />
                    <p className="font-medium">No {tab} notifications</p>
                    <p className="text-xs">
                      {tab === 'pending'
                        ? 'All customers have been notified'
                        : 'No notifications sent yet'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-muted-foreground px-1">
        {filtered.length} package(s) shown · {rows.length} total
      </div>
    </div>
  );
}
