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
  CheckCircle2,
  MapPin,
  FileText,
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
  XCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Export from Abuja to the USA: Rates, Delivery Times & Complete Guide | County Cargo',
  description:
    'Complete guide to exporting and shipping parcels, dried foodstuffs, Nigerian fashion, and commercial cargo from Abuja (FCT) to the United States. Value air cargo from ₦17,000/kg (10kg min) and Express courier from ₦55,000/kg (3–5 days).',
  keywords:
    'export from abuja to usa, ship from abuja to us, abuja to usa cargo rates, send parcel from abuja to america, shipping foodstuff from abuja to us, county cargo abuja wuye office',
  alternates: {
    canonical: 'https://countycargo.com/blog/export-from-abuja-to-usa',
  },
  openGraph: {
    title: 'Export from Abuja to the USA: Rates, Delivery Times & Complete Guide | County Cargo',
    description:
      'Ship packages, dried foodstuffs, fashion, and commercial cargo from our Wuye, Abuja hub to any US state. Transparent per-kg rates and tracked US doorstep delivery.',
    url: 'https://countycargo.com/blog/export-from-abuja-to-usa',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-11-20T09:00:00.000Z',
    modifiedTime: '2026-11-20T09:00:00.000Z',
    authors: ['County Cargo Abuja & Transatlantic Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/export-from-abuja-to-usa.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo Abuja Hub weighing and preparing export cargo from Abuja to the USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Export from Abuja to the USA: Rates, Delivery Times & Step-by-Step Guide',
    description:
      'Everything individuals, families, and SMEs in Abuja need to export foodstuffs, fashion, documents, and cargo to all 50 US states.',
    images: ['https://countycargo.com/images/blog/export-from-abuja-to-usa.jpg'],
  },
};

const faqs = [
  {
    question: 'How much does it cost to export from Abuja to the USA?',
    answer:
      'Our Value Air Cargo rate from Abuja to the United States is ₦17,000 per kilogram (which includes domestic Abuja-to-airport linehaul and export clearance) with a 10kg minimum chargeable weight. For urgent documents and lightweight parcels starting from 1kg, our Express Priority Air Courier starts from ₦55,000/kg with delivery in 3–5 working days.',
  },
  {
    question: 'Where is the County Cargo drop-off office in Abuja?',
    answer:
      "Our Abuja receiving and dispatch hub is located at Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT. You can also request citywide doorstep pickup across Wuse, Garki, Maitama, Asokoro, Gwarinpa, Jabi, Utako, Kubwa, Lugbe, and Apo, or call +234 811 000 0423.",
  },
  {
    question: 'How long does shipping from Abuja to the US take?',
    answer:
      'Express Priority Courier from Abuja to US cities takes 3–5 working days. Value Air Cargo takes approximately 5–10 working days from departure, including consolidation and US port clearance.',
  },
  {
    question: 'Can I export Nigerian foodstuffs from Abuja to the United States?',
    answer:
      'Yes. Properly dehydrated, non-perishable Nigerian foodstuffs—such as garri, dried crayfish, smoked dried fish, egusi, ogbono, suya spice (yaji), dried bitterleaf, and packaged snacks—can be exported when sealed in airtight transparent bags and clearly labelled in English for US FDA and CBP inspection. Fresh meat, dairy, wet pastes, and perishable foods are strictly prohibited.',
  },
  {
    question: 'Which US cities and states do you deliver to from Abuja?',
    answer:
      'We deliver door-to-door across all 50 US states based on the recipient’s ZIP code, including Houston, Dallas, Irving (where our Texas hub is located at 500 S Belt Line Road, Suite 508, Irving, TX 75060), Atlanta, New York City, Newark, Baltimore, Maryland, Washington D.C., Chicago, and Los Angeles.',
  },
];

