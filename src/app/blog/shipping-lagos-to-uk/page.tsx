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
  title: 'Shipping From Lagos to the UK | Nationwide | County Cargo',
  description:
    'Ship from Lagos to anywhere in the UK. County Cargo delivers to Manchester, Birmingham, Liverpool, Glasgow and beyond, by air or sea freight.',
  keywords:
    'shipping from Lagos to UK, Lagos to UK cargo, send goods Lagos to United Kingdom, Lagos to Manchester cargo, Lagos to Liverpool cargo',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-lagos-to-uk',
  },
  openGraph: {
    title: 'Shipping From Lagos to the UK | Nationwide | County Cargo',
    description:
      'Ship from Lagos to anywhere in the UK. County Cargo delivers to Manchester, Birmingham, Liverpool, Glasgow and beyond, by air or sea freight.',
    url: 'https://countycargo.com/blog/shipping-lagos-to-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-lagos-to-uk-groupage.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo consolidated sea freight consignment prepared in Lagos for nationwide UK delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping From Lagos to the UK | Nationwide | County Cargo',
    description:
      'Ship from Lagos to anywhere in the UK. County Cargo delivers to Manchester, Birmingham, Liverpool, Glasgow and beyond, by air or sea freight.',
    images: [
      'https://countycargo.com/images/blog/county-cargo-lagos-to-uk-groupage.jpg',
    ],
  },
};

