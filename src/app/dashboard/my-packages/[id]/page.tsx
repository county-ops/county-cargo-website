'use client';

import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, Timestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageReceipt, TrackingReceipt, Invoice } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
  ArrowLeft, Package, Printer, Download, CheckCircle2, Clock,
  FileText, CreditCard, Truck, MapPin, AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ── 12-Step Timeline config ───────────────────────────────────────────────────
type TimelineStep = {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  colour: string;
};

const TIMELINE: TimelineStep[] = [
  { key: 'added',            label: 'Received at Hub',       description: 'Package scanned and logged at warehouse',      icon: Package,     colour: 'blue' },
  { key: 'verified',         label: 'Verified',              description: 'Package details confirmed by staff',           icon: CheckCircle2,colour: 'blue' },
  { key: 'shipment_created', label: 'Shipment Created',      description: 'Added to weekly shipment batch',               icon: Truck,       colour: 'blue' },
  { key: 'inbound',          label: 'Inbound Package',       description: 'Package marked as inbound',                   icon: Package,     colour: 'violet' },
  { key: 'invoiced',         label: 'Invoice Generated',     description: 'Invoice created for this package',            icon: FileText,    colour: 'violet' },
  { key: 'notification_sent',label: 'Invoice Sent',          description: 'Invoice and notification sent to customer',    icon: FileText,    colour: 'sky' },
  { key: '_payment_pending', label: 'Payment Pending',       description: 'Awaiting payment from customer',              icon: CreditCard,  colour: 'orange' },
  { key: '_payment_paid',    label: 'Payment Confirmed',     description: 'Payment received and confirmed',              icon: CheckCircle2,colour: 'teal' },
  { key: 'shipped',          label: 'In Transit',            description: 'Package dispatched and in transit',           icon: Truck,       colour: 'blue' },
  { key: 'at_collection',    label: 'At Collection Point',   description: 'Package arrived at collection point',         icon: MapPin,      colour: 'purple' },
  { key: 'ready_for_pickup', label: 'Ready for Pickup',      description: 'Package ready for collection',                icon: MapPin,      colour: 'amber' },
  { key: 'delivered',        label: 'Delivered',             description: 'Package successfully delivered',              icon: CheckCircle2,colour: 'emerald' },
];

const STEP_ORDER = TIMELINE.map(s => s.key);

const COLOUR_MAP: Record<string, string> = {
  blue:    'bg-blue-600 text-white border-blue-600',
  violet:  'bg-violet-600 text-white border-violet-600',
  sky:     'bg-sky-500 text-white border-sky-500',
  orange:  'bg-orange-500 text-white border-orange-500',
  teal:    'bg-teal-600 text-white border-teal-600',
  purple:  'bg-purple-600 text-white border-purple-600',
  amber:   'bg-amber-500 text-white border-amber-500',
  emerald: 'bg-emerald-600 text-white border-emerald-600',
};

