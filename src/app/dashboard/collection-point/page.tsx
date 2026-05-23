'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageReceipt } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { MapPin, Package, Phone, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CollectionPointPage() {
  const { user } = useProfile();
  const [packages, setPackages] = useState<PackageReceipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Collection Point | County Cargo';
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
        .filter(pkg => ['at_collection', 'ready_for_pickup'].includes(pkg.status))
        .sort((a, b) => b.notifiedAt.getTime() - a.notifiedAt.getTime());

      setPackages(filteredAndSorted);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching collection packages:", err);
      setLoading(false);
    });

    return unsub;
  }, [user]);

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">Collection Point</h1>
          <p className="text-blue-700/70 font-semibold text-sm">Packages that have arrived at their destination and are ready for you.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {loading && Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-[2rem] bg-blue-50/50" />
        ))}

        {!loading && packages.length > 0 ? packages.map(pkg => (
          <div key={pkg.docId} className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden hover:border-blue-300 transition-all group">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5 flex items-center justify-between border-b border-blue-600/10">
              <div className="flex items-center gap-3 text-white">
                <MapPin className="h-6 w-6" />
                <span className="font-black text-lg tracking-tight uppercase">{pkg.collectionPoint || 'Lagos Central Collection Point'}</span>
              </div>
              <div className={cn(
                "uppercase text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg",
                pkg.status === 'ready_for_pickup' ? "bg-emerald-500 text-white" : "bg-blue-400 text-white"
              )}>
                {pkg.status === 'ready_for_pickup' ? 'Ready for Pickup' : 'At Collection Point'}
              </div>
            </div>
            
            <div className="p-8 flex flex-col md:flex-row justify-between gap-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-blue-100 transition-colors">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-black text-2xl text-blue-950 leading-tight tracking-tight">{pkg.trackingNumber || 'Tracking ID Pending'}</h3>
                  <div className="flex items-center gap-5 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-400" /> Arrived: <span className="font-bold text-slate-700">{format(pkg.notifiedAt, 'dd MMM yyyy')}</span></span>
                    {pkg.weight && <span className="flex items-center gap-2 border-l border-slate-200 pl-5"><Package className="h-4 w-4 text-blue-400" /> Weight: <span className="font-bold text-slate-700">{pkg.weight} kg</span></span>}
                  </div>
                  {pkg.comment && (
                    <p className="text-sm text-blue-700 font-medium mt-3 bg-blue-50/50 p-4 rounded-xl italic border border-blue-100">
                      "{pkg.comment}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[240px]">
                <Link href={`/dashboard/my-packages/${pkg.docId}`}>
                  <Button className="w-full justify-between group h-12 rounded-xl font-bold px-6 border-blue-100 text-blue-700 hover:bg-blue-50" variant="outline">
                    View Package Logistics
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/dashboard/contact">
                  <Button className="w-full justify-between group h-12 rounded-xl font-black px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100">
                    Contact Collection Point
                    <Phone className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="px-8 py-4 bg-blue-50/50 flex items-center gap-3 text-xs font-bold text-blue-700 border-t border-blue-100">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="uppercase tracking-widest">Verification Required: Please present your Tracking ID and Valid ID Card upon collection.</span>
            </div>
          </div>
        )) : !loading && (
          <div className="flex flex-1 flex-col items-center justify-center py-32 gap-6 text-center opacity-30">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-blue-300" />
            </div>
            <div>
              <p className="font-black text-2xl text-blue-950 tracking-tight">Empty Collection Point</p>
              <p className="text-blue-700 font-semibold max-w-sm mx-auto mt-1">
                Your packages are currently in transit. We'll notify you as soon as they reach their final destination.
              </p>
            </div>
            <Link href="/dashboard/my-packages">
              <Button variant="outline" className="rounded-xl border-blue-200 text-blue-600 font-bold h-11 px-6">Track My Logistics</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
