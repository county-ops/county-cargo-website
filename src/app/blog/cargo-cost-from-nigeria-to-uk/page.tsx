import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'How Much Does Cargo from Nigeria to the UK Cost?',
  description: 'Transparent breakdown of air cargo costs per kg, handling fees, customs clearance charges, and door delivery fees from Nigeria to the United Kingdom.',
  keywords: 'cargo cost from Nigeria to UK, air freight per kg Lagos to London, shipping price Nigeria to UK, cheap cargo to Manchester',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-cost-from-nigeria-to-uk',
  },
};

export default function UkCargoCostPost() {
  const articleUrl = 'https://countycargo.com/blog/cargo-cost-from-nigeria-to-uk';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How Much Does Cargo from Nigeria to the UK Cost?',
    description: 'Complete breakdown of freight rates per kg, volumetric weight calculations, and HMRC import rules for Nigeria to UK air cargo.',
    image: 'https://countycargo.com/blog-6-nigeria-uk.png',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Finance Analyst',
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
            { label: 'Cargo Cost from Nigeria to UK' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <DollarSign className="w-3.5 h-3.5" /> UK Freight Pricing Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How Much Does Cargo from Nigeria to the UK Cost?
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Understand per-kg air freight pricing, volumetric weight math, UK door delivery fees, and customs clearance charges.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Finance Analyst</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: UK Cargo Cost Calculation
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Air cargo from Nigeria to the UK is charged based on chargeable weight (actual vs volumetric weight). Express courier options deliver in 3–5 working days while standard air cargo takes 5–10 working days to London, Liverpool, and nationwide UK addresses.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Want an exact quote for your UK parcel?</h3>
                <p className="text-sm text-gray-600">Calculate rates for London, Manchester, Birmingham, and Liverpool.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-uk">
                  Calculate UK Rate <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How Much Does Cargo from Nigeria to the UK Cost?" />

            <RelatedGuides currentHref="/blog/cargo-cost-from-nigeria-to-uk" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
