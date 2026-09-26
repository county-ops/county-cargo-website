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
  Ship,
  Zap,
  Scale,
  Check,
  Phone,
  Calculator,
  ExternalLink,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from UK to Nigeria: Reliable UK to Lagos & Abuja Cargo Services | County Cargo',
  description:
    'County Cargo provides reliable shipping from the UK to Nigeria. Standard air cargo to Lagos (£6.00/kg) & Abuja (£6.50/kg), Express air (3–5 days), 48-Hour Special Express, and Sea freight from £4.00/kg.',
  keywords:
    'Shipping from UK to Nigeria, cargo from UK to Nigeria, UK to Lagos cargo, UK to Abuja cargo, shipping from UK to Lagos, shipping from UK to Abuja, air cargo UK to Nigeria, sea cargo UK to Nigeria, express shipping UK to Nigeria, cheap shipping UK to Nigeria, County Cargo UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-uk-to-nigeria-reliable-uk-to-lagos-abuja-cargo-services',
  },
  openGraph: {
    title: 'Shipping from UK to Nigeria: Reliable UK to Lagos & Abuja Cargo Services',
    description:
      'Looking for a reliable way to ship from the UK to Nigeria? County Cargo provides air cargo to Lagos (£6.00/kg) and Abuja (£6.50/kg), Express courier, and sea freight.',
    url: 'https://countycargo.com/blog/shipping-from-uk-to-nigeria-reliable-uk-to-lagos-abuja-cargo-services',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo UK Trade Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/shipping-from-uk-to-nigeria-reliable-cargo-services.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo shipping aircraft and logistics hub for UK to Nigeria freight services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping from UK to Nigeria: Reliable UK to Lagos & Abuja Cargo Services',
    description:
      'Reliable UK to Nigeria cargo services with County Cargo. Standard air cargo from £6.00/kg, Express options, and cost-effective sea shipping.',
    images: ['https://countycargo.com/images/blog/shipping-from-uk-to-nigeria-reliable-cargo-services.jpg'],
  },
};

const faqs = [
  {
    question: 'How much does shipping from the UK to Nigeria cost with County Cargo?',
    answer:
      'Standard air cargo to Lagos is £6.00 per kg + £15 handling. Standard air cargo to Abuja is £6.50 per kg + £15 handling. Express air cargo is £22.00/kg to Lagos and £23.00/kg to Abuja (+ £15 handling). Sea cargo starts from £4.00 per kg with a 30 kg minimum shipment. The exact price depends on your chosen destination, weight, service tier, and cargo type.',
  },
  {
    question: 'How long does delivery take from the UK to Nigeria?',
    answer:
      'Estimated delivery timelines depend on the service: Standard Air Cargo takes 5–10 working days; Express Air Cargo delivers in 3–5 working days; 48-Hour Special Express provides accelerated connections for eligible urgent shipments; and Sea Cargo takes approximately 30–45 working days from vessel sailing.',
  },
  {
    question: 'Can I ship cargo directly from the UK to Abuja without going through Lagos?',
    answer:
      'Yes. County Cargo provides dedicated UK to Abuja shipping services. Instead of having to arrange your shipment to Lagos and independently organise onward transportation to Abuja, you can select Abuja directly as your final destination during booking.',
  },
  {
    question: 'What items can I send from the UK to Nigeria?',
    answer:
      'Permitted items include personal belongings, clothing, shoes, household goods, books, educational supplies, approved commercial merchandise, electronics, and gifts. Items like aerosols, perfumes, and certain loose lithium batteries may be restricted or require special declaration. Customers must always accurately declare all contents.',
  },
  {
    question: 'What is the minimum weight requirement for sea cargo to Nigeria?',
    answer:
      'County Cargo’s UK sea cargo service has a minimum shipment weight of 30 kg and starts from £4.00 per kg, making it ideal for heavier personal belongings, commercial merchandise, and bulky household items.',
  },
  {
    question: 'How do I start a shipment with County Cargo?',
    answer:
      'Prepare your items and ensure everything is accurately declared. Choose your Nigerian destination (Lagos or Abuja), select your preferred shipping tier (Standard Air, Express, 48-Hour Special Express, or Sea Freight), use our online shipping calculator at countycargo.com to obtain an instant quote, and complete your booking. You can also reach our UK support team directly at +44 7405 556668.',
  },
];

