'use client';

import React, {
  useState, useEffect, useMemo, useCallback, useReducer, useRef, memo,
} from 'react';
import { UserProfile } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { logPackageReceipts, PackageLogData } from '@/lib/user-actions';
import { ShippingOptions } from '@/lib/shipping-options';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import { PlusCircle, Check, ChevronsUpDown, Package2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// ── Types ──────────────────────────────────────────────────────────────────────
const LOCATIONS = ['US Warehouse', 'UK Warehouse', 'Lagos Warehouse', 'Out of State'] as const;
type Location = typeof LOCATIONS[number];
type Region = 'UK' | 'US' | 'NG';

type TrackingItem = {
  id: string;
  trackingNumber: string;
  weight: string;
  courier: string;
  location: Location;
  region: Region;
  description: string;
  notes: string;
};

type FormState = {
  billRef: string;
  customer: UserProfile | null;
  shipmentRegion: Region;
  deliveryLocation: string;
  items: TrackingItem[];
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function makeItem(partial: Partial<TrackingItem> = {}): TrackingItem {
  return {
    id: crypto.randomUUID(),
    trackingNumber: '',
    weight: '',
    courier: '',
    location: 'US Warehouse',
    region: 'US',
    description: '',
    notes: '',
    ...partial,
  };
}

function defaultForm(): FormState {
  return {
    billRef: '',
    customer: null,
    shipmentRegion: 'US',
    deliveryLocation: '',
    items: [makeItem()],
  };
}

// ── Reducer (targeted item updates — avoids full-array re-map on keystrokes) ──
type Action =
  | { type: 'RESET' }
  | { type: 'SET_CUSTOMER'; payload: UserProfile }
  | { type: 'SET_FIELD'; field: keyof Omit<FormState, 'items' | 'customer'>; value: string }
  | { type: 'ADD_ITEM' }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_ITEM'; id: string; field: keyof TrackingItem; value: string };

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'RESET':
      return defaultForm();
    case 'SET_CUSTOMER':
      return { ...state, customer: action.payload };
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, makeItem({ location: state.items[0]?.location, region: state.items[0]?.region })],
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_ITEM': {
      // Only re-create the one mutated item object
      const idx = state.items.findIndex(i => i.id === action.id);
      if (idx === -1) return state;
      const next = [...state.items];
      next[idx] = { ...next[idx], [action.field]: action.value };
      // Auto-set region when location changes
      if (action.field === 'location') {
        const loc = action.value as Location;
        next[idx].region = loc === 'UK Warehouse' ? 'UK' : (loc === 'US Warehouse' ? 'US' : 'NG');
      }
      return { ...state, items: next };
    }
    default:
      return state;
  }
}


