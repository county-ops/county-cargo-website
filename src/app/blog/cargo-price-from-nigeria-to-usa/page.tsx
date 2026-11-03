import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import {
  Plane,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  FileText,
  AlertTriangle,
  Package,
  Boxes,
  HelpCircle,
  Truck,
  Zap,
  Scale,
  Check,
  Phone,
  Calculator,
  ExternalLink,
  DollarSign,
  TrendingDown,
  Warehouse,
  XCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Cargo Price from Nigeria to the US: Rates, Costs & Fees | County Cargo',
  description:
    'Complete guide to cargo prices from Nigeria to the US. Value air cargo from ₦16,000/kg (Lagos) & ₦17,000/kg (Abuja) with 10kg min, Express courier from ₦55,000/kg, and US ZIP code-based doorstep delivery.',
  keywords:
    'cargo price from Nigeria to US, shipping cost Nigeria to USA, how much to ship from Lagos to Houston, Abuja to USA air freight price, Nigeria to US shipping rate per kg, send food to America cost, County Cargo USA rates',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-price-from-nigeria-to-usa',
  },
  openGraph: {
    title: 'Cargo Price from Nigeria to the US: Rates, Costs & Fees | County Cargo',
    description:
      'Transparent price breakdown for shipping cargo from Nigeria to the United States. Value air cargo, express courier, customs fees, and US nationwide doorstep delivery.',
    url: 'https://countycargo.com/blog/cargo-price-from-nigeria-to-usa',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-10-04T09:00:00.000Z',
    modifiedTime: '2026-10-04T09:00:00.000Z',
    authors: ['County Cargo Transatlantic Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo air freight pallets and rates calculation for cargo from Nigeria to the USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo Price from Nigeria to the US: Value & Express Rates',
    description:
      'Understand exactly how much it costs to ship cargo, foodstuffs, fashion, and personal goods from Nigeria to any US state.',
    images: ['https://countycargo.com/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg'],
  },
};

const faqs = [
  {
    question: 'How much does County Cargo charge per kg from Nigeria to the US?',
    answer:
      'Our Value Air Cargo rate is ₦16,000 per kilogram from Lagos and ₦17,000 per kilogram from Abuja (which incorporates internal linehaul and airport transfer). The minimum billable weight for Value Air Cargo is 10kg. For urgent parcels, Express Priority Courier starts from ₦55,000 per kg (1kg minimum).',
  },
  {
    question: 'What is the minimum cost to send a package from Nigeria to America?',
    answer:
      'For Value Air Cargo, the minimum shipment weight is 10kg, making the baseline cost ₦160,000 from Lagos or ₦170,000 from Abuja. For parcels lighter than 10kg requiring urgent delivery, our Express service can accommodate shipments from 1kg starting from ₦55,000/kg.',
  },
  {
    question: 'Are US customs duties included in the per-kg rate?',
    answer:
      'Our Value Air rate includes Nigerian export clearance and standard transatlantic airline handling. In the United States, personal effects and qualifying goods below the Section 321 de minimis value ($800) typically enter duty-free. For commercial merchandise, an estimated 15% tariff advisory applies on declared commercial value according to US Customs and Border Protection (CBP) regulations.',
  },
  {
    question: 'How much is doorstep delivery to a US residential or business address?',
    answer:
      'Doorstep delivery is quoted transparently based on your destination US ZIP code, gross weight, and package dimensions. Whether delivering to Texas, Georgia, Maryland, New York, California, or Illinois, our domestic courier network provides seamless final-mile delivery right to your door.',
  },
  {
    question: 'How do airlines calculate volumetric weight versus actual weight?',
    answer:
      'Airlines charge according to whichever is greater: the physical scale weight or the volumetric (dimensional) weight. The international formula is (Length × Width × Height in cm) ÷ 5,000. For instance, a lightweight box measuring 60cm × 40cm × 40cm equals 19.2 kg volumetric weight, even if the contents weigh only 10 kg on a scale.',
  },
  {
    question: 'How long does cargo take to arrive in the US from Nigeria?',
    answer:
      'Express priority courier delivers in 3–5 working days from flight departure. Value consolidated air cargo takes approximately 5–10 working days, including consolidation, flight transit, US port customs release, and depot intake.',
  },
];

