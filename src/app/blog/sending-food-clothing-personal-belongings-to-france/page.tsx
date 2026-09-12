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
  title: 'Sending Food, Clothing and Personal Belongings to France',
  description: 'Practical guide to packaging traditional Nigerian attire, lace, and permitted dry food for stress-free delivery to family and businesses in France.',
  keywords: 'send food to France from Nigeria, shipping African fashion Paris, send clothes to Lyon Marseille, dry food export France',
  alternates: {
    canonical: 'https://countycargo.com/blog/sending-food-clothing-personal-belongings-to-france',
  },
};

export default function SendingFoodClothingFrancePost() {
  const articleUrl = 'https://countycargo.com/blog/sending-food-clothing-personal-belongings-to-france';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Sending Food, Clothing and Personal Belongings to France',
    description: 'Packaging and regulatory guide for personal luggage, African attire, and allowed foodstuffs shipped to France.',
    image: 'https://countycargo.com/france-african-fashion-food.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Personal Effects Specialist',
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
            { label: 'Send Food & Clothing to France' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Food &amp; Fashion Export Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Sending Food, Clothing and Personal Belongings to France
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How to package African traditional fashion, lace materials, and permitted dry foodstuffs for delivery to Paris, Lyon, Marseille, and Lille.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Personal Effects Specialist</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: France Personal Belongings Rules
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                African attire, fabrics, books, and personal luggage can be shipped without agricultural restrictions. Processed dry foodstuffs (garri, egusi, ogbono, spices) are permitted when sealed airtight. Meats and unpasteurized dairy are strictly prohibited.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Shipping packages to family or customers in France?</h3>
                <p className="text-sm text-gray-600">County Cargo handles door delivery across all French departments.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-france">
                  Ship to France Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Sending Food, Clothing and Personal Belongings to France" />

            <RelatedGuides currentHref="/blog/sending-food-clothing-personal-belongings-to-france" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
