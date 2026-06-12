'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Invoice, InvoiceStatus, PaymentStatus } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search, FileText, Eye, FileDown, Filter, TrendingUp, Clock, CheckCircle2, AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  draft:                { label: 'Draft',               cls: 'bg-slate-100 text-slate-600 border-slate-200' },
  generated:            { label: 'Generated',           cls: 'bg-violet-100 text-violet-700 border-violet-200' },
  pending_verification: { label: 'Pending Verification',cls: 'bg-amber-100 text-amber-700 border-amber-200' },
  ready_to_send:        { label: 'Ready to Send',       cls: 'bg-sky-100 text-sky-700 border-sky-200' },
  sent:                 { label: 'Sent',                cls: 'bg-blue-100 text-blue-700 border-blue-200' },
  paid:                 { label: 'Paid',                cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  overdue:              { label: 'Overdue',             cls: 'bg-red-100 text-red-700 border-red-200' },
  cancelled:            { label: 'Cancelled',           cls: 'bg-gray-100 text-gray-500 border-gray-200' },
};

const PAYMENT_LABELS: Record<string, { label: string; cls: string }> = {
  unpaid:   { label: 'Unpaid',    cls: 'bg-red-50 text-red-600 border-red-200' },
  part_paid:{ label: 'Part Paid', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
  paid:     { label: 'Paid',      cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] ?? { label: status, cls: 'bg-slate-100 text-slate-600' };
  return <Badge className={cn('text-xs font-medium border', s.cls)}>{s.label}</Badge>;
}

function PaymentBadge({ status }: { status: string }) {
  const s = PAYMENT_LABELS[status] ?? { label: status, cls: 'bg-slate-100 text-slate-600' };
  return <Badge className={cn('text-xs font-medium border', s.cls)}>{s.label}</Badge>;
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number | string; color: string }) {
  return (
    <div className={cn('rounded-xl border bg-white p-4 flex items-center gap-4 shadow-sm', color)}>
      <div className="rounded-lg p-2.5 bg-current/10">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function InvoicesPage() {
  const { profile } = useProfile();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  useEffect(() => {
    document.title = 'Invoices | County Cargo';
    const unsub = onSnapshot(collection(db, 'invoices'), snap => {
      const docs = snap.docs.map(d => {
        const data = d.data();
        return {
          ...data, docId: d.id,
          createdAt: (data.createdAt as Timestamp).toDate(),
          invoiceDate: data.invoiceDate ? (data.invoiceDate as Timestamp).toDate() : (data.createdAt as Timestamp).toDate(),
          dueDate: data.dueDate ? (data.dueDate as Timestamp).toDate() : null,
          sentAt: data.sentAt ? (data.sentAt as Timestamp).toDate() : null,
          paidAt: data.paidAt ? (data.paidAt as Timestamp).toDate() : null,
        } as Invoice;
      }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setInvoices(docs);
      setLoading(false);
    });
    return unsub;
  }, []);

  const filtered = useMemo(() => {
    return invoices.filter(inv => {
      const matchSearch = !search ||
        inv.invoiceId?.toLowerCase().includes(search.toLowerCase()) ||
        inv.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        inv.shipmentId?.toLowerCase().includes(search.toLowerCase()) ||
        inv.trackingNumber?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
      const matchPayment = paymentFilter === 'all' || inv.paymentStatus === paymentFilter;
      return matchSearch && matchStatus && matchPayment;
    });
  }, [invoices, search, statusFilter, paymentFilter]);

  // Stats
  const totalInvoiced = invoices.filter(i => !['draft', 'cancelled'].includes(i.status)).reduce((s, i) => s + (i.amount || 0), 0);
  const totalOutstanding = invoices.filter(i => !['draft', 'cancelled'].includes(i.status) && ['unpaid', 'part_paid'].includes(i.paymentStatus || 'unpaid')).reduce((s, i) => s + (i.amount || 0), 0);
  const totalRevenue = invoices.filter(i => i.paymentStatus === 'paid').reduce((s, i) => s + (i.amount || 0), 0);
  const paidCount = invoices.filter(i => i.paymentStatus === 'paid').length;
  const overdueCount = invoices.filter(i => i.status === 'overdue').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="grid gap-1">
          <h1 className="font-bold text-2xl md:text-3xl text-blue-950 tracking-tight">Invoices</h1>
          <p className="text-sm text-blue-700/70 font-medium">Manage and track all customer invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/admin/importer">
            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 shadow-lg shadow-blue-200/50">
              <FileText className="h-4 w-4" />
              Generate Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border bg-white dark:bg-card p-4 flex items-center gap-3 shadow-sm">
          <div className="rounded-lg p-2.5 bg-blue-50 dark:bg-blue-950/40">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Invoiced</p>
            <p className="text-xl font-bold">£{totalInvoiced.toFixed(0)}</p>
          </div>
        </div>
        <div className="rounded-xl border bg-white dark:bg-card p-4 flex items-center gap-3 shadow-sm">
          <div className="rounded-lg p-2.5 bg-amber-50 dark:bg-amber-950/40">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Outstanding</p>
            <p className="text-xl font-bold text-amber-600">£{totalOutstanding.toFixed(0)}</p>
          </div>
        </div>
        <div className="rounded-xl border bg-white dark:bg-card p-4 flex items-center gap-3 shadow-sm">
          <div className="rounded-lg p-2.5 bg-violet-50 dark:bg-violet-950/40">
            <TrendingUp className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Paid</p>
            <p className="text-xl font-bold">£{totalRevenue.toFixed(0)}</p>
          </div>
        </div>
        <div className="rounded-xl border bg-white dark:bg-card p-4 flex items-center gap-3 shadow-sm">
          <div className="rounded-lg p-2.5 bg-emerald-50 dark:bg-emerald-950/40">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Paid Invoices</p>
            <p className="text-xl font-bold">{paidCount}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-white dark:bg-card p-3 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            placeholder="Search invoice, customer, tracking…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 text-sm border-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 text-sm w-[170px] border-blue-200 focus:ring-blue-500">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.entries(STATUS_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="h-8 text-sm w-[150px] border-blue-200 focus:ring-blue-500">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              {Object.entries(PAYMENT_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-blue-200 shadow-sm overflow-hidden bg-white">
        <table className="w-full text-sm border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-blue-200/50 bg-blue-50/50">
              <th className="px-4 py-4 text-left font-bold text-blue-900 whitespace-nowrap">Invoice #</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900 dark:text-blue-200">Customer</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900 dark:text-blue-200 whitespace-nowrap">Shipment</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900 dark:text-blue-200 whitespace-nowrap">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900 dark:text-blue-200">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900 dark:text-blue-200">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900 dark:text-blue-200">Payment</th>
              <th className="px-4 py-3 text-center font-semibold text-blue-900 dark:text-blue-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b">
                {Array.from({ length: 8 }).map((_, j) => (
                  <td key={j} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td>
                ))}
              </tr>
            ))}

            {!loading && filtered.map(inv => (
              <tr key={inv.docId} className="border-b border-blue-200/70 hover:bg-blue-50/50 transition-colors group">
                <td className="px-4 py-3">
                  <span className="font-mono font-medium text-blue-700 dark:text-blue-400 text-xs">{inv.invoiceId}</span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-sm">{inv.customerName}</p>
                  <p className="text-xs text-muted-foreground">{inv.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">{inv.shipmentId}</p>
                  {inv.trackingNumber && <p className="font-mono">{inv.trackingNumber}</p>}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {format(inv.invoiceDate || inv.createdAt, 'dd MMM yyyy')}
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-blue-700 dark:text-blue-400">
                    {inv.currency || 'GBP'} {Number(inv.currency === 'NGN' && inv.exchangeRate ? (inv.convertedAmount || (inv.amount * inv.exchangeRate)) : (inv.convertedAmount || inv.amount)).toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
                <td className="px-4 py-3"><PaymentBadge status={inv.paymentStatus || 'unpaid'} /></td>
                <td className="px-4 py-3 text-center">
                  <Link href={`/dashboard/admin/invoices/${inv.docId}`}>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1">
                      <Eye className="h-3.5 w-3.5" />View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-16 text-center text-muted-foreground">
                  <FileText className="h-10 w-10 opacity-20 mx-auto mb-3" />
                  <p className="font-medium">No invoices found</p>
                  <p className="text-xs mt-1">Invoices are generated when a shipment batch is verified</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground px-1">{filtered.length} invoice(s) {overdueCount > 0 && <span>· <span className="text-red-500">{overdueCount} overdue</span></span>}</p>
    </div>
  );
}
