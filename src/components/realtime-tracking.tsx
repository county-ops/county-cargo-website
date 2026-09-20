'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Loader2,
  Package,
  Plane,
  Ship,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Truck,
  Building2,
  FileCheck2,
  CreditCard,
  Check,
} from 'lucide-react';
import Link from 'next/link';

export interface TrackingTimelineItem {
  step: number;
  key: string;
  label: string;
  description: string;
  state: 'completed' | 'current' | 'upcoming';
  timestamp: string | null;
  isoTimestamp: string | null;
}

export interface TrackingResponseData {
  invoiceId: string;
  trackingNumber: string;
  currentStatus: string;
  rawStatus: string;
  paymentStatus: string;
  activeMilestoneIndex: number;
  timeline: TrackingTimelineItem[];
  route: {
    origin: string;
    originCountry: string;
    destination: string;
    destinationCountry: string;
  };
  lastUpdated: {
    formatted: string;
    iso: string;
  };
  bookingDate: {
    formatted: string;
    iso: string;
  };
  estimatedDelivery: string;
  serviceType: string;
  mode: 'air' | 'sea';
  totalPackages: number;
  totalWeight: string | null;
}

export function RealtimeTracking() {
  const searchParams = useSearchParams();
  const awbFromUrl =
    searchParams?.get('awb') ||
    searchParams?.get('number') ||
    searchParams?.get('code') ||
    '';

  const [inputVal, setInputVal] = useState(awbFromUrl);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [shipment, setShipment] = useState<TrackingResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const executeTrack = async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) return;

    setLoading(true);
    setSearched(true);
    setErrorMessage(null);
    setShipment(null);

    try {
      const res = await fetch(`/api/track?number=${encodeURIComponent(trimmed)}`, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      const json = await res.json();

      if (!res.ok || !json.success || !json.data) {
        setErrorMessage(
          json.error || 'Tracking number not found. Please check the number and try again.'
        );
        return;
      }

      setShipment(json.data);
    } catch (err: any) {
      console.error('Website tracking query error:', err);
      setErrorMessage('Tracking number not found. Please check the number and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (awbFromUrl) {
      setInputVal(awbFromUrl);
      executeTrack(awbFromUrl);
    }
  }, [awbFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeTrack(inputVal);
  };

  const getStepIcon = (key: string, state: 'completed' | 'current' | 'upcoming') => {
    if (state === 'completed') {
      return <Check className="w-4 h-4 text-white stroke-[3]" />;
    }
    switch (key) {
      case 'created':
        return <FileCheck2 className="w-4 h-4" />;
      case 'payment':
        return <CreditCard className="w-4 h-4" />;
      case 'received':
        return <Building2 className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return shipment?.mode === 'sea' ? <Ship className="w-4 h-4" /> : <Plane className="w-4 h-4" />;
      case 'customs':
        return <ShieldCheck className="w-4 h-4" />;
      case 'ready_collection':
        return <MapPin className="w-4 h-4" />;
      case 'out_delivery':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter Invoice Number (e.g. UKA00000000028, UKS..., US-...)"
            className="pl-10 h-13 bg-white text-slate-900 border-slate-300 font-medium placeholder:text-slate-400 focus-visible:ring-primary shadow-xs text-base"
          />
        </div>
        <Button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="h-13 px-8 bg-primary hover:bg-primary/90 text-white font-bold shrink-0 shadow-md text-base"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Tracking...
            </span>
          ) : (
            'Track Cargo'
          )}
        </Button>
      </form>

      {/* Loading animation */}
      {loading && (
        <div className="p-10 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm font-semibold text-slate-600">Retrieving live shipment telemetry...</p>
        </div>
      )}

      {/* Result Card */}
      {!loading && shipment && (
        <Card className="border-slate-200 shadow-xl bg-white overflow-hidden text-left">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 flex flex-wrap justify-between items-center gap-4 border-b border-slate-700">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                Tracking / Invoice Number
              </span>
              <span className="text-2xl font-black text-emerald-400 tracking-wide font-mono">
                {shipment.trackingNumber || shipment.invoiceId}
              </span>
            </div>

            <div className="text-right space-y-1">
              <span className="px-4 py-1.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider inline-block">
                {shipment.currentStatus}
              </span>
              {shipment.lastUpdated?.formatted && (
                <p className="text-[11px] text-slate-400">
                  Updated: <span className="text-slate-200 font-semibold">{shipment.lastUpdated.formatted}</span>
                </p>
              )}
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Shipment Telemetry Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                  Origin Hub
                </span>
                <span className="font-bold text-slate-900 text-sm block leading-snug">
                  {shipment.route.origin}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                  Destination
                </span>
                <span className="font-bold text-slate-900 text-sm block leading-snug">
                  {shipment.route.destination}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                  Estimated Delivery
                </span>
                <span className="font-bold text-emerald-700 text-sm block leading-snug">
                  {shipment.estimatedDelivery}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                  Service &amp; Consignment
                </span>
                <span className="font-bold text-slate-900 text-sm block leading-snug">
                  {shipment.serviceType}
                  {shipment.totalWeight ? ` (${shipment.totalWeight})` : ''}
                </span>
              </div>
            </div>

            {/* 9-Stage Milestone Timeline */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
                  Shipment Progress Timeline (Stage {shipment.activeMilestoneIndex + 1} of 9)
                </h4>
                <span className="text-xs font-semibold text-slate-500">
                  {Math.round(((shipment.activeMilestoneIndex + 1) / 9) * 100)}% Completed
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(11, ((shipment.activeMilestoneIndex + 1) / 9) * 100))}%`,
                  }}
                />
              </div>

              {/* Step Cards List */}
              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {shipment.timeline.map((item) => {
                  const isDone = item.state === 'completed';
                  const isCurrent = item.state === 'current';

                  return (
                    <div key={item.key} className="relative group">
                      {/* Node circle */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isDone
                            ? 'bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-50'
                            : isCurrent
                            ? 'bg-primary text-white shadow-md ring-4 ring-primary/20 animate-pulse'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {getStepIcon(item.key, item.state)}
                      </div>

                      {/* Content block */}
                      <div
                        className={`p-3.5 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-blue-50/50 border-primary/40 shadow-xs'
                            : isDone
                            ? 'bg-emerald-50/20 border-emerald-200/50'
                            : 'bg-white border-slate-200/70 opacity-70'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold ${
                                isCurrent
                                  ? 'text-primary'
                                  : isDone
                                  ? 'text-emerald-800'
                                  : 'text-slate-600'
                              }`}
                            >
                              {item.step}. {item.label}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary text-white">
                                Current Status
                              </span>
                            )}
                            {isDone && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                                Completed
                              </span>
                            )}
                          </div>

                          {item.timestamp && (
                            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {item.timestamp}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Portal Link & Customer Support */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-slate-500">
                Need official commercial invoices, tax receipts, or warehouse manifests?
              </span>
              <a
                href="https://ship.countycargo.com/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline" className="font-semibold gap-1 text-xs">
                  Login to Client Portal <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Not Found / Error State */}
      {!loading && searched && errorMessage && (
        <div className="p-6 bg-white border border-rose-200 rounded-2xl shadow-sm text-left space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Tracking Notice</h4>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">{errorMessage}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Need assistance finding your invoice reference?
            </span>
            <a
              href={`https://wa.me/2348110000421?text=Hello%20County%20Cargo,%20please%20help%20me%20track%20my%20shipment%20code:%20${encodeURIComponent(
                inputVal
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
