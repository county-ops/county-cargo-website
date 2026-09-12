import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import { UsNigeriaQuoteForm } from '@/app/ship-from-us-to-nigeria/quote-form';
import {
  Plane,
  Ship,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  FileText,
  Warehouse,
  Truck,
  Phone,
  Package,
  Boxes,
  HelpCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from USA to Lagos | Door to Door | County Cargo',
  description:
    'Cargo shipping from the USA to Lagos by air and sea. Door-to-door delivery, customs handled, barrels and pallets welcome. Get a free quote today.',
  keywords:
    'shipping from USA to Lagos, cargo to Lagos from USA, send package to Lagos, USA to Lagos freight, air freight to Murtala Muhammed Airport, sea freight Apapa Tin Can, Irving Texas to Lagos cargo, door to door delivery Lagos',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-usa-to-lagos',
  },
  openGraph: {
    title: 'Shipping from USA to Lagos | Door to Door | County Cargo',
    description:
      'Cargo shipping from the USA to Lagos by air and sea. Door-to-door delivery, customs handled, barrels and pallets welcome. Get a free quote today.',
    url: 'https://countycargo.com/shipping-from-usa-to-lagos',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'County Cargo - Shipping from USA to Lagos Door to Door',
      },
    ],
  },
};

const lagosFaqs = [
  {
    question: 'How much does it cost to ship from the USA to Lagos?',
    answer:
      'Air freight to Lagos starts at $5.00 per lb (minimum 5 lbs), which includes Nigerian customs clearance and airport release. Standard 55-gallon sea freight shipping barrels start at $220 to $250 each. Commercial palletised freight starts from $450 depending on total cubic meters (CBM).',
  },
  {
    question: 'How long does air and sea cargo take to reach Lagos from the US?',
    answer:
      'Air freight takes approximately 5 to 10 working days from flight departure at our US consolidation hub to final delivery in Lagos. Sea freight takes approximately 6 to 8 weeks from vessel departure to container discharge and clearing at Apapa or Tin Can Island ports.',
  },
  {
    question: 'Which areas in Lagos do you deliver to?',
    answer:
      'We deliver door-to-door across all of Lagos State, including Ikeja, Lekki, Victoria Island, Ikoyi, Surulere, Yaba, Ajah, Festac, Apapa, Ikorodu, Badagry, Epe, Alimosho, and Magodo. If you are located outside these core areas, contact us — our dispatch fleet covers virtually any address in Lagos.',
  },
  {
    question: 'Can I pick up my shipment at your Lagos office instead of home delivery?',
    answer:
      'Yes. If you prefer self-collection, you can pick up your cleared cargo free of charge from our central Lagos hub: Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos.',
  },
  {
    question: 'Why do other freight companies suffer long customs delays in Lagos?',
    answer:
      'Delays at Lagos ports are almost always due to customs paperwork and third-party broker bottlenecks, not ocean vessel sailing times. At County Cargo, our in-house clearing agents manage customs directly at Murtala Muhammed International Airport and Apapa/Tin Can ports, ensuring rapid clearance and avoiding demurrage charges.',
  },
];

const deliveryAreas = [
  'Ikeja',
  'Lekki Phase 1 & 2',
  'Victoria Island',
  'Ikoyi',
  'Surulere',
  'Yaba',
  'Ajah & Sangotedo',
  'Festac Town',
  'Apapa',
  'Ikorodu',
  'Magodo & Maryland',
  'Badagry & Epe',
];

export default function ShippingFromUsaToLagosPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://countycargo.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shipping from USA to Nigeria',
        item: 'https://countycargo.com/shipping-from-usa-to-nigeria',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Shipping from USA to Lagos',
        item: 'https://countycargo.com/shipping-from-usa-to-lagos',
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Door-to-Door Cargo Shipping from USA to Lagos',
    provider: {
      '@type': 'LocalBusiness',
      name: 'County Cargo',
      telephone: '+1-469-902-6900',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1234 N Belt Line Rd',
        addressLocality: 'Irving',
        addressRegion: 'TX',
        postalCode: '75061',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Lagos',
    },
    description:
      'Door-to-door cargo shipping from the USA to Lagos by air and sea. Fast 5-10 day air freight and economical sea freight barrels with customs cleared.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: lagosFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="text-xs sm:text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/shipping-from-usa-to-nigeria" className="hover:text-white transition-colors">
                    Shipping from USA to Nigeria
                  </Link>
                </li>
                <li>/</li>
                <li className="text-blue-400 font-medium">Lagos</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-6 border border-blue-500/30">
                  <MapPin className="w-4 h-4" /> Apapa • Tin Can • Murtala Muhammed Airport
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
                  Shipping from the USA to Lagos
                </h1>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  Lagos is our highest-volume Nigerian destination, which means it is also our fastest
                  and our cheapest. Cargo arrives at Apapa and Tin Can Island for sea freight, or
                  Murtala Muhammed International for air, and we clear it and deliver across Lagos
                  State.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-blue-700 text-white font-semibold">
                    <a href="#quote-calculator">
                      Get Lagos Shipping Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                    <a
                      href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20quote%20for%20shipping%20from%20the%20USA%20to%20Lagos"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Quote
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-800 text-xs sm:text-sm">
                  <div>
                    <span className="block text-gray-400">Air to Lagos</span>
                    <span className="font-bold text-white text-base">5–10 Days</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Sea to Lagos</span>
                    <span className="font-bold text-white text-base">6–8 Weeks</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Air Rate</span>
                    <span className="font-bold text-white text-base">$5.00 / lb</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Sea Barrels</span>
                    <span className="font-bold text-emerald-400 text-base">From $220</span>
                  </div>
                </div>
              </div>

              {/* Lagos Route Details Card */}
              <div className="lg:col-span-5 bg-gray-800/80 p-6 sm:p-8 rounded-2xl border border-gray-700/60 shadow-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Warehouse className="text-primary h-5 w-5" /> Lagos Office &amp; Hub Details
                </h3>
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="p-3 bg-gray-900/90 rounded-xl border border-gray-700/40">
                    <span className="font-semibold text-white block mb-1">Central Lagos Depot:</span>
                    <p className="text-xs text-gray-400">
                      Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos.
                    </p>
                    <span className="text-xs text-emerald-400 block mt-1">
                      ✓ Free customer collection available
                    </span>
                  </div>
                  <div className="p-3 bg-gray-900/90 rounded-xl border border-gray-700/40">
                    <span className="font-semibold text-white block mb-1">Texas Dispatch Warehouse:</span>
                    <p className="text-xs text-gray-400">
                      1234 N Belt Line Rd, Irving, TX 75061, United States.
                    </p>
                    <p className="text-xs text-blue-300 mt-1">Tel: +1 (469) 902-6900</p>
                  </div>
                  <Link
                    href="/blog/shipping-to-lagos-from-usa"
                    className="flex items-center justify-between p-3.5 bg-blue-950/60 rounded-xl hover:bg-blue-900/60 border border-blue-800/40 transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold text-blue-200 group-hover:text-white">
                        Lagos Ports &amp; Clearing Guide
                      </h4>
                      <p className="text-xs text-blue-300/80">
                        Apapa vs Tin Can, avoiding demurrage, and clearance speeds
                      </p>
                    </div>
                    <FileText className="h-4 w-4 text-blue-300 group-hover:text-white shrink-0 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Delivery Areas in Lagos */}
        <section className="py-16 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Delivery Areas in Lagos
              </h2>
              <p className="text-gray-700 text-base">
                We deliver directly to residences, commercial shops, and industrial warehouses across
                Lagos State. If your district is not listed below, ask us — we usually still cover it.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {deliveryAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-gray-800">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Transit Times & Costs */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Transit Times */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Transit Times to Lagos
                </h2>
                <p className="text-gray-700 text-base mb-6">
                  Delays are almost always customs, not the vessel. We clear our own cargo in-house,
                  which is why our delivery figures hold up better than a broker&apos;s.
                </p>
                <div className="space-y-4">
                  <div className="p-5 border border-blue-200 bg-blue-50/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      <h3 className="font-bold text-gray-900 text-lg">Air Freight to Lagos</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      Approximately <strong>5 to 10 working days</strong> from drop-off at our Irving, TX
                      facility to door delivery in Lagos. Flies directly into Murtala Muhammed
                      International Airport (LOS).
                    </p>
                  </div>

                  <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Ship className="h-5 w-5 text-emerald-700" />
                      <h3 className="font-bold text-gray-900 text-lg">Sea Freight to Lagos</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      Approximately <strong>6 to 8 weeks</strong>. Discharges at Apapa Port or Tin Can
                      Island, fully cleared through Nigerian Customs and dispatched by our Lagos ground
                      trucking fleet.
                    </p>
                  </div>
                </div>
              </div>

              {/* What it costs */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">What It Costs</h2>
                <p className="text-gray-700 text-base mb-6">
                  Sea freight is priced by volume, air freight by weight. Send us your package dimensions
                  or barrel count and we will quote the same day.
                </p>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Cargo Type</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Rate / Pricing</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-4 py-3.5 font-medium text-gray-900">Air Cargo (Standard)</td>
                        <td className="px-4 py-3.5 text-primary font-bold">$5.00 / lb</td>
                        <td className="px-4 py-3.5 text-gray-600">5 lbs min; customs clearing included</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3.5 font-medium text-gray-900">55-Gal Jumbo Drum</td>
                        <td className="px-4 py-3.5 text-primary font-bold">From $220</td>
                        <td className="px-4 py-3.5 text-gray-600">Ocean freight to Lagos port + clearing</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3.5 font-medium text-gray-900">Palletised Cargo</td>
                        <td className="px-4 py-3.5 text-primary font-bold">From $450</td>
                        <td className="px-4 py-3.5 text-gray-600">Priced by CBM; commercial consignments</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3.5 font-medium text-gray-900">Vehicles (Sedan / SUV)</td>
                        <td className="px-4 py-3.5 text-primary font-bold">Custom Quote</td>
                        <td className="px-4 py-3.5 text-gray-600">RoRo or container; VIN verification</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Calculator */}
        <section id="quote-calculator" className="py-16 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Calculate Shipping Cost to Lagos
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Message us with what you are shipping and we will price it properly the same day.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <UsNigeriaQuoteForm />
            </div>
          </div>
        </section>

        {/* Section: FAQs */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" /> Questions About Shipping to Lagos
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {lagosFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-gray-200 rounded-xl px-5 py-2 shadow-sm bg-gray-50/50"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related Routes & Blog Footer */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
              Explore Related USA &amp; Nigeria Cargo Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/shipping-from-usa-to-abuja"
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">USA to Abuja (FCT)</span>
                <span className="text-xs text-gray-500">Direct air into Nnamdi Azikiwe Airport</span>
              </Link>
              <Link
                href="/shipping-from-usa-to-port-harcourt"
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">USA to Port Harcourt</span>
                <span className="text-xs text-gray-500">Air freight &amp; sea barrels to Rivers State</span>
              </Link>
              <Link
                href="/shipping-from-usa-to-nigeria"
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">All US to Nigeria Services</span>
                <span className="text-xs text-gray-500">Consolidation from Irving, Texas warehouse</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
