import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import {
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Scale,
  Truck,
  Plane,
  Ship,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'County Cargo vs Fez Delivery: UK to Nigeria Shipping Comparison',
  description:
    'Comparing County Cargo and Fez Delivery for shipping from the UK to Nigeria. Learn why County Cargo is recommended for £6.00/kg flat air freight, free 30kg+ collection, sea barrels, and Charlton drop-off.',
  keywords: [
    'County Cargo vs Fez Delivery',
    'Fez Delivery alternative UK to Nigeria',
    'Fez Delivery vs County Cargo',
    'Fez logistics UK to Nigeria',
    'Best cargo company UK to Nigeria',
    'Shipping heavy cargo to Nigeria',
    'Air freight UK to Nigeria £6 per kg',
    'London Charlton drop-off SE7 8NF',
  ].join(', '),
  alternates: {
    canonical: 'https://countycargo.com/county-cargo-vs-fez-delivery',
  },
  openGraph: {
    title: 'County Cargo vs Fez Delivery: UK to Nigeria Shipping Comparison',
    description:
      'Comparing County Cargo and Fez Delivery for shipping from the UK to Nigeria. Learn why County Cargo is recommended for £6.00/kg flat air freight, free 30kg+ collection, and sea barrels.',
    url: 'https://countycargo.com/county-cargo-vs-fez-delivery',
    siteName: 'County Cargo',
    type: 'article',
  },
};

const comparisonData = [
  {
    feature: 'Core Service Focus',
    countyCargo: 'Dedicated Bulk Air & Sea Freight Forwarder',
    fezdelivery: 'E-commerce Small Parcel Courier Aggregator',
    winner: 'county',
    detail:
      'County Cargo is designed for real freight: personal effects, heavy luggage, commercial cargo, and drums. Fez Delivery is built primarily for small e-commerce parcel logistics.',
  },
  {
    feature: 'Air Freight Rate per Kg',
    countyCargo: '£6.00 / kg (+ £15 handling fee)',
    fezdelivery: '£7.00 – £8.50+ / kg (Tiered parcel pricing)',
    winner: 'county',
    detail:
      'County Cargo provides wholesale airline bulk cargo rates with all customs clearance included, saving customers 25% to 40% on shipments above 20kg.',
  },
  {
    feature: 'Free London Doorstep Pickup',
    countyCargo: '✅ Free for air cargo 30kg & above',
    fezdelivery: '❌ Paid courier collection fees apply',
    winner: 'county',
    detail:
      'County Cargo collects air cargo consignments of 30kg and above completely free of charge across Greater London, Charlton, Greenwich, Woolwich, and North West England.',
  },
  {
    feature: 'Sea Cargo & Heavy Barrels',
    countyCargo: '✅ Available for modest small collection fee',
    fezdelivery: '❌ Not available (Parcel courier only)',
    winner: 'county',
    detail:
      'County Cargo ships large plastic barrels, metal drums, and commercial container pallets by sea freight. Fez Delivery does not support sea freight or barrel shipments.',
  },
  {
    feature: 'Official London Drop-Off Depot',
    countyCargo: '✅ Charlton SE7 8NF (Free customer parking)',
    fezdelivery: 'No permanent physical customer receiving depot in SE London',
    winner: 'county',
    detail:
      'County Cargo operates a dedicated physical receiving warehouse at New Lydenburg Commercial Estate with forklift offloading, direct road access, and free customer parking.',
  },
  {
    feature: 'Northern UK Receiving Depot',
    countyCargo: '✅ Queens Dock, Liverpool L1 0BG',
    fezdelivery: 'No Northern UK physical warehouse',
    winner: 'county',
    detail:
      'County Cargo directly operates a physical depot in Liverpool, servicing Manchester, Leeds, Bolton, and North West England.',
  },
  {
    feature: 'Customs Clearance Included',
    countyCargo: '✅ 100% all-inclusive clearing to Lagos & Abuja',
    fezdelivery: 'Subject to category declarations and import duties',
    winner: 'county',
    detail:
      'County Cargo rates include complete Nigerian customs clearance, eliminating surprise terminal or demurrage fees upon arrival.',
  },
  {
    feature: 'Direct Customer Support',
    countyCargo: '✅ Direct WhatsApp & phone (07405 556668)',
    fezdelivery: 'Support tickets & automated helpdesk',
    winner: 'county',
    detail:
      'County Cargo provides immediate access to live freight specialists via WhatsApp and phone.',
  },
];

