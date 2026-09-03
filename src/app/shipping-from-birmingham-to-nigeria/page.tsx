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
  title: 'Shipping from Birmingham to Nigeria | West Midlands Cargo',
  description: 'Ship cargo from Birmingham and the West Midlands to Nigeria. Doorstep collection across Birmingham, Solihull, Coventry, and Wolverhampton.',
  keywords: 'shipping from Birmingham to Nigeria, West Midlands cargo Lagos, Birmingham air freight Nigeria, send excess baggage Birmingham Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-birmingham-to-nigeria',
  },
};

const birminghamFaqs = [
  {
    question: 'Do you offer cargo collection in Birmingham and West Midlands?',
    answer: 'Yes! County Cargo collects doorstep cargo across Birmingham, Solihull, Sutton Coldfield, West Bromwich, Dudley, Walsall, Wolverhampton, and Coventry.',
  },
  {
    question: 'How long does shipping from Birmingham to Lagos take?',
    answer: 'Standard air cargo takes 5 to 10 working days from Birmingham pickup to doorstep delivery in Lagos or Abuja.',
  },
];

export default function ShippingFromBirminghamToNigeriaPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shipping from Birmingham to Nigeria',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Birmingham',
    },
    description: 'Doorstep cargo collection across Birmingham and West Midlands for delivery to Nigeria.',
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Shipping to Nigeria', href: '/shipping-to-nigeria' },
            { label: 'Shipping from Birmingham to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> West Midlands Doorstep Collection
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Birmingham to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Doorstep cargo pickup across Birmingham and West Midlands with fast air freight delivery to Lagos and Abuja.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
              <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary" /> West Midlands Coverage
              </h2>
              <p className="text-sm text-gray-700">
                Collection available in Birmingham, Solihull, Sutton Coldfield, West Bromwich, Dudley, Walsall, Wolverhampton, and Coventry.
              </p>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-secondary text-lg">Book Birmingham Collection</h3>
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
              <HelpCircle className="w-6 h-6 text-primary" /> Birmingham Route FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4">
              {birminghamFaqs.map((faq, i) => (
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
