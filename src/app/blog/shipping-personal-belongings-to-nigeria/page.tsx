import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Package, ShieldCheck, CheckCircle2, ArrowRight, HeartHandshake } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Shipping Personal Belongings from UK to Nigeria | County Cargo',
  description: 'Complete guide to sending personal clothes, shoes, household goods, and gifts from London, Liverpool, and the UK to Nigeria without airline baggage fees.',
  keywords: 'shipping personal belongings to Nigeria, excess baggage UK to Nigeria, send clothes to Lagos, relocation cargo Nigeria, personal effects shipping UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-personal-belongings-to-nigeria',
  },
};

export default function ShippingPersonalBelongingsToNigeriaPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-personal-belongings-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Shipping Personal Belongings from the UK to Nigeria',
    description: 'Affordable, secure door-to-door relocation and personal effects cargo solutions from the UK to Nigeria.',
    image: 'https://countycargo.com/images/blog/shipping-personal-belongings-uk-to-nigeria.jpg',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Relocation Expert',
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
            { label: 'Shipping Personal Belongings to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <HeartHandshake className="w-3.5 h-3.5" /> Personal Effects &amp; Relocation Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping Personal Belongings from the UK to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Save hundreds of pounds compared to airline excess baggage fees when sending luggage, clothes, and household items.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Relocation Expert</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Personal Effects Shipping
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Shipping personal belongings from the UK to Nigeria via County Cargo costs £6.00/kg (air freight) with 5–10 working day delivery, compared to £25–£40 per kg charged by commercial airlines for excess baggage. Customers can ship clothes, shoes, kitchenware, gifts, and electronics with full door-to-door tracking and customs handling in Lagos, Abuja, and all Nigerian states.
              </p>
            </div>

            <p className="text-lg text-gray-700">
              Whether you are a student returning home, relocating your family back to Nigeria, or sending seasonal care packages to loved ones in Lagos, Abuja, or Port Harcourt, shipping personal items should be easy and cost-effective.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              What Can You Include in Personal Belongings Cargo?
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Wardrobe &amp; Accessories:</strong> Clothing, shoes, traditional wear, jackets, bags, and beddings.</li>
              <li><strong>Home Electronics:</strong> Laptops, blenders, microwaves, sound systems, and small kitchen appliances.</li>
              <li><strong>Personal Care &amp; Cosmetics:</strong> Non-liquid toiletries, perfumes (under volume limits), and beauty products.</li>
              <li><strong>Packaged Dry Foods:</strong> Cereals, canned goods, dried spices, and sweets (non-perishable only).</li>
            </ul>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Planning to ship personal items from the UK?</h3>
                <p className="text-sm text-gray-600">Get your free UK shipping address or schedule a doorstep collection today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Get Personal Shipping Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Shipping Personal Belongings from the UK to Nigeria" />

            <RelatedGuides currentHref="/blog/shipping-personal-belongings-to-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