function getActiveIndex(status: string, paymentStatus?: string): number {
  if (status === 'notification_sent') {
    if (paymentStatus === 'paid') return STEP_ORDER.indexOf('_payment_paid');
    return STEP_ORDER.indexOf('_payment_pending');
  }
  const idx = STEP_ORDER.indexOf(status);
  return idx === -1 ? 1 : idx; // default to verified (1) if unknown
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyPackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [pkg, setPkg] = useState<PackageReceipt | null>(null);
  const [receipt, setReceipt] = useState<TrackingReceipt | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Package Tracking | County Cargo';

    // Listen to the package
    const unsub = onSnapshot(doc(db, 'package_receipts', id), async snap => {
      if (!snap.exists()) { setLoading(false); return; }
      const data = snap.data();
      const p = {
        ...data,
        docId: snap.id,
        notifiedAt: data.notifiedAt ? (data.notifiedAt as Timestamp).toDate() : new Date(),
      } as PackageReceipt;
      setPkg(p);

      // Load receipt
      if (p.receiptId) {
        const rSnap = await getDocs(query(
          collection(db, 'tracking_receipts'),
          where('packageDocId', '==', snap.id),
        ));
        if (!rSnap.empty) {
          const rd = rSnap.docs[0].data();
          setReceipt({
            ...rd,
            docId: rSnap.docs[0].id,
            scannedAt: (rd.scannedAt as Timestamp).toDate(),
          } as TrackingReceipt);
        }
      }

      // Load invoice — only if status is 'sent' or 'paid'
      if (p.invoiceId) {
        const invSnap = await getDocs(query(
          collection(db, 'invoices'),
          where('packageDocId', '==', snap.id),
        ));
        if (!invSnap.empty) {
          const inv = invSnap.docs[0].data();
          const invStatus = inv.status as string;
          if (['sent', 'paid'].includes(invStatus)) {
            setInvoice({
              ...inv,
              docId: invSnap.docs[0].id,
              createdAt: (inv.createdAt as Timestamp).toDate(),
              invoiceDate: inv.invoiceDate ? (inv.invoiceDate as Timestamp).toDate() : (inv.createdAt as Timestamp).toDate(),
              dueDate: inv.dueDate ? (inv.dueDate as Timestamp).toDate() : null,
              sentAt: inv.sentAt ? (inv.sentAt as Timestamp).toDate() : null,
              paidAt: inv.paidAt ? (inv.paidAt as Timestamp).toDate() : null,
            } as Invoice);
          }
        }
      }

      setLoading(false);
    });

    return unsub;
  }, [id]);

  if (loading) return (
    <div className="flex flex-col gap-4 max-w-3xl">
      {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-xl" />)}
    </div>
  );

  if (!pkg) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
      <AlertCircle className="h-10 w-10 opacity-30" />
      <p className="font-medium">Package not found</p>
      <Link href="/dashboard/my-packages"><Button variant="outline" size="sm">Back to My Packages</Button></Link>
    </div>
  );

  const paymentStatus = invoice?.paymentStatus;
  const activeIdx = getActiveIndex(pkg.status, paymentStatus);

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50 max-w-5xl mx-auto">
      {/* Back */}
      <Link href="/dashboard/my-packages">
        <Button variant="ghost" size="sm" className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-black uppercase tracking-widest text-[10px] -ml-2">
          <ArrowLeft className="h-4 w-4" /> Back to Logistics
        </Button>
      </Link>

      {/* Header Card */}
      <div className="rounded-[2rem] border-2 border-blue-100 bg-white shadow-2xl shadow-blue-100/30 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-8 py-8 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest opacity-80">Shipment Tracking ID</p>
              <h2 className="font-black text-3xl md:text-4xl tracking-tightest leading-none">
                {pkg.trackingNumber || id}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-blue-100 mt-2">
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 opacity-70" /> {pkg.location}</span>
                <span className="flex items-center gap-2 border-l border-white/20 pl-4"><Clock className="h-4 w-4 opacity-70" /> Received {format(pkg.notifiedAt, 'dd MMM yyyy')}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <StatusBadge status={pkg.status} />
              {pkg.courier && (
                <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
                  Carrier: {pkg.courier}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Collection point banner */}
        {pkg.collectionPoint && (
          <div className="flex items-center gap-4 px-8 py-4 bg-blue-50/50 border-b border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Designated Collection Point</p>
              <p className="text-lg font-black text-blue-950 tracking-tight">{pkg.collectionPoint}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="rounded-[2rem] border-2 border-blue-50 bg-white shadow-xl shadow-blue-50/50 p-8">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-8 border-b border-blue-50 pb-4">Real-time Logistics Lifecycle</h3>
            <div className="flex flex-col gap-0">
              {TIMELINE.map((step, idx) => {
                const isDone = idx < activeIdx;
                const isActive = idx === activeIdx;
                const isFuture = idx > activeIdx;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'w-10 h-10 rounded-2xl border-2 flex items-center justify-center shrink-0 z-10 transition-all duration-500 shadow-sm',
                        isDone   && 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-100',
                        isActive && cn(COLOUR_MAP[step.colour], 'scale-110 shadow-lg'),
                        isFuture && 'bg-white border-blue-50 text-blue-200',
                      )}>
                        {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      {idx < TIMELINE.length - 1 && (
                        <div className={cn('w-1 flex-1 my-1.5 min-h-[30px] rounded-full transition-colors duration-500', isDone ? 'bg-emerald-200' : 'bg-blue-50')} />
                      )}
                    </div>
                    <div className={cn('pb-8 flex-1 min-w-0', idx === TIMELINE.length - 1 && 'pb-0')}>
                      <div className="flex items-center justify-between">
                        <p className={cn(
                          'font-black text-base tracking-tight leading-none',
                          isDone   && 'text-emerald-700',
                          isActive && 'text-blue-950',
                          isFuture && 'text-slate-300',
                        )}>
                          {step.label}
                        </p>
                        {isActive && (
                          <Badge className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-2 h-5 rounded-md animate-pulse">Live</Badge>
                        )}
                      </div>
                      <p className={cn('text-xs mt-2 font-medium leading-relaxed', isFuture ? 'text-slate-300' : 'text-slate-500')}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Cards */}
        <div className="lg:col-span-5 space-y-8">
          {/* Package Details */}
          <div className="rounded-[2rem] border-2 border-blue-50 bg-white shadow-xl shadow-blue-50/50 p-8">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 border-b border-blue-50 pb-4">Hardware Profile</h3>
            <div className="grid gap-6">

              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Metric Weight" value={pkg.weight ? `${pkg.weight} kg` : 'Calculating...'} />
                <InfoItem label="Origin Location" value={pkg.location} />
              </div>
              <InfoItem label="Primary Courier" value={pkg.courier || 'County Cargo'} />
              {pkg.comment && (
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 mt-2">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Internal Notes</p>
                  <p className="text-sm text-blue-900 font-bold italic leading-relaxed">"{pkg.comment}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Tracking Receipt */}
          <div className="rounded-[2rem] border-2 border-blue-50 bg-white shadow-xl shadow-blue-50/50 overflow-hidden">
            <div className="p-8 pb-0">
               <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 border-b border-blue-50 pb-4">Digital Manifest</h3>
            </div>
            {receipt ? (
              <div className="p-8 pt-0 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Manifest #" value={receipt.receiptId} />
                  <InfoItem label="Verified Date" value={format(receipt.scannedAt, 'dd MMM yyyy')} />
                </div>
                <div className="flex gap-3">
                  <Link href={`/dashboard/tracking-receipts/${receipt.docId}`} target="_blank" className="flex-1">
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-blue-100 text-blue-700 hover:bg-blue-50 gap-2">
                      <Printer className="h-4 w-4" /> Print
                    </Button>
                  </Link>
                  <Link href={`/dashboard/tracking-receipts/${receipt.docId}`} target="_blank" className="flex-1">
                    <Button className="w-full h-12 rounded-xl font-black bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 gap-2">
                      <Download className="h-4 w-4" /> PDF
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-blue-50/30">
                <FileText className="h-10 w-10 mx-auto mb-3 text-blue-200" />
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Awaiting Generation</p>
              </div>
            )}
          </div>

          {/* Invoice */}
          {invoice && (
            <div className="rounded-[2rem] border-2 border-blue-50 bg-white shadow-xl shadow-blue-50/50 overflow-hidden">
              <div className="p-8 pb-0 flex items-center justify-between">
                 <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 border-b border-blue-50 pb-4 flex-1">Financial Statement</h3>
                 <div className="mb-6"><PaymentBadge status={invoice.paymentStatus} /></div>
              </div>
              <div className="p-8 pt-0 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Statement #" value={invoice.invoiceId} />
                  <InfoItem label="Total Value" value={`${invoice.currency} ${Number(invoice.currency === 'NGN' && invoice.exchangeRate ? (invoice.convertedAmount || (invoice.amount * invoice.exchangeRate)) : (invoice.convertedAmount || invoice.amount)).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
                </div>
                <Link href={`/dashboard/admin/invoices/${invoice.docId}`} target="_blank">
                  <Button className="w-full h-14 rounded-2xl font-black bg-blue-950 hover:bg-slate-900 shadow-xl shadow-slate-200 gap-3 text-base">
                    <Download className="h-5 w-5" /> Download Statement
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {!invoice && (pkg.status === 'invoiced' || pkg.status === 'notification_sent') && (
            <div className="rounded-[2rem] border-2 border-amber-100 bg-amber-50/50 p-8 text-center shadow-lg shadow-amber-50">
              <CreditCard className="h-10 w-10 mx-auto mb-4 text-amber-300 animate-bounce" />
              <p className="text-xs font-black text-amber-700 uppercase tracking-widest">Generating Invoice</p>
              <p className="text-[11px] text-amber-600 font-bold mt-2 leading-relaxed">Our finance team is currently preparing your shipping statement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const MAP: Record<string, string> = {
    verified:          'bg-indigo-500 text-white shadow-indigo-200',
    shipment_created:  'bg-sky-500 text-white shadow-sky-200',
    inbound:           'bg-blue-600 text-white shadow-blue-200',
    invoiced:          'bg-amber-500 text-white shadow-amber-200',
    notification_sent: 'bg-orange-500 text-white shadow-orange-200',
    shipped:           'bg-blue-800 text-white shadow-blue-300',
    at_collection:     'bg-emerald-500 text-white shadow-emerald-200',
    ready_for_pickup:  'bg-emerald-600 text-white shadow-emerald-300',
    delivered:         'bg-slate-500 text-white shadow-slate-200',
  };
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return <Badge className={cn('text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border-0', MAP[status] ?? 'bg-slate-600 text-white')}>{label}</Badge>;
}

function PaymentBadge({ status }: { status: string }) {
  const MAP: Record<string, string> = {
    unpaid:    'bg-red-600 text-white shadow-red-200',
    part_paid: 'bg-amber-500 text-white shadow-amber-200',
    paid:      'bg-emerald-600 text-white shadow-emerald-200',
  };
  const labels: Record<string, string> = { unpaid: 'Unpaid', part_paid: 'Partial', paid: 'Confirmed' };
  return <Badge className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-md border-0', MAP[status] ?? 'bg-slate-600 text-white')}>{labels[status] ?? status}</Badge>;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{label}</span>
      <span className="text-sm text-blue-950 font-black tracking-tight break-words">{value}</span>
    </div>
  );
}
