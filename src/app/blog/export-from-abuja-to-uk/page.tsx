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
  HelpCircle,
  Truck,
  Zap,
  Check,
  Phone,
  Calculator,
  ExternalLink,
  DollarSign,
  XCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Export from Abuja to the UK: Rates, Express Options & Complete Guide | County Cargo',
  description:
    'Complete guide to exporting and shipping parcels, dried foodstuffs, Nigerian fashion, and commercial cargo from Abuja (FCT) to the United Kingdom. Value air cargo from ₦11,500/kg (10kg min, 5–10 days) and Express options.',
  keywords:
    'export from abuja to uk, ship from abuja to uk, abuja to uk cargo rates, send parcel from abuja to london, shipping foodstuff from abuja to uk, county cargo abuja wuye office',
  alternates: {
    canonical: 'https://countycargo.com/blog/export-from-abuja-to-uk',
  },
  openGraph: {
    title: 'Export from Abuja to the UK: Rates, Express Options & Complete Guide | County Cargo',
    description:
      'Ship from Abuja to London, Manchester, Birmingham, Liverpool, and across the UK. Value Air Cargo from ₦11,500/kg (10kg min) and 3–5 day Express courier options.',
    url: 'https://countycargo.com/blog/export-from-abuja-to-uk',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-11-20T09:00:00.000Z',
    modifiedTime: '2026-11-20T09:00:00.000Z',
    authors: ['County Cargo Abuja & UK Trade Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/export-from-abuja-to-uk.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo Abuja Hub team preparing air export parcels from Abuja to the UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Export from Abuja to the UK: Rates, Express Options & Complete Guide',
    description:
      'Send foodstuffs, Nigerian fashion, student packages, and business cargo from Abuja across the UK with transparent rates and tracked delivery.',
    images: ['https://countycargo.com/images/blog/export-from-abuja-to-uk.jpg'],
  },
};

const faqs = [
  {
    question: 'How much does it cost to export from Abuja to the UK?',
    answer:
      'Value Air Cargo from Abuja to the UK starts from ₦11,500 per kilogram (₦10,500/kg base Nigeria-to-UK rate plus the Abuja linehaul component) with a 10kg minimum chargeable weight and 5–10 working days delivery. For urgent shipments starting from 1kg, Express Priority Courier starts from ₦55,000/kg (3–5 working days), and 48-hour express options (£24.00/kg + £20 handling) are also available.',
  },
  {
    question: 'Where can I drop off packages in Abuja for UK shipping?',
    answer:
      "Visit our Abuja receiving hub at Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT, or call +234 811 000 0423 to arrange citywide doorstep pickup across Wuse, Garki, Maitama, Asokoro, Gwarinpa, Jabi, Utako, Kubwa, Lugbe, and Apo.",
  },
  {
    question: 'How long does shipping from Abuja to the UK take?',
    answer:
      'Value Air Cargo from Abuja to the UK takes 5–10 working days. Express Priority Courier delivers in 3–5 working days, and 48hrs Express service delivers in 2 working days.',
  },
  {
    question: 'Can I send Nigerian foodstuffs from Abuja to the UK?',
    answer:
      'Yes. Dehydrated, non-perishable Nigerian foodstuffs such as garri, dried crayfish, egusi, ogbono, dried pepper, suya spice (yaji), locust beans, and packaged snacks can be exported when properly dried, sealed in transparent airtight bags, and labelled in English in compliance with UK DEFRA and Border Force regulations.',
  },
  {
    question: 'Do you deliver to UK residential and student addresses outside London?',
    answer:
      'Yes. In addition to collection at our Liverpool UK Hub (Unit G6, 67-83 Queens Dock Commercial Centre, Norfolk Street, Liverpool, L1 0BG), we arrange postcode-based doorstep delivery to London, Manchester, Birmingham, Leeds, Sheffield, Nottingham, Leicester, Coventry, Milton Keynes, Bristol, Cardiff, Glasgow, Edinburgh, and all UK postcodes.',
  },
];

