import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import {
  Plane,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  MapPin,
  FileText,
  AlertTriangle,
  HelpCircle,
  Building2,
  Calendar,
  UserCheck,
  Package,
  Utensils,
  ShoppingBag,
  Scale,
  Truck,
  Check,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { NigeriaUkQuoteForm } from '../ship-from-nigeria-to-uk/quote-form';

export const metadata: Metadata = {
  title: 'Shipping from Nigeria to the UK | Air Freight, Food & Cargo | County Cargo',
  description:
    'Reliable air cargo and express shipping from Nigeria to the UK. Ship permitted foodstuffs, personal effects, commercial merchandise, and documents from Lagos & Abuja to London, Liverpool, Manchester, Birmingham, and nationwide.',
  keywords:
    'shipping from Nigeria to the UK, Nigeria to UK cargo, send parcels from Nigeria to the UK, door-to-door delivery from Nigeria to the UK, air freight from Nigeria to the UK, export goods from Nigeria to the UK, County Cargo Nigeria to UK, send food from Lagos to London, ship foodstuffs to UK',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-nigeria-to-uk',
  },
  openGraph: {
    title: 'Shipping from Nigeria to the UK | Air Freight, Food & Cargo | County Cargo',
    description:
      'Send air cargo, authentic Nigerian foodstuffs, personal belongings, and commercial goods from Lagos and Abuja to London, Liverpool, Manchester, Birmingham, and across the UK.',
    url: 'https://countycargo.com/shipping-from-nigeria-to-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/service-nigeria-uk-enhanced.png',
        width: 1200,
        height: 630,
        alt: 'County Cargo Air Freight and Shipping from Nigeria to the United Kingdom',
      },
    ],
  },
};

