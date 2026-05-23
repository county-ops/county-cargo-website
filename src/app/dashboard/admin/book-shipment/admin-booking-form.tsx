'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserProfile, ServiceType } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { getCachedAllUsers } from '@/lib/user-actions';
import { getSettings, AppSettings } from '@/lib/settings';
import { getShippingEstimate, GetShippingEstimateOutput } from '@/ai/flows/get-shipping-estimate-flow';
import { createShipment, CreateShipmentInput } from '@/ai/flows/create-shipment-flow';
import { AddressAutocomplete } from '@/components/address-autocomplete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Loader2, PlusCircle, Trash2, Calculator, Check,
  ChevronsUpDown, CheckCircle2, AlertCircle, User,
} from 'lucide-react';
import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// ── Schema ───────────────────────────────────────────────────────────────────
const pkgSchema = z.object({
  weight:      z.coerce.number().min(0.1, 'Weight required'),
  length:      z.coerce.number().optional(),
  width:       z.coerce.number().optional(),
  height:      z.coerce.number().optional(),
  value:       z.coerce.number().optional(),
  description: z.string().min(1, 'Description required'),
});

const formSchema = z.object({
  shipmentType:        z.enum(['import', 'export']),
  originAddress:       z.string().min(1, 'Origin required'),
  destinationAddress:  z.string().min(1, 'Destination required'),
  packages:            z.array(pkgSchema).min(1),
});

