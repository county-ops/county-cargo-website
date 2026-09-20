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
  Globe,
  Zap,
  Tag,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Express Cargo From Nigeria | 3–5 Days Worldwide | County Cargo',
  description:
    'Express cargo from Nigeria to the UK, USA, Canada, Germany and 200+ countries. Door-to-door in 3–5 working days shipped via DHL Express. 10% off your first 5kg.',
  keywords:
    'express cargo from Nigeria, DHL express Nigeria to UK, fast shipping from Nigeria to USA, express delivery Nigeria to Canada, how long does express shipping from Nigeria take',
  alternates: {
    canonical: 'https://countycargo.com/blog/express-cargo-from-nigeria',
  },
  openGraph: {
    title: 'Express Cargo From Nigeria | 3–5 Days Worldwide | County Cargo',
    description:
      'Express cargo from Nigeria to the UK, USA, Canada, Germany and 200+ countries. Door-to-door in 3–5 working days shipped via DHL Express. 10% off your first 5kg.',
    url: 'https://countycargo.com/blog/express-cargo-from-nigeria',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-express-from-nigeria-family-delivery.jpg',
        width: 1200,
        height: 675,
        alt: 'Family opening an express cargo parcel from Nigeria delivered by County Cargo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Express Cargo From Nigeria | 3–5 Days Worldwide | County Cargo',
    description:
      'Express cargo from Nigeria to the UK, USA, Canada, Germany and 200+ countries. Door-to-door in 3–5 working days shipped via DHL Express. 10% off your first 5kg.',
    images: [
      'https://countycargo.com/images/blog/county-cargo-express-from-nigeria-family-delivery.jpg',
    ],
  },
};

