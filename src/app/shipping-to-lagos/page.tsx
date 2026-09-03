import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { MapPin, Truck, ArrowRight, HelpCircle, Building2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping Cargo to Lagos, Nigeria | Air & Sea Freight Delivery',
  description: 'Fast air cargo and ocean freight shipping to Lagos from the UK and USA. Doorstep delivery across Ikeja, Victoria Island, Lekki, Mainland & Island.',
  keywords: 'shipping to Lagos Nigeria, air cargo Lagos airport, door to door delivery Lagos, Lagos sea freight clearing Apapa, send parcel Lagos',
  alternates: {
    canonical: 'https://countycargo.com/shipping-to-lagos',
  },
};

const lagosFaqs = [
  {
    question: 'Where is County Cargo’s main office in Lagos?',
    answer: 'Our main Lagos office and dispatch hub is located at Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos (102214). Customers can pick up cargo or arrange doorstep delivery across Lagos State.',
  },
  {
    question: 'How fast is air cargo delivery to Lagos from the UK/USA?',
    answer: 'Air cargo arrives at Murtala Muhammed Airport (LOS) and clears customs in 24–48 hours, with doorstep delivery in 5 to 10 working days.',
  },
];

export default function ShippingToLagosPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shipping Cargo to Lagos',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Lagos',
    },
    description: 'Direct air and sea cargo clearing and doorstep delivery across Lagos State, Nigeria.',
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Shipping to Nigeria', href: '/shipping-to-nigeria' },
            { label: 'Shipping Cargo to Lagos' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Main Lagos Office &amp; Dispatch Hub
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping Cargo to Lagos, Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Doorstep cargo delivery across Ikeja, Lekki, Victoria Island, Yaba, Surulere, and all parts of Lagos State.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
              <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary" /> Lagos Hub &amp; Collection Address
              </h2>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos.<br />
                <strong>Coverage:</strong> Ikeja, Lekki Phase 1, Victoria Island, Ikoyi, Maryland, Yaba, Surulere, Festac, Ajah, Ikorodu, Badagry.
              </p>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ship Cargo to Lagos Today</h3>
                <p className="text-sm text-gray-600">Standard £6.00/kg rate from UK with full customs clearing.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Get Shipping Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <RelatedGuides />
          </div>
        </section>

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Lagos Route FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4">
              {lagosFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-secondary">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700">{faq.answer}</AccordionContent>
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