export default function NigeriaToUsCargoPricePage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-price-from-nigeria-to-usa';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Cargo Price from Nigeria to the US', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Cargo Price from Nigeria to the US: Rates, Costs & Fees Breakdown',
        description:
          'Clear, transparent price breakdown for shipping cargo, personal items, African foodstuffs, and commercial inventory from Nigeria to the United States.',
        image: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
        datePublished: '2026-10-04T09:00:00.000Z',
        dateModified: '2026-10-04T09:00:00.000Z',
        inLanguage: 'en-US',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Transatlantic Logistics Team',
          url: 'https://countycargo.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://countycargo.com/county-logo.png',
          },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={schema} />
      <Header />

      <main className="pt-20 sm:pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Nigeria to US Cargo Price' },
            ]}
          />

          {/* Header */}
          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Price Guide &bull; Nigeria &rarr; United States
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated October 2026
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Transparent Rates
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Cargo Price from Nigeria to the US: Rates, Costs &amp; Fees (2026 Breakdown)
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Find out exact per-kilogram prices, minimum shipping thresholds, airline volumetric weight calculations, customs tariffs, and US ZIP code doorstep delivery charges for shipments leaving Lagos and Abuja.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Cargo Price from Nigeria to the US: Rates, Costs & Fees (2026 Breakdown)"
                url={articleUrl}
              />
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg"
              alt="County Cargo air cargo handling and freight pallets bound for the United States"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Rate Highlights Snapshot */}
          <section className="mb-12 bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/50 border border-blue-200/70 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Live Pricing Snapshot: Nigeria to United States
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Lagos &rarr; USA</p>
                <p className="text-xl font-extrabold text-primary mt-1">₦16,000/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 10kg &bull; 5–10 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Abuja &rarr; USA</p>
                <p className="text-xl font-extrabold text-blue-800 mt-1">₦17,000/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 10kg &bull; Incl. Linehaul</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Express Courier</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">From ₦55k/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">From 1kg &bull; 3–5 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">US Final Mile</p>
                <p className="text-xl font-extrabold text-amber-700 mt-1">By ZIP Code</p>
                <p className="text-xs text-gray-500 mt-0.5">All 50 US States</p>
              </div>
            </div>
          </section>

          {/* Main Body */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            {/* Section 1: Introduction */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Understanding Air Cargo Costs from Nigeria to the United States
              </h2>
              <p>
                Shipping cargo from Nigeria to the United States is one of the highest-demand logistics routes for the Nigerian diaspora, business owners, and wholesale merchants. Whether you are sending food provisions to loved ones in Houston or Dallas, forwarding bespoke fashion designs to Atlanta, or exporting commercial goods across America, one question comes first: <strong>How much does it actually cost?</strong>
              </p>
              <p>
                In international logistics, pricing is often clouded with ambiguous surcharges, sudden port handling fees, and unclear exchange rate conversions. At <strong>County Cargo</strong>, we believe in complete transparency. Our rates are structured with clear per-kilogram billing, straightforward minimum weights, and realistic timelines so you can calculate your exact shipping budget with zero surprises.
              </p>
            </section>

            {/* Section 2: Core Pricing Tiers */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                The Two Primary Shipping Options to the US
              </h2>
              <p>
                Depending on your consignment weight, urgency, and budget, County Cargo provides two distinct service tiers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                {/* Value Card */}
                <div className="bg-white border-2 border-primary/30 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Most Economical
                    </span>
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Value Export Shipping (Air Cargo)</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-primary">₦16,000</span>
                    <span className="text-gray-500 text-sm"> / kg (Lagos origin)</span>
                    <p className="text-sm text-gray-600 mt-1 font-medium">₦17,000 / kg (Abuja origin with domestic linehaul)</p>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-700 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Transit Time:</strong> 5–10 working days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Minimum Billable Weight:</strong> 10 kg (minimum ₦160,000 / ₦170,000)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Dollar Equivalent:</strong> Approx. $10.67 / kg (at benchmark ₦1,500/USD)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Best For:</strong> Cartons of dried Nigerian foodstuffs, African clothing and fabrics, relocation baggage, trade inventory, and shipments over 10kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>US Delivery:</strong> Self-collection at our Irving, Texas depot (TX 75060) or courier doorstep delivery across all 50 states</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    <Link href="https://ship.countycargo.com/shipping-calculator">Get Value Air Quote</Link>
                  </Button>
                </div>

                {/* Express Card */}
                <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-6 shadow-sm hover:border-emerald-500 transition-colors flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Fastest Delivery
                    </span>
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Express Priority Air Courier</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-emerald-700">From ₦55,000</span>
                    <span className="text-gray-500 text-sm"> / kg</span>
                    <p className="text-sm text-gray-600 mt-1 font-medium">DHL Global Network / Priority Zone 3 USA</p>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-700 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Transit Time:</strong> 3–5 working days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Minimum Billable Weight:</strong> 1 kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Packaging Service:</strong> ₦2,000/kg secure export packaging charge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Best For:</strong> Critical documents, urgent academic transcripts, emergency samples, luxury clothing, and lightweight packages under 10kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Tracking:</strong> Real-time door-to-door courier tracking right to the receiver’s hands</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold">
                    <Link href="https://ship.countycargo.com/shipping-calculator">Get Express Quote</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Section 3: Cost Comparison Table by Weight */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Nigeria to US Shipping Cost Calculator Table
              </h2>
              <p>
                Here is a representative breakdown of costs for typical parcel weights shipped from Nigeria to the United States:
              </p>

              <div className="overflow-x-auto not-prose my-6 rounded-xl border border-gray-200 shadow-xs">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-900 uppercase font-semibold text-xs border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-4">Chargeable Weight</th>
                      <th className="py-3.5 px-4">Recommended Service</th>
                      <th className="py-3.5 px-4">Lagos Origin (NGN)</th>
                      <th className="py-3.5 px-4">Abuja Origin (NGN)</th>
                      <th className="py-3.5 px-4">Approx. USD ($)</th>
                      <th className="py-3.5 px-4">Transit Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">1 kg (Documents / Parcel)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Express Courier</span></td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">From ₦55,000</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">From ₦55,000</td>
                      <td className="py-3.5 px-4">~$37</td>
                      <td className="py-3.5 px-4">3–5 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">5 kg (Light Package)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Express Courier</span></td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">Tiered Express</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">Tiered Express</td>
                      <td className="py-3.5 px-4">Quoted live</td>
                      <td className="py-3.5 px-4">3–5 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">10 kg (Minimum Value)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air Cargo</span></td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦160,000</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦170,000</td>
                      <td className="py-3.5 px-4">~$107 – $113</td>
                      <td className="py-3.5 px-4">5–10 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">15 kg (Food Provisions)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air Cargo</span></td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦240,000</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦255,000</td>
                      <td className="py-3.5 px-4">~$160 – $170</td>
                      <td className="py-3.5 px-4">5–10 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">20 kg (Standard Box)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air Cargo</span></td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦320,000</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦340,000</td>
                      <td className="py-3.5 px-4">~$213 – $227</td>
                      <td className="py-3.5 px-4">5–10 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">30 kg (Bulk Clothing)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air Cargo</span></td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦480,000</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦510,000</td>
                      <td className="py-3.5 px-4">~$320 – $340</td>
                      <td className="py-3.5 px-4">5–10 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">50 kg (Commercial Stock)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air Cargo</span></td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦800,000</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦850,000</td>
                      <td className="py-3.5 px-4">~$533 – $567</td>
                      <td className="py-3.5 px-4">5–10 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 italic">
                * Note: Value Cargo rates cover scheduled air freight and standard clearance. Doorstep delivery across the United States is calculated separately according to the recipient’s destination ZIP code. USD conversion estimates are based on ₦1,500/USD.
              </p>
            </section>

            {/* Section 4: What Factors Influence the Final Price */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                4 Key Factors That Determine Your Final Price
              </h2>

              <div className="space-y-4 not-prose my-6">
                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-4">
                  <Scale className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">1. Actual vs. Volumetric (Dimensional) Weight</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      International airlines charge based on space utilized inside the cargo hold as well as dead weight. The volumetric weight formula is <strong>(Length × Width × Height in cm) ÷ 5,000</strong>. If you pack lightweight bulky items (such as bulky lace, oversized foam packaging, or loose wigs) in a massive carton, you will be billed for the volumetric weight rather than the scale weight.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">2. Origin Location in Nigeria (Lagos vs. Abuja vs. Other States)</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Our primary international flights depart from Murtala Muhammed Airport in Lagos. Dropping off at our Lagos Hub (Ladipo-Oshodi) offers our base rate of ₦16,000/kg. For cargo dropped off at our Abuja Hub (Wuye Market), the rate is ₦17,000/kg to include inter-city linehaul and specialized airport handling. Doorstep pickup across Lagos or Abuja carries a modest ₦5,000 local collection fee.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-4">
                  <Truck className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">3. Destination US ZIP Code &amp; Final-Mile Delivery</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      America is a massive continent. Delivery to a major logistics hub like Houston (TX 77036), Dallas (TX 75201), or Atlanta (GA 30303) requires less domestic transit than a rural ZIP code in Idaho or Montana. County Cargo uses accurate ZIP-code-based courier calculations to provide honest, transparent doorstep rates rather than arbitrary flat-rate markups.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-4">
                  <FileText className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">4. US Customs Duties &amp; FDA Compliance</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Under US Customs Section 321 de minimis regulations, personal consignments valued under $800 often clear without import duty. However, for commercial merchandise or shipments requiring formalized import customs declarations, an additional <strong>15% tariff advisory</strong> applies to the declared customs value. Foodstuffs also require strict compliance with US FDA Prior Notice filing.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Foodstuff & FDA Guidelines */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Sending Food Products to the US: What Clears &amp; What Gets Seized
              </h2>
              <p>
                A large percentage of cargo sent from Nigeria to the US consists of indigenous foodstuffs. The US Food and Drug Administration (FDA) and Customs and Border Protection (CBP) maintain strict biosecurity surveillance at all US international ports of entry.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Permitted Foods (Must Be 100% Dehydrated)</span>
                  </div>
                  <ul className="text-sm text-emerald-950 space-y-2">
                    <li>&bull; <strong>Dried Seafood:</strong> Crayfish, dried smoked catfish, and stockfish (vacuum-sealed, odor-free).</li>
                    <li>&bull; <strong>Grains &amp; Flours:</strong> Garri, poundo yam flour, bean flour, elubo/yam flour, and processed melon seed (egusi).</li>
                    <li>&bull; <strong>Dried Spices:</strong> Ground dried pepper, suyi spice, ogbono, and dried scent leaves.</li>
                    <li>&bull; <strong>Packaging Rule:</strong> All items must be packed in airtight, pest-free, commercial-grade seal bags.</li>
                  </ul>
                </div>

                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-rose-900 font-bold">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Strictly Prohibited by US CBP &amp; FDA</span>
                  </div>
                  <ul className="text-sm text-rose-950 space-y-2">
                    <li>&bull; <strong>Fresh Meats:</strong> Fresh or frozen beef, goat meat, chicken, or bushmeat (zero tolerance).</li>
                    <li>&bull; <strong>Fresh Fruits &amp; Vegetables:</strong> Fresh peppers, raw tubers with soil, or unprocessed leaves.</li>
                    <li>&bull; <strong>Dairy &amp; Raw Poultry Eggs:</strong> Unpasteurized animal derivatives.</li>
                    <li>&bull; <strong>Wet Pastes &amp; Unsealed Liquids:</strong> Items that leak or attract contamination.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: Actionable Cost-Saving Tips */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                How to Save Money on Your Nigeria to US Cargo
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Consolidate Shipments:</strong> Since the Value Air rate starts at 10kg, combining small parcels with friends, family, or business partners into a single 20kg or 30kg consignment avoids paying individual minimum charges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Vacuum-Compress Fabrics &amp; Food:</strong> Clothes, ankara, and dried goods contain immense amounts of trapped air. Vacuum-packing shrinks package volume by up to 50%, saving you significant money on volumetric charges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Choose the Right Box Dimensions:</strong> Avoid oversized cartons that have empty space inside. Always pack snugly with rigid double-walled boxes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Drop Off at Lagos Hub When Possible:</strong> If your goods originate in Lagos, dropping off directly at Ladipo-Oshodi eliminates local collection charges and locks in the base ₦16,000/kg rate.</span>
                </li>
              </ul>
            </section>

            {/* Section 7: FAQs */}
            <section className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>
              <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-2xs not-prose">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-sm leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Section 8: CTA Banner */}
            <section className="mt-12 p-8 bg-gradient-to-br from-primary via-blue-900 to-slate-900 text-white rounded-2xl not-prose shadow-xl text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    Get an Exact Price for Your US Cargo
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Calculate your export rate in seconds using our central calculator or chat with our team in Lagos, Abuja, or Texas.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-emerald-400" /> Web: <strong className="text-white">countycargo.com</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-400" /> WhatsApp: <strong className="text-white">+234 811 000 0421</strong>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/export-from-nigeria">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate US Price
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                    <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo,%20I%20would%20like%20to%20know%20the%20exact%20price%20to%20ship%20cargo%20from%20Nigeria%20to%20the%20USA." target="_blank" rel="noopener noreferrer">
                      WhatsApp Price Desk
                    </a>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
