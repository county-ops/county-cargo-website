import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Items You Cannot Ship to Nigeria: Prohibited Goods List | County Cargo',
  description: 'Official customs compliance safety checklist of prohibited and restricted items for shipping from UK/US to Nigeria. Avoid customs seizures.',
  keywords: 'prohibited items shipping to Nigeria, banned imports Nigeria Customs, restricted goods air cargo Lagos, hazardous cargo rules UK Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/prohibited-items-shipping-to-nigeria',
  },
};

export default function ProhibitedItemsShippingToNigeriaPost() {
  const articleUrl = 'https://countycargo.com/blog/prohibited-items-shipping-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Items You Cannot Ship to Nigeria: Prohibited & Restricted Cargo',
    description: 'Crucial compliance reference outlining prohibited, restricted, and hazardous goods for international shipping into Nigeria.',
    image: 'https://countycargo.com/images/blog/nigeria-customs-prohibited-items-inspection.jpg',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Compliance Officer',
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
            { label: 'Prohibited Items Shipping to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-400/30 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> Customs Compliance Safety Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Items You Cannot Ship to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Prevent airport delays, customs confiscations, and fines by reviewing the restricted cargo list.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Compliance Officer</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-red-700 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Summary: Strictly Prohibited Goods
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Items strictly prohibited from air freight to Nigeria include: standalone power banks, loose lithium batteries, liquids, perfumes, aerosols, narcotics, prescription drugs, firearms, explosives, perishable foods, counterfeit goods, currency/cash, and hazardous chemicals.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Comprehensive Restricted &amp; Prohibited Items Checklist
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="font-bold text-red-900 text-base mb-2">❌ Strictly Prohibited (Air Cargo)</h3>
                <ul className="text-xs sm:text-sm text-red-800 space-y-1.5">
                  <li>• Loose lithium batteries &amp; power banks</li>
                  <li>• Perfumes, colognes &amp; aerosol sprays</li>
                  <li>• Cash, currency, gold &amp; bullion</li>
                  <li>• Prescription medicines &amp; narcotics</li>
                  <li>• Firearms, ammunition &amp; explosives</li>
                  <li>• Perishable meat, fish &amp; fresh dairy</li>
                </ul>
              </div>
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
                <h3 className="font-bold text-amber-900 text-base mb-2">⚠️ Restricted (Requires Approval)</h3>
                <ul className="text-xs sm:text-sm text-amber-800 space-y-1.5">
                  <li>• Regulated medical equipment (NAFDAC)</li>
                  <li>• Chemicals &amp; industrial reagents</li>
                  <li>• Commercial packaged food (SONCAP)</li>
                  <li>• Telecommunications hardware (NCC)</li>
                </ul>
              </div>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Unsure if your item is permitted?</h3>
                <p className="text-sm text-gray-600">Ask our compliance team before booking your shipment.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/contact">
                  Contact Compliance Team <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Items You Cannot Ship to Nigeria: Prohibited Goods List" />

            <RelatedGuides currentHref="/blog/prohibited-items-shipping-to-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
