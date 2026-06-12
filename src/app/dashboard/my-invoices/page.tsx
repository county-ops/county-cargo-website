'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Invoice } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Search, FileText, Download, CreditCard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function MyInvoicesPage() {
  const { user } = useProfile();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.title = 'My Invoices | County Cargo';
    if (!user) return;

    // Only show invoices that are 'sent' or 'paid'
    const q = query(
      collection(db, 'invoices'),
      where('customerId', '==', user.uid)
    );

    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs.map(d => {
        const data = d.data();
        return {
          ...data,
          docId: d.id,
          createdAt: (data.createdAt as Timestamp).toDate(),
          invoiceDate: data.invoiceDate ? (data.invoiceDate as Timestamp).toDate() : (data.createdAt as Timestamp).toDate(),
          dueDate: data.dueDate ? (data.dueDate as Timestamp).toDate() : null,
          sentAt: data.sentAt ? (data.sentAt as Timestamp).toDate() : null,
          paidAt: data.paidAt ? (data.paidAt as Timestamp).toDate() : null,
        } as Invoice;
      });
      // Filter by status and sort locally
      const filteredAndSorted = docs
        .filter(inv => ['sent', 'paid'].includes(inv.status))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setInvoices(filteredAndSorted);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching invoices:", err);
      setLoading(false);
    });

    return unsub;
  }, [user]);

  const filtered = useMemo(() => {
    if (!search) return invoices;
    const s = search.toLowerCase();
    return invoices.filter(inv =>
      inv.invoiceId.toLowerCase().includes(s) ||
      inv.trackingNumber?.toLowerCase().includes(s) ||
      inv.shipmentId?.toLowerCase().includes(s)
    );
  }, [invoices, search]);

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">My Invoices</h1>
          <p className="text-blue-700/70 font-semibold text-sm">Track and manage your shipping invoices and financial history.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="relative flex-1 max-md:w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  placeholder="Search invoice #, tracking ID or shipment…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-2 border-blue-50 focus-visible:ring-blue-100 focus-visible:border-blue-200 bg-blue-50/20 font-medium"
                />
              </div>
           </div>
        </div>

        <div className="p-8 flex flex-col gap-4">
          {loading && Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl bg-blue-50/50" />
          ))}

          {!loading && filtered.length > 0 ? filtered.map(invoice => (
            <div key={invoice.docId} className="rounded-2xl border-2 border-blue-50 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/30 transition-all p-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100/40 transition-colors" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start gap-5">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                    invoice.paymentStatus === 'paid' ? "bg-emerald-600 shadow-emerald-200" : "bg-blue-600 shadow-blue-200"
                  )}>
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-xl text-blue-950 tracking-tight">{invoice.invoiceId}</h3>
                      <PaymentBadge status={invoice.paymentStatus} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span>Issued: <span className="font-bold text-slate-700">{format(invoice.invoiceDate, 'dd MMM yyyy')}</span></span>
                      </div>
                      {invoice.trackingNumber && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                          <CreditCard className="h-4 w-4 text-blue-400" />
                          <span>Tracking: <span className="font-black text-blue-600 tracking-tighter">{invoice.trackingNumber}</span></span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-base font-black text-blue-950 col-span-full mt-1">
                        <span className="text-blue-600">{invoice.currency}</span>
                        <span>{Number(invoice.currency === 'NGN' && invoice.exchangeRate ? (invoice.convertedAmount || (invoice.amount * invoice.exchangeRate)) : (invoice.convertedAmount || invoice.amount)).toFixed(2)}</span>
                      </div>
                      {invoice.dueDate && invoice.paymentStatus !== 'paid' && (
                        <div className={cn(
                          "flex items-center gap-2 text-xs font-black uppercase tracking-widest col-span-full mt-2",
                          new Date() > invoice.dueDate ? "text-red-600" : "text-amber-600"
                        )}>
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>Deadline: {format(invoice.dueDate, 'dd MMM yyyy')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-3 shrink-0">
                  <Link href={`/dashboard/my-invoices/${invoice.docId}?print=true`} target="_blank" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto h-12 gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 rounded-xl font-bold px-6">
                      <Download className="h-5 w-5" /> Download PDF
                    </Button>
                  </Link>
                  {invoice.paymentStatus !== 'paid' && (
                    <Button variant="outline" className="w-full sm:w-auto h-12 gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl font-bold px-6">
                      <CreditCard className="h-5 w-5" /> Pay Securely
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )) : !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 opacity-30">
              <FileText className="h-24 w-24 text-blue-300" />
              <div>
                <p className="text-2xl font-black text-blue-950 tracking-tight">No Invoices Yet</p>
                <p className="text-blue-700 font-semibold max-w-sm mx-auto">Your financial documentation will appear here as soon as your packages are processed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const MAP: Record<string, string> = {
    unpaid:    'bg-red-500 text-white shadow-red-100',
    part_paid: 'bg-amber-500 text-white shadow-amber-100',
    paid:      'bg-emerald-500 text-white shadow-emerald-100',
  };
  const labels: Record<string, string> = { unpaid: 'Unpaid', part_paid: 'Partially Paid', paid: 'Fully Paid' };
  return (
    <div className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg', MAP[status] ?? 'bg-slate-500 text-white')}>
      {labels[status] ?? status}
    </div>
  );
}
