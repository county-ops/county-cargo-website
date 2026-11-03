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
  ArrowRight,
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
  Warehouse,
  ShoppingBag,
  Utensils,
  XCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Nigeria to UK Shipping & Cargo Guide: Rates, Transit & Doorstep Delivery | County Cargo',
  description:
    'Complete guide to shipping cargo from Nigeria to the UK. Value air cargo from ₦10,500/kg (10kg min), Express courier from ₦55,000/kg (3–5 days), DEFRA food packaging rules, and UK postcode-based doorstep delivery.',
  keywords:
    'shipping from Nigeria to UK, cargo Nigeria to UK, air freight Lagos to London, Abuja to UK air cargo, send foodstuff Nigeria to UK, Nigeria to UK shipping rates 2026, County Cargo Nigeria UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/nigeria-to-uk-cargo-shipping-guide',
  },
  openGraph: {
    title: 'Nigeria to UK Shipping & Cargo Guide: Rates, Transit & Doorstep Delivery | County Cargo',
    description:
      'Reliable air freight and express courier from Lagos and Abuja to London, Manchester, Birmingham, Liverpool, and across the UK. Check verified rates and customs requirements.',
    url: 'https://countycargo.com/blog/nigeria-to-uk-cargo-shipping-guide',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-10-04T08:00:00.000Z',
    modifiedTime: '2026-10-04T08:00:00.000Z',
    authors: ['County Cargo UK Trade Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo air cargo consolidation and export dispatch from Nigeria to the UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nigeria to UK Shipping & Cargo Guide: Rates, Transit & Delivery',
    description:
      'Everything you need to know about shipping parcels, commercial inventory, and foodstuff from Nigeria to the UK with County Cargo.',
    images: ['https://countycargo.com/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg'],
  },
};

const faqs = [
  {
    question: 'How much does it cost to ship cargo from Nigeria to the UK?',
    answer:
      'With County Cargo, Value Air Cargo starts at ₦10,500 per kg from Lagos (10kg minimum billable weight) and ₦11,000 per kg from Abuja (which incorporates domestic linehaul handling). For priority parcels, Express Air Courier is available from ₦55,000 per kg with a 1kg minimum.',
  },
  {
    question: 'How long does shipping take from Nigeria to the UK?',
    answer:
      'Our Express Courier delivery takes approximately 3–5 working days from flight departure. Value consolidated air freight takes 5–10 working days, covering consolidation, airline transit, UK customs processing, and depot sorting.',
  },
  {
    question: 'Can I send food products from Nigeria to the UK?',
    answer:
      'Yes, permitted shelf-stable African foodstuffs can be exported provided they are completely dried, professionally sealed, free of pests, and compliant with UK DEFRA standards. Examples include dried fish, dried crayfish, melon seed (egusi), ogbono, garri, and yam flour. Fresh produce, meat, and dairy products are strictly prohibited under UK border regulations.',
  },
  {
    question: 'How is UK doorstep delivery arranged and calculated?',
    answer:
      'Once cargo arrives at our UK central distribution facility, you can collect directly from our Liverpool Queens Dock depot (L1 0BG) or London depot (SE7 7RU), or request nationwide doorstep delivery. Final-mile doorstep courier charges are calculated transparently based on your destination UK postal code, parcel weight, and box dimensions.',
  },
  {
    question: 'Where can I drop off my parcel in Nigeria?',
    answer:
      'You can drop off consignments at our Lagos Hub (Ladipo-Oshodi Commercial Plaza) or Abuja Hub (Wuye Ultra Modern Market). We also provide scheduled doorstep collection within Lagos and Abuja metropolitan areas.',
  },
  {
    question: 'How is volumetric weight calculated for air freight?',
    answer:
      'Airlines charge according to whichever is greater: the actual scale weight or the dimensional (volumetric) weight. The formula used across international air cargo is (Length × Width × Height in cm) ÷ 5,000. County Cargo advises packing compactly to minimize dimensional surcharges.',
  },
];

