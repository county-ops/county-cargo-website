import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
  Ship,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  Package,
  Layers,
  Truck,
  Box,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cargo From Kaduna to the UK | Door to Door | County Cargo',
  description:
    'Send cargo from Kaduna to the UK with County Cargo. Door-to-door collection across Kaduna State, air and sea freight, full tracking throughout.',
  keywords:
    'cargo Kaduna to UK, shipping Kaduna to United Kingdom, Kaduna to London shipping, send goods Kaduna to UK, Kaduna door to door freight',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-kaduna-to-uk',
  },
  openGraph: {
    title: 'Cargo From Kaduna to the UK | Door to Door | County Cargo',
    description:
      'Send cargo from Kaduna to the UK with County Cargo. Door-to-door collection across Kaduna State, air and sea freight, full tracking throughout.',
    url: 'https://countycargo.com/blog/cargo-kaduna-to-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-kaduna-to-uk-collection.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo van loading sealed cartons in Kaduna for door-to-door shipping to the UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Kaduna to the UK | Door to Door | County Cargo',
    description:
      'Send cargo from Kaduna to the UK with County Cargo. Door-to-door collection across Kaduna State, air and sea freight, full tracking throughout.',
    images: [
      'https://countycargo.com/images/blog/county-cargo-kaduna-to-uk-collection.jpg',
    ],
  },
};

