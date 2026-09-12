import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import {
  Plane,
  Ship,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  FileText,
  AlertTriangle,
  Package,
  Boxes,
  HelpCircle,
  Truck,
  Warehouse,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping to Abuja from the USA: Why Air Freight Often Wins | County Cargo',
  description:
    'Shipping cargo to Abuja from the USA — direct air freight vs sea via Lagos, the overland leg, FCT delivery areas, and how to choose between them.',
  keywords:
    'shipping to Abuja from USA, cargo to Abuja from USA, freight to Abuja Nigeria, Nnamdi Azikiwe airport cargo, FCT door delivery, air freight vs sea freight Abuja',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-to-abuja-from-usa',
  },
  openGraph: {
    title: 'Shipping to Abuja from the USA: Why Air Freight Often Wins',
    description:
      'Shipping cargo to Abuja from the USA — direct air freight vs sea via Lagos, the overland leg, FCT delivery areas, and how to choose between them.',
    url: 'https://countycargo.com/blog/shipping-to-abuja-from-usa',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-02-10T08:00:00.000Z',
    modifiedTime: '2026-09-12T05:00:00.000Z',
    authors: ['County Cargo Abuja Operations Team'],
    images: [
      {
        url: 'https://countycargo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shipping to Abuja from the USA Guide',
      },
    ],
  },
};

const abujaBlogFaqs = [
  {
    question: 'Why is air freight often better than sea freight for shipping to Abuja?',
    answer:
      'Because Abuja is an inland capital without a seaport, sea freight must first discharge at Lagos ports (Apapa or Tin Can) and then undergo a 750 km overland road haul to the FCT. Once you factor in road freight costs and handling, small consignments (1 to 2 barrels or boxes under 2 CBM) are often cheaper or practically identical in cost when flown directly into Nnamdi Azikiwe Airport (ABV) in 5 to 10 days.',
  },
  {
    question: 'When does sea freight to Abuja still make financial sense?',
    answer:
      'Sea freight remains substantially cheaper for large volumes: full residential house moves, heavy construction materials, solar power installations, or commercial shipments exceeding 2 to 3 cubic metres (CBM). In those scenarios, the per-pound cost of air freight outweighs the overland line-haul charges.',
  },
  {
    question: 'How does customs clearance at Abuja airport differ from Lagos ports?',
    answer:
      'Air cargo clearance at Nnamdi Azikiwe International Airport (ABV) is generally significantly faster and less congested than the marine container terminals at Apapa and Tin Can Island. Customs documentation requirements remain identical, but processing queues are shorter.',
  },
  {
    question: 'Where can I pick up my shipment in Abuja or get doorstep delivery?',
    answer:
      'County Cargo operates a dedicated branch at Shop HF426, Turai Yar\'adua Block, Wuye Ultra Modern Market, Abuja-FCT for free self-collection, or our delivery vans bring your packages directly to your doorstep anywhere in the FCT.',
  },
];