// ── Customer Picker ────────────────────────────────────────────────────────────
const CustomerPicker = memo(function CustomerPicker({
  value, users, onChange, autoFocus,
}: {
  value: UserProfile | null;
  users: UserProfile[];
  onChange: (u: UserProfile) => void;
  autoFocus?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Auto-open on mount if autofocus requested
  useEffect(() => {
    if (autoFocus && !value) {
      const t = setTimeout(() => setOpen(true), 80);
      return () => clearTimeout(t);
    }
  }, [autoFocus, value]);

  const label = value ? `${value.firstname} ${value.lastname}` : '';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            'flex w-full items-center justify-between rounded-xl border-2 border-blue-100 bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-blue-300 focus:border-blue-400 focus:outline-none',
            !value && 'text-slate-400'
          )}
        >
          {label || 'Select customer…'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 shadow-xl" align="start">
        {/* Use Command's built-in filter prop — CommandInput stays uncontrolled so cmdk manages input focus/typing natively */}
        <Command filter={(v, search) => {
          const u = users.find(u => u.uid.toLowerCase() === v.toLowerCase());
          if (!u) return 0;
          return `${u.firstname} ${u.lastname} ${u.email}`.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
        }}>
          <CommandInput placeholder="Search by name or email…" autoFocus />
          <CommandList className="max-h-56">
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              {users.map(u => (
                <CommandItem
                  key={u.uid}
                  value={u.uid}
                  onSelect={() => { onChange(u); setOpen(false); }}
                >
                  <Check className={cn('mr-2 h-4 w-4 shrink-0', value?.uid === u.uid ? 'opacity-100' : 'opacity-0')} />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{u.firstname} {u.lastname}</div>
                    <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

// ── Tracking Item Card (memoised — only re-renders when its own data changes) ──
const TrackingItemCard = memo(function TrackingItemCard({
  item, index, couriers, dispatch, canRemove,
}: {
  item: TrackingItem;
  index: number;
  couriers: string[];
  dispatch: React.Dispatch<Action>;
  canRemove: boolean;
}) {
  const set = useCallback(
    (field: keyof TrackingItem, value: string) =>
      dispatch({ type: 'UPDATE_ITEM', id: item.id, field, value }),
    [dispatch, item.id]
  );

  return (
    <div className="relative rounded-2xl border-2 border-blue-100 bg-blue-50/30 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-black">
            {index + 1}
          </span>
          <span className="text-sm font-bold text-blue-900">Package {index + 1}</span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
            className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            tabIndex={-1}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Row 1: Tracking + Weight */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Tracking #</label>
          <Input
            placeholder="e.g. 1Z999AA10123456784"
            value={item.trackingNumber}
            onChange={e => set('trackingNumber', e.target.value)}
            className="rounded-xl border-2 border-blue-100 bg-white focus-visible:border-blue-400 focus-visible:ring-0 h-10"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Weight (kg)</label>
          <Input
            type="number"
            placeholder="0.0"
            min="0"
            step="0.1"
            value={item.weight}
            onChange={e => set('weight', e.target.value)}
            className="rounded-xl border-2 border-blue-100 bg-white focus-visible:border-blue-400 focus-visible:ring-0 h-10"
          />
        </div>
      </div>

      {/* Row 2: Courier + Location */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Courier</label>
          <Select value={item.courier} onValueChange={v => set('courier', v)}>
            <SelectTrigger className="rounded-xl border-2 border-blue-100 bg-white focus:ring-0 focus:border-blue-400 h-10">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {couriers.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Warehouse</label>
          <Select value={item.location} onValueChange={v => set('location', v)}>
            <SelectTrigger className="rounded-xl border-2 border-blue-100 bg-white focus:ring-0 focus:border-blue-400 h-10">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 3: Description + Notes side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
          <Input
            placeholder="e.g. iPhone, Shoes…"
            value={item.description}
            onChange={e => set('description', e.target.value)}
            className="rounded-xl border-2 border-blue-100 bg-white focus-visible:border-blue-400 focus-visible:ring-0 h-10"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Notes</label>
          <Input
            placeholder="Extra notes…"
            value={item.notes}
            onChange={e => set('notes', e.target.value)}
            className="rounded-xl border-2 border-blue-100 bg-white focus-visible:border-blue-400 focus-visible:ring-0 h-10"
          />
        </div>
      </div>
    </div>
  );
});

// ── Props ──────────────────────────────────────────────────────────────────────
interface AddPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: UserProfile[];
  shippingOptions: ShippingOptions | null;
  pauseNotifications?: boolean;
}

// ── Main Dialog ────────────────────────────────────────────────────────────────
export function AddPackageDialog({
  open, onOpenChange, users, shippingOptions, pauseNotifications = false,
}: AddPackageDialogProps) {
  const { profile: adminProfile } = useProfile();
  const [form, dispatch] = useReducer(formReducer, undefined, defaultForm);
  const [saving, setSaving] = useState(false);

  // Reset form each time dialog opens
  useEffect(() => {
    if (open) dispatch({ type: 'RESET' });
  }, [open]);

  const couriers = useMemo(() => {
    if (!shippingOptions) return ['UPS', 'FedEx', 'DHL', 'USPS', 'Royal Mail', 'Yodel', 'Evri', 'Other'];
    return [...new Set([
      ...(shippingOptions.usCouriers || []),
      ...(shippingOptions.ukCouriers || []),
      ...(shippingOptions.customCouriers || []),
      'Other',
    ])].sort();
  }, [shippingOptions]);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): string | null => {
    if (!form.customer) return 'Please select a customer.';
    for (const [i, item] of form.items.entries()) {
      if (!item.trackingNumber.trim()) return `Package ${i + 1}: Tracking number is required.`;
    }
    return null;
  };

  const buildPackages = (): PackageLogData[] =>
    form.items.map(item => ({
      customer: form.customer!,
      qty: 1,
      weight: parseFloat(item.weight) || 0,
      sender: form.billRef || '',
      courier: item.courier,
      trackingNumber: item.trackingNumber,
      comment: [item.description, item.notes].filter(Boolean).join(' | '),
      location: item.location,
      region: item.region,
    }));

  // ── Optimistic save: close immediately, write in background ─────────────────
  const handleSave = useCallback(async () => {
    if (!adminProfile) return;
    const err = validate();
    if (err) { toast({ variant: 'destructive', title: 'Validation Error', description: err }); return; }

    const pkgs = buildPackages();
    const customerName = form.customer?.firstname ?? '';

    // Close instantly — staff can keep working
    onOpenChange(false);
    toast({ title: `Saving ${pkgs.length} package(s)…`, description: `For ${customerName}` });

    try {
      await logPackageReceipts(pkgs, adminProfile, pauseNotifications);
      toast({ title: '✅ Saved', description: `${pkgs.length} package(s) logged for ${customerName}.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Save Failed', description: e.message });
    }
  }, [adminProfile, form, pauseNotifications, onOpenChange]);

  // ── Save & Add Another: keep dialog open, reset immediately ─────────────────
  const handleSaveAndAddAnother = useCallback(async () => {
    if (!adminProfile) return;
    const err = validate();
    if (err) { toast({ variant: 'destructive', title: 'Validation Error', description: err }); return; }

    const pkgs = buildPackages();
    const customerName = form.customer?.firstname ?? '';

    // Reset form immediately for next entry
    dispatch({ type: 'RESET' });
    toast({ title: `Saving ${pkgs.length} package(s) in background…`, description: 'Enter your next customer.' });

    try {
      await logPackageReceipts(pkgs, adminProfile, pauseNotifications);
      toast({ title: '✅ Saved', description: `${pkgs.length} package(s) logged for ${customerName}.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Save Failed', description: e.message });
    }
  }, [adminProfile, form, pauseNotifications]);

  // ── Keyboard shortcut: Ctrl/Cmd+Enter to save ───────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, handleSave]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 gap-0 rounded-3xl border-2 border-blue-100 shadow-2xl">
        {/* Header */}
        <DialogHeader className="sticky top-0 z-10 px-7 pt-7 pb-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
                <Package2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-black text-white tracking-tight">Add Package</DialogTitle>
                <DialogDescription className="text-blue-200 text-xs mt-0.5">
                  Log one or multiple items per customer · <kbd className="rounded bg-blue-500/50 px-1 text-white font-mono">Ctrl+Enter</kbd> to save
                </DialogDescription>
              </div>
            </div>
            <Badge className="bg-white/20 text-white font-black border-0">
              {form.items.length} {form.items.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>
        </DialogHeader>

        <div className="px-7 py-6 space-y-6">
          {/* ── Customer Details ─────────────────────────────────────────── */}
          <section className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-blue-500">Customer Details</p>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Customer *</label>
              <CustomerPicker
                value={form.customer}
                users={users}
                onChange={u => dispatch({ type: 'SET_CUSTOMER', payload: u })}
                autoFocus
              />
              {form.customer && (
                <p className="mt-1 text-xs text-slate-400 truncate">
                  {form.customer.email}{form.customer.phone_number && ` · ${form.customer.phone_number}`}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Bill / Invoice Ref</label>
                <Input
                  placeholder="e.g. INV-2025-001"
                  value={form.billRef}
                  onChange={e => dispatch({ type: 'SET_FIELD', field: 'billRef', value: e.target.value })}
                  className="rounded-xl border-2 border-blue-100 bg-white focus-visible:border-blue-400 focus-visible:ring-0 h-10"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Shipment Region</label>
                <Select
                  value={form.shipmentRegion}
                  onValueChange={v => dispatch({ type: 'SET_FIELD', field: 'shipmentRegion', value: v })}
                >
                  <SelectTrigger className="rounded-xl border-2 border-blue-100 bg-white focus:ring-0 focus:border-blue-400 h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">🇺🇸 United States</SelectItem>
                    <SelectItem value="UK">🇬🇧 United Kingdom</SelectItem>
                    <SelectItem value="NG">🇳🇬 Nigeria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Delivery Location</label>
              <Input
                placeholder="e.g. 12 Oak Street, Lagos or Hub Collection"
                value={form.deliveryLocation}
                onChange={e => dispatch({ type: 'SET_FIELD', field: 'deliveryLocation', value: e.target.value })}
                className="rounded-xl border-2 border-blue-100 bg-white focus-visible:border-blue-400 focus-visible:ring-0 h-10"
              />
            </div>
          </section>

          {/* ── Package Items ──────────────────────────────────────────────── */}
          <section className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-blue-500">Package Items</p>

            <div className="space-y-3">
              {form.items.map((item, idx) => (
                <TrackingItemCard
                  key={item.id}
                  item={item}
                  index={idx}
                  couriers={couriers}
                  dispatch={dispatch}
                  canRemove={form.items.length > 1}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => dispatch({ type: 'ADD_ITEM' })}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 py-3.5 text-sm font-bold text-blue-500 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
            >
              <PlusCircle className="h-4 w-4" />
              Add Another Tracking Number
            </button>
          </section>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <DialogFooter className="sticky bottom-0 px-7 py-5 bg-slate-50/90 backdrop-blur rounded-b-3xl border-t border-blue-100 flex flex-col sm:flex-row gap-2.5">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl font-bold text-slate-500 h-11 px-5"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveAndAddAnother}
            disabled={saving}
            className="rounded-2xl border-2 border-blue-200 font-bold text-blue-600 hover:bg-blue-50 h-11 px-5"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Save &amp; Add Another
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-200/40 h-11 px-7 flex-1 sm:flex-none"
          >
            <Package2 className="mr-2 h-4 w-4" />
            Save Package{form.items.length > 1 ? `s (${form.items.length})` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
