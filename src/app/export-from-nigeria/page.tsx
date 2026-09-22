import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import {
  Globe,
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
  Package,
  Boxes,
  UserCheck,
  Calendar,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'International Shipping and Export Services from Nigeria',
  description: 'Export cargo, African foodstuffs, commercial merchandise, and personal luggage from Nigeria to Canada, USA, UK, Germany, France, and Turkey.',
  keywords: 'international shipping from Nigeria, export services Lagos, air cargo from Nigeria, send food abroad Nigeria, NEPC exporter registration',
  alternates: {
    canonical: 'https://countycargo.com/export-from-nigeria',
  },
  openGraph: {
    title: 'International Shipping and Export Services from Nigeria',
    description: 'Export cargo, African foodstuffs, commercial merchandise, and personal luggage from Nigeria to Canada, USA, UK, Germany, France, and Turkey.',
    images: [{ url: 'https://countycargo.com/service-nigeria-world.png', alt: 'International air cargo shipping from Nigeria worldwide' }],
  },
};

const countryRoutes = [
  {
    country: 'Canada',
    flag: '🇨🇦',
    href: '/shipping-from-nigeria-to-canada',
    deliveryTime: '3–5 Working Days (Express) | 5–10 Working Days (Standard)',
    hubs: 'Toronto, Calgary, Vancouver, Ottawa, Montreal, Edmonton',
    features: 'CBSA customs clearance, CFIA dry food compliance, doorstep delivery.',
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    href: '/shipping-from-nigeria-to-usa',
    deliveryTime: '3–5 Working Days (Express) | 5–10 Working Days (Standard)',
    hubs: 'Houston, Dallas, Atlanta, New York, Chicago, Maryland, Washington DC',
    features: 'US CBP clearance, FDA Prior Notice filing for foodstuffs, nationwide delivery.',
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    href: '/shipping-from-nigeria-to-uk',
    deliveryTime: '3–5 Working Days (Express) | 5 – 7 Days (Standard)',
    hubs: 'London, Liverpool (Depot L1 0BG), Manchester, Birmingham, Leeds',
    features: 'HMRC customs clearance, DEFRA food compliance, Liverpool distribution depot.',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    href: '/shipping-from-nigeria-to-germany',
    deliveryTime: '3–5 Working Days (Express) | 5 – 8 Days (Standard)',
    hubs: 'Frankfurt (FRA Hub), Berlin, Hamburg, Munich, Cologne, Düsseldorf',
    features: 'German Zoll customs clearance, EU VAT paperwork, door delivery across Germany.',
  },
  {
    country: 'France',
    flag: '🇫🇷',
    href: '/shipping-from-nigeria-to-france',
    deliveryTime: '3–5 Working Days (Express) | 5 – 8 Days (Standard)',
    hubs: 'Paris (CDG Hub), Lyon, Marseille, Toulouse, Bordeaux, Lille',
    features: 'Douane française clearance, African fashion & dry food specialists.',
  },
  {
    country: 'Turkey',
    flag: '🇹🇷',
    href: '/shipping-from-nigeria-to-turkey',
    deliveryTime: '3–5 Working Days (Express) | 5 – 8 Days (Standard)',
    hubs: 'Istanbul (IST Hub), Ankara, Izmir, Bursa, Antalya, Adana',
    features: 'Turkish Ministry of Trade clearance, B2B commercial sample dispatch.',
  },
];