export default function ShippingLagosToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/shipping-lagos-to-uk';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Shipping from Lagos to the UK',
        description:
          'Nationwide air freight and consolidated sea freight from Lagos to Manchester, Birmingham, Liverpool, Glasgow, Leeds, and all UK postcodes.',
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
          { '@type': 'City', name: 'Lagos' },
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
            name: 'Do you deliver outside London?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — every UK postcode is covered, including Greater Manchester, Merseyside, West Midlands, Yorkshire, Scotland, Wales, and Northern Ireland.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the cheapest way to ship from Lagos to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Consolidated sea groupage is the most economical solution for any shipment over 50kg where you can accommodate a transit window of approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.`,
            },
          },
          {
            '@type': 'Question',
            name: 'How should I pack a barrel for sea freight?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Line the inside of the drum, seal contents in protective polythene bags, fill all internal voids to prevent shifting, secure the locking ring clamp with a security seal, and clearly label both the lid and outer wall.',
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Shipping From Lagos to the UK | Nationwide | County Cargo',
        description:
          'Ship from Lagos to anywhere in the UK. County Cargo delivers to Manchester, Birmingham, Liverpool, Glasgow and beyond, by air or sea freight.',
        image: 'https://countycargo.com/images/blog/county-cargo-lagos-to-uk-groupage.jpg',
        datePublished: '2026-09-07T08:00:00+01:00',
        dateModified: '2026-09-07T08:00:00+01:00',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Logistics Operations',
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
              { label: 'Shipping Lagos to UK' },
            ]}
          />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">
                Nationwide UK Delivery
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> 7 September 2026
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Shipping From Lagos to the UK: Nationwide Delivery Explained
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              London is not the whole story. A large share of the Nigerian community in Britain lives in Manchester, Birmingham, Liverpool, Leeds, Glasgow, Cardiff, and Belfast. Shipping to those cities should never cost more or take longer than shipping to the capital.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  CC
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Logistics Operations</p>
                  <p className="text-xs text-gray-500">Liverpool &amp; Lagos Freight Control</p>
                </div>
              </div>
              <SocialShare title="Shipping From Lagos to the UK | Nationwide | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-lagos-to-uk-groupage.jpg"
              alt="County Cargo consolidated sea freight consignment prepared in Lagos for nationwide UK delivery"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Route Summary Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700" /> Key Route Facts: Lagos to Nationwide UK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-emerald-950">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Air Cargo Transit</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p>
                <p className="text-xs text-gray-600">Parcels under 30kg &amp; fast cargo</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Sea Groupage Transit</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p>
                <p className="text-xs text-gray-600">Consolidated bulk &amp; drums (50kg+)</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Northern UK Depot</p>
                <p className="text-lg font-bold text-primary mt-0.5">Liverpool HQ</p>
                <p className="text-xs text-gray-600">Direct North West final mile</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Shipping From Lagos to the UK: Nationwide Delivery Explained
              </h2>
              <p className="leading-relaxed">
                London is not the whole story. A large share of the Nigerian community in Britain lives in Manchester, Birmingham, Liverpool, Leeds, Glasgow, Cardiff, and Belfast — and shipping to those cities should not cost more or take longer than shipping to the capital. County Cargo delivers to every UK postcode on the same predictable schedule.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Where We Deliver Across Britain
              </h3>
              <p className="leading-relaxed">
                We service all four nations: England, Scotland, Wales, and Northern Ireland, including the Highlands and Islands and the Isle of Man.
              </p>
              <p className="leading-relaxed">
                Our permanent receiving depot in Liverpool (Unit G6, Queens Dock Commercial Centre) handles northern consignments directly. This means shorter final-mile transit times across Merseyside, Greater Manchester, Cheshire, Lancashire, and West Yorkshire than traditional competitors who route every northern parcel through crowded hubs in the south-east.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Choosing Your Service
              </h3>
              <div className="space-y-4 not-prose">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-primary" /> Air Freight
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Designed for anything urgent or lighter packages under 30kg. Goods are cleared through customs and loaded onto a UK delivery vehicle within <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong> of collection in Lagos.
                  </p>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Ship className="w-5 h-5 text-primary" /> Sea Freight
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Built for volume. Heavy shipping barrels, complete household moves, and commercial pallets. Delivers in roughly <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong> at a fraction of the per-kilo air freight cost.
                  </p>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" /> Consolidated Groupage (LCL)
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    If you are shipping less than a full container, your goods travel alongside other consignments in a consolidated container and you pay only for the exact space you take up. This is the sweet spot for most family shipments over 50kg.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Packing for a Long Journey
              </h3>
              <p className="leading-relaxed">
                Sea freight means weeks at sea with natural temperature swings and maritime humidity. Follow our packing rules:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Double-Wall Cartons Only:</strong> Single-wall retail boxes easily crush under stacked weight. Always insist on heavy-duty double-wall corrugated cardboard.
                </li>
                <li>
                  <strong>Polythene Lining:</strong> Bag and seal dry foodstuffs and clothing in heavy plastic sacks before packing inside the outer carton.
                </li>
                <li>
                  <strong>No Internal Voids:</strong> Pack tightly and fill empty corners with bubble wrap, packing paper, or textiles. Loose items shake and cause carton failure.
                </li>
                <li>
                  <strong>Fragile Protection:</strong> Fragile items need a box-within-a-box approach with at least 5cm of dense cushioning on every side. If it rattles when shaken, it will break.
                </li>
                <li>
                  <strong>Two-Sided Labelling:</strong> Affix clear recipient address labels on at least two sides of each box, as single labels can scrape against adjacent cargo.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Customs and Import Duty
              </h3>
              <p className="leading-relaxed">
                Personal effects and bona fide gifts under the statutory threshold usually clear without UK customs charges. Commercial goods attract UK duty and VAT based on the declared commercial value and UK integrated tariff commodity code.
              </p>
              <p className="leading-relaxed">
                We declare honestly and professionally on your behalf. Deliberately under-declaring to avoid VAT is the single most common reason consignments are held, inspected, or fined by border authorities.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Real-Time Tracking Across the UK
              </h3>
              <p className="leading-relaxed">
                Every consignment receives a tracking code at the time of pickup in Lagos. You can trace its journey through airport or port departure, UK customs clearance, handover to domestic line-haul, and final doorstep delivery. The UK recipient receives SMS alerts confirming their delivery date and expected time slot.
              </p>
            </section>
          </div>

          {/* Cross-linking Cluster Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">
              Explore Related Nigeria to UK Shipping Guides
            </h3>
            <p className="text-sm text-blue-900 mb-4">
              Sending exclusively to Greater London, or looking for specific city depot services? Explore our companion pages:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/cargo-lagos-to-london"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Cargo From Lagos to London: Door-to-Door &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Dedicated delivery across all 32 London boroughs and London postcodes.
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
              Frequently Asked Questions: Shipping Lagos to UK
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Do you deliver outside London?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Yes — every UK postcode is covered, including Greater Manchester, Merseyside, West Midlands, Yorkshire, Scotland, Wales, and Northern Ireland.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  What is the cheapest way to ship from Lagos to the UK?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Consolidated sea groupage is the most economical solution for any shipment over 50kg where you can accommodate a transit window of approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  How should I pack a barrel for sea freight?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Line the inside of the drum, seal contents in protective polythene bags, fill all internal voids to prevent shifting, secure the locking ring clamp with a security seal, and clearly label both the lid and outer wall.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Book Nationwide Shipping from Lagos to the UK
              </h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">
                Whether you need fast air freight to Manchester or consolidated sea groupage to Glasgow, County Cargo delivers with complete transparency.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20goods%20from%20Lagos%20to%20the%20UK"
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
