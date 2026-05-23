'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { collection, onSnapshot, query, where, Timestamp, getCountFromServer, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageReceipt, UserProfile } from '@/lib/types';
import { getCachedAllUsers, movePackagesToInbound, updatePackageReceipt, deletePackageReceipt, logPackageReceipts, bulkProcessPackagesToShipmentAndInvoice } from '@/lib/user-actions';
import { getShippingOptions, ShippingOptions } from '@/lib/shipping-options';
import { useProfile } from '@/components/profile-provider';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Loader2, PlusCircle, Trash2, ArrowRightCircle, ScanBarcode, Search, Check, ChevronsUpDown, Save, Printer, BellOff, Bell,
} from 'lucide-react';
import Link from 'next/link';
import { cn, parseFirestoreDate } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { AddPackageDialog } from './add-package-dialog';

const LOCATIONS = ['US Warehouse', 'UK Warehouse', 'Lagos Warehouse', 'Out of State'] as const;
type Location = typeof LOCATIONS[number];

// ── Inline editable cell ──────────────────────────────────────────────────────
function EditableCell({
  value, onSave, type = 'text', placeholder = '—', className,
}: {
  value: string | number | undefined | null;
  onSave: (v: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ''));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const commit = () => { setEditing(false); if (draft !== String(value ?? '')) onSave(draft); };

  if (editing) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(String(value ?? '')); setEditing(false); } }}
        className={cn('w-full min-w-[80px] border-b border-primary bg-transparent px-1 py-0.5 text-sm outline-none', className)}
      />
    );
  }
  return (
    <span
      onClick={() => { setDraft(String(value ?? '')); setEditing(true); }}
      className={cn('block w-full cursor-text px-1 py-0.5 text-sm hover:bg-muted/50 rounded min-h-[24px]', !value && 'text-muted-foreground', className)}
    >
      {value || placeholder}
    </span>
  );
}

// ── Draft Input Cell (No typing lag) ──────────────────────────────────────────
function DraftInput({ value, onSave, type = 'text', placeholder, className }: { value: string; onSave: (v: string) => void; type?: string; placeholder?: string; className?: string }) {
  const [local, setLocal] = useState(value);
  useEffect(() => { setLocal(value); }, [value]);
  return (
    <Input
      type={type}
      value={local}
      onChange={e => setLocal(e.target.value)}
      onBlur={() => onSave(local)}
      onKeyDown={e => { if (e.key === 'Enter') onSave(local); }}
      className={className}
      placeholder={placeholder}
    />
  );
}