const faqs = [
  {
    question: 'What export services does County Cargo offer from Nigeria?',
    answer: 'County Cargo provides Express Air Courier (3–5 working days via DHL network), Standard Air Cargo (5–10 working days), and Sea Container Freight for personal belongings, commercial merchandise, documents, and dry African foodstuffs.',
  },
  {
    question: 'How do I obtain an export quotation from Nigeria?',
    answer: 'You can request a quote online via our contact form, call our customer care lines, or contact our team on WhatsApp (+44 7438 827464) with your parcel dimensions, weight, destination country, and item descriptions.',
  },
  {
    question: 'What export documentation is required by Nigerian Customs?',
    answer: 'General exports require a valued Packing List / Commercial Invoice, Airway Bill, and sender ID. Commercial exports valued over $1,000 USD require an Exporter Registration Certificate from the Nigerian Export Promotion Council (NEPC) and Form NXP.',
  },
  {
    question: 'What dry food items can I ship abroad from Nigeria?',
    answer: 'Commercially dried and packaged plant foodstuff such as garri, egusi, ogbono, yam flour, bitter leaf, and dried spices are permitted for export to Canada, the USA, UK, Germany, France, and Turkey.',
  },
  {
    question: 'What items are strictly banned from international export?',
    answer: 'Prohibited goods include uninspected fresh meats/poultry, unpasteurized dairy, raw seeds or soil, flammables, explosives, counterfeit products, and uncertified pharmaceuticals.',
  },
  {
    question: 'How is volumetric (dimensional) weight calculated?',
    answer: 'Volumetric weight is calculated using the formula: (Length x Width x Height in cm) / 5000. Freight charges are billed on whichever is higher between actual scale weight and volumetric weight.',
  },
  {
    question: 'Can County Cargo pick up cargo from my home in Lagos or Abuja?',
    answer: 'Yes, we provide doorstep pick-up services across Lagos, Abuja, Port Harcourt, Ibadan, and major commercial centers in Nigeria.',
  },
  {
    question: 'How do I track my export shipment live?',
    answer: 'Every shipment receives a unique tracking number upon dispatch, allowing real-time online tracking from pick-up in Nigeria to doorstep delivery in your destination country.',
  },
];

