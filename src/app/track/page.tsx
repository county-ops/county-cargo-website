import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RealtimeTracking } from '@/components/realtime-tracking';
import { Button } from '@/components/ui/button';
import { Search, ShieldCheck, CheckCircle2, Clock, MapPin, ArrowRight, User, Package, Plane, Ship } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Track Cargo & Airway Bill (AWB) | County Cargo UK & USA to Nigeria',
  description:
    'Track your shipment status from UK and USA to Nigeria in real time. Enter your unique invoice number or tracking ID for live milestone updates on air and sea freight.',
  keywords: [
    'track cargo to nigeria',
    'uk to nigeria tracking',
    'usa to nigeria cargo tracking',
    'awb tracking lagos',
    'county cargo shipment tracker',
    'county cargo invoice tracking',
  ],
  alternates: {
    canonical: 'https://countycargo.com/track',
  },
  openGraph: {
    title: 'Track Cargo & Airway Bill (AWB) | County Cargo UK & USA to Nigeria',
    description:
      'Track your shipment status from UK and USA to Nigeria in real time. Enter your unique invoice number or tracking ID for live updates.',
    url: 'https://countycargo.com/track',
    siteName: 'County Cargo',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/cargo-plane-hero.png',
        width: 1200,
        height: 630,
        alt: 'County Cargo Live Shipment Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track Cargo & Airway Bill (AWB) | County Cargo',
    description: 'Live real-time cargo tracking between UK, USA, and Nigeria.',
  },
};

export default function TrackPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'County Cargo Real-Time Shipment Tracking',
        url: 'https://countycargo.com/track',
        applicationCategory: 'LogisticsApplication',
        operatingSystem: 'All',
        provider: {
          '@type': 'Organization',
          name: 'County Cargo',
          url: 'https://countycargo.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://countycargo.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Track Shipment',
            item: 'https://countycargo.com/track',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header />

      <main className="flex-1">
        {/* Track Hero Section */}
        <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-32 sm:pt-40 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-white text-xs font-semibold border border-primary/30">
              <Search className="w-3.5 h-3.5 text-red-400" />
              <span>Real-Time Live Cargo Tracking</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Track Your Shipment in Real Time
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Enter your unique invoice number or tracking ID below to view live telemetry, shipment route, and current milestone progress.
            </p>

            {/* Interactive Tracker Widget */}
            <div className="pt-4">
              <Suspense
                fallback={
                  <div className="h-14 max-w-2xl mx-auto bg-white/10 rounded-xl animate-pulse" />
                }
              >
                <RealtimeTracking />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Milestone Steps Explanation */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                End-to-End Visibility
              </h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                How Your Shipment Progresses
              </p>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                Every consignment follows a strict, verifiable 9-stage milestone audit to ensure secure handling from collection to final doorstep handover.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full inline-block">
                  Stages 1 – 3
                </div>
                <h3 className="font-bold text-slate-900 text-base">Origin Verification</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consignment invoice is registered, payment confirmed, and packages weighed, measured, and stored at London, Liverpool, or Texas depots.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full inline-block">
                  Stages 4 – 6
                </div>
                <h3 className="font-bold text-slate-900 text-base">Transit &amp; Customs</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consolidation and packaging completed, departed on scheduled flight or sea vessel, followed by official Nigerian customs entry clearance.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full inline-block">
                  Stages 7 – 9
                </div>
                <h3 className="font-bold text-slate-900 text-base">Collection &amp; Delivery</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Packages available for self-collection at Lagos or Abuja hubs, or dispatched with our regional delivery couriers for nationwide doorstep delivery.
                </p>
              </div>
            </div>

            {/* Portal Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold">Need detailed invoices &amp; export packing lists?</h3>
                <p className="text-xs text-slate-400">
                  Registered customers can log into the County Cargo Client Portal to view full transaction histories, itemized invoices, and downloadable receipts.
                </p>
              </div>
              <a
                href="https://ship.countycargo.com/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold shrink-0">
                  <User className="w-4 h-4 mr-2" /> Client Portal Login
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
