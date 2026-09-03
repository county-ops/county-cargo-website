import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { MapPin, Truck, ArrowRight, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping Cargo to Kano | Commercial & Doorstep Delivery',
  description: 'Air and sea cargo shipping to Kano Commercial Hub from the UK and USA. Doorstep delivery across Sabon Gari, Fagge, Sharada & Kano City.',
  keywords: 'shipping to Kano Nigeria, commercial cargo Kano, air freight Kano airport, Sabon Gari parcel delivery, send cargo Kano',
  alternates: {
    canonical: 'https://countycargo.com/shipping-to-kano',
  },
};

const kanoFaqs = [
  {
    question: 'Can County Cargo ship commercial wholesale merchandise to Kano?',
    answer: 'Yes! We ship commercial textile, electronics, spare parts, and general merchandise to Kano commercial markets (Sabon Gari, Singer, Fagge, Sharada) with full customs clearing.',
  },
  {
    question: 'How long does air shipping take from UK/US to Kano?',
    answer: 'Air cargo to Kano takes 7 to 12 working days from UK/US receipt to final delivery in Kano.',
  },
];

export default function ShippingToKanoPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shipping Cargo to Kano',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Kano',
    },
    description: 'Commercial cargo freight and doorstep parcel delivery to Kano State, Nigeria.',
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Shipping to Nigeria', href: '/shipping-to-nigeria' },
            { label: 'Shipping Cargo to Kano' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Northern Commercial Trading Hub
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping Cargo to Kano, Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Commercial and doorstep cargo delivery across Sabon Gari, Fagge, Sharada Industrial Estate, Nassarawa, and Kano metropolis.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
              <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary" /> Kano Commercial Coverage
              </h2>
              <p className="text-sm text-gray-700">
                Direct dispatch to Sabon Gari Market, Singer Market, Fagge, Sharada Phase 1 &amp; 2, Nassarawa, Bompai, and Kano Municipal.
              </p>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ship Cargo to Kano Today</h3>
                <p className="text-sm text-gray-600">Standard rates with customs clearing included.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Get Kano Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <RelatedGuides />
          </div>
        </section>

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Kano Route FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4">
              {kanoFaqs.map((faq, i) => (
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