export default function ExportFromNigeriaPillarPage() {
  const pillarSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'International Shipping and Export Services from Nigeria',
    serviceType: 'Global Air Cargo, Express Shipping & Customs Export Logistics',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    description: 'Master export logistics hub connecting Nigeria to Canada, the United States, United Kingdom, Germany, France, and Turkey.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={pillarSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Export Services', href: '/export-from-nigeria' },
          ]}
        />

        {/* Hero Section */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-4 h-4 text-blue-300" /> Global Export Logistics Hub
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              International Shipping and Export Services from Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 max-w-3xl mx-auto font-light">
              Door-to-door air cargo, express parcel delivery, and commercial export freight connecting Lagos and Abuja to North America, Europe, and the Middle East.
            </p>

            {/* Answer-First Summary */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left max-w-4xl mx-auto shadow-xl">
              <h2 className="text-xs uppercase font-bold tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Answer-First Summary: Nigeria International Export Services
              </h2>
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                County Cargo provides end-to-end international export freight forwarding from Nigeria to Canada, the United States, United Kingdom, Germany, France, and Turkey. We offer Express Air Courier (3–5 working days), Standard Air Cargo (5–10 working days), and Sea Container Freight. Services cover dry African foodstuff, personal luggage, commercial merchandise, fashion apparel, and legal documents with full NEPC, NAFDAC, and international customs clearance.
              </p>
            </div>

            {/* Author / Reviewer bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> Written by County Cargo Senior Logistics Strategist</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Export Compliance Board</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-yellow-400" /> Last updated: 30 August 2026</span>
            </div>
          </div>
        </section>

        {/* Global Destination Route Cards */}
        <section className="py-12 sm:py-16 bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">Choose Your Destination Country</h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Select a destination below to view route-specific customs rules, city delivery coverage, transit schedules, and rates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryRoutes.map((route, index) => (
                <Link
                  key={index}
                  href={route.href}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{route.flag}</span>
                      <span className="text-xs font-bold text-primary bg-blue-50 px-2.5 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                        View Route →
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                      Shipping to {route.country}
                    </h3>
                    <p className="text-xs font-semibold text-primary mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {route.deliveryTime}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Hubs:</strong> {route.hubs}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 border-t border-gray-100 pt-2">
                      {route.features}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Global Country Comparison Table */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">Export Route Comparison Table</h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Side-by-side summary of delivery windows, key receiving airports, and customs authority requirements.
              </p>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-2xs">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Express Courier</th>
                    <th className="p-4">Standard Air Cargo</th>
                    <th className="p-4">Key Airport Gateways</th>
                    <th className="p-4">Customs Authority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {countryRoutes.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-secondary flex items-center gap-2">
                        <span>{r.flag}</span> {r.country}
                      </td>
                      <td className="p-4 font-semibold text-primary">3–5 Working Days</td>
                      <td className="p-4 text-gray-800">5–10 Working Days</td>
                      <td className="p-4 text-xs text-gray-600">{r.hubs.split(',')[0]} &amp; regional hubs</td>
                      <td className="p-4 text-xs font-semibold text-gray-800">
                        {r.country === 'Canada' && 'CBSA & CFIA'}
                        {r.country === 'United States' && 'US CBP & FDA'}
                        {r.country === 'United Kingdom' && 'HMRC & DEFRA'}
                        {r.country === 'Germany' && 'German Zoll'}
                        {r.country === 'France' && 'Douane française'}
                        {r.country === 'Turkey' && 'Ministry of Trade'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Core Service Pillars */}
        <section className="py-12 sm:py-16 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">Export Cargo Service Options</h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Whether you need urgent express documents, commercial container freight, or dry foodstuff shipping, County Cargo delivers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary">Air Cargo &amp; Express Courier</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Fastest option for urgent parcels, foodstuff, and merchandise. Express Courier delivers in 3–5 working days (via DHL network), while Standard Air Cargo delivers in 5–10 working days.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Boxes className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary">Personal Luggage &amp; Relocation</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Avoid airline excess baggage charges. Ship personal effects, clothes, shoes, household items, and gifts to family abroad with complete door delivery.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary">Commercial &amp; B2B Merchandise</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Full NEPC exporter support, Form NXP assistance, commercial invoices, and bulk air/sea freight for Nigerian fashion, crafts, and agricultural products.
                </p>
              </div>
            </div>

            {/* Customs & Export Documentation */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Export Documentation &amp; Compliance Guidance
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Navigating export paperwork ensures your cargo clears Nigerian Customs and destination border controls without delays:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>NEPC Registration:</strong> Commercial exports over $1,000 USD require exporter registration with the Nigerian Export Promotion Council.</li>
                <li><strong>Form NXP:</strong> Electronic Form NXP is submitted via authorized commercial banks for commercial exports.</li>
                <li><strong>Commercial Invoice &amp; Packing List:</strong> Detailed breakdown of item description, quantity, value, and HS tariff codes.</li>
                <li><strong>NAFDAC &amp; Phytosanitary Certificates:</strong> Required for commercial agricultural produce, processed food, and plant material.</li>
              </ul>
            </div>

            {/* Featured UK Export Corridor Resources */}
            <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl not-prose space-y-4 shadow-md">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Featured Export Corridor 🇬🇧
                  </span>
                  <h3 className="text-xl font-bold text-white">Exporting from Nigeria to the United Kingdom</h3>
                  <p className="text-xs text-blue-200 mt-1 max-w-xl">
                    Dedicated compliance resources, food packaging protocols, and commercial customs guides for the UK route.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Link
                  href="/export-from-nigeria-to-uk"
                  className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all group"
                >
                  <h4 className="font-bold text-sm text-white group-hover:text-amber-400">UK General Export Hub</h4>
                  <p className="text-xs text-blue-200 mt-1">Air freight options, delivery times, and Liverpool depot info.</p>
                  <span className="text-xs font-semibold text-amber-400 mt-2 inline-block">Explore Guide →</span>
                </Link>
                <Link
                  href="/export-food-from-nigeria-to-uk"
                  className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all group"
                >
                  <h4 className="font-bold text-sm text-white group-hover:text-emerald-400">Foodstuff Export &amp; DEFRA</h4>
                  <p className="text-xs text-blue-200 mt-1">Permitted dry foods, vacuum sealing, and zero-odor protocols.</p>
                  <span className="text-xs font-semibold text-emerald-400 mt-2 inline-block">Food Rules →</span>
                </Link>
                <Link
                  href="/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide"
                  className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all group"
                >
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-300">Commercial &amp; NEPC Guide</h4>
                  <p className="text-xs text-blue-200 mt-1">Form NXP, commercial invoices, and UK DCTS zero tariffs.</p>
                  <span className="text-xs font-semibold text-blue-300 mt-2 inline-block">B2B Roadmap →</span>
                </Link>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="p-8 bg-blue-900 text-white rounded-3xl text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Start Your International Export</h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
                Contact County Cargo today for an instant rate quote, item verification, or door pick-up booking in Nigeria.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/contact">Request Export Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/2348110000421" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-2xs">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-secondary hover:text-primary text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