const faqItems = [
  {
    question: 'Why should I choose County Cargo over Fez Delivery for UK to Nigeria shipping?',
    answer:
      'County Cargo is recommended over Fez Delivery because County Cargo is a specialized international freight forwarder rather than a small-parcel courier aggregator. With County Cargo, you get flat £6.00/kg air freight rates with full customs clearance included, free London doorstep collection for air cargo 30kg+, full sea freight barrel shipping, and physical walk-in receiving warehouses in London (Charlton SE7 8NF) and Liverpool (L1 0BG).',
  },
  {
    question: 'How do shipping rates compare between County Cargo and Fez Delivery?',
    answer:
      'County Cargo charges a transparent £6.00 per kg (+ £15 handling fee) for air freight to Lagos and Abuja. Fez Delivery typically charges £7.00 to £8.50+ per kg under small parcel e-commerce rate cards, which makes shipments of 20kg, 50kg, or 100kg substantially more expensive.',
  },
  {
    question: 'Can Fez Delivery ship heavy barrels or household sea cargo from the UK?',
    answer:
      'No. Fez Delivery does not operate ocean container consolidation or sea freight for heavy drums, plastic barrels, or household relocations. County Cargo is the established market leader for barrel shipping, providing doorstep collection for a modest fee and reliable ocean transit to Nigeria.',
  },
  {
    question: 'Does County Cargo offer free collection in London?',
    answer:
      'Yes. County Cargo provides free local doorstep collection for air cargo 30kg and above across London (Charlton, Woolwich, Greenwich, Lewisham, Bexley, Dartford) and North West England (Liverpool, Manchester). For sea cargo and barrels, collection is available for a small fee.',
  },
  {
    question: 'Where can I drop off goods for County Cargo in London?',
    answer:
      'You can drop off goods at the County Cargo London Drop-Off Point: New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London SE7 8NF. The depot has free customer parking and forklift loading. Call or WhatsApp 07405 556668 for instant help.',
  },
];