export default function NigeriaToUkCargoShippingGuidePage() {
  const articleUrl = 'https://countycargo.com/blog/nigeria-to-uk-cargo-shipping-guide';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Nigeria to UK Shipping & Cargo Guide', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Nigeria to UK Shipping & Cargo Guide: Rates, Customs Rules & Doorstep Delivery',
        description:
          'Comprehensive handbook for individuals, businesses, and Nigerian exporters shipping cargo, commercial goods, fashion, and food products from Nigeria to the United Kingdom.',
        image: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg',
        datePublished: '2026-10-04T08:00:00.000Z',
        dateModified: '2026-10-04T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo UK Trade Logistics Team',
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
              { label: 'Nigeria to UK Shipping Guide' },
            ]}
          />

          {/* Header */}
          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Nigeria &rarr; UK Export Guide
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Published October 2026
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> HMRC &amp; DEFRA Compliant
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Nigeria to UK Shipping &amp; Cargo Guide: Rates, Transit Times &amp; UK Doorstep Delivery
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Everything Nigerian exporters, UK diaspora families, students, and e-commerce traders need to know about air cargo from Lagos and Abuja straight to London, Manchester, Birmingham, and nationwide UK addresses.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Nigeria to UK Shipping & Cargo Guide: Rates, Transit Times & UK Doorstep Delivery"
                url={articleUrl}
              />
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg"
              alt="County Cargo air freight pallets and cartons preparing for export from Nigeria to the United Kingdom"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Key Rates Snapshot Card */}
          <section className="mb-12 bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/50 border border-blue-200/70 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Quick Rates &amp; Service Summary (Nigeria to UK)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Lagos to UK</p>
                <p className="text-xl font-extrabold text-primary mt-1">₦10,500/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 10kg &bull; 5–10 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Abuja to UK</p>
                <p className="text-xl font-extrabold text-blue-700 mt-1">₦11,000/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 10kg &bull; Incl. Linehaul</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Express Courier</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">From ₦55k/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 1kg &bull; 3–5 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">UK Delivery</p>
                <p className="text-xl font-extrabold text-amber-700 mt-1">By Postcode</p>
                <p className="text-xs text-gray-500 mt-0.5">Depot or Doorstep</p>
              </div>
            </div>
          </section>

          {/* Main Body */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            {/* Section 1: Overview */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                The Booming Cargo Trade Between Nigeria and the United Kingdom
              </h2>
              <p>
                The corridor between Nigeria and the United Kingdom is one of the busiest transatlantic trade arteries. Over 250,000 Nigerian residents, professionals, university students, and entrepreneurs call the UK home. Whether sending beloved native food supplies to family members in London, dispatching bespoke African fashion and textile rolls to boutiques in Manchester, or exporting commercial goods from Lagos factories, sending cargo from Nigeria to the UK requires speed, regulatory adherence, and dependable customs handling.
              </p>
              <p>
                At <strong>County Cargo</strong>, we have streamlined international export logistics into a transparent, stress-free operation. We eliminate hidden port demurrage fees, provide clear per-kilogram billing, and coordinate seamless air freight from our Lagos and Abuja hubs directly into the United Kingdom.
              </p>
            </section>

            {/* Section 2: Service Comparison */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                County Cargo Service Levels: Value Air Cargo vs. Express Courier
              </h2>
              <p>
                We offer two primary export shipping modes tailored to your budget and urgency requirements:
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
                  <h3 className="text-xl font-bold text-gray-900">Value Air Cargo (Consolidation)</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-primary">₦10,500</span>
                    <span className="text-gray-500 text-sm"> / kg (Lagos origin)</span>
                    <p className="text-sm text-gray-600 mt-1 font-medium">₦11,000 / kg (Abuja origin with domestic forwarding)</p>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-700 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Transit Time:</strong> 5–10 working days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Minimum Billable Weight:</strong> 10 kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Ideal for:</strong> Personal luggage, student relocation cartons, dried foodstuffs, bulk African garments, and heavy trade inventory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Collection:</strong> Self-collection at Liverpool L1 depot / London SE7 depot, or UK nationwide doorstep courier</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    <Link href="/export-from-nigeria">Book Value Air Cargo</Link>
                  </Button>
                </div>

                {/* Express Card */}
                <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-6 shadow-sm hover:border-emerald-500 transition-colors flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Fastest Transit
                    </span>
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Express Priority Air Courier</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-emerald-700">From ₦55,000</span>
                    <span className="text-gray-500 text-sm"> / kg</span>
                    <p className="text-sm text-gray-600 mt-1 font-medium">Global courier partner network (DHL / Priority Line)</p>
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
                      <span><strong>Ideal for:</strong> Time-sensitive legal documents, emergency parcels, vital university certificates, wedding apparel, and high-priority samples</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Door-to-Door:</strong> Direct courier delivery right to your recipient’s UK doorstep</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold">
                    <Link href="/express-export">Book Express Courier</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Section 3: Detailed Rates Table */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Detailed Pricing &amp; Weight Tier Breakdown
              </h2>
              <p>
                To help you plan your shipment budget with complete confidence, here is a transparent overview of typical weight brackets shipped between Nigeria and the UK:
              </p>

              <div className="overflow-x-auto not-prose my-6 rounded-xl border border-gray-200 shadow-xs">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-900 uppercase font-semibold text-xs border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-4">Shipment Weight</th>
                      <th className="py-3.5 px-4">Service Type</th>
                      <th className="py-3.5 px-4">Origin Hub</th>
                      <th className="py-3.5 px-4">Estimated Rate</th>
                      <th className="py-3.5 px-4">Transit Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">1 – 5 kg</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Express</span></td>
                      <td className="py-3.5 px-4">Lagos / Abuja</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">From ₦55,000/kg</td>
                      <td className="py-3.5 px-4">3–5 working days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">10 kg (Minimum)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air</span></td>
                      <td className="py-3.5 px-4">Lagos Drop-off</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦105,000 total (₦10.5k/kg)</td>
                      <td className="py-3.5 px-4">5–10 working days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">10 kg (Minimum)</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air</span></td>
                      <td className="py-3.5 px-4">Abuja Drop-off</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦110,000 total (₦11k/kg)</td>
                      <td className="py-3.5 px-4">5–10 working days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">20 kg Box</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air</span></td>
                      <td className="py-3.5 px-4">Lagos Drop-off</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦210,000 total</td>
                      <td className="py-3.5 px-4">5–10 working days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">50 kg Commercial</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Value Air</span></td>
                      <td className="py-3.5 px-4">Lagos Drop-off</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">₦525,000 total</td>
                      <td className="py-3.5 px-4">5–10 working days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-medium text-gray-900">UK Doorstep Delivery</td>
                      <td className="py-3.5 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">Final Mile</span></td>
                      <td className="py-3.5 px-4">UK Hub to Address</td>
                      <td className="py-3.5 px-4 font-semibold text-amber-800">Quoted by UK Postcode</td>
                      <td className="py-3.5 px-4">+ 1–2 days within UK</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 italic">
                * Rates are accurate as of October 2026. Exchange rates, fuel surcharges, and statutory airport handling adjustments may vary over time. Contact our support team for a live confirmation quote.
              </p>
            </section>

            {/* Section 4: What You Can & Cannot Ship */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                What Can You Ship? Items Allowed vs. Prohibited
              </h2>
              <p>
                The UK Border Force, HM Revenue &amp; Customs (HMRC), and the Department for Environment, Food &amp; Rural Affairs (DEFRA) strictly enforce biosecurity and import regulations. Ensuring your package only contains permitted goods prevents customs confiscation or severe clearance delays.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                {/* Permitted */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-emerald-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-lg">Permitted Goods (Clearance Friendly)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-emerald-950">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Dry African Foodstuffs:</strong> Dried fish, dried crayfish, smoked catfish (properly dehydrated and vacuum-sealed), egusi, ogbono, garri, bean flour, elubo/yam flour, dried scent leaves, bitter leaf, and dried pepper.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Fashion &amp; Textiles:</strong> Tailored clothes, bespoke Ankara, George fabric, Aso-Oke, lace materials, shoes, bags, and wigs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Personal Effects:</strong> Books, study materials, student kitchenware, beddings, shoes, and luggage relocation boxes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Cosmetics &amp; Skincare:</strong> Raw shea butter, black soap (dudu osun), hair oils, and commercial non-flammable creams.</span>
                    </li>
                  </ul>
                </div>

                {/* Prohibited */}
                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-rose-900">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <h3 className="font-bold text-lg">Strictly Prohibited &amp; Restricted Items</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-rose-950">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                      <span><strong>Fresh Meat &amp; Dairy:</strong> Fresh beef, goat meat, poultry, bushmeat, milk, and eggs (strictly forbidden under UK DEFRA biosecurity laws).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                      <span><strong>Fresh Produce &amp; Soil:</strong> Fresh vegetables, uninspected raw seeds, plants with soil, or perishable fresh tubers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                      <span><strong>Hazardous &amp; Flammable:</strong> Perfumes containing high alcohol, pressurized aerosols, loose lithium-ion battery banks, lighter fluid, and bleach.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                      <span><strong>Illegal Contraband:</strong> Firearms, ammunition, counterfeit medications, unregistered narcotics, and counterfeit branded designer knockoffs.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Packaging & Volumetric Weight */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Packaging Advice &amp; Calculating Volumetric Weight
              </h2>
              <p>
                International air cargo handlers charge based on <strong>Chargeable Weight</strong>, which is the higher number between:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Actual Gross Scale Weight</strong> (the reading on a weighing scale in kilograms).</li>
                <li><strong>Dimensional / Volumetric Weight</strong>, calculated via the universal air cargo standard formula:</li>
              </ol>

              <div className="p-6 bg-slate-900 text-white rounded-2xl not-prose my-6 font-mono text-center">
                <p className="text-blue-300 text-xs uppercase tracking-widest mb-1 font-sans">Volumetric Weight Formula (Air Freight)</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400">
                  Volumetric Weight (kg) = (Length × Width × Height in cm) ÷ 5,000
                </p>
                <p className="text-xs text-gray-300 mt-3 font-sans">
                  Example: A carton measuring 50cm × 40cm × 40cm = 80,000 ÷ 5,000 = <strong>16 kg</strong> volumetric weight. If it only weighs 9 kg on the scale, the billable weight will be 16 kg.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Best Packaging Guidelines for Nigeria to UK:</h3>
              <ul className="space-y-2">
                <li><strong>Double-Walled Cartons:</strong> Always use rigid, 5-ply double-walled corrugated boxes to prevent crushing during pallet consolidation and air transit.</li>
                <li><strong>Airtight Food Sealing:</strong> Odor-emitting foodstuffs (crayfish, stockfish, dried catfish) must be double vacuum-bagged and wrapped with shrink plastic wrap before boxing.</li>
                <li><strong>Heavy-Duty Adhesive Tape:</strong> Reinforce all seams using the H-taping method along top and bottom flaps.</li>
                <li><strong>Clear Address &amp; Postcode Labelling:</strong> Clearly write the recipient's UK phone number, full street address, and valid UK postcode on two sides of the outer carton.</li>
              </ul>
            </section>

            {/* Section 6: Step-by-Step Walkthrough */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Step-by-Step: How to Ship from Nigeria to the UK with County Cargo
              </h2>

              <div className="space-y-4 not-prose my-6">
                <div className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-gray-50/50">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Get an Online Estimate or Contact Us</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Use the County Cargo Central Quotation Calculator or message our customer care team on WhatsApp (+234 811 000 0421). Provide the estimated weight, item description, and your UK destination city or postcode.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-gray-50/50">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Drop Off Your Goods or Schedule a Pickup</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Bring your goods to our Lagos Hub (Ladipo-Oshodi Commercial Plaza) or Abuja Hub (Wuye Ultra Modern Market). Alternatively, request our convenient metropolitan doorstep collection in Lagos or Abuja.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-gray-50/50">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Weighing, Manifest Inspection &amp; Invoicing</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Our intake specialists weigh and measure your parcels in your presence (or with photo verification), check items for customs compliance, issue an official consignment invoice, and assign your unique tracking reference.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-gray-50/50">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Export Customs Clearance &amp; Scheduled Flight</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Your consignment is palletized, cleared through Nigerian export customs scanning at Murtala Muhammed International Airport (LOS) or Nnamdi Azikiwe International Airport (ABV), and dispatched on scheduled commercial or cargo flights.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-gray-50/50">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">UK Arrival, Customs Release &amp; Doorstep Delivery</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Upon arrival in the UK, cargo undergoes customs processing and is sorted into our central distribution depots (Liverpool Queens Dock L1 / London Charlton SE7). Your recipient receives collection notice or our courier dispatches the parcel directly to their doorstep.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: UK Nationwide Coverage */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Delivering to Every Corner of the United Kingdom
              </h2>
              <p>
                Whether your recipient resides in inner London or remote regions of the UK, County Cargo ensures uninterrupted connectivity:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose my-6 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Greater London:</strong> Charlton Depot &amp; All Boroughs</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Liverpool &amp; Merseyside:</strong> Queens Dock Depot (L1)</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Manchester &amp; Salford:</strong> Full Metro Delivery</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Birmingham &amp; Midlands:</strong> Daily Courier Linehauls</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Leeds &amp; Yorkshire:</strong> Residential &amp; Commercial</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Scotland &amp; Wales:</strong> Glasgow, Edinburgh, Cardiff</span>
                </div>
              </div>
            </section>

            {/* Section 8: FAQ Accordion */}
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

            {/* Section 9: Call to Action */}
            <section className="mt-12 p-8 bg-gradient-to-br from-primary via-blue-900 to-slate-900 text-white rounded-2xl not-prose shadow-xl text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    Ready to Ship from Nigeria to the UK?
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Get an instant quote with our export calculator or chat with our team in Lagos, Abuja, or the UK on WhatsApp.
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
                      Calculate Export Rate
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                    <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo,%20I%20would%20like%20to%20ship%20goods%20from%20Nigeria%20to%20the%20UK.%20Please%20provide%20guidance." target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
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
