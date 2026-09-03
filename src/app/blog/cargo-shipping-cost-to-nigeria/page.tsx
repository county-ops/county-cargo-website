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
  title: 'How Much Does It Cost to Ship Cargo to Nigeria? | Rates Guide',
  description: 'Complete breakdown of air and sea shipping rates to Nigeria from the UK and US. Learn per kg rates, volumetric weight calculation, and handling fees.',
  keywords: 'shipping cost to Nigeria, cargo price per kg UK Nigeria, cheapest air freight Nigeria, cost of shipping US to Lagos, freight rates Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-shipping-cost-to-nigeria',
  },
};

export default function CargoShippingCostToNigeriaPost() {
  const articleUrl = 'https://countycargo.com/blog/cargo-shipping-cost-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How Much Does It Cost to Ship Cargo to Nigeria?',
    description: 'Transparent guide to international freight pricing, handling charges, and volumetric weight rules for shipping to Nigeria.',
    image: 'https://countycargo.com/blog-4-us-nigeria.png',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
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
            { label: 'Cargo Shipping Cost to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <DollarSign className="w-3.5 h-3.5" /> Pricing &amp; Rates Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How Much Does It Cost to Ship Cargo to Nigeria?
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Understand freight rates per kg, minimum weight thresholds, volumetric weight calculations, and door-to-door delivery costs.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Pricing Analyst</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Cargo Shipping Costs
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Standard air cargo from the UK to Nigeria costs £6.00 per kilogram with a £15 handling charge per shipment (5–10 day delivery). Air cargo from the USA starts at competitive per-pound/per-kg rates via our Texas receiving warehouse. Freight charges are billed on actual weight or volumetric weight $(L \times W \times H) / 5000$, whichever is greater.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              County Cargo Pricing Breakdown
            </h2>
            <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-2xs">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Route &amp; Service</th>
                    <th className="p-3">Base Freight Rate</th>
                    <th className="p-3">Handling Fee</th>
                    <th className="p-3">Estimated Transit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold">UK to Nigeria Air Cargo</td>
                    <td className="p-3">£6.00 / kg</td>
                    <td className="p-3">£15 per shipment</td>
                    <td className="p-3">5 – 10 Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">USA to Nigeria Air Cargo</td>
                    <td className="p-3">Competitive per kg rate</td>
                    <td className="p-3">$20 per shipment</td>
                    <td className="p-3">7 – 12 Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Nigeria to UK Express (DHL)</td>
                    <td className="p-3">Zonal Express Tariff</td>
                    <td className="p-3">Included</td>
                    <td className="p-3">3 – 5 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Want an exact quote for your parcel or cargo?</h3>
                <p className="text-sm text-gray-600">Use our online quote calculator to get an instant cost estimate.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Calculate Shipping Rate <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How Much Does It Cost to Ship Cargo to Nigeria?" />

            <RelatedGuides currentHref="/blog/cargo-shipping-cost-to-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
