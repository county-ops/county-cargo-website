'use client';

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { collection, onSnapshot, Timestamp, addDoc, query, where, limit, orderBy, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageReceipt } from '@/lib/types';
import {
  updatePackageReceipt, deletePackageReceipt,
  sendPackageInboundNotification, bulkSendPackageNotifications,
  updatePackageStatusAdmin, getUserProfileByEmail,
  movePackageToShipment, bulkMovePackagesToShipment,
  generateInvoiceForPackage,
  getAutoInvoiceSettings, saveAutoInvoiceSettings,
  bulkProcessPackagesToShipmentAndInvoice,
  type AutoInvoiceSettings,
} from '@/lib/user-actions';
import { useProfile } from '@/components/profile-provider';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Loader2, Trash2, Send, Search, FileDown, Bell, BellOff,
  CheckCircle2, SendHorizonal, PlusCircle, Save, Printer,
  ScanBarcode, ChevronRight, Filter, Check, ChevronsUpDown,
  Truck, FileText, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import * as XLSX from 'xlsx';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { getCachedAllUsers } from '@/lib/user-actions';
import { UserProfile } from '@/lib/types';

const INVOICE_STATUSES = ['Pending', 'Issued', 'Paid', 'Waived'];
const LOCATIONS = ['UK Warehouse', 'US Warehouse', 'Lagos Warehouse', 'Out of State'];
const ALL_STATUSES = [
  'added', 'verified', 'shipment_created', 'inbound', 'invoiced', 
  'notification_sent', 'shipped', 'at_collection', 'ready_for_pickup', 'delivered'
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function sanitizeReceipt(r: PackageReceipt) {
  return {
    docId: r.docId,
    customerId: r.customerId || '',
    customerName: r.customerName || '',
    customerEmail: r.customerEmail || '',
    trackingNumber: r.trackingNumber || '',
    location: r.location || '',
    verified: r.verified || false,
    visibleToCustomer: r.visibleToCustomer || false,
  };
}

// ── Draft row type ────────────────────────────────────────────────────────────
type DraftRow = {
  id: string;
  trackingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  weight: string;
  location: string;
  invoiceStatus: string;
  assignedShipment: string;
};

function newDraft(): DraftRow {
  return {
    id: crypto.randomUUID(),
    trackingNumber: '', customerName: '', customerEmail: '',
    customerPhone: '', weight: '', location: '',
    invoiceStatus: '', assignedShipment: '',
  };
}

// ── Inline editable cell ──────────────────────────────────────────────────────
function EditableCell({ value, onSave, type = 'text', placeholder = '—' }: {
  value: string | number | undefined | null;
  onSave: (v: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ''));
  const inputRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);
  const commit = () => { setEditing(false); if (draft !== String(value ?? '')) onSave(draft); };
  if (editing) return (
    <input ref={inputRef} type={type} value={draft}
      onChange={e => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(String(value ?? '')); setEditing(false); } }}
      className="w-full min-w-[80px] border-b border-primary bg-transparent px-1 py-0.5 text-sm outline-none"
    />
  );
  return (
    <span onClick={() => { setDraft(String(value ?? '')); setEditing(true); }}
      className={cn('block w-full cursor-text px-1 py-0.5 text-sm hover:bg-muted/50 rounded min-h-[24px]', !value && 'text-muted-foreground')}>
      {value || placeholder}
    </span>
  );
}