export default function CargoKadunaToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-kaduna-to-uk';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Kaduna to the UK',
        description:
          'Door-to-door air freight and sea freight collection across Kaduna State with delivery to all UK addresses.',
        provider: {
          '@type': 'MovingCompany',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          telephone: '+2348110000421',
          address: [
            {
              '@type': 'PostalAddress',
              streetAddress: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi',
              addressLocality: 'Lagos',
              postalCode: '102214',
              addressCountry: 'NG',
            },
            {
              '@type': 'PostalAddress',
              streetAddress: 'Unit G6, Queens Dock Commercial Centre, 67-83 Norfolk Street',
              addressLocality: 'Liverpool',
              postalCode: 'L1 0BG',
              addressCountry: 'GB',
            },
            {
              '@type': 'PostalAddress',
              streetAddress: '1234 N Belt Line Rd',
              addressLocality: 'Irving',
              addressRegion: 'TX',
              postalCode: '75061',
              addressCountry: 'US',
            },
          ],
        },
        areaServed: [
          { '@type': 'City', name: 'Kaduna' },
          { '@type': 'Country', name: 'United Kingdom' },
        ],
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: articleUrl,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do you collect from Kaduna directly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — our team collects directly from your address across Kaduna city (Barnawa, Kawo, Malali, Ungwan Rimi, Tudun Wada, Sabon Tasha, Rigasa) and, by arrangement, Zaria, Kafanchan and the wider state.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the cheapest option from Kaduna to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Consolidated sea freight is the most affordable method for anyone shipping bulk goods, multiple cartons or barrels who can accommodate a delivery window of approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.`,
            },
          },
          {
            '@type': 'Question',
            name: 'How do I track my shipment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You receive an official tracking reference at collection in Kaduna and can trace your shipment online through domestic transit, flight departure, customs clearance, and final UK doorstep delivery.',
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Kaduna to the UK | Door to Door | County Cargo',
        description:
          'Send cargo from Kaduna to the UK with County Cargo. Door-to-door collection across Kaduna State, air and sea freight, full tracking throughout.',
        image: 'https://countycargo.com/images/blog/county-cargo-kaduna-to-uk-collection.jpg',
        datePublished: '2026-09-07T08:00:00+01:00',
        dateModified: '2026-09-07T08:00:00+01:00',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Kaduna Logistics Team',
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
      },
    ],
  };

  return (
    <>
      <JsonLd data={combinedSchema} />
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Cargo Kaduna to UK' },
            ]}
          />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">
                Kaduna Freight Route
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> 7 September 2026
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cargo From Kaduna to the UK: Door-to-Door Freight
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Kaduna sits at the historic rail and road crossroads of northern Nigeria. County Cargo collects directly across Kaduna State and delivers seamlessly to any UK address with full tracking and customs clearance.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  CC
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Kaduna Logistics Team</p>
                  <p className="text-xs text-gray-500">Crossroads Northern Hub</p>
                </div>
              </div>
              <SocialShare title="Cargo From Kaduna to the UK | Door to Door | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-kaduna-to-uk-collection.jpg"
              alt="County Cargo van loading sealed cartons in Kaduna for door-to-door shipping to the UK"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Route Summary Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700" /> Key Route Facts: Kaduna to UK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-emerald-950">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Standard Air Cargo</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p>
                <p className="text-xs text-gray-600">Urgent parcels under 30kg &amp; gifts</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Economical Sea Cargo</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p>
                <p className="text-xs text-gray-600">Barrels, bulk produce &amp; moves</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Kaduna State Pickup</p>
                <p className="text-lg font-bold text-primary mt-0.5">Direct Doorstep</p>
                <p className="text-xs text-gray-600">Kaduna city, Zaria &amp; Kafanchan</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Cargo From Kaduna to the UK: Door-to-Door Freight
              </h2>
              <p className="leading-relaxed">
                Kaduna sits at the crossroads of northern Nigeria — the vital rail and highway junction that connects Kano, Abuja, Jos, and the north-west. It is also home to a large, dynamic community with close family, academic, and business ties to Britain. County Cargo collects directly in Kaduna and delivers to any UK address.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Who Ships from Kaduna
              </h3>
              <p className="leading-relaxed">
                Three primary groups rely on our Kaduna shipping route:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Families:</strong> Sending packaged food from home, fabrics, festive gifts, and personal parcels to relatives in London, Manchester, Leeds, and Birmingham.
                </li>
                <li>
                  <strong>Students &amp; Relocating Professionals:</strong> Forwarding academic luggage, winter clothing, and household effects ahead of study programs or job relocations in the UK.
                </li>
                <li>
                  <strong>Traders &amp; Exporters:</strong> Exporting agricultural commodities, dried spices, ginger, textiles, and handcrafted goods to UK diaspora shops and commercial partners.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Air Freight or Sea Freight: Which Fits Your Shipment?
              </h3>
              <p className="leading-relaxed">
                <strong>Air freight</strong> is engineered for urgent or lighter consignments under 30kg — delivered door to door in <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>, fully tracked throughout. It is best for official documents, gifts, medication, and essential items.
              </p>
              <p className="leading-relaxed">
                <strong>Sea freight</strong> is designed for bulk. Household relocations, commercial retail stock, and multiple heavy shipping barrels move in approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong> at a fraction of the cost per kilo. If you can plan ahead, sea freight saves substantial money.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Collection Across Kaduna State
              </h3>
              <p className="leading-relaxed">
                We provide scheduled collections across Kaduna metropolis and surrounding towns:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Barnawa
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Kawo
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Malali
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Ungwan Rimi
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Tudun Wada
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Sabon Tasha
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Rigasa
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Zaria &amp; Kafanchan
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Packing Advice for the Northern Route
              </h3>
              <p className="leading-relaxed">
                Consignments from Kaduna travel a longer domestic transit leg before departing Nigeria, so robust packing standards are essential:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Heavy-Duty Double-Wall Cartons:</strong> Never use single-wall retail boxes. Ensure the cardboard can withstand stacking during road transport.</li>
                <li><strong>Polythene Protection:</strong> Seal all textiles, dry foods, and paperwork in waterproof plastic liners inside the carton to protect against road dust and atmospheric moisture.</li>
                <li><strong>Fill Every Void:</strong> Pack contents firmly so nothing shifts or rattles when the box is moved.</li>
                <li><strong>Two-Sided Labelling:</strong> Affix clear recipient address labels with contact telephone numbers on at least two opposite sides of each carton.</li>
                <li><strong>Box-Within-a-Box for Fragiles:</strong> For glassware, electronics, ceramics, or framed pieces, use a double-box technique with at least 5cm of cushioning on all six sides.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Customs and Import Declarations
              </h3>
              <p className="leading-relaxed">
                Used personal belongings and bona fide gifts under statutory UK thresholds generally clear without import taxes under UK Transfer of Residence rules. Commercial exports require a formal commercial invoice, packing list, and declared value for VAT and duty assessment.
              </p>
              <p className="leading-relaxed">
                We handle the customs declaration accurately on your behalf. A correct, transparent declaration always clears faster than an optimistic one.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Booking Your Kaduna Pickup
              </h3>
              <p className="leading-relaxed">
                Send our team the contents, estimated weight, and UK destination postcode. We provide an immediate price quote and schedule your doorstep collection in Kaduna. You receive a tracking reference on pickup and status updates right through to delivery.
              </p>
            </section>
          </div>

          {/* Cross-linking Cluster Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">
              Explore Northern Nigeria &amp; UK Shipping Routes
            </h3>
            <p className="text-sm text-blue-900 mb-4">
              Sending goods from Kano or exploring our comprehensive nationwide UK delivery guide? Check our companion routes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/cargo-kano-to-uk"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Cargo From Kano to the UK: Northern Route &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Artisan leather goods, woven textiles, and commercial exports from Kano State.
                </p>
              </Link>
              <Link
                href="/shipping-from-nigeria-to-uk"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Main Hub Page</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Nigeria to UK Shipping &amp; Freight Services Hub &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Full pricing, customs documentation, packaging rules, and instant quote calculator.
                </p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions: Kaduna to UK Shipping
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Do you collect from Kaduna directly?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Yes — our team collects directly from your address across Kaduna city (Barnawa, Kawo, Malali, Ungwan Rimi, Tudun Wada, Sabon Tasha, Rigasa) and, by arrangement, Zaria, Kafanchan, and the wider state.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  What is the cheapest option from Kaduna to the UK?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Consolidated sea freight is the most affordable method for anyone shipping bulk goods, multiple cartons, or barrels who can accommodate a delivery window of approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  How do I track my shipment?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  You receive an official tracking reference at collection in Kaduna and can trace your shipment online through domestic transit, flight departure, customs clearance, and final UK doorstep delivery.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Ship Directly from Kaduna to the UK
              </h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">
                Experience hassle-free doorstep collection across Kaduna State and reliable delivery to any address in England, Scotland, Wales, or Northern Ireland.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20Kaduna%20to%20the%20UK"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold gap-2">
                  <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
                </Button>
              </a>
              <Link href="/shipping-from-nigeria-to-uk">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 font-bold">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>

          <RelatedGuides />
        </article>
      </main>
      <Footer />
    </>
  );
}
