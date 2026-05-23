'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, where, Timestamp, limit, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageReceipt } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Search, Package, ChevronRight, CheckCircle2, MapPin, Clock, Box, Truck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; colour: string }> = {
  added:             { label: 'Received at Hub',     colour: 'bg-blue-400 text-white shadow-blue-100' },
  verified:          { label: 'Verified',            colour: 'bg-blue-600 text-white shadow-blue-100' },
  shipment_created:  { label: 'Shipment Created',    colour: 'bg-indigo-500 text-white shadow-indigo-100' },
  inbound:           { label: 'Inbound Package',     colour: 'bg-violet-500 text-white shadow-violet-100' },
  invoiced:          { label: 'Invoice Generated',   colour: 'bg-amber-500 text-white shadow-amber-100' },
  notification_sent: { label: 'Invoice Sent',        colour: 'bg-orange-500 text-white shadow-orange-100' },
  shipped:           { label: 'In Transit',          colour: 'bg-sky-600 text-white shadow-sky-100' },
  at_collection:     { label: 'At Collection Point', colour: 'bg-purple-500 text-white shadow-purple-100' },
  ready_for_pickup:  { label: 'Ready for Pickup',    colour: 'bg-amber-500 text-white shadow-amber-100' },
  delivered:         { label: 'Delivered',           colour: 'bg-emerald-500 text-white shadow-emerald-100' },
};

// 8-step timeline for packages
const MINI_STEPS = ['added', 'verified', 'inbound', 'invoiced', 'notification_sent', 'shipped', 'at_collection', 'delivered'];

