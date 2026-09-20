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
  Car,
  Boxes,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from USA to Nigeria | Air & Sea Freight | County Cargo',
  description:
    'Door-to-door cargo shipping from the USA to Nigeria. Air and sea freight, barrels, pallets and vehicles. Free quote from our Irving, Texas warehouse.',
  keywords:
    'shipping from USA to Nigeria, cargo shipping USA to Nigeria, send goods to Nigeria from USA, freight forwarder USA to Nigeria, air freight USA to Nigeria, sea freight USA to Nigeria, Texas to Nigeria cargo, Irving warehouse Nigeria shipping',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-usa-to-nigeria',
  },
  openGraph: {
    title: 'Shipping from USA to Nigeria | Air & Sea Freight | County Cargo',
    description:
      'Door-to-door cargo shipping from the USA to Nigeria. Air and sea freight, barrels, pallets and vehicles. Free quote from our Irving, Texas warehouse.',
    url: 'https://countycargo.com/shipping-from-usa-to-nigeria',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'County Cargo - Shipping from USA to Nigeria Air and Sea Freight',
      },
    ],
  },
};

const usaFaqs = [
  {
    question: 'How much does it cost to ship from the USA to Nigeria?',
    answer:
      'Standard air freight from our Irving, Texas warehouse starts at $5.00 per lb for Lagos and $5.50 per lb for other states including Abuja and Port Harcourt (minimum 1 lb), with customs clearance included. Sea freight shipping barrels start at $220 to $250 for a standard 55-gallon jumbo drum, and palletised cargo starts from $450 depending on cubic measurement.',
  },
  {
    question: 'How long does shipping from the USA to Nigeria take?',
    answer:
      'Air freight takes roughly 5–10 working days door-to-door from flight departure. Sea freight takes roughly 6 to 8 weeks from vessel departure at US port to customs clearance in Lagos (Apapa/Tin Can) and onward delivery.',
  },
  {
    question: 'Where is your US warehouse located for drop-offs?',
    answer:
      'Our US consolidation warehouse is located at 1234 N Belt Line Rd, Irving, TX 75061, United States. We accept commercial drop-offs, parcels from US online retailers (Amazon, Walmart, eBay, etc.), and arrange pick-ups across Texas and the greater US.',
  },
  {
    question: 'Do you handle Nigerian customs clearance for US cargo?',
    answer:
      'Yes. County Cargo handles all export customs documentation in the United States and complete Nigerian Customs Service (NCS) import clearance at Murtala Muhammed International Airport (LOS) and Lagos sea ports. Standard customs duty and clearance are included in our door-to-door quotes.',
  },
  {
    question: 'Can I ship vehicles, machinery, and commercial pallets from the USA?',
    answer:
      'Yes. We handle vehicle roll-on/roll-off (RoRo) and containerised vehicle shipping, industrial machinery, and palletised commercial cargo. Contact our Texas operations team for VIN-specific vehicle duties and customs clearance estimates.',
  },
  {
    question: 'What items are prohibited when shipping from the USA to Nigeria?',
    answer:
      'In compliance with US export controls and the Nigeria Customs Service prohibition list, prohibited items include firearms, ammunition, military gear, narcotics, hazardous chemicals, counterfeit items, uncertified pharmaceuticals, and certain restricted used automotive parts. Please check with our team before packing borderline items.',
  },
];

