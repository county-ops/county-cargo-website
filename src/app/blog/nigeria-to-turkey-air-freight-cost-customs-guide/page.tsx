import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Nigeria-to-Turkey Air Freight Cost and Customs Guide',
  description: 'Detailed breakdown of air cargo rates per kg, Turkish customs duty thresholds, and delivery schedules from Lagos to major Turkish cities.',
  keywords: 'Nigeria to Turkey air freight cost, shipping price per kg Lagos to Istanbul, Turkish customs clearance rules, Ankara freight rates',
  alternates: {
    canonical: 'https://countycargo.com/blog/nigeria-to-turkey-air-freight-cost-customs-guide',
  },
};

export default function TurkeyAirFreightCostCustomsPost() {
  const articleUrl = 'https://countycargo.com/blog/nigeria-to-turkey-air-freight-cost-customs-guide';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Nigeria-to-Turkey Air Freight Cost and Customs Guide',
    description: 'Comprehensive analysis of Turkish air cargo rates per kg, volumetric weight formulas, and customs documentation.',
    image: 'https://countycargo.com/US TO NIGERIA.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Pricing Analyst',
      url: 'https://countycargo.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'County Cargo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://countycargo.com/county-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'Nigeria to Turkey Freight Cost & Customs' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <DollarSign className="w-3.5 h-3.5" /> Turkey Pricing &amp; Customs Breakdown
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Nigeria-to-Turkey Air Freight Cost and Customs Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Compare transit schedules, per-kg pricing, volumetric weight calculations, and Ministry of Trade customs clearance rules for Istanbul and Ankara.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Pricing Analyst</span>
              <span>•</span>
              <span>30 August 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Turkey Freight Rates &amp; Customs
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Air freight to Turkey is billed based on chargeable weight (actual vs volumetric weight). Express Air Courier delivers in <strong>3 to 5 working days</strong> while Standard Air Cargo takes <strong>5–10 working days</strong>. Commercial goods require clear invoice itemization for Turkish customs clearance.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Calculate your Turkey shipment cost</h3>
                <p className="text-sm text-gray-600">Get an instant quote for Istanbul, Ankara, Izmir, or Bursa.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-turkey">
                  Calculate Turkey Freight <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Nigeria-to-Turkey Air Freight Cost and Customs Guide" />

            <RelatedGuides currentHref="/blog/nigeria-to-turkey-air-freight-cost-customs-guide" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
