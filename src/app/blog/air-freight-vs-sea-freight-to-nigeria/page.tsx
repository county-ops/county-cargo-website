import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Plane, Ship, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Air Freight vs Sea Freight to Nigeria: Cost, Speed & Benefits | County Cargo',
  description: 'Detailed comparison of air cargo and sea freight from the UK and USA to Nigeria. Compare transit times, shipping costs per kg vs CBM, and weight limits.',
  keywords: 'air freight vs sea freight Nigeria, cheap shipping to Nigeria, air cargo speed Lagos, ocean container Nigeria, freight comparison UK Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/air-freight-vs-sea-freight-to-nigeria',
  },
};

export default function AirVsSeaFreightPost() {
  const articleUrl = 'https://countycargo.com/blog/air-freight-vs-sea-freight-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Air Freight vs Sea Freight to Nigeria: Cost, Speed and Benefits',
    description: 'Analytical comparison of air and ocean freight shipping to Nigeria for individuals, e-commerce stores, and commercial importers.',
    image: 'https://countycargo.com/cargo-plane-hero.png',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Freight Strategist',
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
            { label: 'Air Freight vs Sea Freight to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-3.5 h-3.5 text-blue-300" /> <Ship className="w-3.5 h-3.5 text-emerald-300" /> Mode Comparison Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Air Freight vs Sea Freight to Nigeria: Cost, Speed &amp; Benefits
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How to choose between fast air cargo (3–10 days) and economical sea freight (4–8 weeks) based on weight, volume, and budget.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Freight Strategist</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>9 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Air vs Sea Freight
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Air freight to Nigeria is fast (3–5 working days express, 5–10 working days standard) and charged per kilogram, making it ideal for parcels under 100kg, electronics, and urgent items. Sea freight is slower (4–8 weeks) but charged per cubic meter (CBM) or container load, making it 60–80% cheaper per unit for heavy machinery, furniture, and bulk cargo over 200kg.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Side-by-Side Mode Comparison Table
            </h2>
            <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-2xs">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Feature</th>
                    <th className="p-3">Air Freight ✈️</th>
                    <th className="p-3">Sea Freight 🚢</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold">Delivery Time</td>
                    <td className="p-3">3 – 10 Working Days</td>
                    <td className="p-3">4 – 6 Weeks</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Pricing Model</td>
                    <td className="p-3">Per kg (Actual or Volumetric)</td>
                    <td className="p-3">Per CBM / Container (FCL/LCL)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Best For</td>
                    <td className="p-3">Electronics, clothes, urgent goods (&lt;100kg)</td>
                    <td className="p-3">Vehicles, furniture, machinery (&gt;200kg)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Customs Clearing</td>
                    <td className="p-3">Fast (24–48 hours at LOS)</td>
                    <td className="p-3">Standard (3–7 days at Apapa)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Unsure which shipping mode suits your cargo?</h3>
                <p className="text-sm text-gray-600">Calculate shipping rates instantly or speak with our freight specialists.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-to-nigeria">
                  Compare Shipping Options <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Air Freight vs Sea Freight to Nigeria: Cost, Speed & Benefits" />

            <RelatedGuides currentHref="/blog/air-freight-vs-sea-freight-to-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
