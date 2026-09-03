import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import {
  MapPin,
  Plane,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Shipping from London to Kano: Air Cargo, Cost & Delivery Guide',
  description: 'Master guide for sending air cargo from London to Kano. Covers collection across London, airport arrival, bonded onward transit & Sabon Gari depot pickup.',
  keywords: 'Shipping from London to Kano, Cargo from London to Kano, Air cargo from London to Kano, London-to-Kano shipping cost, London-to-Kano cargo price per kilogram, Send a parcel from London to Kano, Express shipping from London to Kano',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-london-to-kano',
  },
  openGraph: {
    title: 'Shipping from London to Kano: Air Cargo, Cost & Delivery Guide',
    description: 'Master guide for sending air cargo from London to Kano. Covers collection across London, airport arrival, bonded onward transit & Sabon Gari depot pickup.',
    images: [{ url: 'https://countycargo.com/sq-nigeria-uk.png', alt: 'Bonded cargo transit moving freight from customs to Kano Sabon Gari depot' }],
  },
};

export default function ShippingFromLondonToKanoPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-from-london-to-kano';
  
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Shipping from London to Kano: Air Cargo, Cost and Delivery Guide',
    description: 'Authoritative guide for shipping personal effects, commercial merchandise, and express parcels from London to Kano with confirmed rates and Sabon Gari depot pickup.',
    image: 'https://countycargo.com/sq-nigeria-uk.png',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Northern Nigeria Operations Specialist',
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
            { label: 'Shipping from London to Kano' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/sq-nigeria-uk.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> London to Kano Route Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from London to Kano: Air Cargo, Cost and Delivery Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Everything you need to know about London doorstep pickup, customs clearance, bonded onward transit, and Kano Sabon Gari commercial depot collection.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo Northern Nigeria Operations Specialist</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Logistics Compliance Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-yellow-400" /> 30 August 2026</span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            
            {/* Answer-First Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Direct Answer: Shipping from London to Kano
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Standard air cargo from London to Kano starts at <strong>£6.00 per kg</strong> (plus a £15 handling fee per shipment) with total transit in <strong>6 to 10 working days</strong>. Express Air Courier delivers in <strong>3 to 5 working days</strong>. Cargo flies from London into international airport gateways in Lagos or Abuja for customs clearance, followed by secure bonded onward dispatch to our commercial pickup depot in Sabon Gari, Kano.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">London Collection &amp; Route Operations</h2>
            <p className="text-gray-700">
              We collect parcels across London: Barking, Dagenham, Woolwich, Peckham, Lewisham, Croydon, Wembley, Tottenham, and Enfield. Consignments are processed, weighed, and flown into Nigerian gateways.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">London to Kano Rates &amp; Delivery Schedule</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl my-4">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Service Option</th>
                    <th className="p-3">Price / Rate</th>
                    <th className="p-3">Delivery Time</th>
                    <th className="p-3">Kano Collection Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold">Standard Air Cargo</td>
                    <td className="p-3 font-bold text-primary">£6.00 / kg + £15 fee</td>
                    <td className="p-3">6 – 10 Working Days</td>
                    <td className="p-3">Sabon Gari Commercial Depot, Kano</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Express Air Courier (DHL)</td>
                    <td className="p-3 font-bold text-primary">Calculated Tariff</td>
                    <td className="p-3">3 – 5 Working Days</td>
                    <td className="p-3">Kano Address Delivery Available</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Onward Transit to Kano &amp; Depot Collection</h2>
            <p className="text-gray-700">
              Following customs clearance at the international airport gateway, cargo is moved via secure bonded logistics trucks or feeder air services to Kano. Customers receive SMS notifications when their consignment arrives at the Sabon Gari commercial pickup depot.
            </p>

            {/* CTAs */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Ready to Ship Cargo from London to Kano?</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Schedule a London pickup or request a quote for your Kano cargo.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-uk-to-nigeria">Book London Cargo</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/447438827464" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Inquiry
                  </a>
                </Button>
              </div>
            </div>

            <SocialShare title="Shipping from London to Kano: Air Cargo, Cost and Delivery Guide" />

            <RelatedGuides currentHref="/blog/shipping-from-london-to-kano" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
