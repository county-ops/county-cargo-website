'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TrackingReceipt } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Search, Receipt, ChevronRight, Printer, Download, FileText } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function TrackingReceiptsPage() {
  const { profile, user } = useProfile();
  const [receipts, setReceipts] = useState<TrackingReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.title = 'Tracking Receipts | County Cargo';
    if (!user) return;

    const q = query(
      collection(db, 'tracking_receipts'),
      where('customerId', '==', user.uid)
    );

    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs.map(d => {
        const data = d.data();
        return {
          ...data,
          docId: d.id,
          scannedAt: (data.scannedAt as Timestamp).toDate(),
        } as TrackingReceipt;
      });
      // Sort locally by scannedAt desc to avoid requiring a composite index
      docs.sort((a, b) => b.scannedAt.getTime() - a.scannedAt.getTime());
      setReceipts(docs);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching receipts:", err);
      setLoading(false);
    });

    return unsub;
  }, [user]);

  const filtered = useMemo(() => {
    if (!search) return receipts;
    const s = search.toLowerCase();
    return receipts.filter(r =>
      r.receiptId.toLowerCase().includes(s) ||
      r.trackingNumber?.toLowerCase().includes(s) ||
      r.warehouseLocation.toLowerCase().includes(s)
    );
  }, [receipts, search]);

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">Tracking Receipts</h1>
          <p className="text-blue-700/70 font-semibold text-sm">View and download your official County Cargo tracking records.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  placeholder="Search receipt #, tracking ID or location…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-2 border-blue-50 focus-visible:ring-blue-100 focus-visible:border-blue-200 bg-blue-50/20 font-medium"
                />
              </div>
           </div>
        </div>

        <div className="p-8 flex flex-col gap-4">
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl bg-blue-50/50" />
          ))}

          {!loading && filtered.length > 0 ? filtered.map(receipt => (
            <div key={receipt.docId} className="rounded-2xl border-2 border-blue-50 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/30 transition-all p-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100/40 transition-colors" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                    <Receipt className="h-7 w-7 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <p className="font-black text-xl text-blue-950 tracking-tight">
                        {receipt.receiptId}
                      </p>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {receipt.warehouseLocation}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                      <Search className="h-3 w-3" />
                      Tracking: <span className="font-bold text-blue-600">{receipt.trackingNumber || 'Manual Entry'}</span>
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {format(receipt.scannedAt, 'MMMM dd, yyyy • hh:mm a')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Link href={`/dashboard/tracking-receipts/${receipt.docId}`} target="_blank">
                    <Button variant="outline" className="rounded-xl border-blue-100 text-blue-600 hover:bg-blue-50 hover:border-blue-200 font-bold h-11 px-6">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                  </Link>
                  <Link href={`/dashboard/tracking-receipts/${receipt.docId}`} target="_blank">
                    <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 h-11 px-6 font-bold">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )) : !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-30">
              <FileText className="h-20 w-20 text-blue-300" />
              <div>
                <p className="text-2xl font-black text-blue-950 tracking-tight">No Receipts Found</p>
                <p className="text-blue-700 font-semibold">Your tracking history will appear here once items are scanned.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
