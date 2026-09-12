import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import { AiOverview } from '@/components/ai-overview';
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
  Calculator,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UkNigeriaQuoteForm } from './quote-form';

export const metadata: Metadata = {
  title: 'Shipping From UK to Nigeria: 2026 Prices and Guide',
  description:
    'Comprehensive 2026 guide for shipping cargo from the UK to Nigeria. Compare air freight rates (£6.00/kg), express delivery (3–5 working days), sea cargo barrels, customs clearance, and door-to-door delivery across Lagos, Abuja, and all 36 states.',
  keywords:
    'Shipping from UK to Nigeria, UK to Nigeria cargo, Air cargo from UK to Nigeria, Sea cargo from UK to Nigeria, UK to Nigeria shipping prices, Door-to-door cargo to Nigeria, Send a parcel from UK to Nigeria, London to Lagos cargo, Liverpool to Nigeria shipping, Manchester to Nigeria cargo',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-uk-to-nigeria',
  },
  openGraph: {
    title: 'Shipping From UK to Nigeria: 2026 Prices and Guide',
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
      'Delivery times depend on the service selected. Express Air Courier takes 3 to 5 working days for urgent parcels. Standard Air Cargo takes 5 to 10 working days from our weekly Wednesday shipment cut-off. Sea Freight (including shipping barrels, boxes, and commercial containers) takes 4 to 8 weeks from vessel departure to clearance at Lagos ports.',
  },
  {
    question: 'What is the cost of shipping cargo from the UK to Nigeria?',
    answer:
      'Standard air cargo from the UK to Nigeria starts at £6.00 per kg (minimum 1kg) plus a £15 handling fee per shipment. For example, a 10kg box costs £75, a 20kg box costs £135, and a 30kg box costs £195. Sea freight barrels and commercial containers are priced per unit or volume.',
  },
  {
    question: 'What is the weekly shipment cut-off deadline for air cargo?',
    answer:
      'Our weekly UK air cargo consolidation cut-off is every Wednesday at 5:00 PM. Consignments received by Wednesday evening are processed, labelled, and loaded onto Friday cargo flights for arrival and clearance in Nigeria by the following week.',
  },
  {
    question: 'Where is County Cargo’s UK receiving depot located?',
    answer:
      'County Cargo operates two dedicated UK facilities: our London Drop-Off Point at New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF (serving London, Greenwich, Woolwich, and South East London), and our northern receiving warehouse at Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG. Both locations accept direct cargo drop-offs Monday–Friday 9am–5pm and Saturday 10am–2pm.',
  },
  {
    question: 'Do you offer parcel collection from London, Manchester, Birmingham, and other UK cities?',
    answer:
      'Yes. We provide scheduled parcel and barrel collection across Greater London (Peckham, Woolwich, Wembley, Croydon, Barking, Tottenham), Manchester, Birmingham, Leeds, Nottingham, Leicester, and nationwide UK.',
  },
  {
    question: 'Do you deliver outside Lagos to Abuja, Port Harcourt, Kano, and other states?',
    answer:
      'Yes. After customs clearance in Lagos or airport arrival, packages are dispatched across our nationwide Nigerian delivery network covering Abuja (Garki/Wuse hub), Port Harcourt, Kano (Sabon Gari depot), Ibadan, Kaduna, Enugu, and all 36 states with doorstep or regional hub pickup options.',
  },
  {
    question: 'Can I shop online from UK retailers and deliver to your Liverpool warehouse?',
    answer:
      'Yes. You can shop on Amazon UK, eBay, Argos, Currys, ASOS, or wholesale suppliers and use our Liverpool warehouse address as your UK delivery destination. Once your orders arrive, we inspect, consolidate into one box, and ship them directly to you in Nigeria.',
  },
  {
    question: 'How does customs clearance work in Nigeria?',
    answer:
      'County Cargo handles all Nigerian customs clearance at Murtala Muhammed International Airport (Lagos cargo terminal) and Lagos seaports (Apapa and Tin Can Island). Our per-kg air rates include customs clearing handling for standard goods.',
  },
  {
    question: 'How is volumetric weight calculated for air freight?',
    answer:
      'Air cargo freight charges are determined by chargeable weight, which is the greater of actual scale weight (in kg) and volumetric dimensional weight calculated using the standard formula: (Length × Width × Height in cm) ÷ 5,000.',
  },
  {
    question: 'What items are prohibited from UK-to-Nigeria shipping?',
    answer:
      'Prohibited items include firearms, ammunition, military gear, explosives, fireworks, illegal narcotics, counterfeit currency, hazardous corrosive chemicals, and items listed on the Nigeria Customs Service Absolute Import Prohibition list.',
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

const pricingExamples = [
  {
    weight: '5 kg Parcel',
    standardCost: '£45.00',
    expressCost: 'Calculated Tariff',
    time: '5–10 Working Days (Air)',
    details: 'Small personal gifts, shoes, clothing, documents',
  },
  {
    weight: '10 kg Box',
    standardCost: '£75.00',
    expressCost: 'Calculated Tariff',
    time: '5–10 Working Days (Air)',
    details: '£6.00/kg x 10kg + £15 handling fee (Qualifies for Free Abuja Local Delivery)',
  },
  {
    weight: '20 kg Box',
    standardCost: '£135.00',
    expressCost: 'Calculated Tariff',
    time: '5–10 Working Days (Air)',
    details: '£6.00/kg x 20kg + £15 handling fee (Ideal for family care packages & clothes)',
  },
  {
    weight: '30 kg Box',
    standardCost: '£195.00',
    expressCost: 'Calculated Tariff',
    time: '5–10 Working Days (Air)',
    details: '£6.00/kg x 30kg + £15 handling fee (Heavy personal luggage or online store stock)',
  },
  {
    weight: '55-Gallon Jumbo Sea Barrel',
    standardCost: 'Contact Depot',
    expressCost: 'N/A (Sea Freight)',
    time: '4–8 Weeks (Sea)',
    details: 'Non-perishable provisions, toiletries, heavy household items & appliances',
  },
];

const supportingRoutes = [
  { title: 'London to Nigeria Shipping', href: '/shipping-from-london-to-nigeria', desc: 'Doorstep collection across Peckham, Woolwich, Wembley, Croydon & Greater London.' },
  { title: 'London to Lagos Guide', href: '/blog/shipping-from-london-to-lagos', desc: 'Direct air cargo to Murtala Muhammed Airport & Ladipo hub pickup.' },
  { title: 'London to Abuja Guide', href: '/blog/shipping-from-london-to-abuja', desc: 'Air cargo arriving via Nnamdi Azikiwe Airport & Garki depot collection.' },
  { title: 'London to Kano Guide', href: '/blog/shipping-from-london-to-kano', desc: 'Bonded onward cargo transit to Sabon Gari commercial depot.' },
  { title: 'Liverpool to Nigeria Cargo', href: '/shipping-from-liverpool-to-nigeria', desc: 'Drop off at Unit G6 Queens Dock warehouse L1 0BG.' },
  { title: 'Free Delivery to Abuja Offer', href: '/blog/free-delivery-to-abuja', desc: 'Free local FCT delivery for qualifying shipments weighing 10kg+.' },
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
                  <span>Shipping From UK to Nigeria: 2026 Prices &amp; Complete Guide</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight hero-text-glow leading-tight">
                  Shipping from the UK to Nigeria
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-blue-100 font-light leading-relaxed max-w-2xl">
                  Air and sea cargo prices, delivery times, customs rules, and door-to-door delivery from London, Liverpool, Manchester, and Birmingham directly to Lagos, Abuja, Kano, and nationwide across all 36 Nigerian states.
                </p>

                {/* Direct Quotable Summary Block for AI Search & Users */}
                <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 text-slate-100 text-sm sm:text-base leading-relaxed">
                  <p className="font-medium text-white flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <strong>2026 Verified Shipping Summary:</strong>
                  </p>
                  <p>
                    Standard air cargo from the UK to Nigeria costs <strong>£6.00 per kg</strong> plus a <strong>£15 handling fee</strong> with delivery in <strong>5 to 10 working days</strong>. Express Air Courier delivers in <strong>3 to 5 working days</strong>, while Sea Cargo barrels arrive in <strong>4 to 8 weeks</strong>. Doorstep collection is available across Greater London, Liverpool depot (L1 0BG drop-off), Manchester, and Birmingham, with complete customs clearance and final delivery in Lagos, Abuja, Kano, and all 36 states.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <a href="#quote-calculator">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg">
                      Request UK-to-Nigeria Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20from%20the%20UK%20to%20Nigeria" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold">
                      <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                      Speak with UK Depot
                    </Button>
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center sm:text-left">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">£6.00 / kg</div>
                    <div className="text-xs text-blue-200">Standard Air Rate (+£15 fee)</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">5–10 Working Days</div>
                    <div className="text-xs text-blue-200">Air Cargo Transit</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">36 States</div>
                    <div className="text-xs text-blue-200">Nigeria Doorstep Reach</div>
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

        {/* AI Overview & Competitor Ranking Section */}
        <AiOverview />

        {/* Cost Breakdown & Price Examples Table */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Transparent Rates</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">2026 UK to Nigeria Shipping Cost Examples</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                See exact pricing breakdowns for standard box weights and sea freight shipping barrels.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-100 text-secondary font-bold text-xs uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-4">Shipment Size / Weight</th>
                    <th className="p-4">Standard Air Cost</th>
                    <th className="p-4">Delivery Time</th>
                    <th className="p-4">Service Breakdown &amp; Benefits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {pricingExamples.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-secondary flex items-center gap-2">
                        <Scale className="w-4 h-4 text-primary shrink-0" />
                        {item.weight}
                      </td>
                      <td className="p-4 font-extrabold text-primary text-base">{item.standardCost}</td>
                      <td className="p-4 font-semibold text-slate-900">{item.time}</td>
                      <td className="p-4 text-xs sm:text-sm text-slate-600">{item.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary shrink-0" />
                <span>Standard Air Cargo: £6.00/kg rate + £15 handling fee. Qualifying shipments of 10kg+ to Abuja get free local delivery!</span>
              </div>
              <Link href="/blog/free-delivery-to-abuja" className="text-primary font-bold hover:underline shrink-0 flex items-center gap-1">
                View Abuja Offer <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* Supporting Routes Interlinking Hub */}
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary">UK Regional &amp; Nigerian Destination Guides</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {supportingRoutes.map((route, i) => (
                <Link key={i} href={route.href} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all group">
                  <h3 className="font-bold text-secondary text-base group-hover:text-primary transition-colors flex items-center justify-between">
                    {route.title}
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                  </h3>
                  <p className="text-xs text-slate-600 mt-2">{route.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Shipment Cut-Off & Delivery Schedule */}
        <section className="py-14 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Operational Cut-off Schedule</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Weekly Air Cargo Cut-Off: Wednesdays at 5:00 PM
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  To ensure predictable delivery schedules, County Cargo operates a strict weekly consolidation cycle. Packages received at our Liverpool depot or collected across Greater London, Manchester, and Birmingham by <strong>Wednesday 5:00 PM</strong> are processed, weighed, and dispatched on Friday cargo flights.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-slate-200">
                  <div className="p-4 bg-white/10 rounded-xl border border-white/15">
                    <div className="font-bold text-emerald-400 flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" /> Wednesday Cut-Off
                    </div>
                    <p className="text-xs text-slate-300">All cargo must be received at Liverpool depot or collected by Wednesday 5 PM.</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl border border-white/15">
                    <div className="font-bold text-blue-400 flex items-center gap-2 mb-1">
                      <Plane className="w-4 h-4" /> Friday Departure
                    </div>
                    <p className="text-xs text-slate-300">Consolidations depart UK airports on Friday for weekend arrival in Lagos/Abuja.</p>
                  </div>
                </div>

                <div className="p-5 bg-white/10 rounded-xl border border-white/15 text-sm text-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Liverpool Depot Location &amp; Drop-off:</span>
                  </div>
                  <p>
                    Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG.
                  </p>
                  <p className="text-xs text-blue-200">
                    Mon – Fri: 9:00 AM – 5:00 PM | Sat: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
                <h3 className="text-xl font-bold text-white">Packaging &amp; Volumetric Weight Rules</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Chargeable weight is calculated using the greater of actual scale weight (kg) and volumetric weight:
                </p>
                <div className="p-3 bg-black/40 rounded-lg text-center font-mono text-sm text-amber-300 border border-amber-400/30">
                  Volumetric Weight (kg) = (Length x Width x Height in cm) / 5000
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Use double-wall cardboard boxes for heavy items to prevent bursting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Bubble wrap electronics and seal liquids in watertight bags.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Secure 55-gallon sea barrels with heavy-duty locking rims.</span>
                  </li>
                </ul>

                <div>
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20book%20a%20shipment%20for%20this%20Wednesday" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3">
                      Book Before Wednesday Cut-off
                    </Button>
                  </a>
                </div>
              </div>
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

        {/* UK Drop-Off Points & Receiving Depots Network */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">UK Network</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Our UK Drop-Off Points &amp; Receiving Warehouses</h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Drop off your cargo directly at our staffed UK receiving depots, or book doorstep pickup across the UK.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* London Charlton Drop-Off Point */}
              <div className="bg-gradient-to-br from-blue-50/60 to-sky-50/40 p-6 sm:p-8 rounded-2xl border-2 border-blue-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-full">
                      London Drop-Off Point
                    </span>
                    <span className="text-xs text-blue-700 font-semibold">Charlton, South East London</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">County Cargo London Drop-Off</h3>
                  <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                    New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-600 pb-4">
                    <p><strong className="text-slate-900">Coverage:</strong> Charlton, Greenwich, Woolwich, Blackheath, Lewisham, Deptford, Eltham &amp; SE London.</p>
                    <p><strong className="text-slate-900">Services:</strong> Drop-off, local pickup (Free for air cargo 30kg+, sea cargo for a small fee), air cargo &amp; sea freight.</p>
                    <p><strong className="text-slate-900">Opening Hours:</strong> Mon–Fri 9am–5pm | Sat 10am–2pm</p>
                    <p><strong className="text-slate-900">Depot Contact:</strong> 07405 556668 (Phone &amp; WhatsApp)</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-blue-200/60 flex flex-wrap gap-3">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm">
                    <Link href="/shipping-from-london-to-nigeria">
                      London Location Details &amp; Directions <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Liverpool Depot */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-700 text-white px-3 py-1 rounded-full">
                      North West Depot
                    </span>
                    <span className="text-xs text-slate-600 font-semibold">Liverpool Warehouse</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">County Cargo Liverpool Receiving Depot</h3>
                  <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                    Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-600 pb-4">
                    <p><strong className="text-slate-900">Coverage:</strong> Liverpool, Manchester, Preston, Leeds, North West England &amp; nationwide collection.</p>
                    <p><strong className="text-slate-900">Services:</strong> Online retail delivery hub, air freight consolidation &amp; sea containers.</p>
                    <p><strong className="text-slate-900">Opening Hours:</strong> Mon–Fri 9am–5pm | Sat 10am–2pm</p>
                    <p><strong className="text-slate-900">Contact:</strong> +234 811 000 0421 / +44 7438 827464</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="text-xs sm:text-sm font-semibold">
                    <Link href="/contact">
                      View Depot &amp; Contact Info <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-14 sm:py-20 bg-slate-50/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Frequently Asked</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">UK to Nigeria Shipping FAQs</h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Everything you need to know about pricing, transit times, barrel shipping, and customs clearance.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
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

        {/* Final CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-blue-900 to-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold hero-text-glow">
              Ship from the UK to Nigeria with Complete Confidence
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
              Drop off your cargo at our London Charlton location or Liverpool warehouse, or book a free UK collection today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20request%20a%20UK%20to%20Nigeria%20quote" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-xl">
                  Request UK-to-Nigeria Cargo Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/shipping-from-london-to-nigeria">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 shadow-lg">
                  London Charlton Drop-Off
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-6">
                  Depot Locations
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