type FormValues = z.infer<typeof formSchema>;

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminBookingForm() {
  const { profile: adminProfile } = useProfile();

  // Data
  const [users,    setUsers]    = useState<UserProfile[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading,  setLoading]  = useState(true);

  // Customer picker
  const [customer,     setCustomer]     = useState<UserProfile | null>(null);
  const [custOpen,     setCustOpen]     = useState(false);
  const [custSearch,   setCustSearch]   = useState('');

  // Estimate / booking state
  const [estimating,   setEstimating]   = useState(false);
  const [booking,      setBooking]      = useState(false);
  const [estimate,     setEstimate]     = useState<GetShippingEstimateOutput | null>(null);
  const [serviceType,  setServiceType]  = useState('');
  const [bookedId,     setBookedId]     = useState('');
  const [estimateErr,  setEstimateErr]  = useState('');

  const { control, handleSubmit, watch, setValue, register, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        shipmentType:       'import',
        originAddress:      'United States',
        destinationAddress: '',
        packages: [{ weight: undefined as any, length: undefined as any, width: undefined as any, height: undefined as any, value: undefined as any, description: '' }],
      },
    });

  const { fields, append, remove } = useFieldArray({ control, name: 'packages' });
  const shipmentType = watch('shipmentType');
  const isImport     = shipmentType === 'import';
  const units        = isImport && watch('originAddress') === 'United States' ? 'imperial' : 'metric';

  useEffect(() => {
    (async () => {
      try {
        const [u, s] = await Promise.all([getCachedAllUsers(), getSettings()]);
        setUsers(u);
        setSettings(s);
      } catch { toast({ variant: 'destructive', title: 'Error', description: 'Could not load data.' }); }
      finally { setLoading(false); }
    })();
  }, []);

  // Reset estimate when form changes
  const resetEstimate = () => { setEstimate(null); setServiceType(''); setEstimateErr(''); setBookedId(''); };

  const onGetEstimate = handleSubmit(async (data) => {
    if (!customer) { toast({ variant: 'destructive', title: 'Select a customer first' }); return; }
    if (!settings) return;
    resetEstimate();
    setEstimating(true);
    try {
      const result = await getShippingEstimate({
        address:            isImport ? data.originAddress : data.destinationAddress,
        destinationAddress: isImport ? data.destinationAddress : undefined,
        packages:           data.packages.map(p => ({ weight: +p.weight, length: +(p.length??0), width: +(p.width??0), height: +(p.height??0), description: p.description, value: +(p.value??0) })),
        units: (isImport && data.originAddress === 'United States') ? 'imperial' : 'metric',
        shipmentType:  data.shipmentType,
        customer,
        settings,
      });
      if (result.error) { setEstimateErr(result.error); }
      else { setEstimate(result); setServiceType(result.estimates?.[0]?.serviceType ?? ''); }
    } catch (e: any) { setEstimateErr(e.message); }
    finally { setEstimating(false); }
  });

  const onConfirmBook = handleSubmit(async (data) => {
    if (!customer || !serviceType || !estimate) return;
    setBooking(true);
    try {
      const input: CreateShipmentInput = {
        originAddress:      data.originAddress,
        destinationAddress: data.destinationAddress,
        packages:           data.packages.map(p => ({ weight: +p.weight, length: +(p.length??0), width: +(p.width??0), height: +(p.height??0), description: p.description, value: +(p.value??0) })),
        serviceType:        serviceType as ServiceType,
        shipper: { name: `${customer.firstname} ${customer.lastname}`, email: customer.email, phone: customer.phone_number || '' },
        receiver: { name: 'Receiver Name', email: 'receiver@example.com', phone: '0000000000' },
        customer,
      };
      const result = await createShipment(input);
      setBookedId(result.shipmentId);
      toast({ title: 'Shipment Created!', description: `ID: ${result.shipmentId}` });
    } catch (e: any) { toast({ variant: 'destructive', title: 'Booking failed', description: e.message }); }
    finally { setBooking(false); }
  });

  const filteredUsers = users.filter(u =>
    `${u.firstname} ${u.lastname} ${u.email}`.toLowerCase().includes(custSearch.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-blue-400" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">

      {/* ── Select Customer ──────────────────────────────────────────────── */}
      <section className="space-y-1">
        <h2 className="font-semibold text-base">Select Customer</h2>
        <p className="text-sm text-blue-600">Choose the customer you are creating a shipment for.</p>
        <Separator className="my-2" />
        <Popover open={custOpen} onOpenChange={setCustOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 w-full max-w-sm h-10 px-3 border rounded-md text-sm bg-white hover:bg-gray-50 transition">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className={cn('flex-1 text-left', !customer && 'text-muted-foreground')}>
                {customer ? `${customer.firstname} ${customer.lastname} (${customer.email})` : 'Search customer…'}
              </span>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput placeholder="Search customer…" value={custSearch} onValueChange={setCustSearch} />
              <CommandList>
                <CommandEmpty>No customer found.</CommandEmpty>
                <CommandGroup>
                  {filteredUsers.map(u => (
                    <CommandItem
                      key={u.uid}
                      value={u.uid}
                      onSelect={() => {
                        setCustomer(u);
                        setValue('destinationAddress', [u.address, u.city, u.state].filter(Boolean).join(', '));
                        setCustOpen(false);
                        resetEstimate();
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', customer?.uid === u.uid ? 'opacity-100' : 'opacity-0')} />
                      <div>
                        <div className="text-sm font-medium">{u.firstname} {u.lastname}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </section>

      {/* ── Shipment Details ─────────────────────────────────────────────── */}
      <section className="space-y-1">
        <h2 className="font-semibold text-base">Shipment Details</h2>
        <p className="text-sm text-blue-600">Select a shipment type below and fill out the form. Click "Get Estimate" for a price quote.</p>
        <Separator className="my-2" />

        {/* Import / Export toggle */}
        <div className="flex gap-2 py-2">
          {(['import', 'export'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setValue('shipmentType', t);
                setValue('originAddress', t === 'import' ? 'United States' : '');
                resetEstimate();
              }}
              className={cn(
                'px-6 py-1.5 rounded-full text-sm font-semibold capitalize transition-all',
                shipmentType === t
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {t === 'import' ? '📦 Import' : '✈️ Export'}
            </button>
          ))}
        </div>

        {/* Addresses */}
        <div className="space-y-4 pt-2">
          <p className="text-sm font-semibold text-gray-700">Addresses</p>

          {/* Origin */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Origin Address</label>
            <p className="text-xs text-blue-500">
              {isImport ? 'Where is the shipment coming from?' : 'Where is the shipment coming from? (Nigeria only)'}
            </p>
            {isImport ? (
              <select
                {...register('originAddress')}
                onChange={e => { setValue('originAddress', e.target.value); resetEstimate(); }}
                className="w-full h-9 border rounded-md px-3 text-sm bg-white"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            ) : (
              <Controller
                control={control}
                name="originAddress"
                render={({ field }) => (
                  <AddressAutocomplete
                    onAddressSelect={a => { field.onChange(a.description); resetEstimate(); }}
                    defaultValue={field.value}
                    country="ng"
                  />
                )}
              />
            )}
            {errors.originAddress && <p className="text-xs text-red-500">{errors.originAddress.message}</p>}
          </div>

          {/* Destination */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Destination Address</label>
            <p className="text-xs text-blue-500">Where is the shipment going?</p>
            <Controller
              control={control}
              name="destinationAddress"
              render={({ field }) => (
                <AddressAutocomplete
                  onAddressSelect={a => { field.onChange(a.description); resetEstimate(); }}
                  defaultValue={field.value}
                  country={isImport ? 'ng' : undefined}
                />
              )}
            />
            {errors.destinationAddress && <p className="text-xs text-red-500">{errors.destinationAddress.message}</p>}
          </div>
        </div>

        {/* Package Details */}
        <div className="space-y-3 pt-4">
          <p className="text-sm font-semibold text-gray-700">Package Details</p>
          {fields.map((field, i) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-3 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Package {i + 1}</span>
                {fields.length > 1 && (
                  <button type="button" onClick={() => { remove(i); resetEstimate(); }} className="text-red-400 hover:text-red-600 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Dimension row */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { name: `packages.${i}.weight` as const, label: `Weight (${units === 'imperial' ? 'lbs' : 'kg'})`, placeholder: 'e.g. 1.5' },
                  { name: `packages.${i}.length` as const, label: `Length (${units === 'imperial' ? 'in' : 'cm'})`, placeholder: 'e.g. 50' },
                  { name: `packages.${i}.width`  as const, label: `Width (${units === 'imperial' ? 'in' : 'cm'})`,  placeholder: 'e.g. 50' },
                  { name: `packages.${i}.height` as const, label: `Height (${units === 'imperial' ? 'in' : 'cm'})`, placeholder: 'e.g. 50' },
                  { name: `packages.${i}.value`  as const, label: 'Value (NGN)',  placeholder: 'e.g. 50000' },
                ].map(({ name, label, placeholder }) => (
                  <div key={name} className="space-y-1">
                    <label className="text-xs text-gray-500">{label}</label>
                    <Input
                      type="number"
                      placeholder={placeholder}
                      {...register(name)}
                      onChange={() => resetEstimate()}
                      className="h-8 text-xs"
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Package Description</label>
                <Textarea
                  placeholder="e.g. 10 boxes of assorted books, 1 wooden table"
                  {...register(`packages.${i}.description`)}
                  onChange={() => resetEstimate()}
                  className="text-xs min-h-[70px]"
                />
                {errors.packages?.[i]?.description && (
                  <p className="text-xs text-red-500">{errors.packages[i]?.description?.message}</p>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => { append({ weight: undefined as any, length: undefined as any, width: undefined as any, height: undefined as any, value: undefined as any, description: '' }); resetEstimate(); }}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1 font-medium"
          >
            <PlusCircle className="h-4 w-4" /> Add Another Package
          </button>
        </div>

        {/* Estimate error */}
        {estimateErr && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" /> {estimateErr}
          </div>
        )}

        {/* ── Get Estimate button ───────────────────────────────────────── */}
        {!estimate && !bookedId && (
          <div className="pt-2">
            <Button
              type="button"
              onClick={onGetEstimate}
              disabled={estimating}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-10 rounded-lg gap-2"
            >
              {estimating ? <><Loader2 className="h-4 w-4 animate-spin" />Estimating…</> : <><Calculator className="h-4 w-4" />Get Estimate</>}
            </Button>
          </div>
        )}

        {/* ── Estimate results ─────────────────────────────────────────── */}
        {estimate && !bookedId && (
          <div className="space-y-4 pt-4 border-t">
            <p className="text-sm font-semibold text-gray-700">Choose a Service</p>
            <RadioGroup value={serviceType} onValueChange={setServiceType} className="space-y-2">
              {estimate.estimates?.map(svc => (
                <Label
                  key={svc.serviceType}
                  htmlFor={svc.serviceType}
                  className={cn(
                    'flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm',
                    serviceType === svc.serviceType ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={svc.serviceType} id={svc.serviceType} />
                    <span className="font-semibold text-sm">{svc.serviceName}</span>
                  </div>
                  <span className="font-bold text-blue-700 text-sm">
                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(svc.estimate ?? 0)}
                  </span>
                </Label>
              ))}
            </RadioGroup>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={resetEstimate} className="h-10">
                ← Back
              </Button>
              <Button
                type="button"
                onClick={onConfirmBook}
                disabled={!serviceType || booking}
                className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-8 gap-2"
              >
                {booking ? <><Loader2 className="h-4 w-4 animate-spin" />Booking…</> : 'Confirm & Book Shipment'}
              </Button>
            </div>
          </div>
        )}

        {/* ── Booked confirmation ───────────────────────────────────────── */}
        {bookedId && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Shipment Created Successfully!</p>
              <p className="text-xs font-mono mt-0.5">ID: {bookedId}</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => { resetEstimate(); setCustomer(null); }} className="ml-auto">
              New Booking
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
