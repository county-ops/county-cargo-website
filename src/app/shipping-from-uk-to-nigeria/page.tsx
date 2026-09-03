import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import {
  Plane,
  Ship,
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
  Boxes,
  ShoppingBag,
  Scale,
  Truck,
  Check,
  ExternalLink,
  ChevronRight,
  Info,
  Tv,
  Container,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UkNigeriaQuoteForm } from './quote-form';

export const metadata: Metadata = {
  title: 'Shipping from UK to Nigeria | Air & Sea Cargo, Barrels, Door-to-Door | County Cargo',
  description:
    'Reliable air cargo, express shipping, and ocean freight from the UK to Nigeria. Ship barrels, boxes, electronics, personal effects, and commercial cargo from Liverpool, London, Manchester, and Birmingham to Lagos, Abuja, and nationwide.',
  keywords:
    'shipping from the UK to Nigeria, UK to Nigeria cargo, send parcels from the UK to Nigeria, door-to-door cargo from the UK to Nigeria, UK to Lagos shipping, UK to Abuja cargo, Liverpool to Nigeria shipping, air cargo from the UK to Nigeria, sea cargo from the UK to Nigeria, express delivery from the UK to Nigeria, County Cargo UK to Nigeria, ship barrel from UK to Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-uk-to-nigeria',
  },
  openGraph: {
    title: 'Shipping from UK to Nigeria | Air & Sea Cargo, Barrels, Door-to-Door | County Cargo',
    description:
      'Fast, secure air cargo and sea freight from the UK to Nigeria. Drop off at our Liverpool depot or book UK collection. Doorstep delivery across Lagos, Abuja, Port Harcourt, and nationwide.',
    url: 'https://countycargo.com/shipping-from-uk-to-nigeria',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/service-uk-nigeria-new.jpg',
        width: 1200,
        height: 630,
        alt: 'County Cargo Air Freight and Sea Cargo from UK to Nigeria',
      },
    ],
  },
};

