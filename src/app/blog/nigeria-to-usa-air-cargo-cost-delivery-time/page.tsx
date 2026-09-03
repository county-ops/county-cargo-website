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
  title: 'Nigeria-to-USA Air Cargo Costs and Delivery Times Explained',
  description: 'Compare DHL Express (3-5 days) and standard air cargo (5-10 days) timelines and per-kg pricing from Lagos and Abuja to American destination hubs.',
  keywords: 'Nigeria to USA air cargo cost, delivery time Lagos to Houston Atlanta, express shipping to New York Dallas, per kg freight rate US',
  alternates: {
    canonical: 'https://countycargo.com/blog/nigeria-to-usa-air-cargo-cost-delivery-time',
  },
};

export default function UsaAirCargoCostDeliveryPost() {
  const articleUrl = 'https://countycargo.com/blog/nigeria-to-usa-air-cargo-cost-delivery-time';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Nigeria-to-USA Air Cargo Costs and Delivery Times Explained',
    description: 'Detailed analysis of shipping speeds and freight tariffs from Nigeria to major US cities.',
    image: 'https://countycargo.com/blog-7-nigeria-us.png',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Pricing Specialist',
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
            { label: 'Nigeria to USA Air Cargo Cost & Delivery' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Clock className="w-3.5 h-3.5" /> USA Freight &amp; Delivery Breakdown
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Nigeria-to-USA Air Cargo Costs and Delivery Times Explained
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Compare transit schedules, per-kg air freight pricing, volumetric weight rules, and customs fees for Houston, Dallas, Atlanta, and NYC.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Pricing Specialist</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: USA Delivery Options
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Delivery from Nigeria to the US takes <strong>3 to 5 days</strong> for Express Air Courier (via DHL) and <strong>5 to 10 working days</strong> for Standard Air Cargo. Rates are charged based on volumetric weight or actual weight, whichever is greater.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Calculate your USA parcel rate now</h3>
                <p className="text-sm text-gray-600">Get an accurate freight quote for Houston, Dallas, Atlanta, or Chicago.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-usa">
                  Book USA Cargo <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Nigeria-to-USA Air Cargo Costs and Delivery Times Explained" />

            <RelatedGuides currentHref="/blog/nigeria-to-usa-air-cargo-cost-delivery-time" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