export default function ExportFromAbujaToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/export-from-abuja-to-uk';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Export from Abuja to the UK', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Exporting and Shipping from Abuja to the UK: Costs, Express Options & Complete Guide',
        description:
          'Complete guide to exporting parcels, dried foodstuffs, Nigerian fashion, and commercial cargo from Abuja (FCT) to the United Kingdom with County Cargo.',
        image: 'https://countycargo.com/images/blog/export-from-abuja-to-uk.jpg',
        datePublished: '2026-11-20T09:00:00.000Z',
        dateModified: '2026-11-20T09:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Abuja & UK Trade Logistics Team',
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
              { label: 'Export from Abuja to the UK' },
            ]}
          />

          {/* Header */}
          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Abuja Export Guide &bull; Abuja &rarr; United Kingdom
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
              Exporting and Shipping from Abuja to the UK: Costs, Express Options &amp; Complete Guide
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              How to send dried Nigerian foodstuffs, bespoke fashion, student care packages, and commercial cargo from our Wuye, Abuja hub to London, Manchester, Liverpool, Birmingham, and across the United Kingdom.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Exporting and Shipping from Abuja to the UK: Costs, Express Options & Complete Guide"
                url={articleUrl}
              />
            </div>
          </header>

          {/* Featured 16:9 Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/export-from-abuja-to-uk.jpg"
              alt="County Cargo Abuja logistics team preparing air freight parcels from Abuja to the United Kingdom"
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
              Abuja to United Kingdom Export Snapshot
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Abuja Value Air</p>
                <p className="text-xl font-extrabold text-primary mt-1">₦11,500/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 10kg &bull; 5–10 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Express Courier</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">From ₦55k/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 1kg &bull; 3–5 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">48hrs Priority</p>
                <p className="text-xl font-extrabold text-blue-800 mt-1">£24.00/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 1kg &bull; +£20 Handling</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">UK Final Mile</p>
                <p className="text-xl font-extrabold text-amber-700 mt-1">UK Nationwide</p>
                <p className="text-xs text-gray-500 mt-0.5">Postcode Delivery / L1 Hub</p>
              </div>
            </div>
          </section>

          {/* Main Body */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            {/* Section 1: Introduction & Hubs */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Direct Air Freight from Abuja (FCT) to the United Kingdom
              </h2>
              <p>
                Thousands of families, students, tailors, and SMEs in Abuja ship regularly to the United Kingdom. Whether you are sending a semester care package of dried Nigerian food provisions to a student in Manchester or Coventry, shipping bespoke Aso-Ebi and bridal couture to clients in London, or exporting natural cosmetics and retail stock to Birmingham or Liverpool, County Cargo makes the entire Abuja-to-UK export journey predictable and transparent.
              </p>
              <p>
                With our local Abuja office inside <strong>Wuye Ultra Modern Market</strong> directly connected to our UK operations warehouse at <strong>Queens Dock Commercial Centre in Liverpool (L1 0BG)</strong>, you can drop off packages in Abuja or schedule citywide FCT collection and track your cargo right to your recipient&apos;s UK postcode.
              </p>

              <div className="bg-blue-50 border-l-4 border-primary rounded-r-xl p-6 my-6 not-prose">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                      County Cargo Abuja &amp; UK Receiving Hubs
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      <strong>Abuja Hub:</strong> Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT &nbsp;·&nbsp; Tel:{' '}
                      <a href="tel:+2348110000423" className="text-primary font-semibold hover:underline">
                        +234 811 000 0423
                      </a>
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      <strong>UK Warehouse Hub:</strong> Unit G6, 67-83 Queens Dock Commercial Centre, Norfolk Street, Liverpool, L1 0BG, United Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Pricing & Service Tiers */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Abuja to UK Shipping Rates &amp; Delivery Tiers
              </h2>
              <p>
                Choose the service tier that fits your shipment weight, delivery timeline, and budget:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="bg-white border-2 border-primary/30 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Most Economical (10kg+)
                    </span>
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Value Air Cargo (Abuja to UK)</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-primary">₦11,500</span>
                    <span className="text-gray-500 text-sm"> / kg (Abuja origin)</span>
                    <p className="text-sm text-gray-600 mt-1 font-medium">₦10,500/kg from Lagos &bull; Includes Abuja linehaul</p>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-700 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Transit Time:</strong> 5–10 working days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Minimum Chargeable Weight:</strong> 10 kg (₦115,000 minimum from Abuja)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Best For:</strong> Dried Nigerian foodstuffs, student provisions, fashion &amp; Aso-Ebi, personal belongings, and retail inventory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>UK Handover:</strong> Postcode-based UK doorstep delivery or collection at our Liverpool warehouse</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    <Link href="/shipping-from-nigeria-to-uk">Calculate Abuja to UK Rate</Link>
                  </Button>
                </div>

                <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-6 shadow-sm hover:border-emerald-500 transition-colors flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Fastest Express (From 1kg)
                    </span>
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Express Courier &amp; 48hrs Priority</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-emerald-700">From ₦55,000</span>
                    <span className="text-gray-500 text-sm"> / kg (3–5 Days)</span>
                    <p className="text-sm text-gray-600 mt-1 font-medium">Or 48hrs Express at £24.00/kg + £20 handling</p>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-700 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Transit Time:</strong> 2 working days (48hrs Express) or 3–5 working days (DHL Express)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Minimum Chargeable Weight:</strong> 1 kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Best For:</strong> Urgent documents, certificates, last-minute bridal/event outfits, commercial samples, and lightweight parcels under 10kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><strong>Tracking:</strong> Real-time online tracking right to the UK recipient’s door</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold">
                    <Link href="/shipping-from-nigeria-to-uk">Book Express to UK</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Section 3: Step-by-Step Booking Process */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                How to Ship from Abuja to the UK in 5 Steps
              </h2>
              <div className="space-y-4 not-prose my-6">
                {[
                  {
                    num: '1',
                    title: 'Prepare Your Items & Packing List',
                    desc: 'Create an accurate packing list with item descriptions, quantities, and values. Make sure all food items are completely dry, sealed in airtight bags, and labelled in English.',
                  },
                  {
                    num: '2',
                    title: 'Visit Our Wuye Abuja Hub or Request Pickup',
                    desc: "Bring your goods to Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT, or call +234 811 000 0423 to arrange citywide pickup across Abuja.",
                  },
                  {
                    num: '3',
                    title: 'Export Inspection & Chargeable Weight Check',
                    desc: 'Our Abuja team checks your items for UK DEFRA/HMRC compliance and measures both actual scale weight and volumetric weight ((L × W × H in cm) ÷ 5,000).',
                  },
                  {
                    num: '4',
                    title: 'Select Service Tier & Pay Invoice',
                    desc: 'Choose Value Air Cargo (₦11,500/kg, 10kg min), 3–5 day Express Courier (from ₦55,000/kg, 1kg min), or 48hrs Express (£24/kg + £20 handling), confirm the UK postcode, and complete payment.',
                  },
                  {
                    num: '5',
                    title: 'Track to UK Doorstep or Liverpool Hub Collection',
                    desc: 'Follow your tracking updates as your shipment departs Nigeria, clears UK customs, and is delivered to your recipient across England, Scotland, Wales, or Northern Ireland.',
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

            {/* Section 4: UK DEFRA & HMRC Rules */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                UK Customs (HMRC) &amp; DEFRA Foodstuff Packaging Rules
              </h2>
              <p>
                All cargo entering the United Kingdom is screened by <strong>UK Border Force</strong>, <strong>HM Revenue &amp; Customs (HMRC)</strong>, and <strong>DEFRA</strong>. Following these rules ensures fast customs release:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Permitted Exports from Abuja to UK</span>
                  </div>
                  <ul className="text-sm text-emerald-950 space-y-2">
                    <li>&bull; <strong>Dry Nigerian Staples:</strong> Garri, poundo yam flour, egusi, ogbono, dried crayfish, dried pepper, suya spice (yaji), locust beans, and packaged snacks (within DEFRA personal/commercial allowances).</li>
                    <li>&bull; <strong>Nigerian Fashion &amp; Textiles:</strong> Aso-Ebi, Ankara, bespoke agbada and senator suits, bridal gowns, shoes, and handbags.</li>
                    <li>&bull; <strong>Natural Cosmetics &amp; Crafts:</strong> Sealed shea butter, black soap, hair care products, artwork, and books.</li>
                    <li>&bull; <strong>Documents &amp; Student Packages:</strong> Certificates, contracts, and personal clothing.</li>
                  </ul>
                </div>

                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-rose-900 font-bold">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Strictly Prohibited by UK Border Force</span>
                  </div>
                  <ul className="text-sm text-rose-950 space-y-2">
                    <li>&bull; <strong>Meat &amp; Dairy Products:</strong> Fresh, frozen, or prohibited meat and dairy items restricted under UK DEFRA biosecurity rules.</li>
                    <li>&bull; <strong>Perishable &amp; Wet Foods:</strong> Unsealed palm oil in fragile containers, fresh vegetables, raw tubers with soil, or spoiling foods.</li>
                    <li>&bull; <strong>Hazardous &amp; Dangerous Goods:</strong> Flammable liquids, aerosols, loose lithium batteries, and toxic chemicals.</li>
                    <li>&bull; <strong>Prohibited Items:</strong> Cash/currency, narcotics, firearms, weapons, and counterfeit branded goods.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: FAQs */}
            <section className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Frequently Asked Questions: Abuja to UK Export
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
                    Start Shipping from Abuja to the UK Today
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Drop off at our Abuja Hub (Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market) or calculate your instant UK quote online.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-400" /> Abuja Hub: <strong className="text-white">+234 811 000 0423</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-emerald-400" /> UK Hub: <strong className="text-white">Queens Dock, Liverpool (L1 0BG)</strong>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-nigeria-to-uk">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate UK Rate
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                    <Link href="/blog/export-from-abuja-to-usa">
                      Abuja to USA Guide
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
