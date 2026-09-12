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
  title: 'Shipping from London to Lagos: Cost, Delivery Time & Guide',
  description: 'Complete London to Lagos air cargo guide. Compare £6.00/kg standard air (5–10 working days) & express (3–5 working days). Collection in Peckham, Woolwich & Wembley.',
  keywords: 'Shipping from London to Lagos, Cargo from London to Lagos, Air cargo from London to Lagos, London-to-Lagos shipping cost, London-to-Lagos cargo price per kilogram, Send a parcel from London to Lagos, Express delivery from London to Lagos',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-london-to-lagos',
  },
  openGraph: {
    title: 'Shipping from London to Lagos: Cost, Delivery Time & Guide',
    description: 'Complete London to Lagos air cargo guide. Compare £6.00/kg standard air (5–10 working days) & express (3–5 working days). Collection across Greater London.',
    images: [{ url: 'https://countycargo.com/london-to-lagos-freight.jpg', alt: 'Air freight pallet loading for London to Lagos cargo' }],
  },
};

export default function ShippingFromLondonToLagosPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-from-london-to-lagos';
  
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Shipping from London to Lagos: Cost, Delivery Time and Complete Guide',
    description: 'Authoritative guide for shipping personal effects, commercial cargo, and express parcels from London to Lagos with confirmed rates and pickup hubs.',
    image: 'https://countycargo.com/london-to-lagos-freight.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo London Dispatch Manager',
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
            { label: 'Shipping from London to Lagos' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/london-to-lagos-freight.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> London to Lagos Cargo Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from London to Lagos: Cost, Delivery Time and Complete Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Everything you need to know about doorstep pickup across Greater London, £6.00/kg freight rates, Murtala Muhammed Airport clearance, and Lagos delivery.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo London Dispatch Manager</span>
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
                <CheckCircle2 className="w-4 h-4 text-primary" /> Direct Answer: Shipping from London to Lagos
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Standard air cargo from London to Lagos costs <strong>£6.00 per kg</strong> (plus a £15 handling charge per shipment) with delivery in <strong>5 to 10 working days</strong>. Express Air Courier delivers urgent parcels in <strong>3 to 5 working days</strong>. Consignments clear customs at Murtala Muhammed International Airport (LOS) and can be picked up at our central Ladipo-Oshodi dispatch hub or delivered to your door in Lagos.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Introduction for London Shippers</h2>
            <p className="text-gray-700">
              Whether you are a Nigerian living in London sending personal belongings to family, an online seller shipping commercial inventory, a student moving luggage, or a business exporting goods, County Cargo provides reliable air shipping connecting London directly to Lagos. We collect from households across Central, North, South, East, and West London including key diaspora neighborhoods like Peckham, Woolwich, Lewisham, Croydon, Wembley, Barking, Dagenham, Tottenham, and Enfield.
            </p>

            {/* Charlton Drop-Off Feature Callout */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 not-prose">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  📍 Official London Drop-Off Point
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Drop off your Lagos cargo directly at our Charlton depot (SE7 8NF)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Bring boxes and barrels to New Lydenburg Commercial Estate, or book free collection in South East London.
                </p>
              </div>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold shrink-0">
                <Link href="/shipping-from-london-to-nigeria">
                  View Charlton Depot <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </Button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">How much does shipping from London to Lagos cost?</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl my-4">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Service Option</th>
                    <th className="p-3">Price / Rate</th>
                    <th className="p-3">Delivery Time</th>
                    <th className="p-3">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold">Standard Air Cargo</td>
                    <td className="p-3 font-bold text-primary">£6.00 / kg + £15 fee</td>
                    <td className="p-3">5 – 7 Working Days</td>
                    <td className="p-3">Boxes, luggage, clothes, dry food</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Express Air Courier (DHL)</td>
                    <td className="p-3 font-bold text-primary">Calculated Tariff</td>
                    <td className="p-3">3 – 5 Working Days</td>
                    <td className="p-3">Urgent documents, high-value electronics</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">What items can I send from London to Lagos?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-bold text-green-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Permitted Goods
                </h3>
                <ul className="text-xs text-green-800 space-y-1 list-disc list-inside">
                  <li>Clothes, shoes &amp; personal luggage</li>
                  <li>Laptops, smartphones &amp; electronics</li>
                  <li>Books &amp; legal documents</li>
                  <li>Non-perishable packaged dry foodstuff</li>
                  <li>Commercial stock &amp; retail goods</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <h3 className="font-bold text-red-900 text-sm mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Prohibited Items
                </h3>
                <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                  <li>Fresh uninspected meat/dairy</li>
                  <li>Flammable liquids &amp; perfume sprays</li>
                  <li>Raw plants, seeds &amp; soil</li>
                  <li>Weapons &amp; counterfeit goods</li>
                  <li>Uncertified pharmaceuticals</li>
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Ready to Ship from London to Lagos?</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Schedule a doorstep collection in London or get an instant quote for your Lagos cargo.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-uk-to-nigeria">Book London Cargo</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/447405556668" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Inquiry
                  </a>
                </Button>
              </div>
            </div>

            <SocialShare title="Shipping from London to Lagos: Cost, Delivery Time and Complete Guide" />

            <RelatedGuides currentHref="/blog/shipping-from-london-to-lagos" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