function MiniTimeline({ status }: { status: string }) {
  // If status is 'shipment_created', treat it as 'verified' for the mini timeline
  // If status is 'ready_for_pickup', treat it as 'at_collection' for the mini timeline
  let effectiveStatus = status;
  if (status === 'shipment_created') effectiveStatus = 'verified';
  if (status === 'ready_for_pickup') effectiveStatus = 'at_collection';

  const currentIdx = MINI_STEPS.indexOf(effectiveStatus);
  const activeIdx = currentIdx === -1 ? 0 : currentIdx;
  return (
    <div className="flex items-center gap-1.5 mt-4">
      {MINI_STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className={cn(
            'w-2 h-2 rounded-full transition-all duration-500',
            i <= activeIdx ? 'bg-blue-600 scale-125 shadow-lg shadow-blue-200' : 'bg-slate-200',
          )} />
          {i < MINI_STEPS.length - 1 && (
            <div className={cn('flex-1 h-1 rounded-full', i < activeIdx ? 'bg-blue-600' : 'bg-slate-100')} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyPackagesPage() {
  const { profile, user } = useProfile();
  const [packages, setPackages] = useState<PackageReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Performance & Pagination
  const [displayLimit, setDisplayLimit] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    document.title = 'My Packages | County Cargo';
    if (!user) return;

    let mergedPackages: PackageReceipt[] = [];
    let unsubById = () => {};
    let unsubByEmail = () => {};

    const merge = (byId: PackageReceipt[], byEmail: PackageReceipt[]) => {
      const seen = new Set<string>();
      const combined: PackageReceipt[] = [];
      for (const p of [...byId, ...byEmail]) {
        if (!seen.has(p.docId)) {
          seen.add(p.docId);
          combined.push(p);
        }
      }
      combined.sort((a, b) => b.notifiedAt.getTime() - a.notifiedAt.getTime());
      setPackages(combined);
      setLoading(false);
    };

    let byId: PackageReceipt[] = [];
    let byEmail: PackageReceipt[] = [];

    // Query 1: by customerId (new packages linked by UID)
    const qById = query(
      collection(db, 'package_receipts'),
      where('customerId', '==', user.uid)
    );

    // Query 2: by customerEmail (legacy packages without customerId)
    const qByEmail = query(
      collection(db, 'package_receipts'),
      where('customerEmail', '==', user.email)
    );

    unsubById = onSnapshot(qById, snap => {
      byId = snap.docs.map(d => {
        const data = d.data();
        return {
          ...data,
          docId: d.id,
          notifiedAt: data.notifiedAt ? (data.notifiedAt as Timestamp).toDate() : new Date(),
        } as PackageReceipt;
      });
      merge(byId, byEmail);
    }, (error) => {
      // Fall back if index missing — query without visibleToCustomer filter
      console.warn('Dashboard query (byId) needs index, falling back:', error.message);
      const fallback = query(
        collection(db, 'package_receipts'),
        where('customerId', '==', user.uid)
      );
      unsubById = onSnapshot(fallback, snap => {
        byId = snap.docs.map(d => {
          const data = d.data();
          return { ...data, docId: d.id, notifiedAt: data.notifiedAt ? (data.notifiedAt as Timestamp).toDate() : new Date() } as PackageReceipt;
        });
        merge(byId, byEmail);
      }, err => { console.error('Error fetching packages:', err); setLoading(false); });
    });

    unsubByEmail = onSnapshot(qByEmail, snap => {
      byEmail = snap.docs.map(d => {
        const data = d.data();
        return {
          ...data,
          docId: d.id,
          notifiedAt: data.notifiedAt ? (data.notifiedAt as Timestamp).toDate() : new Date(),
        } as PackageReceipt;
      });
      merge(byId, byEmail);
    }, (error) => {
      // Fall back if index missing
      console.warn('Dashboard query (byEmail) needs index, falling back:', error.message);
      const fallback = query(
        collection(db, 'package_receipts'),
        where('customerEmail', '==', user.email)
      );
      unsubByEmail = onSnapshot(fallback, snap => {
        byEmail = snap.docs.map(d => {
          const data = d.data();
          return { ...data, docId: d.id, notifiedAt: data.notifiedAt ? (data.notifiedAt as Timestamp).toDate() : new Date() } as PackageReceipt;
        });
        merge(byId, byEmail);
      }, err => { console.error('Error fetching packages by email:', err); });
    });

    // Total count (approximate — by email for all packages)
    getCountFromServer(query(collection(db, 'package_receipts'), where('customerEmail', '==', user.email)))
      .then(snap => setTotalCount(snap.data().count))
      .catch(console.error);

    return () => { unsubById(); unsubByEmail(); };
  }, [user, displayLimit]);

  const filtered = useMemo(() => {
    let list = packages;
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(p =>
        p.trackingNumber?.toLowerCase().includes(s) ||
        p.location?.toLowerCase().includes(s)
      );
    }
    return list.slice(0, displayLimit);
  }, [packages, search, displayLimit]);

  const stats = useMemo(() => ({
    active:    packages.filter(p => !['delivered'].includes(p.status)).length,
    inTransit: packages.filter(p => p.status === 'shipped').length,
    delivered: packages.filter(p => p.status === 'delivered').length,
  }), [packages]);

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">My Packages</h1>
          <p className="text-blue-700/70 font-semibold text-sm">Track your incoming packages at our County Cargo warehouses.</p>
        </div>
        <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-4 bg-white rounded-2xl border-2 border-blue-50 px-6 py-4 shadow-xl shadow-blue-100/30">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                    <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-2xl font-black text-blue-950 leading-none">{stats.active}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mt-1">Active</p>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-2xl border-2 border-blue-50 px-6 py-4 shadow-xl shadow-blue-100/30">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
                    <Truck className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-2xl font-black text-blue-950 leading-none">{stats.inTransit}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mt-1">In Transit</p>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-2xl border-2 border-blue-50 px-6 py-4 shadow-xl shadow-blue-100/30">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-2xl font-black text-blue-950 leading-none">{stats.delivered}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-1">Delivered</p>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="relative flex-1 max-md:w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  placeholder="Search tracking ID or location…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-2 border-blue-50 focus-visible:ring-blue-100 focus-visible:border-blue-200 bg-blue-50/20 font-medium"
                />
              </div>
           </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-3xl bg-blue-50/50" />
          ))}

          {!loading && filtered.length > 0 ? filtered.map(pkg => {
            const safeStatus = pkg.status || 'added';
            const cfg = STATUS_CONFIG[safeStatus] ?? { label: safeStatus.replace(/_/g, ' '), colour: 'bg-slate-500 text-white shadow-slate-100' };
            return (
              <Link key={pkg.docId} href={`/dashboard/my-packages/${pkg.docId}`}>
                <div className="rounded-3xl border-2 border-blue-50 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/30 transition-all p-6 group relative flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-blue-100 transition-colors">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md border-0 text-center', cfg.colour)}>
                      {cfg.label}
                    </Badge>
                  </div>

                  <div className="space-y-1 mb-auto">
                    <p className="font-black text-lg text-blue-950 tracking-tightest group-hover:text-blue-600 transition-colors line-clamp-1">
                      {pkg.trackingNumber || 'Tracking ID Pending'}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-blue-300" /> {pkg.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-blue-300" /> {format(pkg.notifiedAt, 'dd MMM yyyy')}</span>
                    </div>
                  </div>

                  <MiniTimeline status={safeStatus} />
                  
                  <div className="mt-6 pt-4 border-t border-blue-50 flex items-center justify-between text-blue-600 font-black text-xs uppercase tracking-widest">
                    <span>View Package Details</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          }) : !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 col-span-full opacity-30">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-12 w-12 text-blue-300" />
              </div>
              <div>
                <p className="text-2xl font-black text-blue-950 tracking-tight">No Active Packages</p>
                <p className="text-blue-700 font-semibold max-w-sm mx-auto mt-2">
                  Once your packages are received at our warehouse, they will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {packages.length >= displayLimit && (
          <div className="mt-8 flex justify-center pb-8">
            <Button 
              variant="outline" 
              onClick={() => setDisplayLimit(prev => prev + 20)}
              className="rounded-2xl font-black text-xs uppercase tracking-widest px-10 h-14 border-blue-100 text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
            >
              <Clock className="mr-2 h-4 w-4" />
              Load More ({packages.length} of {totalCount})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
