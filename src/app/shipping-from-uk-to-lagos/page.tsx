import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import { ShippingCalculator } from '@/components/shipping-calculator';
import {
  Plane,
  Ship,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  MapPin,
  FileText,
  AlertTriangle,
  Building2,
  Calendar,
  UserCheck,
  Scale,
  Truck,
  Check,
  ChevronRight,
  Info,
  Warehouse,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from UK to Lagos | Air & Sea Cargo | County Cargo',
  description:
    'Send cargo from the UK to Lagos from £6/kg plus handling. Compare air and sea freight, calculate your cost and arrange UK collection or drop-off.',
  keywords:
    'Shipping from UK to Lagos, UK to Lagos cargo, Cargo from UK to Lagos, London to Lagos cargo, Cheap shipping from UK to Lagos, UK to Lagos air cargo, Sea freight UK to Lagos, Air freight to Murtala Muhammed Airport, Ladipo Oshodi cargo pickup, Door to door cargo Lagos',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-uk-to-lagos',
  },
  openGraph: {
    title: 'Shipping from UK to Lagos | Air & Sea Cargo | County Cargo',
    description:
      'Send cargo from the UK to Lagos from £6/kg plus handling. Compare air and sea freight, calculate your cost and arrange UK collection or drop-off.',
    url: 'https://countycargo.com/shipping-from-uk-to-lagos',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/london-to-lagos-freight.jpg',
        width: 1200,
        height: 630,
        alt: 'County Cargo - Shipping from UK to Lagos Air and Sea Cargo',
      },
    ],
  },
};

const lagosFaqs = [
  {
    question: 'How much does it cost to ship cargo from the UK to Lagos?',
    answer:
      'Standard air cargo to Lagos is priced at £6.00 per kg plus a £15 handling fee per consignment. For example, a 10kg box costs £75 (£60 freight + £15 handling), a 20kg box costs £135, and a 30kg box costs £195. Sea freight barrels start at £190 per 55-gallon jumbo drum, including port clearance.',
  },
  {
    question: 'How long does shipping from the UK to Lagos take?',
    answer:
      'Standard Air Cargo arrives in Lagos within 5 to 10 working days from our weekly consolidation cut-off every Wednesday at 5:00 PM. Express Air delivers in 24 to 48 hours for emergency shipments. Sea cargo shipments take 4 to 8 weeks from vessel departure to clearance at Lagos ports (Apapa / Tin Can).',
  },
  {
    question: 'Where can I drop off my cargo in the UK for shipment to Lagos?',
    answer:
      'You can drop off cargo at our London Charlton Depot: New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF, or our Liverpool Depot: Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG. Both depots are open Monday–Friday 9am–5pm and Saturday 10am–2pm.',
  },
  {
    question: 'Do you offer doorstep parcel collection across London and the UK?',
    answer:
      'Yes. Doorstep collection is 100% free across London (Charlton, Greenwich, Woolwich, Peckham, Lewisham, Croydon, Dartford, and SE London) for air cargo consignments of 30kg and above. For parcels under 30kg or UK nationwide locations, collection is available for a modest nominal fee (£20–£25).',
  },
  {
    question: 'Where do I collect my cargo in Lagos, or can you deliver to my address?',
    answer:
      'You can pick up your shipment free of charge at our central Lagos office: Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos. Alternatively, we provide full doorstep delivery across Lagos Mainland and Island, including Ikeja, Victoria Island, Lekki, Ikoyi, Yaba, Surulere, Festac, and Ajah.',
  },
  {
    question: 'How are customs duties and airport clearance handled in Lagos?',
    answer:
      'County Cargo handles all export customs documentation in the UK and comprehensive Nigerian Customs Service (NCS) clearance at Murtala Muhammed International Airport (LOS) and Apapa Seaport. Standard customs clearance is included in our per-kg rate.',
  },
  {
    question: 'How is volumetric weight calculated for Lagos flights?',
    answer:
      'Volumetric weight is calculated using the international airline standard formula: (Length × Width × Height in cm) ÷ 5,000. Airlines charge based on whichever is greater between the actual scale weight and the volumetric weight.',
  },
  {
    question: 'What items can I send to Lagos, and what is prohibited?',
    answer:
      'Permitted items include clothes, shoes, electronics (laptops, phones, TVs), packaged non-perishable foodstuffs, toiletries, books, auto parts, and commercial stock. Strictly prohibited items include firearms, ammunition, military apparel, dangerous chemicals, fireworks, fake currency, and items on the Nigeria Customs absolute prohibition list.',
  },
];

const lagosStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://countycargo.com/shipping-from-uk-to-lagos#service',
      name: 'Shipping from UK to Lagos',
      serviceType: 'International Air & Sea Cargo Forwarding to Lagos',
      provider: {
        '@type': 'LocalBusiness',
        '@id': 'https://countycargo.com/#lagos-hub',
        name: 'County Cargo Lagos Hub',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi',
          addressLocality: 'Lagos',
          addressRegion: 'Lagos State',
          postalCode: '102214',
          addressCountry: 'NG',
        },
      },
      areaServed: [
        { '@type': 'City', name: 'Lagos' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
      description:
        'Fast and reliable air freight (£6/kg) and sea cargo barrel shipping from London, Liverpool, and nationwide UK to Lagos, Nigeria with customs clearance and doorstep delivery.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        price: '6.00',
        availability: 'https://schema.org/InStock',
        url: 'https://countycargo.com/shipping-from-uk-to-lagos',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://countycargo.com/shipping-from-uk-to-lagos#breadcrumbs',
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
          name: 'Shipping from UK to Lagos',
          item: 'https://countycargo.com/shipping-from-uk-to-lagos',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://countycargo.com/shipping-from-uk-to-lagos#faq',
      mainEntity: lagosFaqs.map((faq) => ({
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

export default function ShippingFromUkToLagosPage() {
  return (
    <>
      <JsonLd data={lagosStructuredData} />
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
              Shipping from UK to Lagos
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          className="relative py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(10, 25, 47, 0.92) 0%, rgba(15, 23, 42, 0.96) 100%), url('/london-to-lagos-freight.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs sm:text-sm font-semibold">
                <Plane className="w-4 h-4 text-blue-400" />
                <span>UK to Lagos Air &amp; Sea Cargo • Direct Flights &amp; Weekly Consolidations</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight hero-text-glow leading-tight">
                Shipping from the UK to Lagos
              </h1>

              {/* Direct Concise Answer Immediately Below H1 */}
              <div className="p-5 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-slate-100 text-left sm:text-base leading-relaxed space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-base sm:text-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Key Lagos Shipping Facts &amp; Direct Pricing:</span>
                </div>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                  Shipping cargo from the United Kingdom to Lagos starts at <strong>£6.00 per kg</strong> plus a <strong>£15 handling fee</strong> per consignment. Transit time is <strong>5 to 10 working days</strong> for standard air cargo, departing weekly after Wednesday 5:00 PM cut-off, and <strong>4 to 8 weeks</strong> for sea freight barrels. Drop off at our <strong>London Charlton Depot (SE7 8NF)</strong> or <strong>Liverpool Depot (L1 0BG)</strong>, or request doorstep collection across Greater London (free on 30kg+ air cargo) and nationwide. In Lagos, collect free at our <strong>Ladipo-Oshodi Hub</strong> or arrange doorstep delivery anywhere across Lagos Mainland and Island. Full customs clearance is included.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/15 text-xs sm:text-sm">
                  <div>
                    <span className="text-blue-200 block">Lagos Air Freight Rate:</span>
                    <strong className="text-white">£6.00 / kg (+ £15 handling)</strong>
                  </div>
                  <div>
                    <span className="text-blue-200 block">Air Transit Time:</span>
                    <strong className="text-white">5–10 Working Days</strong>
                  </div>
                  <div>
                    <span className="text-blue-200 block">Lagos Central Hub:</span>
                    <strong className="text-white">Ladipo-Oshodi Plaza</strong>
                  </div>
                  <div>
                    <span className="text-blue-200 block">Sea Cargo Barrels:</span>
                    <strong className="text-white">£190 / Jumbo Drum</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
                <a href="#quote-calculator">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg">
                    Calculate UK to Lagos Shipping Cost
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20the%20UK%20to%20Lagos" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold">
                    <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                    WhatsApp Lagos Team (+234 811 000 0421)
                  </Button>
                </a>
              </div>
            </div>

            {/* Prominent Above-the-Fold Calculator */}
            <div className="mt-10">
              <ShippingCalculator
                title="UK to Lagos Shipping Cost Calculator"
                subtitle="Get an instant quote for shipping personal packages, luggage, commercial goods, or sea freight barrels from the UK to Lagos."
                defaultDestination="Lagos"
                defaultService="standard_air"
              />
            </div>
          </div>
        </section>

        {/* Section 1 & 2: Air and Sea Freight Pricing & Comparison Table */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Transparent Pricing</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">UK to Lagos Shipping Cost Breakdown</h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg">
                Compare air freight and ocean cargo options from London and Liverpool to Lagos.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-100 text-secondary font-bold text-xs uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-4">Package / Weight</th>
                    <th className="p-4">Standard Air (£6/kg)</th>
                    <th className="p-4">Delivery Time</th>
                    <th className="p-4">Lagos Handover Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary shrink-0" />
                      5 kg Small Box
                    </td>
                    <td className="p-4 font-extrabold text-primary text-base">£45.00</td>
                    <td className="p-4 font-semibold text-slate-900">5–10 Working Days</td>
                    <td className="p-4 text-xs sm:text-sm text-slate-600">£30 freight + £15 handling. Ideal for gifts, shoes, phones, clothes.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary shrink-0" />
                      10 kg Parcel
                    </td>
                    <td className="p-4 font-extrabold text-primary text-base">£75.00</td>
                    <td className="p-4 font-semibold text-slate-900">5–10 Working Days</td>
                    <td className="p-4 text-xs sm:text-sm text-slate-600">£60 freight + £15 handling. Ladipo pickup or mainland/island delivery.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary shrink-0" />
                      20 kg Medium Box
                    </td>
                    <td className="p-4 font-extrabold text-primary text-base">£135.00</td>
                    <td className="p-4 font-semibold text-slate-900">5–10 Working Days</td>
                    <td className="p-4 text-xs sm:text-sm text-slate-600">£120 freight + £15 handling. Popular size for diaspora care packages.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary shrink-0" />
                      30 kg Heavy Box
                    </td>
                    <td className="p-4 font-extrabold text-primary text-base">£195.00</td>
                    <td className="p-4 font-semibold text-slate-900">5–10 Working Days</td>
                    <td className="p-4 text-xs sm:text-sm text-slate-600">
                      £180 freight + £15 handling. <strong>Qualifies for 100% Free Doorstep Collection across London!</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors bg-blue-50/40">
                    <td className="p-4 font-bold text-secondary flex items-center gap-2">
                      <Ship className="w-4 h-4 text-blue-600 shrink-0" />
                      55-Gallon Sea Drum
                    </td>
                    <td className="p-4 font-extrabold text-blue-700 text-base">£190.00 Flat</td>
                    <td className="p-4 font-semibold text-slate-900">4–8 Weeks (Sea)</td>
                    <td className="p-4 text-xs sm:text-sm text-slate-600">
                      Jumbo heavy-duty barrel. Apapa port clearing included. Perfect for provisions &amp; appliances.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Free London Collection:</strong> Any air cargo consignment weighing 30kg or more qualifies for complimentary doorstep pickup across Charlton, Greenwich, Woolwich, Peckham, Lewisham, Croydon, Dartford, and South East London.
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: Transit Times & Flight Schedules */}
        <section className="py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Operational Transit</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Weekly Flight Cut-Off &amp; Transit Times to Lagos
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  County Cargo operates regular scheduled air cargo consolidations to Murtala Muhammed International Airport (LOS) in Ikeja, Lagos.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-200">
                  <div className="p-4 bg-white/10 rounded-xl border border-white/15">
                    <div className="font-bold text-emerald-400 flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" /> Weekly Wednesday Cut-Off
                    </div>
                    <p className="text-xs text-slate-300">Cargo received by Wednesday 5:00 PM departs on Friday flights.</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl border border-white/15">
                    <div className="font-bold text-blue-400 flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4" /> 5–10 Working Days
                    </div>
                    <p className="text-xs text-slate-300">Standard air transit time from flight departure to arrival &amp; customs release in Lagos.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-4">
                <h3 className="text-lg font-bold text-white">Volumetric Weight Formula</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Airlines calculate charges using whichever is higher: actual scale weight or volumetric dimensional weight:
                </p>
                <div className="p-3 bg-black/40 rounded-lg text-center font-mono text-sm text-amber-300 border border-amber-400/30">
                  Volumetric Weight (kg) = (Length × Width × Height in cm) ÷ 5,000
                </div>
                <p className="text-xs text-slate-400">
                  Tip: Pack items tightly to avoid paying for excess empty space in oversized boxes.
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Step-by-Step: Sending Cargo from UK to Lagos</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center mb-4 text-lg">
                  1
                </div>
                <h3 className="font-bold text-secondary text-base mb-2">Book or Drop Off</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Drop off at London Charlton (SE7 8NF) or Liverpool (L1 0BG), or book doorstep collection across the UK.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center mb-4 text-lg">
                  2
                </div>
                <h3 className="font-bold text-secondary text-base mb-2">Weigh &amp; Label</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Consignments are inspected, weighed, barcoded, and prepared for weekly Friday air cargo consolidations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center mb-4 text-lg">
                  3
                </div>
                <h3 className="font-bold text-secondary text-base mb-2">Flight &amp; Customs</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Goods fly to Murtala Muhammed Airport where County Cargo's licensed clearing agents process customs release.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center mb-4 text-lg">
                  4
                </div>
                <h3 className="font-bold text-secondary text-base mb-2">Lagos Handover</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Collect free at Ladipo-Oshodi Plaza or receive doorstep delivery at your home/office anywhere in Lagos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: UK Drop-off Facilities & Address Details */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">UK Facilities</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Our Staffed UK Drop-Off Depots</h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Bring your cargo directly to our dedicated UK locations or book scheduled collection.
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
                    <p><strong className="text-slate-900">Collection:</strong> Free doorstep pickup across London for air freight 30kg and above.</p>
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

        {/* Section 6: Lagos Handover Hub & Doorstep Delivery */}
        <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">Lagos Distribution</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">
                  Lagos Hub Pickup &amp; Doorstep Delivery
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Upon arrival and customs release at Murtala Muhammed Airport, your cargo is transferred to our secure central Lagos operations centre.
                </p>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-secondary text-base flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" /> Central Lagos Receiving Office:
                  </h3>
                  <p className="text-sm text-slate-700 font-medium">
                    Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos (Postal Code 102214).
                  </p>
                  <p className="text-xs text-slate-500">
                    Open for customer pickups Monday–Friday 9:00 AM – 5:30 PM, Saturday 10:00 AM – 3:00 PM.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p><strong className="text-slate-900">Doorstep Delivery Coverage:</strong></p>
                  <p>• <strong>Lagos Mainland:</strong> Ikeja, Maryland, Yaba, Surulere, Gbagada, Ilupeju, Magodo, Ojodu-Berger, Festac, Ikorodu.</p>
                  <p>• <strong>Lagos Island:</strong> Victoria Island, Ikoyi, Lekki Phase 1, Chevron, Ajah, Sangotedo, Epe.</p>
                </div>
              </div>

              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-xl font-bold text-secondary">Customs Clearance at Lagos Airport &amp; Seaport</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Unlike traditional couriers that pass surprise customs charges to recipients, County Cargo provides all-inclusive customs handling.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Murtala Muhammed International Airport (LOS):</strong> Air cargo cleared within 24–48 hours of flight arrival.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Apapa &amp; Tin Can Island Ports:</strong> Complete sea cargo container handling and drum destuffing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No Hidden Tariffs:</strong> Standard personal effects and commercial goods include clearing duties in our per-kg fee.</span>
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
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Import Compliance</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">What You Can &amp; Cannot Ship to Lagos</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-emerald-50/50 p-6 sm:p-8 rounded-2xl border border-emerald-200">
                <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Permitted Goods
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Electronics (Smartphones, iPads, laptops, desktop PCs, TVs, sound systems)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Fashion items, clothing, designer shoes, handbags, baby accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Packaged dry foods, baby formula, cereals, canned provisions, tea, coffee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Auto spare parts, generators, hand tools, plumbing hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Commercial store inventory, beauty supplies, cosmetics</span>
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
                    <span>Firearms, weapons, ammunition, military uniforms, camouflage apparel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Counterfeit currency, unregistered pharmaceuticals, illegal narcotics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Explosives, flammable liquids, fireworks, lithium battery packs exceeding air safety limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Fresh meat, perishable foods, wet raw agricultural products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>Items on the Nigeria Customs Service Absolute Import Prohibition List</span>
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
              <Link href="/shipping-from-uk-to-abuja" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary transition-all">
                <strong className="block text-secondary">Shipping from UK to Abuja</strong>
                <span className="text-xs text-slate-500">Abuja rates from £6.50/kg</span>
              </Link>
              <Link href="/shipping-from-london-to-nigeria" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary transition-all">
                <strong className="block text-secondary">London Charlton Depot</strong>
                <span className="text-xs text-slate-500">Drop-off &amp; London collections</span>
              </Link>
              <Link href="/shipping-rates-uk-to-nigeria" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary transition-all">
                <strong className="block text-secondary">UK to Nigeria Shipping Rates</strong>
                <span className="text-xs text-slate-500">Complete 2026 tariff schedule</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 9: Customer Reviews with Descriptive Alt Text */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Customer Feedback</span>
              <h2 className="text-3xl font-extrabold text-secondary">Trusted by Shippers Sending Cargo to Lagos</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                    BA
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-secondary">Biodun A. (Greenwich, London)</h3>
                    <p className="text-xs text-slate-500">Shipped 35kg to Lekki Phase 1</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "Dropped off at Charlton on Tuesday afternoon and my sister in Lekki received everything the following Tuesday. Free collection from my home because it was over 30kg. Absolutely fantastic service."
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                  TO
                </div>
                <div>
                  <h3 className="font-bold text-sm text-secondary">Tunde O. (Manchester)</h3>
                  <p className="text-xs text-slate-500">Shipped 2x Sea Barrels to Ikeja</p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "Booked two jumbo barrels from Liverpool to Lagos. Both drums arrived intact with zero tampering. Clearing at Apapa was completely hassle-free with County Cargo's team."
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                  FE
                </div>
                <div>
                  <h3 className="font-bold text-sm text-secondary">Funke E. (Woolwich)</h3>
                  <p className="text-xs text-slate-500">Online Retail Orders to Yaba</p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "I consolidate stock from ASOS and Amazon UK using their warehouse. The £6/kg rate is unbeatable and the tracking on their portal gives me complete peace of mind."
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
              <h2 className="text-3xl font-extrabold text-secondary">Frequently Asked Questions: UK to Lagos Cargo</h2>
            </div>

            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
              {lagosFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`lagos-faq-${i}`} className="border-b border-slate-200/80 last:border-0">
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
              Book Your UK to Lagos Cargo Today
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
              Drop off your shipment at our Charlton or Liverpool depot, or book a free London doorstep collection right now.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20book%20a%20shipment%20from%20the%20UK%20to%20Lagos"
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
              Disclaimer: Standard air cargo rate to Lagos is £6.00/kg plus a £15 handling fee per consignment. Volumetric weight calculated as (L x W x H in cm) / 5000. Free London collection applies to qualifying air cargo of 30kg and above.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
