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
  title: 'Shipping from London to Abuja: Prices, Delivery & Customs',
  description: 'Comprehensive guide for shipping cargo from London to Abuja. Learn air cargo rates (£6.00/kg), flight schedules, Garki/Wuse depot collection & FCT delivery.',
  keywords: 'Shipping from London to Abuja, Cargo from London to Abuja, Air cargo from London to Abuja, London-to-Abuja shipping cost, London-to-Abuja cargo price per kilogram, Send a parcel from London to Abuja, Express shipping from London to Abuja',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-london-to-abuja',
  },
  openGraph: {
    title: 'Shipping from London to Abuja: Prices, Delivery & Customs',
    description: 'Comprehensive guide for shipping cargo from London to Abuja. Learn air cargo rates (£6.00/kg), flight schedules, Garki/Wuse depot collection & FCT delivery.',
    images: [{ url: 'https://countycargo.com/london-to-abuja-cargo.jpg', alt: 'Air freight dispatch from Greater London to Abuja Nnamdi Azikiwe Airport' }],
  },
};

export default function ShippingFromLondonToAbujaPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-from-london-to-abuja';
  
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Shipping from London to Abuja: Prices, Delivery and Customs Guide',
    description: 'Authoritative guide for shipping personal effects, commercial cargo, and express parcels from London to Abuja with confirmed rates and central FCT depot collection.',
    image: 'https://countycargo.com/london-to-abuja-cargo.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo UK-Abuja Logistics Lead',
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
            { label: 'Shipping from London to Abuja' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/london-to-abuja-cargo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> London to Abuja Route Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from London to Abuja: Prices, Delivery and Customs Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Learn how cargo moves from Greater London doorstep pickup to Abuja Nnamdi Azikiwe Airport and central FCT depot collection.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo UK-Abuja Logistics Lead</span>
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
                <CheckCircle2 className="w-4 h-4 text-primary" /> Direct Answer: Shipping from London to Abuja
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Standard air cargo from London to Abuja costs <strong>£6.00 per kg</strong> (plus a £15 handling charge per shipment) with delivery in <strong>5 to 8 working days</strong>. Express Air Courier delivers urgent packages in <strong>3 to 5 working days</strong>. Cargo flies into Nigeria via direct air routes (cleared at Nnamdi Azikiwe Airport ABV or transferred from airport customs) for pickup at our central Abuja depot (servicing Garki, Wuse, Utako, and Maitama) or FCT door delivery.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">London Collection &amp; Route Logistics</h2>
            <p className="text-gray-700">
              County Cargo provides daily doorstep pick-up services across all London boroughs: Peckham, Woolwich, Lewisham, Croydon, Wembley, Barking, Dagenham, Tottenham, and Enfield. Consignments are consolidated in our London warehouse, weighed, inspected, and loaded onto direct international flights to Nigeria.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">London to Abuja Shipping Options &amp; Rates</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl my-4">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Service Option</th>
                    <th className="p-3">Price / Rate</th>
                    <th className="p-3">Delivery Time</th>
                    <th className="p-3">Abuja Collection Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold">Standard Air Cargo</td>
                    <td className="p-3 font-bold text-primary">£6.00 / kg + £15 fee</td>
                    <td className="p-3">5 – 8 Working Days</td>
                    <td className="p-3">Central Abuja Depot (Garki / Wuse)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Express Air Courier (DHL)</td>
                    <td className="p-3 font-bold text-primary">Calculated Tariff</td>
                    <td className="p-3">3 – 5 Working Days</td>
                    <td className="p-3">FCT Door Delivery Available</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Abuja Arrival &amp; Collection Arrangements</h2>
            <p className="text-gray-700">
              Upon clearance in Nigeria, packages are received at our central Abuja depot. Customers in Garki, Wuse, Utako, Maitama, Asokoro, Gwarinpa, and Kubwa can collect their parcels directly or request final-mile doorstep dispatch within the FCT.
            </p>

            {/* CTAs */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Ready to Ship Cargo from London to Abuja?</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Schedule a London pickup or request a quote for your Abuja cargo.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-uk-to-nigeria">Book London Pickup</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/447438827464" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Inquiry
                  </a>
                </Button>
              </div>
            </div>

            <SocialShare title="Shipping from London to Abuja: Prices, Delivery and Customs Guide" />

            <RelatedGuides currentHref="/blog/shipping-from-london-to-abuja" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
