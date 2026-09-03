import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Globe, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Shipping from USA & Texas to Nigeria: Complete Guide | County Cargo',
  description: 'Complete guide to shipping cargo from Texas, Houston, Dallas, Atlanta, and across the USA to Nigeria. Covers US receiving address, air freight, and ocean shipping.',
  keywords: 'shipping from USA to Nigeria, ship from Texas to Nigeria, Houston cargo Nigeria, Dallas freight Lagos, US personal shopper Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-usa-texas-to-nigeria',
  },
  openGraph: {
    title: 'Shipping from USA & Texas to Nigeria: Complete Guide | County Cargo',
    description: 'Cargo plane shipping from Texas USA to Lagos Abuja Nigeria freight.',
    images: [{ url: 'https://countycargo.com/service-us-to-nigeria-enhanced.png', alt: 'US and Texas cargo receiving warehouse dispatch to Lagos and Abuja Nigeria' }],
  },
};

export default function ShippingFromUsaTexasToNigeriaPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-from-usa-texas-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Shipping from the USA and Texas to Nigeria: Complete Guide',
    description: 'Comprehensive US freight guide detailing air and ocean cargo services from Texas and nationwide USA to Lagos, Abuja, and all 36 Nigerian states.',
    image: 'https://countycargo.com/service-us-to-nigeria-enhanced.png',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo US Operations Team',
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
            { label: 'Shipping from USA & Texas to Nigeria' },
          ]}
        />

        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(15, 23, 42, 0.92)), url('/service-us-to-nigeria-enhanced.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-3.5 h-3.5 text-blue-300" /> US &amp; Texas Logistics Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from the USA and Texas to Nigeria: Complete Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How to ship online shopping orders, personal effects, and commercial inventory from Houston, Dallas, Irving, Atlanta, and across America to Nigeria.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo US Operations Team</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: USA to Nigeria Shipping
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo provides seamless air freight (7–12 days) and ocean container shipping from the USA to Nigeria via our central Texas hub in Irving, TX (75061). US residents and Nigerian online shoppers get a free US address to consolidate purchases from Amazon, eBay, Walmart, and Apple for doorstep delivery in Lagos, Abuja, and nationwide.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to ship from the USA to Nigeria?</h3>
                <p className="text-sm text-gray-600">Get your free US shipping address and quote today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/ship-from-us-to-nigeria">
                  Get Free US Address <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Shipping from the USA and Texas to Nigeria: Complete Guide" />

            <RelatedGuides currentHref="/blog/shipping-from-usa-texas-to-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