export default function ExportFromAbujaToUsaPage() {
  const articleUrl = 'https://countycargo.com/blog/export-from-abuja-to-usa';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Export from Abuja to the USA', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'How to Export and Ship from Abuja to the USA: Rates, Delivery Times & Step-by-Step Guide',
        description:
          'Complete guide to exporting parcels, dried foodstuffs, Nigerian fashion, and commercial cargo from Abuja (FCT) to the United States with County Cargo.',
        image: 'https://countycargo.com/images/blog/export-from-abuja-to-usa.jpg',
        datePublished: '2026-11-20T09:00:00.000Z',
        dateModified: '2026-11-20T09:00:00.000Z',
        inLanguage: 'en-US',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Abuja & Transatlantic Logistics Team',
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
              { label: 'Export from Abuja to the USA' },
            ]}
          />

          {/* Header */}
          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Abuja Export Guide &bull; Abuja &rarr; United States
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated November 2026
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Verified Abuja Hub Rates
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              How to Export and Ship from Abuja to the USA: Rates, Delivery Times &amp; Step-by-Step Guide
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Everything individuals, families, and SMEs in Abuja (FCT) need to export dried Nigerian foodstuffs, bespoke fashion, documents, and commercial cargo from our Wuye office to any US state.
            </p>

            <div className="mt-6">
              <SocialShare
                title="How to Export and Ship from Abuja to the USA: Rates, Delivery Times & Step-by-Step Guide"
                url={articleUrl}
              />
            </div>
          </header>

          {/* Featured 16:9 Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/export-from-abuja-to-usa.jpg"
              alt="County Cargo Abuja Hub team weighing and scanning export cartons heading from Abuja to the USA"
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
              Abuja to United States Export Snapshot
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Abuja Value Air</p>
                <p className="text-xl font-extrabold text-primary mt-1">₦17,000/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 10kg &bull; 5–10 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Express Courier</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">From ₦55k/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 1kg &bull; 3–5 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Abuja Drop-Off</p>
                <p className="text-xl font-extrabold text-blue-800 mt-1">Wuye Market</p>
                <p className="text-xs text-gray-500 mt-0.5">Shop HF426, Abuja-FCT</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">US Final Mile</p>
                <p className="text-xl font-extrabold text-amber-700 mt-1">All 50 States</p>
                <p className="text-xs text-gray-500 mt-0.5">ZIP Code Doorstep / TX Hub</p>
              </div>
            </div>
          </section>

          {/* Main Body */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            {/* Section 1: Introduction & Abuja Hub */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Seamless Exporting from Abuja (FCT) to America
              </h2>
              <p>
                Whether you run a fashion house in Wuse II or Gwarinpa fulfilling bespoke Aso-Ebi orders for clients in Houston and Atlanta, a family in Maitama or Asokoro sending dried Nigerian food provisions to students in Maryland or New York, or an Abuja business dispatching commercial samples, exporting from Abuja to the United States is simple when you work with a dedicated international air cargo operator.
              </p>
              <p>
                With <strong>County Cargo&apos;s Abuja Hub</strong> located inside <strong>Wuye Ultra Modern Market</strong>—and our US receiving warehouse in <strong>Irving, Texas (500 S Belt Line Road, Suite 508, Irving, TX 75060)</strong>—customers across the Federal Capital Territory and neighbouring North-Central states enjoy direct local drop-off, optional citywide pickup, full US customs documentation support, and tracked delivery across all 50 US states.
              </p>

              <div className="bg-blue-50 border-l-4 border-primary rounded-r-xl p-6 my-6 not-prose">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">
                      County Cargo Abuja Export Hub — Wuye Ultra Modern Market
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-1">
                      <strong>Address:</strong> Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      <strong>Telephone:</strong>{' '}
                      <a href="tel:+2348110000423" className="text-primary font-semibold hover:underline">
                        +234 811 000 0423
                      </a>{' '}
                      &nbsp;|&nbsp; <strong>Hours:</strong> Mon–Fri 9:00 AM – 5:00 PM, Sat 10:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Service Tiers */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Abuja to USA Air Export Options &amp; Pricing
              </h2>
              <p>
                Depending on the weight of your shipment and how quickly it needs to arrive in the United States, you can choose between our two air export tiers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="bg-white border-2 border-primary/30 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Best for 10kg+ Cargo
                    </span>
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Value Export Shipping (Abuja to USA)</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-primary">₦17,000</span>
                    <span className="text-gray-500 text-sm"> / kg (Abuja origin)</span>
                    <p className="text-sm text-gray-600 mt-1 font-medium">Includes Abuja-to-airport linehaul &amp; export handling</p>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-700 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Transit Time:</strong> 5–10 working days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Minimum Chargeable Weight:</strong> 10 kg (₦170,000 minimum from Abuja)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Best For:</strong> Cartons of dried Nigerian foodstuffs, fashion &amp; Aso-Ebi, shea butter, personal effects, and SME inventory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>US Delivery:</strong> ZIP-code doorstep delivery across all 50 states or collection at our Irving, Texas hub</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    <Link href="/export-from-nigeria">Calculate Abuja to USA Quote</Link>
                  </Button>
                </div>

                <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-6 shadow-sm hover:border-emerald-500 transition-colors flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Fastest 3–5 Days
                    </span>
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Express Priority Air Courier</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-emerald-700">From ₦55,000</span>
                    <span className="text-gray-500 text-sm"> / kg</span>
                    <p className="text-sm text-gray-600 mt-1 font-medium">Priority Doorstep Courier from 1kg</p>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-700 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Transit Time:</strong> 3–5 working days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Minimum Chargeable Weight:</strong> 1 kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Best For:</strong> Urgent academic transcripts, legal/corporate documents, wedding outfits, samples, and parcels under 10kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Tracking:</strong> End-to-end milestone tracking directly to the recipient’s US doorstep</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold">
                    <Link href="/export-from-nigeria">Get Express Quote</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Section 3: Step-by-Step Abuja Export Process */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                5 Simple Steps to Ship from Abuja to the USA
              </h2>
              <div className="space-y-4 not-prose my-6">
                {[
                  {
                    num: '1',
                    title: 'Prepare Your Items & Packing List',
                    desc: 'Write a clear itemised list of contents, quantities, and values. Ensure all foodstuffs are 100% dry, double-sealed in transparent airtight bags, and labelled in English.',
                  },
                  {
                    num: '2',
                    title: 'Drop Off at Our Wuye Abuja Hub or Request Pickup',
                    desc: "Visit Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT, or call +234 811 000 0423 to arrange citywide pickup across Abuja.",
                  },
                  {
                    num: '3',
                    title: 'Compliance Inspection & Chargeable Weight Check',
                    desc: 'Our Abuja team verifies that every item meets US CBP/FDA standards and records both actual scale weight and volumetric weight ((L × W × H in cm) ÷ 5,000).',
                  },
                  {
                    num: '4',
                    title: 'Confirm Service Tier & Complete Payment',
                    desc: 'Select Value Air Cargo (₦17,000/kg, 10kg min) or 3–5 day Express Courier (from ₦55,000/kg, 1kg min), provide the recipient’s full US street address, ZIP code, email, and phone number, and pay your invoice.',
                  },
                  {
                    num: '5',
                    title: 'Track Your Shipment to US Doorstep Delivery',
                    desc: 'Receive your tracking reference and monitor your shipment through export departure, US customs clearance, and final-mile delivery across all 50 states.',
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="p-5 bg-slate-50 border border-gray-200 rounded-xl flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{step.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: US Customs & FDA Foodstuff Rules */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                US Customs (CBP) &amp; FDA Foodstuff Rules for Abuja Exporters
              </h2>
              <p>
                Shipments arriving in the United States are inspected by <strong>US Customs and Border Protection (CBP)</strong> and regulated by the <strong>US Food and Drug Administration (FDA)</strong>. Preparing your items properly at our Abuja hub prevents delays or seizures:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Accepted Exports from Abuja to USA</span>
                  </div>
                  <ul className="text-sm text-emerald-950 space-y-2">
                    <li>&bull; <strong>Dehydrated Foodstuffs:</strong> Garri, poundo yam flour, egusi, ogbono, dried crayfish, smoked dried catfish/stockfish, suya spice (yaji), dried pepper, and locust beans (iru/dadawa).</li>
                    <li>&bull; <strong>Fashion &amp; Textiles:</strong> Bespoke senator suits, Aso-Ebi, Ankara fabrics, bridal outfits, shoes, and bags.</li>
                    <li>&bull; <strong>Natural &amp; Agro Products:</strong> Leak-proof sealed shea butter, black soap, moringa, and zobo (hibiscus) leaves.</li>
                    <li>&bull; <strong>Documents &amp; Personal Effects:</strong> Academic transcripts, certificates, books, and clothing.</li>
                  </ul>
                </div>

                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-rose-900 font-bold">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Prohibited Items (Not Accepted)</span>
                  </div>
                  <ul className="text-sm text-rose-950 space-y-2">
                    <li>&bull; <strong>Fresh or Frozen Meat &amp; Poultry:</strong> Fresh beef, goat, chicken, or bushmeat.</li>
                    <li>&bull; <strong>Perishable Produce &amp; Dairy:</strong> Fresh fruits, raw tubers with soil, wet pastes, or unpasteurised dairy.</li>
                    <li>&bull; <strong>Dangerous Goods:</strong> Flammable liquids, aerosols, loose lithium batteries, explosives, and hazardous chemicals.</li>
                    <li>&bull; <strong>Restricted Valuables &amp; Contraband:</strong> Cash/currency, narcotics, firearms, and counterfeit goods.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: FAQs */}
            <section className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Frequently Asked Questions: Abuja to USA Export
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

            {/* CTA Banner */}
            <section className="mt-12 p-8 bg-gradient-to-br from-primary via-blue-900 to-slate-900 text-white rounded-2xl not-prose shadow-xl text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    Ready to Export from Abuja to the USA?
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Visit our Abuja Hub at Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, or calculate your shipping quote online now.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-400" /> Abuja Hub: <strong className="text-white">+234 811 000 0423</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-emerald-400" /> Portal: <strong className="text-white">ship.countycargo.com</strong>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/export-from-nigeria">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate US Rate
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                    <Link href="/blog/export-from-abuja-to-uk">
                      Abuja to UK Guide
                    </Link>
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
