'use client';

import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TrackingReceipt } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Printer, Download, ArrowLeft, Package, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// QR code — client only
const QRCodeSVG = dynamic(() => import('qrcode.react').then(m => m.QRCodeSVG), { ssr: false });

export default function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [receipt, setReceipt] = useState<TrackingReceipt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Tracking Receipt | County Cargo';
    const unsub = onSnapshot(doc(db, 'tracking_receipts', id), snap => {
      if (!snap.exists()) { setLoading(false); return; }
      const d = snap.data();
      setReceipt({
        ...d,
        docId: snap.id,
        scannedAt: (d.scannedAt as Timestamp).toDate(),
      } as TrackingReceipt);
      setLoading(false);
    });
    return unsub;
  }, [id]);

  const trackingUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/dashboard/my-packages/${receipt?.packageDocId}`
    : '';

  if (loading) return (
    <div className="p-8 flex flex-col gap-4 max-w-2xl mx-auto">
      {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
    </div>
  );

  if (!receipt) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
      <Package className="h-10 w-10 opacity-30" />
      <p className="font-medium">Receipt not found</p>
      <Link href="/dashboard/admin/batch-add-package">
        <Button variant="outline" size="sm">Back to Batch Add</Button>
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* Toolbar — hidden on print */}
      <div className="print:hidden flex items-center justify-between flex-wrap gap-3">
        <Link href="/dashboard/admin/batch-add-package">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />Back
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1.5 border-blue-200 text-blue-700 hover:bg-blue-50">
            <Printer className="h-4 w-4" />Print Receipt
          </Button>
          <Button size="sm" onClick={() => window.print()} className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-4 w-4" />Download PDF
          </Button>
        </div>
      </div>

      {/* ── Receipt Document ─────────────────────────────────────────────── */}
      <div
        id="receipt-doc"
        className="max-w-2xl mx-auto w-full rounded-2xl border border-blue-100 bg-white shadow-lg overflow-hidden print:shadow-none print:border-none print:rounded-none print:max-w-full"
      >
        {/* Blue header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white print:bg-blue-600">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight">County Cargo</span>
              </div>
              <p className="text-blue-100 text-sm">Professional Cargo & Logistics</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black tracking-tight text-white/90">RECEIPT</p>
              <p className="text-blue-200 font-mono text-sm mt-0.5">{receipt.receiptId}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 flex flex-col gap-6">

          {/* "Received by County Cargo" banner */}
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800 text-sm">Received by County Cargo</p>
              <p className="text-xs text-emerald-700">
                Package accepted at {receipt.warehouseLocation} on {format(receipt.scannedAt, 'dd MMM yyyy, HH:mm')}
              </p>
            </div>
          </div>

          {/* Main grid: Package info + QR */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left: Details */}
            <div className="flex flex-col gap-3 text-sm">
              <InfoRow label="Receipt Number" value={receipt.receiptId} mono />
              <InfoRow label="Tracking ID" value={receipt.trackingNumber || '—'} mono />
              <InfoRow label="Customer Name" value={receipt.customerName} />
              <InfoRow label="Customer Email" value={receipt.customerEmail} />
              <InfoRow label="Date Scanned" value={format(receipt.scannedAt, 'dd MMM yyyy, HH:mm')} />
              <InfoRow label="Warehouse Location" value={receipt.warehouseLocation} />
              <InfoRow label="Courier" value={receipt.courier || '—'} />
              <InfoRow label="Weight" value={receipt.weight ? `${receipt.weight} kg` : '—'} />
              <InfoRow label="Package Status" value={receipt.statusAtScan.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} />
              <InfoRow label="Scanned By" value={receipt.scannedBy.name} />
            </div>

            {/* Right: QR code */}
            <div className="flex flex-col items-center justify-start gap-3 pt-2">
              <div className="border-2 border-blue-100 rounded-xl p-3 bg-white">
                {trackingUrl ? (
                  <QRCodeSVG
                    value={trackingUrl || 'https://countycargo.com'}
                    size={140}
                    fgColor="#1d4ed8"
                    bgColor="#ffffff"
                  />
                ) : (
                  <div className="w-[140px] h-[140px] bg-muted rounded animate-pulse" />
                )}
              </div>
              <p className="text-xs text-center text-muted-foreground max-w-[140px] leading-relaxed">
                Scan to track this package online
              </p>
              <p className="text-xs font-mono text-blue-600 text-center break-all max-w-[160px]">
                {receipt.trackingNumber}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-blue-50" />

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
            <span>County Cargo Ltd · Professional Cargo & Logistics</span>
            <span className="font-mono">{receipt.receiptId}</span>
          </div>

          <p className="text-xs text-center text-muted-foreground border-t border-blue-50 pt-3">
            This receipt confirms that your package has been received and logged at our warehouse.
            Please retain this receipt for your records. For enquiries, quote your Tracking ID.
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #receipt-doc, #receipt-doc * { visibility: visible; }
          #receipt-doc { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{label}</span>
      <span className={`text-sm font-medium text-gray-800 ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}
