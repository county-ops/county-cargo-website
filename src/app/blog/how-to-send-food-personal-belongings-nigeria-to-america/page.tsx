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
  title: 'How to Send Food and Personal Belongings from Nigeria to America',
  description: 'How to package permitted Nigerian dry foodstuffs (garri, egusi, spices) and personal clothes for FDA compliant entry into the United States.',
  keywords: 'send food from Nigeria to USA, FDA food export Nigeria, garri egusi shipping America, shipping personal belongings Houston Atlanta',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-to-send-food-personal-belongings-nigeria-to-america',
  },
};

export default function SendFoodPersonalBelongingsUsaPost() {
  const articleUrl = 'https://countycargo.com/blog/how-to-send-food-personal-belongings-nigeria-to-america';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Send Food and Personal Belongings from Nigeria to America',
    description: 'Practical guide for FDA food compliance, packaging dry foodstuffs, and sending personal luggage from Lagos to US cities.',
    image: 'https://countycargo.com/NIGERIA TO THE US.png',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Food & Relocation Expert',
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
            { label: 'Send Food & Personal Belongings to USA' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> FDA Compliance &amp; Food Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Send Food and Personal Belongings from Nigeria to America
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Step-by-step FDA notification rules, dry food packaging advice, and personal effects relocation to Houston, Dallas, Atlanta, and NYC.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Food &amp; Relocation Expert</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: FDA &amp; Personal Belongings Rules
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                All foodstuff shipped to the US requires US FDA Prior Notice filing. Allowed items include commercially dried plant foodstuff (garri, egusi, ogbono, pounded yam flour, spices) and sealed dried fish. Personal clothing and luggage must be accompanied by a detailed packing list.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Shipping food or personal luggage to America?</h3>
                <p className="text-sm text-gray-600">Let our logistics team handle FDA filing and door delivery.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-usa">
                  Ship to USA Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How to Send Food and Personal Belongings from Nigeria to America" />

            <RelatedGuides currentHref="/blog/how-to-send-food-personal-belongings-nigeria-to-america" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
