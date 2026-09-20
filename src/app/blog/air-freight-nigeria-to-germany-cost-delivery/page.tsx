import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Air Freight from Nigeria to Germany: Cost and Delivery Guide',
  description: 'Compare express air courier and standard cargo delivery times (3–8 days) and freight costs per kg from Nigeria to German commercial hubs.',
  keywords: 'air freight Nigeria to Germany cost, delivery time Lagos to Frankfurt, express cargo Berlin Munich, per kg shipping rate Germany',
  alternates: {
    canonical: 'https://countycargo.com/blog/air-freight-nigeria-to-germany-cost-delivery',
  },
};

export default function AirFreightGermanyCostDeliveryPost() {
  const articleUrl = 'https://countycargo.com/blog/air-freight-nigeria-to-germany-cost-delivery';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Air Freight from Nigeria to Germany: Cost and Delivery Guide',
    description: 'Detailed pricing breakdown, volumetric weight math, and delivery schedules from Lagos to German cities.',
    image: 'https://countycargo.com/hero-skyblue.png',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Logistics Analyst',
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
            { label: 'Germany Air Freight Cost & Delivery' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Clock className="w-3.5 h-3.5" /> Germany Freight &amp; Delivery Breakdown
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Air Freight from Nigeria to Germany: Cost and Delivery Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Compare express air courier and standard air cargo schedules, per-kg pricing formulas, and door delivery in Frankfurt, Berlin, and Munich.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Logistics Analyst</span>
              <span>•</span>
              <span>30 August 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Germany Air Freight Options
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Air freight from Nigeria to Germany takes <strong>3 to 5 working days</strong> via Express Air Courier and <strong>5–10 working days</strong> via Standard Air Cargo. Rates are charged per kg based on chargeable weight to Frankfurt Airport (FRA) before final delivery across Germany.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Book your Germany air cargo shipment</h3>
                <p className="text-sm text-gray-600">Get an instant quote for Frankfurt, Berlin, Hamburg, or Munich.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-germany">
                  Book Germany Cargo <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Air Freight from Nigeria to Germany: Cost and Delivery Guide" />

            <RelatedGuides currentHref="/blog/air-freight-nigeria-to-germany-cost-delivery" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
