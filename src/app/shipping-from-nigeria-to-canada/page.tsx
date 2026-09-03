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
  title: 'Shipping from Nigeria to Canada | Air Cargo & Express',
  description: 'Reliable air cargo and express shipping from Nigeria to Canada. Doorstep delivery across Toronto, Calgary, Vancouver, Ottawa, and Montreal.',
  keywords: 'shipping from Nigeria to Canada, cargo from Nigeria to Canada, air cargo Lagos to Toronto, shipping cost Nigeria to Calgary, export to Canada',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-nigeria-to-canada',
  },
  openGraph: {
    title: 'Shipping from Nigeria to Canada | Air Cargo & Express',
    description: 'Reliable air cargo and express shipping from Nigeria to Canada. Doorstep delivery across Toronto, Calgary, Vancouver, Ottawa, and Montreal.',
    images: [{ url: 'https://countycargo.com/the world.png', alt: 'Air cargo plane shipping from Nigeria to Canada' }],
  },
};

const faqs = [
  {
    question: 'How long does air cargo shipping from Nigeria to Canada take?',
    answer: 'Express Air Courier (via DHL) takes 3 to 5 working days from Lagos or Abuja to major Canadian addresses. Standard Air Freight takes 5 to 10 working days including airport handling and CBSA customs processing in Toronto (YYZ) or Calgary (YYC).',
  },
  {
    question: 'Which cities in Canada does County Cargo deliver to?',
    answer: 'We provide door delivery to major metropolitan areas including Toronto, Calgary, Vancouver, Ottawa, Montreal, Edmonton, Mississauga, and Brampton.',
  },
  {
    question: 'How are shipping costs from Nigeria to Canada calculated?',
    answer: 'Costs are calculated based on the total chargeable weight—the greater value between actual scale weight and volumetric weight (L x W x H in cm / 5000)—plus handling and customs clearance.',
  },
  {
    question: 'Can I send traditional Nigerian food items to Canada?',
    answer: 'Yes, commercially packaged and dried plant-based food items such as garri, egusi, ogbono, pounded yam flour, and dried spices are permitted under Canadian Food Inspection Agency (CFIA) rules.',
  },
  {
    question: 'What items are strictly prohibited when shipping from Nigeria to Canada?',
    answer: 'Prohibited items include fresh uninspected meat or poultry, fresh unpasteurized dairy, raw seeds/soil, flammable liquids, weapons, counterfeit goods, and uncertified pharmaceuticals.',
  },
  {
    question: 'Do I need NEPC registration to export commercial goods to Canada?',
    answer: 'Formal commercial shipments exceeding $1,000 USD require an Exporter Registration Certificate from the Nigerian Export Promotion Council (NEPC). Small personal luggage and gifts shipped via consolidated manifests do not require individual NEPC filing.',
  },
  {
    question: 'Will my shipment incur Canadian customs duties or taxes?',
    answer: 'Canada applies GST (5%) or HST (up to 15% depending on the destination province like Ontario or Alberta) on imported goods valued over CAD $20. Duty rates depend on the HS tariff classification.',
  },
  {
    question: 'How can I track my shipment from Lagos to Canada?',
    answer: 'Every shipment receives a unique tracking reference number upon dispatch, allowing real-time online tracking from pick-up in Nigeria to doorstep delivery in Canada.',
  },
];

