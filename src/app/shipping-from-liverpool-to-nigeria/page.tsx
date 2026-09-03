import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { MapPin, Truck, Plane, Ship, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { UkStoreBanner } from '@/components/promo-banner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from Liverpool to Nigeria | Depot Drop-off & Air Cargo',
  description: 'Ship cargo from Liverpool to Nigeria with County Cargo. Drop off at our Queens Dock Commercial Centre depot (L1 0BG) or arrange doorstep collection across Merseyside.',
  keywords: 'shipping from Liverpool to Nigeria, Liverpool cargo depot Lagos, air freight Liverpool Nigeria, drop off cargo Liverpool, Merseyside shipping Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-liverpool-to-nigeria',
  },
};

const liverpoolFaqs = [
  {
    question: 'Where is the County Cargo Liverpool receiving depot located?',
    answer: 'Our Liverpool depot is located at Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG. Customers across Merseyside and the North West can drop off cargo directly during business hours.',
  },
  {
    question: 'Can I arrange doorstep collection in Liverpool and Merseyside?',
    answer: 'Yes! If you cannot drop off your cargo at our Queens Dock office, County Cargo provides doorstep collection across Liverpool, Birkenhead, St Helens, Southport, and Merseyside.',
  },
  {
    question: 'How fast is air cargo from Liverpool to Lagos or Abuja?',
    answer: 'Air cargo dispatched from our Liverpool depot arrives in Lagos within 5 to 10 working days, including airport handling and customs clearance.',
  },
];

export default function ShippingFromLiverpoolToNigeriaPage() {
  const pageUrl = 'https://countycargo.com/shipping-from-liverpool-to-nigeria';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shipping from Liverpool to Nigeria',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Liverpool',
    },
    description: 'Direct freight forwarding and parcel collection from Liverpool, Merseyside to Lagos, Abuja, and nationwide Nigeria.',
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Shipping to Nigeria', href: '/shipping-to-nigeria' },
            { label: 'Shipping from Liverpool to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Official Liverpool Depot Location &amp; Doorstep Collection
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Liverpool to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Drop off your cargo at Queens Dock Commercial Centre (L1 0BG) or schedule doorstep collection across Liverpool and Merseyside.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
              <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" /> Liverpool Receiving Office &amp; Drop-off Depot
              </h2>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG.<br />
                <strong>Services Available:</strong> Over-the-counter drop-off, cargo weighing, packaging support, standard air freight (£6.00/kg), and express door delivery to Nigeria.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-secondary">How Liverpool Shippers Use County Cargo</h2>
            <p>
              Merseyside residents, Liverpool students, and North West businesses can choose between direct depot drop-off at Queens Dock or doorstep pickup. Once received, your cargo is processed, weighed, and flown directly into Lagos for fast customs clearance and delivery.
            </p>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to drop off or ship from Liverpool?</h3>
                <p className="text-sm text-gray-600">Get your free UK shipping address or schedule a collection today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Get UK Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <RelatedGuides />
          </div>
        </section>

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Liverpool Route FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4">
              {liverpoolFaqs.map((faq, i) => (
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