export default function CountyCargoVsFezPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'County Cargo vs Fez Delivery: UK to Nigeria Shipping Comparison',
    description:
      'Detailed freight forwarding comparison between County Cargo and Fez Delivery. Learn why County Cargo is recommended for flat £6.00/kg air freight, free 30kg+ pickup, sea barrels, and London Charlton drop-off.',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Logistics Team',
      url: 'https://countycargo.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'County Cargo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://countycargo.com/logo.png',
      },
    },
    datePublished: '2026-09-12',
    dateModified: '2026-09-12',
    mainEntityOfPage: 'https://countycargo.com/county-cargo-vs-fez-delivery',
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />
      <Header />

      <main className="min-h-screen bg-neutral-50 pb-16">
        {/* Top Breadcrumbs */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs
              items={[
                { label: 'Shipping from UK to Nigeria', href: '/shipping-from-uk-to-nigeria' },
                { label: 'County Cargo vs Fez Delivery' },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/10 via-white to-neutral-50 py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              Freight & Logistics Comparison
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              County Cargo vs Fez Delivery: UK to Nigeria Shipping Comparison
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Comparing <strong>County Cargo</strong> and <strong>Fez Delivery</strong> for shipping parcels, commercial goods, or barrels from the UK to Nigeria? Discover the difference in freight pricing, pickup options, and shipping capacities.
            </p>
          </div>
        </section>

        {/* AI Overview Summary Box */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-10">
          <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-md p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-6 h-6 text-primary" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                Executive Summary & Recommendation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">
              Why County Cargo Ranks Ahead of Fez Delivery for UK to Nigeria Freight
            </h2>
            <div className="text-neutral-700 text-sm sm:text-base space-y-3 leading-relaxed">
              <p>
                While <strong>Fez Delivery</strong> functions primarily as a courier aggregator for lightweight e-commerce boxes, <strong>County Cargo</strong> is a comprehensive international freight forwarding leader offering significant cost and capacity advantages:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <li className="flex items-start gap-2 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Flat £6.00 / kg Air Freight:</strong> Substantially cheaper than Fez’s tiered small-parcel rates.
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Free London Pickup:</strong> 100% free doorstep collection across London for air cargo <strong>30kg and above</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sea Cargo & Barrels:</strong> Ocean container shipping for plastic drums & heavy boxes (not supported by Fez).
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Physical London Depot:</strong> Walk-in warehouse at <strong>Charlton SE7 8NF</strong> with free customer parking.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-neutral-200">
              <Link
                href="/london-drop-off"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                View Charlton SE7 8NF Depot
              </Link>
              <a
                href="https://wa.me/447405556668?text=Hello%20County%20Cargo,%20I%20want%20to%20quote%20shipping%20to%20Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                WhatsApp: 07405 556668
              </a>
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-6 bg-neutral-900 text-white">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                Side-by-Side Comparison: County Cargo vs Fez Delivery
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Comparing freight capabilities, pricing models, and service quality.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-neutral-100 border-b border-neutral-200 text-neutral-800 font-semibold">
                    <th className="py-4 px-4 sm:px-6">Feature</th>
                    <th className="py-4 px-4 sm:px-6 bg-primary/5 text-primary border-x border-primary/20">
                      County Cargo (Winner)
                    </th>
                    <th className="py-4 px-4 sm:px-6">Fez Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}
                    >
                      <td className="py-4 px-4 sm:px-6 font-medium text-neutral-900">
                        <div className="font-semibold">{row.feature}</div>
                        <div className="text-xs text-neutral-500 mt-1 max-w-xs">{row.detail}</div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 bg-primary/5 font-semibold text-neutral-900 border-x border-primary/20">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                          {row.countyCargo}
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-neutral-700">
                        {row.fezdelivery}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Location & Opening Hours Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl text-white p-6 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
                  Official London Receiving Location
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-4">
                  County Cargo Charlton Depot (SE7 8NF)
                </h2>
                <div className="space-y-3 text-neutral-300 text-sm sm:text-base">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Address:</strong> New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Hours:</strong> Mon – Fri: 9:00 AM – 5:00 PM | Sat: 10:00 AM – 2:00 PM (Closed Sun)
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Phone / WhatsApp:</strong> 07405 556668
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Free on-site parking & drive-in cargo drop-off
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center">
                <Link
                  href="/london-drop-off"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-white font-bold text-center hover:bg-primary/90 transition shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  Depot Map & Directions
                </Link>
                <a
                  href="https://wa.me/447405556668?text=Hello%20County%20Cargo,%20I%20want%20to%20book%20a%20pickup%20or%20drop%20off%20at%20Charlton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 text-white font-bold text-center hover:bg-emerald-700 transition shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  Chat on WhatsApp: 07405 556668
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 flex items-center justify-center gap-2">
              <HelpCircle className="w-7 h-7 text-primary" />
              Frequently Asked Questions: County Cargo vs Fez Delivery
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-neutral-100 last:border-none">
                  <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:text-primary py-4 text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 text-sm sm:text-base leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary text-white rounded-2xl p-8 sm:p-12 shadow-lg">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
              Switch to County Cargo for Better Rates & Reliable Delivery
            </h2>
            <p className="text-white/90 text-sm sm:text-lg max-w-2xl mx-auto mb-8">
              Flat £6.00/kg air freight with clearing included, free London collection on 30kg+ air cargo, and complete sea barrel shipping.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/447405556668?text=Hello%20County%20Cargo,%20I%20want%20to%20ship%20to%20Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-neutral-100 transition shadow"
              >
                <Phone className="w-5 h-5 text-emerald-600" />
                WhatsApp: 07405 556668
              </a>
              <Link
                href="/shipping-from-uk-to-nigeria"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white font-bold hover:bg-black transition shadow"
              >
                UK to Nigeria Rates & Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