const faqs = [
  {
    question: 'How long does air cargo shipping take from Nigeria to the UK?',
    answer:
      'Standard Air Cargo from Nigeria to the UK takes 5 to 10 working days, which includes export consolidation in Lagos, direct transatlantic flight, HMRC customs clearance, and UK distribution. Express Air Courier (for urgent documents and parcels) takes 3 to 5 working days for doorstep delivery across London, Manchester, Birmingham, and Liverpool.',
  },
  {
    question: 'What authentic Nigerian food items can I legally ship to the UK?',
    answer:
      'Under UK DEFRA and Border Force regulations, commercially processed and dried plant-based food items are permitted. These include dried fish (boneless, smoked), ground egusi, ogbono, garri, yam flour, plantain flour, ground crayfish, dried bitterleaf, processed spices, and sealed snacks. All foodstuffs must be clean, moisture-free, professionally packed, and vacuum-sealed at our Lagos or Abuja receiving hub.',
  },
  {
    question: 'What items are strictly prohibited when shipping from Nigeria to the UK?',
    answer:
      'Prohibited items include fresh or raw uninspected meat, poultry, bushmeat, fresh dairy products, live plants and viable seeds, unprescribed or counterfeit pharmaceuticals, firearms, flammables, batteries exceeding air transport limits, and illegal narcotics. Prohibited items are subject to immediate seizure by UK Border Force.',
  },
  {
    question: 'What documents are required to export commercial goods from Nigeria to the UK?',
    answer:
      'For commercial shipments, required documentation includes an itemized Commercial Invoice, detailed Packing List with HS Tariff Codes, Nigerian Export Promotion Council (NEPC) registration certificate, Clean Certificate of Inspection (CCI) where applicable, and Form NXP processed through an authorized Nigerian dealer bank. For private personal effects, a standard packing list and sender/recipient ID are required.',
  },
  {
    question: 'How does doorstep delivery work across the United Kingdom?',
    answer:
      'Once your cargo clears HMRC customs inspection at London Heathrow or Manchester Airport, packages are transferred to our central sorting depot and handed to domestic courier networks or our Liverpool operational hub. Parcels are delivered directly to residential or commercial addresses across England, Scotland, Wales, and Northern Ireland.',
  },
  {
    question: 'Where can I drop off my cargo in Lagos and Abuja?',
    answer:
      'In Lagos, customers can drop off shipments at our main hub: Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi. In Abuja, drop-offs are received at Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street. We also provide doorstep collection services across Lagos, Abuja, Port Harcourt, Ibadan, and other Nigerian states.',
  },
  {
    question: 'How are shipping charges and volumetric weight calculated?',
    answer:
      'Air cargo pricing is based on chargeable weight, which is the greater of actual gross weight (on a certified scale) and volumetric (dimensional) weight calculated as (Length × Width × Height in cm) ÷ 5,000. County Cargo offers transparent per-kg pricing with zero hidden surcharges.',
  },
  {
    question: 'Can UK recipients collect their parcel in Liverpool?',
    answer:
      'Yes. UK customers can arrange collection directly from our Liverpool facility located at Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG, or request direct courier delivery to their doorstep anywhere in the UK.',
  },
  {
    question: 'Can I track my shipment from Nigeria to the UK?',
    answer:
      'Yes. Every shipment is assigned an international tracking number upon intake in Nigeria. You can track your cargo in real time on our tracking portal from intake and airport departure through to UK customs release and final doorstep delivery.',
  },
  {
    question: 'What is the minimum weight requirement for shipping from Nigeria to the UK?',
    answer:
      'For standard air freight and foodstuff shipments, our minimum chargeable weight is 5 kg. For urgent documents and small packages via Express Courier, single document envelopes and parcels starting from 1 kg are accepted.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://countycargo.com/shipping-from-nigeria-to-uk#service',
      name: 'Shipping from Nigeria to the UK',
      serviceType: 'International Air Freight & Cargo Services',
      provider: {
        '@type': 'Organization',
        '@id': 'https://countycargo.com/#organization',
        name: 'County Cargo',
      },
      areaServed: [
        { '@type': 'Country', name: 'Nigeria' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
      description:
        'Professional air freight, express parcel delivery, permitted Nigerian foodstuff shipping, and door-to-door cargo services from Lagos and Abuja to all locations across the United Kingdom.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: 'https://countycargo.com/shipping-from-nigeria-to-uk',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://countycargo.com/shipping-from-nigeria-to-uk#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://countycargo.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://countycargo.com/#services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Shipping from Nigeria to the UK',
          item: 'https://countycargo.com/shipping-from-nigeria-to-uk',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://countycargo.com/shipping-from-nigeria-to-uk#faq',
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

const serviceOptions = [
  {
    title: 'Standard Air Cargo',
    timeline: '5–10 Working Days',
    idealFor: 'Foodstuffs, personal effects, fashion apparel, books, and regular parcels',
    features: [
      'Economical per-kg freight rates',
      'Weekly scheduled transatlantic flights',
      'Full HMRC customs clearance handling',
      'Doorstep delivery to all UK postcodes',
      'Comprehensive parcel tracking',
    ],
    popular: true,
  },
  {
    title: 'Express Air Courier',
    timeline: '3–5 Working Days',
    idealFor: 'Urgent business documents, time-sensitive contracts, and high-priority samples',
    features: [
      'Rapid flight priority departure',
      'Dedicated courier processing',
      'Priority customs fast-track',
      'Direct courier doorstep delivery',
      'Real-time milestone notifications',
    ],
    popular: false,
  },
  {
    title: 'Commercial Freight & Export',
    timeline: 'Scheduled Flights',
    idealFor: 'B2B merchandise, bulk agricultural products, African clothing collections, and retail inventory',
    features: [
      'NEPC and Form NXP guidance',
      'Palletized and consolidated freight',
      'Commercial invoice assistance',
      'Depot delivery or direct warehouse drop',
      'Dedicated account coordinator',
    ],
    popular: false,
  },
];

const permittedFoodItems = [
  'Smoked & dried fish (boneless, dry-cured)',
  'Ground egusi (melon seeds) in sealed pouches',
  'Ogbono (wild mango seeds) cleaned & milled',
  'Garri (white and yellow cassava flakes)',
  'Yam flour (elubo) and plantain flour',
  'Ground crayfish (vacuum-sealed)',
  'Dried bitterleaf and scent leaf',
  'Packaged spices, pepper soup mix, and seasonings',
  'Sealed traditional snacks and dry grain flours',
];

const restrictedItems = [
  'Fresh, raw, or uninspected meat & poultry',
  'Bushmeat and wild animal game',
  'Unpasteurised milk, cheese, and dairy products',
  'Live plants, soil, bulbs, and viable planting seeds',
  'Unregulated or counterfeit medications',
  'Aerosols, flammable liquids, and hazardous chemicals',
  'Loose lithium batteries exceeding IATA air limits',
];

export default function ShippingFromNigeriaToUkPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Header />

      <main className="pt-16 bg-white min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 bg-slate-50 border-b border-slate-200/80 text-xs sm:text-sm">
          <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 text-slate-600">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/#services" className="hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-secondary truncate">
              Shipping from Nigeria to UK
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          className="relative py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(10, 25, 47, 0.90) 0%, rgba(15, 23, 42, 0.95) 100%), url('/service-nigeria-uk-enhanced.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs sm:text-sm font-semibold">
                  <Plane className="w-4 h-4 text-blue-400" />
                  <span>Nigeria to United Kingdom Cargo Corridor</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight hero-text-glow leading-tight">
                  Shipping from Nigeria to the UK
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-blue-100 font-light leading-relaxed max-w-2xl">
                  Send air cargo, authentic Nigerian foodstuffs, personal belongings, and commercial inventory from Lagos and Abuja directly to London, Liverpool, Manchester, Birmingham, and nationwide UK destinations.
                </p>

                {/* Direct Quotable Summary Block for AI Search & Users */}
                <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 text-slate-100 text-sm sm:text-base leading-relaxed">
                  <p className="font-medium text-white flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <strong>Verified Route Overview:</strong>
                  </p>
                  <p>
                    County Cargo provides air freight, express courier, permitted foodstuff shipping, and door-to-door delivery from Nigeria to the United Kingdom. Shipments depart weekly from intake hubs in Lagos (Ladipo-Oshodi) and Abuja (Wuye Market) with delivery across London, Liverpool, Manchester, Birmingham, Leeds, and all UK postcodes.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <a href="#quote-calculator">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg">
                      Get a Nigeria-to-UK Shipping Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20from%20Nigeria%20to%20the%20UK" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold">
                      <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                      Speak with Logistics Specialist
                    </Button>
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center sm:text-left">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">5–10 Working Days</div>
                    <div className="text-xs text-blue-200">Standard Air Cargo</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">3–5 Working Days</div>
                    <div className="text-xs text-blue-200">Express Courier</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                    <div className="text-xs text-blue-200">UK Postcode Coverage</div>
                  </div>
                </div>
              </div>

              {/* Interactive Instant Estimate Form */}
              <div id="quote-calculator" className="lg:col-span-5">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-800 border border-slate-100">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">Quick Freight Calculator</span>
                    <h2 className="text-xl font-bold text-secondary">Calculate Nigeria-to-UK Shipping Cost</h2>
                    <p className="text-xs text-slate-500 mt-1">Select your origin city in Nigeria and destination city in the UK.</p>
                  </div>
                  <NigeriaUkQuoteForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who The Service Is For */}
        <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Tailored Logistics Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Who Uses Our Nigeria to UK Shipping Services?</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                Whether you are sending a single parcel to family or managing commercial trade across continents, County Cargo delivers dependable freight services tailored to your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-4">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-secondary text-lg mb-2">UK Diaspora & Families</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Individuals and families across the UK receiving authentic dried foodstuffs, regional ingredients, traditional attire, and personal belongings from home.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-secondary text-lg mb-2">Fashion & eCommerce Brands</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Nigerian fashion designers, beauty product suppliers, and online merchants shipping customer orders and boutique collections to UK buyers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-secondary text-lg mb-2">Commercial Exporters</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Wholesale suppliers and agribusinesses exporting packaged agricultural commodities, cultural merchandise, and commercial samples with full NEPC export compliance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-secondary text-lg mb-2">Students & Corporate Clients</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Nigerian students relocating to UK universities and corporations needing rapid delivery of legal documents, educational certificates, and office supplies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Options Breakdown */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Flexible Shipping Methods</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Nigeria to UK Freight & Transit Options</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                Choose the shipping method that matches your budget and timeline requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {serviceOptions.map((opt, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                    opt.popular
                      ? 'bg-gradient-to-b from-blue-900 to-slate-900 text-white shadow-xl ring-2 ring-primary relative'
                      : 'bg-slate-50 border border-slate-200 text-slate-800'
                  }`}
                >
                  {opt.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold py-1 px-4 rounded-full uppercase tracking-wider">
                      Most Popular Route
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-xl font-bold ${opt.popular ? 'text-white' : 'text-secondary'}`}>{opt.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${opt.popular ? 'bg-white/20 text-blue-200' : 'bg-blue-100 text-primary'}`}>
                        {opt.timeline}
                      </span>
                    </div>
                    <p className={`text-sm mb-6 ${opt.popular ? 'text-blue-100' : 'text-slate-600'}`}>
                      <strong>Ideal for:</strong> {opt.idealFor}
                    </p>
                    <ul className="space-y-3 text-sm mb-8">
                      {opt.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${opt.popular ? 'text-blue-400' : 'text-primary'}`} />
                          <span className={opt.popular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20details%20on%20" target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full font-bold ${opt.popular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-secondary hover:bg-secondary/90 text-white'}`}>
                      Request a Nigeria-to-UK Quote
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Permitted Foodstuffs & Prohibited Items Guide */}
        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">UK Border & DEFRA Compliance</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Permitted Foodstuffs vs. Prohibited Goods</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                To guarantee smooth clearance with UK Border Force and HMRC, adhere strictly to these commodity rules.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Permitted Food Items */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary">Permitted Dry Food Products</h3>
                    <p className="text-xs text-emerald-700 font-medium">Fully legal when commercially dried, clean & packaged</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  {permittedFoodItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-3.5 bg-emerald-50 rounded-xl text-xs text-emerald-800 flex items-start gap-2 border border-emerald-100">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>All dried food items are inspected and vacuum-sealed at our Lagos/Abuja depots to preserve freshness and ensure zero odor during transit.</span>
                </div>
                <div className="mt-3 text-center">
                  <Link
                    href="/export-food-from-nigeria-to-uk"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                  >
                    Read our complete Nigerian Food Export to UK &amp; DEFRA Guide →
                  </Link>
                </div>
              </div>

              {/* Prohibited Items */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-red-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary">Strictly Prohibited Items</h3>
                    <p className="text-xs text-red-700 font-medium">Banned by UK Border Force &amp; international aviation regulations</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  {restrictedItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-3.5 bg-red-50 rounded-xl text-xs text-red-800 flex items-start gap-2 border border-red-100">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>Attempting to ship prohibited meat, poultry, or unauthorized items will lead to immediate confiscation by UK Customs authorities.</span>
                </div>
                <div className="mt-3 text-center">
                  <Link
                    href="/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 underline"
                  >
                    Commercial Exporter? Read our NEPC, Form NXP &amp; DCTS Guide →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How The Process Works Step-by-Step */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Simple 5-Step Process</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">How Shipping from Nigeria to the UK Works</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                From drop-off in Lagos or Abuja to delivery at your doorstep anywhere in the United Kingdom.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  step: '01',
                  title: 'Drop-off or Pickup',
                  desc: 'Bring your packages to our Lagos or Abuja receiving hub, or schedule a nationwide doorstep collection.',
                },
                {
                  step: '02',
                  title: 'Inspection & Sealing',
                  desc: 'Our staff verify contents, calculate certified gross & volumetric weight, and professionally vacuum-seal food items.',
                },
                {
                  step: '03',
                  title: 'Transatlantic Flight',
                  desc: 'Shipments depart via scheduled air freighter flights to London Heathrow or Manchester Airport.',
                },
                {
                  step: '04',
                  title: 'HMRC UK Clearance',
                  desc: 'Our customs brokers clear cargo through UK Border Force with full declaration compliance.',
                },
                {
                  step: '05',
                  title: 'Final UK Delivery',
                  desc: 'Parcels are delivered directly to doorsteps across the UK or made available for pickup at our Liverpool depot (L1 0BG).',
                },
              ].map((s, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group hover:border-primary/50 transition-colors">
                  <div className="text-3xl font-black text-primary/20 group-hover:text-primary/40 transition-colors mb-2">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-secondary text-base mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UK Nationwide Coverage & Liverpool Depot */}
        <section className="py-14 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">UK Operational Footprint</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Doorstep Delivery Across Every UK Region &amp; Liverpool Depot Collection
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  County Cargo serves Nigerian families, students, and businesses across the entire United Kingdom. We handle final-mile delivery across all major metropolitan hubs and regional postcodes:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Greater London</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Liverpool &amp; Merseyside</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Greater Manchester</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Birmingham &amp; West Midlands</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Leeds &amp; Yorkshire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Leicester &amp; Nottingham</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bristol &amp; Southwest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Newcastle &amp; Northeast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Scotland, Wales &amp; NI</span>
                  </div>
                </div>

                <div className="p-5 bg-white/10 rounded-xl border border-white/15 text-sm text-slate-200 mt-6">
                  <div className="flex items-center gap-2 font-bold text-white mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Liverpool Facility:</span>
                  </div>
                  <p>
                    Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG. Open for direct customer parcel collection Monday to Friday (9am–5pm) and Saturday (10am–2pm).
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
                <h3 className="text-xl font-bold text-white">Why Choose County Cargo for Nigeria to UK Freight?</h3>
                <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>DEFRA &amp; HMRC Expertise:</strong> Deep experience with UK agricultural import rules ensuring foodstuff shipments clear without delays.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Transparent Weight Calculations:</strong> Certified weighing in Lagos & Abuja with zero surprise destination fees.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Reliable Door-to-Door Delivery:</strong> Direct parcel handover right to the recipient’s home or business address across the UK.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Dual-Country Customer Support:</strong> Responsive logistics coordinators available in both Nigeria and the United Kingdom.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20book%20a%20Nigeria%20to%20UK%20shipment" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3">
                      Check Next Shipment Flight Cut-Off
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Got Questions?</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Frequently Asked Questions: Shipping to the UK</h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Answers to common questions regarding costs, delivery timelines, food items, customs, and collection.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-200/80 last:border-0">
                  <AccordionTrigger className="text-left font-bold text-secondary hover:text-primary text-base py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-700 text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related Shipping Guides & Internal Links */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6 text-secondary font-bold text-xl">
              <FileText className="w-5 h-5 text-primary" />
              <h2>Helpful Nigeria-to-UK Export &amp; Cargo Guides</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/blog/complete-guide-shipping-from-nigeria-to-uk" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-secondary text-sm">Complete Nigeria to UK Guide</h3>
                  <p className="text-xs text-slate-600 mt-1">Detailed walkthrough of rates, packaging, and air cargo procedures.</p>
                </div>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">Read Guide <ArrowRight className="w-3 h-3" /></div>
              </Link>

              <Link href="/blog/cargo-cost-from-nigeria-to-uk" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-secondary text-sm">Nigeria to UK Cargo Cost</h3>
                  <p className="text-xs text-slate-600 mt-1">Understand weight pricing, airline freight charges, and handling fees.</p>
                </div>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">Read Guide <ArrowRight className="w-3 h-3" /></div>
              </Link>

              <Link href="/blog/uk-customs-packaging-restricted-items-explained" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-secondary text-sm">UK Customs &amp; Foodstuff Packaging</h3>
                  <p className="text-xs text-slate-600 mt-1">How to vacuum-seal foods and declare items to prevent UK Border delays.</p>
                </div>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">Read Guide <ArrowRight className="w-3 h-3" /></div>
              </Link>

              <Link href="/shipping-from-uk-to-nigeria" className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-primary text-sm">Shipping from the UK to Nigeria</h3>
                  <p className="text-xs text-slate-600 mt-1">Sending cargo in the reverse direction? Explore our UK to Nigeria services.</p>
                </div>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">Explore UK-to-Nigeria <ArrowRight className="w-3 h-3" /></div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-blue-900 to-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold hero-text-glow">
              Ready to Send Cargo from Nigeria to the United Kingdom?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
              Get an accurate quote today or bring your packages to our Lagos or Abuja receiving hub. Our team ensures compliant, rapid transatlantic delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20book%20a%20shipment%20from%20Nigeria%20to%20the%20UK" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-xl">
                  Get a Nigeria-to-UK Shipping Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-6">
                  View Lagos &amp; Abuja Drop-off Locations
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
