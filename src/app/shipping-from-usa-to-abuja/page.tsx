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
  title: 'Shipping from USA to Abuja | Air & Sea Cargo | County Cargo',
  description:
    'Reliable cargo shipping from the USA to Abuja. Air freight direct, sea freight via Lagos, full customs clearance and door delivery in the FCT.',
  keywords:
    'shipping from USA to Abuja, cargo to Abuja from USA, freight to Abuja Nigeria, send goods to Abuja, air cargo to Nnamdi Azikiwe Airport, FCT Abuja door delivery, USA to Abuja shipping rate',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-usa-to-abuja',
  },
  openGraph: {
    title: 'Shipping from USA to Abuja | Air & Sea Cargo | County Cargo',
    description:
      'Reliable cargo shipping from the USA to Abuja. Air freight direct, sea freight via Lagos, full customs clearance and door delivery in the FCT.',
    url: 'https://countycargo.com/shipping-from-usa-to-abuja',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'County Cargo - Shipping from USA to Abuja Air and Sea Cargo',
      },
    ],
  },
};

const abujaFaqs = [
  {
    question: 'How much does it cost to ship from the USA to Abuja?',
    answer:
      'Direct air cargo to Abuja is priced at $5.50 per lb (minimum 1 lb), including customs clearance at Nnamdi Azikiwe International Airport. Sea freight barrels to Abuja start at $250 per 55-gallon jumbo drum, covering sea freight to Lagos, customs clearance, and secure bonded overland line-haul to the FCT.',
  },
  {
    question: 'Should I choose air freight or sea freight to Abuja?',
    answer:
      'If you are sending one or two barrels, lightweight boxes, electronics, or urgent goods, air freight is the smarter choice — it flies directly to Abuja in 5–10 working days without the expense of an overland transit leg. If you are shipping complete house moves, bulky furniture, industrial machinery, or commercial pallets (over 2 to 3 CBM), sea freight via Lagos still wins comfortably on overall price.',
  },
  {
    question: 'How long does shipping to Abuja take from the USA?',
    answer:
      'Direct air cargo reaches Abuja within 5–10 working days. Sea freight lands at Lagos (Apapa/Tin Can) within 6 to 8 weeks, clears customs, and then travels overland by dedicated cargo truck to Abuja, which adds roughly 3 to 5 working days.',
  },
  {
    question: 'Where can I collect my cargo in Abuja, or do you deliver to my home?',
    answer:
      'We provide complete doorstep delivery across the entire Federal Capital Territory (FCT). You can also opt for self-collection at our Abuja branch: Shop HF426, Turai Yar\'adua Block, Wuye Ultra Modern Market, Abuja-FCT.',
  },
  {
    question: 'Which districts in Abuja and the FCT do you deliver to?',
    answer:
      'We deliver to Garki, Wuse 1 & 2, Maitama, Asokoro, Gwarinpa, Jabi, Utako, Lugbe, Kubwa, Karu, Guzape, Life Camp, Apo, Lokogoma, and satellite towns throughout the FCT.',
  },
];

const fctDistricts = [
  'Garki (Area 1–11)',
  'Wuse 1 & Wuse 2',
  'Maitama',
  'Asokoro',
  'Gwarinpa Estate',
  'Jabi & Utako',
  'Lugbe & Airport Road',
  'Kubwa',
  'Karu & Nyanya',
  'Guzape & Apo',
  'Life Camp & Kado',
  'Lokogoma & Galadimawa',
];