const faqs = [
  {
    question: 'How long does shipping from the UK to Nigeria take?',
    answer:
      'Delivery times depend on the service selected. Standard Air Cargo takes 5 to 10 working days from our weekly shipment cut-off. Express Air Cargo takes 3 to 5 working days for urgent parcels. Sea Freight (including shipping barrels, boxes, and commercial containers) takes 4 to 6 weeks from vessel departure to clearance at Lagos ports.',
  },
  {
    question: 'Where is County Cargo’s UK receiving depot located?',
    answer:
      'Our primary UK operational office and receiving warehouse is located at Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG. Customers in the North West can drop off shipments directly during opening hours (Monday–Friday 9am–5pm, Saturday 10am–2pm).',
  },
  {
    question: 'Do you offer parcel collection from London, Manchester, Birmingham, and other UK cities?',
    answer:
      'Yes. We provide scheduled parcel and barrel collection across London, Greater Manchester, Birmingham, Leeds, Nottingham, Leicester, and other UK areas. You can book a doorstep collection directly through our team.',
  },
  {
    question: 'Can I shop online from UK retailers and deliver to your Liverpool warehouse?',
    answer:
      'Yes. You can shop on Amazon UK, eBay, Argos, Currys, ASOS, or wholesale suppliers and use our Liverpool warehouse address as your UK delivery destination. Once your orders arrive, we inspect, consolidate, and ship them directly to you in Nigeria.',
  },
  {
    question: 'How does customs clearance work in Nigeria?',
    answer:
      'County Cargo handles all Nigerian customs clearance at Murtala Muhammed International Airport (Lagos cargo terminal) and Lagos seaports (Apapa and Tin Can Island). Our per-kg air rates and barrel ocean rates include customs clearing handling for standard goods, meaning you do not have to negotiate with customs officers yourself.',
  },
  {
    question: 'Can I ship electronics, laptops, and smartphones from the UK to Nigeria?',
    answer:
      'Yes. Electronics, laptops, mobile phones, televisions, and household appliances are accepted. High-value electronics must be declared accurately on the shipment booking form with serial numbers, and are packed securely in reinforced, bubble-wrapped packaging.',
  },
  {
    question: 'What is the cost of shipping a barrel from the UK to Nigeria?',
    answer:
      'Standard 55-gallon jumbo shipping barrels are transported via our regular sea freight service. Pricing is based on destination in Nigeria (Lagos depot collection vs. home delivery in Lagos or interstate delivery to Abuja, Port Harcourt, etc.). Contact our Liverpool office for this week’s current sea freight barrel rates.',
  },
  {
    question: 'Do you deliver outside Lagos to Abuja, Port Harcourt, Kano, and other states?',
    answer:
      'Yes. After customs clearance in Lagos, packages are dispatched across our nationwide Nigerian delivery network covering Abuja, Port Harcourt, Ibadan, Kano, Kaduna, Enugu, Asaba, Benin City, and all 36 states with doorstep or regional hub pickup options.',
  },
  {
    question: 'What items are prohibited from UK-to-Nigeria shipping?',
    answer:
      'Prohibited items include firearms, ammunition, military gear, explosives, fireworks, illegal narcotics, counterfeit currency, hazardous corrosive chemicals, and items listed on the Nigeria Customs Service Absolute Import Prohibition list.',
  },
  {
    question: 'How is volumetric weight calculated for air freight?',
    answer:
      'Air cargo freight charges are determined by chargeable weight, which is the greater of actual scale weight (in kg) and volumetric dimensional weight calculated using the standard airline formula: (Length × Width × Height in cm) ÷ 5,000.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://countycargo.com/shipping-from-uk-to-nigeria#service',
      name: 'Shipping from the UK to Nigeria',
      serviceType: 'International Air & Sea Cargo Forwarding',
      provider: {
        '@type': 'LocalBusiness',
        '@id': 'https://countycargo.com/#liverpool-branch',
        name: 'County Cargo UK',
      },
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Nigeria' },
      ],
      description:
        'Fast and dependable air freight, ocean cargo, barrel shipping, and door-to-door cargo services from Liverpool, London, and nationwide UK to Lagos, Abuja, and all Nigerian states.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: 'https://countycargo.com/shipping-from-uk-to-nigeria',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://countycargo.com/shipping-from-uk-to-nigeria#breadcrumbs',
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
          name: 'Shipping from UK to Nigeria',
          item: 'https://countycargo.com/shipping-from-uk-to-nigeria',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://countycargo.com/shipping-from-uk-to-nigeria#faq',
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

const serviceTiers = [
  {
    title: 'Standard Air Cargo',
    timeline: '5–10 Working Days',
    idealFor: 'Luggage, clothing, electronics, packaged goods, online store orders, and gifts',
    features: [
      'Weekly flight consolidations to Lagos & Abuja',
      'Door-to-door delivery across all 36 states',
      'Lagos airport customs clearance included',
      'Online shipment milestone tracking',
      'Minimum weight starting from 1kg / 5kg',
    ],
    popular: true,
  },
  {
    title: 'Express Air Cargo',
    timeline: '3–5 Working Days',
    idealFor: 'Urgent business documents, replacement components, priority samples, and high-value orders',
    features: [
      'Highest flight departure priority',
      'Expedited airport handover & processing',
      'Direct courier doorstep delivery',
      'Real-time transit updates',
      'Express handling in Lagos and Abuja',
    ],
    popular: false,
  },
  {
    title: 'Sea Freight & Barrels',
    timeline: '4–6 Weeks',
    idealFor: '55-gallon jumbo barrels, heavy machinery, boxed household goods, and bulk pallets',
    features: [
      'Most economical option for heavy cargo',
      'Standard & jumbo drum shipping',
      'Full Container Load (FCL) & LCL options',
      'Port clearance at Apapa / Tin Can Island',
      'Doorstep delivery in Lagos & interstate',
    ],
    popular: false,
  },
];

const eligibleItems = [
  {
    title: 'Barrels & Heavy Boxes',
    desc: '55-gallon plastic drums and heavy-duty double-wall cartons packed with household provisions, non-perishable foods, toiletries, and family gifts.',
    icon: <Container className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Electronics & Gadgets',
    desc: 'Smartphones, laptops, iPads, flat-screen televisions, gaming consoles, and home appliances safely strapped and packaged.',
    icon: <Tv className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Personal Belongings & Apparel',
    desc: 'Designer clothing, footwear, baby essentials, cosmetics, books, kitchenware, and personal effects.',
    icon: <ShoppingBag className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Commercial Merchandise & Spare Parts',
    desc: 'Automotive components, industrial machinery, wholesale merchandise, retail stock, and salon supplies for Nigerian businesses.',
    icon: <Building2 className="w-6 h-6 text-primary" />,
  },
];

export default function ShippingFromUkToNigeriaPage() {
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
              Shipping from UK to Nigeria
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          className="relative py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(10, 25, 47, 0.90) 0%, rgba(15, 23, 42, 0.95) 100%), url('/service-uk-nigeria-new.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs sm:text-sm font-semibold">
                  <Plane className="w-4 h-4 text-blue-400" />
                  <span>UK to Nigeria Air &amp; Sea Cargo Services</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight hero-text-glow leading-tight">
                  Shipping from the UK to Nigeria
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-blue-100 font-light leading-relaxed max-w-2xl">
                  Fast, dependable air freight, sea cargo barrels, and door-to-door delivery from Liverpool, London, Manchester, and Birmingham directly to Lagos, Abuja, Port Harcourt, and nationwide across Nigeria.
                </p>

                {/* Direct Quotable Summary Block for AI Search & Users */}
                <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 text-slate-100 text-sm sm:text-base leading-relaxed">
                  <p className="font-medium text-white flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <strong>Verified Service Summary:</strong>
                  </p>
                  <p>
                    County Cargo provides air cargo, sea freight, express delivery, barrel shipping, and door-to-door cargo services from the United Kingdom to Nigeria. Customers can drop off packages at our Liverpool receiving depot (Unit G6, Queens Dock) or arrange UK nationwide collection with final delivery in Lagos, Abuja, Port Harcourt, Kano, and across Nigeria.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <a href="#quote-calculator">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg">
                      Request a UK-to-Nigeria Cargo Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20from%20the%20UK%20to%20Nigeria" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold">
                      <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                      Speak with Liverpool Depot
                    </Button>
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center sm:text-left">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">5–10 Days</div>
                    <div className="text-xs text-blue-200">Standard Air Cargo</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">4–6 Weeks</div>
                    <div className="text-xs text-blue-200">Sea Cargo Barrels</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">36 States</div>
                    <div className="text-xs text-blue-200">Nigeria Delivery Reach</div>
                  </div>
                </div>
              </div>

              {/* Instant Freight Estimate Calculator */}
              <div id="quote-calculator" className="lg:col-span-5">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-800 border border-slate-100">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">Instant Calculator</span>
                    <h2 className="text-xl font-bold text-secondary">Calculate UK to Nigeria Shipping Cost</h2>
                    <p className="text-xs text-slate-500 mt-1">Select your UK departure city and Nigerian destination.</p>
                  </div>
                  <UkNigeriaQuoteForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Ship */}
        <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Versatile Freight Handling</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">What Can You Ship from the UK to Nigeria?</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                From personal boxes and electronics to jumbo barrels and commercial pallet shipments, County Cargo handles your cargo with expert care.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eligibleItems.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-secondary text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Options Breakdown */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Tailored Transit Speeds</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">UK to Nigeria Air Freight &amp; Sea Cargo Options</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                Choose the best balance of speed and cost for your personal effects or business inventory.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {serviceTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-b from-blue-900 to-slate-900 text-white shadow-xl ring-2 ring-primary relative'
                      : 'bg-slate-50 border border-slate-200 text-slate-800'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold py-1 px-4 rounded-full uppercase tracking-wider">
                      Most Selected Route
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-xl font-bold ${tier.popular ? 'text-white' : 'text-secondary'}`}>{tier.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tier.popular ? 'bg-white/20 text-blue-200' : 'bg-blue-100 text-primary'}`}>
                        {tier.timeline}
                      </span>
                    </div>
                    <p className={`text-sm mb-6 ${tier.popular ? 'text-blue-100' : 'text-slate-600'}`}>
                      <strong>Best suited for:</strong> {tier.idealFor}
                    </p>
                    <ul className="space-y-3 text-sm mb-8">
                      {tier.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.popular ? 'text-blue-400' : 'text-primary'}`} />
                          <span className={tier.popular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20book%20a%20UK%20to%20Nigeria%20shipment" target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full font-bold ${tier.popular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-secondary hover:bg-secondary/90 text-white'}`}>
                      Request a UK-to-Nigeria Quote
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Liverpool Depot & UK Nationwide Collection */}
        <section className="py-14 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">UK Hub &amp; Receiving Depot</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Liverpool Receiving Depot &amp; Nationwide UK Collection
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Drop off your goods directly at our established Liverpool commercial depot or arrange for our courier network to collect packages from your home or business anywhere in the UK:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Liverpool (Depot &amp; Drop-off)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>London &amp; Greater London</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Manchester &amp; Salford</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Birmingham &amp; Midlands</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Leeds, Bradford &amp; Sheffield</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Leicester &amp; Nottingham</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bristol, Cardiff &amp; Southwest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Newcastle &amp; Sunderland</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Scotland, Wales &amp; All UK</span>
                  </div>
                </div>

                <div className="p-5 bg-white/10 rounded-xl border border-white/15 text-sm text-slate-200 mt-6 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>UK Facility Address:</span>
                  </div>
                  <p>
                    Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG.
                  </p>
                  <p className="text-xs text-blue-200">
                    Opening Hours: Monday – Friday: 9:00 AM – 5:00 PM | Saturday: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
                <h3 className="text-xl font-bold text-white">Why Ship with County Cargo UK?</h3>
                <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Lagos Customs Handled:</strong> Our dedicated brokers clear groupage air and sea shipments without unexpected demurrage.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Free Online Shopping Consolidation:</strong> Shop with multiple UK retailers and consolidate into one shipment to save freight costs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Nationwide Nigeria Delivery:</strong> Doorstep handover in Lagos, Abuja, Port Harcourt, and state capitals.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Direct Support in UK &amp; Nigeria:</strong> Speak to real staff in Liverpool or Lagos at every step of your shipment.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20check%20the%20next%20UK-to-Nigeria%20shipment%20date" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3">
                      Check Next Weekly Shipment Date
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step by Step Shipping Process */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Transparent Logistics</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">How Shipping from the UK to Nigeria Works</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                Seamless flow from UK warehouse receiving to safe delivery across Nigeria.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  step: '01',
                  title: 'Drop-off or Collection',
                  desc: 'Deliver your items to our Liverpool depot (L1 0BG), book a UK courier collection, or order online to our warehouse address.',
                },
                {
                  step: '02',
                  title: 'Weighing & Labelling',
                  desc: 'We measure actual & volumetric weight, reinforce packaging, apply barcode tracking labels, and issue your invoice.',
                },
                {
                  step: '03',
                  title: 'Air / Sea Transit',
                  desc: 'Your consignment departs on the next scheduled flight to Lagos (5–10 days) or ocean vessel to Lagos port (4–6 weeks).',
                },
                {
                  step: '04',
                  title: 'Nigerian Customs Clear',
                  desc: 'County Cargo’s clearing team handles import declaration, duty processing, and terminal release at Lagos.',
                },
                {
                  step: '05',
                  title: 'Lagos Pickup or Doorstep',
                  desc: 'Collect at our Ladipo-Oshodi Lagos hub or receive direct doorstep delivery to Lagos, Abuja, Port Harcourt, and nationwide.',
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

        {/* Permitted vs Prohibited Items */}
        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Import Compliance</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Permitted Cargo vs. Prohibited UK-to-Nigeria Items</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                Ensure your items comply with Nigerian Customs Service (NCS) regulations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Permitted Items */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary">Allowed &amp; Common Cargo</h3>
                    <p className="text-xs text-emerald-700 font-medium">Standard personal and commercial freight</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Laptops, smartphones, TVs, audio equipment, and computer parts</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Clothing, shoes, bags, baby gear, and fashion accessories</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Shipping barrels packed with dry food, toiletries, and household essentials</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Automotive spare parts, mechanical equipment, and hand tools</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Commercial stock, beauty products, and retail inventory</span>
                  </li>
                </ul>
              </div>

              {/* Prohibited Items */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-red-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary">Strictly Prohibited Items</h3>
                    <p className="text-xs text-red-700 font-medium">Banned under Nigeria Customs Import Prohibition List</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Firearms, ammunition, military uniforms, and tactical gear</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Counterfeit currency, unregistered narcotics, and illicit drugs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Fireworks, hazardous explosives, and corrosive industrial chemicals</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Expired pharmaceutical products and perishable fresh foods</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Items on Nigeria Customs absolute import ban list</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Frequently Asked</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">UK to Nigeria Shipping FAQs</h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Everything you need to know about pricing, transit times, barrel shipping, and customs clearance.
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
              <h2>Essential UK to Nigeria Shipping Resources</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/shipping-from-liverpool-to-nigeria" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-secondary text-sm">Liverpool to Nigeria Shipping</h3>
                  <p className="text-xs text-slate-600 mt-1">Our dedicated guide for Merseyside and North West shippers.</p>
                </div>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">Read Guide <ArrowRight className="w-3 h-3" /></div>
              </Link>

              <Link href="/blog/air-freight-vs-sea-freight-to-nigeria" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-secondary text-sm">Air Freight vs. Sea Freight</h3>
                  <p className="text-xs text-slate-600 mt-1">Compare cost, transit time, and volume limits for your cargo.</p>
                </div>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">Read Guide <ArrowRight className="w-3 h-3" /></div>
              </Link>

              <Link href="/blog/shipping-barrels-from-uk-to-nigeria" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-secondary text-sm">UK Barrels Shipping Guide</h3>
                  <p className="text-xs text-slate-600 mt-1">How to pack, seal, and ship 55-gallon drums to Nigeria.</p>
                </div>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">Read Guide <ArrowRight className="w-3 h-3" /></div>
              </Link>

              <Link href="/shipping-from-nigeria-to-uk" className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-primary text-sm">Shipping from Nigeria to UK</h3>
                  <p className="text-xs text-slate-600 mt-1">Need to send goods or food from Nigeria to the UK? Learn more.</p>
                </div>
                <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">Explore Nigeria-to-UK <ArrowRight className="w-3 h-3" /></div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-blue-900 to-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold hero-text-glow">
              Ship from the UK to Nigeria with Complete Confidence
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
              Get an instant shipping quote, book a UK collection, or drop off your cargo at our Liverpool warehouse.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20request%20a%20UK%20to%20Nigeria%20quote" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-xl">
                  Request a UK-to-Nigeria Cargo Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-6">
                  Find Liverpool Depot &amp; Contact Info
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
