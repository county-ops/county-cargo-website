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
  title: 'How to Ship Goods from Nigeria to Germany | Step-by-Step',
  description: 'Step-by-step export guide for sending commercial merchandise, personal effects, and samples from Nigeria to Frankfurt, Berlin, Munich, and Hamburg.',
  keywords: 'how to ship goods from Nigeria to Germany, air cargo Lagos to Frankfurt, export merchandise to Berlin, Germany shipping rates',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-to-ship-goods-from-nigeria-to-germany',
  },
};

export default function HowToShipGoodsGermanyPost() {
  const articleUrl = 'https://countycargo.com/blog/how-to-ship-goods-from-nigeria-to-germany';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Ship Goods from Nigeria to Germany',
    description: 'Complete export guide covering air cargo dispatches, Zoll customs paperwork, and doorstep delivery across Germany.',
    image: 'https://countycargo.com/images/blog/nigeria-to-germany-air-freight-hub.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo European Route Expert',
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
            { label: 'How to Ship Goods to Germany' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-3.5 h-3.5" /> Germany Export Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Ship Goods from Nigeria to Germany
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Everything you need to know about air freight routes, Zoll customs regulations, and door delivery in Berlin, Frankfurt, Hamburg, and Munich.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo European Route Expert</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Shipping from Nigeria to Germany
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Exporting goods from Nigeria to Germany is straightforward with County Cargo's air cargo service. Packages depart Lagos and Abuja for Frankfurt Airport (FRA), clearing German Zoll customs before final-mile delivery across Berlin, Hamburg, Munich, Cologne, and Düsseldorf in 5 to 10 working days.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to ship to Germany?</h3>
                <p className="text-sm text-gray-600">Explore our dedicated Germany route landing page for rates and destination details.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-germany">
                  Visit Germany Route Hub <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How to Ship Goods from Nigeria to Germany" />

            <RelatedGuides currentHref="/blog/how-to-ship-goods-from-nigeria-to-germany" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
