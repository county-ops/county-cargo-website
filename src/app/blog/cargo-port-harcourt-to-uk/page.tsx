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
  title: 'Cargo From Port Harcourt to the UK | County Cargo',
  description:
    'Ship cargo from Port Harcourt to the UK with County Cargo. Door-to-door collection across Rivers State, air and sea freight, full tracking and customs handling.',
  keywords:
    'cargo Port Harcourt to UK, shipping Port Harcourt to United Kingdom, Port Harcourt to London shipping, send goods Port Harcourt to UK, Rivers State freight to UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-port-harcourt-to-uk',
  },
  openGraph: {
    title: 'Cargo From Port Harcourt to the UK | County Cargo',
    description:
      'Ship cargo from Port Harcourt to the UK with County Cargo. Door-to-door collection across Rivers State, air and sea freight, full tracking and customs handling.',
    url: 'https://countycargo.com/blog/cargo-port-harcourt-to-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-port-harcourt-to-uk-collection.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo collecting sealed cartons in Port Harcourt for shipping to the UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Port Harcourt to the UK | County Cargo',
    description:
      'Ship cargo from Port Harcourt to the UK with County Cargo. Door-to-door collection across Rivers State, air and sea freight, full tracking and customs handling.',
    images: [
      'https://countycargo.com/images/blog/county-cargo-port-harcourt-to-uk-collection.jpg',
    ],
  },
};

