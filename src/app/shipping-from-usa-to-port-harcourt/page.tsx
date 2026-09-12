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
  title: 'Shipping from USA to Port Harcourt | Air & Sea Cargo | County Cargo',
  description:
    'Door-to-door cargo shipping from the USA to Port Harcourt and Rivers State. Air freight from $5.80/lb, sea barrels and pallets. Full customs clearance.',
  keywords:
    'shipping from USA to Port Harcourt, cargo to Port Harcourt from USA, USA to Rivers State shipping, send goods to Port Harcourt from Texas, Irving to Port Harcourt cargo, air freight Port Harcourt Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-usa-to-port-harcourt',
  },
  openGraph: {
    title: 'Shipping from USA to Port Harcourt | Air & Sea Cargo | County Cargo',
    description:
      'Door-to-door cargo shipping from the USA to Port Harcourt and Rivers State. Air freight from $5.80/lb, sea barrels and pallets. Full customs clearance.',
    url: 'https://countycargo.com/shipping-from-usa-to-port-harcourt',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'County Cargo - Shipping from USA to Port Harcourt Door to Door',
      },
    ],
  },
};

const phUsaFaqs = [
  {
    question: 'How much does it cost to ship cargo from the USA to Port Harcourt?',
    answer:
      'Air freight from our Irving, Texas warehouse to Port Harcourt is priced at $5.80 per lb (minimum 5 lbs), including complete Nigerian customs clearance and bonded delivery to Rivers State. Sea freight shipping barrels start at $260 for a 55-gallon jumbo drum, covering ocean transit, port documentation, and delivery to Port Harcourt.',
  },
  {
    question: 'How long does shipping from the USA to Port Harcourt take?',
    answer:
      'Air freight delivers within 5 to 10 working days from flight departure. Sea freight takes approximately 7 to 9 weeks (6 to 8 weeks ocean sailing plus port discharge and line-haul forwarding to Port Harcourt).',
  },
  {
    question: 'Where can I drop off goods in the US or ship online orders?',
    answer:
      'You can deliver cargo in person or have online retailers (Amazon, Walmart, eBay, Best Buy, etc.) deliver directly to our Irving consolidation facility: 1234 N Belt Line Rd, Irving, TX 75061, United States. We inspect, pack, and send you confirmation photos.',
  },
  {
    question: 'Which areas in Port Harcourt and Rivers State do you deliver to?',
    answer:
      'We provide door-to-door delivery across Port Harcourt including Old GRA, New GRA, Peter Odili Road, Trans-Amadi Industrial Layout, Woji, Rumuola, Rumuokoro, D-Line, Diobu, Ada George, Choba, as well as industrial zones in Onne, Elelenwo, and Oyigbo.',
  },
  {
    question: 'Do you handle commercial industrial machinery and oilfield parts for Port Harcourt?',
    answer:
      'Yes. We frequently forward equipment, spare parts, solar panels, and commercial pallets to industrial and energy firms operating in Trans-Amadi and the Onne Oil & Gas Free Zone with full customs paperwork.',
  },
];

const phDistricts = [
  'Old GRA',
  'New GRA',
  'Peter Odili Road',
  'Trans-Amadi Layout',
  'Woji',
  'Rumuokoro & Rumuola',
  'D-Line & Diobu',
  'Ada George Road',
  'Choba & Uniport Axis',
  'Onne Free Zone',
  'Elelenwo',
  'Oyigbo',
];