export default function ExpressCargoFromNigeriaPage() {
  const articleUrl = 'https://countycargo.com/blog/express-cargo-from-nigeria';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'Express international courier and cargo',
        name: 'Express Cargo From Nigeria',
        description:
          'Door-to-door express cargo from Nigeria to over 200 countries in 3–5 working days shipped via DHL Express.',
        provider: {
          '@type': 'MovingCompany',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          telephone: '+234 811 000 0421',
          address: [
            {
              '@type': 'PostalAddress',
              streetAddress:
                'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi',
              addressLocality: 'Lagos',
              postalCode: '102214',
              addressCountry: 'NG',
            },
            {
              '@type': 'PostalAddress',
              streetAddress: 'Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado St',
              addressLocality: 'Abuja',
              addressCountry: 'NG',
            },
            {
              '@type': 'PostalAddress',
              streetAddress:
                'Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street',
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
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Ireland' },
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Australia' },
          { '@type': 'Country', name: 'South Africa' },
        ],
        offers: {
          '@type': 'Offer',
          description:
            '10% discount for new customers exporting 5kg or more from Nigeria; 5% off for existing customers exporting 10kg or more.',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long does express cargo from Nigeria take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most express shipments arrive within 3 to 5 working days door to door. Deliveries to the UK and Germany are typically at the faster end of that range (3 to 4 working days); North America, Asia, and Australasia are typically 3 to 5 working days.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much does express shipping from Nigeria cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Express is priced on chargeable weight (the greater of actual weight and volumetric weight) and varies by destination country. New customers exporting 5kg or more receive 10% off their first shipment.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I send a mobile phone or laptop by express from Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Keep the original purchase receipt, as customs authorities at the destination destination will require proof of value. Batteries must be contained within the device, not shipped loose.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which countries can I send express cargo to from Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Over 200 countries worldwide, including the UK, USA, Canada, Germany, Ireland, France, the Netherlands, Italy, Spain, the UAE, Saudi Arabia, China, India, Australia, South Africa, and Ghana.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I track my express parcel from Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. You receive a dedicated tracking number at collection and can follow the shipment through departure from Nigeria, transit, customs clearance, and doorstep delivery.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is express cheaper than standard air freight?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No — express costs more per kilogram because it flies on the next available flight without consolidation queues. It is designed for time-critical consignments. For non-urgent shipments, standard air freight (5–10 working days) or sea cargo (4 to 8 weeks) is more economical.',
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline:
          'Express Cargo From Nigeria: Door to Door Worldwide in 3–5 Working Days',
        description:
          'Express cargo from Nigeria to the UK, USA, Canada, Germany and 200+ countries. Door-to-door in 3–5 working days shipped via DHL Express.',
        image:
          'https://countycargo.com/images/blog/county-cargo-express-from-nigeria-family-delivery.jpg',
        datePublished: '2026-09-10',
        dateModified: '2026-09-10',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Global Operations',
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
    <div className="min-h-screen bg-white">
      <JsonLd data={combinedSchema} />
      <Header />

      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              {
                label: 'Express Cargo From Nigeria',
                href: '/blog/express-cargo-from-nigeria',
              },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Express Worldwide Service
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> 10 September 2026
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> County Cargo Global Operations
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Express Cargo From Nigeria: Door to Door Worldwide in 3–5 Working Days
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              When deadlines cannot wait three weeks at sea, County Cargo express moves your shipment from your door in Nigeria to doorsteps across the UK, USA, Canada, Germany, and 200+ countries in {SHIPPING_TIMEFRAMES.EXPRESS_AIR}, shipped via DHL Express.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Express Cargo From Nigeria: Door to Door Worldwide in 3–5 Working Days"
                url={articleUrl}
              />
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-express-from-nigeria-family-delivery.jpg"
              alt="Family opening an express cargo parcel from Nigeria delivered by County Cargo"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Key Facts Summary Box */}
          <section
            aria-label="Service Overview"
            className="mb-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Express Route Snapshot
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Transit Speed</p>
                <p className="text-xl font-bold text-primary mt-1">{SHIPPING_TIMEFRAMES.EXPRESS_AIR}</p>
                <p className="text-xs text-gray-500 mt-0.5">Door to door</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Global Reach</p>
                <p className="text-xl font-bold text-gray-900 mt-1">200+ Countries</p>
                <p className="text-xs text-gray-500 mt-0.5">Worldwide network</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Carrier Network</p>
                <p className="text-xl font-bold text-gray-900 mt-1">DHL Express</p>
                <p className="text-xs text-gray-500 mt-0.5">Direct air routing</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wide">New Customers</p>
                <p className="text-xl font-bold text-green-700 mt-1">10% Off 5kg+</p>
                <p className="text-xs text-gray-500 mt-0.5">First export</p>
              </div>
            </div>
          </section>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p>
              Some things cannot wait three weeks at sea.
            </p>
            <p>
              A commercial contract that has to be signed in Frankfurt by Friday. Your daughter’s original educational certificate for an urgent university intake deadline in Toronto. Time-critical medication needed for your mother in Manchester. A textile sample a buyer in Houston wants on his desk before signing the purchase order. Your grandson’s birthday in Atlanta, where the parcel must land before the celebration, not after it.
            </p>
            <p>
              That is exactly what express shipping is built for. County Cargo’s express service moves your consignment from your doorstep in Lagos, Abuja, Port Harcourt, or any Nigerian city directly to an international doorstep in <strong>{SHIPPING_TIMEFRAMES.EXPRESS_AIR}</strong>, carried on the DHL Express network — the identical air infrastructure that powers urgent logistics for global enterprises, made readily available for your single carton.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
              Why Express is Different
            </h2>
            <p>
              Standard air freight operates on a consolidation model: your parcel is gathered alongside dozens of others at the departure hub, waits for the total batch to fill the scheduled container, and clears destination customs together. For bulk goods where freight cost takes priority over calendar days, standard air cargo ({SHIPPING_TIMEFRAMES.STANDARD_AIR}) is an outstanding option.
            </p>
            <p>
              Express does none of that waiting. Your carton is weighed, scanned, barcoded, and routed directly onto the next available international departure flight as an individual priority consignment. Customs paperwork is lodged and cleared electronically while the aircraft is still in flight. There is no batch waiting, no holding bay, and no container staging delay.
            </p>
            <p className="font-semibold text-gray-900">
              You invest slightly more per kilogram. In return, you get critical days back.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
              Where We Deliver Across 200+ Destinations
            </h2>
            <p>
              Our express export network reaches over 200 sovereign nations and international territories. The key destinations frequently booked by our Nigerian clients include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/70">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" /> United Kingdom & Ireland
                </h3>
                <p className="text-sm text-gray-600">
                  London, Manchester, Birmingham, Liverpool, Leeds, Glasgow, Edinburgh, Cardiff, Belfast, Dublin, and every postal code nationwide. Typically <strong>3–4 working days</strong>.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/70">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" /> United States & Canada
                </h3>
                <p className="text-sm text-gray-600">
                  Houston, Dallas, New York, Atlanta, Chicago, Washington DC, Maryland, Los Angeles; Toronto, Ottawa, Calgary, Edmonton, Vancouver, Montreal. Typically <strong>3–5 working days</strong>.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/70">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" /> Western & Northern Europe
                </h3>
                <p className="text-sm text-gray-600">
                  Germany (Berlin, Frankfurt, Munich), France (Paris), Netherlands (Amsterdam), Belgium, Italy, Spain, Switzerland, Sweden, Norway, Denmark, Poland. Typically <strong>3–4 working days</strong>.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/70">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" /> Middle East, Asia & Australasia
                </h3>
                <p className="text-sm text-gray-600">
                  United Arab Emirates (Dubai, Abu Dhabi), Qatar, Saudi Arabia, China, Hong Kong, India, Japan, Singapore, Australia (Sydney, Melbourne), New Zealand.
                </p>
              </div>
            </div>

            <p>
              If your desired destination is not listed above, simply ask our Lagos team. The global network covers virtually every inhabited continent and territory.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
              What Moves Well on Express Cargo
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Official Documents & Certificates:</strong> Original educational degrees, transcripts, corporate contracts, visa paperwork, legal briefs, and tender bid dossiers.
              </li>
              <li>
                <strong>Electronics & Devices:</strong> Smartphones, laptops, tablets, smart watches, and components (ensure you retain the original retail purchase receipt for customs proof of value).
              </li>
              <li>
                <strong>Urgent Healthcare & Medication:</strong> Prescribed pharmaceuticals, vitamins, herbal supplements, and medical diagnostic aids (certified doctor’s prescription required where applicable).
              </li>
              <li>
                <strong>Fashion & Lifestyle:</strong> Tailored African attire, Aso Ebi sets, designer footwear, handbags, human hair bundles, wigs, and premium cosmetics.
              </li>
              <li>
                <strong>Commercial Samples:</strong> Agricultural export samples, fabric swatches, replacement machine spares, and industrial prototypes before production runs.
              </li>
              <li>
                <strong>Celebration Gifts:</strong> Wedding gifts, milestone birthday packages, and festive family cartons tied to an unmovable calendar date.
              </li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
              What Express Cannot Carry
            </h2>
            <p>
              Every sovereign territory maintains strict import controls. Because express shipments are fast-tracked, declarations must be 100% compliant. Fresh meats, raw seafood, unprocessed wet herbs, and unsealed perishable organic items cannot be accepted. Loose lithium-ion batteries, aerosol sprays, flammable chemicals, liquid perfumes over limited thresholds, cash currency, and uncertified agricultural seeds are prohibited or severely restricted.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl not-prose my-6">
              <p className="text-sm font-semibold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                Compliance Protects Transit Speed
              </p>
              <p className="text-sm text-amber-800 mt-1">
                A single undisclosed prohibited item does not merely get confiscated; it halts your entire carton in customs quarantine and forfeits the express transit window you paid for. When in doubt about any specific item, telephone our dispatch desk before taping your box.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
              Four Steps to Guarantee Fastest Delivery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary font-bold text-xs rounded mb-2">Step 1</span>
                <h3 className="font-bold text-gray-900 mb-1">Book Morning Collection</h3>
                <p className="text-sm text-gray-600">
                  Arranging parcel pickup before 12:00 noon allows same-day processing and evening airport departure. Bookings after 4:00 pm roll over to the next flight cycle.
                </p>
              </div>

              <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary font-bold text-xs rounded mb-2">Step 2</span>
                <h3 className="font-bold text-gray-900 mb-1">Itemise Descriptions Honestly</h3>
                <p className="text-sm text-gray-600">
                  Avoid generic words like &quot;gift&quot; or &quot;personal goods&quot;. Write exact counts: &quot;3 pairs leather shoes, 2 cotton shirts, 1 corporate contract&quot;. Exactness breezes past inspection.
                </p>
              </div>

              <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary font-bold text-xs rounded mb-2">Step 3</span>
                <h3 className="font-bold text-gray-900 mb-1">Include Valid Recipient Phone Numbers</h3>
                <p className="text-sm text-gray-600">
                  Most delayed deliveries occur when the overseas courier driver cannot ring the recipient at the gate. Always supply an active local mobile number with area dialing code.
                </p>
              </div>

              <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary font-bold text-xs rounded mb-2">Step 4</span>
                <h3 className="font-bold text-gray-900 mb-1">Pack in Sturdy Double-Wall Boxes</h3>
                <p className="text-sm text-gray-600">
                  High-speed transit involves automated airport sorters and conveyers. Use rigid double-wall corrugated cartons, cushion interior spaces, and seal with heavy tape.
                </p>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
              Understanding Express Pricing & Discounts
            </h2>
            <p>
              Express cargo is invoiced on <strong>chargeable weight</strong> — which is the greater of actual gross weight on the scale or the parcel’s volumetric dimensional weight (Length × Width × Height in cm ÷ 5,000). Packing compactly without excess empty air keeps your invoice lower.
            </p>
            <p>
              To celebrate our expanded international routes, County Cargo offers two active export discounts:
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 not-prose my-6">
              <div className="flex items-start gap-4">
                <Tag className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-emerald-950 mb-1">
                    Special Nigeria Export Discounts
                  </h3>
                  <ul className="text-sm text-emerald-900 space-y-2 mt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <strong>10% Off for First-Time Customers:</strong> Applicable on all export shipments of 5kg and above leaving Nigeria.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <strong>5% Off for Existing Customers:</strong> Applicable on export consignments of 10kg and above from Nigeria.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
              Over 15,000 Consignments Safely Delivered
            </h2>
            <p>
              County Cargo has successfully moved more than 15,000 packages between Nigeria and the United Kingdom alone, with physical offices situated in Lagos, Abuja, Liverpool, and Texas. We manage your airway bill generation, carrier tracking, electronic customs pre-clearance, and final-mile doorstep delivery.
            </p>
            <p>
              You simply seal the box, hand it to our collection driver, and watch it cross the world in real time.
            </p>
          </div>

          {/* Cross-Link Route Navigation Box */}
          <section
            aria-label="Popular Regional Express Corridors"
            className="my-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Popular Regional Cargo Routes from Nigeria
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Sending heavier shipments or standard air cargo? Explore our dedicated city-to-city cargo services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <Link
                href="/blog/cargo-lagos-to-london"
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-primary text-gray-800 hover:text-primary transition font-medium"
              >
                Lagos to London Postcodes →
              </Link>
              <Link
                href="/blog/cargo-abuja-to-london"
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-primary text-gray-800 hover:text-primary transition font-medium"
              >
                Abuja to London Tracked Express →
              </Link>
              <Link
                href="/blog/cargo-lagos-to-houston"
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-primary text-gray-800 hover:text-primary transition font-medium"
              >
                Lagos to Houston Texas →
              </Link>
              <Link
                href="/blog/cargo-lagos-to-toronto"
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-primary text-gray-800 hover:text-primary transition font-medium"
              >
                Lagos to Toronto Canada →
              </Link>
              <Link
                href="/blog/cargo-port-harcourt-to-uk"
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-primary text-gray-800 hover:text-primary transition font-medium"
              >
                Port Harcourt to the UK →
              </Link>
              <Link
                href="/blog/cargo-benin-city-to-usa"
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-primary text-gray-800 hover:text-primary transition font-medium"
              >
                Benin City to the USA →
              </Link>
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="my-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Frequently Asked Questions: Express Cargo From Nigeria
            </h2>

            <div className="space-y-4">
              <details className="group border border-gray-200 rounded-xl p-5 bg-white open:bg-gray-50/50 transition">
                <summary className="font-bold text-gray-900 cursor-pointer flex justify-between items-center list-none">
                  <span>How long does express cargo from Nigeria take?</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Most express shipments arrive within {SHIPPING_TIMEFRAMES.EXPRESS_AIR} door to door. Deliveries to the UK, Germany, and Western Europe are typically at the faster end (3–4 working days); North America (USA & Canada), Asia, and Australasia are typically 3–5 working days.
                </p>
              </details>

              <details className="group border border-gray-200 rounded-xl p-5 bg-white open:bg-gray-50/50 transition">
                <summary className="font-bold text-gray-900 cursor-pointer flex justify-between items-center list-none">
                  <span>How much does express shipping from Nigeria cost?</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Express is priced on chargeable weight (the greater of actual weight and volumetric weight) and varies by destination country. New customers exporting 5kg or more from Nigeria receive a 10% discount on their first shipment.
                </p>
              </details>

              <details className="group border border-gray-200 rounded-xl p-5 bg-white open:bg-gray-50/50 transition">
                <summary className="font-bold text-gray-900 cursor-pointer flex justify-between items-center list-none">
                  <span>Can I send a mobile phone or laptop by express from Nigeria?</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Yes. Retain your commercial purchase receipt or invoice, as customs authorities at destination require proof of purchase and valuation. Batteries must be housed securely within the device itself, not shipped loose.
                </p>
              </details>

              <details className="group border border-gray-200 rounded-xl p-5 bg-white open:bg-gray-50/50 transition">
                <summary className="font-bold text-gray-900 cursor-pointer flex justify-between items-center list-none">
                  <span>Which countries can I send express cargo to from Nigeria?</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Over 200 sovereign nations and territories worldwide, including the United Kingdom, United States, Canada, Germany, Ireland, France, the Netherlands, Italy, Spain, the UAE, Saudi Arabia, China, India, Australia, South Africa, and Ghana.
                </p>
              </details>

              <details className="group border border-gray-200 rounded-xl p-5 bg-white open:bg-gray-50/50 transition">
                <summary className="font-bold text-gray-900 cursor-pointer flex justify-between items-center list-none">
                  <span>Can I track my express parcel from Nigeria?</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Yes. You receive an international waybill tracking number immediately upon collection, allowing you to follow departure from Nigeria, transit milestones, electronic customs clearance, and final delivery to the recipient’s doorstep.
                </p>
              </details>

              <details className="group border border-gray-200 rounded-xl p-5 bg-white open:bg-gray-50/50 transition">
                <summary className="font-bold text-gray-900 cursor-pointer flex justify-between items-center list-none">
                  <span>Is express cheaper than standard air freight?</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  No — express costs more per kilogram because it flies on the next available commercial or dedicated cargo aircraft without waiting for consolidation batches. It is designed for time-critical consignments. For larger, less urgent cargo, standard air freight ({SHIPPING_TIMEFRAMES.STANDARD_AIR}) or sea freight ({SHIPPING_TIMEFRAMES.SEA_CARGO}) is more economical.
                </p>
              </details>
            </div>
          </section>

          {/* Call to Action Box */}
          <section className="bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Book Your Express Shipment Today
            </h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
              Contact our Lagos or Abuja dispatch teams with your item description, estimated carton weight, and destination country. We provide a same-day quote and dispatch our doorstep collection driver.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-6 rounded-xl shadow-md w-full sm:w-auto"
              >
                <a
                  href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20would%20like%20to%20book%20an%20express%20shipment%20from%20Nigeria."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 rounded-xl w-full sm:w-auto"
              >
                <a href="tel:+2348110000421" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call: +234 811 000 0421
                </a>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 text-xs text-primary-foreground/75 space-y-1">
              <p>
                <strong>Lagos Operations:</strong> Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos 102214
              </p>
              <p>
                <strong>Abuja Operations:</strong> Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, Abuja-FCT
              </p>
            </div>
          </section>

          <RelatedGuides currentHref="/blog/express-cargo-from-nigeria" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
