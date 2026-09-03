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
  title: 'Shipping from Leeds to Nigeria | Yorkshire Cargo Collection',
  description: 'Ship cargo from Leeds, Bradford, and Yorkshire to Nigeria. Doorstep pickup across Leeds to Lagos, Abuja, and all 36 Nigerian states.',
  keywords: 'shipping from Leeds to Nigeria, Yorkshire cargo Lagos, air freight Leeds Nigeria, send parcel Leeds Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-leeds-to-nigeria',
  },
};

const leedsFaqs = [
  {
    question: 'Do you collect cargo in Leeds and Yorkshire?',
    answer: 'Yes! County Cargo collects doorstep packages across Leeds, Bradford, Wakefield, Huddersfield, Halifax, and West Yorkshire.',
  },
  {
    question: 'What is the air freight rate from Leeds to Lagos?',
    answer: 'Standard air freight starts at £6.00/kg (1kg minimum) plus £15 handling per shipment, delivering in 5 to 10 working days.',
  },
];

export default function ShippingFromLeedsToNigeriaPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shipping from Leeds to Nigeria',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Leeds',
    },
    description: 'Doorstep cargo collection across Leeds and West Yorkshire for delivery to Nigeria.',
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Shipping to Nigeria', href: '/shipping-to-nigeria' },
            { label: 'Shipping from Leeds to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> West Yorkshire Doorstep Collection
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Leeds to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Doorstep cargo pickup across Leeds and West Yorkshire with fast air freight delivery to Lagos and Abuja.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
              <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary" /> Yorkshire Collection Area
              </h2>
              <p className="text-sm text-gray-700">
                Collection available in Leeds City Centre, Headingley, Horsforth, Morley, Bradford, Wakefield, Huddersfield, and Halifax.
              </p>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-secondary text-lg">Book Leeds Collection</h3>
                <p className="text-sm text-gray-600">Standard £6.00/kg rate with door-to-door delivery in Nigeria.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Schedule Pickup <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <RelatedGuides />
          </div>
        </section>

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Leeds Route FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4">
              {leedsFaqs.map((faq, i) => (
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
