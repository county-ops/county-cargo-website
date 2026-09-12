import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
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
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from Nigeria to France | Air Freight & Express',
  description: 'Reliable air cargo and express shipping from Nigeria to France. Doorstep delivery across Paris, Lyon, Marseille, Toulouse, Bordeaux, and Lille.',
  keywords: 'shipping from Nigeria to France, cargo from Nigeria to France, air freight Nigeria to France, Lagos to Paris CDG cargo, export to France',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-nigeria-to-france',
  },
  openGraph: {
    title: 'Shipping from Nigeria to France | Air Freight & Express',
    description: 'Reliable air cargo and express shipping from Nigeria to France. Doorstep delivery across Paris, Lyon, Marseille, Toulouse, Bordeaux, and Lille.',
    images: [{ url: 'https://countycargo.com/HERO.png', alt: 'Air cargo plane shipping from Nigeria to France' }],
  },
};

const faqs = [
  {
    question: 'How long does air cargo shipping from Nigeria to France take?',
    answer: 'Express Air Courier (via DHL) takes 3 to 5 working days from Lagos or Abuja to major French addresses. Standard Air Cargo takes 5 to 10 working days including customs clearance at Paris Charles de Gaulle Airport (CDG).',
  },
  {
    question: 'Which cities in France does County Cargo deliver to?',
    answer: 'We provide door delivery across France, servicing Paris, Lyon, Marseille, Toulouse, Bordeaux, Lille, Nantes, and Strasbourg.',
  },
  {
    question: 'How does French customs clearance (Douane) work?',
    answer: 'French customs requires a detailed Commercial Invoice, Airway Bill, Packing List with HS codes, and recipient ID. Commercial goods are assessed for EU import VAT (20% TVA) and duty.',
  },
  {
    question: 'Can I ship traditional African fashion and lace to France?',
    answer: 'Yes! African fashion attire, lace fabrics, Aso-Ebi, and leather items are widely exported to France with no agricultural restrictions.',
  },
  {
    question: 'What food items can I send to France from Nigeria?',
    answer: 'Commercially dried plant-based foodstuffs such as garri, egusi, ogbono, pounded yam flour, and spices are permitted under EU food safety regulations.',
  },
  {
    question: 'What items are prohibited when shipping to France?',
    answer: 'Prohibited goods include fresh uninspected meats, unpasteurized dairy, raw seeds/plants, flammables, counterfeit luxury goods, and uncertified medicines.',
  },
  {
    question: 'How are air shipping rates to France calculated?',
    answer: 'Rates are calculated based on total chargeable weight—the greater value between actual scale weight and volumetric weight (L x W x H in cm / 5000)—plus customs handling.',
  },
  {
    question: 'Can I track my shipment from Lagos to France?',
    answer: 'Yes, every shipment receives a unique tracking reference number allowing real-time online tracking from pick-up in Nigeria to final delivery in France.',
  },
];

export default function ShippingFromNigeriaToFrancePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Air Cargo & Express Shipping from Nigeria to France',
    serviceType: 'International Freight Forwarding & Parcel Export',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    description: 'Fast, secure air cargo and express shipping service from Lagos and Abuja, Nigeria to Paris, Lyon, Marseille, Toulouse, Bordeaux, and Lille.',
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
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Export Services', href: '/export-from-nigeria' },
            { label: 'Shipping from Nigeria to France' },
          ]}
        />

        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-4 h-4 text-blue-300" /> Direct France Air Cargo &amp; Express Route
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Nigeria to France
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 max-w-3xl mx-auto font-light">
              Express Air Courier (3–5 working days) &amp; Standard Air Cargo (5–10 working days) to Paris, Lyon, Marseille, Toulouse, and Bordeaux.
            </p>

            {/* Answer-First Summary */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left max-w-3xl mx-auto shadow-xl">
              <h2 className="text-xs uppercase font-bold tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Answer-First Summary: Nigeria to France Export Service
              </h2>
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                County Cargo provides reliable air cargo services connecting Lagos and Abuja to Paris Charles de Gaulle (CDG). Express Air Courier delivers within 3 to 5 working days, while Standard Air Cargo delivers within 5 to 10 working days. We manage Douane française customs clearance, TVA paperwork, and doorstep delivery across Paris, Lyon, Marseille, Toulouse, Bordeaux, and Lille.
              </p>
            </div>

            {/* Author / Reviewer bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> Written by County Cargo French Route Manager</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Logistics Compliance Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-yellow-400" /> Last updated: 30 August 2026</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Who Service is Intended For */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">Who This Service Is Intended For</h2>
              <p className="text-gray-700 leading-relaxed">
                Our France export route serves Nigerian Diaspora families in France, fashion designers exporting African attire to French boutiques, food vendors, commercial traders, and individuals sending personal gifts.
              </p>
            </div>

            {/* Destination Cities */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" /> Key Destination Cities in France
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-semibold text-gray-800">
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Paris (CDG Hub)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Lyon</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Marseille</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Toulouse</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Bordeaux</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Lille</div>
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">Step-by-Step Shipping Process</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-700 leading-relaxed">
                <li><strong>Drop-off or Collection:</strong> Bring packages to our Lagos/Abuja drop-off hubs or schedule doorstep pick-up.</li>
                <li><strong>Weight &amp; Packaging Check:</strong> We inspect parcel contents, verify double-wall boxes, and calculate scale vs. volumetric weight.</li>
                <li><strong>Customs Declarations:</strong> We handle Douane française documentation and airway bill filing.</li>
                <li><strong>Air Transit:</strong> Cargo is flown directly to Paris Charles de Gaulle Airport (CDG).</li>
                <li><strong>Douane Clearance &amp; Final Delivery:</strong> Following French customs clearance, packages are dispatched for doorstep delivery.</li>
              </ol>
            </div>

            {/* Permitted vs Restricted */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 border border-green-200 rounded-2xl">
                <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Permitted Goods
                </h3>
                <ul className="text-sm text-green-800 space-y-2 list-disc list-inside">
                  <li>Commercially dried plant foodstuff (garri, egusi, ogbono)</li>
                  <li>African traditional fashion, lace &amp; attire</li>
                  <li>Books, legal documents &amp; personal luggage</li>
                  <li>Wigs, cosmetics &amp; personal accessories</li>
                  <li>Commercial merchandise &amp; non-perishable samples</li>
                </ul>
              </div>

              <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" /> Prohibited &amp; Restricted Items
                </h3>
                <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                  <li>Fresh uninspected meat, poultry or pork</li>
                  <li>Unpasteurized milk or dairy products</li>
                  <li>Fresh plants, raw seeds or soil</li>
                  <li>Flammables, aerosols &amp; batteries</li>
                  <li>Weapons, counterfeit luxury goods &amp; illegal drugs</li>
                </ul>
              </div>
            </div>

            {/* Related Blog Posts */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Related France Shipping Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/blog/complete-guide-shipping-from-nigeria-to-france" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Complete Guide: Shipping to France</h3>
                  <p className="text-xs text-gray-600 mt-1">Air cargo routes &amp; Paris CDG hub.</p>
                </Link>
                <Link href="/blog/documents-required-export-goods-nigeria-to-france" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Documents Required for France Export</h3>
                  <p className="text-xs text-gray-600 mt-1">French Douane rules &amp; EUR.1 forms.</p>
                </Link>
                <Link href="/blog/sending-food-clothing-personal-belongings-to-france" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Sending Food &amp; Fashion to France</h3>
                  <p className="text-xs text-gray-600 mt-1">African fashion &amp; dry food rules.</p>
                </Link>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="p-8 bg-blue-900 text-white rounded-3xl text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Ship Cargo to France?</h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
                Get a transparent rate quote, check item eligibility, or speak with our French compliance specialists today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/contact">Request France Freight Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/447438827464" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
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
