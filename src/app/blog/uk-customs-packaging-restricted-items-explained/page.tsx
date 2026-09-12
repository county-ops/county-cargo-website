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
  title: 'UK Customs, Packaging and Restricted Items Explained',
  description: 'Avoid HMRC customs delays by understanding UK import duty thresholds, DEFRA food regulations, packaging standards, and restricted goods from Nigeria.',
  keywords: 'UK customs food rules Nigeria, HMRC prohibited items Lagos, how to package African food UK, DEFRA import restrictions',
  alternates: {
    canonical: 'https://countycargo.com/blog/uk-customs-packaging-restricted-items-explained',
  },
};

export default function UkCustomsPackagingPost() {
  const articleUrl = 'https://countycargo.com/blog/uk-customs-packaging-restricted-items-explained';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'UK Customs, Packaging and Restricted Items Explained',
    description: 'Comprehensive compliance guide for HMRC rules, UK food safety regulations, and proper packaging techniques.',
    image: 'https://countycargo.com/uk-customs-inspection.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Customs Advisor',
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
            { label: 'UK Customs & Packaging Explained' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> HMRC &amp; DEFRA Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              UK Customs, Packaging and Restricted Items Explained
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Everything you need to know about HMRC import regulations, allowed African foods, double-wall box packaging, and banned items.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Customs Advisor</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: UK Customs &amp; Packaging Rules
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                UK customs (HMRC) permits dry processed foodstuffs (garri, egusi, ogbono, spices) and personal effects. Meats, unpasteurized dairy, and live plants are banned by DEFRA. Cargo must be securely packed in double-wall boxes and labeled with complete UK delivery addresses.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Have questions about your UK parcel contents?</h3>
                <p className="text-sm text-gray-600">Contact County Cargo's compliance team for pre-flight verification.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-uk">
                  Check UK Service Details <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="UK Customs, Packaging and Restricted Items Explained" />

            <RelatedGuides currentHref="/blog/uk-customs-packaging-restricted-items-explained" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
