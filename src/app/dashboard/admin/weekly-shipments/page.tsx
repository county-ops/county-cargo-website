'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { WeeklyShipment, PackageReceipt } from '@/lib/types';
import { verifyShipmentAndNotify, createWeeklyShipment } from '@/lib/user-actions';
import { useProfile } from '@/components/profile-provider';
import { toast } from '@/hooks/use-toast';
import { format, isValid } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import {
  Loader2, SendHorizonal, PlayCircle, ChevronDown, ChevronRight,
  Package, CheckCircle2, Clock, ShieldCheck, Bell, FileText,
  ArrowRight, PackagePlus, ScanBarcode, Layers, MailCheck,
  CalendarDays, Wand2, Info, ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { getShipmentWindow } from '@/lib/shipment-window';

// ── Flow Step Card ─────────────────────────────────────────────────────────────
function FlowStep({
  step, icon: Icon, title, description, action, active, done, last = false,
}: {
  step: number; icon: React.ElementType; title: string; description: string;
  action?: React.ReactNode; active?: boolean; done?: boolean; last?: boolean;
}) {
  return (
    <div className="flex items-stretch gap-0 flex-1 min-w-[180px]">
      <div className={cn(
        'flex flex-col rounded-xl border-2 p-4 gap-3 flex-1 transition-all',
        done   && 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20',
        active && !done && 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/20 shadow-md shadow-blue-100',
        !done && !active && 'border-muted bg-card',
      )}>
        {/* Step number + icon */}
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
            done   ? 'bg-emerald-500 text-white' : active ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground',
          )}>
            {done ? <CheckCircle2 className="h-4 w-4" /> : step}
          </div>
          <Icon className={cn('h-4 w-4', done ? 'text-emerald-600' : active ? 'text-blue-600' : 'text-muted-foreground')} />
        </div>
        {/* Text */}
        <div>
          <p className={cn('font-semibold text-sm', done ? 'text-emerald-700 dark:text-emerald-300' : active ? 'text-blue-700 dark:text-blue-300' : 'text-foreground')}>
            {title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
        </div>
        {/* Action */}
        {action && <div className="mt-auto">{action}</div>}
      </div>
      {/* Arrow connector */}
      {!last && (
        <div className="flex items-center px-1 shrink-0">
          <ArrowRight className={cn('h-4 w-4', done ? 'text-emerald-400' : 'text-muted-foreground/40')} />
        </div>
      )}
    </div>
  );
}

function verificationBadge(s: string) {
  return s === 'verified'
    ? <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1 text-xs"><CheckCircle2 className="h-3 w-3" />Verified</Badge>
    : <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1 text-xs"><Clock className="h-3 w-3" />Pending Verification</Badge>;
}

function notifBadge(s: string) {
  return s === 'sent'
    ? <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-xs gap-1"><Bell className="h-3 w-3" />Notifications Sent</Badge>
    : <Badge className="bg-slate-100 text-slate-600 border-slate-200 text-xs">Not Sent Yet</Badge>;
}

