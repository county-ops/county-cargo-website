'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, where, Timestamp, addDoc, doc, updateDoc, getDocs, limit, orderBy, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageReceipt, Shipment, UserProfile } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Calendar, CheckCircle2, Clock, ScanBarcode, ArrowUpRight,
  ChevronRight, LayoutDashboard, FileText, Download, 
  AlertCircle, Link2, Info, Plus, UserPlus, Camera,
  Banknote, Receipt, Trash2, Loader2, Search, Printer, Package, Truck, Globe
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllUsers, confirmPaymentForPackage, createPackageReceiptWithInvoice } from '@/lib/user-actions';
import { cn, parseFirestoreDate } from '@/lib/utils';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle 
} from '@/components/ui/card';

const REGIONS = [
  { id: 'UK', label: 'UK Folder', icon: '🇬🇧', location: 'UK Warehouse', color: 'blue' },
  { id: 'US', label: 'US Folder', icon: '🇺🇸', location: 'US Warehouse', color: 'red' },
  { id: 'NG', label: 'Nigeria Folder', icon: '🇳🇬', location: 'Lagos Warehouse', color: 'emerald' },
];

export default function LogisticsDashboard() {
  const { profile } = useProfile();
  const isAdmin = profile?.role === 'Admin';

  const [activeRegion, setActiveRegion] = useState('UK');
  const [packages, setPackages] = useState<PackageReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [scanValue, setScanValue] = useState('');
  const [view, setView] = useState<'inventory' | 'manifest'>('inventory');
  
  // Performance & Pagination
  const [displayLimit, setDisplayLimit] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [globalStats, setGlobalStats] = useState({
    received: 0,
    processing: 0,
    invoiced: 0,
    shipped: 0
  });
  
  // For matching shipments
  const [shipmentMatches, setShipmentMatches] = useState<Record<string, Shipment>>({});
  
  // Package Entry Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [entryData, setEntryData] = useState<Partial<PackageReceipt>>({
    trackingNumber: '',
    customerId: '',
    customerName: '',
    weight: 0,
    handlingCharge: 0,
    consolidationFee: 0,
    palletFee: 0,
    location: 'UK Warehouse',
    region: 'UK'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  useEffect(() => {
    document.title = 'Logistics Dashboard | County Cargo';
    setLoading(true);
    
    // 1. Optimized Real-time listener with Limit
    const q = query(
      collection(db, 'package_receipts'),
      orderBy('notifiedAt', 'desc'),
      limit(displayLimit)
    );

    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs.map(d => {
        const data = d.data();
        return { 
          ...data, 
          docId: d.id, 
          notifiedAt: parseFirestoreDate(data.notifiedAt) || new Date(),
        } as PackageReceipt;
      });
      setPackages(docs);
      setLoading(false);
    }, err => {
      console.error("Snapshot error:", err);
      setLoading(false);
    });

    // 2. Fetch Global Counts (Accurate even with table limit)
    const fetchStats = async () => {
      try {
        const coll = collection(db, 'package_receipts');
        
        // Parallel count queries for speed
        const [receivedSnap, procSnap, invSnap, shipSnap, totalSnap] = await Promise.all([
          getCountFromServer(query(coll, where('status', 'in', ['', 'added']))),
          getCountFromServer(query(coll, where('status', 'in', ['inbound', 'shipment_created']))),
          getCountFromServer(query(coll, where('status', '==', 'invoiced'))),
          getCountFromServer(query(coll, where('status', 'in', ['shipped', 'delivered']))),
          getCountFromServer(coll)
        ]);

        setGlobalStats({
          received: receivedSnap.data().count,
          processing: procSnap.data().count,
          invoiced: invSnap.data().count,
          shipped: shipSnap.data().count
        });
        setTotalCount(totalSnap.data().count);
      } catch (e) {
        console.error("Stats error:", e);
      }
    };

    fetchStats();
    return unsub;
  }, [displayLimit]);

  const filteredPackages = useMemo(() => {
    let list = packages.filter(p => p.region === activeRegion);
    
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(p => 
        p.customerName?.toLowerCase().includes(s) ||
        p.trackingNumber?.toLowerCase().includes(s)
      );
    }
    
    return list.sort((a, b) => b.notifiedAt.getTime() - a.notifiedAt.getTime());
  }, [packages, activeRegion, search]);

  const stats = useMemo(() => {
    // If we have global stats, use them. Otherwise fallback to local filtering (for the first load)
    return globalStats;
  }, [globalStats]);

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!scanValue || !profile) return;

    const tracking = scanValue.trim();
    setScanValue('');

    // Check if already exists in package_receipts
    const existing = packages.find(p => p.trackingNumber === tracking);
    if (existing) {
      toast({ title: 'Duplicate Alert', description: `Package ${tracking} is already in the system.` });
      return;
    }

    // Open Modal with prefilled tracking
    setEntryData(prev => ({
      ...prev,
      trackingNumber: tracking,
      region: activeRegion as any,
      location: REGIONS.find(r => r.id === activeRegion)?.location as any
    }));
    setIsModalOpen(true);
  };

  const handleManualAdd = () => {
    setEntryData({
      trackingNumber: '',
      customerId: '',
      customerName: '',
      weight: 0,
      handlingCharge: 0,
      consolidationFee: 0,
      palletFee: 0,
      region: activeRegion as any,
      location: REGIONS.find(r => r.id === activeRegion)?.location as any
    });
    setIsModalOpen(true);
  };

  const handleSubmitEntry = async () => {
    if (!profile || !entryData.customerId || !entryData.weight) {
      toast({ variant: 'destructive', title: 'Required Fields', description: 'Please select a customer and enter weight.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedUser = users.find(u => u.uid === entryData.customerId);
      await createPackageReceiptWithInvoice({
        ...entryData,
        customerName: selectedUser ? `${selectedUser.firstname} ${selectedUser.lastname}` : '',
        customerEmail: selectedUser?.email || '',
        customerPhone: selectedUser?.phone_number || ''
      }, profile as any);
      
      setIsModalOpen(false);
      toast({ title: '✅ Success', description: 'Package record and invoice created.' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmPayment = async (docId: string) => {
    if (!profile) return;
    try {
      await confirmPaymentForPackage(docId, profile as any);
      toast({ title: '✅ Payment Confirmed', description: 'Package is now eligible for shipment.' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    }
  };

  const manifestData = useMemo(() => {
    // ONLY PAID ITEMS are eligible for manifest
    const list = filteredPackages.filter(p => p.status === 'paid' || p.status === 'manifested');
    const grouped: Record<string, any> = {};
    
    list.forEach(p => {
      const weekKey = p.weeklyShipmentId || format(p.notifiedAt, "'Week' w, MMM yyyy");
      if (!grouped[weekKey]) {
        grouped[weekKey] = {
          weekId: weekKey,
          packages: [],
          totalWeight: 0,
          totalCount: 0
        };
      }
      grouped[weekKey].packages.push(p);
      grouped[weekKey].totalWeight += (p.weight || 0);
      grouped[weekKey].totalCount += 1;
    });
    
    return Object.values(grouped);
  }, [filteredPackages]);

  return (
    <div className="flex flex-col gap-0 min-h-screen bg-slate-50/50">
      {/* Premium Header */}
      <div className="bg-white border-b border-blue-100 px-8 py-6 shadow-sm sticky top-0 z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-black text-2xl text-slate-900 tracking-tight">Regional Logistics</h1>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Inbound & Manifest Control</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
               <button 
                 onClick={() => setView('inventory')}
                 className={cn("px-4 py-2 rounded-lg text-xs font-black transition-all", view === 'inventory' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}
               >Inventory</button>
               <button 
                 onClick={() => setView('manifest')}
                 className={cn("px-4 py-2 rounded-lg text-xs font-black transition-all", view === 'manifest' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}
               >Manifests</button>
             </div>

             <div className="h-10 w-px bg-slate-200" />

             <form onSubmit={handleScan} className="flex items-center gap-2">
               <div className="relative group">
                 <ScanBarcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                 <Input 
                   placeholder="Scan Barcode..." 
                   value={scanValue}
                   onChange={e => setScanValue(e.target.value)}
                   className="pl-10 h-10 w-64 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-blue-200 font-bold text-sm"
                 />
               </div>
               <Button onClick={() => handleScan()} className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold shadow-md shadow-blue-100">
                 Receive
               </Button>
             </form>
          </div>
        </div>
      </div>

      {/* Package Entry Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-blue-950">Receive New Package</DialogTitle>
            <DialogDescription className="font-medium text-blue-700/60">
              Enter package details to generate a tracking record and invoice.
            </DialogDescription>
          </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Region</Label>
                <Select value={entryData.region} onValueChange={val => setEntryData(prev => ({ ...prev, region: val as any, location: REGIONS.find(r => r.id === val)?.location as any }))}>
                  <SelectTrigger className="rounded-xl border-slate-200 font-bold h-12">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map(r => <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Warehouse Location</Label>
                <Input 
                  value={entryData.location} 
                  onChange={e => setEntryData(prev => ({ ...prev, location: e.target.value as any }))}
                  className="rounded-xl border-slate-200 font-bold"
                  placeholder="e.g. London Office"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tracking Number</Label>
                <Input 
                  value={entryData.trackingNumber} 
                  onChange={e => setEntryData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                  className="rounded-xl border-slate-200 font-bold"
                  placeholder="e.g. ABC123XYZ"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weight (kg)</Label>
                <Input 
                  type="number"
                  value={entryData.weight || ''} 
                  onChange={e => setEntryData(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                  className="rounded-xl border-slate-200 font-bold"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Customer</Label>
              <Select value={entryData.customerId} onValueChange={val => setEntryData(prev => ({ ...prev, customerId: val }))}>
                <SelectTrigger className="rounded-xl border-slate-200 font-bold h-12">
                  <SelectValue placeholder="Search customer..." />
                </SelectTrigger>
                <SelectContent>
                  {users.map(u => (
                    <SelectItem key={u.uid} value={u.uid}>{u.firstname} {u.lastname} ({u.email})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Handling Charge</Label>
                <Input 
                  type="number"
                  value={entryData.handlingCharge || ''} 
                  onChange={e => setEntryData(prev => ({ ...prev, handlingCharge: parseFloat(e.target.value) }))}
                  className="rounded-xl border-slate-200 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Consolidation Fee</Label>
                <Input 
                  type="number"
                  value={entryData.consolidationFee || ''} 
                  onChange={e => setEntryData(prev => ({ ...prev, consolidationFee: parseFloat(e.target.value) }))}
                  className="rounded-xl border-slate-200 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pallet Fee</Label>
                <Input 
                  type="number"
                  value={entryData.palletFee || ''} 
                  onChange={e => setEntryData(prev => ({ ...prev, palletFee: parseFloat(e.target.value) }))}
                  className="rounded-xl border-slate-200 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Package Photo (Optional)</Label>
              <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-300 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center gap-1">
                   <Camera className="h-6 w-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Click to Capture/Upload</span>
                </div>
              </div>
            </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl font-bold h-12">Cancel</Button>
            <Button onClick={handleSubmitEntry} disabled={isSubmitting} className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700 h-12 shadow-lg shadow-blue-100">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Record & Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full p-8 gap-8">
        {/* Region Sidebar (Folders) */}
        <div className="w-72 flex flex-col gap-4 sticky top-32 h-fit">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Regional Folders</p>
          <div className="flex flex-col gap-2">
            {REGIONS.map(region => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 group",
                  activeRegion === region.id 
                    ? "bg-white border-blue-600 shadow-xl shadow-blue-50" 
                    : "bg-white/50 border-transparent hover:border-slate-200"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{region.icon}</span>
                  <div className="text-left">
                    <p className={cn("font-black text-sm", activeRegion === region.id ? "text-slate-900" : "text-slate-500")}>
                      {region.label}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {packages.filter(p => p.region === region.id).length} items
                    </p>
                  </div>
                </div>
                {activeRegion === region.id && <ChevronRight className="h-4 w-4 text-blue-600" />}
              </button>
            ))}
          </div>

          {/* Minimal Workflow Guide */}
          <div className="mt-6 flex flex-col gap-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-1">Shipment Flow</p>

            {[
              { step: 1, label: 'Add Packages', sub: 'Scan or batch add', href: '/dashboard/admin/batch-add-package', done: true },
              { step: 2, label: 'Inbound Review', sub: 'Notify customers', href: '/dashboard/admin/importer', done: true },
              { step: 3, label: 'Weekly Batch', sub: 'Auto Thu 23:59', href: '/dashboard/admin/weekly-shipments', done: false },
              { step: 4, label: 'Verify & Invoice', sub: 'Send invoices', href: '/dashboard/admin/weekly-shipments', done: false },
            ].map(({ step, label, sub, href, done }) => (
              <a
                key={step}
                href={href}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all group"
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0',
                  done ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'
                )}>
                  {step}
                </div>
                <div className="min-w-0">
                  <p className="font-black text-xs text-slate-800 truncate">{label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{sub}</p>
                </div>
                <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-blue-500 ml-auto shrink-0 transition-colors" />
              </a>
            ))}

            {/* Global stats strip */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: 'Received', value: stats.received },
                { label: 'Processing', value: stats.processing },
                { label: 'Invoiced', value: stats.invoiced },
                { label: 'Shipped', value: stats.shipped },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-3 text-center">
                  <p className="font-black text-lg text-slate-900">{s.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Main Dashboard View */}
        <div className="flex-1 min-w-0">
          <Card className="rounded-[2.5rem] border-0 shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[700px] flex flex-col bg-white">
            <CardHeader className="p-8 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-0 font-black text-[10px] uppercase tracking-tighter">
                      {view.toUpperCase()}
                    </Badge>
                    <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-0 font-black text-[10px] uppercase tracking-tighter">
                      {activeRegion} REGION
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">
                    {view === 'inventory' ? 'Live Warehouse Inventory' : 'Weekly Manifest Report'}
                  </CardTitle>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input 
                      placeholder="Filter records..." 
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-9 h-11 w-64 rounded-xl border-slate-100 bg-slate-50 focus-visible:ring-blue-100"
                    />
                  </div>
                  {view === 'manifest' ? (
                    <Button onClick={() => window.print()} variant="outline" className="h-11 rounded-xl border-slate-200 font-bold gap-2 text-slate-600">
                      <Printer className="h-4 w-4" /> Print
                    </Button>
                  ) : (
                    <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold gap-2 text-slate-600">
                      <Download className="h-4 w-4" /> Export
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              {view === 'inventory' ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="py-5 px-8 font-black text-slate-900 text-[10px] uppercase tracking-widest">Tracking ID</TableHead>
                        <TableHead className="py-5 px-8 font-black text-slate-900 text-[10px] uppercase tracking-widest">Customer</TableHead>
                        <TableHead className="py-5 px-8 font-black text-slate-900 text-[10px] uppercase tracking-widest">Weight</TableHead>
                        <TableHead className="py-5 px-8 font-black text-slate-900 text-[10px] uppercase tracking-widest">Current Status</TableHead>
                        <TableHead className="py-5 px-8 font-black text-slate-900 text-[10px] uppercase tracking-widest">Scan Date</TableHead>
                        <TableHead className="py-5 px-8 text-right font-black text-slate-900 text-[10px] uppercase tracking-widest">Invoicing & Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell colSpan={6} className="p-8"><Skeleton className="h-6 w-full" /></TableCell>
                          </TableRow>
                        ))
                      ) : filteredPackages.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="py-32 text-center text-slate-300">
                            <Package className="h-12 w-12 opacity-10 mx-auto mb-4" />
                            <p className="font-black text-lg text-slate-400 uppercase tracking-widest">No Packages in Folder</p>
                          </TableCell>
                        </TableRow>
                      ) : filteredPackages.map(p => (
                        <TableRow key={p.docId} className="border-slate-50 transition-colors hover:bg-blue-50/20 group">
                          <TableCell className="py-5 px-8">
                            <div className="flex flex-col">
                              <span className="font-mono font-black text-blue-600 text-sm">{p.trackingNumber}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase">ID: {p.docId.slice(0, 8)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-5 px-8">
                            <div className="flex flex-col">
                              <span className="font-black text-slate-800 text-sm">{p.customerName}</span>
                              <span className="text-[10px] font-bold text-slate-400">{p.customerEmail || 'NO EMAIL'}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-5 px-8 font-black text-slate-700">{p.weight || '0.0'} kg</TableCell>
                          <TableCell className="py-5 px-8">
                            <Select 
                              value={p.status} 
                              onValueChange={async (newStatus) => {
                                try {
                                  await updateDoc(doc(db, 'package_receipts', p.docId), { status: newStatus });
                                  toast({ title: 'Status Updated', description: `Package ${p.trackingNumber} is now ${newStatus}.` });
                                } catch (e: any) {
                                  toast({ variant: 'destructive', title: 'Update Error', description: e.message });
                                }
                              }}
                            >
                              <SelectTrigger className="h-8 border-0 bg-transparent p-0 shadow-none focus:ring-0 w-fit">
                                <Badge variant="outline" className={cn(
                                  "font-black text-[10px] uppercase tracking-tighter px-3 py-1 border-0 shadow-sm cursor-pointer hover:opacity-80 transition-opacity",
                                  p.status === 'delivered' ? "bg-slate-100 text-slate-700" :
                                  p.status === 'shipped' ? "bg-sky-100 text-sky-700" :
                                  p.status === 'paid' ? "bg-emerald-100 text-emerald-700" :
                                  p.status === 'invoiced' ? "bg-indigo-100 text-indigo-700" :
                                  "bg-amber-100 text-amber-700"
                                )}>
                                  {p.status || 'Received'}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="received">Received</SelectItem>
                                <SelectItem value="at_hub">At Hub</SelectItem>
                                <SelectItem value="invoiced">Invoiced</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="manifested">Manifested</SelectItem>
                                <SelectItem value="shipped">In Transit</SelectItem>
                                <SelectItem value="at_collection">At Collection</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="on_hold">On Hold</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="py-5 px-8 text-xs font-bold text-slate-400">
                            {format(p.notifiedAt, 'dd MMM, HH:mm')}
                          </TableCell>
                          <TableCell className="py-5 px-8 text-right">
                             {p.status === 'invoiced' ? (
                               <Button size="sm" onClick={() => handleConfirmPayment(p.docId)} className="h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-[10px] uppercase gap-1">
                                 <Banknote className="h-3 w-3" /> Confirm Payment
                               </Button>
                             ) : p.status === 'paid' || p.status === 'manifested' ? (
                               <div className="flex items-center justify-end gap-1 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                                 <CheckCircle2 className="h-3 w-3" /> Ready for Manifest
                               </div>
                             ) : (
                               <div className="flex items-center justify-end gap-1 text-amber-600 font-black text-[10px] uppercase tracking-widest">
                                 <Clock className="h-3 w-3" /> Pending Invoice
                               </div>
                             )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {packages.length >= displayLimit && (
                    <div className="p-8 border-t border-blue-50 bg-slate-50/30 flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setDisplayLimit(prev => prev + 50)}
                        className="rounded-xl font-bold px-10 h-12 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Load More Records ({packages.length} of {totalCount})
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 space-y-12 bg-slate-50/30 min-h-screen print:bg-white print:p-0">
                  {manifestData.length === 0 ? (
                    <div className="py-32 text-center text-slate-300">
                      <FileText className="h-12 w-12 opacity-10 mx-auto mb-4" />
                      <p className="font-black text-lg text-slate-400 uppercase tracking-widest">No Manifests Available</p>
                    </div>
                  ) : manifestData.map(batch => (
                    <div key={batch.weekId} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm print:border-0 print:shadow-none">
                      <div className="bg-slate-900 p-8 text-white">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="text-2xl font-black tracking-tight">{batch.weekId}</h3>
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-0.5 bg-blue-600 rounded text-[10px] font-black uppercase">{activeRegion} ORIGIN</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">County Cargo Weekly Manifest</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Weekly Volume</p>
                            <p className="text-3xl font-black tracking-tighter">{batch.totalWeight.toFixed(2)} kg / {batch.totalCount} Units</p>
                          </div>
                        </div>
                      </div>
                      
                      <Table>
                        <TableHeader className="bg-slate-50">
                          <TableRow className="border-slate-100 hover:bg-transparent">
                            <TableHead className="py-4 px-8 font-black text-slate-900 text-[10px] uppercase">Recipient Name</TableHead>
                            <TableHead className="py-4 px-8 font-black text-slate-900 text-[10px] uppercase">Tracking #</TableHead>
                            <TableHead className="py-4 px-8 font-black text-slate-900 text-[10px] uppercase">Weight</TableHead>
                            <TableHead className="py-4 px-8 font-black text-slate-900 text-[10px] uppercase text-right">Invoice ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {batch.packages.map((p: any) => (
                            <TableRow key={p.docId} className="border-slate-50">
                              <TableCell className="py-4 px-8 font-black text-slate-800">{p.customerName}</TableCell>
                              <TableCell className="py-4 px-8 font-mono font-black text-blue-600 text-sm">{p.trackingNumber}</TableCell>
                              <TableCell className="py-4 px-8 font-black text-slate-700">{p.weight || '0'} kg</TableCell>
                              <TableCell className="py-4 px-8 text-right font-mono text-[10px] font-black text-slate-400">
                                {p.invoiceId || 'PENDING'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="bg-slate-50 p-6 flex justify-end gap-8 border-t border-slate-100">
                         <div className="text-right">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtotal Items</p>
                           <p className="font-black text-slate-900">{batch.totalCount}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Net Weight</p>
                           <p className="font-black text-slate-900">{batch.totalWeight.toFixed(2)} kg</p>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
