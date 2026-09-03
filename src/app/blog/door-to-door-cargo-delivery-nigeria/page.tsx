import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Door-to-Door Cargo Delivery to Lagos, Abuja & Nigeria | County Cargo',
  description: 'Complete guide to seamless door-to-door air and sea freight delivery across Lagos, Abuja, Port Harcourt, Kano, and all 36 Nigerian states.',
  keywords: 'door to door cargo delivery Nigeria, door to door shipping Lagos, parcel delivery Abuja, UK Nigeria door delivery, cargo dispatch Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/door-to-door-cargo-delivery-nigeria',
  },
};

export default function DoorToDoorCargoDeliveryNigeriaPost() {
  const articleUrl = 'https://countycargo.com/blog/door-to-door-cargo-delivery-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Door-to-Door Cargo Delivery to Lagos, Abuja and Other Nigerian Cities',
    description: 'How County Cargo manages international pickup in the UK/US, ocean or air freight, Lagos customs clearing, and final doorstep delivery in Nigeria.',
    image: 'https://countycargo.com/blog-8-international.png',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Delivery Specialist',
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
            { label: 'Door-to-Door Cargo Delivery Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Truck className="w-3.5 h-3.5 text-blue-300" /> Doorstep Delivery Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Door-to-Door Cargo Delivery to Lagos, Abuja and Other Nigerian Cities
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How County Cargo moves your shipment from UK/US collection points to final doorstep delivery across all 36 Nigerian states.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Delivery Specialist</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Door-to-Door Delivery
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo door-to-door delivery covers pickup across the UK and USA, international air or sea freight, customs clearing in Lagos, and final driver dispatch directly to residential or commercial addresses in Lagos, Abuja, Port Harcourt, Kano, Ibadan, and nationwide.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready for stress-free door-to-door shipping?</h3>
                <p className="text-sm text-gray-600">Request your free shipping quote or schedule a collection today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Get Door Delivery Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Door-to-Door Cargo Delivery to Lagos, Abuja and Other Nigerian Cities" />

            <RelatedGuides currentHref="/blog/door-to-door-cargo-delivery-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