export default function ShippingFromUsaToPortHarcourtPage() {
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
        name: 'Port Harcourt',
        item: 'https://countycargo.com/shipping-from-usa-to-port-harcourt',
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cargo Shipping from USA to Port Harcourt Rivers State',
    provider: {
      '@type': 'LocalBusiness',
      name: 'County Cargo USA',
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
      name: 'Port Harcourt',
    },
    description:
      'Door-to-door cargo shipping from the USA to Port Harcourt and Rivers State. Air freight from $5.80/lb, sea barrels and pallets with full customs clearance.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: phUsaFaqs.map((faq) => ({
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
                <li className="text-blue-400 font-medium">Port Harcourt</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-6 border border-blue-500/30">
                  <Warehouse className="w-4 h-4" /> Irving, Texas to Rivers State Direct Pipeline
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
                  Shipping from the USA to Port Harcourt
                </h1>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  Direct, professional air and sea freight from our Irving, Texas warehouse to Port
                  Harcourt and throughout Rivers State. We take care of ocean container loading, airline
                  cargo bookings, Nigerian customs clearance, and final delivery to your doorstep in
                  Port Harcourt.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-blue-700 text-white font-semibold">
                    <a href="#quote-calculator">
                      Get Port Harcourt Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                    <a
                      href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20quote%20for%20shipping%20from%20the%20USA%20to%20Port%20Harcourt"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Quote
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-800 text-xs sm:text-sm">
                  <div>
                    <span className="block text-gray-400">Air to PH</span>
                    <span className="font-bold text-white text-base">5–10 Days</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Sea to PH</span>
                    <span className="font-bold text-white text-base">7–9 Weeks</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Air Rate</span>
                    <span className="font-bold text-white text-base">$5.80 / lb</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Sea Barrels</span>
                    <span className="font-bold text-emerald-400 text-base">From $260</span>
                  </div>
                </div>
              </div>

              {/* Texas to PH Hub Card */}
              <div className="lg:col-span-5 bg-gray-800/80 p-6 sm:p-8 rounded-2xl border border-gray-700/60 shadow-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Warehouse className="text-primary h-5 w-5" /> Texas Warehouse &amp; PH Coverage
                </h3>
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="p-3 bg-gray-900/90 rounded-xl border border-gray-700/40">
                    <span className="font-semibold text-white block mb-1">Texas Dispatch Facility:</span>
                    <p className="text-xs text-gray-400">
                      1234 N Belt Line Rd, Irving, TX 75061, United States
                    </p>
                    <p className="text-xs text-blue-300 mt-1">Tel: +1 (469) 902-6900</p>
                  </div>
                  <div className="p-3 bg-gray-900/90 rounded-xl border border-gray-700/40">
                    <span className="font-semibold text-white block mb-1">Port Harcourt Delivery Service:</span>
                    <p className="text-xs text-gray-400">
                      Direct doorstep delivery to homes, corporate offices, and oilfield sites in Rivers
                      State.
                    </p>
                    <span className="text-xs text-emerald-400 block mt-1">
                      ✓ Customs duty &amp; clearance included
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Air & Sea Options */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Air Freight or Sea Freight to Port Harcourt?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Choose the freight mode that fits your delivery timeline and budget. We provide clear
                upfront pricing with no surprise clearing fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 sm:p-8 bg-blue-50/50 rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Plane className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase">
                    Air Cargo
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">US to Port Harcourt Air Freight</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">$5.80</span>
                  <span className="text-gray-600 text-sm"> / lb (min 5 lbs, customs included)</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Transit Time:</strong> 5–10 working days
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Customs:</strong> Complete airport clearing handled
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Ideal for:</strong> Electronics, urgent documents, parts, retail parcels
                  </li>
                </ul>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <a href="#quote-calculator">Get Air Quote</a>
                </Button>
              </div>

              <div className="p-6 sm:p-8 bg-emerald-50/50 rounded-2xl border border-emerald-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                    <Ship className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                    Sea Freight
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sea Barrels &amp; Pallets</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">From $260</span>
                  <span className="text-gray-600 text-sm"> / 55-gallon drum to Port Harcourt</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Transit Time:</strong> 7–9 weeks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Port Clearing:</strong> Port clearance &amp; Rivers State haulage included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Ideal for:</strong> Drums of personal goods, furniture, pallets, equipment
                  </li>
                </ul>
                <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                  <a
                    href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20sea%20barrel%20quote%20to%20Port%20Harcourt%20from%20USA"
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

        {/* Section: Delivery Areas */}
        <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Rivers State Doorstep Delivery Locations
              </h2>
              <p className="text-gray-700 text-base">
                We deliver directly to your recipient across Port Harcourt and surrounding industrial
                hubs:
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

        {/* Calculator Section */}
        <section id="quote-calculator" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Calculate USA to Port Harcourt Shipping Cost
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Instant quotes based on package weight and dimensions from any US city.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <UsNigeriaQuoteForm />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" /> Frequently Asked Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {phUsaFaqs.map((faq, index) => (
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
              Explore Related Cargo Routes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/shipping-from-usa-to-lagos"
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">USA to Lagos</span>
                <span className="text-xs text-gray-500">From $5.00/lb &amp; sea barrels from $220</span>
              </Link>
              <Link
                href="/shipping-from-usa-to-abuja"
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">USA to Abuja</span>
                <span className="text-xs text-gray-500">Direct flight into Nnamdi Azikiwe Airport</span>
              </Link>
              <Link
                href="/shipping-from-uk-to-port-harcourt"
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">UK to Port Harcourt Cargo</span>
                <span className="text-xs text-gray-500">From London &amp; Liverpool: £7.50/kg</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
