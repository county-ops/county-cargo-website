'use client';

import { useEffect, useState, useMemo } from 'react';
import ShipmentsTable from '../../my-shipments/shipments-table';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shipment } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { format, isValid, startOfDay, endOfDay } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  FileText, Filter, X, CalendarDays, MapPin, Loader2, Download,
} from 'lucide-react';

// ── Locations derived from shipment addresses ─────────────────────────────────
const LOCATION_OPTIONS = [
  { value: 'all',            label: 'All Locations' },
  { value: 'United States',  label: '🇺🇸 United States' },
  { value: 'United Kingdom', label: '🇬🇧 United Kingdom' },
  { value: 'Nigeria',        label: '🇳🇬 Nigeria' },
];

// ── Manifest generator ────────────────────────────────────────────────────────
function generateManifestHTML(shipments: Shipment[], filters: { location: string; dateFrom: string; dateTo: string }): string {
  const now = format(new Date(), 'dd MMM yyyy, HH:mm');
  const rows = shipments.map((s, i) => `
    <tr style="background:${i % 2 === 0 ? '#f8fafc' : '#ffffff'}">
      <td style="padding:8px 12px;border:1px solid #e2e8f0;font-family:monospace;font-weight:bold;color:#1e40af">${s.id}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0">${s.customer?.firstname ?? ''} ${s.customer?.lastname ?? ''}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0">${s.originAddress}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0">${s.destinationAddress}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0;text-transform:capitalize">${s.shipmentType}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0">${s.serviceType}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0">${s.packages?.reduce((t, p) => t + (p.weight ?? 0), 0).toFixed(2)} kg</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0">${s.totalCost ? `₦${Number(s.totalCost).toLocaleString()}` : '—'}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0">${s.status}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0">${s.bookingDate ? format(new Date(s.bookingDate), 'dd MMM yyyy') : '—'}</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html><head>
  <meta charset="utf-8">
  <title>County Cargo — Shipment Manifest</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #1e293b; }
    h1 { color: #1e3a8a; margin-bottom: 4px; }
    .meta { color: #64748b; font-size: 13px; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background: #1e3a8a; color: white; padding: 10px 12px; border: 1px solid #1e40af; text-align: left; }
    tfoot td { background: #f1f5f9; font-weight: bold; padding: 8px 12px; border: 1px solid #e2e8f0; }
    @media print { body { margin: 20px; } }
  </style>
</head><body>
  <h1>County Cargo — Shipment Manifest</h1>
  <div class="meta">
    Generated: ${now} &nbsp;|&nbsp;
    ${filters.location !== 'all' ? `Location: ${filters.location} &nbsp;|&nbsp;` : ''}
    ${filters.dateFrom ? `From: ${filters.dateFrom} &nbsp;|&nbsp;` : ''}
    ${filters.dateTo   ? `To: ${filters.dateTo}` : ''}
    Total shipments: <strong>${shipments.length}</strong>
  </div>
  <table>
    <thead><tr>
      <th>Shipment ID</th><th>Customer</th><th>Origin</th><th>Destination</th>
      <th>Type</th><th>Service</th><th>Weight</th><th>Cost</th><th>Status</th><th>Booked</th>
    </tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr>
      <td colspan="6">Total: ${shipments.length} shipment(s)</td>
      <td>${shipments.reduce((t, s) => t + (s.packages?.reduce((pt, p) => pt + (p.weight ?? 0), 0) ?? 0), 0).toFixed(2)} kg</td>
      <td>₦${shipments.reduce((t, s) => t + (Number(s.totalCost) || 0), 0).toLocaleString()}</td>
      <td colspan="2"></td>
    </tr></tfoot>
  </table>
</body></html>`;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
/** Returns the most recent occurrence of a given weekday (0=Sun … 6=Sat).
 *  If today IS that weekday, returns today. */
function getLastWeekday(targetDay: number): Date {
  const today = new Date();
  const daysAgo = (today.getDay() - targetDay + 7) % 7;
  const result = new Date(today);
  result.setDate(today.getDate() - daysAgo);
  return result;
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminBookingsPage() {
  const [shipments, setShipments]     = useState<Shipment[]>([]);
  const [loading, setLoading]         = useState(true);
  const { profile, profileLoading }   = useProfile();

  // Filters
  const [location, setLocation]       = useState('all');
  const [dateFrom, setDateFrom]       = useState('');
  const [dateTo, setDateTo]           = useState('');
  const [generating, setGenerating]   = useState(false);

  useEffect(() => {
    document.title = 'Shipment Database | County Cargo';
    if (profileLoading || !profile || (profile.role !== 'Admin' && profile.role !== 'Staff')) {
      setLoading(profileLoading);
      return;
    }
    setLoading(true);
    const q = query(collection(db, 'shipments'), orderBy('bookingDate', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setShipments(snap.docs.map(d => {
        const data = d.data();
        return {
          ...data,
          docId: d.id,
          bookingDate:       data.bookingDate instanceof Timestamp ? data.bookingDate.toDate() : new Date(data.bookingDate),
          estimatedDelivery: data.estimatedDelivery instanceof Timestamp ? data.estimatedDelivery.toDate() : (data.estimatedDelivery ? new Date(data.estimatedDelivery) : null),
        } as Shipment;
      }));
      setLoading(false);
    }, err => { console.error(err); setLoading(false); });
    return unsub;
  }, [profile, profileLoading]);

  // ── Client-side filtering ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = shipments;

    // Location filter — match origin or destination
    if (location !== 'all') {
      list = list.filter(s =>
        s.originAddress?.toLowerCase().includes(location.toLowerCase()) ||
        s.destinationAddress?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Date-from filter
    if (dateFrom) {
      const from = startOfDay(new Date(dateFrom));
      if (isValid(from)) list = list.filter(s => new Date(s.bookingDate) >= from);
    }

    // Date-to filter
    if (dateTo) {
      const to = endOfDay(new Date(dateTo));
      if (isValid(to)) list = list.filter(s => new Date(s.bookingDate) <= to);
    }

    return list;
  }, [shipments, location, dateFrom, dateTo]);

  const hasFilters = location !== 'all' || dateFrom || dateTo;

  const clearFilters = () => {
    setLocation('all');
    setDateFrom('');
    setDateTo('');
  };

  // ── Manifest generation ───────────────────────────────────────────────────
  const handleGenerateManifest = () => {
    if (filtered.length === 0) {
      return;
    }
    setGenerating(true);
    try {
      const html = generateManifestHTML(filtered, { location, dateFrom, dateTo });
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(html);
        win.document.close();
        setTimeout(() => win.print(), 500);
      }
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 bg-blue-50/10 p-4 md:p-8 lg:p-10 rounded-[2.5rem] border border-blue-200/50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">Shipment Database</h1>
          <p className="text-blue-700/70 font-semibold text-sm">County Cargo administrative control over all logistic operations.</p>
        </div>

        {/* Manifest button */}
        <Button
          onClick={handleGenerateManifest}
          disabled={generating || filtered.length === 0}
          className="h-11 px-6 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold gap-2 shadow-lg shadow-blue-200 disabled:opacity-50 whitespace-nowrap"
        >
          {generating
            ? <><Loader2 className="h-4 w-4 animate-spin" />Generating…</>
            : <><FileText className="h-4 w-4" />Generate Manifest ({filtered.length})</>}
        </Button>
      </div>

      {/* ── Filter bar ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-blue-500" />
          <span className="font-bold text-blue-900 text-sm uppercase tracking-widest">Filters</span>
          {hasFilters && (
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 ml-1">{filtered.length} results</Badge>
          )}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 text-xs text-blue-400 hover:text-blue-700 font-bold transition-colors"
            >
              <X className="h-3.5 w-3.5" /> Clear all
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-end">

          {/* Location filter */}
          <div className="flex flex-col gap-1.5 min-w-[200px]">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />Location
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-10 rounded-xl border-2 border-blue-100 bg-blue-50/30 font-medium text-sm focus:border-blue-400 w-[200px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date From */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />Date From
            </label>
            <Input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              max={dateTo || undefined}
              className="h-10 rounded-xl border-2 border-blue-100 bg-blue-50/30 font-medium text-sm focus-visible:border-blue-400 w-[170px]"
            />
          </div>

          {/* Date To */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />Date To
            </label>
            <Input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              min={dateFrom || undefined}
              className="h-10 rounded-xl border-2 border-blue-100 bg-blue-50/30 font-medium text-sm focus-visible:border-blue-400 w-[170px]"
            />
          </div>

          {/* Quick range badges */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-widest">Quick Range</label>
            <div className="flex gap-2 flex-wrap">
              {((): { label: string; fromDate: Date }[] => {
                const today = new Date();
                const todayMinus7 = new Date(); todayMinus7.setDate(today.getDate() - 7);
                const todayMinus30 = new Date(); todayMinus30.setDate(today.getDate() - 30);
                const todayMinus90 = new Date(); todayMinus90.setDate(today.getDate() - 90);

                // Location-aware 7-day anchor
                let weekFrom = todayMinus7;
                let weekLabel = '7 days';
                if (location === 'United Kingdom') {
                  weekFrom = getLastWeekday(4); // Thursday
                  weekLabel = 'Since Thu (UK)';
                } else if (location === 'United States') {
                  weekFrom = getLastWeekday(5); // Friday
                  weekLabel = 'Since Fri (US)';
                }

                return [
                  { label: 'Today',    fromDate: today },
                  { label: weekLabel,  fromDate: weekFrom },
                  { label: '30 days',  fromDate: todayMinus30 },
                  { label: '90 days',  fromDate: todayMinus90 },
                ];
              })().map(({ label, fromDate }) => {
                const fromStr  = format(fromDate, 'yyyy-MM-dd');
                const todayStr = format(new Date(), 'yyyy-MM-dd');
                const active   = dateFrom === fromStr && dateTo === todayStr;
                return (
                  <button
                    key={label}
                    onClick={() => { setDateFrom(fromStr); setDateTo(todayStr); }}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all whitespace-nowrap',
                      active
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-600 border-blue-200 hover:border-blue-400'
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-blue-950 tracking-tight">Active Database</h3>
            <p className="text-sm text-blue-700/70 font-semibold mt-0.5">
              Showing <span className="text-blue-900 font-black">{filtered.length}</span> of <span className="text-blue-900 font-black">{shipments.length}</span> shipments
            </p>
          </div>
          {hasFilters && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1 text-xs font-bold px-3 py-1.5">
              <Filter className="h-3 w-3" /> Filters active
            </Badge>
          )}
        </div>
        <div className="p-0">
          <ShipmentsTable shipments={filtered} loading={loading} />
        </div>
      </div>
    </div>
  );
}
