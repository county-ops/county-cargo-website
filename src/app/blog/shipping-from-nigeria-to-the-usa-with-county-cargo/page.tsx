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
  Building2,
  Scale,
  DollarSign,
  Utensils,
  Check,
  Globe,
  Compass,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from Nigeria to the USA with County Cargo | Rates & Guide',
  description:
    'Complete guide to air cargo and international shipping from Nigeria to the USA. ₦16,000/kg Value air freight (5–10 working days, 10kg min), FDA & CBP customs clearance, US nationwide door delivery, and Express courier.',
  keywords:
    'Shipping from Nigeria to the USA, Cargo from Nigeria to the USA, Air cargo from Nigeria, International shipping from Nigeria, Express shipping from Nigeria, send foodstuffs to USA, Lagos to Houston cargo, Lagos to Atlanta air freight, County Cargo USA shipping',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-nigeria-to-the-usa-with-county-cargo',
  },
  openGraph: {
    title: 'Shipping from Nigeria to the USA with County Cargo | Rates & Guide',
    description:
      'Complete guide to air cargo and international shipping from Nigeria to the USA. ₦16,000/kg Value air freight (5–10 working days, 10kg min), FDA & CBP customs clearance, US nationwide door delivery, and Express courier.',
    url: 'https://countycargo.com/blog/shipping-from-nigeria-to-the-usa-with-county-cargo',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-20T09:00:00.000Z',
    modifiedTime: '2026-09-20T09:00:00.000Z',
    authors: ['County Cargo Transatlantic Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo international air freight shipment from Nigeria to the United States',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping from Nigeria to the USA with County Cargo',
    description:
      'Fast, secure air cargo and parcel delivery from Nigeria to all 50 US States. ₦16,000/kg Value air cargo, 5–10 working days transit.',
    images: ['https://countycargo.com/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg'],
  },
};

const usaFaqs = [
  {
    question: 'What is the current freight rate for shipping from Nigeria to the USA?',
    answer:
      'For our popular Value Export Shipping (Air Cargo), the rate is ₦16,000 per kg for drop-offs at our Lagos Hub (Ladipo-Oshodi Plaza) and ₦17,000 per kg for drop-offs at our Abuja Hub (Wuye Ultra Modern Market). The minimum billable weight is 10 kg. For smaller or urgent parcels starting from 1 kg, our Express Courier service is available with delivery in 3 to 5 working days.',
  },
  {
    question: 'How many days does it take for cargo to arrive in the United States?',
    answer:
      'County Cargo delivers to doorsteps across all 50 US states within 5 to 10 working days for Value Air Cargo after scheduled flight departure from Lagos. If you choose our Express Courier service, delivery is completed within 3 to 5 working days door-to-door.',
  },
  {
    question: 'Can I ship traditional Nigerian foods and spices to the USA?',
    answer:
      'Yes! You can ship dried, commercially processed, and properly sealed non-perishable foodstuffs such as dried fish, dried crayfish, melon seed (egusi), ogbono, pounded yam flour, garri, pepper soups, and dry spices. All foodstuffs entering the United States are subject to US FDA (Food and Drug Administration) inspection rules and must be completely free of moisture, live insects, or raw meat derivatives.',
  },
  {
    question: 'Do you deliver directly to residential and business addresses in the USA?',
    answer:
      'Yes. Once cleared through US Customs and Border Protection (CBP), shipments are dispatched for last-mile delivery directly to your recipient’s address anywhere in the United States, including Texas (Houston, Dallas), Georgia (Atlanta), Maryland, Virginia, New York, New Jersey, California, Illinois (Chicago), and Florida.',
  },
  {
    question: 'Are there customs tariffs or import duties on shipments entering the USA?',
    answer:
      'County Cargo handles customs documentation and clearance protocols. However, customers shipping commercial goods or high-value packages should note our 15% tariff advisory on commercial declared values, in accordance with US CBP entry regulations.',
  },
  {
    question: 'Where can I drop off packages in Nigeria, or can you pick them up?',
    answer:
      'You can drop off your goods at our Lagos Hub (Suite F8, Magnet Shopping Plaza, 525 Agege Motor Road, Ladipo-Oshodi) or our Abuja Hub (Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market). Alternatively, we offer convenient doorstep pickup across Lagos and Abuja for a flat fee of ₦5,000.',
  },
  {
    question: 'How is volumetric weight calculated for air freight to the USA?',
    answer:
      'Air cargo billing follows international IATA standards where chargeable weight is the greater of actual scale weight (kg) and dimensional volumetric weight. The formula is: Length (cm) × Width (cm) × Height (cm) ÷ 5,000. Packing compactly prevents unnecessary dimensional weight charges.',
  },
];

export default function ShippingNigeriaToUsaPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-from-nigeria-to-the-usa-with-county-cargo';

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
            name: 'Shipping from Nigeria to the USA with County Cargo',
            item: articleUrl,
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        headline: 'Shipping from Nigeria to the USA with County Cargo | Rates & Guide',
        description:
          'Complete guide to air cargo and international shipping from Nigeria to the USA. ₦16,000/kg Value air freight (5–10 working days, 10kg min), FDA & CBP customs clearance, US nationwide door delivery, and Express courier.',
        image: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Transatlantic Logistics Team',
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
        datePublished: '2026-09-20T09:00:00.000Z',
        dateModified: '2026-09-20T09:00:00.000Z',
      },
      {
        '@type': 'FAQPage',
        mainEntity: usaFaqs.map((faq) => ({
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
    <>
      <JsonLd data={combinedSchema} />
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-slate-200">
          <div className="container max-w-5xl mx-auto px-4 py-3">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                {
                  label: 'Shipping from Nigeria to the USA with County Cargo',
                  href: '/blog/shipping-from-nigeria-to-the-usa-with-county-cargo',
                },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <article className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
          <header className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-4">
              <Plane className="w-3.5 h-3.5" />
              <span>Transatlantic Air Freight • Nigeria to United States</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Shipping from Nigeria to the USA with County Cargo: Rates, Transit Times & Packaging Guide
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
              Connect with your loved ones, eCommerce clients, and retail buyers across all 50 US states. Explore 
              clear per-kilogram rates, official transit windows, FDA food clearance guidelines, and doorstep delivery protocols.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500 pb-6 border-b border-slate-200">
              <span className="font-semibold text-slate-800">By County Cargo Transatlantic Logistics Team</span>
              <span>•</span>
              <time dateTime="2026-09-20">Updated September 20, 2026</time>
              <span>•</span>
              <span>10 min read</span>
            </div>

            {/* Featured Image */}
            <div className="relative mt-6 aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <Image
                src="/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg"
                alt="County Cargo international air freight shipment from Nigeria to the United States"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            <figcaption className="text-xs text-slate-500 mt-2 text-center">
              Secured cargo pallets being prepared for scheduled transatlantic flight routing from Nigeria to US distribution hubs.
            </figcaption>
          </header>

          {/* Key Route Snapshot Box */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 mb-12 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl md:text-2xl font-bold text-white">Route Quick Snapshot: Nigeria to USA</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold mb-1">
                  <DollarSign className="w-4 h-4" />
                  VALUE AIR CARGO
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">₦16,000<span className="text-xs font-normal text-slate-300">/kg (Lagos)</span></div>
                <div className="text-xs text-slate-300 mt-1">₦17,000/kg from Abuja hub</div>
                <div className="mt-2 text-xs font-medium text-emerald-300">Min. weight: 10 kg</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold mb-1">
                  <Clock className="w-4 h-4" />
                  TRANSIT TIME
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">5–10<span className="text-base font-normal text-slate-300"> Working Days</span></div>
                <div className="text-xs text-slate-300 mt-1">From flight departure date</div>
                <div className="mt-2 text-xs font-medium text-blue-200">Express available (3–5 days)</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold mb-1">
                  <Truck className="w-4 h-4" />
                  DESTINATIONS
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">All 50<span className="text-base font-normal text-slate-300"> States</span></div>
                <div className="text-xs text-slate-300 mt-1">Houston, Atlanta, Dallas, NYC, Chicago</div>
                <div className="mt-2 text-xs font-medium text-amber-300">Doorstep delivery nationwide</div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                * Optional door pickup in Lagos or Abuja available for ₦5,000. 15% tariff advisory applies on commercial declared value.
              </div>
              <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                <Link href="/book">Book USA Shipment <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">
            {/* Section 1: Overview */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Plane className="w-6 h-6 text-blue-600" />
                Reliable Air Cargo & International Shipping from Nigeria to the United States
              </h2>
              <p>
                The United States is home to one of the largest, most vibrant Nigerian diaspora communities globally. 
                From the bustling business centers of Houston and Dallas to Atlanta, Prince George’s County in Maryland, 
                Northern New Jersey, New York City, and Southern California, the demand for fast and reliable{' '}
                <strong>shipping from Nigeria to the USA</strong> is at an all-time high.
              </p>
              <p>
                Whether you are an individual sending authentic dry foodstuffs, bespoke African fashion pieces, 
                and gifts to family members, or an entrepreneur fulfilling cross-border orders on Etsy, Amazon, or 
                independent webshops, County Cargo provides end-to-end transatlantic freight logistics with transparent 
                pricing, complete customs handling, and verified doorstep delivery.
              </p>
            </section>

            {/* Section 2: Pricing Tiers & Service Levels */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-blue-600" />
                Transparent Pricing Tiers for Shipping from Nigeria to the USA
              </h2>
              <p className="mb-6">
                Unlike unverified freight forwarders who surprise shippers with hidden clearance surcharges or 
                unannounced fuel levies, County Cargo operates on upfront, clear rates backed by our central pricing schedule:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {/* Value Air Cargo */}
                <div className="rounded-xl border-2 border-blue-600 bg-blue-50/50 p-6 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wide mb-3">
                      Best Value For Bulk & Foodstuff
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Value Air Cargo (Nigeria to USA)</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Economical consolidated air freight ideal for personal belongings, dried foodstuffs, textiles, and bulk trade.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between items-baseline border-b border-blue-200 pb-2">
                        <span className="text-sm font-medium text-slate-700">Lagos Drop-off Rate:</span>
                        <span className="text-lg font-extrabold text-blue-900">₦16,000 / kg</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-blue-200 pb-2">
                        <span className="text-sm font-medium text-slate-700">Abuja Drop-off Rate:</span>
                        <span className="text-lg font-extrabold text-blue-900">₦17,000 / kg</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-blue-200 pb-2">
                        <span className="text-sm font-medium text-slate-700">Minimum Billable Weight:</span>
                        <span className="text-sm font-bold text-slate-900">10 kg</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-blue-200 pb-2">
                        <span className="text-sm font-medium text-slate-700">Transit Timeline:</span>
                        <span className="text-sm font-bold text-emerald-700">5–10 Working Days</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-sm font-medium text-slate-700">US Delivery Scope:</span>
                        <span className="text-sm font-semibold text-slate-900">Doorstep across all 50 states</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    <Link href="/book">Select Value Shipping</Link>
                  </Button>
                </div>

                {/* Express Courier */}
                <div className="rounded-xl border border-slate-300 bg-white p-6 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wide mb-3">
                      Fastest For Urgent Shipments
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Express Courier (Nigeria to USA)</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Accelerated priority shipping via global carrier networks for documents, urgent commercial samples, and parcels under 10 kg.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                        <span className="text-sm font-medium text-slate-700">Carrier Network:</span>
                        <span className="text-sm font-bold text-slate-900">DHL Express / Global Express</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                        <span className="text-sm font-medium text-slate-700">Minimum Billable Weight:</span>
                        <span className="text-sm font-bold text-slate-900">1 kg</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                        <span className="text-sm font-medium text-slate-700">Packaging Handling Fee:</span>
                        <span className="text-sm font-bold text-slate-900">₦2,000 / kg</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                        <span className="text-sm font-medium text-slate-700">Transit Timeline:</span>
                        <span className="text-sm font-bold text-blue-700">3–5 Working Days</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-sm font-medium text-slate-700">Tracking:</span>
                        <span className="text-sm font-semibold text-emerald-700">Live End-to-End Tracking</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full border-slate-300 hover:bg-slate-50">
                    <Link href="/book">Select Express Courier</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs md:text-sm text-amber-900 flex items-start gap-3 not-prose">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Commercial Shipments & Tariff Advisory:</strong> A 15% tariff advisory applies on the declared value 
                  of commercial export cargo entering the United States, in accordance with US Customs and Border Protection (CBP) regulations.
                </div>
              </div>
            </section>

            {/* Section 3: Step-by-Step Shipping Process */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Boxes className="w-6 h-6 text-blue-600" />
                How to Ship from Nigeria to the USA: 5 Easy Steps
              </h2>
              <p>
                Sending your items across the Atlantic with County Cargo is seamless and stress-free. 
                Follow this simple workflow to get your packages delivered safely to American doorsteps:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6 not-prose">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">1</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Book & Prepare</h3>
                  <p className="text-xs text-slate-600">Register your consignment online or via WhatsApp with accurate item details and recipient US address.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">2</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Drop-off or Pickup</h3>
                  <p className="text-xs text-slate-600">Drop off at our Lagos or Abuja hub, or schedule doorstep collection for ₦5,000.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">3</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Weighing & Invoicing</h3>
                  <p className="text-xs text-slate-600">Items are inspected, weighed, securely packaged, and invoiced via our live billing system.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">4</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Air Transit</h3>
                  <p className="text-xs text-slate-600">Consolidated cargo boards direct scheduled transatlantic flights from Lagos to our US customs clearance gateways.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">5</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Final Delivery</h3>
                  <p className="text-xs text-slate-600">Cleared cargo is dispatched to local courier partners for safe residential or business door delivery.</p>
                </div>
              </div>
            </section>

            {/* Section 4: Shipping Foodstuffs & FDA Rules */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                <Utensils className="w-6 h-6 text-blue-600" />
                Shipping Foodstuffs to the USA: FDA Guidelines & Prohibited Items
              </h2>
              <p className="mb-6">
                Nigerian food items are among the most popular items shipped to the United States. 
                However, the US Food and Drug Administration (FDA) and Customs and Border Protection (CBP) enforce strict 
                regulations to protect agriculture and bio-security. County Cargo guides you through compliant preparation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Permitted Foodstuffs (Properly Processed & Dry)</span>
                  </div>
                  <ul className="text-xs md:text-sm text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Completely Dried Fish & Shrimps:</strong> Smoked catfish, panla, and crayfish with zero moisture.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Dry Grains & Flours:</strong> Garri (Ijebu and yellow), yam flour (elubo), plantain flour, and bean flour.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Milled Seeds & Condiments:</strong> Melon seed (egusi), ogbono, iru (locust beans - dried), and cameroon pepper.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Packaged Spices & Herbs:</strong> Suya pepper (without meat), curry, thyme, bitter leaf, and scent leaf (dry).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Processed Snacks:</strong> Chin chin, plantain chips, baked dry pastries in commercial wrappers.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-rose-800 font-bold mb-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>Strictly Prohibited Items (CBP / FDA Confiscation)</span>
                  </div>
                  <ul className="text-xs md:text-sm text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Fresh or Processed Meat Products:</strong> Beef, ponmo (cow skin), kilishi, goat meat, chicken, pork, and bushmeat.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Wet or Fresh Produce:</strong> Fresh tomatoes, garden eggs, raw vegetables, fresh yams, and unpeeled tubers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Unpasteurised Dairy & Wet Liquids:</strong> Local raw milk, open oils, and flammable liquids.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Hazardous & Controlled Substances:</strong> Prescription pharmaceuticals without FDA certification, weapons, and narcotics.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Counterfeit Goods & Infringing Apparel:</strong> Knock-off designer clothing, accessories, or unauthorized media.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <strong>Packaging Recommendation:</strong> All food items must be vacuum-sealed in airtight polythene and double-bagged 
                inside sturdy outer cartons. Vacuum-sealing preserves freshness, eliminates food odours during flight handling, 
                and satisfies US agricultural health standards.
              </div>
            </section>

            {/* Section 5: Volumetric Weight Explanation */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Scale className="w-6 h-6 text-blue-600" />
                Understanding Volumetric Weight for USA Air Cargo
              </h2>
              <p>
                A frequent question from international shippers is how air freight weight is calculated. 
                Under standard International Air Transport Association (IATA) rules, airlines charge based on 
                the <strong>chargeable weight</strong>, which is whichever is higher between:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Actual Gross Weight:</strong> The physical weight of your package on a calibrated digital scale (in kilograms).</li>
                <li><strong>Volumetric (Dimensional) Weight:</strong> The volume of space your box occupies in the airplane cargo hold.</li>
              </ol>

              <div className="bg-slate-100 rounded-xl p-5 border border-slate-200 my-4 not-prose">
                <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Standard IATA Volumetric Formula</div>
                <div className="text-lg md:text-xl font-mono font-bold text-blue-900">
                  Volumetric Weight (kg) = [Length (cm) × Width (cm) × Height (cm)] ÷ 5,000
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  <em>Example:</em> A box weighing 12 kg with dimensions 50 cm × 50 cm × 40 cm has a volumetric weight of (50 × 50 × 40) ÷ 5,000 = 20 kg. 
                  In this scenario, 20 kg is billed as the chargeable weight. County Cargo logistics agents assist you in repackaging and consolidating 
                  to eliminate dead space and save money.
                </p>
              </div>
            </section>

            {/* Section 6: Drop-off Locations & Doorstep Pickups */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-600" />
                County Cargo Drop-off Centers in Nigeria
              </h2>
              <p className="mb-6">
                You can drop off your US-bound parcels directly at our fully staffed logistics hubs in Lagos and Abuja, 
                or book an on-demand doorstep collection:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Lagos Main Processing Hub
                  </div>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Address:</strong> Suite F8, Magnet Shopping Plaza, 525 Agege Motor Road, Ladipo-Oshodi, Lagos.
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    <strong>Rate:</strong> ₦16,000 / kg (Value Cargo, 10kg min)
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Operating Hours:</strong> Monday – Friday: 9:00 AM – 5:00 PM | Saturday: 10:00 AM – 3:00 PM
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Abuja Regional Hub
                  </div>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Address:</strong> Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Wuye, Abuja.
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    <strong>Rate:</strong> ₦17,000 / kg (Value Cargo, 10kg min)
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Operating Hours:</strong> Monday – Friday: 9:00 AM – 5:00 PM | Saturday: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-blue-600 shrink-0" />
                  <div className="text-xs md:text-sm text-slate-800">
                    <span className="font-bold text-slate-900">Doorstep Pickup Service:</span> Can’t make it to our hub? 
                    Our dispatch riders collect parcels from your doorstep across Lagos and Abuja for a flat fee of <strong>₦5,000</strong>.
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="shrink-0 bg-white border-blue-300 text-blue-800 hover:bg-blue-100">
                  <Link href="/book">Request Pickup</Link>
                </Button>
              </div>
            </section>

            {/* Section 7: FAQ Accordion */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  Frequently Asked Questions (Shipping to USA)
                </h2>
              </div>

              <div className="not-prose">
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {usaFaqs.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`faq-${idx}`}
                      className="border border-slate-200 rounded-xl bg-white px-4 data-[state=open]:border-blue-300 shadow-sm"
                    >
                      <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-slate-900 hover:text-blue-600 py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs md:text-sm text-slate-600 leading-relaxed pb-4 pt-1 border-t border-slate-100">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            {/* Section 8: Final Call to Action */}
            <section className="not-prose mt-12 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-2xl p-8 md:p-10 text-white shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                  Ready to Ship from Nigeria to the USA?
                </h2>
                <p className="text-sm md:text-base text-blue-100 leading-relaxed">
                  Get fast, secure air cargo delivery starting from ₦16,000/kg. Drop off in Lagos or Abuja, or schedule 
                  a convenient doorstep pickup today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-blue-900 font-bold shadow-md">
                  <Link href="/book">Book USA Shipment</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Link href="https://wa.me/2348000000000?text=Hello%20County%20Cargo,%20I%20want%20to%20ship%20to%20the%20USA">
                    Chat on WhatsApp
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Social Share & Back to Blog */}
          <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <SocialShare url={articleUrl} title="Shipping from Nigeria to the USA with County Cargo | Rates & Guide" />
            <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900">
              <Link href="/blog">← Back to All Articles</Link>
            </Button>
          </footer>
        </article>
      </main>

      <Footer />
    </>
  );
}