export default function ShippingFromUsaToAbujaPage() {
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
        name: 'Shipping from USA to Abuja',
        item: 'https://countycargo.com/shipping-from-usa-to-abuja',
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cargo Shipping from USA to Abuja FCT',
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
      name: 'Abuja',
    },
    description:
      'Reliable cargo shipping from the USA to Abuja. Direct air freight and economical sea freight via Lagos with door-to-door delivery across the FCT.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: abujaFaqs.map((faq) => ({
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
                <li className="text-blue-400 font-medium">Abuja</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-6 border border-blue-500/30">
                  <Plane className="w-4 h-4" /> Nnamdi Azikiwe Airport (ABV) • FCT Doorstep Delivery
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
                  Shipping from the USA to Abuja
                </h1>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  Abuja is straightforward by air and needs a little more planning by sea. Air cargo
                  flies into Nnamdi Azikiwe International and clears there. Sea freight lands at Lagos
                  and moves overland to the FCT, which adds roughly 3 to 5 days (~750 km) — worth it on
                  anything heavy, not worth it on a single box.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-blue-700 text-white font-semibold">
                    <a href="#quote-calculator">
                      Get Abuja Shipping Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                    <a
                      href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20quote%20for%20shipping%20from%20the%20USA%20to%20Abuja"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Quote
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-800 text-xs sm:text-sm">
                  <div>
                    <span className="block text-gray-400">Direct Air (ABV)</span>
                    <span className="font-bold text-white text-base">5–10 Days</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Sea + Overland</span>
                    <span className="font-bold text-white text-base">7–9 Weeks</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Air Rate</span>
                    <span className="font-bold text-white text-base">$5.50 / lb</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Customs</span>
                    <span className="font-bold text-emerald-400 text-base">Cleared at ABV</span>
                  </div>
                </div>
              </div>

              {/* Abuja Hub Card */}
              <div className="lg:col-span-5 bg-gray-800/80 p-6 sm:p-8 rounded-2xl border border-gray-700/60 shadow-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Warehouse className="text-primary h-5 w-5" /> Abuja Branch &amp; Hub Details
                </h3>
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="p-3 bg-gray-900/90 rounded-xl border border-gray-700/40">
                    <span className="font-semibold text-white block mb-1">Abuja Collection Office:</span>
                    <p className="text-xs text-gray-400">
                      Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, Abuja-FCT.
                    </p>
                    <span className="text-xs text-emerald-400 block mt-1">
                      ✓ Free local collection or doorstep FCT delivery
                    </span>
                  </div>
                  <div className="p-3 bg-gray-900/90 rounded-xl border border-gray-700/40">
                    <span className="font-semibold text-white block mb-1">Texas Dispatch Facility:</span>
                    <p className="text-xs text-gray-400">
                      1234 N Belt Line Rd, Irving, TX 75061, United States.
                    </p>
                    <p className="text-xs text-blue-300 mt-1">Direct Line: +1 (469) 902-6900</p>
                  </div>
                  <Link
                    href="/blog/shipping-to-abuja-from-usa"
                    className="flex items-center justify-between p-3.5 bg-blue-950/60 rounded-xl hover:bg-blue-900/60 border border-blue-800/40 transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold text-blue-200 group-hover:text-white">
                        Abuja Freight Strategy Guide
                      </h4>
                      <p className="text-xs text-blue-300/80">
                        Why air freight direct often beats the sea + overland route
                      </p>
                    </div>
                    <FileText className="h-4 w-4 text-blue-300 group-hover:text-white shrink-0 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Air or Sea to Abuja? */}
        <section className="py-16 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Air or Sea to Abuja?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                If you are sending one or two barrels, fly it. The overland leg from Lagos eats most of
                the saving. If you are sending furniture, equipment or a full pallet, sea freight still
                wins comfortably.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mt-3">
                We will tell you which one applies to your shipment before you pay, not after.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Plane className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase">
                    Recommended for &lt; 2 CBM
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Air Freight to Abuja</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">$5.50</span>
                  <span className="text-gray-600 text-sm"> / lb (customs included)</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Transit:</strong> 5–10 working days
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Airport:</strong> Lands directly at Nnamdi Azikiwe International (ABV)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <strong>Advantage:</strong> No Lagos port congestion, no interstate road transit
                  </li>
                </ul>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <a href="#quote-calculator">Quote Abuja Air Freight</a>
                </Button>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-emerald-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Ship className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                    Best for Bulk Pallets &amp; Volume
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sea Freight via Lagos + Trucking</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">From $250</span>
                  <span className="text-gray-600 text-sm"> / barrel (including haulage to Abuja)</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Transit:</strong> 7–9 weeks (6–8 weeks sea + 3–5 days road haul)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Route:</strong> Irving TX &rarr; Apapa/Tin Can Port &rarr; Abuja Depot
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <strong>Advantage:</strong> Much cheaper for entire house moves &amp; heavy cargo
                  </li>
                </ul>
                <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                  <a
                    href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20sea%20freight%20quote%20to%20Abuja"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inquire on Abuja Sea Freight
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Delivery Areas in the FCT */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Delivery Areas in the FCT
              </h2>
              <p className="text-gray-700 text-base">
                We deliver to residences, corporate embassies, government institutions, and commercial
                establishments across the Federal Capital Territory:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {fctDistricts.map((district) => (
                <div
                  key={district}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-gray-800">{district}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="quote-calculator" className="py-16 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Calculate Shipping Cost to Abuja
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Get an instant estimate for shipping parcels, cartons, or commercial consignments from
                the USA to Abuja.
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
                <HelpCircle className="h-6 w-6 text-primary" /> Questions About Shipping to Abuja
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {abujaFaqs.map((faq, index) => (
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

        {/* Sister Route Links */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
              Explore Related Cargo Routes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/shipping-from-usa-to-lagos"
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">USA to Lagos</span>
                <span className="text-xs text-gray-500">Air freight $5.00/lb &amp; sea barrels from $220</span>
              </Link>
              <Link
                href="/shipping-from-usa-to-port-harcourt"
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">USA to Port Harcourt</span>
                <span className="text-xs text-gray-500">Rivers State direct door-to-door cargo</span>
              </Link>
              <Link
                href="/shipping-from-usa-to-nigeria"
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <span className="font-semibold text-gray-900 block mb-1">USA to Nigeria Hub</span>
                <span className="text-xs text-gray-500">Irving TX warehouse consolidation</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
