
'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, Timestamp, orderBy, Query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, PackageCheck, Package, MapPin, Truck, History, FileText, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { ShipmentStatusBadge } from '@/components/shipment-status-badge';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shipment, PackageReceipt } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfile } from '@/components/profile-provider';
import { formatAddress, cn } from '@/lib/utils';

import { ShipmentDetails } from '@/components/shipment-details';


const DateCell = ({ date }: { date: Date | string | null }) => {
  const [formattedDate, setFormattedDate] = React.useState('');
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    if (date) {
      setFormattedDate(format(new Date(date), 'MMM dd, yyyy'));
    } else {
      setFormattedDate('N/A');
    }
  }, [date]);

  if (!isClient) {
    return null; 
  }

  return <>{formattedDate}</>;
};

const PACKAGE_STATUS_CONFIG: Record<string, { label: string; colour: string }> = {
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

export default function DashboardPage() {
  const { profile, user, profileLoading } = useProfile();
  const [shipments, setShipments] = React.useState<Shipment[]>([]);
  const [packages, setPackages] = React.useState<PackageReceipt[]>([]);
  const [kpis, setKpis] = useState({
    atTransitHub: 0,
    inTransit: 0,
    atCollectionPoint: 0,
    delivered: 0,
  });
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

  const toggleRowExpansion = (rowId: string) => {
    setExpanded(prev => ({ ...prev, [rowId]: !prev[rowId] }));
  };
  
  useEffect(() => {
    document.title = "Dashboard | County Cargo";
    if (profileLoading || !profile || !user) {
      setLoading(profileLoading);
      return;
    }
    
    setLoading(true);
    const isAdminOrStaff = profile.role === 'Admin' || profile.role === 'Staff';
    let q: Query;
    const shipmentsCollection = collection(db, "shipments");

    if (isAdminOrStaff) {
      q = query(shipmentsCollection, orderBy('bookingDate', 'desc'));
    } else {
      q = query(
        shipmentsCollection,
        where('userId', '==', user.uid),
        orderBy('bookingDate', 'desc')
      );
    }

    let unsubscribeShipments = () => {};
    const handleShipmentsSnapshot = (snap: any) => {
        const shipmentsData = snap.docs.map((doc: any) => {
            const data = doc.data();
            return {
                ...data,
                docId: doc.id,
                bookingDate: data.bookingDate instanceof Timestamp ? data.bookingDate.toDate() : new Date(data.bookingDate),
                estimatedDelivery: data.estimatedDelivery instanceof Timestamp ? data.estimatedDelivery.toDate() : (data.estimatedDelivery ? new Date(data.estimatedDelivery) : null),
            } as Shipment;
        });
        
        // Sort in memory in case we are using the fallback query without orderBy
        shipmentsData.sort((a: any, b: any) => {
            const dateA = a.bookingDate instanceof Date && !isNaN(a.bookingDate.valueOf()) ? a.bookingDate.getTime() : 0;
            const dateB = b.bookingDate instanceof Date && !isNaN(b.bookingDate.valueOf()) ? b.bookingDate.getTime() : 0;
            return dateB - dateA;
        });

        setShipments(shipmentsData);
        
        const newKpis = {
          atTransitHub: shipmentsData.filter((s: any) => s.status === 'Received at Hub' || s.status === 'Processing').length,
          inTransit: shipmentsData.filter((s: any) => s.status === 'In Transit').length,
          atCollectionPoint: shipmentsData.filter((s: any) => s.status === 'Awaiting Collection' || s.status === 'At Collection Point').length,
          delivered: shipmentsData.filter((s: any) => s.status === 'Delivered').length,
        };
        setKpis(newKpis);

        setLoading(false);
    };

    unsubscribeShipments = onSnapshot(q, handleShipmentsSnapshot, (error) => {
        console.warn("Dashboard shipments query needs index, falling back: ", error.message);
        if (!isAdminOrStaff) {
          const qFallback = query(shipmentsCollection, where('userId', '==', user.uid));
          unsubscribeShipments = onSnapshot(qFallback, handleShipmentsSnapshot, (fbError) => {
              console.error("Fallback shipments query failed: ", fbError);
              setLoading(false);
          });
        } else {
            setLoading(false);
        }
    });

    let unsubscribePackages = () => {};
    // Fetch packages for everyone, but admins see all while customers see only their own
    {
      let byId: PackageReceipt[] = [];
      let byEmail: PackageReceipt[] = [];
      let unsubPkgById = () => {};
      let unsubPkgByEmail = () => {};

      const mergePackages = (a: PackageReceipt[], b: PackageReceipt[]) => {
        const seen = new Set<string>();
        const combined: PackageReceipt[] = [];
        for (const p of [...a, ...b]) {
          if (!seen.has(p.docId)) { seen.add(p.docId); combined.push(p); }
        }
        combined.sort((x, y) => y.notifiedAt.getTime() - x.notifiedAt.getTime());
        setPackages(combined);
      };

      // Query 1: by customerId (new packages)
      const qPkgById = isAdminOrStaff 
        ? query(collection(db, 'package_receipts'))
        : query(
            collection(db, 'package_receipts'),
            where('customerId', '==', user.uid)
          );
      unsubPkgById = onSnapshot(qPkgById, snap => {
        byId = snap.docs.map(d => {
          const data = d.data();
          return { ...data, docId: d.id, notifiedAt: data.notifiedAt instanceof Timestamp ? (data.notifiedAt as Timestamp).toDate() : new Date() } as PackageReceipt;
        });
        mergePackages(byId, byEmail);
      }, (error) => {
        // Fallback without visibility filter
        console.warn('Dashboard pkg query (byId) needs index:', error.message);
        const q = query(collection(db, 'package_receipts'), where('customerId', '==', user.uid));
        unsubPkgById = onSnapshot(q, snap => {
          byId = snap.docs.map(d => ({ ...d.data(), docId: d.id, notifiedAt: d.data().notifiedAt instanceof Timestamp ? (d.data().notifiedAt as Timestamp).toDate() : new Date() } as PackageReceipt));
          mergePackages(byId, byEmail);
        });
      });

      // Query 2: by customerEmail (legacy packages) - Only needed for non-admins
      if (!isAdminOrStaff) {
        const qPkgByEmail = query(
          collection(db, 'package_receipts'),
          where('customerEmail', '==', user.email)
        );
        unsubPkgByEmail = onSnapshot(qPkgByEmail, snap => {
          byEmail = snap.docs.map(d => {
            const data = d.data();
            return { ...data, docId: d.id, notifiedAt: data.notifiedAt instanceof Timestamp ? (data.notifiedAt as Timestamp).toDate() : new Date() } as PackageReceipt;
          });
          mergePackages(byId, byEmail);
        }, (error) => {
          console.warn('Dashboard pkg query (byEmail) needs index:', error.message);
          const q = query(collection(db, 'package_receipts'), where('customerEmail', '==', user.email));
          unsubPkgByEmail = onSnapshot(q, snap => {
            byEmail = snap.docs.map(d => ({ ...d.data(), docId: d.id, notifiedAt: d.data().notifiedAt instanceof Timestamp ? (d.data().notifiedAt as Timestamp).toDate() : new Date() } as PackageReceipt));
            mergePackages(byId, byEmail);
          });
        });
      }

      unsubscribePackages = () => { unsubPkgById(); unsubPkgByEmail(); };
    }

    return () => {
        unsubscribeShipments();
        unsubscribePackages();
    };
  }, [profile, user, profileLoading]);


  const activeShipments = shipments.filter(s => !['Delivered', 'Cancelled', 'Unpaid'].includes(s.status)).slice(0, 5);
  const inactiveShipments = shipments.filter(s => s.status === 'Unpaid').slice(0, 5);
  const recentDelivered = shipments.filter(s => s.status === 'Delivered').sort((a,b) => b.bookingDate.getTime() - a.bookingDate.getTime()).slice(0, 5);
  const activePackages = packages.filter(p => p.status !== 'delivered').slice(0, 5);
  
  const isAdminOrStaff = profile?.role === 'Admin' || profile?.role === 'Staff';
  
  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">Shipment Overview</h1>
          <p className="text-blue-700/70 font-semibold text-sm">Welcome back to your shipping command center.</p>
        </div>
        <div className="flex items-center gap-3">
          {!isAdminOrStaff && (
            <Button asChild className="rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200/50 h-12 px-6 font-bold">
              <Link href="/dashboard/tracking-receipts">
                <MapPin className="mr-2 h-5 w-5" />
                Track Packages
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="p-8 flex flex-col justify-between bg-white text-blue-950 border-2 border-blue-100 shadow-xl shadow-blue-50/50 rounded-[2rem] hover:border-blue-300 hover:shadow-blue-100 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-[2rem] -mr-2 -mt-2 group-hover:bg-blue-600 transition-colors duration-500"></div>
                <div className='flex items-center justify-between mb-6 relative z-10'>
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 group-hover:text-white transition-colors duration-500">Hub</h3>
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-white group-hover:text-blue-600 transition-colors duration-500 shadow-sm border border-blue-100">
                        <Package className="h-6 w-6" />
                    </div>
                </div>
                {loading ? <Skeleton className="h-12 w-20 rounded-2xl bg-blue-50" /> : <p className="text-5xl font-black tracking-tighter text-blue-950">{kpis.atTransitHub}</p>}
                <p className="text-[10px] font-bold text-blue-400 mt-2 uppercase tracking-tighter">Received at Hub</p>
            </Card>

            <Card className="p-8 flex flex-col justify-between bg-white text-orange-950 border-2 border-orange-100 shadow-xl shadow-orange-50/50 rounded-[2rem] hover:border-orange-300 hover:shadow-orange-100 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-[2rem] -mr-2 -mt-2 group-hover:bg-orange-500 transition-colors duration-500"></div>
                <div className='flex items-center justify-between mb-6 relative z-10'>
                    <h3 className="text-xs font-black uppercase tracking-widest text-orange-500 group-hover:text-white transition-colors duration-500">Transit</h3>
                    <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-white group-hover:text-orange-600 transition-colors duration-500 shadow-sm border border-orange-100">
                        <Truck className="h-6 w-6" />
                    </div>
                </div>
                {loading ? <Skeleton className="h-12 w-20 rounded-2xl bg-orange-50" /> : <p className="text-5xl font-black tracking-tighter text-orange-950">{kpis.inTransit}</p>}
                <p className="text-[10px] font-bold text-orange-400 mt-2 uppercase tracking-tighter">In Transit</p>
            </Card>

            <Card className="p-8 flex flex-col justify-between bg-white text-purple-950 border-2 border-purple-100 shadow-xl shadow-purple-50/50 rounded-[2rem] hover:border-purple-300 hover:shadow-purple-100 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-[2rem] -mr-2 -mt-2 group-hover:bg-purple-600 transition-colors duration-500"></div>
                <div className='flex items-center justify-between mb-6 relative z-10'>
                    <h3 className="text-xs font-black uppercase tracking-widest text-purple-500 group-hover:text-white transition-colors duration-500">Station</h3>
                    <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-white group-hover:text-purple-600 transition-colors duration-500 shadow-sm border border-purple-100">
                        <MapPin className="h-6 w-6" />
                    </div>
                </div>
                {loading ? <Skeleton className="h-12 w-20 rounded-2xl bg-purple-50" /> : <p className="text-5xl font-black tracking-tighter text-purple-950">{kpis.atCollectionPoint}</p>}
                <p className="text-[10px] font-bold text-purple-400 mt-2 uppercase tracking-tighter">At Collection Point</p>
            </Card>

            <Card className="p-8 flex flex-col justify-between bg-white text-emerald-950 border-2 border-emerald-100 shadow-xl shadow-emerald-50/50 rounded-[2rem] hover:border-emerald-300 hover:shadow-emerald-100 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-[2rem] -mr-2 -mt-2 group-hover:bg-emerald-600 transition-colors duration-500"></div>
                <div className='flex items-center justify-between mb-6 relative z-10'>
                    <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 group-hover:text-white transition-colors duration-500">Done</h3>
                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-white group-hover:text-emerald-600 transition-colors duration-500 shadow-sm border border-emerald-100">
                        <PackageCheck className="h-6 w-6" />
                    </div>
                </div>
                {loading ? <Skeleton className="h-12 w-20 rounded-2xl bg-emerald-50" /> : <p className="text-5xl font-black tracking-tighter text-emerald-950">{kpis.delivered}</p>}
                <p className="text-[10px] font-bold text-emerald-400 mt-2 uppercase tracking-tighter">Delivered</p>
            </Card>
        </div>
      </div>
      
      <div className="grid gap-8">
          {true && (
              <Card className="rounded-[2rem] border-2 border-orange-100 shadow-2xl shadow-orange-50/50 overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row md:items-center p-8 bg-gradient-to-br from-orange-50/50 via-white to-white border-b border-orange-100 gap-4">
                  <div className="grid gap-1">
                    <h3 className="text-2xl font-black text-orange-950 tracking-tight">Newly Logged Packages</h3>
                    <p className="text-sm text-orange-700/70 font-semibold uppercase tracking-wider">
                      Packages received at our hub pending shipment
                    </p>
                  </div>
                  <Button asChild size="lg" className="md:ml-auto gap-2 rounded-[1.25rem] bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white border-2 border-orange-100 shadow-none transition-all duration-300 group font-bold">
                    <Link href="/dashboard/my-packages">
                      View All Packages
                      <ChevronRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                <div>
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader className="bg-orange-50/30">
                        <TableRow className="hover:bg-transparent border-orange-100 border-b-2">
                          <TableHead className="w-12"></TableHead>
                          <TableHead className="font-black text-orange-950 uppercase tracking-tighter text-xs">Tracking ID</TableHead>
                          <TableHead className="font-black text-orange-950 uppercase tracking-tighter text-xs">Location</TableHead>
                          <TableHead className="font-black text-orange-950 uppercase tracking-tighter text-xs">Status</TableHead>
                          <TableHead className="text-right font-black text-orange-950 uppercase tracking-tighter text-xs">Date Logged</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          Array.from({length: 3}).map((_, i) => (
                            <TableRow key={i} className="border-orange-50">
                              <TableCell colSpan={5}><Skeleton className="h-12 w-full rounded-2xl bg-orange-50/50" /></TableCell>
                            </TableRow>
                          ))
                        ) : activePackages.length > 0 ? (
                          activePackages.map((pkg) => {
                            const cfg = PACKAGE_STATUS_CONFIG[pkg.status] ?? { label: pkg.status, colour: 'bg-slate-500 text-white' };
                            return (
                              <TableRow key={pkg.docId} className="hover:bg-orange-50/50 border-orange-100 border-b transition-colors">
                                  <TableCell className="px-4">
                                      <div className="p-1.5 rounded-lg bg-orange-50 text-orange-400">
                                        <Package className="h-4 w-4" />
                                      </div>
                                  </TableCell>
                                  <TableCell className="font-black text-orange-950 tracking-tight text-base">{pkg.trackingNumber || 'Pending'}</TableCell>
                                  <TableCell className="text-orange-800/80 font-medium">{pkg.location}</TableCell>
                                  <TableCell>
                                      <Badge className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md border-0', cfg.colour)}>
                                        {cfg.label}
                                      </Badge>
                                  </TableCell>
                                  <TableCell className="text-right text-orange-950 font-black tabular-nums">
                                      <DateCell date={pkg.notifiedAt} />
                                  </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center">
                              <div className="flex flex-col items-center justify-center gap-4 opacity-30">
                                <div className="p-4 rounded-full bg-orange-100">
                                  <Package className="h-8 w-8 text-orange-600" />
                                </div>
                                <p className="font-black text-orange-950 text-lg tracking-tight">No active packages at hub</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </Card>
          )}

          <Card className="rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden bg-white">
            <div className="flex flex-col md:flex-row md:items-center p-8 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100 gap-4">
              <div className="grid gap-1">
                <h3 className="text-2xl font-black text-blue-950 tracking-tight">Active Shipments</h3>
                <p className="text-sm text-blue-700/70 font-semibold uppercase tracking-wider">
                  Live tracking of your ongoing operations
                </p>
              </div>
              <Button asChild size="lg" className="md:ml-auto gap-2 rounded-[1.25rem] bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border-2 border-blue-100 shadow-none transition-all duration-300 group font-bold">
                <Link href={profile?.role === 'Admin' || profile?.role === 'Staff' ? '/dashboard/admin/bookings' : '/dashboard/my-shipments'}>
                  View Database
                  <ChevronRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader className="bg-blue-50/30">
                    <TableRow className="hover:bg-transparent border-blue-100 border-b-2">
                      <TableHead className="w-12"></TableHead>
                      <TableHead className="font-black text-blue-950 uppercase tracking-tighter text-xs">ID</TableHead>
                      <TableHead className="font-black text-blue-950 uppercase tracking-tighter text-xs">Destination</TableHead>
                      <TableHead className="font-black text-blue-950 uppercase tracking-tighter text-xs">Status</TableHead>
                      <TableHead className="text-right font-black text-blue-950 uppercase tracking-tighter text-xs">ETA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({length: 5}).map((_, i) => (
                        <TableRow key={i} className="border-blue-50">
                          <TableCell colSpan={5}><Skeleton className="h-12 w-full rounded-2xl bg-blue-50/50" /></TableCell>
                        </TableRow>
                      ))
                    ) : activeShipments.length > 0 ? (
                      activeShipments.map((shipment) => (
                        <React.Fragment key={shipment.id}>
                            <TableRow 
                                className="cursor-pointer hover:bg-blue-50/50 border-blue-100 border-b transition-colors group"
                                onClick={() => toggleRowExpansion(shipment.docId)}
                            >
                                <TableCell className="px-4">
                                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                      <ChevronRightIcon className={cn('h-4 w-4 transition-transform', expanded[shipment.docId] && 'rotate-90')} />
                                    </div>
                                </TableCell>
                                <TableCell className="font-black text-blue-950 tracking-tight text-base">{shipment.id}</TableCell>
                                <TableCell className="text-blue-800/80 font-medium">{formatAddress(shipment.destinationAddress, shipment.destinationCountryCode)}</TableCell>
                                <TableCell>
                                    <ShipmentStatusBadge status={shipment.status} />
                                </TableCell>
                                <TableCell className="text-right text-blue-950 font-black tabular-nums">
                                    <DateCell date={shipment.estimatedDelivery} />
                                </TableCell>
                            </TableRow>
                            {expanded[shipment.docId] && (
                                <TableRow className="bg-blue-50/30 hover:bg-blue-50/40 border-blue-100">
                                    <TableCell colSpan={5} className="p-0 border-t-0">
                                        <div className="p-8 border-l-8 border-blue-600 bg-white">
                                            <ShipmentDetails shipment={shipment} isAdminOrStaff={isAdminOrStaff} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-48 text-center">
                          <div className="flex flex-col items-center justify-center gap-4 opacity-30">
                            <div className="p-6 rounded-full bg-blue-100">
                              <Package className="h-12 w-12 text-blue-600" />
                            </div>
                            <p className="font-black text-blue-950 text-xl tracking-tight">No active shipments</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="rounded-[2rem] border-2 border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden bg-white">
              <div className="p-8 bg-slate-50/50 border-b border-slate-100">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Pending Payment</h3>
                <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Action required to proceed</p>
              </div>
              <div>
                <div className="relative w-full overflow-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/30">
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="w-12"></TableHead>
                        <TableHead className="font-black text-slate-600 uppercase tracking-tighter text-xs">ID</TableHead>
                        <TableHead className="text-right font-black text-slate-600 uppercase tracking-tighter text-xs">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        Array.from({length: 3}).map((_, i) => (
                          <TableRow key={i} className="border-slate-50">
                            <TableCell colSpan={3}><Skeleton className="h-10 w-full rounded-xl bg-slate-50" /></TableCell>
                          </TableRow>
                        ))
                      ) : inactiveShipments.length > 0 ? (
                        inactiveShipments.map((shipment) => (
                          <React.Fragment key={shipment.id}>
                              <TableRow 
                                  className="cursor-pointer hover:bg-slate-50/80 border-slate-100 transition-colors group"
                                  onClick={(e) => {
                                      const target = e.target as HTMLElement;
                                      if (target.closest('a, button')) return;
                                      toggleRowExpansion(shipment.docId);
                                  }}
                              >
                                  <TableCell className="px-4">
                                      <ChevronRightIcon className={cn('h-4 w-4 text-slate-300 transition-transform group-hover:text-slate-600', expanded[shipment.docId] && 'rotate-90 text-slate-900')} />
                                  </TableCell>
                                  <TableCell className="font-black text-slate-900">{shipment.id}</TableCell>
                                  <TableCell className="text-right">
                                      <Button asChild variant="ghost" size="sm" className="rounded-xl text-blue-600 font-black hover:bg-blue-50 hover:text-blue-700">
                                          <Link href={`/dashboard/my-shipments/${shipment.docId}`}>
                                              Pay Now
                                              <ArrowUpRight className="h-4 w-4 ml-1.5" />
                                          </Link>
                                      </Button>
                                  </TableCell>
                              </TableRow>
                               {expanded[shipment.docId] && (
                                  <TableRow className="bg-slate-50/50">
                                      <TableCell colSpan={3} className="p-0 border-t-0">
                                          <div className="p-6 border-l-4 border-slate-900 bg-white">
                                              <ShipmentDetails shipment={shipment} isAdminOrStaff={isAdminOrStaff} />
                                          </div>
                                      </TableCell>
                                  </TableRow>
                              )}
                          </React.Fragment>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="h-32 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                            All clear
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-2 border-emerald-100 shadow-xl shadow-emerald-100/50 overflow-hidden bg-white">
              <div className="p-8 bg-emerald-50/50 border-b border-emerald-100">
                <h3 className="text-xl font-black text-emerald-950 tracking-tight">Recent Deliveries</h3>
                <p className="text-xs text-emerald-700/70 font-bold mt-1 uppercase tracking-widest">Successfully completed</p>
              </div>
              <div>
                <div className="relative w-full overflow-auto">
                  <Table>
                    <TableHeader className="bg-emerald-50/30">
                      <TableRow className="hover:bg-transparent border-emerald-100">
                        <TableHead className="w-12"></TableHead>
                        <TableHead className="font-black text-emerald-900 uppercase tracking-tighter text-xs">ID</TableHead>
                        <TableHead className="text-right font-black text-emerald-900 uppercase tracking-tighter text-xs">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        Array.from({length: 3}).map((_, i) => (
                          <TableRow key={i} className="border-emerald-50">
                            <TableCell colSpan={3}><Skeleton className="h-10 w-full rounded-xl bg-emerald-50" /></TableCell>
                          </TableRow>
                        ))
                      ) : recentDelivered.length > 0 ? (
                        recentDelivered.map((shipment) => (
                           <React.Fragment key={shipment.id}>
                              <TableRow 
                                  className="cursor-pointer hover:bg-emerald-50/50 border-emerald-100 transition-colors group"
                                  onClick={() => toggleRowExpansion(shipment.docId)}
                              >
                                  <TableCell className="px-4">
                                      <ChevronRightIcon className={cn('h-4 w-4 text-emerald-300 transition-transform group-hover:text-emerald-600', expanded[shipment.docId] && 'rotate-90 text-emerald-900')} />
                                  </TableCell>
                                  <TableCell className="font-black text-emerald-950">{shipment.id}</TableCell>
                                  <TableCell className="text-right text-emerald-700 font-black tabular-nums">
                                      <DateCell date={shipment.estimatedDelivery} />
                                  </TableCell>
                              </TableRow>
                              {expanded[shipment.docId] && (
                                  <TableRow className="bg-emerald-50/50">
                                      <TableCell colSpan={3} className="p-0 border-t-0">
                                          <div className="p-6 border-l-4 border-emerald-600 bg-white">
                                              <ShipmentDetails shipment={shipment} isAdminOrStaff={isAdminOrStaff} />
                                          </div>
                                      </TableCell>
                                  </TableRow>
                              )}
                          </React.Fragment>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="h-32 text-center text-emerald-400 font-bold uppercase text-[10px] tracking-widest">
                            No history yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </div>
      </div>
    </div>
  );
}
