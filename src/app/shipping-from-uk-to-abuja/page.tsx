import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import { ShippingCalculator } from '@/components/shipping-calculator';
import {
  Plane,
  Clock,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  MapPin,
  AlertTriangle,
  Building2,
  Calendar,
  UserCheck,
  Scale,
  Truck,
  Check,
  ChevronRight,
  Info,
  Gift,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from UK to Abuja | Air Cargo | County Cargo',
  description:
    'Ship cargo from the UK to Abuja from £6.50/kg plus handling. Get an instant estimate and arrange collection or drop-off with County Cargo.',
  keywords:
    'Shipping from UK to Abuja, UK to Abuja cargo, Cargo from UK to Abuja, London to Abuja cargo, Cheap shipping from UK to Abuja, Air cargo UK to Abuja, Free delivery Abuja cargo, Wuye Market Abuja cargo pickup, FCT doorstep cargo delivery, Send parcel to Abuja',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-uk-to-abuja',
  },
  openGraph: {
    title: 'Shipping from UK to Abuja | Air Cargo | County Cargo',
    description:
      'Ship cargo from the UK to Abuja from £6.50/kg plus handling. Get an instant estimate and arrange collection or drop-off with County Cargo.',
    url: 'https://countycargo.com/shipping-from-uk-to-abuja',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/london-to-abuja-cargo.jpg',
        width: 1200,
        height: 630,
        alt: 'County Cargo - Shipping from UK to Abuja Air Cargo',
      },
    ],
  },
};

const abujaFaqs = [
  {
    question: 'What is the cost of shipping air cargo from the UK to Abuja?',
    answer:
      'Standard air cargo from the UK to Abuja is priced at £6.50 per kg plus a £15 handling fee per consignment. For example, a 10kg box costs £80 (£65 freight + £15 handling), a 20kg box costs £145, and a 30kg box costs £210. Currently, qualifying shipments of 10kg and above receive 100% Free Doorstep Delivery across Abuja FCT.',
  },
  {
    question: 'How does the Free Abuja Doorstep Delivery promotion work?',
    answer:
      'While our active promotional campaign is running, any air cargo consignment shipped from the UK to Abuja weighing 10kg or more qualifies for completely free local doorstep delivery anywhere in Abuja (Garki, Wuse, Maitama, Asokoro, Gwarinpa, Kubwa, Jabi, and Utako). Consignments under 10kg can be picked up free at our Wuye Market depot or delivered for a small local courier fee.',
  },
  {
    question: 'How long does air freight take from the UK to Abuja?',
    answer:
      'Standard Air Cargo arrives in Abuja within 5 to 10 working days from flight departure. Our weekly UK consolidation cut-off is every Wednesday at 5:00 PM, with cargo flights departing on Friday.',
  },
  {
    question: 'Where is County Cargo’s receiving office and pickup depot in Abuja?',
    answer:
      'Our dedicated Abuja receiving office is located at Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT. Customers who prefer depot collection can inspect and pick up parcels directly here.',
  },
  {
    question: 'Where can I drop off cargo in the UK for shipping to Abuja?',
    answer:
      'You can drop off cargo at our London Charlton Depot: New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF, or our Liverpool Depot: Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG. Doorstep collection is also available across Greater London (free for 30kg+) and nationwide UK.',
  },
  {
    question: 'Does the rate include customs clearance at Nnamdi Azikiwe Airport?',
    answer:
      'Yes. County Cargo provides comprehensive customs clearing handling for standard goods and personal effects. Standard customs clearance is included in your per-kg quote with zero surprise terminal fees.',
  },
  {
    question: 'How is volumetric dimensional weight calculated for Abuja shipments?',
    answer:
      'Volumetric weight is determined using the universal IATA formula: (Length × Width × Height in cm) ÷ 5,000. If the volumetric weight exceeds the actual scale weight, billing is based on the volumetric weight.',
  },
  {
    question: 'What items are prohibited from shipping to Abuja?',
    answer:
      'Items prohibited under Nigerian aviation and customs regulations include firearms, weapons, ammunition, military apparel, dangerous chemicals, fireworks, fake money, unapproved drugs, and goods on the Nigeria Customs Absolute Import Prohibition list.',
  },
];

const abujaStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://countycargo.com/shipping-from-uk-to-abuja#service',
      name: 'Shipping from UK to Abuja',
      serviceType: 'Air Cargo Forwarding to Abuja FCT',
      provider: {
        '@type': 'LocalBusiness',
        '@id': 'https://countycargo.com/#abuja-office',
        name: 'County Cargo Abuja Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street',
          addressLocality: 'Abuja',
          addressRegion: 'Federal Capital Territory',
          addressCountry: 'NG',
        },
      },
      areaServed: [
        { '@type': 'City', name: 'Abuja' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
      description:
        'Fast and reliable air cargo shipping from London, Liverpool, and nationwide UK to Abuja from £6.50/kg with free doorstep delivery on qualifying shipments of 10kg+.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        price: '6.50',
        availability: 'https://schema.org/InStock',
        url: 'https://countycargo.com/shipping-from-uk-to-abuja',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://countycargo.com/shipping-from-uk-to-abuja#breadcrumbs',
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
          name: 'Shipping from UK to Nigeria',
          item: 'https://countycargo.com/shipping-from-uk-to-nigeria',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Shipping from UK to Abuja',
          item: 'https://countycargo.com/shipping-from-uk-to-abuja',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://countycargo.com/shipping-from-uk-to-abuja#faq',
      mainEntity: abujaFaqs.map((faq) => ({
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

export default function ShippingFromUkToAbujaPage() {
  return (
    <>
      <JsonLd data={abujaStructuredData} />
      <Header />

      <main className="pt-16 bg-white min-h-screen">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 bg-slate-50 border-b border-slate-200/80 text-xs sm:text-sm">
          <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 text-slate-600">
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/shipping-from-uk-to-nigeria" className="hover:text-primary transition-colors font-medium">
              Shipping from UK to Nigeria
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-secondary truncate">
              Shipping from UK to Abuja
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          className="relative py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(10, 25, 47, 0.92) 0%, rgba(15, 23, 42, 0.96) 100%), url('/london-to-abuja-cargo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs sm:text-sm font-semibold">
                <Gift className="w-4 h-4 text-emerald-400" />
                <span>Special Promotion: Free Abuja Doorstep Delivery on Qualifying 10kg+ Shipments</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight hero-text-glow leading-tight">
                Shipping from the UK to Abuja
              </h1>

              {/* Direct Concise Answer Immediately Below H1 */}
              <div className="p-5 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-slate-100 text-left sm:text-base leading-relaxed space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-base sm:text-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Key Abuja Shipping Facts &amp; Direct Rates:</span>
                </div>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                  Shipping air cargo from the United Kingdom to Abuja starts at <strong>£6.50 per kg</strong> plus a <strong>£15 handling fee</strong> per consignment. Transit time is <strong>5 to 10 working days</strong> from flight departure following our weekly consolidation deadline every Wednesday at 5:00 PM. Drop off free of charge at our <strong>London Charlton Depot (SE7 8NF)</strong> or <strong>Liverpool Warehouse (L1 0BG)</strong>, or book UK doorstep pickup (free across London for air consignments of 30kg+). Qualifying consignments weighing 10kg or more currently receive <strong>100% Free Doorstep Delivery</strong> across Abuja FCT (Wuse, Garki, Maitama, Asokoro, Gwarinpa, Kubwa), or free pickup at our <strong>Wuye Ultra Modern Market Depot</strong>. Full customs clearance is included.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/15 text-xs sm:text-sm">
                  <div>
                    <span className="text-blue-200 block">Abuja Air Freight Rate:</span>
                    <strong className="text-white">£6.50 / kg (+ £15 fee)</strong>
                  </div>
                  <div>
                    <span className="text-blue-200 block">Air Transit Time:</span>
                    <strong className="text-white">5–10 Working Days</strong>
                  </div>
                  <div>
                    <span className="text-blue-200 block">Abuja Receiving Office:</span>
                    <strong className="text-white">Wuye Market, Shop HF426</strong>
                  </div>
                  <div>
                    <span className="text-blue-200 block">Special Offer:</span>
                    <strong className="text-emerald-300">Free Delivery on 10kg+</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
                <a href="#quote-calculator">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg">
                    Calculate UK to Abuja Shipping Cost
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20the%20UK%20to%20Abuja" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold">
                    <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                    WhatsApp Abuja Team (+234 811 000 0421)
                  </Button>
                </a>
              </div>
            </div>

            {/* Prominent Above-the-Fold Calculator */}
            <div className="mt-10">
              <ShippingCalculator
                title="UK to Abuja Shipping Cost Calculator"
                subtitle="Calculate transparent air cargo rates from London, Liverpool, and nationwide UK directly to Abuja FCT."
                defaultDestination="Abuja"
                defaultService="standard_air"
              />
            </div>
          </div>
        </section>

        {/* Section 1 & 2: Pricing & Comparison Table */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Transparent Rates</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">UK to Abuja Shipping Cost Examples</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                Exact pricing breakdown for air cargo shipments from the UK to Abuja.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-100 text-secondary font-bold text-xs uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-4">Package / Weight</th>
                    <th className="p-4">Air Freight (£6.50/kg)</th>
                    <th className="p-4">Transit Time</th>
                    <th className="p-4">Delivery &amp; Promotional Benefits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary shrink-0" />
                      5 kg Small Box
                    </td>
                    <td className="p-4 font-extrabold text-primary text-base">£47.50</td>
                    <td className="p-4 font-semibold text-slate-900">5–10 Working Days</td>
                    <td className="p-4 text-xs sm:text-sm text-slate-600">
                      £32.50 freight + £15 handling. Free pickup at Wuye Market depot or nominal local delivery.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/30">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                      10 kg Parcel
                    </td>
                    <td className="p-4 font-extrabold text-emerald-700 text-base">£80.00</td>
                    <td className="p-4 font-semibold text-slate-900">5–10 Working Days</td>
                    <td className="p-4 text-xs sm:text-sm text-emerald-800 font-medium">
                      £65.00 freight + £15 handling. <strong>Includes 100% Free Doorstep Delivery across Abuja!</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/30">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                      20 kg Medium Box
                    </td>
                    <td className="p-4 font-extrabold text-emerald-700 text-base">£145.00</td>
                    <td className="p-4 font-semibold text-slate-900">5–10 Working Days</td>
                    <td className="p-4 text-xs sm:text-sm text-emerald-800 font-medium">
                      £130 freight + £15 handling. <strong>Free Doorstep Delivery across Abuja included.</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/30">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                      30 kg Heavy Box
                    </td>
                    <td className="p-4 font-extrabold text-emerald-700 text-base">£210.00</td>
                    <td className="p-4 font-semibold text-slate-900">5–10 Working Days</td>
                    <td className="p-4 text-xs sm:text-sm text-emerald-800 font-medium">
                      £195 freight + £15 handling. <strong>Free London Pickup + Free Abuja Doorstep Delivery!</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Abuja 10kg+ Free Delivery Campaign:</strong> Consignments weighing 10kg and above qualify for free delivery directly to residences and corporate offices throughout Abuja Municipal (AMAC).
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: Transit Times & Flight Schedule */}
        <section className="py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Operational Transit</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Weekly Flight Cut-Off &amp; Transit Times to Abuja
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Cargo destined for the Federal Capital Territory is consolidated weekly and dispatched to arrive safely at Nnamdi Azikiwe International Airport (ABV) or connected seamlessly via our Lagos aviation hub.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-200">
                  <div className="p-4 bg-white/10 rounded-xl border border-white/15">
                    <div className="font-bold text-emerald-400 flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" /> Wednesday 5:00 PM Cut-Off
                    </div>
                    <p className="text-xs text-slate-300">All cargo must be received at depots or collected by Wednesday evening for Friday departure.</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl border border-white/15">
                    <div className="font-bold text-blue-400 flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4" /> 5–10 Working Days
                    </div>
                    <p className="text-xs text-slate-300">Transit time from flight departure to customs release and Abuja delivery.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-4">
                <h3 className="text-lg font-bold text-white">Volumetric Weight Formula</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Air freight is charged on whichever is greater between actual scale weight and dimensional volumetric weight:
                </p>
                <div className="p-3 bg-black/40 rounded-lg text-center font-mono text-sm text-amber-300 border border-amber-400/30">
                  Volumetric Weight (kg) = (Length × Width × Height in cm) ÷ 5,000
                </div>
                <p className="text-xs text-slate-400">
                  Use sturdy, compact cartons to minimise empty space and reduce dimensional weight costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Step-by-Step Shipping Process */}
        <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">How It Works</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Step-by-Step: Sending Air Cargo to Abuja</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center mb-4 text-lg">
                  1
                </div>
                <h3 className="font-bold text-secondary text-base mb-2">Drop Off or Book Pickup</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Drop off at London Charlton (SE7 8NF) or Liverpool (L1 0BG), or arrange UK doorstep collection.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center mb-4 text-lg">
                  2
                </div>
                <h3 className="font-bold text-secondary text-base mb-2">Weigh &amp; Consolidate</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Parcels are weighed, tagged, and loaded onto scheduled Friday international flights.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center mb-4 text-lg">
                  3
                </div>
                <h3 className="font-bold text-secondary text-base mb-2">Customs Release</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  County Cargo's licensed customs brokers clear goods upon airport arrival with zero surprise fees.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center mb-4 text-lg">
                  4
                </div>
                <h3 className="font-bold text-secondary text-base mb-2">Abuja Handover</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Collect free at Wuye Market depot, or enjoy free doorstep delivery (qualifying 10kg+ shipments).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: UK Drop-off Facilities */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">UK Facilities</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Our Staffed UK Drop-Off Depots</h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Drop off your cargo directly at our UK locations or book scheduled collection.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* London Charlton Depot */}
              <div className="bg-gradient-to-br from-blue-50/70 to-sky-50/50 p-6 sm:p-8 rounded-2xl border-2 border-blue-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-full">
                      London Drop-Off Point
                    </span>
                    <span className="text-xs text-blue-700 font-semibold">Charlton, SE London</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">County Cargo London Depot</h3>
                  <p className="text-slate-700 text-sm mb-4 leading-relaxed font-medium">
                    New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-600 pb-4">
                    <p><strong className="text-slate-900">Coverage:</strong> Charlton, Greenwich, Woolwich, Blackheath, Lewisham, Deptford, Croydon, Dartford &amp; SE London.</p>
                    <p><strong className="text-slate-900">Collection:</strong> Free doorstep collection across London for air cargo 30kg and above.</p>
                    <p><strong className="text-slate-900">Hours:</strong> Mon–Fri 9am–5pm | Sat 10am–2pm</p>
                    <p><strong className="text-slate-900">Direct Contact:</strong> 07405 556668 / +234 811 000 0421</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-blue-200/60">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm">
                    <Link href="/shipping-from-london-to-nigeria">
                      London Depot Guide &amp; Directions <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Liverpool Depot */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-700 text-white px-3 py-1 rounded-full">
                      North West Receiving Hub
                    </span>
                    <span className="text-xs text-slate-600 font-semibold">Liverpool Warehouse</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">County Cargo Liverpool Receiving Depot</h3>
                  <p className="text-slate-700 text-sm mb-4 leading-relaxed font-medium">
                    Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-600 pb-4">
                    <p><strong className="text-slate-900">Coverage:</strong> Liverpool, Manchester, Preston, Leeds, Sheffield, North West &amp; nationwide courier receipt.</p>
                    <p><strong className="text-slate-900">Online Retail Hub:</strong> Deliver Amazon, eBay, Argos orders directly here for consolidation.</p>
                    <p><strong className="text-slate-900">Hours:</strong> Mon–Fri 9am–5pm | Sat 10am–2pm</p>
                    <p><strong className="text-slate-900">Contact:</strong> +234 811 000 0421 / +44 7438 827464</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <Button asChild variant="outline" className="text-xs sm:text-sm font-semibold">
                    <Link href="/contact">
                      Liverpool Depot &amp; Contact Info <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Abuja Handover Hub & Doorstep Delivery */}
        <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">Abuja Network</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">
                  Abuja Depot Collection &amp; Doorstep Delivery
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Upon arrival and clearance, your packages are transferred to our secure FCT distribution center for depot collection or immediate dispatch.
                </p>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-secondary text-base flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" /> Abuja Receiving Office:
                  </h3>
                  <p className="text-sm text-slate-700 font-medium">
                    Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT.
                  </p>
                  <p className="text-xs text-slate-500">
                    Open for collections Monday–Friday 9:00 AM – 5:30 PM, Saturday 10:00 AM – 3:00 PM.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p><strong className="text-slate-900">Abuja Doorstep Delivery Coverage:</strong></p>
                  <p>• <strong>Phase 1:</strong> Maitama, Wuse Phase 1 &amp; 2, Garki 1 &amp; 2, Asokoro, Central Business District (CBD).</p>
                  <p>• <strong>Phase 2 &amp; 3:</strong> Gwarinpa, Utako, Jabi, Mabushi, Katampe, Life Camp, Apo, Lokogoma, Kubwa, Lugbe.</p>
                </div>
              </div>

              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-xl font-bold text-secondary">Customs Clearance &amp; Airport Handling</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  County Cargo manages complete export declarations in the UK and cargo release through the Nigeria Customs Service at international airport terminals.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Nnamdi Azikiwe Airport (ABV) / Lagos Gateway:</strong> Fast transit and customs processing without demurrage delays.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>All-Inclusive Clearing:</strong> Standard personal items and retail shipments include customs processing in the £6.50/kg tariff.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Transparent Billing:</strong> £15 handling fee covers documentation and security scanning.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Permitted and Prohibited Items */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Compliance</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Permitted vs. Prohibited Goods for Abuja</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-emerald-50/50 p-6 sm:p-8 rounded-2xl border border-emerald-200">
                <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Permitted Goods
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Electronics (Smartphones, MacBooks, iPads, TVs, gaming consoles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Clothing, designer fashion, shoes, bags, perfumes, baby clothes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Packaged provisions, non-perishable groceries, cereals, coffee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Professional equipment, office supplies, computer accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Automotive accessories, spare parts, and tools</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50/50 p-6 sm:p-8 rounded-2xl border border-red-200">
                <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-600" /> Strictly Prohibited
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Firearms, weapons, ammunition, camouflage gear, military apparel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Counterfeit currency, illicit substances, unregistered narcotics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Explosive devices, fireworks, hazardous flammable liquids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Fresh meat, perishable foods, unpackaged organic perishables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Items on Nigeria Customs Absolute Import Prohibition List</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Related Internal Routes */}
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-secondary">Explore Connected UK to Nigeria Routes</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <Link href="/shipping-from-uk-to-nigeria" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary transition-all">
                <strong className="block text-secondary">Shipping from UK to Nigeria</strong>
                <span className="text-xs text-slate-500">Main nationwide service guide</span>
              </Link>
              <Link href="/shipping-from-uk-to-lagos" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary transition-all">
                <strong className="block text-secondary">Shipping from UK to Lagos</strong>
                <span className="text-xs text-slate-500">Lagos rates from £6.00/kg</span>
              </Link>
              <Link href="/blog/free-delivery-to-abuja" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary transition-all">
                <strong className="block text-secondary">Free Abuja Delivery Promotion</strong>
                <span className="text-xs text-slate-500">Full 10kg+ promo terms</span>
              </Link>
              <Link href="/shipping-rates-uk-to-nigeria" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary transition-all">
                <strong className="block text-secondary">UK to Nigeria Shipping Rates</strong>
                <span className="text-xs text-slate-500">Complete 2026 tariff schedule</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 9: Customer Reviews */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Customer Feedback</span>
              <h2 className="text-3xl font-extrabold text-secondary">What Shippers Say About Our Abuja Delivery</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                    MA
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-secondary">Maryam A. (Lewisham, London)</h3>
                    <p className="text-xs text-slate-500">Shipped 16kg to Garki 2</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "I was pleasantly surprised when my mum in Garki received the box directly at her house with zero extra delivery charge. The 10kg+ free delivery promo is real. Arrived in 7 days!"
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                    EO
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-secondary">Emeka O. (Liverpool)</h3>
                    <p className="text-xs text-slate-500">Shipped 24kg to Maitama</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "Dropped off at the Liverpool Queens Dock depot on Wednesday morning. Delivered straight to our corporate office in Maitama the following Thursday. Completely seamless."
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                    HI
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-secondary">Hauwa I. (Woolwich)</h3>
                    <p className="text-xs text-slate-500">Personal Effects to Gwarinpa</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "County Cargo picked up from my house in Woolwich for free because it was over 30kg, and delivered straight to my family in Gwarinpa. Truly best in class service."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: FAQs */}
        <section className="py-14 sm:py-20 bg-slate-50/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">FAQs</span>
              <h2 className="text-3xl font-extrabold text-secondary">Frequently Asked Questions: UK to Abuja Cargo</h2>
            </div>

            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
              {abujaFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`abuja-faq-${i}`} className="border-b border-slate-200/80 last:border-0">
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

        {/* Section 11: WhatsApp Booking & Action Buttons */}
        <section className="py-14 bg-gradient-to-r from-blue-900 to-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold hero-text-glow">
              Book Your UK to Abuja Air Cargo
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
              Drop off your shipment at our Charlton or Liverpool depot, or book a free London doorstep collection today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20book%20a%20shipment%20from%20the%20UK%20to%20Abuja"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-8 shadow-xl">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat on WhatsApp (+234 811 000 0421)
                </Button>
              </a>
              <a href="#quote-calculator">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg">
                  Calculate Instant Cost
                </Button>
              </a>
              <a href="https://ship.countycargo.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-6">
                  Track Live Shipment
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Editorial Review Timestamp & Disclaimers */}
        <section className="py-6 bg-slate-100 border-t border-slate-200 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Last reviewed:</strong> 12 September 2026 by <em>County Cargo UK Operations &amp; Logistics Team</em>
              </span>
            </div>
            <p className="max-w-xl text-[11px] leading-relaxed">
              Disclaimer: Standard air cargo rate to Abuja is £6.50/kg plus a £15 handling fee per consignment. Volumetric weight calculated as (L x W x H in cm) / 5000. Free doorstep delivery in Abuja applies to qualifying consignments of 10kg and above while promotion is active. Free London collection applies to air cargo 30kg and above.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