export default function ShippingFromUsaToNigeriaPage() {
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
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Freight Forwarding & Cargo Shipping from USA to Nigeria',
    provider: {
      '@type': 'LocalBusiness',
      name: 'County Cargo USA',
      image: 'https://countycargo.com/county-cargo-logo-transparent.png',
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
    areaServed: [
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'City', name: 'Lagos' },
      { '@type': 'City', name: 'Abuja' },
      { '@type': 'City', name: 'Port Harcourt' },
    ],
    description:
      'Door-to-door cargo shipping from the USA to Nigeria. Fast air freight (5-10 days) and economical sea freight (6-8 weeks) from our Irving, Texas warehouse.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '5.00',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '5.00',
        priceCurrency: 'USD',
        unitText: 'per pound (lbs)',
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: usaFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'County Cargo',
    alternateName: 'County Cargo Irving Texas Warehouse',
    url: 'https://countycargo.com/shipping-from-usa-to-nigeria',
    telephone: '+1-469-902-6900',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1234 N Belt Line Rd',
      addressLocality: 'Irving',
      addressRegion: 'TX',
      postalCode: '75061',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.8345,
      longitude: -96.9942,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={localBusinessSchema} />

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
                <li className="text-blue-400 font-medium">Shipping from USA to Nigeria</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-6 border border-blue-500/30">
                  <Warehouse className="w-4 h-4" /> Irving, Texas Warehouse Consolidation
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
                  Shipping from the USA to Nigeria
                </h1>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  Sending goods home from the States should not mean guessing. County Cargo runs cargo
                  from our Irving, Texas facility to Nigeria by both air and sea, and we handle the part
                  most people dread: the paperwork, the customs clearance, and getting your shipment
                  from the port to an actual address.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
                  We move barrels, boxes, pallets, furniture, electronics, building materials and
                  vehicles. If it needs to get to Nigeria and it is legal to send, we will tell you the
                  cheapest honest way to do it.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-blue-700 text-white font-semibold">
                    <a href="#quote-calculator">
                      Calculate Shipping Cost <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                    <a
                      href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20quote%20for%20shipping%20from%20the%20USA%20to%20Nigeria"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Quote
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-800 text-xs sm:text-sm">
                  <div>
                    <span className="block text-gray-400">Air Freight</span>
                    <span className="font-bold text-white text-base">5–10 Days</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Sea Freight</span>
                    <span className="font-bold text-white text-base">6–8 Weeks</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">US Warehouse</span>
                    <span className="font-bold text-white text-base">Irving, TX</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Customs</span>
                    <span className="font-bold text-emerald-400 text-base">Fully Cleared</span>
                  </div>
                </div>
              </div>

              {/* Quick Route Card / Destinations */}
              <div className="lg:col-span-5 bg-gray-800/80 p-6 sm:p-8 rounded-2xl border border-gray-700/60 shadow-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="text-primary h-5 w-5" /> Dedicated US Destination Routes
                </h3>
                <p className="text-sm text-gray-300 mb-6">
                  Select your specific destination in Nigeria for tailored airport schedules, sea port
                  routes, and localized door delivery rates:
                </p>
                <div className="space-y-3">
                  <Link
                    href="/shipping-from-usa-to-lagos"
                    className="flex items-center justify-between p-3.5 bg-gray-900/90 rounded-xl hover:bg-blue-900/40 border border-gray-700/40 transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-blue-300">
                        Shipping from USA to Lagos
                      </h4>
                      <p className="text-xs text-gray-400">
                        Apapa &amp; Tin Can Port, Murtala Muhammed Airport, Lagos Doorstep
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white shrink-0 ml-2" />
                  </Link>
                  <Link
                    href="/shipping-from-usa-to-abuja"
                    className="flex items-center justify-between p-3.5 bg-gray-900/90 rounded-xl hover:bg-blue-900/40 border border-gray-700/40 transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-blue-300">
                        Shipping from USA to Abuja (FCT)
                      </h4>
                      <p className="text-xs text-gray-400">
                        Direct air into ABV &amp; Overland haul from Lagos ports
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white shrink-0 ml-2" />
                  </Link>
                  <Link
                    href="/shipping-from-usa-to-port-harcourt"
                    className="flex items-center justify-between p-3.5 bg-gray-900/90 rounded-xl hover:bg-blue-900/40 border border-gray-700/40 transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-blue-300">
                        Shipping from USA to Port Harcourt
                      </h4>
                      <p className="text-xs text-gray-400">
                        Rivers State, Onne Port, Trans-Amadi, Door-to-Door Delivery
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white shrink-0 ml-2" />
                  </Link>
                  <Link
                    href="/blog/how-to-ship-from-usa-to-nigeria"
                    className="flex items-center justify-between p-3.5 bg-blue-950/60 rounded-xl hover:bg-blue-900/60 border border-blue-800/40 transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold text-blue-200 group-hover:text-white">
                        Complete 2026 US to Nigeria Guide
                      </h4>
                      <p className="text-xs text-blue-300/80">
                        Costs, timelines, customs rules, and insider tips
                      </p>
                    </div>
                    <FileText className="h-4 w-4 text-blue-300 group-hover:text-white shrink-0 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: What We Ship */}
        <section className="py-16 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">What We Ship</h2>
              <p className="text-gray-600 text-base">
                Whether you are an individual shopping US stores or a commercial importer sourcing
                industrial equipment, we accommodate all legal consignments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary mb-4">
                  <Package className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Personal Effects &amp; Household Goods
                </h3>
                <p className="text-sm text-gray-600">
                  Clothing, shoes, cosmetics, food items, kitchenware, luggage, and personal care
                  products safely consolidated and shipped.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary mb-4">
                  <Boxes className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Barrels and Drums</h3>
                <p className="text-sm text-gray-600">
                  Standard 55-gallon plastic or fibre shipping barrels. Packed with high-density goods,
                  sealed, and secured against rough ocean freight handling.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary mb-4">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Palletised Commercial Cargo</h3>
                <p className="text-sm text-gray-600">
                  Standard 48x40 pallets, shrink-wrapped with corner boards. Ideal for wholesale orders,
                  raw materials, and manufacturing supplies.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Electronics &amp; Fragile Items
                </h3>
                <p className="text-sm text-gray-600">
                  Laptops, phones, servers, medical equipment, and solar inverters professionally
                  crated with bubble wrap and tamper-evident packaging.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary mb-4">
                  <Car className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Vehicles and Machinery</h3>
                <p className="text-sm text-gray-600">
                  SUVs, sedans, industrial generators, agricultural machinery, and automotive spare
                  parts with complete documentation and port clearing.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary mb-4">
                  <Truck className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Business &amp; Wholesale Consignments
                </h3>
                <p className="text-sm text-gray-600">
                  Procurement assistance, supplier collection, and bulk freight forwarding directly to
                  warehouses across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Air Freight or Sea Freight? */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Air Freight or Sea Freight?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Air freight takes roughly <strong>5–10 working days</strong> and suits anything
                urgent, high-value or light. Sea freight takes roughly <strong>6 to 8 weeks</strong> and
                is the right answer for volume — furniture, building materials, anything heavy where the
                clock matters less than the cost.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mt-3">
                Most customers who ask for air freight actually want sea freight and do not know it yet.
                Call us before you book and we will run both numbers for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Air freight card */}
              <div className="border border-blue-200 bg-blue-50/50 rounded-2xl p-6 sm:p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Plane className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                    Fast &amp; Urgent
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">US to Nigeria Air Freight</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">$5.00</span>
                  <span className="text-gray-600 text-sm"> / lb to Lagos ($5.50/lb other states)</span>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Transit time:</strong> 5–10 working days door-to-door
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Minimum weight:</strong> 1 lb (0.45 kg)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Customs clearance:</strong> Included in per-lb rate
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Best for:</strong> Gadgets, urgent spares, documents, clothing boxes
                  </li>
                </ul>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <a href="#quote-calculator">Get Air Freight Quote</a>
                </Button>
              </div>

              {/* Sea freight card */}
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-6 sm:p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Ship className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Maximum Economy
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">US to Nigeria Sea Freight</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">From $220</span>
                  <span className="text-gray-600 text-sm"> / standard 55-gallon jumbo drum</span>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Transit time:</strong> 6–8 weeks vessel transit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Pricing model:</strong> By volume (CBM / barrels), not weight
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Customs clearance:</strong> Apapa &amp; Tin Can port clearing handled
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Best for:</strong> Household moves, barrels, commercial pallets, machinery
                  </li>
                </ul>
                <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                  <a
                    href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20a%20sea%20freight%20barrel%20quote%20from%20USA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inquire About Sea Freight
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: How It Works */}
        <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 text-base">
                Five simple, transparent steps from quote to doorstep delivery in Nigeria.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center relative">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Get a Quote</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Tell us what you are sending and where it is going. We provide honest upfront rates
                  with no hidden extras.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center relative">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Drop Off or Collect</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Drop off at our Irving warehouse, ship items directly from US stores to our facility,
                  or book a Texas collection.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center relative">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pack &amp; Secure</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  We pack, wrap and secure your cargo in-house. You receive item photos and verified
                  scale weights.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center relative">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  4
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Clear Customs</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  We handle all US export documentation and comprehensive Nigerian Customs Service
                  clearance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center relative">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  5
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Doorstep Delivery</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Delivery directly to the recipient’s address in Nigeria, or pick up free from our
                  Lagos or Abuja depots.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Why County Cargo */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Why County Cargo
                </h2>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  We are not a booking website or a faceless digital broker. We own and operate dedicated
                  receiving and packing facilities in <strong>Irving, Texas</strong> and{' '}
                  <strong>Liverpool &amp; London, UK</strong>. We pack your cargo ourselves, handle our
                  own container loading, and you speak to the same team from quote to delivery.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Physical Warehouses in USA &amp; UK</h4>
                      <p className="text-sm text-gray-600">
                        Drop off in person or ship online purchases with peace of mind. No third-party
                        middlemen handling your property.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">In-House Customs Clearance</h4>
                      <p className="text-sm text-gray-600">
                        Our licensed clearing teams at Lagos ports and airports ensure zero demurrage and
                        prompt inspection releases.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Full Door-to-Door Delivery</h4>
                      <p className="text-sm text-gray-600">
                        We don’t abandon cargo at Nigerian ports. Our local fleet delivers across Lagos,
                        Abuja, Port Harcourt, and 36 states.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facility & Contact Details */}
              <div className="lg:col-span-6 bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Warehouse className="h-5 w-5 text-primary" /> Irving, Texas Operations Hub
                </h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <strong className="block text-gray-900 mb-1">Warehouse Address:</strong>
                    <p className="text-gray-600">1234 N Belt Line Rd, Irving, TX 75061, United States</p>
                    <p className="text-xs text-gray-500 mt-1">Open Monday–Friday: 9:00 AM – 5:00 PM</p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <strong className="block text-gray-900 mb-1">US Operations Phone:</strong>
                    <a href="tel:+14699026900" className="text-primary hover:underline font-medium">
                      +1 (469) 902-6900
                    </a>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <strong className="block text-gray-900 mb-1">WhatsApp Customer Service:</strong>
                    <a
                      href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20assistance%20shipping%20from%20USA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-medium flex items-center gap-1.5"
                    >
                      +234 811 000 0421 (Instant WhatsApp Support)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Calculator Section */}
        <section id="quote-calculator" className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Calculate Shipping from USA to Nigeria
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Enter your origin US city, Nigerian destination, package weight and dimensions to get an
                immediate freight estimate.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <UsNigeriaQuoteForm />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" /> Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-base">
                Straight answers about shipping costs, timelines, customs rules, and depot drop-offs.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {usaFaqs.map((faq, index) => (
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

        {/* Call to Action Bar */}
        <section className="bg-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Ready to Ship Your Goods from the USA to Nigeria?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-base">
              Get a free quote today. Call our Texas team at{' '}
              <a href="tel:+14699026900" className="underline font-bold">
                +1 (469) 902-6900
              </a>{' '}
              or message us on WhatsApp for rapid, professional booking.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold">
                <a href="tel:+14699026900">
                  <Phone className="mr-2 h-4 w-4" /> Call US Warehouse
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-800 font-bold"
              >
                <a
                  href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20free%20quote%20for%20shipping%20from%20the%20USA%20to%20Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
