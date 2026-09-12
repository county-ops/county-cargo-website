import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Items You Can and Cannot Send from Nigeria to Canada',
  description: 'Complete CFIA and CBSA guidelines on permitted foods, textiles, personal effects, and prohibited goods when shipping from Nigeria to Canada.',
  keywords: 'what items allowed Nigeria to Canada shipping, food shipping to Canada CFIA, prohibited cargo Canada, sending clothes to Toronto',
  alternates: {
    canonical: 'https://countycargo.com/blog/permitted-prohibited-items-nigeria-to-canada',
  },
};

export default function PermittedProhibitedItemsCanadaPost() {
  const articleUrl = 'https://countycargo.com/blog/permitted-prohibited-items-nigeria-to-canada';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Items You Can and Cannot Send from Nigeria to Canada',
    description: 'Detailed safety guide for exporting foodstuff, attire, electronics, and personal luggage to Canada.',
    image: 'https://countycargo.com/nigeria-canada-food-items.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Food & Cargo Inspector',
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
            { label: 'Canada Permitted & Prohibited Goods' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> CFIA &amp; CBSA Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Items You Can and Cannot Send from Nigeria to Canada
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Essential agricultural rules, food packaging guidelines, and banned goods list for shipping to Toronto, Calgary, and Vancouver.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Food &amp; Cargo Inspector</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Canada Food &amp; Cargo Rules
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                <strong>Permitted:</strong> Well-packaged dry foodstuffs (garri, egusi, ogbono, spices), African traditional attire, books, cosmetics, commercial goods. <strong>Prohibited:</strong> Fresh uninspected meat/dairy, raw plants/soil, flammable liquids, weapons, counterfeit items, and uncertified medicines.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Unsure about your package items?</h3>
                <p className="text-sm text-gray-600">Speak with County Cargo's compliance team before packing your cargo.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-canada">
                  Check Canada Service Details <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Items You Can and Cannot Send from Nigeria to Canada" />

            <RelatedGuides currentHref="/blog/permitted-prohibited-items-nigeria-to-canada" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