function SelectCell({ value, options, onSave }: { value: string | undefined; options: string[]; onSave: (v: string) => void }) {
  return (
    <Select value={value || ''} onValueChange={onSave}>
      <SelectTrigger className="h-7 w-full border-0 bg-transparent px-1 text-sm focus:ring-0 shadow-none focus:ring-offset-0">
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

// ── Main Page ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 100;

export default function InboundPackagesPage() {
  const { profile: adminProfile } = useProfile();
  const [allRows, setAllRows] = useState<PackageReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [notifying, setNotifying] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState<Set<string>>(new Set());
  const [updatingStatus, setUpdatingStatus] = useState<Set<string>>(new Set());
  const [notifyingAll, setNotifyingAll] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);
  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState<UserProfile[]>([]);

  // Auto-invoice toggle
  const [autoInvoiceSettings, setAutoInvoiceSettings] = useState<AutoInvoiceSettings>({ enabled: false, defaultDueDays: 7, currency: 'GBP' });
  const [savingAutoInvoice, setSavingAutoInvoice] = useState(false);

  // Move to shipment
  const [movingToShipment, setMovingToShipment] = useState<Set<string>>(new Set());
  const [generatingInvoice, setGeneratingInvoice] = useState<Set<string>>(new Set());
  const [bulkMoving, setBulkMoving] = useState(false);

  // Filters
  const [activeWarehouse, setActiveWarehouse] = useState<'All' | 'UK Warehouse' | 'US Warehouse' | 'Lagos Warehouse'>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'inbound' | 'verified' | 'invoiced' | 'shipped' | 'at_collection' | 'ready_for_pickup'>('all');

  // Scanner
  const [scanInput, setScanInput] = useState('');
  const scanRef = useRef<HTMLInputElement>(null);

  const WAREHOUSES = [
    { id: 'All', label: 'All Packages', icon: '📦' },
    { id: 'UK Warehouse', label: 'UK Warehouse', icon: '🇬🇧' },
    { id: 'US Warehouse', label: 'US Warehouse', icon: '🇺🇸' },
    { id: 'Lagos Warehouse', label: 'Lagos Warehouse', icon: '🇳🇬' },
  ];

  // Draft rows
  const [drafts, setDrafts] = useState<DraftRow[]>([]);
  const [saving, setSaving] = useState<Set<string>>(new Set());

  useEffect(() => {
    getCachedAllUsers().then(setUsers);
    getAutoInvoiceSettings().then(setAutoInvoiceSettings);
  }, []);

  useEffect(() => {
    document.title = 'Inbound Importer | County Cargo';

    // Show ALL packages that haven't been delivered yet — every receipt should appear here
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
          notifiedAt: data.notifiedAt ? (data.notifiedAt as Timestamp).toDate() : new Date(), 
          dateReady: data.dateReady ? (data.dateReady as Timestamp).toDate() : null 
        } as PackageReceipt;
      }).filter(r => ['added', 'verified', 'shipment_created', 'inbound', 'invoiced', 'notification_sent', 'shipped', 'at_collection', 'ready_for_pickup'].includes(r.status));
      // Client-side sort as a backup, though Firestore query handles it now
      docs.sort((a, b) => b.notifiedAt.getTime() - a.notifiedAt.getTime());
      setAllRows(docs);
      setLoading(false);
    }, err => { console.error("Importer onSnapshot Error:", err); setLoading(false); });

    // Get total count
    getCountFromServer(query(collection(db, 'package_receipts'), where('status', 'in', ['added', 'verified', 'shipment_created', 'inbound', 'invoiced', 'notification_sent', 'shipped', 'at_collection', 'ready_for_pickup'])))
      .then(snap => setTotalCount(snap.data().count))
      .catch(console.error);

    return unsub;
  }, [displayLimit]);

  const filtered = useMemo(() => {
    let list = allRows;
    if (activeWarehouse !== 'All') list = list.filter(r => r.location === activeWarehouse);
    if (statusFilter !== 'all') list = list.filter(r => r.status === statusFilter);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(r =>
        r.customerName?.toLowerCase().includes(s) ||
        r.trackingNumber?.toLowerCase().includes(s) ||
        r.customerEmail?.toLowerCase().includes(s)
      );
    }
    return list;
  }, [allRows, search, activeWarehouse, statusFilter]);

  const pendingRows = useMemo(() => allRows.filter(r => !r.notifiedCustomer), [allRows]);

  const saveField = useCallback(async (docId: string, field: string, value: any) => {
    try { await updatePackageReceipt(docId, { [field]: value }); }
    catch { toast({ variant: 'destructive', title: 'Error', description: 'Could not save change.' }); }
  }, []);

  // ── Draft helpers ────────────────────────────────────────────────────────────
  const addDraft = (tracking = '') => setDrafts(prev => [newDraft(), ...prev].map((d, i) => i === 0 && tracking ? { ...d, trackingNumber: tracking } : d));
  const removeDraft = (id: string) => setDrafts(prev => prev.filter(d => d.id !== id));
  const updateDraft = (id: string, field: keyof DraftRow | 'customer', value: any) =>
    setDrafts(prev => prev.map(d => {
      if (d.id !== id) return d;
      if (field === 'customer') {
        const u = value as UserProfile;
        return { 
          ...d, 
          customerEmail: u.email, 
          customerName: `${u.firstname} ${u.lastname}`,
          customerPhone: u.phone_number || '',
        };
      }
      return { ...d, [field]: value };
    }));

  const handleScan = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const tracking = scanInput.trim();
    if (!tracking) return;

    // Check if tracking already exists in the loaded rows
    const existing = allRows.find(r => r.trackingNumber?.toLowerCase() === tracking.toLowerCase());
    if (existing) {
      if (existing.status !== 'inbound') {
        await handleStatusUpdate(existing.docId, 'inbound');
        toast({ title: 'Matched & Inbound', description: `Package ${tracking} found and marked as Inbound.` });
      } else {
        toast({ title: 'Already Inbound', description: `Package ${tracking} is already marked as Inbound.` });
      }
      // Focus the existing row if possible or search for it
      setSearch(tracking);
    } else {
      // Add as new draft
      addDraft(tracking);
      toast({ title: 'New Package', description: `Tracking ${tracking} added as a draft.` });
    }
    setScanInput('');
  };

  const saveDraft = async (draft: DraftRow) => {
    if (!draft.trackingNumber) {
      toast({ variant: 'destructive', title: 'Required', description: 'Tracking number is required.' });
      return;
    }
    if (!draft.customerEmail) {
      toast({ variant: 'destructive', title: 'Required', description: 'Customer email is required.' });
      return;
    }
    if (!adminProfile) return;

    // Ensure weight is a valid number, never NaN
    let parsedWeight = parseFloat(draft.weight);
    if (isNaN(parsedWeight)) parsedWeight = 0;

    setSaving(prev => new Set(prev).add(draft.id));
    try {
      // ── Step 1: Look up the customer UID by email ────────────────────────────
      // RULE: Package must be linked to a customer account before being saved.
      const customerResult = await getUserProfileByEmail(draft.customerEmail);
      const customerId = customerResult?.profile?.uid || '';
      const resolvedName = customerResult
        ? `${customerResult.profile.firstname} ${customerResult.profile.lastname}`.trim()
        : draft.customerName || '';

      // ── Step 2: Save with ALL required fields, including visibility gate ─────
      // RULE: verified + visibleToCustomer must be true BEFORE email is allowed.
      await addDoc(collection(db, 'package_receipts'), {
        trackingNumber: draft.trackingNumber,
        customerName: resolvedName,
        customerEmail: draft.customerEmail,
        customerPhone: draft.customerPhone || '',
        customerId,                         // ← linked to account (may be empty if customer not found)
        weight: parsedWeight,
        location: draft.location || '',
        invoiceStatus: draft.invoiceStatus || 'Not Created',
        assignedShipment: draft.assignedShipment || '',
        status: 'added',
        verified: true,                     // ← staff has scanned/entered = verified
        visibleToCustomer: true,            // ← package is dashboard-visible
        notificationSent: false,            // ← email not yet sent
        notificationSentAt: null,
        notifiedCustomer: false,
        notifiedAt: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        createdByStaff: {
          uid: adminProfile.uid,
          name: `${adminProfile.firstname} ${adminProfile.lastname}`.trim(),
        },
      });
      removeDraft(draft.id);
      const visibilityNote = customerId
        ? `Linked to customer account. Package is visible on customer dashboard.`
        : `Customer account not found for ${draft.customerEmail}. Package saved, but may not appear on customer dashboard. Ask customer to register.`;
      toast({
        title: 'Package Added',
        description: visibilityNote,
        variant: customerId ? 'default' : 'destructive',
      });
    } catch (e: any) {
      console.error('Save Draft Error:', e);
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setSaving(prev => { const s = new Set(prev); s.delete(draft.id); return s; });
    }
  };

  // ── Notify ───────────────────────────────────────────────────────────────────
  const handleNotify = async (row: PackageReceipt) => {
    if (!adminProfile) return;

    // Pre-flight guard: ensure package is visible before notifying
    if (!row.visibleToCustomer || !row.verified) {
      toast({
        variant: 'destructive',
        title: 'Cannot Send Notification',
        description: 'Package saved, but not visible to customer. Please fix before sending notification.',
      });
      return;
    }
    if (!row.customerEmail || !row.trackingNumber) {
      toast({
        variant: 'destructive',
        title: 'Cannot Send Notification',
        description: 'Package is missing customer email or tracking number.',
      });
      return;
    }

    setNotifying(prev => new Set(prev).add(row.docId));
    try {
      await sendPackageInboundNotification({ 
        receipt: sanitizeReceipt(row), 
        adminProfile 
      });
      toast({ title: 'Notification Sent', description: `${row.customerName} has been notified.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Cannot Send Notification', description: e.message });
    } finally {
      setNotifying(prev => { const s = new Set(prev); s.delete(row.docId); return s; });
    }
  };

  const handleNotifyAll = async () => {
    if (!adminProfile || !pendingRows.length) return;
    setNotifyingAll(true);
    try {
      const sanitized = pendingRows.map(sanitizeReceipt);
      const result = await bulkSendPackageNotifications({ receipts: sanitized, adminProfile });
      if (result.failed === 0) {
        toast({ title: 'All Notifications Sent', description: `${result.success} customer(s) notified.` });
      } else {
        toast({ variant: 'destructive', title: `${result.success} sent, ${result.failed} failed`, description: result.errors.slice(0, 3).join('; ') });
      }
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally { setNotifyingAll(false); }
  };

  const handleDelete = async (docId: string) => {
    setDeleting(prev => new Set(prev).add(docId));
    try {
      await deletePackageReceipt(docId);
      setSelected(prev => { const s = new Set(prev); s.delete(docId); return s; });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete package.' });
    } finally {
      setDeleting(prev => { const s = new Set(prev); s.delete(docId); return s; });
    }
  };

  const handleStatusUpdate = async (docId: string, newStatus: string) => {
    if (!adminProfile) return;
    setUpdatingStatus(prev => new Set(prev).add(docId));
    try {
      await updatePackageStatusAdmin(docId, newStatus, adminProfile);
      toast({ title: 'Status Updated', description: `Package status changed to ${newStatus.replace(/_/g, ' ')}.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setUpdatingStatus(prev => { const s = new Set(prev); s.delete(docId); return s; });
    }
  };

  // ── Auto-invoice toggle ──────────────────────────────────────────────────
  const handleToggleAutoInvoice = async () => {
    if (!adminProfile || adminProfile.role !== 'Admin') return;
    setSavingAutoInvoice(true);
    try {
      const updated = { ...autoInvoiceSettings, enabled: !autoInvoiceSettings.enabled };
      await saveAutoInvoiceSettings(updated);
      setAutoInvoiceSettings(updated);
      toast({
        title: updated.enabled ? '⚡ Auto-Invoice Enabled' : 'Auto-Invoice Disabled',
        description: updated.enabled
          ? 'Invoices will be generated automatically when packages move to shipment.'
          : 'Invoices must be generated manually.',
      });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally { setSavingAutoInvoice(false); }
  };

  // ── Move single package to shipment ─────────────────────────────────────
  const handleMoveToShipment = async (row: PackageReceipt) => {
    if (!adminProfile) return;
    setMovingToShipment(prev => new Set(prev).add(row.docId));
    try {
      const result = await movePackageToShipment(row.docId, adminProfile);
      if (result.autoInvoiced) {
        toast({ title: '🚚 Moved to Shipment', description: `Invoice ${result.invoiceId} auto-generated.` });
      } else {
        toast({ title: '🚚 Moved to Shipment', description: 'Package moved. Generate invoice manually when ready.' });
      }
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setMovingToShipment(prev => { const s = new Set(prev); s.delete(row.docId); return s; });
    }
  };

  // ── Bulk process selected packages to shipment & invoice ─────────────────
  const handleBulkMoveToShipment = async () => {
    if (!adminProfile || !selected.size) return;
    setBulkMoving(true);
    try {
      const ids = Array.from(selected);
      const result = await bulkProcessPackagesToShipmentAndInvoice(ids, adminProfile);
      toast({
        title: '✅ Automatically Processed & Invoiced',
        description: `Updated/Created ${result.shipmentsUpdated} shipment batch(es) and generated ${result.invoicesGenerated} premium invoice(s).`,
      });
      setSelected(new Set());
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally { setBulkMoving(false); }
  };

  // ── Generate invoice for a single package ────────────────────────────────
  const handleGenerateInvoice = async (row: PackageReceipt) => {
    if (!adminProfile) return;
    setGeneratingInvoice(prev => new Set(prev).add(row.docId));
    try {
      const { invoiceId } = await generateInvoiceForPackage(row.docId, adminProfile);
      toast({ title: '📄 Invoice Generated', description: `Invoice ${invoiceId} created for ${row.customerName}.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setGeneratingInvoice(prev => { const s = new Set(prev); s.delete(row.docId); return s; });
    }
  };

  const toggleSelect = (id: string) => setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const allVisibleIds = filtered.map(r => r.docId);
  const allSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => selected.has(id));
  const toggleAll = () => allSelected ? setSelected(new Set()) : setSelected(new Set(allVisibleIds));

  const handleExport = () => {
    const data = filtered.map(r => ({
      'Tracking ID': r.trackingNumber || '', 'Customer': r.customerName, 'Email': r.customerEmail,
      'Phone': r.customerPhone || '', 'Weight (kg)': r.weight || '', 'Location': r.location,
      'Invoice Status': r.invoiceStatus || '', 'Assigned Shipment': r.assignedShipment || '',
      'Date Received': format(r.notifiedAt, 'yyyy-MM-dd'), 'Notified': r.notifiedCustomer ? 'Yes' : 'No',
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'InboundPackages');
    XLSX.writeFile(wb, 'InboundPackages.xlsx');
  };
  const notifiedCount = allRows.filter(r => r.notifiedCustomer).length;
  const pendingCount = pendingRows.length;

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">Inbound Importer</h1>
          <p className="text-blue-700/70 font-semibold text-sm">Bulk import, verify and manage incoming customer packages.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="lg" onClick={handleExport} className="rounded-2xl border-blue-100 text-blue-700 hover:bg-blue-50 h-12 px-6 font-bold">
            <FileDown className="mr-2 h-5 w-5" />
            Excel Export
          </Button>
          <Button onClick={() => addDraft()} className="rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200/50 h-12 px-6 font-bold">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Package
          </Button>

          {/* ── Auto-Invoice Toggle (Admin only) ─────────────────────── */}
          {adminProfile?.role === 'Admin' && (
            <button
              onClick={handleToggleAutoInvoice}
              disabled={savingAutoInvoice}
              title={autoInvoiceSettings.enabled ? 'Auto-Invoice is ON — click to disable' : 'Auto-Invoice is OFF — click to enable'}
              className={cn(
                'flex items-center gap-2 h-12 px-5 rounded-2xl font-bold text-sm border-2 transition-all',
                autoInvoiceSettings.enabled
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
              )}
            >
              {savingAutoInvoice ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : autoInvoiceSettings.enabled ? (
                <ToggleRight className="h-5 w-5 text-emerald-500" />
              ) : (
                <ToggleLeft className="h-5 w-5" />
              )}
              <span>Auto-Invoice</span>
              {autoInvoiceSettings.enabled && (
                <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-black">ON</span>
              )}
            </button>
          )}

          {/* ── Bulk Process to Shipment & Invoice ────────────────────── */}
          {selected.size > 0 && (
            <Button
              onClick={handleBulkMoveToShipment}
              disabled={bulkMoving}
              className="rounded-2xl bg-violet-600 hover:bg-violet-700 shadow-xl shadow-violet-200/50 h-12 px-6 font-bold"
            >
              {bulkMoving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Truck className="mr-2 h-4 w-4" />}
              Process {selected.size} to Shipment & Invoice
            </Button>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-blue-100 shadow-sm flex-1">
          {WAREHOUSES.map(wh => (
            <button
              key={wh.id}
              onClick={() => setActiveWarehouse(wh.id as any)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300",
                activeWarehouse === wh.id 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200" 
                  : "text-slate-500 hover:bg-white hover:text-blue-600"
              )}
            >
              <span className="text-lg">{wh.icon}</span>
              {wh.label}
              <Badge className={cn(
                "ml-2 font-black",
                activeWarehouse === wh.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              )}>
                {wh.id === 'All' ? allRows.length : allRows.filter(r => r.location === wh.id).length}
              </Badge>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-blue-100 shadow-sm">
          {['all', 'inbound', 'verified', 'invoiced', 'shipped', 'at_collection', 'ready_for_pickup'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s as any)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-wider transition-all flex items-center gap-1",
                statusFilter === s 
                  ? "bg-slate-800 text-white shadow-lg" 
                  : "text-slate-500 hover:bg-white hover:text-slate-800"
              )}
            >
              {s === 'all' ? 'All' : s.replace(/_/g, ' ')}
              <span className="ml-1 bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md text-[8px] font-black">
                {allRows.filter(r => s === 'all' || r.status === s).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1 group">
                    <ScanBarcode className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                        ref={scanRef}
                        placeholder="Scan tracking ID to match or add…"
                        value={scanInput}
                        onChange={e => setScanInput(e.target.value)}
                        onKeyDown={handleScan}
                        className="pl-12 h-14 rounded-2xl border-2 border-blue-50 focus-visible:ring-blue-100 focus-visible:border-blue-200 bg-blue-50/20 font-medium"
                    />
                </div>
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                        placeholder="Search tracking, names, emails…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-blue-50 focus-visible:ring-blue-100 focus-visible:border-blue-200 bg-blue-50/20 font-medium"
                    />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                 <div className="flex gap-2 p-1.5 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-white shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" /><span className="font-black text-xs">{notifiedCount}</span><span className="text-[10px] font-bold uppercase tracking-tighter">Done</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-white shadow-sm">
                      <Bell className="h-3.5 w-3.5" /><span className="font-black text-xs">{pendingCount}</span><span className="text-[10px] font-bold uppercase tracking-tighter">Pending</span>
                    </div>
                 </div>
                 {selected.size > 0 && (
                  <Button
                    onClick={handleBulkMoveToShipment}
                    disabled={bulkMoving}
                    className="rounded-xl bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-100 h-11 px-6 font-bold"
                  >
                    {bulkMoving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Truck className="mr-2 h-4 w-4" />}
                    Move {selected.size} to Shipment
                  </Button>
                )}
                {pendingCount > 0 && (
                  <Button onClick={handleNotifyAll} disabled={notifyingAll} className="rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-100 h-11 px-6 font-bold">
                    {notifyingAll ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <SendHorizonal className="mr-2 h-4 w-4" />}
                    Notify All ({pendingCount})
                  </Button>
                )}
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[1400px]">
            <thead className="bg-blue-50/50">
              <tr className="border-blue-200 border-b-2">
                <th className="px-4 py-5 w-12 text-center">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-blue-200" />
                </th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Tracking #</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Customer</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Email</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Phone</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Weight</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Location</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Source</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Inv. Status</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Collection</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Status</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Date</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Notify</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Shipment</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]">Invoice</th>
                <th className="px-3 py-5 font-black text-blue-950 uppercase tracking-tighter text-[10px]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-200 border-blue-200">
            {/* ── Draft rows ── */}
            {drafts.map(draft => (
              <tr key={draft.id} className="border-b border-blue-200/70 bg-blue-50/40 group">
                <td className="px-3 py-1.5 text-center">
                  <span className="text-xs text-emerald-600 font-semibold">NEW</span>
                </td>
                <td className="px-1 py-1">
                  <Input value={draft.trackingNumber} onChange={e => updateDraft(draft.id, 'trackingNumber', e.target.value)}
                    className="h-7 text-sm border-0 bg-transparent focus-visible:ring-1" placeholder="Tracking ID…" />
                </td>
                 <td className="px-1 py-1 min-w-[200px]">
                  <CustomerCell 
                    value={draft.customerName} 
                    users={users} 
                    onSave={u => updateDraft(draft.id, 'customer', u)} 
                  />
                </td>
                <td className="px-1 py-1">
                  <Input type="email" value={draft.customerEmail} onChange={e => updateDraft(draft.id, 'customerEmail', e.target.value)}
                    className="h-7 text-sm border-0 bg-transparent focus-visible:ring-1" placeholder="email@…" />
                </td>
                <td className="px-1 py-1">
                  <Input value={draft.customerPhone} onChange={e => updateDraft(draft.id, 'customerPhone', e.target.value)}
                    className="h-7 text-sm border-0 bg-transparent focus-visible:ring-1" placeholder="+44…" />
                </td>
                <td className="px-1 py-1">
                  <Input type="number" value={draft.weight} onChange={e => updateDraft(draft.id, 'weight', e.target.value)}
                    className="h-7 w-20 text-sm border-0 bg-transparent focus-visible:ring-1" placeholder="0.0" />
                </td>
                <td className="px-1 py-1 min-w-[130px]">
                  <Select value={draft.location} onValueChange={v => updateDraft(draft.id, 'location', v)}>
                    <SelectTrigger className="h-7 border-0 bg-transparent text-sm shadow-none focus:ring-0">
                      <SelectValue placeholder="Location…" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-1 py-1 min-w-[120px]">
                  <Select value={draft.invoiceStatus} onValueChange={v => updateDraft(draft.id, 'invoiceStatus', v)}>
                    <SelectTrigger className="h-7 border-0 bg-transparent text-sm shadow-none focus:ring-0">
                      <SelectValue placeholder="Status…" />
                    </SelectTrigger>
                    <SelectContent>
                      {INVOICE_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-1 py-1">
                  <Input value={draft.assignedShipment} onChange={e => updateDraft(draft.id, 'assignedShipment', e.target.value)}
                    className="h-7 text-sm border-0 bg-transparent focus-visible:ring-1" placeholder="Shipment…" />
                </td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground">Today</td>
                <td className="px-3 py-1.5" />
                <td className="px-2 py-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => saveDraft(draft)}
                      disabled={saving.has(draft.id)}
                      title="Save row"
                      className="text-emerald-600 hover:text-emerald-700 transition-colors disabled:opacity-50"
                    >
                      {saving.has(draft.id) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    </button>
                    <button onClick={() => removeDraft(draft.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* ── Loading skeletons ── */}
            {loading && Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="border-b">
                {Array.from({ length: 12 }).map((_, j) => (
                  <td key={j} className="px-3 py-2"><Skeleton className="h-5 w-full" /></td>
                ))}
              </tr>
            ))}

            {/* ── Saved rows ── */}
            {!loading && filtered.map(row => (
              <tr key={row.docId} className={cn('border-b border-blue-200/70 transition-colors hover:bg-blue-50/50 group', selected.has(row.docId) && 'bg-blue-50')}>
                <td className="px-3 py-1.5 text-center">
                  <input type="checkbox" checked={selected.has(row.docId)} onChange={() => toggleSelect(row.docId)} className="rounded" />
                </td>
                <td className="px-1 py-1 font-mono min-w-[130px]">
                  <EditableCell value={row.trackingNumber} placeholder="—" onSave={v => saveField(row.docId, 'trackingNumber', v)} />
                </td>
                <td className="px-3 py-1.5 font-medium min-w-[130px]">{row.customerName}</td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground">{row.customerEmail}</td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground">{row.customerPhone || '—'}</td>
                <td className="px-1 py-1">
                  <EditableCell value={row.weight} type="number" placeholder="—" onSave={v => saveField(row.docId, 'weight', parseFloat(v) || 0)} />
                </td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground">{row.location}</td>
                <td className="px-3 py-1.5">
                  {(row as any).source === 'ship.countycargo.com' ? (
                    <span title="Added from ship.countycargo.com" className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">
                      🌐 ship.cc
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Admin</span>
                  )}
                </td>
                <td className="px-1 py-1 min-w-[120px]">
                  <SelectCell value={row.invoiceStatus} options={INVOICE_STATUSES} onSave={v => saveField(row.docId, 'invoiceStatus', v)} />
                </td>
                <td className="px-1 py-1 min-w-[140px]">
                  <EditableCell value={row.collectionPoint} placeholder="e.g. Lagos Office…" onSave={v => saveField(row.docId, 'collectionPoint', v)} />
                </td>
                <td className="px-1 py-1 min-w-[150px]">
                   <Select 
                    value={row.status || 'inbound'} 
                    onValueChange={v => handleStatusUpdate(row.docId, v)}
                    disabled={updatingStatus.has(row.docId)}
                  >
                    <SelectTrigger className={cn(
                      "h-7 border-0 bg-transparent text-[10px] font-black uppercase shadow-none focus:ring-0 px-2 rounded-lg",
                      row.status === 'inbound' ? 'bg-blue-100 text-blue-700' : 
                      row.status === 'added' ? 'bg-amber-100 text-amber-700' :
                      row.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    )}>
                      {updatingStatus.has(row.docId) ? <Loader2 className="h-3 w-3 animate-spin" /> : <SelectValue />}
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_STATUSES.map(s => (
                        <SelectItem key={s} value={s} className="text-xs font-bold uppercase">{s.replace(/_/g, ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground whitespace-nowrap">
                  {format(row.notifiedAt, 'MMM d, yyyy')}
                </td>
                <td className="px-2 py-1">
                  {row.notifiedCustomer ? (
                    <button title="Re-send notification" onClick={() => handleNotify(row)} disabled={notifying.has(row.docId)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
                      {notifying.has(row.docId) ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <BellOff className="h-3.5 w-3.5" />}
                      Re-send
                    </button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => handleNotify(row)} disabled={notifying.has(row.docId)}
                      className="h-7 text-xs border-sky-300 text-sky-700 hover:bg-sky-50 dark:text-sky-300">
                      {notifying.has(row.docId) ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Send className="mr-1 h-3 w-3" />}
                      Notify
                    </Button>
                  )}
                </td>
                <td className="px-2 py-1">
                  {adminProfile?.role === 'Admin' && (
                    <button onClick={() => handleDelete(row.docId)} disabled={deleting.has(row.docId)} title="Delete (Admin only)"
                      className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50">
                      {deleting.has(row.docId) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  )}
                </td>
                {/* receipt print col, count in total cols */}
                <td className="px-2 py-1">
                  {row.receiptId ? (
                    <Link href={`/dashboard/admin/batch-add-package/receipt/${row.receiptId}`} target="_blank">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-blue-600">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : <span className="text-xs text-muted-foreground/40">—</span>}
                </td>

                {/* ── Move to Shipment ──────────────────────────────── */}
                <td className="px-2 py-1 whitespace-nowrap">
                  {!['shipment_created', 'invoiced', 'shipped', 'delivered'].includes(row.status as string) && (
                    <button
                      onClick={() => handleMoveToShipment(row)}
                      disabled={movingToShipment.has(row.docId)}
                      title="Move to Shipment"
                      className="flex items-center gap-1 text-[10px] font-bold text-violet-600 hover:text-violet-800 disabled:opacity-50 transition-colors bg-violet-50 hover:bg-violet-100 rounded-lg px-2 py-1"
                    >
                      {movingToShipment.has(row.docId)
                        ? <Loader2 className="h-3 w-3 animate-spin" />
                        : <Truck className="h-3 w-3" />}
                      Shipment
                    </button>
                  )}
                </td>

                {/* ── Generate Invoice ──────────────────────────────── */}
                <td className="px-2 py-1 whitespace-nowrap">
                  {row.invoiceId ? (
                    <Link href={`/dashboard/admin/invoices`} title={`Invoice: ${row.invoiceId}`}>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 rounded-lg px-2 py-1">
                        <FileText className="h-3 w-3" />{row.invoiceId}
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleGenerateInvoice(row)}
                      disabled={generatingInvoice.has(row.docId)}
                      title="Generate Invoice"
                      className="flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-800 disabled:opacity-50 transition-colors bg-amber-50 hover:bg-amber-100 rounded-lg px-2 py-1"
                    >
                      {generatingInvoice.has(row.docId)
                        ? <Loader2 className="h-3 w-3 animate-spin" />
                        : <FileText className="h-3 w-3" />}
                      Invoice
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {/* ── Empty state ── */}
            {!loading && filtered.length === 0 && drafts.length === 0 && (
              <tr>
                <td colSpan={16} className="py-16 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="h-10 w-10 opacity-20" />
                    <p className="font-medium">No packages found</p>
                    <p className="text-xs">Click <strong>Add Package</strong> to manually add an inbound package</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing <strong>{allRows.length}</strong> of <strong>{totalCount}</strong> inbound package(s) · {selected.size} selected
          {drafts.length > 0 && <span className="ml-2 text-emerald-600">{drafts.length} unsaved draft row(s)</span>}
        </span>
        {allRows.length < totalCount && (
          <Button variant="outline" size="sm" onClick={() => setDisplayLimit(prev => prev + PAGE_SIZE)} className="h-7 text-xs">
            Load More ({totalCount - allRows.length} remaining)
          </Button>
        )}
      </div>
      </div>
    </div>
  );
}