export default function CargoPortHarcourtToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-port-harcourt-to-uk';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Port Harcourt to the UK',
        description:
          'Door-to-door air freight and sea freight collection across Rivers State with delivery to all UK addresses.',
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
          { '@type': 'City', name: 'Port Harcourt' },
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
            name: 'Do you collect from Port Harcourt directly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — we collect from your doorstep across Port Harcourt city including GRA Phase 2, Trans Amadi, Rumuola, Rumuokoro, Diobu, Elekahia, and Woji. Collections in surrounding Rivers State towns can be arranged.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does shipping from Port Harcourt to the UK take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Air freight from Port Harcourt to the UK takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO} and is ideal for large or heavy consignments.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Can I ship oil-related equipment or industrial goods from Port Harcourt?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We handle commercial and industrial consignments on a case-by-case basis. Contact us with full details of the goods, weight, dimensions and destination, and our team will advise on the correct documentation and routing.',
            },
          },
          {
            '@type': 'Question',
            name: 'What documents do I need to ship cargo from Port Harcourt to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For personal effects you need a valid ID and a packing list. For commercial shipments you also need a commercial invoice, packing list, and declared value. We guide you through the full paperwork at booking.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I track my shipment from Port Harcourt?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You receive a tracking reference at collection and can follow your shipment online through domestic transit, departure from Nigeria, UK customs clearance, and final doorstep delivery.',
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Port Harcourt to the UK | County Cargo',
        description:
          'Ship cargo from Port Harcourt to the UK with County Cargo. Door-to-door collection across Rivers State, air and sea freight, full tracking and customs handling.',
        image: 'https://countycargo.com/images/blog/county-cargo-port-harcourt-to-uk-collection.jpg',
        datePublished: '2026-09-10T08:00:00+01:00',
        dateModified: '2026-09-10T08:00:00+01:00',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Port Harcourt Logistics Team',
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
              { label: 'Cargo Port Harcourt to UK' },
            ]}
          />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">
                South-South Nigeria Route
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> 10 September 2026
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cargo From Port Harcourt to the UK: Door-to-Door Freight
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Port Harcourt is Nigeria&apos;s oil capital and one of its busiest commercial cities. County Cargo collects directly from your door across Rivers State and delivers to any UK address — fully tracked, customs cleared.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  CC
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Port Harcourt Logistics Team</p>
                  <p className="text-xs text-gray-500">Rivers State Hub</p>
                </div>
              </div>
              <SocialShare title="Cargo From Port Harcourt to the UK | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-port-harcourt-to-uk-collection.jpg"
              alt="County Cargo collecting sealed cartons in Port Harcourt for shipping to the UK"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Route Summary Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700" /> Key Route Facts: Port Harcourt to UK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-emerald-950">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Standard Air Cargo</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p>
                <p className="text-xs text-gray-600">Urgent parcels, gifts &amp; documents</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Economical Sea Cargo</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p>
                <p className="text-xs text-gray-600">Barrels, bulk goods &amp; furniture</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Rivers State Pickup</p>
                <p className="text-lg font-bold text-primary mt-0.5">Direct Doorstep</p>
                <p className="text-xs text-gray-600">GRA, Trans Amadi, Rumuola &amp; more</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Shipping From Port Harcourt to the UK
              </h2>
              <p className="leading-relaxed">
                Port Harcourt — PH to anyone who lives there — is a city of energy, enterprise, and tight-knit communities. It is also home to one of the largest Nigerian diasporas in the UK. From Rumuola to GRA Phase 2, from Rumuokoro to Diobu, the city&apos;s neighbourhoods have deep connections with London, Manchester, Birmingham, and beyond. County Cargo makes that connection physical — collecting from your door in Port Harcourt and delivering to your family in the UK.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Who Ships from Port Harcourt
              </h3>
              <p className="leading-relaxed">
                Three groups make up the bulk of our Port Harcourt shipments:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Families sending provisions:</strong> Dried fish from Mile 1 Market, crayfish, ogiri, uziza leaves, palm oil, ede cocoyam, and seasonal foodstuffs that are impossible to source in the UK.
                </li>
                <li>
                  <strong>Students and relocating professionals:</strong> Forwarding personal effects, winter clothing, and academic materials before a move or study programme in the UK.
                </li>
                <li>
                  <strong>Traders and small business owners:</strong> Exporting handmade goods, textiles, fashion pieces, and small commercial consignments to Nigerian-owned businesses in the UK.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Air Freight or Sea Freight: Choosing the Right Option
              </h3>
              <p className="leading-relaxed">
                <strong>Air freight</strong> is the fastest way to move cargo from Port Harcourt to the UK. Consignments are collected, flown, and delivered door to door in <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>. It suits urgent parcels, time-sensitive gifts, and lighter shipments under 30 kg.
              </p>
              <p className="leading-relaxed">
                <strong>Sea freight</strong> is built for volume. Barrels packed with foodstuffs, multiple cartons of clothing, household goods, and furniture travel at a far lower cost per kilogram — arriving in approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>. If you are not in a hurry and you have a lot to send, sea is the answer.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Collection Areas Across Port Harcourt and Rivers State
              </h3>
              <p className="leading-relaxed">
                We cover Port Harcourt city and surrounding Rivers State locations:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                {[
                  'GRA Phase 2', 'Trans Amadi', 'Rumuola', 'Rumuokoro',
                  'Diobu', 'Elekahia', 'Woji', 'Elelenwo',
                  'Ogbum-Nu-Abali', 'Eagle Island', 'Borokiri', 'Obio-Akpor',
                ].map((area) => (
                  <div key={area} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {area}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                What You Can Send
              </h3>
              <p className="leading-relaxed">
                Our Port Harcourt to UK service accepts a wide range of goods, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dried and processed foodstuffs (crayfish, stockfish, palm oil in sealed containers, spices)</li>
                <li>Clothing, fabrics, and fashion goods</li>
                <li>Cosmetics and personal care products</li>
                <li>Electronics (mobile phones accepted with proof of purchase)</li>
                <li>Medication (prescription documentation may be required)</li>
                <li>Household effects and personal belongings</li>
                <li>Documents and official correspondence</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Customs and UK Import Rules
              </h3>
              <p className="leading-relaxed">
                Personal effects and genuine gifts under UK statutory thresholds typically clear without import duty under Transfer of Residence provisions. Commercial shipments require a commercial invoice, packing list, and declared value. Our team prepares accurate customs documentation — a correct declaration always clears faster than an optimistic one.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Booking Your Port Harcourt Collection
              </h3>
              <p className="leading-relaxed">
                Contact us via WhatsApp or phone with the contents list, approximate weight, and UK delivery postcode. We give you a quote, schedule your doorstep collection in Port Harcourt, and issue a tracking reference at pickup. You follow every stage from collection to UK doorstep delivery.
              </p>
            </section>
          </div>

          {/* Cross-linking Cluster Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">
              More Nigeria to UK Shipping Routes
            </h3>
            <p className="text-sm text-blue-900 mb-4">
              Sending from Lagos or looking for our nationwide Nigeria to UK guide? See our companion routes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/shipping-lagos-to-uk"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Shipping From Lagos to the UK &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Air and sea freight options from Lagos with full customs guidance.
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
                  Full pricing, customs documentation, packaging rules, and instant quote.
                </p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions: Port Harcourt to UK Shipping
            </h3>
            <div className="space-y-4">
              {[
                {
                  q: 'Do you collect from Port Harcourt directly?',
                  a: 'Yes — we collect from your doorstep across Port Harcourt city including GRA Phase 2, Trans Amadi, Rumuola, Rumuokoro, Diobu, Elekahia, and Woji. Collections in surrounding Rivers State towns can be arranged.',
                },
                {
                  q: 'How long does shipping from Port Harcourt to the UK take?',
                  a: `Air freight takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO} and is ideal for large or heavy consignments.`,
                },
                {
                  q: 'Can I ship industrial goods or equipment from Port Harcourt?',
                  a: 'We handle commercial and industrial consignments on a case-by-case basis. Contact us with full details — weight, dimensions, and destination — and we will advise on documentation and routing.',
                },
                {
                  q: 'What documents do I need to ship cargo from Port Harcourt to the UK?',
                  a: 'For personal effects: valid ID and packing list. For commercial shipments: commercial invoice, packing list, and declared value. We guide you through the paperwork at booking.',
                },
                {
                  q: 'How do I track my shipment from Port Harcourt?',
                  a: 'You receive a tracking reference at collection and follow your shipment online through domestic transit, departure, UK customs clearance, and final doorstep delivery.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-base">{q}</h4>
                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Ship Directly from Port Harcourt to the UK
              </h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">
                Doorstep collection across Rivers State. Reliable delivery to any address in England, Scotland, Wales, or Northern Ireland.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20Port%20Harcourt%20to%20the%20UK"
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
