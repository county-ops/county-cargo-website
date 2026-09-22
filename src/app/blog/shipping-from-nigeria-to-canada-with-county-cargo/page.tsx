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
  title: 'Shipping from Nigeria to Canada with County Cargo | Rates & Guide',
  description:
    'Complete guide to air cargo and shipping from Nigeria to Canada. ₦34,000/kg Value air freight (5–10 working days, 10kg min), CBSA customs clearance, CFIA foodstuff rules, Canadian door delivery, and Express courier.',
  keywords:
    'Shipping from Nigeria to Canada, Cargo from Nigeria to Canada, Air cargo from Nigeria, International shipping from Nigeria, Express shipping from Nigeria, send foodstuffs to Canada, Lagos to Toronto cargo, Lagos to Calgary air freight, County Cargo Canada shipping',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-nigeria-to-canada-with-county-cargo',
  },
  openGraph: {
    title: 'Shipping from Nigeria to Canada with County Cargo | Rates & Guide',
    description:
      'Complete guide to air cargo and shipping from Nigeria to Canada. ₦34,000/kg Value air freight (5–10 working days, 10kg min), CBSA customs clearance, CFIA foodstuff rules, Canadian door delivery, and Express courier.',
    url: 'https://countycargo.com/blog/shipping-from-nigeria-to-canada-with-county-cargo',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-20T10:00:00.000Z',
    modifiedTime: '2026-09-20T10:00:00.000Z',
    authors: ['County Cargo Canadian Freight Division'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-canada-air-cargo-county.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo freight consignment arriving in Canada from Nigeria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping from Nigeria to Canada with County Cargo',
    description:
      'Fast, reliable air cargo from Nigeria to Toronto, Calgary, Edmonton, Ottawa, Vancouver, and across Canada. ₦34,000/kg Value shipping, 5–10 working days.',
    images: ['https://countycargo.com/images/blog/shipping-from-nigeria-to-canada-air-cargo-county.jpg'],
  },
};

const canadaFaqs = [
  {
    question: 'What is the freight rate for shipping from Nigeria to Canada?',
    answer:
      'Our Value Export Shipping (Air Cargo) rate to Canada is ₦34,000 per kg with a minimum billable weight of 10 kg. For smaller parcels or urgent delivery, our Express Courier service is available from 1 kg with a 3 to 5 working days delivery timeframe.',
  },
  {
    question: 'How long does shipping take from Nigeria to Canada?',
    answer:
      'For Value Air Cargo, delivery across major Canadian provinces takes 5 to 10 working days from the date of flight departure. For urgent documents, commercial samples, or priority parcels, our Express Courier delivers within 3 to 5 working days door-to-door.',
  },
  {
    question: 'Which Canadian cities and provinces do you deliver to?',
    answer:
      'County Cargo delivers door-to-door across all Canadian provinces. Primary destinations include Ontario (Toronto, Ottawa, Mississauga, Brampton, Hamilton), Alberta (Calgary, Edmonton), British Columbia (Vancouver, Surrey), Quebec (Montreal), Manitoba (Winnipeg), and Saskatchewan (Saskatoon, Regina).',
  },
  {
    question: 'Can I send Nigerian foodstuffs to Canada under CFIA guidelines?',
    answer:
      'Yes, you can send dried, well-packaged, and commercially prepared dry foodstuffs. Permitted items include dried crayfish, egusi, ogbono, garri, dried smoked fish, yam flour (elubo), plantain flour, and dried herbs. All foodstuffs are subject to Canadian Food Inspection Agency (CFIA) and Canada Border Services Agency (CBSA) inspection and must be 100% moisture-free, vacuum-sealed, and without meat or fresh produce.',
  },
  {
    question: 'Where are your drop-off hubs in Nigeria?',
    answer:
      'You can drop off your cargo at our Lagos Hub (Suite F8, Magnet Shopping Plaza, 525 Agege Motor Road, Ladipo-Oshodi) or our Abuja Hub (Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market). Alternatively, we offer convenient doorstep pickup across Lagos and Abuja for a flat fee of ₦5,000.',
  },
  {
    question: 'How does customs clearance work when shipping to Canada?',
    answer:
      'County Cargo handles complete export documentation, flight manifest filings, and Canadian customs clearance through the Canada Border Services Agency (CBSA). Once cargo is cleared at primary Canadian international gateways (such as Toronto Pearson YYZ or Calgary YYC), it is handed over to regional courier partners for doorstep delivery.',
  },
  {
    question: 'How is volumetric dimensional weight calculated for Canadian air cargo?',
    answer:
      'Under standard IATA air cargo regulations, chargeable weight is the greater of actual scale weight (kg) and volumetric weight (kg). The volumetric weight is calculated as: [Length (cm) × Width (cm) × Height (cm)] ÷ 5,000. County Cargo teams ensure items are compacted efficiently to prevent paying for empty space.',
  },
];

export default function ShippingNigeriaToCanadaPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-from-nigeria-to-canada-with-county-cargo';

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
            name: 'Shipping from Nigeria to Canada with County Cargo',
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
        headline: 'Shipping from Nigeria to Canada with County Cargo | Rates & Guide',
        description:
          'Complete guide to air cargo and shipping from Nigeria to Canada. ₦34,000/kg Value air freight (5–10 working days, 10kg min), CBSA customs clearance, CFIA foodstuff rules, Canadian door delivery, and Express courier.',
        image: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-canada-air-cargo-county.jpg',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Canadian Freight Division',
          url: 'https://countycargo.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'County Cargo',
          logo: {
            '@type': 'ImageObject',
            url: 'https://countycargo.com/county-logo.png',
          },
        },
        datePublished: '2026-09-20T10:00:00.000Z',
        dateModified: '2026-09-20T10:00:00.000Z',
      },
      {
        '@type': 'FAQPage',
        mainEntity: canadaFaqs.map((faq) => ({
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
                  label: 'Shipping from Nigeria to Canada with County Cargo',
                  href: '/blog/shipping-from-nigeria-to-canada-with-county-cargo',
                },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <article className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
          <header className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold mb-4">
              <Plane className="w-3.5 h-3.5" />
              <span>Trans-Atlantic Air Cargo • Nigeria to Canada</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Shipping from Nigeria to Canada with County Cargo: Rates, Timelines & Customs Guide
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
              Connect effortlessly with family, friends, and business partners across Canada. From Toronto and Calgary 
              to Edmonton, Ottawa, Vancouver, and Montreal, discover transparent rates, reliable 5–10 day transit times, 
              CFIA food clearance rules, and door-to-door delivery.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500 pb-6 border-b border-slate-200">
              <span className="font-semibold text-slate-800">By County Cargo Canadian Freight Division</span>
              <span>•</span>
              <time dateTime="2026-09-20">Updated September 20, 2026</time>
              <span>•</span>
              <span>9 min read</span>
            </div>

            {/* Featured Image */}
            <div className="relative mt-6 aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <Image
                src="/images/blog/shipping-from-nigeria-to-canada-air-cargo-county.jpg"
                alt="County Cargo freight consignment arriving in Canada from Nigeria"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            <figcaption className="text-xs text-slate-500 mt-2 text-center">
              Consolidated Nigerian export cargo arriving for CBSA customs clearance and nationwide Canadian doorstep delivery.
            </figcaption>
          </header>

          {/* Key Route Snapshot Box */}
          <div className="bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 mb-12 shadow-xl border border-red-900/30">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-red-400" />
              <h2 className="text-xl md:text-2xl font-bold text-white">Route Quick Snapshot: Nigeria to Canada</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-red-300 text-xs font-semibold mb-1">
                  <DollarSign className="w-4 h-4" />
                  VALUE AIR FREIGHT
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">₦34,000<span className="text-xs font-normal text-slate-300">/kg</span></div>
                <div className="text-xs text-slate-300 mt-1">Lagos & Abuja hubs</div>
                <div className="mt-2 text-xs font-medium text-emerald-300">Min. weight: 10 kg</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-red-300 text-xs font-semibold mb-1">
                  <Clock className="w-4 h-4" />
                  TRANSIT TIME
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">5–10<span className="text-base font-normal text-slate-300"> Working Days</span></div>
                <div className="text-xs text-slate-300 mt-1">From flight departure date</div>
                <div className="mt-2 text-xs font-medium text-blue-200">Express available (3–5 days)</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-red-300 text-xs font-semibold mb-1">
                  <Truck className="w-4 h-4" />
                  CANADIAN DESTINATIONS
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">Coast to Coast</div>
                <div className="text-xs text-slate-300 mt-1">Toronto, Calgary, Edmonton, Ottawa, Vancouver</div>
                <div className="mt-2 text-xs font-medium text-amber-300">Doorstep courier delivery</div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                * Optional door pickup in Lagos or Abuja available for ₦5,000. Full CBSA clearance support included.
              </div>
              <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                <Link href="https://ship.countycargo.com">Book Canada Shipment <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">
            {/* Section 1: Overview */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Plane className="w-6 h-6 text-red-600" />
                Connecting Nigeria to Canada: Fast & Dependable Air Cargo
              </h2>
              <p>
                Canada is home to one of the most rapidly growing Nigerian communities in the world. 
                With tens of thousands of Nigerian professionals, university students, and families settling in the Greater 
                Toronto Area (Mississauga, Brampton, Oakville), Calgary, Edmonton, Ottawa, Montreal, and Vancouver, the requirement 
                for reliable <strong>shipping from Nigeria to Canada</strong> has surged dramatically.
              </p>
              <p>
                Whether you need to send authentic food staples to satisfy a craving for home, ship cultural clothing and 
                wedding attire for diaspora events, or dispatch commercial inventory for African retail stores in Canada, 
                County Cargo provides structured, secure air freight operations that remove the complexity from transatlantic shipping.
              </p>
            </section>

            {/* Section 2: Pricing & Service Comparison */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-red-600" />
                Transparent Pricing for Shipping from Nigeria to Canada
              </h2>
              <p className="mb-6">
                County Cargo provides transparent per-kilogram rates based on our central pricing structure, giving you 
                complete predictability without hidden surcharges:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {/* Value Air Cargo */}
                <div className="rounded-xl border-2 border-red-600 bg-red-50/40 p-6 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wide mb-3">
                      Popular Choice for Foodstuff & Luggage
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Value Air Cargo (Nigeria to Canada)</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Consolidated air freight tailored for personal effects, traditional dry foodstuffs, fashion apparel, and trade goods.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between items-baseline border-b border-red-200 pb-2">
                        <span className="text-sm font-medium text-slate-700">Freight Rate:</span>
                        <span className="text-lg font-extrabold text-red-900">₦34,000 / kg</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-red-200 pb-2">
                        <span className="text-sm font-medium text-slate-700">Minimum Billable Weight:</span>
                        <span className="text-sm font-bold text-slate-900">10 kg</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-red-200 pb-2">
                        <span className="text-sm font-medium text-slate-700">Transit Timeline:</span>
                        <span className="text-sm font-bold text-emerald-700">5–10 Working Days</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-red-200 pb-2">
                        <span className="text-sm font-medium text-slate-700">Delivery Coverage:</span>
                        <span className="text-sm font-semibold text-slate-900">All Canadian Provinces</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-sm font-medium text-slate-700">Customs Clearance:</span>
                        <span className="text-sm font-semibold text-emerald-700">CBSA Compliant Handling</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white font-medium">
                    <Link href="/#quote">Calculate Value Quote</Link>
                  </Button>
                </div>

                {/* Express Courier */}
                <div className="rounded-xl border border-slate-300 bg-white p-6 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wide mb-3">
                      Fastest For Urgent Documents & Parcels
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Express Courier (Nigeria to Canada)</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Direct priority courier shipping via premier international carrier networks for urgent documents and parcels under 10 kg.
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
                        <span className="text-sm font-semibold text-emerald-700">Live Global GPS Tracking</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full border-slate-300 hover:bg-slate-50">
                    <Link href="/express-export">Calculate Express Quote</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Section 3: Step-by-Step Guide */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Boxes className="w-6 h-6 text-red-600" />
                How to Ship from Nigeria to Canada: Step-by-Step
              </h2>
              <p>
                County Cargo streamlines transatlantic logistics with a simple 5-step workflow designed to protect your goods 
                and keep you informed from drop-off to Canadian doorstep:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6 not-prose">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm mb-3">1</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Book Consignment</h3>
                  <p className="text-xs text-slate-600">Register your parcel online or via WhatsApp with accurate item descriptions and recipient Canadian address.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm mb-3">2</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Hub Drop-off / Pickup</h3>
                  <p className="text-xs text-slate-600">Drop off at our Lagos or Abuja hub, or book our convenient ₦5,000 doorstep collection.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm mb-3">3</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Verification & Packing</h3>
                  <p className="text-xs text-slate-600">Items are weighed, checked for CFIA food compliance, reinforced in heavy-duty cartons, and invoiced.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm mb-3">4</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Transatlantic Flight</h3>
                  <p className="text-xs text-slate-600">Cargo departs on scheduled air freight connections to Canada and clears CBSA customs smoothly.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">5</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Doorstep Handover</h3>
                  <p className="text-xs text-slate-600">Our regional Canadian courier partners deliver straight to the recipient’s home or business address.</p>
                </div>
              </div>
            </section>

            {/* Section 4: CFIA / CBSA Foodstuff Clearance Rules */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                <Utensils className="w-6 h-6 text-red-600" />
                Shipping Foodstuffs to Canada: CFIA & CBSA Compliance
              </h2>
              <p className="mb-6">
                The Canadian Food Inspection Agency (CFIA) and the Canada Border Services Agency (CBSA) maintain stringent 
                standards to protect Canada’s ecosystem and public health. Following these guidelines ensures your foodstuffs 
                pass customs without confiscation or unnecessary delays:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Permitted Dry Food Products</span>
                  </div>
                  <ul className="text-xs md:text-sm text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Fully Dried Crayfish & Fish:</strong> Smoked fish and ground/whole crayfish that are completely dehydrated and bone-dry.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Processed Flours & Tubers:</strong> Garri, yam flour (amala / elubo), plantain flour, and cassava flour.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Dehydrated Seeds & Condiments:</strong> Melon seed (egusi), ogbono, dry locust beans (iru), and pepper soup spices.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Dried Leaves & Seasonings:</strong> Dried bitter leaf, scent leaf, ukazi, and dried hot chillies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Baked Goods & Snacks:</strong> Chin chin, roasted cashew nuts, and factory-sealed plantain chips.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-rose-800 font-bold mb-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>Strictly Prohibited Items in Canada</span>
                  </div>
                  <ul className="text-xs md:text-sm text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Meat & Poultry Derivatives:</strong> Beef, ponmo (cow skin), kilishi, goat meat, chicken, and bushmeat in any form.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Fresh Produce with Soil:</strong> Unprocessed fresh yams, garden eggs, fresh peppers, and live roots.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Dairy & Wet Perishables:</strong> Unpasteurised local dairy, fermented liquids, and non-commercial palm oil.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Dangerous Goods & Aerosols:</strong> Perfumes, compressed sprays, flammable chemicals, and lithium batteries without approval.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Unprescribed Medications:</strong> Unlicensed herbal mixtures, unregistered antibiotics, and controlled pharmaceuticals.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <strong>Packaging Pro-Tip:</strong> To withstand cross-continental transit and Canadian temperature changes, 
                foodstuffs should be vacuum-sealed in heavy-gauge polythene bags, placed inside inner cartons, and double-taped. 
                Vacuum-sealing locks in scent, preserves freshness, and expedites CFIA border inspections.
              </div>
            </section>

            {/* Section 5: Volumetric Weight Details */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Scale className="w-6 h-6 text-red-600" />
                Understanding Volumetric Weight for Canada Shipments
              </h2>
              <p>
                International air cargo rates are assessed on whichever is greater: the actual weight of the package 
                or its volumetric dimensional weight. This prevents lightweight bulky parcels from displacing vital aircraft hold capacity:
              </p>

              <div className="bg-slate-100 rounded-xl p-5 border border-slate-200 my-4 not-prose">
                <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">IATA Volumetric Weight Calculation</div>
                <div className="text-lg md:text-xl font-mono font-bold text-red-900">
                  Volumetric Weight (kg) = [Length (cm) × Width (cm) × Height (cm)] ÷ 5,000
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  <em>Example:</em> A box measuring 45 cm × 40 cm × 40 cm with an actual weight of 11 kg has a dimensional weight 
                  of (45 × 40 × 40) ÷ 5,000 = 14.4 kg. The billable chargeable weight will be 14.4 kg. 
                  Our warehouse teams assist you in compacting items and selecting appropriately sized boxes to minimise excess volumetric charges.
                </p>
              </div>
            </section>

            {/* Section 6: Drop-off Hubs & Pickup Service */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-red-600" />
                Drop-off Locations in Lagos & Abuja
              </h2>
              <p className="mb-6">
                You can drop off your Canadian-bound consignments at any of our official processing hubs, 
                or schedule our convenient city-wide pickup service:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    Lagos Main Hub (Ladipo-Oshodi)
                  </div>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Address:</strong> Suite F8, Magnet Shopping Plaza, 525 Agege Motor Road, Ladipo-Oshodi, Lagos.
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    <strong>Rate:</strong> ₦34,000 / kg (Value Cargo, 10kg min)
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Operating Hours:</strong> Monday – Friday: 9:00 AM – 5:00 PM | Saturday: 10:00 AM – 3:00 PM
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    Abuja Regional Hub (Wuye Market)
                  </div>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Address:</strong> Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Wuye, Abuja.
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    <strong>Rate:</strong> ₦34,000 / kg (Value Cargo, 10kg min)
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Operating Hours:</strong> Monday – Friday: 9:00 AM – 5:00 PM | Saturday: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-red-600 shrink-0" />
                  <div className="text-xs md:text-sm text-slate-800">
                    <span className="font-bold text-slate-900">Doorstep Pickup Service:</span> Need us to collect from your home or business? 
                    We offer pickup across Lagos and Abuja for a flat fee of <strong>₦5,000</strong>.
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="shrink-0 bg-white border-red-300 text-red-800 hover:bg-red-100">
                  <Link href="/contact">Request Pickup</Link>
                </Button>
              </div>
            </section>

            {/* Section 7: FAQ Accordion */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-7 h-7 text-red-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  Frequently Asked Questions (Shipping to Canada)
                </h2>
              </div>

              <div className="not-prose">
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {canadaFaqs.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`faq-${idx}`}
                      className="border border-slate-200 rounded-xl bg-white px-4 data-[state=open]:border-red-300 shadow-sm"
                    >
                      <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-slate-900 hover:text-red-600 py-4">
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

            {/* Section 8: Final CTA */}
            <section className="not-prose mt-12 bg-gradient-to-r from-red-700 via-rose-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                  Ready to Ship from Nigeria to Canada?
                </h2>
                <p className="text-sm md:text-base text-red-100 leading-relaxed">
                  Fast, reliable air freight delivery to Toronto, Calgary, Edmonton, Vancouver, and across Canada at ₦34,000/kg. 
                  Book online or chat with our logistics team today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-red-900 font-bold shadow-md">
                  <Link href="https://ship.countycargo.com">Book Canada Shipment</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo,%20I%20want%20to%20ship%20to%20Canada" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </section>
          </div>

          {/* Social Share & Back to Blog */}
          <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <SocialShare url={articleUrl} title="Shipping from Nigeria to Canada with County Cargo | Rates & Guide" />
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
