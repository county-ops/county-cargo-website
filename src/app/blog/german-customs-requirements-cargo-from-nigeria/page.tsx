import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'German Customs Requirements for Cargo Arriving from Nigeria',
  description: 'Detailed analysis of German Zoll customs procedures, EORI registration, commercial invoice rules, and EU VAT regulations for Nigerian imports.',
  keywords: 'German customs requirements Nigeria, Zoll export clearance Lagos to Frankfurt, EORI number import Germany, EU VAT cargo',
  alternates: {
    canonical: 'https://countycargo.com/blog/german-customs-requirements-cargo-from-nigeria',
  },
};

export default function GermanCustomsRequirementsPost() {
  const articleUrl = 'https://countycargo.com/blog/german-customs-requirements-cargo-from-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'German Customs Requirements for Cargo Arriving from Nigeria',
    description: 'Expert guide to German Zoll customs rules, duty tariffs, commercial invoice documentation, and agricultural restrictions.',
    image: 'https://countycargo.com/images/blog/german-customs-clearance-inspection.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo European Compliance Officer',
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
            { label: 'German Customs Requirements' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> German Zoll Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              German Customs Requirements for Cargo Arriving from Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Master EU VAT rules, EORI requirements, commercial documentation, and prohibited agricultural goods for hassle-free entry into Germany.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo European Compliance Officer</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: German Zoll Import Rules
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Imports to Germany require a clear Commercial Invoice / Packing List with HS codes and sender/recipient ID. German customs (Zoll) levies 19% EU Import VAT on declared values plus duty. Dry packaged foodstuff is allowed, while meat, fresh milk, and uncertified plants are strictly prohibited.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Need guidance on German customs paperwork?</h3>
                <p className="text-sm text-gray-600">Consult County Cargo's European compliance specialists before booking.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-germany">
                  Check Germany Route <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="German Customs Requirements for Cargo Arriving from Nigeria" />

            <RelatedGuides currentHref="/blog/german-customs-requirements-cargo-from-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