export default function ShippingFromNigeriaToCanadaPage() {
  const pageUrl = 'https://countycargo.com/shipping-from-nigeria-to-canada';
  
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Air Cargo & Express Shipping from Nigeria to Canada',
    serviceType: 'International Freight Forwarding & Parcel Export',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    description: 'Fast, secure air cargo and express shipping service from Lagos and Abuja, Nigeria to Toronto, Calgary, Vancouver, Ottawa, and Montreal.',
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
            { label: 'Shipping from Nigeria to Canada' },
          ]}
        />

        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-4 h-4 text-blue-300" /> Direct Air Cargo &amp; Express Route
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Nigeria to Canada
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 max-w-3xl mx-auto font-light">
              Express Air Courier (3–5 days) &amp; Standard Air Cargo (5–10 days) to Toronto, Calgary, Vancouver, Ottawa, and Montreal.
            </p>

            {/* Answer-First Summary */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left max-w-3xl mx-auto shadow-xl">
              <h2 className="text-xs uppercase font-bold tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Answer-First Summary: Nigeria to Canada Export Service
              </h2>
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                County Cargo provides reliable air shipping services connecting Lagos and Abuja to major Canadian hubs. Express Air Courier delivers within 3 to 5 working days, while Standard Air Cargo delivers within 5 to 10 working days. We handle customs declarations, CBSA entry processing, and doorstep distribution across Toronto, Calgary, Vancouver, Ottawa, and Montreal.
              </p>
            </div>

            {/* Author / Reviewer bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> Written by County Cargo Logistics Team</span>
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
                Our Nigeria to Canada export service is tailored for Nigerian Diaspora families sending personal belongings and foodstuff to relatives, commercial merchants exporting African fashion and spices, e-commerce sellers shipping orders to Canadian buyers, and corporate entities moving business documents.
              </p>
            </div>

            {/* Destination Cities */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" /> Key Destination Cities in Canada
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-semibold text-gray-800">
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Toronto (Ontario)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Calgary (Alberta)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Vancouver (BC)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Ottawa (Ontario)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Montreal (Quebec)</div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">Edmonton (Alberta)</div>
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">Step-by-Step Shipping Process</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-700 leading-relaxed">
                <li><strong>Drop-off or Collection:</strong> Bring packages to our Lagos/Abuja drop-off hubs or arrange doorstep pick-up.</li>
                <li><strong>Inspection &amp; Weighing:</strong> We verify contents, check packaging compliance, and compute scale vs. volumetric weight.</li>
                <li><strong>Customs Paperwork:</strong> Our team prepares commercial invoices, packing lists, and NAFDAC/NEPC declarations.</li>
                <li><strong>Air Transit:</strong> Cargo is loaded onto direct international flights to Canadian hub airports (YYZ / YYC).</li>
                <li><strong>CBSA Customs Clearance &amp; Delivery:</strong> After Canada Border Services Agency clearance, parcels are dispatched for doorstep delivery.</li>
              </ol>
            </div>

            {/* Permitted vs Restricted */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 border border-green-200 rounded-2xl">
                <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Permitted Goods
                </h3>
                <ul className="text-sm text-green-800 space-y-2 list-disc list-inside">
                  <li>Commercially dried foods (garri, egusi, ogbono)</li>
                  <li>African traditional attire, fabrics &amp; lace</li>
                  <li>Books, legal documents &amp; printed material</li>
                  <li>Cosmetics, wigs &amp; personal accessories</li>
                  <li>Handicrafts &amp; non-perishable merchandise</li>
                </ul>
              </div>

              <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" /> Prohibited &amp; Restricted Items
                </h3>
                <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                  <li>Fresh uninspected meats or poultry</li>
                  <li>Unpasteurized dairy products</li>
                  <li>Fresh plants, raw seeds, or soil</li>
                  <li>Flammables, aerosols &amp; batteries</li>
                  <li>Weapons, counterfeit goods &amp; illegal drugs</li>
                </ul>
              </div>
            </div>

            {/* Related Blog Posts */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Related Canada Shipping Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/blog/shipping-cost-from-nigeria-to-canada" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Shipping Cost from Nigeria to Canada</h3>
                  <p className="text-xs text-gray-600 mt-1">Rates, fees &amp; volumetric calculations.</p>
                </Link>
                <Link href="/blog/customs-documents-shipping-nigeria-to-canada" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Canada Customs Documents Needed</h3>
                  <p className="text-xs text-gray-600 mt-1">CBSA paperwork &amp; NEPC exporter rules.</p>
                </Link>
                <Link href="/blog/permitted-prohibited-items-nigeria-to-canada" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all">
                  <h3 className="font-bold text-secondary text-sm">Permitted &amp; Prohibited Items to Canada</h3>
                  <p className="text-xs text-gray-600 mt-1">CFIA agricultural food guidelines.</p>
                </Link>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="p-8 bg-blue-900 text-white rounded-3xl text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Ship Cargo to Canada?</h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
                Get a transparent rate quote, check item eligibility, or speak with our logistics compliance team today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/contact">Request Canada Freight Quote</Link>
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
