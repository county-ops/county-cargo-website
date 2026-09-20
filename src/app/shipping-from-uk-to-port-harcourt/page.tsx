import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import { ShippingCalculator } from '@/components/shipping-calculator';
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
  title: 'Shipping from UK to Port Harcourt | Air & Sea Freight | County Cargo',
  description:
    'Ship cargo from the UK to Port Harcourt & Rivers State. Air freight from £7.50/kg, sea barrels from £230. Direct door-to-door delivery and customs handled.',
  keywords:
    'shipping from UK to Port Harcourt, cargo from UK to Port Harcourt, UK to Port Harcourt freight, send parcels to Port Harcourt, air freight Port Harcourt Nigeria, London to Port Harcourt cargo, Rivers State cargo shipping',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-uk-to-port-harcourt',
  },
  openGraph: {
    title: 'Shipping from UK to Port Harcourt | Air & Sea Freight | County Cargo',
    description:
      'Ship cargo from the UK to Port Harcourt & Rivers State. Air freight from £7.50/kg, sea barrels from £230. Direct door-to-door delivery and customs handled.',
    url: 'https://countycargo.com/shipping-from-uk-to-port-harcourt',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'County Cargo - Shipping from UK to Port Harcourt Air and Sea Cargo',
      },
    ],
  },
};

const phFaqs = [
  {
    question: 'How much does it cost to ship cargo from the UK to Port Harcourt?',
    answer:
      'Standard air cargo to Port Harcourt is priced from £7.50 per kg plus a £15 handling fee per consignment, which includes Nigerian customs clearance and bonded delivery to Rivers State. Sea freight shipping barrels start at £230 for a 55-gallon jumbo drum, covering port handling and doorstep delivery.',
  },
  {
    question: 'How long does shipping from the UK to Port Harcourt take?',
    answer:
      'Air cargo arrives in Port Harcourt within 5–10 working days following our weekly Wednesday consolidation cut-off. Sea freight takes approximately 6 to 8 weeks from vessel departure to clearance at port and final delivery to Port Harcourt addresses.',
  },
  {
    question: 'Where can I drop off my cargo in the UK?',
    answer:
      'You can drop off at our London Charlton Depot: New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF, or our Liverpool Depot: Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG. We also offer 100% FREE London collection for 30kg+ consignments.',
  },
  {
    question: 'Do you deliver to my doorstep anywhere in Port Harcourt and Rivers State?',
    answer:
      'Yes. We operate direct doorstep deliveries across Port Harcourt (Old GRA, New GRA, Peter Odili, Trans-Amadi, Woji, Rumuola, Rumuokoro, D-Line, Diobu, Ada George, Choba) as well as neighbouring industrial hubs including Elelenwo, Oyigbo, and Onne.',
  },
  {
    question: 'How are customs duties handled for shipments to Port Harcourt?',
    answer:
      'County Cargo handles both UK export customs declaration and complete Nigerian Customs Service (NCS) import documentation. Standard personal effects, household goods, and commercial equipment are cleared by our licensed team with zero demurrage surprises.',
  },
];

const phDistricts = [
  'Old GRA',
  'New GRA (Phases 1–4)',
  'Peter Odili Road',
  'Trans-Amadi Industrial Layout',
  'Woji Estate',
  'Rumuola & Stadium Road',
  'Rumuokoro',
  'D-Line',
  'Diobu (Mile 1–3)',
  'Ada George Road',
  'Choba & Uniport Axis',
  'Onne & Eleme Corridor',
];

