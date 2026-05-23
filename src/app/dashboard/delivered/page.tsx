'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageReceipt } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Search, CheckCircle2, Package, MapPin, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DeliveredItemsPage() {
  const { user } = useProfile();
  const [packages, setPackages] = useState<PackageReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.title = 'Delivered Items | County Cargo';
    if (!user) return;

    const q = query(
      collection(db, 'package_receipts'),
      where('customerId', '==', user.uid)
    );

    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs.map(d => {
        const data = d.data();
        return {
          ...data,
          docId: d.id,
          notifiedAt: data.notifiedAt ? (data.notifiedAt as Timestamp).toDate() : new Date(),
        } as PackageReceipt;
      });
      
      const filteredAndSorted = docs
        .filter(pkg => pkg.status === 'delivered')
        .sort((a, b) => b.notifiedAt.getTime() - a.notifiedAt.getTime());

      setPackages(filteredAndSorted);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching delivered packages:", err);
      setLoading(false);
    });

    return unsub;
  }, [user]);

  const filtered = useMemo(() => {
    if (!search) return packages;
    const s = search.toLowerCase();
    return packages.filter(p =>
      p.trackingNumber?.toLowerCase().includes(s) ||
      p.location?.toLowerCase().includes(s) ||
      p.courier?.toLowerCase().includes(s)
    );
  }, [packages, search]);

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">Delivered Items</h1>
          <p className="text-blue-700/70 font-semibold text-sm">A comprehensive history of all your successfully delivered packages.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  placeholder="Search delivered packages…"
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

          {!loading && filtered.length > 0 ? filtered.map(pkg => (
            <div key={pkg.docId} className="rounded-2xl border-2 border-blue-50 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/30 transition-all p-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/30 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-100/40 transition-colors" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-xl text-blue-950 tracking-tight">{pkg.trackingNumber || 'Manual Record'}</h3>
                      <Badge className="bg-emerald-500 text-white shadow-lg shadow-emerald-100 text-[10px] font-black uppercase tracking-widest px-3 h-6 border-0">Delivered</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-sm font-medium text-slate-500">
                      <span className="flex items-center gap-2 bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100"><Calendar className="h-3.5 w-3.5 text-blue-400" /> Received: <span className="font-bold text-slate-700">{format(pkg.notifiedAt, 'dd MMM yyyy')}</span></span>
                      <span className="flex items-center gap-2 bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100"><MapPin className="h-3.5 w-3.5 text-blue-400" /> {pkg.location}</span>
                      {pkg.weight && <span className="flex items-center gap-2 bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100"><Package className="h-3.5 w-3.5 text-blue-400" /> {pkg.weight} kg</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                  <Link href={`/dashboard/my-packages/${pkg.docId}`} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto h-12 gap-2 border-blue-100 text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-xl font-bold px-6">
                      <FileText className="h-5 w-5" /> Detailed Logs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )) : !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 opacity-30">
              <Package className="h-24 w-24 text-blue-300" />
              <div>
                <p className="text-2xl font-black text-blue-950 tracking-tight">Archive Empty</p>
                <p className="text-blue-700 font-semibold max-w-sm mx-auto">Your successfully delivered packages will be archived here for your records.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
