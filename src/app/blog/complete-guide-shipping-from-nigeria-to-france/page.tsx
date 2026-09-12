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
  title: 'Complete Guide to Shipping from Nigeria to France',
  description: 'Everything you need to know about exporting African fashion, foodstuffs, and commercial cargo from Nigeria to Paris, Lyon, Marseille, and Toulouse.',
  keywords: 'shipping from Nigeria to France, air cargo Lagos to Paris CDG, send fashion luggage Lyon Marseille, Douane customs clearance',
  alternates: {
    canonical: 'https://countycargo.com/blog/complete-guide-shipping-from-nigeria-to-france',
  },
};

export default function CompleteGuideShippingFrancePost() {
  const articleUrl = 'https://countycargo.com/blog/complete-guide-shipping-from-nigeria-to-france';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Complete Guide to Shipping from Nigeria to France',
    description: 'Master guide for air freight dispatches, French Douane customs clearance, and door delivery in Paris, Lyon, and Marseille.',
    image: 'https://countycargo.com/images/blog/complete-guide-nigeria-to-france-cargo.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo French Route Manager',
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
            { label: 'Complete Guide: Shipping to France' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-3.5 h-3.5" /> France Route Masterclass
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Complete Guide to Shipping from Nigeria to France
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Learn how to send African attire, dried foodstuff, commercial goods, and personal belongings from Lagos and Abuja to Paris, Lyon, and Marseille.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo French Route Manager</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Shipping from Nigeria to France
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo offers air cargo options from Nigeria to France arriving at Paris Charles de Gaulle (CDG). Delivery takes <strong>3 to 5 working days</strong> for Express Courier and <strong>5 to 10 working days</strong> for Standard Air Freight, serving Paris, Lyon, Marseille, Toulouse, Bordeaux, and Lille.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to ship to France?</h3>
                <p className="text-sm text-gray-600">Explore our France route hub for pricing and customs guidance.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-france">
                  Visit France Route Hub <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Complete Guide to Shipping from Nigeria to France" />

            <RelatedGuides currentHref="/blog/complete-guide-shipping-from-nigeria-to-france" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
