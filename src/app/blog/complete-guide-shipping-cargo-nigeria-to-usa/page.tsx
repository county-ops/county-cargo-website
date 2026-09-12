import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Complete Guide to Shipping Cargo from Nigeria to the USA',
  description: 'Master guide to sending air cargo, e-commerce merchandise, and personal belongings from Nigeria to Houston, Dallas, Atlanta, New York, and nationwide USA.',
  keywords: 'shipping cargo from Nigeria to USA, air freight Lagos to Houston, ship to Atlanta Dallas NYC, US customs food regulations',
  alternates: {
    canonical: 'https://countycargo.com/blog/complete-guide-shipping-cargo-nigeria-to-usa',
  },
};

export default function CompleteGuideShippingUsaPost() {
  const articleUrl = 'https://countycargo.com/blog/complete-guide-shipping-cargo-nigeria-to-usa';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Complete Guide to Shipping Cargo from Nigeria to the USA',
    description: 'Comprehensive walkthrough for air cargo, express shipping, FDA regulations, and customs clearance from Nigeria to America.',
    image: 'https://countycargo.com/blog-4-us-nigeria.png',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo US Trade Manager',
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
            { label: 'Complete Guide: Shipping to USA' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-3.5 h-3.5" /> USA Shipping Masterclass
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Complete Guide to Shipping Cargo from Nigeria to the USA
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Everything you need to know about air cargo freight, express delivery, US CBP clearance, and FDA rules for Houston, Dallas, Atlanta, and NYC.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo US Trade Manager</span>
              <span>•</span>
              <span>30 August 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Nigeria to USA Air Cargo
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo offers express air courier (3–5 working days) and standard air cargo (5–10 working days) from Lagos and Abuja to major US hubs including Houston, Dallas, Atlanta, New York, Chicago, Maryland, Washington DC, and New Jersey. All food shipments comply with US FDA Prior Notice regulations.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to ship cargo to the USA?</h3>
                <p className="text-sm text-gray-600">Explore our dedicated USA route landing page for rates and doorstep coverage.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-usa">
                  Visit USA Route Hub <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Complete Guide to Shipping Cargo from Nigeria to the USA" />

            <RelatedGuides currentHref="/blog/complete-guide-shipping-cargo-nigeria-to-usa" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