// ── Dropdown editable cell ────────────────────────────────────────────────────
function SelectCell({ value, options, onSave }: { value: string | undefined; options: string[]; onSave: (v: string) => void }) {
  return (
    <Select value={value || ''} onValueChange={onSave}>
      <SelectTrigger className="h-7 w-full border-0 bg-transparent px-1 text-sm focus:ring-0 focus:ring-offset-0 shadow-none">
        <SelectValue placeholder="Select…" />
      </SelectTrigger>
      <SelectContent>
        {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

// ── Customer picker cell ──────────────────────────────────────────────────────
function CustomerCell({ value, users, onSave }: { value: string; users: UserProfile[]; onSave: (u: UserProfile) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex w-full items-center justify-between px-1 py-0.5 text-sm hover:bg-muted/50 rounded min-h-[24px] text-left">
          <span className={cn(!value && 'text-muted-foreground')}>{value || 'Select customer…'}</span>
          <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command filter={(v, s) => v.toLowerCase().includes(s.toLowerCase()) ? 1 : 0}>
          <CommandInput placeholder="Search customer…" />
          <CommandList>
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              {users.map(u => (
                <CommandItem
                  key={u.uid}
                  value={`${u.firstname} ${u.lastname} ${u.email}`}
                  onSelect={() => { onSave(u); setOpen(false); }}
                >
                  <Check className={cn('mr-2 h-3 w-3', value === `${u.firstname} ${u.lastname}` ? 'opacity-100' : 'opacity-0')} />
                  <div>
                    <div className="text-sm">{u.firstname} {u.lastname}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// ── New-row draft type ────────────────────────────────────────────────────────
type DraftRow = {
  id: string;
  customer: UserProfile | null;
  trackingNumber: string;
  weight: string;
  courier: string;
  location: Location;
  region: 'UK' | 'US' | 'NG';
  notes: string;
};

function makeDraft(partial: Partial<DraftRow> = {}): DraftRow {
  return {
    id: crypto.randomUUID(),
    customer: null,
    trackingNumber: '',
    weight: '',
    courier: '',
    location: 'US Warehouse',
    region: 'US',
    notes: '',
    ...partial,
  };
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BatchAddedPackagesPage() {
  const { profile: adminProfile } = useProfile();

  const [rows, setRows] = useState<PackageReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [shippingOptions, setShippingOptions] = useState<ShippingOptions | null>(null);

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // Draft rows (unsaved, to be submitted)
  const [drafts, setDrafts] = useState<DraftRow[]>([]);

  // Scanner
  const [scanInput, setScanInput] = useState('');
  const scanRef = useRef<HTMLInputElement>(null);

  // Selection
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [moving, setMoving] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pauseNotifications, setPauseNotifications] = useState(false);

  // Search
  const [search, setSearch] = useState('');
  
  // Performance & Pagination
  const [displayLimit, setDisplayLimit] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  
  // Regional Folders
  const [activeRegion, setActiveRegion] = useState<'All' | 'UK' | 'US' | 'NG'>('All');

  const REGIONS = [
    { id: 'All', label: 'All Folders', icon: '📁', color: 'slate' },
    { id: 'UK', label: 'UK Folder', icon: '🇬🇧', color: 'blue' },
    { id: 'US', label: 'US Folder', icon: '🇺🇸', color: 'red' },
    { id: 'NG', label: 'Nigeria Folder', icon: '🇳🇬', color: 'emerald' },
  ];

  // Load users + shipping options
  useEffect(() => {
    document.title = 'Batch Added Packages | County Cargo';
    Promise.all([getCachedAllUsers(), getShippingOptions()]).then(([u, s]) => {
      setUsers(u);
      setShippingOptions(s);
    });
  }, []);

  // Real-time subscription — all hub packages not yet assigned to a weekly shipment
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'package_receipts'),
      where('weeklyShipmentId', '==', null),
      limit(displayLimit)
    );

    const unsub = onSnapshot(q, snap => {
      setRows(snap.docs.map(d => {
        const data = d.data();
        return {
          ...data,
          docId: d.id,
          notifiedAt: parseFirestoreDate(data.notifiedAt) || new Date(),
          dateReady: parseFirestoreDate(data.dateReady),
        } as PackageReceipt;
      }).sort((a, b) => b.notifiedAt.getTime() - a.notifiedAt.getTime()));
      setLoading(false);
    }, err => { console.error(err); setLoading(false); });

    // Global count for pagination
    getCountFromServer(query(collection(db, 'package_receipts'), where('weeklyShipmentId', '==', null)))
      .then(snap => setTotalCount(snap.data().count))
      .catch(console.error);

    return unsub;
  }, [displayLimit]);

  // Couriers list
  const couriers = useMemo(() => {
    if (!shippingOptions) return ['UPS', 'FedEx', 'DHL', 'USPS', 'Royal Mail', 'Other'];
    return [...new Set([
      ...(shippingOptions.usCouriers || []),
      ...(shippingOptions.ukCouriers || []),
      ...(shippingOptions.customCouriers || []),
      'Other',
    ])].sort();
  }, [shippingOptions]);

  // Filtered rows
  const filtered = useMemo(() => {
    let list = rows;
    
    // 1. Regional Filter
    if (activeRegion !== 'All') {
      list = list.filter(r => r.region === activeRegion);
    }

    // 2. Search Filter
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(r =>
        r.customerName?.toLowerCase().includes(s) ||
        r.trackingNumber?.toLowerCase().includes(s) ||
        r.courier?.toLowerCase().includes(s)
      );
    }
    
    return list;
  }, [rows, search, activeRegion]);

  // ── Inline save handler for existing rows ─────────────────────────────────
  const saveField = useCallback(async (docId: string, field: string, value: any) => {
    try {
      await updatePackageReceipt(docId, { [field]: value });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save change.' });
    }
  }, []);

  // ── Scanner ───────────────────────────────────────────────────────────────
  const handleScan = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const tracking = scanInput.trim();
    if (!tracking) return;

    // Default location based on active folder
    const defaultLoc: Location = 
      activeRegion === 'UK' ? 'UK Warehouse' : 
      activeRegion === 'US' ? 'US Warehouse' : 
      activeRegion === 'NG' ? 'Lagos Warehouse' : 'US Warehouse';

    const defaultRegion = activeRegion === 'All' ? 'US' : activeRegion;

    setDrafts(prev => [makeDraft({ 
      trackingNumber: tracking, 
      location: defaultLoc,
      region: defaultRegion as any
    }), ...prev]);
    
    setScanInput('');
    toast({ title: 'Scanned', description: `Tracking ID "${tracking}" added to ${activeRegion} view.` });
  };

  // ── Draft helpers ─────────────────────────────────────────────────────────
  const addDraftRow = () => setDrafts(prev => [...prev, makeDraft()]);
  const removeDraft = (id: string) => setDrafts(prev => prev.filter(d => d.id !== id));
  const updateDraft = (id: string, field: keyof DraftRow, value: any) =>
    setDrafts(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));

  // ── Save drafts ───────────────────────────────────────────────────────────
  const saveDrafts = async () => {
    if (!adminProfile) return;
    const toSave = drafts.filter(d => d.customer);
    if (!toSave.length) {
      toast({ variant: 'destructive', title: 'No valid rows', description: 'Each row needs a customer selected.' });
      return;
    }
    setSaving(true);
    try {
      await logPackageReceipts(
        toSave.map(d => ({
          customer: d.customer!,
          qty: 1,
          weight: parseFloat(d.weight) || 0,
          sender: '',
          courier: d.courier,
          trackingNumber: d.trackingNumber,
          comment: d.notes,
          location: d.location,
          region: d.region,
        })),
        adminProfile,
        pauseNotifications
      );
      setDrafts(prev => prev.filter(d => !d.customer));
      toast({ title: 'Saved', description: `${toSave.length} package(s) added to Batch.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setSaving(false);
    }
  };

  // ── Process Directly to Shipment & Invoice ────────────────────────────────
  const moveToInbound = async () => {
    if (!selected.size || !adminProfile) return;
    setMoving(true);
    try {
      const result = await bulkProcessPackagesToShipmentAndInvoice([...selected], adminProfile);
      setSelected(new Set());
      toast({
        title: '✅ Automatically Processed & Invoiced',
        description: `Created/Updated ${result.shipmentsUpdated} shipment batch(es) and generated ${result.invoicesGenerated} premium invoice(s).`
      });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error processing packages', description: e.message });
    } finally {
      setMoving(false);
    }
  };

  // ── Delete existing row ───────────────────────────────────────────────────
  const deleteRow = async (docId: string) => {
    try {
      await deletePackageReceipt(docId);
      setSelected(prev => { const s = new Set(prev); s.delete(docId); return s; });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete package.' });
    }
  };


  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const allVisibleIds = filtered.map(r => r.docId);
  const allSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => selected.has(id));
  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(allVisibleIds));
  };

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">Batch Package Log</h1>
          <p className="text-blue-700/70 font-semibold text-sm">Quickly scan and log multiple incoming packages.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setDialogOpen(true)} className="rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200/50 h-12 px-6 font-bold">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Package
          </Button>
          {drafts.length > 0 && (
            <Button onClick={saveDrafts} disabled={saving} className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-200/50 h-12 px-6 font-bold">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save {drafts.filter(d => d.customer).length} Row(s)
            </Button>
          )}
        </div>
      </div>

      {/* Regional Folders */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-blue-100 shadow-sm">
        {REGIONS.map(region => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id as any)}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300",
              activeRegion === region.id 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200" 
                : "text-slate-500 hover:bg-white hover:text-blue-600"
            )}
          >
            <span className="text-lg">{region.icon}</span>
            {region.label}
            <Badge className={cn(
              "ml-2 font-black",
              activeRegion === region.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
            )}>
              {region.id === 'All' ? rows.length : rows.filter(r => r.region === region.id).length}
            </Badge>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1 group">
                    <ScanBarcode className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                        ref={scanRef}
                        placeholder="Scan tracking ID…"
                        value={scanInput}
                        onChange={e => setScanInput(e.target.value)}
                        onKeyDown={handleScan}
                        className="pl-12 h-14 rounded-2xl border-2 border-blue-50 focus-visible:ring-blue-100 focus-visible:border-blue-200 bg-blue-50/20 font-medium"
                    />
                </div>
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                        placeholder="Search logs…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-blue-50 focus-visible:ring-blue-100 focus-visible:border-blue-200 bg-blue-50/20 font-medium"
                    />
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* ── Email Notification Toggle ───────────────────────────── */}
                <button
                  type="button"
                  onClick={() => setPauseNotifications(p => !p)}
                  title={pauseNotifications ? 'Notifications paused — click to resume' : 'Click to pause email notifications'}
                  className={cn(
                    'flex items-center gap-2 h-11 px-4 rounded-2xl border-2 font-bold text-sm transition-all',
                    pauseNotifications
                      ? 'border-amber-300 bg-amber-50 text-amber-700 shadow-md shadow-amber-100'
                      : 'border-blue-100 bg-white text-blue-400 hover:border-blue-200 hover:text-blue-600'
                  )}
                >
                  {pauseNotifications
                    ? <><BellOff className="h-4 w-4" /><span className="hidden sm:inline">Emails Paused</span></>
                    : <><Bell className="h-4 w-4" /><span className="hidden sm:inline">Emails On</span></>}
                </button>
                {selected.size > 0 && (
                  <Button onClick={moveToInbound} disabled={moving} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 h-11 px-6 font-bold">
                    {moving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRightCircle className="mr-2 h-4 w-4" />}
                    Process to Shipment & Invoice ({selected.size})
                  </Button>
                )}
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[1200px]">
            <thead className="bg-blue-50/50">
              <tr className="border-blue-200 border-b-2">
                <th className="px-4 py-5 w-12 text-center">
                   <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-blue-200" />
                </th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Tracking #</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Customer</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Phone / Email</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Weight (kg)</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Courier</th>

                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Location</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Date Added</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Status</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Description</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px] text-center">Receipt</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-200 border-blue-200">
            {/* Draft rows (unsaved) */}
            {drafts.map(draft => (
              <tr key={draft.id} className="border-b border-blue-200/70 bg-blue-50/40 dark:bg-blue-950/20">
                <td className="px-3 py-1.5 text-center"><span className="text-xs text-blue-500 font-medium">NEW</span></td>
                <td className="px-1 py-1">
                  <DraftInput value={draft.trackingNumber} onSave={v => updateDraft(draft.id, 'trackingNumber', v)} className="h-7 text-sm border-0 bg-transparent focus-visible:ring-1" placeholder="Tracking ID…" />
                </td>
                <td className="px-1 py-1 min-w-[160px]">
                  <CustomerCell value={draft.customer ? `${draft.customer.firstname} ${draft.customer.lastname}` : ''} users={users} onSave={u => updateDraft(draft.id, 'customer', u)} />
                </td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground">
                  {draft.customer ? (
                    <div><div>{draft.customer.phone_number || '—'}</div><div>{draft.customer.email}</div></div>
                  ) : '—'}
                </td>
                <td className="px-1 py-1">
                  <DraftInput type="number" value={draft.weight} onSave={v => updateDraft(draft.id, 'weight', v)} className="h-7 w-20 text-sm border-0 bg-transparent focus-visible:ring-1" placeholder="0.0" />
                </td>
                <td className="px-1 py-1 min-w-[120px]">
                  <SelectCell value={draft.courier} options={couriers} onSave={v => updateDraft(draft.id, 'courier', v)} />
                </td>

                <td className="px-1 py-1 min-w-[130px]">
                  <SelectCell value={draft.location} options={[...LOCATIONS]} onSave={v => {
                    const loc = v as Location;
                    let reg: 'UK' | 'US' | 'NG' = 'US';
                    if (loc === 'UK Warehouse') reg = 'UK';
                    else if (loc === 'Lagos Warehouse' || loc === 'Out of State') reg = 'NG';
                    
                    updateDraft(draft.id, 'location', loc);
                    updateDraft(draft.id, 'region', reg);
                  }} />
                </td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground">—</td>
                <td className="px-3 py-1.5">
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Draft</Badge>
                </td>
                <td className="px-1 py-1">
                  <DraftInput value={draft.notes} onSave={v => updateDraft(draft.id, 'notes', v)} className="h-7 text-sm border-0 bg-transparent focus-visible:ring-1" placeholder="Description…" />
                </td>
                <td className="px-3 py-1.5 text-center text-muted-foreground/40">—</td>
                <td className="px-2 py-1">
                  <button onClick={() => removeDraft(draft.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}

            {/* Loading */}
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b">
                {Array.from({ length: 12 }).map((_, j) => (
                  <td key={j} className="px-3 py-2"><Skeleton className="h-5 w-full" /></td>
                ))}
              </tr>
            ))}

            {/* Existing saved rows */}
            {!loading && filtered.map(row => (
              <tr key={row.docId} className={cn('border-b border-blue-200/70 transition-colors hover:bg-muted/30', selected.has(row.docId) && 'bg-emerald-50/50 dark:bg-emerald-950/20')}>
                <td className="px-3 py-1.5 text-center">
                  <input type="checkbox" checked={selected.has(row.docId)} onChange={() => toggleSelect(row.docId)} className="rounded" />
                </td>
                <td className="px-1 py-1 font-mono">
                  <EditableCell value={row.trackingNumber} placeholder="—" onSave={v => saveField(row.docId, 'trackingNumber', v)} />
                </td>
                <td className="px-1 py-1 min-w-[160px]">
                  <CustomerCell value={row.customerName} users={users} onSave={u => saveField(row.docId, 'customerName', `${u.firstname} ${u.lastname}`)} />
                </td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground min-w-[140px]">
                  <div>{row.customerPhone || '—'}</div>
                  <div>{row.customerEmail}</div>
                </td>
                <td className="px-1 py-1">
                  <EditableCell value={row.weight} type="number" placeholder="—" onSave={v => saveField(row.docId, 'weight', parseFloat(v) || 0)} />
                </td>
                <td className="px-1 py-1 min-w-[120px]">
                  <SelectCell value={row.courier} options={couriers} onSave={v => saveField(row.docId, 'courier', v)} />
                </td>

                <td className="px-1 py-1 min-w-[130px]">
                  <SelectCell value={row.location} options={[...LOCATIONS]} onSave={v => {
                    const loc = v as Location;
                    let reg: 'UK' | 'US' | 'NG' = 'US';
                    if (loc === 'UK Warehouse') reg = 'UK';
                    else if (loc === 'Lagos Warehouse' || loc === 'Out of State') reg = 'NG';
                    
                    saveField(row.docId, 'location', loc);
                    saveField(row.docId, 'region', reg);
                  }} />
                </td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground whitespace-nowrap">
                  {format(row.notifiedAt, 'MMM dd, yyyy')}
                </td>
                <td className="px-3 py-1.5">
                  <Badge className={cn(
                    "text-xs border-0",
                    (row.status === 'verified' || row.status === 'inbound') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  )}>
                    {row.status === 'verified' ? 'added' : (row.status?.replace(/_/g, ' ') || 'added')}
                  </Badge>
                </td>
                <td className="px-1 py-1 min-w-[140px]">
                  <EditableCell value={row.comment} placeholder="Add notes…" onSave={v => saveField(row.docId, 'comment', v)} />
                </td>

                <td className="px-2 py-1">
                  {row.receiptId ? (
                    <Link href={`/dashboard/admin/batch-add-package/receipt/${row.receiptId}`} target="_blank">
                      <button
                        title="Print / Download Receipt"
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span>Print</span>
                      </button>
                    </Link>
                  ) : (
                    <span className="text-xs text-muted-foreground/40">—</span>
                  )}
                </td>
                <td className="px-2 py-1">
                  {adminProfile?.role === 'Admin' && (
                    <button
                      onClick={() => deleteRow(row.docId)}
                      title="Delete package (Admin only)"
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filtered.length >= displayLimit && (
              <tr>
                <td colSpan={12} className="p-8 border-t border-blue-50 bg-slate-50/30">
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setDisplayLimit(prev => prev + 50)}
                      className="rounded-xl font-bold px-10 h-12 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                    >
                      <Loader2 className="mr-2 h-4 w-4" />
                      Load More Records ({filtered.length} of {totalCount})
                    </Button>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && drafts.length === 0 && (
              <tr>
                <td colSpan={12} className="py-16 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <ScanBarcode className="h-10 w-10 opacity-20" />
                    <p className="font-medium">No packages in staging area</p>
                    <p className="text-xs">Scan a tracking ID above or click "Add Row" to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>{filtered.length} package(s) in staging · {selected.size} selected</span>
        {drafts.length > 0 && <span className="text-blue-500">{drafts.length} unsaved draft row(s)</span>}
      </div>

      {/* Add Package Pop-up Dialog */}
      <AddPackageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        pauseNotifications={pauseNotifications}
        users={users}
        shippingOptions={shippingOptions}
      />
      </div>
    </div>
  );
}
