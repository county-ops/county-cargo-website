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
  title: 'How Much Does Shipping from Nigeria to Canada Cost? | Rate Guide',
  description: 'Complete breakdown of air cargo costs from Nigeria to Toronto, Calgary, Vancouver, and Montreal. Learn freight rates per kg, GST/HST rules, and volumetric weight.',
  keywords: 'shipping cost from Nigeria to Canada, cargo rates Lagos to Toronto, air freight price per kg Canada Nigeria, cheapest shipping to Calgary',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-cost-from-nigeria-to-canada',
  },
};

export default function ShippingCostFromNigeriaToCanadaPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-cost-from-nigeria-to-canada';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How Much Does Shipping from Nigeria to Canada Cost?',
    description: 'Detailed analysis of air freight costs, volumetric weight calculations, and Canadian GST/HST import taxes for shipments from Nigeria to Canada.',
    image: 'https://countycargo.com/nigeria-to-canada-cost.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Logistics Team',
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
            { label: 'Shipping Cost from Nigeria to Canada' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <DollarSign className="w-3.5 h-3.5" /> Canada Freight Pricing Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How Much Does Shipping from Nigeria to Canada Cost?
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Understand freight rates per kg, volumetric weight formulas, handling fees, and Canadian import taxes for Toronto, Calgary, and Vancouver.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Logistics Team</span>
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
                <CheckCircle2 className="w-4 h-4" /> Answer-First Summary: Nigeria to Canada Shipping Costs
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Air shipping costs from Nigeria to Canada are determined by chargeable weight (whichever is greater between actual scale weight and volumetric weight $(L \times W \times H) / 5000$) plus handling and customs processing. Shipments to Toronto, Calgary, and Edmonton carry standard per-kg air freight rates with delivery in 5 to 10 working days.
              </p>
            </div>

            <p className="text-lg text-gray-700">
              When planning to ship personal items, African foodstuff, fashion products, or commercial merchandise from Lagos or Abuja to Canada, knowing your total costs helps you budget effectively without surprises.
            </p>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to ship to Canada?</h3>
                <p className="text-sm text-gray-600">Get an instant rate quote for Toronto, Calgary, Vancouver, and Edmonton.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-canada">
                  View Canada Route Page <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How Much Does Shipping from Nigeria to Canada Cost?" />

            <RelatedGuides currentHref="/blog/shipping-cost-from-nigeria-to-canada" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
