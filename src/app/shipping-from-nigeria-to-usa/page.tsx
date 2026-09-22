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
  title: 'Shipping from Nigeria to USA | Air Cargo & Express',
  description: 'Reliable air cargo and express shipping from Nigeria to America. Doorstep delivery in Houston, Dallas, Atlanta, New York, Chicago, and Maryland.',
  keywords: 'shipping from Nigeria to USA, cargo from Nigeria to USA, air cargo Lagos to Houston, air freight to Atlanta Dallas NYC, export to America',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-nigeria-to-usa',
  },
  openGraph: {
    title: 'Shipping from Nigeria to USA | Air Cargo & Express',
    description: 'Reliable air cargo and express shipping from Nigeria to America. Doorstep delivery in Houston, Dallas, Atlanta, New York, Chicago, and Maryland.',
    images: [{ url: 'https://countycargo.com/service-nigeria-to-us-enhanced.png', alt: 'Air cargo plane shipping from Nigeria to USA' }],
  },
};

const faqs = [
  {
    question: 'How long does air cargo take from Nigeria to the United States?',
    answer: 'Express Air Courier (via DHL) takes 3 to 5 working days from Lagos or Abuja to major US addresses. Standard Air Cargo takes 5–10 working days including US CBP customs clearance in Houston, Atlanta, or New York (JFK).',
  },
  {
    question: 'Which US cities and states are covered for door delivery?',
    answer: 'We deliver nationwide across all 50 US states, with direct receiving hubs and delivery networks servicing Houston, Dallas, Atlanta, New York, Chicago, Maryland, Washington DC, and New Jersey.',
  },
  {
    question: 'How does US FDA Prior Notice work for Nigerian food items?',
    answer: 'The US Food and Drug Administration (FDA) requires Prior Notice filing for all imported food products. County Cargo handles FDA prior notice declarations to ensure smooth entry.',
  },
  {
    question: 'What Nigerian foodstuff can I ship to the USA?',
    answer: 'Commercially dried plant-based food items such as garri, egusi, ogbono, pounded yam flour, spices, and vacuum-sealed boneless dried fish are permitted when properly declared.',
  },
  {
    question: 'How are air freight rates to the US calculated?',
    answer: 'Rates are calculated based on chargeable weight—the higher value between actual scale weight and volumetric weight (L x W x H in cm / 5000)—plus customs clearance.',
  },
  {
    question: 'What items are prohibited when shipping to the US?',
    answer: 'Prohibited goods include uninspected fresh meats/poultry, unpasteurized dairy, raw seeds/plants, flammables, counterfeit items, and uncertified pharmaceuticals.',
  },
  {
    question: 'Do I need NEPC registration for commercial exports to the US?',
    answer: 'Commercial shipments exceeding $1,000 USD require an Exporter Registration Certificate from the Nigerian Export Promotion Council (NEPC). Small personal luggage and gifts shipped via consolidated manifests do not require individual NEPC filing.',
  },
  {
    question: 'Can I track my cargo shipment to America live?',
    answer: 'Yes, every shipment receives a unique tracking reference number allowing real-time online monitoring from pick-up in Lagos/Abuja to final delivery in the US.',
  },
];

export default function ShippingFromNigeriaToUsaPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Air Cargo & Express Shipping from Nigeria to the USA',
    serviceType: 'International Freight Forwarding & Parcel Export',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    description: 'Fast, secure air cargo and express shipping service from Lagos and Abuja, Nigeria to Houston, Dallas, Atlanta, New York, Chicago, Maryland, and Washington DC.',
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
            { label: 'Shipping from Nigeria to USA' },
          ]}
        />

        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-4 h-4 text-blue-300" /> Direct US Air Cargo &amp; Express Route
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Nigeria to the USA
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 max-w-3xl mx-auto font-light">
              Express Air Courier (3–5 working days) &amp; Standard Air Cargo (5–10 working days) to Houston, Dallas, Atlanta, NYC, Chicago, and Maryland.
            </p>

            {/* Answer-First Summary */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left max-w-3xl mx-auto shadow-xl">
              <h2 className="text-xs uppercase font-bold tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Answer-First Summary: Nigeria to USA Export Service
              </h2>
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                County Cargo operates fast air freight dispatches connecting Lagos and Abuja to major airport gateways in America. Express Air Courier delivers in 3 to 5 working days, while Standard Air Cargo delivers in 5–10 working days. We manage US CBP customs clearance, FDA prior notice filing for food, and door delivery across Houston, Dallas, Atlanta, New York, Chicago, Maryland, Washington DC, and New Jersey.
              </p>
            </div>

            {/* Author / Reviewer bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> Written by County Cargo US Operations Team</span>
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
                Our USA export service serves Nigerian Diaspora families relocating or sending gifts, African food importers and vendors, fashion designers shipping attire to US clients, and corporate traders moving commercial inventory.
              </p>
            </div>

            {/* Destination Cities */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" /> Key Destination Cities in the United States
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-semibold text-gray-800">
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Houston (TX)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Dallas (TX)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Atlanta (GA)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">New York (NY)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Chicago (IL)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Maryland (MD)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Washington, DC</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">New Jersey (NJ)</div>
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">Step-by-Step Shipping Process</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-700 leading-relaxed">
                <li><strong>Drop-off or Pick-up:</strong> Bring packages to our Lagos/Abuja offices or schedule doorstep collection.</li>
                <li><strong>Weight &amp; Inspection:</strong> We verify box integrity, weigh scale vs. volumetric dimensions, and check FDA compliance.</li>
                <li><strong>Customs Declarations:</strong> We file US FDA Prior Notice and prepare export airway bills.</li>
                <li><strong>Air Transit:</strong> Cargo is flown directly to US hubs (IAH, ATL, JFK, ORD).</li>
                <li><strong>US CBP Clearance &amp; Final Delivery:</strong> Following US Customs clearance, packages are dispatched for nationwide door delivery.</li>
              </ol>
            </div>

            {/* Permitted vs Restricted */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 border border-green-200 rounded-2xl">
                <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Permitted Goods
                </h3>
                <ul className="text-sm text-green-800 space-y-2 list-disc list-inside">
                  <li>Commercially packaged dry foodstuff (garri, egusi, ogbono)</li>
                  <li>African fashion attire, lace fabrics &amp; leatherwork</li>
                  <li>Wigs, hair extensions &amp; beauty cosmetics</li>
                  <li>Books, legal documents &amp; printed items</li>
                  <li>Handicrafts &amp; non-perishable commercial samples</li>
                </ul>
              </div>

              <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" /> Prohibited &amp; Restricted Items
                </h3>
                <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                  <li>Fresh uninspected meat, poultry or pork</li>
                  <li>Unpasteurized milk or dairy products</li>
                  <li>Fresh fruit, plants or uncertified seeds</li>
                  <li>Flammable liquids, batteries &amp; aerosols</li>
                  <li>Weapons, counterfeit goods &amp; illegal substances</li>
                </ul>
              </div>
            </div>

            {/* Related Blog Posts */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Related USA Shipping Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/blog/complete-guide-shipping-cargo-nigeria-to-usa" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Complete Guide: Shipping to USA</h3>
                  <p className="text-xs text-gray-600 mt-1">Air cargo, FDA rules &amp; hub dispatches.</p>
                </Link>
                <Link href="/blog/nigeria-to-usa-air-cargo-cost-delivery-time" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">USA Air Cargo Cost &amp; Delivery Times</h3>
                  <p className="text-xs text-gray-600 mt-1">Pricing per kg &amp; Express vs Standard.</p>
                </Link>
                <Link href="/blog/how-to-send-food-personal-belongings-nigeria-to-america" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Sending Food &amp; Personal Items to US</h3>
                  <p className="text-xs text-gray-600 mt-1">FDA Notice &amp; food packaging rules.</p>
                </Link>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="p-8 bg-blue-900 text-white rounded-3xl text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Ship Cargo to America?</h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
                Get a transparent rate quote, check item eligibility, or speak with our US compliance specialists today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/contact">Request USA Freight Quote</Link>
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
