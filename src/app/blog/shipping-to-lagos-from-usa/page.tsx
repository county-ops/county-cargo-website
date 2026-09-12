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
  title: 'Shipping to Lagos from the USA: Ports, Timelines & Clearing Fast | County Cargo',
  description:
    'Everything you need to know about shipping cargo from the USA to Lagos — Apapa vs Tin Can, realistic transit times, clearance, and delivery across Lagos.',
  keywords:
    'shipping to Lagos from USA, cargo to Lagos from USA, Apapa port clearing, Tin Can Island cargo, air cargo to Murtala Muhammed airport, avoid demurrage Lagos, send barrels to Lagos from Texas',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-to-lagos-from-usa',
  },
  openGraph: {
    title: 'Shipping to Lagos from the USA: Ports, Timelines & Clearing Fast',
    description:
      'Everything you need to know about shipping cargo from the USA to Lagos — Apapa vs Tin Can, realistic transit times, clearance, and delivery across Lagos.',
    url: 'https://countycargo.com/blog/shipping-to-lagos-from-usa',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-02-01T08:00:00.000Z',
    modifiedTime: '2026-09-12T05:00:00.000Z',
    authors: ['County Cargo Lagos Operations Team'],
    images: [
      {
        url: 'https://countycargo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shipping to Lagos from the USA Guide',
      },
    ],
  },
};

const lagosBlogFaqs = [
  {
    question: 'Which port does sea freight from the US arrive at in Lagos?',
    answer:
      'Ocean freight from the United States arrives at either Apapa Port (Lagos Port Complex) or Tin Can Island Port. Both are situated on Lagos Island/Apapa axis. Air freight consignments land directly at the cargo apron of Murtala Muhammed International Airport (LOS) in Ikeja.',
  },
  {
    question: 'How can I avoid port demurrage charges when shipping to Lagos?',
    answer:
      'Demurrage begins when a container exceeds its free terminal storage window (usually 5 to 7 days). You prevent demurrage by submitting accurate itemised packing lists before the vessel docks, ensuring your consignee is reachable by phone, and working with a forwarder with licensed in-house clearing agents rather than third-party sub-brokers.',
  },
  {
    question: 'What is the most economical way to ship personal goods to Lagos?',
    answer:
      'Standard 55-gallon shipping barrels (drums) remain the most cost-effective option for personal items, canned foods, clothing, and household sundries. Starting at $220 to $250 from our Irving, Texas warehouse, they offer unbeatable volume value compared to per-lb air freight.',
  },
  {
    question: 'How long does door-to-door delivery take in Lagos after customs clearance?',
    answer:
      'Once cargo clears customs at the airport or seaport, our local delivery vans deliver across Lagos Mainland (Ikeja, Yaba, Surulere, Festac) within 24 to 48 hours, and to Lagos Island / Peninsula (Lekki, Victoria Island, Ikoyi, Ajah) within 48 hours.',
  },
];