// ── Manual Generate Panel ─────────────────────────────────────────────────────
function ManualGeneratePanel({
  adminProfile,
  onGenerated,
}: {
  adminProfile: any;
  onGenerated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [pickedDate, setPickedDate] = useState('');
  const [running, setRunning] = useState(false);

  const window_ = useMemo(() => {
    if (!pickedDate) return null;
    const d = new Date(pickedDate + 'T12:00:00');
    if (!isValid(d)) return null;
    return getShipmentWindow(d);
  }, [pickedDate]);

  const handleGenerate = async () => {
    if (!window_ || !adminProfile) return;
    setRunning(true);
    try {
      // Use the Friday of the selected window as the override date
      const result = await createWeeklyShipment({
        auto: false,
        adminProfile,
        nowOverride: new Date(pickedDate + 'T12:00:00'),
      });
      const total = result.shipments.reduce((s, r) => s + r.packageCount, 0);
      toast({
        title: `✅ ${result.shipments.length} batch(es) created`,
        description: `${total} package(s) batched for ${window_.weekLabel}.`,
      });
      setPickedDate('');
      setOpen(false);
      onGenerated();
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Generation failed', description: e.message });
    } finally {
      setRunning(false);
    }
  };

  return (
    <Card className="rounded-2xl border-2 border-violet-200 bg-white shadow-sm overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-violet-50/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-violet-100 flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-violet-600" />
          </div>
          <div className="text-left">
            <p className="font-bold text-violet-950 text-sm">Manual Shipment Generation</p>
            <p className="text-xs text-violet-500 font-medium">Pick any date to generate a batch for that week's window</p>
          </div>
        </div>
        {open
          ? <ChevronUp className="h-5 w-5 text-violet-400" />
          : <ChevronDown className="h-5 w-5 text-violet-400" />}
      </button>

      {/* Expanded body */}
      {open && (
        <div className="border-t border-violet-100 px-6 py-6 space-y-5 bg-violet-50/20">

          {/* Date picker */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-bold text-violet-800 uppercase tracking-widest">
                Select any date in the target week
              </label>
              <input
                type="date"
                value={pickedDate}
                onChange={e => setPickedDate(e.target.value)}
                max={format(new Date(), 'yyyy-MM-dd')}
                className="h-11 px-4 rounded-xl border-2 border-violet-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:border-violet-500 transition-colors w-full sm:max-w-xs"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!window_ || running}
              className="h-11 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold gap-2 shadow-lg shadow-violet-100 disabled:opacity-40"
            >
              {running
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
                : <><Wand2 className="h-4 w-4" /> Generate Batch</>}
            </Button>
          </div>

          {/* Window preview */}
          {window_ && (
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border-2 border-violet-200 shadow-sm">
                <CalendarDays className="h-4 w-4 text-violet-500" />
                <div>
                  <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Week Label</p>
                  <p className="font-black text-violet-900 text-sm font-mono">{window_.weekLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border-2 border-violet-200 shadow-sm">
                <ArrowRight className="h-4 w-4 text-violet-400" />
                <div>
                  <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Window</p>
                  <p className="font-bold text-violet-900 text-sm">
                    {format(window_.weekStart, 'EEE dd MMM')} → {format(window_.cutoffDate, 'EEE dd MMM yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 rounded-xl border-2 border-amber-200">
                <Info className="h-4 w-4 text-amber-500 shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  Only packages with <strong>verificationStatus = verified</strong> and no existing shipment in this window will be batched.
                </p>
              </div>
            </div>
          )}

          {!pickedDate && (
            <p className="text-xs text-violet-400 font-medium italic">
              ← Pick a date above to preview the shipment window before generating.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function WeeklyShipmentsPage() {
  const { profile: adminProfile } = useProfile();
  const isAdmin = adminProfile?.role === 'Admin';

  const [shipments, setShipments] = useState<WeeklyShipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [packageCache, setPackageCache] = useState<Record<string, PackageReceipt[]>>({});
  const [verifying, setVerifying] = useState<Set<string>>(new Set());
  const [runningCron, setRunningCron] = useState(false);

  useEffect(() => {
    document.title = 'Weekly Shipments | County Cargo';
    const unsub = onSnapshot(collection(db, 'weekly_shipments'), snap => {
      const docs = snap.docs.map(d => {
        const data = d.data();
        return {
          ...data, docId: d.id,
          weekStart: (data.weekStart as Timestamp).toDate(),
          cutoffDate: (data.cutoffDate as Timestamp).toDate(),
          createdAt: (data.createdAt as Timestamp).toDate(),
          verifiedAt: data.verifiedAt ? (data.verifiedAt as Timestamp).toDate() : null,
        } as WeeklyShipment;
      }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setShipments(docs);
      setLoading(false);
    }, err => { console.error(err); setLoading(false); });
    return unsub;
  }, []);

  const toggleExpand = async (shipment: WeeklyShipment) => {
    const id = shipment.docId;
    const next = new Set(expanded);
    if (next.has(id)) { next.delete(id); setExpanded(next); return; }
    next.add(id); setExpanded(next);
    if (!packageCache[id]) {
      const packages: PackageReceipt[] = [];
      for (const pkgId of shipment.packageDocIds) {
        const snap = await getDoc(doc(db, 'package_receipts', pkgId));
        if (snap.exists()) packages.push({ ...snap.data(), docId: snap.id } as PackageReceipt);
      }
      setPackageCache(prev => ({ ...prev, [id]: packages }));
    }
  };

  const handleVerify = async (shipment: WeeklyShipment) => {
    if (!adminProfile) return;
    setVerifying(prev => new Set(prev).add(shipment.docId));
    try {
      const result = await verifyShipmentAndNotify(shipment.docId, adminProfile);
      toast({ title: '✅ Shipment Verified & Notified', description: `${result.notified} notification(s) sent, ${result.invoiced} invoice(s) created.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setVerifying(prev => { const s = new Set(prev); s.delete(shipment.docId); return s; });
    }
  };

  const handleRunNow = async () => {
    if (!adminProfile) return;
    setRunningCron(true);
    try {
      const result = await createWeeklyShipment({ auto: false, adminProfile });
      const totalPackages = result.shipments.reduce((sum, s) => sum + s.packageCount, 0);
      toast({ title: `✅ ${result.shipments.length} Shipment Batch(es) Created`, description: `${totalPackages} verified package(s) batched across locations.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Could not create shipment', description: e.message });
    } finally { setRunningCron(false); }
  };

  // Derive flow state from data
  const pendingShipments = shipments.filter(s => s.verificationStatus === 'pending');
  const hasShipments = shipments.length > 0;
  const allVerified = hasShipments && shipments.every(s => s.verificationStatus === 'verified');

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl md:text-3xl text-blue-950 tracking-tight">Weekly Shipments</h1>
        <p className="text-sm text-blue-700/70 font-medium">Follow the 4-step flow below to batch, verify, notify and invoice your customers.</p>
      </div>

      {/* ── Manual Generate Panel ─────────────────────────────────────────── */}
      {isAdmin && (
        <ManualGeneratePanel
          adminProfile={adminProfile}
          onGenerated={() => {}}
        />
      )}

      {/* ── Visual Flow Pipeline ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-blue-200 bg-white shadow-sm p-6">
        <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-5">Shipment Workflow</p>
        <div className="flex flex-wrap gap-4">

          {/* Step 1 */}
          <FlowStep
            step={1}
            icon={PackagePlus}
            title="Add & Verify Packages"
            description="Scan or add packages in Batch Add. Then click Verify on each package."
            done={hasShipments}
            action={
              <Link href="/dashboard/admin/batch-add-package">
                <Button size="sm" variant="outline" className="w-full h-9 text-xs gap-1.5 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl">
                  <ScanBarcode className="h-3.5 w-3.5" />Go to Batch Add
                </Button>
              </Link>
            }
          />

          {/* Step 2 */}
          <FlowStep
            step={2}
            icon={Layers}
            title="Create Weekly Batch"
            description="Groups all verified packages into location-based batches. Runs automatically Wed 23:59 UK."
            active={!hasShipments || pendingShipments.length > 0}
            done={hasShipments}
            action={isAdmin ? (
              <Button
                size="sm"
                onClick={handleRunNow}
                disabled={runningCron}
                className={cn(
                  'w-full h-10 text-xs font-bold gap-1.5 rounded-xl transition-all',
                  hasShipments
                    ? 'bg-slate-700 hover:bg-slate-800 text-white shadow-sm'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
                )}
              >
                {runningCron
                  ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Creating…</>
                  : <><PlayCircle className="h-3.5 w-3.5" />Run Batch Now</>}
              </Button>
            ) : (
              <p className="text-xs text-blue-400 italic font-medium">Runs automatically Wed 23:59 UK</p>
            )}
          />

          {/* Step 3 */}
          <FlowStep
            step={3}
            icon={ShieldCheck}
            title="Verify & Send Notifications"
            description="Admin reviews the batch, then clicks Verify & Send. Customers are emailed instantly."
            active={hasShipments && pendingShipments.length > 0}
            done={allVerified && hasShipments}
            action={
              pendingShipments.length > 0 && isAdmin ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold text-amber-600">
                    {pendingShipments.length} batch(es) awaiting verification
                  </p>
                  {pendingShipments.slice(0, 2).map(s => (
                    <Button
                      key={s.docId}
                      size="sm"
                      onClick={() => handleVerify(s)}
                      disabled={verifying.has(s.docId)}
                      className="w-full h-10 text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100 rounded-xl"
                    >
                      {verifying.has(s.docId)
                        ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Verifying…</>
                        : <><SendHorizonal className="h-3.5 w-3.5" />Verify & Send — {s.shipmentId}</>}
                    </Button>
                  ))}
                </div>
              ) : allVerified && hasShipments ? (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />All batches verified
                </p>
              ) : (
                <p className="text-xs text-blue-300 italic font-medium">Available after Step 2</p>
              )
            }
          />

          {/* Step 4 */}
          <FlowStep
            step={4}
            icon={FileText}
            title="Invoices Generated"
            description="Invoices are auto-created for each customer. View, edit amounts and mark as paid."
            done={allVerified && hasShipments}
            last
            action={
              <Link href="/dashboard/admin/invoices">
                <Button size="sm" className={cn(
                  'w-full h-10 text-xs font-bold gap-1.5 rounded-xl transition-all',
                  allVerified && hasShipments
                    ? 'bg-blue-900 hover:bg-black text-white shadow-lg shadow-blue-200'
                    : 'bg-blue-50 text-blue-300 hover:bg-blue-100'
                )}>
                  <MailCheck className="h-3.5 w-3.5" />View Invoices
                </Button>
              </Link>
            }
          />
        </div>
      </div>

      {/* ── Shipments Table ───────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl text-blue-950">All Shipment Batches</h2>
          {isAdmin && (
            <Button onClick={handleRunNow} disabled={runningCron} size="sm" variant="outline" className="gap-1.5 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl font-bold">
              {runningCron ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4" />}
              Run Batch Now
            </Button>
          )}
        </div>

        <div className="rounded-2xl border border-blue-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-blue-50/50 border-b border-blue-200/50">
                <th className="w-10 px-4 py-4" />
                <th className="px-4 py-4 text-left font-bold text-blue-900">Shipment ID</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900 whitespace-nowrap">Week Range</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900 whitespace-nowrap">Cut-off</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Location</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Packages</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Weight</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Verification</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900">Notifications</th>
                <th className="px-4 py-4 text-left font-bold text-blue-900 whitespace-nowrap">Created</th>
                <th className="px-4 py-4 text-center font-bold text-blue-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-blue-100/50">
                  {Array.from({ length: 11 }).map((_, j) => (
                    <td key={j} className="px-4 py-4"><Skeleton className="h-5 w-full" /></td>
                  ))}
                </tr>
              ))}

              {!loading && shipments.map(s => (
                <React.Fragment key={s.docId}>
                  <tr className={cn(
                    'border-b border-blue-200/70 transition-colors hover:bg-blue-50/50 group',
                    expanded.has(s.docId) && 'bg-blue-50/30',
                  )}>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => toggleExpand(s)} className="text-blue-400 hover:text-blue-700 transition-colors">
                        {expanded.has(s.docId) ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono font-bold text-sm text-blue-600">{s.shipmentId}</span>
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-blue-900 whitespace-nowrap">
                      {format(s.weekStart, 'dd MMM')} – {format(s.cutoffDate, 'dd MMM yyyy')}
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-blue-800 whitespace-nowrap">
                      {format(s.cutoffDate, 'EEE dd MMM, HH:mm')} UK
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-950 text-xs whitespace-nowrap">
                      {s.location || 'Global'}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 font-bold text-blue-950">
                        <Package className="h-4 w-4 text-blue-400" />{s.packageCount}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-blue-950">{s.totalWeight?.toFixed(2) ?? '—'} kg</td>
                    <td className="px-4 py-4">{verificationBadge(s.verificationStatus)}</td>
                    <td className="px-4 py-4">{notifBadge(s.notificationStatus)}</td>
                    <td className="px-4 py-4 text-xs font-medium text-blue-700/60 whitespace-nowrap">
                      {format(s.createdAt, 'dd MMM yyyy, HH:mm')}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {s.verificationStatus === 'pending' && isAdmin ? (
                        <Button
                          size="sm"
                          onClick={() => handleVerify(s)}
                          disabled={verifying.has(s.docId)}
                          className="h-9 text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap px-4 rounded-xl shadow-lg shadow-emerald-100"
                        >
                          {verifying.has(s.docId)
                            ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Verifying…</>
                            : <><SendHorizonal className="h-3.5 w-3.5" />Verify & Send</>}
                        </Button>
                      ) : s.verificationStatus === 'verified' ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                          <CheckCircle2 className="h-4 w-4" />Done
                        </span>
                      ) : (
                        <span className="text-xs text-blue-300 font-medium">—</span>
                      )}
                    </td>
                  </tr>

                  {/* Expanded package list */}
                  {expanded.has(s.docId) && (
                    <tr className="border-b border-blue-200/70 bg-blue-50/10">
                      <td colSpan={11} className="px-10 py-6">
                        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
                          <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-600" />
                            Packages in this batch
                          </p>
                          {!packageCache[s.docId] ? (
                            <div className="flex items-center gap-3 text-sm text-blue-600 font-medium">
                              <Loader2 className="h-4 w-4 animate-spin" />Loading packages…
                            </div>
                          ) : packageCache[s.docId].length === 0 ? (
                            <p className="text-sm text-blue-400 font-medium italic">No packages found.</p>
                          ) : (
                            <table className="w-full text-xs border-collapse">
                              <thead>
                                <tr className="border-b border-blue-50">
                                  {['Tracking ID','Customer','Weight (kg)','Location','Courier','Status'].map(h => (
                                    <th key={h} className="py-2 pr-4 text-left text-blue-900 font-bold">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {packageCache[s.docId].map(pkg => (
                                  <tr key={pkg.docId} className="border-b border-dashed border-blue-50 hover:bg-blue-50/30 transition-colors">
                                    <td className="py-2.5 pr-4 font-mono font-bold text-blue-600">{pkg.trackingNumber || '—'}</td>
                                    <td className="py-2.5 pr-4 font-bold text-blue-950">{pkg.customerName}</td>
                                    <td className="py-2.5 pr-4 font-bold text-blue-900">{pkg.weight ?? '—'} kg</td>
                                    <td className="py-2.5 pr-4 font-medium">{pkg.location}</td>
                                    <td className="py-2.5 pr-4 font-medium">{pkg.courier || '—'}</td>
                                    <td className="py-2.5 pr-4">
                                      <Badge variant="secondary" className="text-xs font-bold bg-blue-50 text-blue-700 border-blue-100">
                                        {pkg.status?.replace(/_/g, ' ') || 'added'}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {!loading && shipments.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-24 text-center text-blue-300">
                    <Package className="h-16 w-16 opacity-10 mx-auto mb-4" />
                    <p className="font-bold text-xl text-blue-900">No shipment batches yet</p>
                    <p className="text-sm font-medium text-blue-400 mt-1">Follow steps 1 → 2 above to create your first weekly batch</p>
                    {isAdmin && (
                      <Button onClick={handleRunNow} disabled={runningCron} size="sm" className="mt-6 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 h-11 shadow-lg shadow-blue-200">
                        {runningCron ? <Loader2 className="h-5 w-5 animate-spin" /> : <PlayCircle className="h-5 w-5" />}
                        Run Batch Now
                      </Button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs font-bold text-blue-900/50 px-1 mt-3">{shipments.length} shipment batch(es) in records</p>
      </div>
    </div>
  );
}
