
'use client';

import React from 'react';
import { format } from 'date-fns';
import { User, Package, Clock, CreditCard, FileText, PenSquare, Package2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Shipment } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ShipmentDetailsProps {
  shipment: Shipment;
  isAdminOrStaff: boolean;
}

export const ShipmentDetails = ({ shipment, isAdminOrStaff }: ShipmentDetailsProps) => {
    const weightUnit = shipment.units === 'imperial' ? 'lb' : 'kg';
    const dimUnit = shipment.units === 'imperial' ? 'in' : 'cm';

    const formatDate = (date: any) => {
        if (!date) return '—';
        try {
            const d = (date && typeof date.toDate === 'function') ? date.toDate() : (date instanceof Date ? date : new Date(date));
            if (isNaN(d.getTime())) return '—';
            return format(d, 'MMM dd, yyyy');
        } catch (e) {
            return '—';
        }
    };

    return (
        <div className="p-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3 bg-white animate-in fade-in slide-in-from-top-2 duration-300 rounded-xl">
            <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                    <User className="h-4 w-4" />
                    <span>Contacts</span>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/20 shadow-sm">
                        <p className="font-black text-[10px] uppercase text-blue-500/80 mb-2 tracking-wider">Shipper</p>
                        <p className="font-bold text-blue-950">{shipment.shipper?.name || '—'}</p>
                        <p className="text-blue-700/70 font-medium">{shipment.shipper?.phone || '—'}</p>
                        <p className="text-blue-700/50 text-[11px] truncate mt-1">{shipment.shipper?.email || '—'}</p>
                        <p className="text-xs mt-2 text-slate-600 bg-white/50 p-2 rounded-lg border border-blue-50/50 italic">{shipment.originAddress}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/20 shadow-sm">
                        <p className="font-black text-[10px] uppercase text-blue-500/80 mb-2 tracking-wider">Receiver</p>
                        <p className="font-bold text-blue-950">{shipment.receiver?.name || '—'}</p>
                        <p className="text-blue-700/70 font-medium">{shipment.receiver?.phone || '—'}</p>
                        <p className="text-blue-700/50 text-[11px] truncate mt-1">{shipment.receiver?.email || '—'}</p>
                        <p className="text-xs mt-2 text-slate-600 bg-white/50 p-2 rounded-lg border border-blue-50/50 italic">{shipment.destinationAddress}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                    <Package className="h-4 w-4" />
                    <span>Packages ({shipment.packages?.length || 0})</span>
                </div>
                <div className="space-y-2">
                    {shipment.packages?.map((pkg, i) => (
                        <div key={i} className="text-sm p-4 rounded-xl border border-blue-100 bg-white shadow-sm space-y-2 hover:border-blue-200 transition-colors">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-blue-900">Item {i + 1}</span>
                                <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">{pkg.weight} {weightUnit}</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{pkg.description}</p>
                            {pkg.trackingNumber && (
                               <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 p-1.5 rounded-lg border border-blue-100">
                                 <Package2 className="h-3.5 w-3.5" />
                                 <span>{pkg.trackingNumber}</span>
                               </div>
                            )}
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dimensions: {pkg.length}x{pkg.width}x{pkg.height} {dimUnit}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-blue-900">
                        <Clock className="h-4 w-4" />
                        <span>Timeline & Info</span>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button asChild variant="ghost" size="icon" className="h-9 w-9 text-blue-600 hover:text-blue-700 hover:bg-blue-100/50 rounded-xl border border-blue-100">
                                    <Link href={`/dashboard/my-shipments/${shipment.docId}`}>
                                        <FileText className="h-5 w-5" />
                                        <span className="sr-only">View Invoice</span>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="bg-blue-900 text-white border-blue-900">
                                <p className="font-semibold">View Invoice</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                         {shipment.createdBy && (
                            <div className="p-3 border border-blue-100 rounded-xl bg-blue-50/30 col-span-2 shadow-sm">
                                <p className="text-[10px] font-black text-blue-500/80 uppercase flex items-center gap-1.5 tracking-wider"><PenSquare className="h-3.5 w-3.5" /> CREATED BY</p>
                                <p className="font-bold text-blue-950 mt-1">{shipment.createdBy.name} <span className="text-blue-700/50 font-medium">({shipment.createdBy.role})</span></p>
                            </div>
                        )}
                        <div className="p-3 border border-blue-100 rounded-xl bg-white shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Booked On</p>
                            <p className="font-bold text-blue-900 mt-0.5">{formatDate(shipment.bookingDate)}</p>
                        </div>
                        {shipment.paymentDate && (
                            <div className="p-3 border border-emerald-100 rounded-xl bg-emerald-50/30 shadow-sm">
                                <p className="text-[10px] font-black text-emerald-600/80 uppercase tracking-wider">Paid On</p>
                                <p className="font-bold text-emerald-900 mt-0.5">{formatDate(shipment.paymentDate)}</p>
                            </div>
                        )}
                        {shipment.pickupDate && (
                            <div className="p-3 border border-orange-100 rounded-xl bg-orange-50/30 shadow-sm">
                                <p className="text-[10px] font-black text-orange-600/80 uppercase tracking-wider">Pickup Date</p>
                                <p className="font-bold text-orange-900 mt-0.5">{formatDate(shipment.pickupDate)}</p>
                            </div>
                        )}
                    </div>

                    {isAdminOrStaff && (
                        <>
                            <Separator className="bg-blue-100/50" />
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 font-bold text-blue-900">
                                    <CreditCard className="h-4 w-4" />
                                    <span>Billing Details (Admin)</span>
                                </div>
                                <div className="grid gap-2 p-4 bg-slate-950 rounded-xl text-white shadow-lg border-2 border-blue-500/20">
                                    <div className="flex justify-between items-center text-xs opacity-70">
                                        <span>Billable Weight:</span>
                                        <span className="font-black uppercase tracking-tighter">{shipment.billableWeight || '—'} {weightUnit}</span>
                                    </div>
                                    {shipment.exchangeRate && (
                                        <div className="flex justify-between items-center text-xs opacity-70">
                                            <span>Exchange Rate:</span>
                                            <span className="font-black">1 : {shipment.exchangeRate}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-1">
                                        <span className="text-xs font-bold text-blue-400">Total Revenue:</span>
                                        <span className="text-xl font-black text-white tracking-tighter">
                                            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(parseFloat(shipment.totalCost || '0'))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
