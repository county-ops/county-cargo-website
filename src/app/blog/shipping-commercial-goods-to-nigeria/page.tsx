import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'How to Ship Commercial Goods to Nigeria | B2B Freight Guide',
  description: 'Comprehensive business guide for importing wholesale inventory, merchandise, and commercial cargo from the UK and US into Nigeria.',
  keywords: 'ship commercial goods to Nigeria, B2B shipping Nigeria, wholesale cargo UK to Nigeria, import merchandise Lagos, commercial freight Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-commercial-goods-to-nigeria',
  },
  openGraph: {
    title: 'How to Ship Commercial Goods to Nigeria | B2B Freight Guide',
    description: 'Comprehensive business guide for importing wholesale inventory, merchandise, and commercial cargo from the UK and US into Nigeria.',
    url: 'https://countycargo.com/blog/shipping-commercial-goods-to-nigeria',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/shipping-commercial-goods-to-nigeria.jpg',
        alt: 'County Cargo commercial freight and B2B logistics expert handling cargo shipments from UK and US to Nigeria',
        width: 1200,
        height: 630,
      },
    ],
    type: 'article',
  },
};

export default function ShippingCommercialGoodsToNigeriaPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-commercial-goods-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Ship Commercial Goods to Nigeria',
    description: 'Essential business import guide for UK and US commercial suppliers shipping goods to Nigerian merchants and corporate clients.',
    image: 'https://countycargo.com/shipping-commercial-goods-to-nigeria.jpg',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Trade Advisor',
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
            { label: 'Shipping Commercial Goods to Nigeria' },
          ]}
        />

        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/shipping-commercial-goods-to-nigeria.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Building2 className="w-3.5 h-3.5" /> B2B Commercial Freight &amp; Import Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Ship Commercial Goods to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Streamline your commercial supply chain with consolidated air cargo, ocean FCL/LCL freight, and automated customs clearance.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Trade Advisor</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Summary: Commercial Cargo Logistics
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Commercial shipping to Nigeria requires valid commercial invoices, detailed packing lists with HS codes, and compliance with Form M/PAAR regulations for formal imports. Businesses can ship via consolidated air cargo (5–10 working days) for time-sensitive stock or 20ft/40ft sea containers (4–8 weeks) for bulk goods. County Cargo provides full supplier consolidation, warehouse receiving in the UK and US, and Lagos port clearing.
              </p>
            </div>

            <p className="text-lg text-gray-700">
              For businesses importing commercial inventory, clothing lines, spare parts, or industrial materials into Nigeria, logistics efficiency directly impacts profit margins.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Air Freight vs Ocean Containers for Business Inventory
            </h2>
            <p>
              Depending on order urgency and profit margins, commercial importers choose between air freight and sea freight:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Air Freight:</strong> Ideal for high-value merchandise, electronics, pharmaceuticals, and urgent restocks. Delivered in 5–10 working days.</li>
              <li><strong>Sea Freight (LCL/FCL):</strong> Ideal for heavy machinery, furniture, building materials, and bulk retail goods. Delivered in 4–8 weeks.</li>
            </ul>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Looking for B2B commercial freight solutions?</h3>
                <p className="text-sm text-gray-600">Contact our trade specialists for volume rates and supplier consolidation.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-to-nigeria">
                  Explore Commercial Rates <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How to Ship Commercial Goods to Nigeria" />

            <RelatedGuides currentHref="/blog/shipping-commercial-goods-to-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
