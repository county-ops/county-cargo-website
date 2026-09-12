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
  title: 'Shipping from Nigeria to Turkey | Air Freight & Cargo',
  description: 'Reliable air cargo and express shipping from Nigeria to Turkey. Doorstep delivery across Istanbul, Ankara, Izmir, Bursa, Antalya, and Adana.',
  keywords: 'shipping from Nigeria to Turkey, cargo from Nigeria to Turkey, air freight Nigeria to Turkey, Lagos to Istanbul cargo, export to Turkey',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-nigeria-to-turkey',
  },
  openGraph: {
    title: 'Shipping from Nigeria to Turkey | Air Freight & Cargo',
    description: 'Reliable air cargo and express shipping from Nigeria to Turkey. Doorstep delivery across Istanbul, Ankara, Izmir, Bursa, Antalya, and Adana.',
    images: [{ url: 'https://countycargo.com/service-nigeria-world.png', alt: 'Air cargo plane shipping from Nigeria to Turkey' }],
  },
};

const faqs = [
  {
    question: 'How long does air cargo shipping from Nigeria to Turkey take?',
    answer: 'Express Air Courier (via DHL) takes 3 to 5 working days from Lagos or Abuja to major Turkish addresses. Standard Air Cargo takes 5 to 10 working days including customs clearance at Istanbul Airport (IST).',
  },
  {
    question: 'Which cities in Turkey does County Cargo deliver to?',
    answer: 'We deliver across Turkey, servicing Istanbul, Ankara, Izmir, Bursa, Antalya, Adana, Gaziantep, and Konya.',
  },
  {
    question: 'How does Turkish customs clearance work for commercial goods?',
    answer: 'Turkish customs requires a detailed Commercial Invoice with HS codes, packing list, sender and recipient tax numbers (VKN/TCKN), and airway bill. Commercial samples are cleared under Ministry of Trade guidelines.',
  },
  {
    question: 'Can commercial traders send merchandise samples from Nigeria to Turkey?',
    answer: 'Yes! Commercial samples, raw agricultural products, textiles, and fashion apparel are regularly shipped from Lagos to trade hubs in Istanbul and Bursa.',
  },
  {
    question: 'What agricultural items are restricted by Turkish customs?',
    answer: 'Fresh uninspected meat, raw seeds, live plants, and unpasteurized dairy products are restricted to prevent agricultural contamination.',
  },
  {
    question: 'How are air freight rates to Turkey calculated?',
    answer: 'Rates are calculated based on total chargeable weight—the greater value between actual scale weight and volumetric weight (L x W x H in cm / 5000)—plus customs clearance handling.',
  },
  {
    question: 'Do I need NEPC registration to export commercial goods to Turkey?',
    answer: 'Commercial exports exceeding $1,000 USD require an Exporter Registration Certificate from the Nigerian Export Promotion Council (NEPC). Small personal luggage and gifts shipped via consolidated manifests do not require individual NEPC filing.',
  },
  {
    question: 'Can I track my shipment from Lagos to Istanbul online?',
    answer: 'Yes, every shipment receives a unique tracking reference number allowing real-time online tracking from pick-up in Nigeria to final delivery in Turkey.',
  },
];

export default function ShippingFromNigeriaToTurkeyPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Air Cargo & Express Shipping from Nigeria to Turkey',
    serviceType: 'International Freight Forwarding & Parcel Export',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    description: 'Fast, secure air cargo and express shipping service from Lagos and Abuja, Nigeria to Istanbul, Ankara, Izmir, Bursa, Antalya, and Adana.',
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
            { label: 'Shipping from Nigeria to Turkey' },
          ]}
        />

        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-4 h-4 text-blue-300" /> Direct Turkey Air Cargo &amp; Express Route
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Nigeria to Turkey
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 max-w-3xl mx-auto font-light">
              Express Air Courier (3–5 working days) &amp; Standard Air Cargo (5–10 working days) to Istanbul, Ankara, Izmir, Bursa, and Antalya.
            </p>

            {/* Answer-First Summary */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left max-w-3xl mx-auto shadow-xl">
              <h2 className="text-xs uppercase font-bold tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Answer-First Summary: Nigeria to Turkey Export Service
              </h2>
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                County Cargo connects Lagos and Abuja to major trade centers across Turkey. Express Air Courier delivers within 3 to 5 working days, while Standard Air Cargo delivers within 5 to 10 working days. We manage Turkish Ministry of Trade customs clearance, commercial sample declarations, and doorstep delivery across Istanbul, Ankara, Izmir, Bursa, Antalya, and Adana.
              </p>
            </div>

            {/* Author / Reviewer bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> Written by County Cargo Middle East &amp; Turkey Expert</span>
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
                Our Turkey export route is built for B2B commercial traders exporting agricultural produce and fashion samples, Nigerian Diaspora families in Turkey, e-commerce vendors, and individuals sending personal effects.
              </p>
            </div>

            {/* Destination Cities */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" /> Key Destination Cities in Turkey
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-semibold text-gray-800">
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Istanbul (IST Hub)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Ankara</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Izmir</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Bursa</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Antalya</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Adana</div>
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">Step-by-Step Shipping Process</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-700 leading-relaxed">
                <li><strong>Drop-off or Pick-up:</strong> Bring packages to our Lagos/Abuja offices or schedule doorstep collection.</li>
                <li><strong>Weight &amp; Packaging Check:</strong> We verify parcel integrity, compute scale vs. volumetric weight, and inspect commercial invoices.</li>
                <li><strong>Customs Declarations:</strong> We prepare Turkish Ministry of Trade declarations and airway bills.</li>
                <li><strong>Air Transit:</strong> Cargo flies directly to Istanbul Airport (IST).</li>
                <li><strong>Customs Clearance &amp; Final Delivery:</strong> Following Turkish customs clearance, packages are dispatched for doorstep delivery.</li>
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
                  <li>Books, legal documents &amp; personal luggage</li>
                  <li>Cosmetics, wigs &amp; personal accessories</li>
                  <li>Commercial merchandise &amp; non-perishable trade samples</li>
                </ul>
              </div>

              <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" /> Prohibited &amp; Restricted Items
                </h3>
                <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                  <li>Fresh uninspected meat or poultry</li>
                  <li>Unpasteurized dairy products</li>
                  <li>Fresh plants, raw seeds or soil</li>
                  <li>Flammables, aerosols &amp; batteries</li>
                  <li>Weapons, counterfeit goods &amp; illegal drugs</li>
                </ul>
              </div>
            </div>

            {/* Related Blog Posts */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Related Turkey Shipping Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/blog/complete-guide-shipping-cargo-nigeria-to-turkey" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Complete Guide: Shipping to Turkey</h3>
                  <p className="text-xs text-gray-600 mt-1">Air cargo routes &amp; Istanbul hub.</p>
                </Link>
                <Link href="/blog/nigeria-to-turkey-air-freight-cost-customs-guide" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Turkey Air Freight Cost &amp; Customs</h3>
                  <p className="text-xs text-gray-600 mt-1">Rates per kg &amp; Ministry of Trade rules.</p>
                </Link>
                <Link href="/blog/permitted-restricted-items-shipping-to-turkey" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Permitted &amp; Restricted Goods to Turkey</h3>
                  <p className="text-xs text-gray-600 mt-1">Safety checklist &amp; agricultural rules.</p>
                </Link>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="p-8 bg-blue-900 text-white rounded-3xl text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Ship Cargo to Turkey?</h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
                Get a transparent rate quote, check item eligibility, or speak with our Turkey route specialists today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/contact">Request Turkey Freight Quote</Link>
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
