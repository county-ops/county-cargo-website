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
  FileText,
  Truck,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cargo From Lagos to London | Door-to-Door | County Cargo',
  description:
    'Send cargo from Lagos to London with County Cargo. Air and sea freight, door-to-door collection across Lagos and delivery to any London postcode.',
  keywords:
    'cargo from Lagos to London, shipping from Lagos to London, send parcel Lagos to London, Lagos to London air freight, Lagos to London door to door cargo',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-lagos-to-london',
  },
  openGraph: {
    title: 'Cargo From Lagos to London | Door-to-Door | County Cargo',
    description:
      'Send cargo from Lagos to London with County Cargo. Air and sea freight, door-to-door collection across Lagos and delivery to any London postcode.',
    url: 'https://countycargo.com/blog/cargo-lagos-to-london',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-lagos-to-london-collection.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo staff collecting a sealed carton from a customer in Lagos for shipping to London',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Lagos to London | Door-to-Door | County Cargo',
    description:
      'Send cargo from Lagos to London with County Cargo. Air and sea freight, door-to-door collection across Lagos and delivery to any London postcode.',
    images: [
      'https://countycargo.com/images/blog/county-cargo-lagos-to-london-collection.jpg',
    ],
  },
};

export default function CargoLagosToLondonPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-lagos-to-london';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Lagos to London',
        description:
          'Door-to-door air freight and sea cargo services from Lagos Island and Mainland to all 32 London boroughs and the City of London.',
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
          { '@type': 'City', name: 'London' },
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
            name: 'How long does cargo take from Lagos to London?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Air freight typically takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR} door to door. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Can I send food from Lagos to London?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — dried and processed foods such as garri, egusi, ogbono, and dried fish are permitted. Fresh meat, fish and unprocessed plant material are prohibited under UK import regulations.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you collect from my address in Lagos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We collect across Lagos Island and the Mainland at no extra charge within our standard zones, including Ikeja, Lekki, Victoria Island, Ikoyi, Surulere, Yaba, Festac, and Ajah.',
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Lagos to London | Door-to-Door | County Cargo',
        description:
          'Send cargo from Lagos to London with County Cargo. Air and sea freight, door-to-door collection across Lagos and delivery to any London postcode.',
        image: 'https://countycargo.com/images/blog/county-cargo-lagos-to-london-collection.jpg',
        datePublished: '2026-09-07T08:00:00+01:00',
        dateModified: '2026-09-07T08:00:00+01:00',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Lagos Dispatch Team',
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
              { label: 'Cargo Lagos to London' },
            ]}
          />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">
                Nigeria to UK Routes
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> 7 September 2026
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cargo From Lagos to London: Door-to-Door Delivery Guide
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Send cargo from Lagos to London with County Cargo. Enjoy door-to-door collection across Lagos Island and Mainland, fully tracked air freight, economical sea freight, and direct delivery to any London postcode.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  CC
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Lagos Dispatch Team</p>
                  <p className="text-xs text-gray-500">Lagos Hub • Ladipo-Oshodi</p>
                </div>
              </div>
              <SocialShare title="Cargo From Lagos to London | Door-to-Door | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-lagos-to-london-collection.jpg"
              alt="County Cargo staff collecting a sealed carton from a customer in Lagos for shipping to London"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Route Summary Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" /> Key Route Facts: Lagos to London
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-amber-950">
              <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-900">Standard Air Cargo</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p>
                <p className="text-xs text-gray-600">Door-to-door tracked delivery</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-900">Sea Cargo</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p>
                <p className="text-xs text-gray-600">Ideal for barrels and bulk volume</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-900">Coverage</p>
                <p className="text-lg font-bold text-primary mt-0.5">All 32 Boroughs</p>
                <p className="text-xs text-gray-600">Every London postcode + City</p>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Sending Cargo From Lagos to London: A Complete Guide
              </h2>
              <p className="leading-relaxed">
                Lagos and London are joined by one of the busiest personal shipping corridors in the world. Every week, families in Ikeja, Lekki, Surulere, and Yaba send food, clothing, documents, and gifts to relatives in Peckham, Woolwich, Thamesmead, and Barking. County Cargo handles that corridor as a specialist route rather than a sideline.
              </p>
              <p className="leading-relaxed">
                Whether you are sending authentic dried foodstuffs to loved ones, sending business samples to a UK client, or relocating your household effects, our end-to-end logistics ensure that your items move securely through customs clearance and arrive promptly at London doorsteps.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                What You Can Send from Lagos to London
              </h3>
              <p className="leading-relaxed">
                Most of what our customers ship falls into four groups:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Dry Foodstuffs:</strong> Traditional staples including garri, egusi, ogbono, ground melon, dried bitterleaf, stockfish, and well-packaged dried fish.
                </li>
                <li>
                  <strong>Personal Effects &amp; Clothing:</strong> Tailored African fashion, lace fabrics, Aso-Oke, shoes, winter coats, textbooks, and family luggage.
                </li>
                <li>
                  <strong>Documents &amp; Small Electronics:</strong> Official transcripts, certificates, deeds, contracts, laptops, phones, and approved accessories.
                </li>
                <li>
                  <strong>Gift Parcels &amp; Event Packages:</strong> Souvenirs for weddings, birthdays, Easter, and Christmas celebrations.
                </li>
              </ul>
              <p className="leading-relaxed">
                Each group has its own packing rules, and getting them right is the difference between a parcel that clears in days and one that sits at the border.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Air Freight or Sea Freight?
              </h3>
              <p className="leading-relaxed">
                <strong>Air freight</strong> suits parcels under 30kg where speed matters — documents, medication, birthday gifts, and anything perishable or time-sensitive. Expect <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong> from collection in Lagos to delivery at your London address.
              </p>
              <p className="leading-relaxed">
                <strong>Sea freight</strong> suits volume. If you are moving a household, sending a barrel, or shipping commercial stock, sea freight is significantly cheaper per kilo. Transit runs to roughly <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong> port to door.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Door-to-Door Collection Across Lagos
              </h3>
              <p className="leading-relaxed">
                You do not need to travel to a depot. We collect from anywhere on Lagos Island and the Mainland, including:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Ikeja
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Lekki Phase 1 &amp; 2
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Victoria Island
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Ikoyi
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Surulere
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Yaba
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Festac Town
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Ajah &amp; Ikorodu
                </div>
              </div>
              <p className="leading-relaxed">
                Your consignment is weighed, logged, and given a tracking reference at the point of collection so you have complete visibility from day one.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Delivery Anywhere in London
              </h3>
              <p className="leading-relaxed">
                On arrival in the UK, parcels are cleared through HM Revenue and Customs and scheduled for delivery to any London postcode. We cover all thirty-two London boroughs plus the City of London, with frequent drops across:
              </p>
              <p className="leading-relaxed font-medium text-gray-800">
                South East London (Peckham, Camberwell, Woolwich, Thamesmead, Lewisham, Bermondsey) • East London (Barking, Dagenham, Stratford, East Ham) • North West London (Wembley, Harrow, Kilburn, Brent) • North London (Tottenham, Enfield, Edmonton) • South West London (Brixton, Streatham, Croydon).
              </p>
              <p className="leading-relaxed">
                Recipients receive an SMS update with a precise delivery window and can easily rearrange if the allocated time does not suit.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                What We Cannot Carry
              </h3>
              <p className="leading-relaxed">
                UK border controls prohibit certain items outright. These include:
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-950 text-sm space-y-1">
                <p className="font-semibold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Prohibited Under UK Import Regulations:
                </p>
                <p>• Fresh, frozen, or uncured meat products (pork, beef, bushmeat, chicken)</p>
                <p>• Fresh wet fish or unpreserved seafood</p>
                <p>• Unprocessed plant material, raw soil, seeds, or uncertified fresh vegetables</p>
                <p>• Aerosols above permitted safety limits, lithium battery banks without declarations, flammable liquids</p>
                <p>• Unregistered prescription medicines or controlled substances</p>
              </div>
              <p className="leading-relaxed mt-3">
                If you are unsure about a specific foodstuff or item, ask our team before you pack it. A single prohibited item can hold up an entire consignment at the border.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                How to Book Your Lagos to London Cargo
              </h3>
              <p className="leading-relaxed">
                Booking takes just a couple of minutes:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact our Lagos dispatch team via WhatsApp or phone with contents, approximate weight, and destination London postcode.</li>
                <li>We provide an instant quote, book your convenient collection time, and issue your tracking number upon pickup.</li>
                <li>Track your shipment online as it departs Lagos Murtala Muhammed Airport, clears UK customs, and is delivered to your London door.</li>
              </ol>
            </section>
          </div>

          {/* Cross-linking Cluster Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">
              Explore Related Nigeria to UK Shipping Guides
            </h3>
            <p className="text-sm text-blue-900 mb-4">
              Need nationwide UK delivery outside London, or sending cargo from other Nigerian states? Explore our dedicated route guides:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/shipping-lagos-to-uk"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Shipping From Lagos to the UK: Nationwide Delivery &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Delivering across Manchester, Birmingham, Liverpool, Glasgow, Leeds, and beyond.
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
              Frequently Asked Questions: Lagos to London Cargo
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  How long does cargo take from Lagos to London?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Air freight typically takes <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong> door to door from collection in Lagos to delivery in London. Sea freight takes approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Can I send food from Lagos to London?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Yes — dried and processed foods are permitted (garri, egusi, ogbono, spices, dried smoked fish). Fresh meat, fish and unprocessed plant material are strictly prohibited under UK import regulations.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Do you collect from my address in Lagos?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Yes. We collect across Lagos Island and the Mainland at no extra charge within our standard pickup zones, including Ikeja, Lekki, Victoria Island, Ikoyi, Surulere, Yaba, Festac, and Ajah.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Ready to Send Cargo from Lagos to London?
              </h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">
                Contact our Lagos dispatch team today for an instant quote, fast doorstep collection, and reliable door-to-door delivery anywhere in London.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20send%20cargo%20from%20Lagos%20to%20London"
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
