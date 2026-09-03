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
  title: 'Shipping from Nigeria to Germany | Air Freight & Express',
  description: 'Reliable air cargo and express shipping from Nigeria to Germany. Doorstep delivery across Frankfurt, Berlin, Munich, Hamburg, and Cologne.',
  keywords: 'shipping from Nigeria to Germany, cargo from Nigeria to Germany, air freight Nigeria to Germany, Lagos to Frankfurt cargo, export to Germany',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-nigeria-to-germany',
  },
  openGraph: {
    title: 'Shipping from Nigeria to Germany | Air Freight & Express',
    description: 'Reliable air cargo and express shipping from Nigeria to Germany. Doorstep delivery across Frankfurt, Berlin, Munich, Hamburg, and Cologne.',
    images: [{ url: 'https://countycargo.com/blog-1-nigeria-export.png', alt: 'Air cargo plane shipping from Nigeria to Germany' }],
  },
};

const faqs = [
  {
    question: 'How long does air cargo shipping from Nigeria to Germany take?',
    answer: 'Express Air Courier (via DHL) takes 3 to 5 working days from Lagos or Abuja to major German addresses. Standard Air Cargo takes 5 to 8 working days including customs clearance at Frankfurt Airport (FRA).',
  },
  {
    question: 'Which German cities does County Cargo deliver to?',
    answer: 'We provide door delivery across all German federal states, servicing Berlin, Frankfurt, Hamburg, Munich, Cologne, Düsseldorf, Stuttgart, and Leipzig.',
  },
  {
    question: 'How does German customs clearance (Zoll) work for Nigerian cargo?',
    answer: 'German customs requires a Commercial Invoice / Packing List with HS codes, sender/recipient identification, and EORI number for commercial traders. Personal luggage is cleared under consolidated manifest rules.',
  },
  {
    question: 'What food items are permitted entry into Germany from Nigeria?',
    answer: 'Commercially dried plant-based food items such as garri, egusi, ogbono, pounded yam flour, and spices are permitted under EU agricultural import rules.',
  },
  {
    question: 'What items are prohibited when shipping to Germany?',
    answer: 'Prohibited items include fresh uninspected meat/dairy, raw seeds or live plants, flammables, counterfeit items, and uncertified medicines.',
  },
  {
    question: 'How are air freight rates to Germany calculated?',
    answer: 'Rates are calculated based on total chargeable weight—the greater value between actual scale weight and volumetric weight (L x W x H in cm / 5000)—plus customs clearance.',
  },
  {
    question: 'Will my shipment be subject to German EU Import VAT?',
    answer: 'Germany applies standard 19% EU Import VAT (Einfuhrumsatzsteuer) on commercial imports valued above EU thresholds, plus applicable customs duty based on product category.',
  },
  {
    question: 'Can I track my cargo shipment to Germany online?',
    answer: 'Yes, every shipment receives a unique tracking reference number allowing real-time online tracking from pick-up in Nigeria to doorstep delivery in Germany.',
  },
];

export default function ShippingFromNigeriaToGermanyPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Air Cargo & Express Shipping from Nigeria to Germany',
    serviceType: 'International Freight Forwarding & Parcel Export',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    description: 'Fast, secure air cargo and express shipping service from Lagos and Abuja, Nigeria to Frankfurt, Berlin, Hamburg, Munich, Cologne, and Düsseldorf.',
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
            { label: 'Shipping from Nigeria to Germany' },
          ]}
        />

        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-4 h-4 text-blue-300" /> Direct Germany Air Cargo &amp; Express Route
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Nigeria to Germany
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 max-w-3xl mx-auto font-light">
              Express Air Courier (3–5 days) &amp; Standard Air Cargo (5–8 days) to Frankfurt, Berlin, Munich, Hamburg, and Cologne.
            </p>

            {/* Answer-First Summary */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left max-w-3xl mx-auto shadow-xl">
              <h2 className="text-xs uppercase font-bold tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Answer-First Summary: Nigeria to Germany Export Service
              </h2>
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                County Cargo connects Lagos and Abuja to major commercial hubs in Germany. Express Air Courier delivers in 3 to 5 working days, while Standard Air Cargo delivers in 5 to 8 working days. We manage German Zoll customs clearance, EU VAT paperwork, and doorstep delivery across Berlin, Frankfurt, Hamburg, Munich, Cologne, and Düsseldorf.
              </p>
            </div>

            {/* Author / Reviewer bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> Written by County Cargo European Route Expert</span>
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
                Our Germany export service is built for Nigerian Diaspora families residing in Germany, commercial merchants exporting African fashion and foods, B2B traders moving industrial samples, and students sending personal belongings.
              </p>
            </div>

            {/* Destination Cities */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" /> Key Destination Cities in Germany
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-semibold text-gray-800">
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Berlin</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Frankfurt (FRA Hub)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Hamburg</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Munich</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Cologne</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Düsseldorf</div>
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">Step-by-Step Shipping Process</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-700 leading-relaxed">
                <li><strong>Drop-off or Collection:</strong> Bring packages to our Lagos/Abuja offices or schedule doorstep pick-up.</li>
                <li><strong>Weight &amp; Packaging Review:</strong> We weigh scale vs. volumetric dimensions and check EU agricultural compliance.</li>
                <li><strong>Customs Paperwork:</strong> We prepare EU customs declarations and commercial invoices.</li>
                <li><strong>Air Transit:</strong> Cargo flies directly to Frankfurt Airport (FRA).</li>
                <li><strong>Zoll Clearance &amp; Door Delivery:</strong> Following German customs clearance, packages are dispatched for doorstep delivery across Germany.</li>
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
                  <li>African traditional fashion, textiles &amp; leatherwork</li>
                  <li>Books, legal paperwork &amp; personal luggage</li>
                  <li>Cosmetics, wigs &amp; personal accessories</li>
                  <li>Commercial merchandise &amp; non-perishable trade samples</li>
                </ul>
              </div>

              <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" /> Prohibited &amp; Restricted Items
                </h3>
                <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                  <li>Fresh uninspected meats or poultry</li>
                  <li>Unpasteurized milk or dairy products</li>
                  <li>Fresh plants, raw seeds or soil</li>
                  <li>Flammables, aerosols &amp; batteries</li>
                  <li>Weapons, counterfeit goods &amp; illegal drugs</li>
                </ul>
              </div>
            </div>

            {/* Related Blog Posts */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Related Germany Shipping Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/blog/how-to-ship-goods-from-nigeria-to-germany" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">How to Ship Goods to Germany</h3>
                  <p className="text-xs text-gray-600 mt-1">Air freight routes &amp; Frankfurt hub.</p>
                </Link>
                <Link href="/blog/german-customs-requirements-cargo-from-nigeria" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">German Customs Requirements (Zoll)</h3>
                  <p className="text-xs text-gray-600 mt-1">EU VAT, EORI &amp; document rules.</p>
                </Link>
                <Link href="/blog/air-freight-nigeria-to-germany-cost-delivery" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Germany Air Freight Cost &amp; Delivery</h3>
                  <p className="text-xs text-gray-600 mt-1">Per-kg pricing &amp; transit schedules.</p>
                </Link>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="p-8 bg-blue-900 text-white rounded-3xl text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Ship Cargo to Germany?</h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
                Get a transparent rate quote, check item eligibility, or speak with our European compliance specialists today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/contact">Request Germany Freight Quote</Link>
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