export default function ShippingToLagosFromUsaPost() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: lagosBlogFaqs.map((faq) => ({
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
    headline: 'Shipping to Lagos from the USA: Ports, Timelines and How to Get Your Cargo Cleared Fast',
    description:
      'Everything you need to know about shipping cargo from the USA to Lagos — Apapa vs Tin Can, realistic transit times, clearance, and delivery across Lagos.',
    datePublished: '2026-02-01T08:00:00.000Z',
    dateModified: '2026-09-12T05:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Lagos Operations Team',
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
    mainEntityOfPage: 'https://countycargo.com/blog/shipping-to-lagos-from-usa',
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
            { label: 'Shipping to Lagos from USA' },
          ]}
        />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <header className="mb-10 pb-8 border-b border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Lagos Port &amp; Logistics Insights &bull; 2026 Guide
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Shipping to Lagos from the USA: Ports, Timelines and How to Get Your Cargo Cleared Fast
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Everything you need to know about shipping cargo from the USA to Lagos — Apapa vs Tin
              Can, realistic transit times, clearance, and delivery across Lagos.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
              <span>By County Cargo Lagos Operations Team</span>
              <span>&bull;</span>
              <span>8 min read</span>
              <span>&bull;</span>
              <span>Lagos Port Operations</span>
            </div>
          </header>

          <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed space-y-8 text-base sm:text-lg">
            <p>
              Lagos handles the vast majority of Nigeria’s maritime and air imports, which cuts both
              ways. On one hand, it is the cheapest, most frequent, and best-connected commercial route
              from the United States. On the other hand, it is also the most heavily congested logistics
              corridor in West Africa.
            </p>
            <p>
              Whether you are sending a single 55-gallon barrel of personal essentials from Houston or
              shipping multiple pallets of automotive machinery from our Irving, Texas warehouse, here
              is an honest look at what actually happens once your cargo embarks for Lagos.
            </p>

            {/* Section 1 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" /> Where Your Cargo Actually Lands
              </h2>
              <p>
                Depending on whether you choose ocean transport or express air cargo, your shipment will
                touch down at one of three major federal entry points in Lagos State:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Air Freight:</strong> Lands at the cargo apron of <strong>Murtala Muhammed International Airport (LOS)</strong> in Ikeja. Consignments are deconsolidated at the SAHCO or NAHCO cargo sheds before customs release.
                </li>
                <li>
                  <strong>Sea Freight:</strong> Vessels dock at either <strong>Apapa Port Complex</strong> or <strong>Tin Can Island Port</strong>.
                </li>
              </ul>
              <p>
                Tin Can and Apapa both have reputations for notorious road gridlock and container dwell
                times, and those reputations are earned. The practical takeaway is this:{' '}
                <strong>your customs clearance agent matters far more than your shipping line</strong>. A competent in-house clearing team moves a container out of the terminal gate in days. An amateur or third-party broker leaves it sitting in a terminal holding bay accruing daily demurrage penalties while nobody answers the phone.
              </p>
              <p>
                Explore our full route details on our dedicated{' '}
                <Link href="/shipping-from-usa-to-lagos" className="text-primary font-semibold hover:underline">
                  Shipping from USA to Lagos service page
                </Link>
                .
              </p>
            </div>

            {/* Section 2 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" /> Realistic Timelines (Without the Fluff)
              </h2>
              <p>
                Freight websites often publish rosy claims about 3-day deliveries from America to
                Nigeria. In the real world of international trade compliance, realistic timelines look
                like this:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
                  <h4 className="font-bold text-blue-900 text-lg mb-2 flex items-center gap-2">
                    <Plane className="h-5 w-5 text-blue-600" /> Air Freight: 5–10 Working Days
                  </h4>
                  <p className="text-sm text-gray-700">
                    From drop-off at our Irving warehouse to flight departure, airport customs clearance
                    in Ikeja, and doorstep dispatch across Lagos.
                  </p>
                </div>
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <h4 className="font-bold text-emerald-900 text-lg mb-2 flex items-center gap-2">
                    <Ship className="h-5 w-5 text-emerald-700" /> Sea Freight: 6–8 Weeks
                  </h4>
                  <p className="text-sm text-gray-700">
                    From Texas consolidation, Atlantic ocean transit, terminal discharge at Apapa/Tin
                    Can, port inspection, and final local delivery.
                  </p>
                </div>
              </div>
              <p>
                <strong>The Seasonal Spike:</strong> Add 7 to 10 days either side during the peak
                December holiday rush, Ramadan, and Black Friday import surges. Anyone quoting you a
                rigid, guaranteed calendar date months in advance during peak season is guessing. What
                you should demand instead is an honest operational window and active tracking when your
                consignment clears customs.
              </p>
            </div>

            {/* Section 3 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" /> Demurrage and Why It Catches People
              </h2>
              <p>
                Once an ocean container discharges onto the quayside in Lagos, the port terminal
                operator grants a free storage window (typically 5 to 7 days). After that grace period
                expires, <strong>demurrage charges start accruing per day, and they compound aggressively</strong>.
              </p>
              <p>
                Demurrage is the single largest avoidable expense in Nigerian shipping. Consignees
                frequently discover their initial freight bill doubled because paperwork sat on a desk.
              </p>
              <p>Two simple habits prevent virtually 100% of demurrage headaches:</p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>
                  <strong>Submit complete, itemised documentation before vessel arrival:</strong> Never
                  wait for the ship to drop anchor before preparing your invoices and packing lists.
                </li>
                <li>
                  <strong>A consignee who actually answers the phone:</strong> Customs officers and
                  terminal agents routinely place verification calls. When the recipient answers promptly,
                  the release paperwork moves forward without delay.
                </li>
              </ol>
            </div>

            {/* Section 4 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" /> Delivering Across Lagos: The Traffic Reality
              </h2>
              <p>
                Lagos geography and traffic conditions mean that delivering a 50kg box to an office in
                Victoria Island is entirely different from delivering a pallet to a factory in Ikorodu or
                Badagry.
              </p>
              <p>
                Honest forwarders maintain specialized local dispatch routes:
              </p>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 not-prose my-6 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Lagos Mainland Fleet</h5>
                    <p className="text-gray-600">
                      Covers Ikeja, Surulere, Yaba, Gbagada, Festac, Maryland, and Alimosho directly from
                      our central Ladipo-Oshodi depot.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Island &amp; Peninsula Fleet</h5>
                    <p className="text-gray-600">
                      Dedicated daily delivery runs covering Ikoyi, Victoria Island, Lekki Phase 1,
                      Chevron, and Ajah.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Always specify your recipient’s exact local government area rather than settling for a
                generic &quot;Lagos delivery&quot; rate that might not include final doorstep drop-off.
              </p>
            </div>

            {/* Section 5 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Boxes className="h-6 w-6 text-primary" /> Sending Barrels to Lagos
              </h2>
              <p>
                Heavy-duty 55-gallon plastic or fibre shipping barrels remain the most popular,
                economical way for the Nigerian diaspora in Texas, Atlanta, New York, and across the US
                to send provisions home.
              </p>
              <p>To pack a barrel like an expert:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Place dense, heavy items (canned goods, soaps, detergents, cooking oil) firmly at the base.</li>
                <li>Fill all gaps with soft items (bed sheets, clothing, towels) to prevent shifting.</li>
                <li>Never force the locking ring shut with a bulging lid; overfilled drums crack under pressure when stacked inside sea containers.</li>
                <li>Seal your inventory sheet in a Ziploc bag and tape it securely to the inside of the lid.</li>
              </ul>
              <p>
                At County Cargo, standard 55-gallon barrels to Lagos start at <strong>$220 to $250</strong>,
                fully cleared to our Lagos depot or delivered to the door.
              </p>
            </div>

            {/* Section 6 - CTA */}
            <div className="my-10 p-6 sm:p-8 bg-blue-50 border border-blue-200 rounded-2xl not-prose">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get an Accurate Lagos Quote Today</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                Tell us what you are shipping, the estimated weight or dimensions, and the delivery
                district in Lagos. Our operations team will price it properly within hours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-blue-700 text-white font-semibold">
                  <Link href="/shipping-from-usa-to-lagos">
                    View Lagos Rates &amp; Calculate Cost <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-300 text-gray-800 hover:bg-white">
                  <a
                    href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20quote%20for%20shipping%20to%20Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Our Lagos Team
                  </a>
                </Button>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" /> Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-4 not-prose">
                {lagosBlogFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`lagos-faq-${index}`}
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
                  href="/blog/how-to-ship-from-usa-to-nigeria"
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary text-gray-800 font-medium block transition-colors"
                >
                  &rarr; US to Nigeria 2026 Guide
                </Link>
                <Link
                  href="/shipping-from-usa-to-abuja"
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary text-gray-800 font-medium block transition-colors"
                >
                  &rarr; Shipping from USA to Abuja
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