export default function ShippingUkToNigeriaReliablePage() {
  const articleUrl =
    'https://countycargo.com/blog/shipping-from-uk-to-nigeria-reliable-uk-to-lagos-abuja-cargo-services';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
            name: 'Blog',
            item: 'https://countycargo.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Shipping from UK to Nigeria: Reliable UK to Lagos & Abuja Cargo Services',
            item: articleUrl,
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline:
          'Shipping from UK to Nigeria: Reliable UK to Lagos & Abuja Cargo Services',
        description:
          'Looking for a reliable way to ship from the UK to Nigeria? County Cargo provides international cargo and shipping services connecting the UK with Lagos and Abuja.',
        image:
          'https://countycargo.com/images/blog/shipping-from-uk-to-nigeria-reliable-cargo-services.jpg',
        datePublished: '2026-09-26T08:00:00+01:00',
        dateModified: '2026-09-26T08:00:00+01:00',
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
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={combinedSchema} />
      <Header />

      <main className="pt-20 sm:pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Shipping from UK to Nigeria' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                United Kingdom &rarr; Nigeria Cargo Services
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Direct Lagos &amp; Abuja Routes
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Shipping from UK to Nigeria: Reliable UK to Lagos &amp; Abuja Cargo Services
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Looking for a reliable way to ship from the UK to Nigeria?
            </p>

            <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
              County Cargo provides international cargo and shipping services connecting the United Kingdom with Nigeria, including regular shipments from the <strong>UK to Lagos</strong> and <strong>UK to Abuja</strong>.
            </p>

            <p className="mt-2 text-base text-gray-600 leading-relaxed">
              Whether you are sending personal belongings, business goods, family packages or larger cargo, County Cargo provides practical shipping options designed to make sending goods from the United Kingdom to Nigeria straightforward.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Shipping from UK to Nigeria: Reliable UK to Lagos & Abuja Cargo Services"
                url={articleUrl}
              />
            </div>
          </header>

          {/* Featured Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/shipping-from-uk-to-nigeria-reliable-cargo-services.jpg"
              alt="County Cargo aircraft and cargo warehouse handling UK to Nigeria shipments"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Service Snapshot Cards */}
          <section
            aria-label="Route Snapshot"
            className="mb-12 bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/50 border border-blue-200/70 rounded-2xl p-6 sm:p-8 shadow-xs"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Service Snapshot: UK to Nigeria Shipping Options
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">UK &rarr; Lagos Air</p>
                <p className="text-xl font-extrabold text-primary mt-1">£6.00/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">+ £15 handling (5–10 days)</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">UK &rarr; Abuja Air</p>
                <p className="text-xl font-extrabold text-blue-700 mt-1">£6.50/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">+ £15 handling (5–10 days)</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Express Courier</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">From £22/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">3–5 working days</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">UK Sea Freight</p>
                <p className="text-xl font-extrabold text-amber-700 mt-1">£4.00/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 30 kg (30–45 days)</p>
              </div>
            </div>
          </section>

          {/* Article Main Body */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">

            {/* Section 1: Shipping from UK to Nigeria */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Shipping from UK to Nigeria
              </h2>
              <p>
                Shipping between the United Kingdom and Nigeria is one of County Cargo’s core services.
              </p>
              <p>
                We understand that customers want more than simply getting a parcel from one country to another. They want clear pricing, dependable handling, realistic delivery expectations and a company they can contact when they need assistance.
              </p>
              <p>
                County Cargo accepts cargo in the UK for shipment to Nigeria, with services covering both <strong>Lagos</strong> and <strong>Abuja</strong>.
              </p>
            </section>

            {/* Section 2: UK to Nigeria Air Cargo */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                UK to Nigeria Air Cargo
              </h2>
              <p>
                For customers who need their goods in Nigeria relatively quickly, our regular air cargo service provides a convenient option.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose my-6">
                <div className="bg-white border-2 border-primary/20 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      Commercial Capital
                    </span>
                    <Plane className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">UK to Lagos</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-baseline py-1 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Freight Rate:</span>
                      <strong className="text-base text-gray-900">£6.00 per kg</strong>
                    </div>
                    <div className="flex justify-between items-baseline py-1 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Handling Fee:</span>
                      <strong className="text-base text-gray-900">£15 per consignment</strong>
                    </div>
                    <div className="flex justify-between items-baseline py-1">
                      <span className="text-sm text-gray-600">Estimated Delivery:</span>
                      <strong className="text-base text-emerald-700">5–10 working days</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-blue-500/20 rounded-2xl p-6 shadow-sm hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                      Federal Capital Territory
                    </span>
                    <Plane className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">UK to Abuja</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-baseline py-1 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Freight Rate:</span>
                      <strong className="text-base text-gray-900">£6.50 per kg</strong>
                    </div>
                    <div className="flex justify-between items-baseline py-1 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Handling Fee:</span>
                      <strong className="text-base text-gray-900">£15 per consignment</strong>
                    </div>
                    <div className="flex justify-between items-baseline py-1">
                      <span className="text-sm text-gray-600">Estimated Delivery:</span>
                      <strong className="text-base text-emerald-700">5–10 working days</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-900 text-sm flex items-start gap-3 not-prose">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Delivery notice:</strong> Delivery times are estimates and may be affected by airline schedules, customs processing, clearance and other circumstances outside the direct control of County Cargo.
                </p>
              </div>
            </section>

            {/* Section 3: Shipping from UK to Lagos */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Shipping from UK to Lagos
              </h2>
              <p>
                If you are searching for shipping from the UK to Lagos, County Cargo provides regular cargo services from the United Kingdom to Lagos, Nigeria.
              </p>
              <p>
                Customers can send a wide range of permitted goods, including personal effects, clothing, household items, business goods and other approved cargo.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose my-4">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Standard UK to Lagos Air Cargo Rate
                </p>
                <p className="text-2xl font-black text-gray-900 mt-1">
                  £6.00/kg <span className="text-base font-normal text-gray-600">+ £15 handling</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Estimated delivery is <strong>5–10 working days</strong>.
                </p>
              </div>
              <p>
                For customers who require a faster service, express shipping options may also be available depending on the type of goods being shipped.
              </p>
            </section>

            {/* Section 4: Shipping from UK to Abuja */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Shipping from UK to Abuja
              </h2>
              <p>
                County Cargo also provides dedicated UK to Abuja shipping services.
              </p>
              <p>
                Instead of having to arrange your shipment to Lagos and then independently organise onward transportation to Abuja, customers can select Abuja as their destination when arranging eligible shipments with County Cargo.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose my-4">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Standard UK to Abuja Air Cargo Rate
                </p>
                <p className="text-2xl font-black text-gray-900 mt-1">
                  £6.50/kg <span className="text-base font-normal text-gray-600">+ £15 handling</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Estimated delivery is <strong>5–10 working days</strong>.
                </p>
              </div>
              <p>
                This makes County Cargo a practical choice for individuals, families and businesses looking for cargo shipping from the United Kingdom directly to Abuja, Nigeria.
              </p>
            </section>

            {/* Section 5: Express Shipping from UK to Nigeria */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Express Shipping from UK to Nigeria
              </h2>
              <p>
                <strong>Need your shipment sooner?</strong>
              </p>
              <p>
                County Cargo provides express options for eligible cargo travelling from the UK to Nigeria.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose my-6">
                <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm uppercase tracking-wide mb-2">
                    <Zap className="w-4 h-4" /> Priority Express
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Express UK to Lagos</h3>
                  <p className="text-2xl font-black text-indigo-900 mt-2">
                    £22.00/kg <span className="text-sm font-normal text-gray-600">+ £15 handling</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Estimated delivery: <strong>3–5 working days</strong>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm uppercase tracking-wide mb-2">
                    <Zap className="w-4 h-4" /> Priority Express
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Express UK to Abuja</h3>
                  <p className="text-2xl font-black text-indigo-900 mt-2">
                    £23.00/kg <span className="text-sm font-normal text-gray-600">+ £15 handling</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Estimated delivery: <strong>3–5 working days</strong>
                  </p>
                </div>
              </div>

              <p>
                Express services are particularly useful for customers sending urgent documents, business items or time-sensitive permitted goods.
              </p>
            </section>

            {/* Section 6: 48-Hour Special Express */}
            <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white p-6 sm:p-8 rounded-2xl not-prose shadow-lg">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4" /> High-Priority Service
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                48-Hour Special Express from UK to Nigeria
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                For particularly urgent eligible shipments, County Cargo also offers a <strong>Special Express 48-Hour service</strong> between the UK and Nigeria.
              </p>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed mt-3">
                The service is designed for customers who need a significantly faster shipping option than standard air cargo.
              </p>
              <p className="text-blue-200 text-xs sm:text-sm mt-3 border-t border-white/10 pt-3">
                <em>Special Express is subject to cargo acceptance, operational schedules, customs requirements and service availability. Contact County Cargo before sending an urgent shipment so our team can confirm whether your goods qualify for the service.</em>
              </p>
              <div className="mt-5">
                <Button asChild size="sm" className="bg-white text-gray-900 hover:bg-blue-50 font-bold">
                  <a href="tel:+447405556668">
                    <Phone className="w-4 h-4 mr-2" /> Inquire About 48-Hour Express: +44 7405 556668
                  </a>
                </Button>
              </div>
            </section>

            {/* Section 7: Sea Cargo from UK to Nigeria */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Sea Cargo from UK to Nigeria
              </h2>
              <p>
                Not every shipment needs to travel by air.
              </p>
              <p>
                For heavier cargo and customers who are more concerned about cost than speed, sea shipping from the UK to Nigeria can provide a practical alternative.
              </p>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 not-prose my-6">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide mb-2">
                  <Ship className="w-4 h-4" /> Ocean Freight Service
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  UK Sea Cargo Service starts from: <span className="text-emerald-700">£4.00 per kg</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-100">
                    <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Minimum shipment:</strong> 30 kg</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-100">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Estimated transit period:</strong> 30–45 working days from sailing</span>
                  </div>
                </div>
              </div>

              <p>
                Sea freight can be particularly suitable for larger household goods, commercial cargo and heavier shipments where air freight may not be economical.
              </p>
            </section>

            {/* Section 8: What Can I Send from the UK to Nigeria? */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                What Can I Send from the UK to Nigeria?
              </h2>
              <p>
                The type of goods accepted depends on the shipping method, airline requirements, customs regulations and applicable restrictions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="p-6 bg-emerald-50/50 border border-emerald-200 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Permitted &amp; Common Shipments
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Clothing and personal effects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Shoes and fashion items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Household goods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Business and commercial goods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Books and educational materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Approved electronics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Gifts and family packages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Larger cargo suitable for sea freight</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-rose-50/50 border border-rose-200 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <AlertTriangle className="w-5 h-5 text-rose-600" /> Prohibited &amp; Restricted Items
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Some goods are prohibited or restricted under international civil aviation and customs laws:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">&times;</span>
                      <span>Aerosols, flammable sprays, and pressurized canisters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">&times;</span>
                      <span>Perfumes, aftershaves, and alcohol-based liquids</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">&times;</span>
                      <span>Certain loose lithium batteries and uncertified power banks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">&times;</span>
                      <span>Explosives, weapons, and hazardous chemicals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">&times;</span>
                      <span>Unaccompanied mystery packages from unknown third parties</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl not-prose space-y-2 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">Important Declaration Notice:</p>
                <p>
                  Customers should always declare exactly what is inside their shipment. Do not send mystery packages or accept goods from another person without knowing their contents.
                </p>
                <p>
                  If you are unsure whether an item can be shipped from the UK to Nigeria, contact County Cargo before bringing or sending the package.
                </p>
              </div>
            </section>

            {/* Section 9: Why Choose County Cargo */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Why Choose County Cargo for UK to Nigeria Shipping?
              </h2>
              <p>
                County Cargo specialises in shipping connections involving the United Kingdom, Nigeria and the United States.
              </p>
              <p>
                For UK to Nigeria customers, our focus is straightforward: provide clear shipping options, professional cargo handling and realistic information throughout the shipment process.
              </p>
              <p>
                Whether your destination is Lagos or Abuja, you can select the service that best suits the size, urgency and nature of your shipment.
              </p>
              <p>
                From regular air cargo and express shipping to larger sea-freight consignments, our aim is to give customers practical options rather than a one-size-fits-all shipping service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Clear, Transparent Rates
                  </h3>
                  <p className="text-xs text-gray-600">
                    Fixed per-kg rates with no hidden clearing charges at destination terminals.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Direct Lagos &amp; Abuja Hubs
                  </h3>
                  <p className="text-xs text-gray-600">
                    Ship directly to Abuja FCT without the delay of independent inter-state transit from Lagos.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Professional Handling
                  </h3>
                  <p className="text-xs text-gray-600">
                    Dedicated support teams in the UK and Nigeria ready to assist via telephone and WhatsApp.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 10: How to Ship from the UK to Nigeria */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                How to Ship from the UK to Nigeria with County Cargo
              </h2>
              <p>
                Getting started is simple. Follow these straightforward steps to send your goods:
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Prepare Your Goods</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Pack your items securely in robust boxes or luggage, and make sure everything inside the shipment is properly declared.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Choose Your Destination</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Select your Nigerian destination — <strong>Lagos</strong> or <strong>Abuja</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Select Your Shipping Service</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Pick the service that best suits your needs: Standard Air Cargo (5–10 days), Express Air (3–5 days), 48-Hour Special Express, or Sea Freight (30–45 days).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Get an Online Quote &amp; Book</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Use the County Cargo online shipping calculator to obtain an instant quote and follow the booking instructions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Dispatch &amp; Processing</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Once your cargo has been received and processed at our UK hub, it enters the appropriate shipment cycle for Nigeria.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 11: UK to Nigeria Shipping Cost */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                UK to Nigeria Shipping Cost
              </h2>
              <p>
                The cost of shipping from the UK to Nigeria depends mainly on:
              </p>
              <ul>
                <li><strong>Destination</strong> — Lagos or Abuja</li>
                <li><strong>Shipment weight</strong> — Chargeable actual or volumetric weight</li>
                <li><strong>Air or sea freight</strong> — Faster air dispatches vs. economical bulk ocean containers</li>
                <li><strong>Standard or express service</strong> — Regular air consolidation vs. 3–5 day express delivery</li>
                <li><strong>Type and contents of the cargo</strong> — Standard personal/commercial goods vs. items needing special handling</li>
                <li><strong>Handling charges</strong> — Any applicable handling or special cargo charges (£15 standard handling)</li>
              </ul>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-sm not-prose my-4">
                <p>
                  <strong>Tip for Accurate Quotes:</strong> Rather than relying on outdated shipping prices found online, customers should use the County Cargo shipping calculator to obtain the current rate for their shipment.
                </p>
              </div>
            </section>

            {/* Section 12: Ship from the United Kingdom to Lagos or Abuja Today */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Ship from the United Kingdom to Lagos or Abuja Today
              </h2>
              <p>
                Whether you are searching for <strong>UK to Nigeria shipping</strong>, <strong>cargo from UK to Lagos</strong>, <strong>shipping from UK to Abuja</strong>, air freight from UK to Nigeria or a reliable way to send larger cargo by sea, County Cargo provides several options.
              </p>
              <p>
                Choose the service that suits your shipment, obtain your quote and let County Cargo handle the journey.
              </p>

              <div className="flex flex-wrap gap-2 not-prose my-4">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  UK &rarr; Lagos
                </span>
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  UK &rarr; Abuja
                </span>
                <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  United Kingdom &rarr; Nigeria
                </span>
              </div>
            </section>

            {/* Section 13: FAQ Accordion */}
            <section className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>
              <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-2xs not-prose">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
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

            {/* Section 14: Start Your Shipment Call to Action */}
            <section className="mt-12 p-8 bg-gradient-to-br from-primary via-blue-900 to-slate-900 text-white rounded-2xl not-prose shadow-xl text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    Start Your Shipment Today
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Visit County Cargo and use our shipping calculator to check your shipment cost, or speak directly with our UK logistics team.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-emerald-400" /> Website: <strong className="text-white">www.countycargo.com</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-400" /> Telephone: <strong className="text-white">+44 7405 556668</strong>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-uk-to-nigeria#quote-calculator">
                      <Calculator className="w-4 h-4 mr-2" />
                      Shipping Calculator
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                    <a href="tel:+447405556668">
                      Call UK Support
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200 gap-2">
                <span>County Cargo &mdash; Your World. Delivered.</span>
                <div className="flex gap-4">
                  <Link href="/shipping-from-uk-to-nigeria" className="underline hover:text-white">
                    UK to Nigeria Services
                  </Link>
                  <Link href="/shipping-from-uk-to-lagos" className="underline hover:text-white">
                    UK to Lagos
                  </Link>
                  <Link href="/shipping-from-uk-to-abuja" className="underline hover:text-white">
                    UK to Abuja
                  </Link>
                  <Link href="/contact" className="underline hover:text-white">
                    Contact Us
                  </Link>
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
