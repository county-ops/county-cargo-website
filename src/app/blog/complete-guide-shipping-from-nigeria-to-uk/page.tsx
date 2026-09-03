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
  title: 'Complete Guide to Shipping from Nigeria to the UK',
  description: 'Comprehensive guide for shipping cargo, African food, fashion, and personal luggage from Lagos and Abuja to London, Manchester, Birmingham, and Liverpool.',
  keywords: 'shipping from Nigeria to UK, air cargo Lagos to London, send luggage Nigeria to Manchester, African food shipping UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/complete-guide-shipping-from-nigeria-to-uk',
  },
};

export default function CompleteGuideShippingUkPost() {
  const articleUrl = 'https://countycargo.com/blog/complete-guide-shipping-from-nigeria-to-uk';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Complete Guide to Shipping from Nigeria to the UK',
    description: 'Master guide to air cargo, express shipping, HMRC rules, and door delivery across the United Kingdom.',
    image: 'https://countycargo.com/service-nigeria-uk-enhanced.png',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo UK Route Manager',
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
            { label: 'Complete Guide: Shipping to UK' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-3.5 h-3.5" /> UK Route Masterclass
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Complete Guide to Shipping from Nigeria to the UK
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Everything you need to know about exporting personal luggage, African foodstuffs, fashion merchandise, and commercial cargo to London, Manchester, and Liverpool.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo UK Route Manager</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Nigeria to UK Cargo
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo provides daily and bi-weekly air freight dispatches from Lagos and Abuja to the UK, offering express 3–5 day door delivery and standard 5–7 day cargo. We also operate a physical receiving depot at Queens Dock, Liverpool (L1 0BG) for UK distributions.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to send cargo from Nigeria to the UK?</h3>
                <p className="text-sm text-gray-600">View current UK air freight rates and collection options.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-uk">
                  Visit UK Route Hub <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Complete Guide to Shipping from Nigeria to the UK" />

            <RelatedGuides currentHref="/blog/complete-guide-shipping-from-nigeria-to-uk" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
