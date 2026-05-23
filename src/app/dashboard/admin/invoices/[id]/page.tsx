'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Invoice } from '@/lib/types';
import { updateInvoice, sendInvoiceToCustomer, deleteInvoice } from '@/lib/user-actions';
import { useProfile } from '@/components/profile-provider';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Save, Send, CheckCircle2, Printer, Trash2, ArrowLeft, Package, AlertCircle, ShieldCheck, Download, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const STATUS_META: Record<string, { label: string; cls: string }> = {
  draft:                { label: 'Draft',                cls: 'bg-slate-100 text-slate-700 border-slate-300' },
  generated:            { label: 'Generated',            cls: 'bg-violet-100 text-violet-700 border-violet-300' },
  pending_verification: { label: 'Pending Verification', cls: 'bg-amber-100 text-amber-700 border-amber-300' },
  ready_to_send:        { label: 'Ready to Send',        cls: 'bg-sky-100 text-sky-700 border-sky-300' },
  sent:                 { label: 'Sent',                 cls: 'bg-blue-100 text-blue-700 border-blue-300' },
  paid:                 { label: 'Paid',                 cls: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  overdue:              { label: 'Overdue',              cls: 'bg-red-100 text-red-700 border-red-300' },
  cancelled:            { label: 'Cancelled',            cls: 'bg-gray-100 text-gray-600 border-gray-300' },
};
const PAYMENT_META: Record<string, { label: string; cls: string }> = {
  unpaid:    { label: 'Unpaid',    cls: 'bg-red-50 text-red-700 border-red-300' },
  part_paid: { label: 'Part Paid', cls: 'bg-amber-50 text-amber-700 border-amber-300' },
  paid:      { label: 'Paid',      cls: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function inputCls() {
  return 'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-sm h-9';
}

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { profile } = useProfile();
  const router = useRouter();
  const isAdmin = profile?.role === 'Admin';

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifyingInv, setVerifyingInv] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Editable fields
  const [form, setForm] = useState({
    status: '', paymentStatus: '', currency: 'GBP', dueDate: '',
    customerPhone: '', courier: '', location: '', description: '',
    weight: '', rate: '6', handlingFee: '', deliveryFee: '', storageFee: '', discount: '',
    pendingCardFee: '15', deliveryLocation: '', pickupRequired: false, pickupFee: '', pickupLocation: '',
    notes: '', termsAndConditions: '',
    exchangeRate: '',
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'invoices', id), snap => {
      if (!snap.exists()) { setLoading(false); return; }
      const data = snap.data();
      const inv = {
        ...data, docId: snap.id,
        createdAt: (data.createdAt as Timestamp).toDate(),
        invoiceDate: data.invoiceDate ? (data.invoiceDate as Timestamp).toDate() : (data.createdAt as Timestamp).toDate(),
        dueDate: data.dueDate ? (data.dueDate as Timestamp).toDate() : null,
        sentAt: data.sentAt ? (data.sentAt as Timestamp).toDate() : null,
        paidAt: data.paidAt ? (data.paidAt as Timestamp).toDate() : null,
      } as Invoice;
      setInvoice(inv);
      setForm({
        status: inv.status || 'draft',
        paymentStatus: inv.paymentStatus || 'unpaid',
        currency: inv.currency || 'GBP',
        dueDate: inv.dueDate ? format(inv.dueDate as Date, 'yyyy-MM-dd') : format(inv.invoiceDate || inv.createdAt, 'yyyy-MM-dd'),
        customerPhone: inv.customerPhone || '',
        courier: inv.courier || '',
        location: inv.location || '',
        description: inv.description || '',
        weight: String(inv.weight || ''),
        rate: String(inv.rate || '6'),
        handlingFee: String(inv.handlingFee || ''),
        deliveryFee: String(inv.deliveryFee || ''),
        deliveryLocation: inv.deliveryLocation || '',
        storageFee: String(inv.storageFee || ''),
        pendingCardFee: String(inv.pendingCardFee !== undefined ? inv.pendingCardFee : '15'),
        pickupRequired: inv.pickupRequired || false,
        pickupFee: String(inv.pickupFee || ''),
        pickupLocation: inv.pickupLocation || '',
        discount: String(inv.discount || ''),
        notes: inv.notes || '',
        termsAndConditions: inv.termsAndConditions || 'Payment is due within 14 days of invoice date.\nLate payments may incur additional charges.\nAll prices are in the currency stated above.',
        exchangeRate: String(inv.exchangeRate || ''),
      });
      setLoading(false);
    });
    return unsub;
  }, [id]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const n = (v: string) => parseFloat(v) || 0;

  const subtotal = n(form.weight) * n(form.rate);
  const fees = n(form.handlingFee) + n(form.deliveryFee) + n(form.storageFee) + n(form.pendingCardFee) + (form.pickupRequired ? n(form.pickupFee) : 0);
  const grandTotal = subtotal + fees - n(form.discount);

  const handleSave = async () => {
    if (!invoice) return;
    setSaving(true);
    try {
      await updateInvoice(invoice.docId, {
        ...form,
        weight: n(form.weight), rate: n(form.rate),
        handlingFee: n(form.handlingFee), deliveryFee: n(form.deliveryFee),
        storageFee: n(form.storageFee), discount: n(form.discount),
        pendingCardFee: n(form.pendingCardFee), pickupFee: form.pickupRequired ? n(form.pickupFee) : 0,
        subtotal, amount: grandTotal,
        exchangeRate: n(form.exchangeRate),
        convertedAmount: n(form.exchangeRate) > 0 ? grandTotal * n(form.exchangeRate) : grandTotal,
      });
      toast({ title: 'Invoice Saved', description: 'All changes have been saved.' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally { setSaving(false); }
  };

  const validateInvoice = () => {
    const errors = [];
    if (!invoice?.customerName?.trim()) errors.push('Customer Name');
    if (!invoice?.customerEmail?.trim()) errors.push('Customer Email');
    if (!form.customerPhone?.trim()) errors.push('Customer Phone');
    if (!form.description?.trim()) errors.push('Package Description');
    if (!form.courier?.trim()) errors.push('Courier');
    if (!invoice?.invoiceDate) errors.push('Invoice Date');
    if (!form.dueDate?.trim()) errors.push('Due Date');
    return errors;
  };

  const handleSend = async () => {
    if (!invoice || !profile) return;
    const errors = validateInvoice();
    if (errors.length > 0) {
      toast({ variant: 'destructive', title: 'Cannot Send', description: `Missing required fields: ${errors.join(', ')}` });
      return;
    }
    setSending(true);
    try {
      await sendInvoiceToCustomer(invoice.docId, profile);
      toast({ title: 'Invoice Sent', description: `Sent to ${invoice.customerEmail}` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Cannot Send', description: e.message });
    } finally { setSending(false); }
  };

  const handleDelete = async () => {
    if (!invoice || !isAdmin) return;
    if (!confirm('Delete this invoice permanently?')) return;
    setDeleting(true);
    try {
      await deleteInvoice(invoice.docId);
      router.push('/dashboard/admin/invoices');
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
      setDeleting(false);
    }
  };

  // Verify invoice: pending_verification → ready_to_send
  const handleVerifyInvoice = async () => {
    if (!invoice || !isAdmin) return;
    const errors = validateInvoice();
    if (errors.length > 0) {
      toast({ variant: 'destructive', title: 'Cannot Verify', description: `Missing required fields: ${errors.join(', ')}` });
      return;
    }
    setVerifyingInv(true);
    try {
      await updateInvoice(invoice.docId, { status: 'ready_to_send' });
      setForm(p => ({ ...p, status: 'ready_to_send' }));
      toast({ title: '✅ Invoice Verified', description: 'Invoice is now ready to send.' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally { setVerifyingInv(false); }
  };

  // Download PDF — opens print dialog targeting the invoice document
  const handleDownloadPDF = () => {
    const errors = validateInvoice();
    if (errors.length > 0) {
      toast({ variant: 'destructive', title: 'Cannot Download PDF', description: `Missing required fields: ${errors.join(', ')}` });
      return;
    }
    window.print();
  };

  const canVerifyInvoice = form.status === 'pending_verification' && isAdmin;
  const canSend = ['ready_to_send', 'generated'].includes(form.status);
  const isPaid = form.paymentStatus === 'paid';
  const statusM = STATUS_META[form.status] ?? STATUS_META['draft'];
  const paymentM = PAYMENT_META[form.paymentStatus] ?? PAYMENT_META['unpaid'];

  if (loading) return (
    <div className="flex flex-col gap-4 p-6">
      {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
    </div>
  );
  if (!invoice) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
      <AlertCircle className="h-10 w-10 opacity-40" />
      <p className="font-medium">Invoice not found</p>
      <Link href="/dashboard/admin/invoices"><Button variant="outline" size="sm">Back to Invoices</Button></Link>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/admin/invoices">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />Back
            </Button>
          </Link>
          <h1 className="font-bold text-lg">{invoice.invoiceId}</h1>
          <Badge className={cn('border text-xs', statusM.cls)}>{statusM.label}</Badge>
          <Badge className={cn('border text-xs', paymentM.cls)}>{paymentM.label}</Badge>
        </div>
        {/* Action buttons — all 6 */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* 1. Save Draft */}
          <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}
            className="gap-1.5 border-slate-300 hover:bg-slate-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Draft
          </Button>

          {/* 2. Verify Invoice (pending_verification → ready_to_send) */}
          {canVerifyInvoice && (
            <Button size="sm" onClick={handleVerifyInvoice} disabled={verifyingInv}
              className="gap-1.5 bg-amber-500 hover:bg-amber-600 text-white">
              {verifyingInv ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Verify Invoice
            </Button>
          )}

          {/* 3. Send Invoice */}
          <Button size="sm" onClick={handleSend} disabled={sending || !canSend}
            className={cn('gap-1.5 text-white', canSend ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed')}
            title={!canSend ? 'Invoice must be verified before sending' : ''}>
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send Invoice
          </Button>

          {/* 4. Mark as Paid */}
          {!isPaid && (
            <Button variant="outline" size="sm"
              onClick={() => { setForm(p => ({ ...p, paymentStatus: 'paid', status: 'paid' })); setTimeout(handleSave, 50); }}
              className="gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              <CheckCircle2 className="h-4 w-4" />Mark as Paid
            </Button>
          )}

          {/* 5. Download PDF */}
          <Button variant="outline" size="sm" onClick={handleDownloadPDF}
            className="gap-1.5 border-blue-200 text-blue-700 hover:bg-blue-50">
            <Download className="h-4 w-4" />Download PDF
          </Button>

          {/* 6. Print */}
          <Button variant="outline" size="sm" onClick={() => window.print()}
            className="gap-1.5 border-slate-200 text-slate-600 hover:bg-slate-50">
            <Printer className="h-4 w-4" />Print
          </Button>

          {/* Admin delete */}
          {isAdmin && (
            <Button variant="ghost" size="sm" onClick={handleDelete} disabled={deleting}
              className="text-destructive hover:text-destructive hover:bg-red-50 gap-1.5 ml-1">
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Status warning */}
        {!canSend && form.status === 'pending_verification' && (
          <div className="w-full flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>This invoice is <strong>Pending Verification</strong>. {isAdmin ? 'Click "Verify Invoice" to mark it ready to send.' : 'An admin must verify this invoice before it can be sent.'}</span>
          </div>
        )}
        {!canSend && !['pending_verification','sent','paid','cancelled'].includes(form.status) && (
          <div className="w-full flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            Verify the weekly shipment first, then verify this invoice to enable sending.
          </div>
        )}
      </div>

      {/* Invoice Document */}
      <div className="rounded-2xl border border-blue-100 bg-white dark:bg-card shadow-md overflow-hidden print:shadow-none print:border-none">

        {/* Blue header stripe */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white print:bg-blue-600">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">County Cargo</span>
              </div>
              <p className="text-blue-100 text-sm">Professional Cargo & Logistics</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black tracking-tight text-white/90">INVOICE</p>
              <p className="text-blue-200 font-mono text-sm mt-1">{invoice.invoiceId}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 flex flex-col gap-6">

          {/* Dates + Status row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-b border-blue-50 pb-5">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase mb-0.5">Invoice Date</p>
              <p className="font-medium">{format(invoice.invoiceDate || invoice.createdAt, 'dd MMM yyyy')}</p>
            </div>
            <Field label="Due Date">
              <Input type="date" value={form.dueDate} onChange={set('dueDate')} className={cn(inputCls(), 'h-8 text-xs')} />
            </Field>
            <Field label="Invoice Status">
              <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
                <SelectTrigger className={cn('h-8 text-xs border-blue-200 focus:ring-blue-500')}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_META).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Payment Status">
              <Select value={form.paymentStatus} onValueChange={v => setForm(p => ({ ...p, paymentStatus: v }))}>
                <SelectTrigger className={cn('h-8 text-xs border-blue-200 focus:ring-blue-500')}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PAYMENT_META).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Company + Customer */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* From */}
            <div className="rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 p-4">
              <p className="text-xs font-bold text-blue-600 uppercase mb-3">Bill From</p>
              <p className="font-bold text-sm">County Cargo</p>
              <p className="text-xs text-muted-foreground mt-1">Unit G6, 67-83 Norfolk Street</p>
              <p className="text-xs text-muted-foreground">QD Business Centre</p>
              <p className="text-xs text-muted-foreground">Liverpool</p>
              <p className="text-xs text-muted-foreground">L1 0BG</p>
              <p className="text-xs text-muted-foreground">United Kingdom</p>
              <div className="mt-2 pt-2 border-t border-blue-100">
                <p className="text-xs text-muted-foreground">Shipment ID: <span className="font-medium text-foreground">{invoice.shipmentId}</span></p>
                {invoice.shipmentWeek && <p className="text-xs text-muted-foreground">Week: <span className="font-medium">{invoice.shipmentWeek}</span></p>}
              </div>
            </div>
            {/* To */}
            <div className="rounded-xl border border-blue-100 p-4">
              <p className="text-xs font-bold text-blue-600 uppercase mb-3">Bill To</p>
              <p className="font-bold text-sm">{invoice.customerName}</p>
              <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{invoice.customerAddress || 'Address not provided'}</p>
              <p className="text-xs text-muted-foreground">{invoice.customerEmail}</p>
              <Field label="Phone">
                <Input value={form.customerPhone} onChange={set('customerPhone')} className={cn(inputCls(), 'mt-1')} placeholder="+44 …" />
              </Field>
            </div>
          </div>

          {/* UK Invoicing Details */}
          <div className="space-y-6">
            <p className="text-xs font-bold text-blue-600 uppercase mb-3">Package / Shipment Details</p>
            
            <div className="grid md:grid-cols-2 gap-6 bg-blue-50/30 p-5 rounded-2xl border border-blue-100">
              {/* Basic Cargo */}
              <div className="space-y-4">
                <Field label="Cargo Description">
                  <Input value={form.description} onChange={set('description')} className={inputCls()} placeholder="Cargo desc…" />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Weight (kg)">
                    <Input type="number" value={form.weight} onChange={set('weight')} className={inputCls()} />
                  </Field>
                  <Field label="Rate (£/kg)">
                    <Input type="number" value={form.rate} onChange={set('rate')} className={inputCls()} />
                  </Field>
                </div>
                <Field label="Handling Charges">
                  <div className="flex items-center gap-2">
                    <Select value={['15','20','30'].includes(form.pendingCardFee) ? form.pendingCardFee : 'custom'} onValueChange={v => {
                      if (v !== 'custom') setForm(p => ({ ...p, pendingCardFee: v }));
                    }}>
                      <SelectTrigger className={cn(inputCls(), "w-[120px]")}>
                        <SelectValue placeholder="Fee..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">£15 (Default)</SelectItem>
                        <SelectItem value="20">£20</SelectItem>
                        <SelectItem value="30">£30</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">£</span>
                      <Input type="number" value={form.pendingCardFee} onChange={set('pendingCardFee')} className={cn(inputCls(), "pl-7")} />
                    </div>
                  </div>
                </Field>
              </div>

              {/* Delivery & Pickup */}
              <div className="space-y-4 border-l border-blue-100 pl-6">
                <Field label="Delivery Fee">
                  <div className="flex items-center gap-2">
                    <Select value={['10','20','30'].includes(form.deliveryFee) ? form.deliveryFee : (form.deliveryFee ? 'custom' : '')} onValueChange={v => {
                      if (v !== 'custom') setForm(p => ({ ...p, deliveryFee: v }));
                    }}>
                      <SelectTrigger className={cn(inputCls(), "w-[120px]")}>
                        <SelectValue placeholder="Fee..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">£10</SelectItem>
                        <SelectItem value="20">£20</SelectItem>
                        <SelectItem value="30">£30</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">£</span>
                      <Input type="number" value={form.deliveryFee} onChange={set('deliveryFee')} className={cn(inputCls(), "pl-7")} placeholder="0.00" />
                    </div>
                  </div>
                </Field>
                <Field label="Delivery Location / Notes">
                  <Input value={form.deliveryLocation} onChange={set('deliveryLocation')} className={inputCls()} placeholder="e.g. Coventry" />
                </Field>

                <div className="pt-2 border-t border-blue-100/50 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pickup" checked={form.pickupRequired} onCheckedChange={(c) => setForm(p => ({ ...p, pickupRequired: !!c }))} />
                    <label htmlFor="pickup" className="text-sm font-medium text-blue-900 cursor-pointer">
                      ✅ Pickup Required
                    </label>
                  </div>
                  
                  {form.pickupRequired && (
                    <div className="grid gap-3 bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                      <Field label="Pickup Location">
                        <Input value={form.pickupLocation} onChange={set('pickupLocation')} className={inputCls()} placeholder="e.g. London" />
                      </Field>
                      <Field label="Pickup Fee">
                        <div className="flex items-center gap-2">
                          <Select value={['10','20','30'].includes(form.pickupFee) ? form.pickupFee : (form.pickupFee ? 'custom' : '')} onValueChange={v => {
                            if (v !== 'custom') setForm(p => ({ ...p, pickupFee: v }));
                          }}>
                            <SelectTrigger className={cn(inputCls(), "w-[120px]")}>
                              <SelectValue placeholder="Fee..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">£10</SelectItem>
                              <SelectItem value="20">£20</SelectItem>
                              <SelectItem value="30">£30</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">£</span>
                            <Input type="number" value={form.pickupFee} onChange={set('pickupFee')} className={cn(inputCls(), "pl-7")} placeholder="0.00" />
                          </div>
                        </div>
                      </Field>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end gap-2">
            <div className="w-full max-w-sm flex flex-col gap-1 text-sm border border-blue-100 rounded-2xl bg-slate-50/50 p-5">
              <p className="text-xs font-bold text-blue-600 uppercase mb-2 border-b border-blue-100 pb-2">Invoice Breakdown</p>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Cargo Weight Charge</span>
                <span className="font-medium">{form.currency} {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Handling Charges</span>
                <span>{form.currency} {n(form.pendingCardFee).toFixed(2)}</span>
              </div>
              {n(form.deliveryFee) > 0 && (
                <div className="flex justify-between py-1.5 text-blue-700">
                  <span>Delivery Fee {form.deliveryLocation && <span className="text-xs opacity-70">({form.deliveryLocation})</span>}</span>
                  <span>{form.currency} {n(form.deliveryFee).toFixed(2)}</span>
                </div>
              )}
              {form.pickupRequired && (
                <div className="flex justify-between py-1.5 text-amber-700">
                  <span>Pickup Fee {form.pickupLocation && <span className="text-xs opacity-70">({form.pickupLocation})</span>}</span>
                  <span>{form.currency} {n(form.pickupFee).toFixed(2)}</span>
                </div>
              )}
              {n(form.handlingFee) > 0 && (
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Handling Fee</span>
                  <span>{form.currency} {n(form.handlingFee).toFixed(2)}</span>
                </div>
              )}
              {n(form.storageFee) > 0 && (
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Additional Charges (Storage)</span>
                  <span>{form.currency} {n(form.storageFee).toFixed(2)}</span>
                </div>
              )}
              {n(form.discount) > 0 && (
                <div className="flex justify-between py-1.5 text-emerald-600">
                  <span>Discount</span>
                  <span>−{form.currency} {n(form.discount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t-2 border-blue-600 pt-2 mt-1">
                <span className="font-bold text-base text-blue-700">Grand Total</span>
                <span className="font-black text-xl text-blue-700">{form.currency} {grandTotal.toFixed(2)}</span>
              </div>

              {n(form.exchangeRate) > 0 && (
                <div className="flex justify-between items-center border-t border-blue-200 pt-2 mt-1 bg-blue-50/50 -mx-5 px-5 py-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-[10px] text-blue-500 uppercase leading-none">Converted Total</span>
                    <span className="text-[10px] text-muted-foreground italic">Rate: 1 {form.currency} = {n(form.exchangeRate)} NGN</span>
                  </div>
                  <span className="font-bold text-lg text-blue-800">₦{(grandTotal * n(form.exchangeRate)).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="mt-1 grid grid-cols-2 gap-2">
                <Field label="Currency">
                  <Select value={form.currency} onValueChange={v => setForm(p => ({ ...p, currency: v }))}>
                    <SelectTrigger className="h-8 text-xs border-blue-200 focus:ring-blue-500 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['GBP','USD','EUR','NGN'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Discount">
                  <Input type="number" value={form.discount} onChange={set('discount')} className={cn(inputCls(), 'h-8')} placeholder="0.00" />
                </Field>
              </div>
              <div className="mt-1">
                <Field label="Exchange Rate (to NGN)">
                  <div className="relative">
                    <Input type="number" value={form.exchangeRate} onChange={set('exchangeRate')} className={cn(inputCls(), 'h-8 pl-7')} placeholder="0.00" />
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">₦</span>
                  </div>
                </Field>
              </div>
            </div>
          </div>

          {/* Notes + Terms */}
          <div className="grid md:grid-cols-2 gap-4 border-t border-blue-50 pt-5">
            <Field label="Notes">
              <Textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-sm min-h-[80px] resize-none"
                placeholder="Any additional notes for this invoice…" />
            </Field>
            <Field label="Terms & Conditions">
              <Textarea value={form.termsAndConditions} onChange={e => setForm(p => ({ ...p, termsAndConditions: e.target.value }))}
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-sm min-h-[80px] resize-none"
                placeholder="Payment terms…" />
            </Field>
          </div>

          {/* Footer */}
          <div className="border-t border-blue-50 pt-4 flex items-center justify-between text-xs text-muted-foreground print:flex">
            <span>Created: {format(invoice.createdAt, 'dd MMM yyyy')}</span>
            {invoice.sentAt && <span>Sent: {format(invoice.sentAt as Date, 'dd MMM yyyy')}</span>}
            {invoice.paidAt && <span className="text-emerald-600">Paid: {format(invoice.paidAt as Date, 'dd MMM yyyy')}</span>}
            <span className="font-mono">{invoice.invoiceId}</span>
          </div>
        </div>
      </div>

      {/* Bottom sticky action bar */}
      <div className="print:hidden sticky bottom-4 z-10">
        <div className="flex items-center justify-between gap-2 flex-wrap rounded-2xl border border-blue-100 bg-white/95 dark:bg-card/95 shadow-lg backdrop-blur px-5 py-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileCheck className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{invoice.invoiceId}</span>
            <span>·</span>
            <Badge className={cn('border text-xs', statusM.cls)}>{statusM.label}</Badge>
            <Badge className={cn('border text-xs', paymentM.cls)}>{paymentM.label}</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}Save
            </Button>
            {canVerifyInvoice && (
              <Button size="sm" onClick={handleVerifyInvoice} disabled={verifyingInv}
                className="gap-1.5 bg-amber-500 hover:bg-amber-600 text-white">
                {verifyingInv ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldCheck className="h-3.5 w-3.5" />}Verify Invoice
              </Button>
            )}
            <Button size="sm" onClick={handleSend} disabled={sending || !canSend}
              className={cn('gap-1.5 text-white', canSend ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-200 cursor-not-allowed')}>
              {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}Send Invoice
            </Button>
            {!isPaid && (
              <Button variant="outline" size="sm"
                onClick={() => { setForm(p => ({ ...p, paymentStatus: 'paid', status: 'paid' })); setTimeout(handleSave, 50); }}
                className="gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <CheckCircle2 className="h-3.5 w-3.5" />Mark Paid
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="gap-1.5 border-blue-200 text-blue-700 hover:bg-blue-50">
              <Download className="h-3.5 w-3.5" />PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