export default function ShippingToAbujaFromUsaPost() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: abujaBlogFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Shipping to Abuja from the USA: Why Air Freight Often Wins',
    description:
      'Shipping cargo to Abuja from the USA — direct air freight vs sea via Lagos, the overland leg, FCT delivery areas, and how to choose between them.',
    datePublished: '2026-02-10T08:00:00.000Z',
    dateModified: '2026-09-12T05:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Abuja Operations Team',
      url: 'https://countycargo.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'County Cargo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://countycargo.com/county-cargo-logo-transparent.png',
      },
    },
    mainEntityOfPage: 'https://countycargo.com/blog/shipping-to-abuja-from-usa',
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />

      <Header />

      <main className="min-h-screen bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'Shipping to Abuja from USA' },
          ]}
        />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <header className="mb-10 pb-8 border-b border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
              FCT Cargo Logistics &bull; 2026 Strategic Guide
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Shipping to Abuja from the USA: Why Air Freight Often Wins
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Shipping cargo to Abuja from the USA — direct air freight vs sea via Lagos, the overland
              leg, FCT delivery areas, and how to choose between them.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
              <span>By County Cargo Abuja Operations Team</span>
              <span>&bull;</span>
              <span>7 min read</span>
              <span>&bull;</span>
              <span>FCT Distribution</span>
            </div>
          </header>

          <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed space-y-8 text-base sm:text-lg">
            <p>
              Abuja is a completely different logistical problem from Lagos, and advice that saves you
              money on a shipment to Lagos can easily cost you extra cash and weeks of frustration when
              shipping to the Federal Capital Territory (FCT).
            </p>
            <p>
              Before you book your cargo from Texas, Georgia, Maryland, or anywhere in the United
              States, here is the geographic and economic reality every shipper needs to understand.
            </p>

            {/* Section 1 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" /> The Geography Problem
              </h2>
              <p>
                Abuja is completely inland. There is no ocean coastline, no natural deep-sea port, and
                no river terminal capable of receiving international container ships.
              </p>
              <p>
                When you ship via sea freight to Abuja, your container discharges at the ocean terminals
                of Apapa or Tin Can Island in Lagos. After ocean discharge and customs clearance, the
                cargo must be transferred onto long-haul cargo trucks for an overland highway journey of
                roughly <strong>750 kilometres</strong> across multiple states to reach the FCT.
              </p>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 not-prose my-6 text-sm">
                <h4 className="font-bold text-gray-900 mb-2">What the Overland Leg Involves:</h4>
                <ul className="space-y-1.5 text-gray-700 list-disc list-inside">
                  <li>Adds roughly <strong>3 to 5 working days</strong> after port release</li>
                  <li>Incurs dedicated inter-state line-haul haulage charges</li>
                  <li>Requires additional handling, trans-loading, and security escorts</li>
                </ul>
              </div>
              <p>
                By contrast, <strong>air freight flies direct into Nnamdi Azikiwe International Airport (ABV)</strong>.
                It lands, enters the airport cargo terminal, clears customs in Abuja, and moves straight
                to our local delivery vans. There is zero Lagos port involvement whatsoever.
              </p>
            </div>

            {/* Section 2 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plane className="h-6 w-6 text-primary" /> When Air Freight Is the Right Call
              </h2>
              <p>
                For the majority of personal consignments destined for Abuja — one or two 55-gallon
                barrels, luggage boxes, electronics, designer clothing, or personal care products —{' '}
                <strong>air freight wins hands down</strong>.
              </p>
              <p>
                Once you calculate ocean freight plus the mandatory overland haul from Lagos to Abuja,
                the cost savings of ocean shipping shrink dramatically. On a single barrel or a 60 lb
                box, the cost difference is often negligible, yet air freight saves you five to seven
                weeks of waiting.
              </p>
              <p>
                Furthermore, flying direct to Abuja allows you to completely bypass the notorious
                bottlenecks and congestion of Lagos seaports. On a month with heavy port congestion, that
                peace of mind is worth far more than the minor difference in freight tariff.
              </p>
              <p>
                Check our official{' '}
                <Link href="/shipping-from-usa-to-abuja" className="text-primary font-semibold hover:underline">
                  Shipping from USA to Abuja service page
                </Link>{' '}
                for current per-pound air cargo rates and flight schedules.
              </p>
            </div>

            {/* Section 3 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Ship className="h-6 w-6 text-primary" /> When Sea Freight Still Wins
              </h2>
              <p>
                So when should you choose sea freight to Abuja? The answer is simple: <strong>sheer volume</strong>.
              </p>
              <p>
                If you are shipping complete furniture sets for a multi-bedroom duplex, heavy tiles,
                bathroom fixtures, commercial generators, automotive engines, or multiple shrink-wrapped
                warehouse pallets, air freight becomes prohibitively expensive.
              </p>
              <p>
                The rough dividing line sits around <strong>2 to 3 cubic metres (CBM)</strong>. Once
                your shipment exceeds that threshold, the economies of scale of ocean shipping easily
                absorb the $150 to $250 overland trucking surcharge from Lagos to Abuja, making sea
                freight significantly cheaper overall.
              </p>
            </div>

            {/* Section 4 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" /> Clearing Customs at Abuja (ABV)
              </h2>
              <p>
                Clearing air cargo through Nnamdi Azikiwe International Airport is generally much
                smoother and faster than navigating maritime terminals in Lagos. The customs inspection
                bays are less crowded, and paperwork verification moves briskly.
              </p>
              <p>
                However, standard Nigerian Customs Service compliance rules still apply:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Provide a specific, itemised packing list rather than vague terms like &quot;goods&quot;.</li>
                <li>Ensure the recipient’s phone numbers are functional and answered promptly.</li>
                <li>Avoid prohibited items such as counterfeit electronics or uncertified pharmaceuticals.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" /> Door-to-Door Delivery Across the FCT
              </h2>
              <p>
                From our Abuja hub at <strong>Wuye Ultra Modern Market</strong>, our local delivery vans
                provide daily door-to-door distribution across:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose my-6 text-sm">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-800">
                  Garki 1 &amp; 2
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-800">
                  Wuse 1 &amp; Wuse 2
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-800">
                  Maitama &amp; Asokoro
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-800">
                  Gwarinpa Estate
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-800">
                  Jabi &amp; Utako
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-800">
                  Lugbe &amp; Kubwa
                </div>
              </div>
            </div>

            {/* Section 6 - CTA */}
            <div className="my-10 p-6 sm:p-8 bg-blue-50 border border-blue-200 rounded-2xl not-prose">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Not Sure Which Option You Need?</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                Send us the weight and dimensions of your cargo. We will run both the air and sea
                numbers side by side and advise you on the most economical route.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-blue-700 text-white font-semibold">
                  <Link href="/shipping-from-usa-to-abuja">
                    Calculate Abuja Shipping Cost <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-300 text-gray-800 hover:bg-white">
                  <a
                    href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20an%20Abuja%20freight%20quote"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Our FCT Desk
                  </a>
                </Button>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" /> Key Questions Answered
              </h2>
              <Accordion type="single" collapsible className="space-y-4 not-prose">
                {abujaBlogFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`abuja-faq-${index}`}
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

            {/* Related Service Guides */}
            <div className="pt-8 border-t border-gray-200 not-prose">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Service Guides:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <Link
                  href="/shipping-from-usa-to-nigeria"
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary text-gray-800 font-medium block transition-colors"
                >
                  &rarr; US to Nigeria Freight Main
                </Link>
                <Link
                  href="/shipping-from-usa-to-lagos"
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary text-gray-800 font-medium block transition-colors"
                >
                  &rarr; Shipping from USA to Lagos
                </Link>
                <Link
                  href="/shipping-from-usa-to-port-harcourt"
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary text-gray-800 font-medium block transition-colors"
                >
                  &rarr; USA to Port Harcourt Cargo
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
