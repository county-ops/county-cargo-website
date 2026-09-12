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
  title: 'Permitted and Restricted Items When Shipping to Turkey',
  description: 'Safety checklist of items allowed for import into Turkey. Learn rules on agricultural products, commercial samples, liquids, and restricted items.',
  keywords: 'permitted items shipping to Turkey, prohibited goods Turkey customs, agricultural import rules Istanbul, send clothes to Turkey',
  alternates: {
    canonical: 'https://countycargo.com/blog/permitted-restricted-items-shipping-to-turkey',
  },
};

export default function PermittedRestrictedItemsTurkeyPost() {
  const articleUrl = 'https://countycargo.com/blog/permitted-restricted-items-shipping-to-turkey';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Permitted and Restricted Items When Shipping to Turkey',
    description: 'Detailed safety guide for commercial samples, textiles, dry foodstuffs, and banned items when shipping to Turkey.',
    image: 'https://countycargo.com/service-us-nigeria-new.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
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
            { label: 'Turkey Permitted & Restricted Items' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> Turkey Customs Safety Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Permitted and Restricted Items When Shipping to Turkey
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Essential safety guidelines for commercial merchandise, dry foodstuffs, African attire, and banned items for entry into Turkey.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Compliance Officer</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Turkey Customs Safety Rules
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                <strong>Permitted:</strong> Commercial textile samples, African fashion, books, electronics, and sealed dry plant foodstuff. <strong>Prohibited:</strong> Fresh uninspected meat/dairy, raw seeds, flammable liquids, weapons, counterfeit goods, and uncertified pharmaceuticals.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Have questions about shipping to Turkey?</h3>
                <p className="text-sm text-gray-600">Contact County Cargo's compliance team for immediate assistance.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-turkey">
                  Check Turkey Services <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Permitted and Restricted Items When Shipping to Turkey" />

            <RelatedGuides currentHref="/blog/permitted-restricted-items-shipping-to-turkey" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
