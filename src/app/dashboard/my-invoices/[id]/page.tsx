'use client';

import React, { useEffect, useState } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Invoice } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { ArrowLeft, Download, Printer, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

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

const getBaseCurrency = (location: string | undefined, shipmentId: string | undefined, selectedCurrency: string | undefined) => {
  const loc = (location || '').toLowerCase();
  const shipId = (shipmentId || '').toLowerCase();
  const curr = (selectedCurrency || 'GBP').toUpperCase();

  if (curr !== 'NGN') {
    return curr;
  }

  if (
    loc.includes('us') || 
    loc.includes('usa') || 
    loc.includes('houston') || 
    loc.includes('united states') || 
    shipId.includes('-us-') || 
    shipId.includes('us-') || 
    shipId.startsWith('us')
  ) {
    return 'USD';
  }
  
  return 'GBP';
};

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'GBP': return '£';
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'NGN': return '₦';
    default: return currency;
  }
};

export default function MyInvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { profile } = useProfile();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!profile) return; // Wait for profile
      try {
        const snap = await getDoc(doc(db, 'invoices', id));
        if (snap.exists()) {
          const data = snap.data();
          // Security Check: Ensure user is the owner or an admin
          if (data.customerId !== profile.uid && profile.role !== 'Admin') {
            setLoading(false);
            return;
          }
          
          const inv = {
            ...data, docId: snap.id,
            createdAt: (data.createdAt as Timestamp).toDate(),
            invoiceDate: data.invoiceDate ? (data.invoiceDate as Timestamp).toDate() : (data.createdAt as Timestamp).toDate(),
            dueDate: data.dueDate ? (data.dueDate as Timestamp).toDate() : null,
            sentAt: data.sentAt ? (data.sentAt as Timestamp).toDate() : null,
            paidAt: data.paidAt ? (data.paidAt as Timestamp).toDate() : null,
          } as Invoice;
          setInvoice(inv);
        }
      } catch (err) {
        console.error("Failed to fetch invoice:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id, profile]);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (!loading && invoice && searchParams.get('print') === 'true') {
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, invoice, searchParams]);

  if (loading) return (
    <div className="flex flex-col gap-4 p-6">
      {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
    </div>
  );

  if (!invoice) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
      <AlertCircle className="h-10 w-10 opacity-40" />
      <p className="font-medium">Invoice not found</p>
      <Link href="/dashboard/my-invoices"><Button variant="outline" size="sm">Back to My Invoices</Button></Link>
    </div>
  );

  const statusM = STATUS_META[invoice.status] ?? STATUS_META['draft'];
  const paymentM = PAYMENT_META[invoice.paymentStatus] ?? PAYMENT_META['unpaid'];

  const n = (val: any) => { const v = parseFloat(val); return isNaN(v) ? 0 : v; };
  
  const subtotal = n(invoice.weight) * n(invoice.rate);
  const grandTotal = subtotal 
    + n(invoice.pendingCardFee) 
    + n(invoice.deliveryFee) 
    + n(invoice.pickupFee) 
    + n(invoice.handlingFee) 
    + n(invoice.storageFee) 
    - n(invoice.discount);

  const baseCurrency = getBaseCurrency(invoice.location, invoice.shipmentId, invoice.currency);
  const baseSymbol = getCurrencySymbol(baseCurrency);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-10">
      {/* Top action bar - Hidden on print */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <Link href="/dashboard/my-invoices">
          <Button variant="ghost" size="sm" className="gap-2 text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" /> Back to Invoices
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button onClick={() => window.print()} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200">
            <Printer className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      </div>

      {/* Invoice Document Body */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Image src="/logo.png" alt="County Cargo Logo" width={180} height={60} className="object-contain -ml-2" />
            <div className="space-y-1 text-sm text-slate-500">
              <p className="font-semibold text-slate-900">County Cargo</p>
              <p>Unit G6, 67-83 Norfolk Street</p>
              <p>QD Business Centre</p>
              <p>Liverpool L1 0BG, UK</p>
            </div>
          </div>
          <div className="md:text-right space-y-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-blue-950 mb-2 uppercase">Invoice</h1>
              <p className="text-xl font-medium text-slate-500">#{invoice.invoiceId}</p>
            </div>
            <div className="flex items-center md:justify-end gap-2">
              <Badge className={cn('border', paymentM.cls)}>{paymentM.label}</Badge>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Billed To</h3>
            <div className="space-y-1">
              <p className="font-bold text-lg text-slate-900">{invoice.customerName}</p>
              <p className="text-sm text-slate-500">{invoice.customerEmail}</p>
              {invoice.customerPhone && <p className="text-sm text-slate-500">{invoice.customerPhone}</p>}
              {invoice.customerAddress && <p className="text-sm text-slate-500 whitespace-pre-wrap mt-2">{invoice.customerAddress}</p>}
            </div>
          </div>
          
          <div className="space-y-4 rounded-2xl p-6 border border-slate-100">
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Invoice Details</h3>
             <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div className="text-slate-500">Invoice Date:</div>
                <div className="font-medium text-slate-900">{format(invoice.invoiceDate || invoice.createdAt, 'dd MMM yyyy')}</div>
                
                {invoice.dueDate && (
                  <>
                    <div className="text-slate-500">Due Date:</div>
                    <div className={cn("font-medium", new Date() > invoice.dueDate && invoice.paymentStatus !== 'paid' ? "text-red-600 font-bold" : "text-slate-900")}>
                      {format(invoice.dueDate, 'dd MMM yyyy')}
                    </div>
                  </>
                )}
                
                {invoice.trackingNumber && (
                  <>
                    <div className="text-slate-500">Tracking Ref:</div>
                    <div className="font-bold text-blue-600">{invoice.trackingNumber}</div>
                  </>
                )}
             </div>
          </div>
        </div>

        {/* Package Specs */}
        {(invoice.description || n(invoice.weight) > 0) && (
          <div className="mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Package Details</h3>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                  <tr>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4 text-center">Weight</th>
                    <th className="px-6 py-4 text-right">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-5 font-medium text-slate-900">{invoice.description || 'Cargo Package'}</td>
                    <td className="px-6 py-5 text-center text-slate-600">{invoice.weight} kg</td>
                    <td className="px-6 py-5 text-right text-slate-600">{baseCurrency} {n(invoice.rate).toFixed(2)}/kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Breakdown & Total */}
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div className="flex-1 space-y-6">
            {(invoice.notes || invoice.termsAndConditions) && (
              <div className="space-y-6 max-w-sm">
                {invoice.notes && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Notes</h4>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{invoice.notes}</p>
                  </div>
                )}
                {invoice.termsAndConditions && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Terms & Conditions</h4>
                    <p className="text-xs text-slate-500 whitespace-pre-wrap leading-relaxed">{invoice.termsAndConditions}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="w-full md:w-80 space-y-4">
            <div className="space-y-3 text-sm px-2">
              <div className="flex justify-between text-slate-600">
                <span>Cargo Weight Charge</span>
                <span className="font-medium text-slate-900">{baseCurrency} {subtotal.toFixed(2)}</span>
              </div>
              
              {n(invoice.pendingCardFee) > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Handling Charges</span>
                  <span className="font-medium text-slate-900">{baseCurrency} {n(invoice.pendingCardFee).toFixed(2)}</span>
                </div>
              )}
              
              {n(invoice.deliveryFee) > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee {invoice.deliveryLocation && <span className="text-xs opacity-70">({invoice.deliveryLocation})</span>}</span>
                  <span className="font-medium text-slate-900">{baseCurrency} {n(invoice.deliveryFee).toFixed(2)}</span>
                </div>
              )}
              
              {n(invoice.pickupFee) > 0 && invoice.pickupRequired && (
                <div className="flex justify-between text-slate-600">
                  <span>Pickup Fee {invoice.pickupLocation && <span className="text-xs opacity-70">({invoice.pickupLocation})</span>}</span>
                  <span className="font-medium text-slate-900">{baseCurrency} {n(invoice.pickupFee).toFixed(2)}</span>
                </div>
              )}
              
              {n(invoice.handlingFee) > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Additional Handling</span>
                  <span className="font-medium text-slate-900">{baseCurrency} {n(invoice.handlingFee).toFixed(2)}</span>
                </div>
              )}

              {n(invoice.storageFee) > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Storage Fee</span>
                  <span className="font-medium text-slate-900">{baseCurrency} {n(invoice.storageFee).toFixed(2)}</span>
                </div>
              )}
              
              {n(invoice.discount) > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-medium">−{baseCurrency} {n(invoice.discount).toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="border-t-2 border-slate-100 pt-4 px-2">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Total</span>
                <div className="text-right">
                  <div className="text-2xl font-black tracking-tight text-blue-950 leading-none">{baseCurrency} {grandTotal.toFixed(2)}</div>
                  {n(invoice.exchangeRate) > 0 && (
                    <div className="text-sm font-bold text-blue-600 mt-2">
                      ≈ ₦{(grandTotal * n(invoice.exchangeRate)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {invoice.paymentStatus !== 'paid' && (
              <div className="mt-6 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm text-center font-medium border border-blue-100 print:hidden">
                Please proceed to payment from your dashboard to clear this invoice.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
