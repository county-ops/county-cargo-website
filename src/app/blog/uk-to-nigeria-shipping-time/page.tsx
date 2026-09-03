import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'How Long Does Shipping from UK to Nigeria Take? | Delivery Times',
  description: 'Complete timeline guide for UK to Nigeria cargo. Compare Express Air (3-5 days), Standard Air (5-10 days), and Sea Freight (4-6 weeks) delivery times.',
  keywords: 'UK to Nigeria shipping time, how long air cargo takes Lagos, express shipping London to Abuja, sea freight transit time UK Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/uk-to-nigeria-shipping-time',
  },
  openGraph: {
    title: 'How Long Does Shipping from UK to Nigeria Take? | Delivery Times',
    description: 'Real transit timeline guide for shipping from London and the UK to Lagos and Nigeria.',
    images: [{ url: 'https://countycargo.com/london.jpg', alt: 'Transit timeline clock cargo flight London to Lagos delivery' }],
  },
};

export default function UkToNigeriaShippingTimePost() {
  const articleUrl = 'https://countycargo.com/blog/uk-to-nigeria-shipping-time';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How Long Does Shipping from the UK to Nigeria Take?',
    description: 'Detailed breakdown of delivery schedules and transit times for air and sea cargo moving from London and Liverpool to Lagos, Abuja, and nationwide Nigeria.',
    image: 'https://countycargo.com/london.jpg',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Dispatch Manager',
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
            { label: 'UK to Nigeria Shipping Time' },
          ]}
        />

        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(15, 23, 42, 0.92)), url('/london.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Clock className="w-3.5 h-3.5 text-blue-300" /> Transit Timeline Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How Long Does Shipping from the UK to Nigeria Take?
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Real transit expectations for Express Air, Standard Cargo, and Sea Freight to Lagos, Abuja, and all Nigerian states.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Dispatch Manager</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: UK to Nigeria Timelines
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Shipping from the UK to Nigeria takes <strong>3 to 5 working days</strong> for Express Air Courier, <strong>5 to 10 working days</strong> for Standard Air Freight, and <strong>4 to 6 weeks</strong> for Sea Freight. Timelines include flight/vessel transit, customs clearance, and door delivery in Lagos or Abuja.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Detailed Transit Schedule by Mode
            </h2>
            <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-2xs">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Shipping Option</th>
                    <th className="p-3">UK Departure</th>
                    <th className="p-3">Nigeria Arrival</th>
                    <th className="p-3">Total Transit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold">Express Air (DHL)</td>
                    <td className="p-3">Daily Flights</td>
                    <td className="p-3">Murtala Muhammed (LOS)</td>
                    <td className="p-3 font-bold text-primary">3 – 5 Working Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Standard Air Cargo</td>
                    <td className="p-3">Bi-weekly Flights</td>
                    <td className="p-3">Lagos Cargo Terminal</td>
                    <td className="p-3 font-bold text-primary">5 – 10 Working Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Sea Cargo (LCL/FCL)</td>
                    <td className="p-3">Weekly Sailings</td>
                    <td className="p-3">Apapa / Tin Can Port</td>
                    <td className="p-3 font-bold text-primary">4 – 6 Weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to send your parcel to Nigeria?</h3>
                <p className="text-sm text-gray-600">Track your consignment live or book a doorstep collection across the UK.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Book UK Cargo Shipment <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How Long Does Shipping from the UK to Nigeria Take?" />

            <RelatedGuides currentHref="/blog/uk-to-nigeria-shipping-time" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