export default function ShippingFromUkToPortHarcourtPage() {
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
        name: 'Shipping from UK to Nigeria',
        item: 'https://countycargo.com/shipping-from-uk-to-nigeria',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Port Harcourt',
        item: 'https://countycargo.com/shipping-from-uk-to-port-harcourt',
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cargo Shipping from UK to Port Harcourt',
    provider: {
      '@type': 'LocalBusiness',
      name: 'County Cargo UK',
      telephone: '+44 7405 556668',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'New Lydenburg Commercial Estate, Charlton',
        addressLocality: 'London',
        postalCode: 'SE7 8NF',
        addressCountry: 'GB',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Port Harcourt',
    },
    description:
      'Ship cargo from the UK to Port Harcourt & Rivers State. Air freight from £7.50/kg, sea barrels from £230. Direct door-to-door delivery with full customs clearance.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: phFaqs.map((faq) => ({
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
                  <Link href="/shipping-from-uk-to-nigeria" className="hover:text-white transition-colors">
                    Shipping from UK to Nigeria
                  </Link>
                </li>
                <li>/</li>
                <li className="text-blue-400 font-medium">Port Harcourt</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-6 border border-blue-500/30">
                  <MapPin className="w-4 h-4" /> Port Harcourt &bull; Rivers State Door-to-Door Delivery
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
                  Shipping from the UK to Port Harcourt
                </h1>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  Reliable air freight and sea cargo services directly connecting the United Kingdom
                  to Port Harcourt and across Rivers State. Whether sending personal effects to family in
                  GRA, industrial parts to Trans-Amadi, or commercial shipments to Onne, County Cargo
                  provides verified transit times, transparent rates, and total customs clearance.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-blue-700 text-white font-semibold">
                    <a href="#calculator">
                      Calculate UK to PH Cost <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                    <a
                      href="https://wa.me/447405556668?text=Hello%20County%20Cargo%2C%20I%20need%20a%20quote%20for%20shipping%20from%20UK%20to%20Port%20Harcourt"
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
                    <span className="block text-gray-400">Sea Barrels</span>
                    <span className="font-bold text-white text-base">6–8 Weeks</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Air Rate</span>
                    <span className="font-bold text-white text-base">From £7.50/kg</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">London Pickup</span>
                    <span className="font-bold text-emerald-400 text-base">Free (30kg+)</span>
                  </div>
                </div>
              </div>

              {/* UK Depot Details Card */}
              <div className="lg:col-span-5 bg-gray-800/80 p-6 sm:p-8 rounded-2xl border border-gray-700/60 shadow-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Warehouse className="text-primary h-5 w-5" /> UK Depots &amp; Drop-Off Hubs
                </h3>
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="p-3 bg-gray-900/90 rounded-xl border border-gray-700/40">
                    <span className="font-semibold text-white block mb-1">London Charlton Depot:</span>
                    <p className="text-xs text-gray-400">
                      New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF
                    </p>
                    <p className="text-xs text-blue-300 mt-1">Open Mon–Fri 9am–5pm, Sat 10am–2pm</p>
                  </div>
                  <div className="p-3 bg-gray-900/90 rounded-xl border border-gray-700/40">
                    <span className="font-semibold text-white block mb-1">Liverpool Receiving Depot:</span>
                    <p className="text-xs text-gray-400">
                      Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG
                    </p>
                    <p className="text-xs text-blue-300 mt-1">Serving North West &amp; Greater Manchester</p>
                  </div>
                  <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-800/40">
                    <span className="font-semibold text-blue-200 block mb-1">Free London Collection:</span>
                    <p className="text-xs text-blue-300/80">
                      100% free doorstep pickup across London for consignments of 30kg and above.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Air Freight & Sea Freight Rates */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Air Freight or Sea Freight to Port Harcourt?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Depending on your shipment size and urgency, choose between fast scheduled air cargo or
                cost-effective ocean freight.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 sm:p-8 bg-blue-50/50 rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Plane className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase">
                    Weekly Air Cargo
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">UK to Port Harcourt Air Freight</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">£7.50</span>
                  <span className="text-gray-600 text-sm"> / kg (+ £15 handling per consignment)</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Transit Time:</strong> 5–10 working days door-to-door
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Cut-Off:</strong> Every Wednesday at 5:00 PM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Customs:</strong> Full clearance included in the per-kg tariff
                  </li>
                </ul>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <a href="#calculator">Calculate Air Freight</a>
                </Button>
              </div>

              <div className="p-6 sm:p-8 bg-emerald-50/50 rounded-2xl border border-emerald-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                    <Ship className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                    Sea Freight Barrels
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sea Freight Barrels &amp; Pallets</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">From £230</span>
                  <span className="text-gray-600 text-sm"> / 55-gallon jumbo drum to Port Harcourt</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Transit Time:</strong> 6–8 weeks vessel sailing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Customs &amp; Duty:</strong> Complete port clearing handled
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Heavy Cargo:</strong> Pallets, furniture, and commercial machinery
                  </li>
                </ul>
                <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                  <a
                    href="https://wa.me/447405556668?text=Hello%20County%20Cargo%2C%20I%20need%20a%20sea%20barrel%20quote%20to%20Port%20Harcourt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inquire on Sea Barrels
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Delivery Coverage in Port Harcourt */}
        <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Doorstep Delivery Across Port Harcourt &amp; Rivers State
              </h2>
              <p className="text-gray-700 text-base">
                Our local Rivers State dispatch vehicles deliver directly to residential addresses,
                commercial plazas, and industrial bases:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {phDistricts.map((district) => (
                <div
                  key={district}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-gray-800">{district}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Shipping Calculator */}
        <section id="calculator" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Calculate UK to Port Harcourt Shipping Cost
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Use our interactive calculator to compare air and sea options for your consignment.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <ShippingCalculator />
            </div>
          </div>
        </section>

        {/* Section: FAQs */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" /> Questions About UK to Port Harcourt Cargo
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {phFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-gray-200 rounded-xl px-5 py-2 shadow-sm bg-white"
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

        {/* Related Routes */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
              Explore Related UK &amp; Nigeria Cargo Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/shipping-from-uk-to-lagos"
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">UK to Lagos Cargo</span>
                <span className="text-xs text-gray-500">From £6.00/kg + £15 handling</span>
              </Link>
              <Link
                href="/shipping-from-uk-to-abuja"
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">UK to Abuja Cargo</span>
                <span className="text-xs text-gray-500">Direct flight into Nnamdi Azikiwe Airport</span>
              </Link>
              <Link
                href="/shipping-from-usa-to-port-harcourt"
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">USA to Port Harcourt Cargo</span>
                <span className="text-xs text-gray-500">From Irving TX warehouse: $5.80/lb</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
