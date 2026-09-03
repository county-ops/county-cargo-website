import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { MapPin, Truck, Plane, ArrowRight, HelpCircle, CheckCircle2, Clock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from London to Nigeria | Doorstep Collection & Air Cargo',
  description: 'Reliable shipping from London to Nigeria with County Cargo. Doorstep pickup across Greater London (Wembley, Peckham, Woolwich, Barking, Croydon) to Lagos, Abuja, and Kano.',
  keywords: 'shipping from London to Nigeria, London air cargo Lagos, London to Abuja cargo, London to Kano shipping, Peckham cargo Nigeria, Woolwich shipping Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-london-to-nigeria',
  },
};

const londonFaqs = [
  {
    question: 'Do you collect cargo directly from homes in London?',
    answer: 'Yes! County Cargo provides daily doorstep collection across Greater London, including North, South, East, West London, Wembley, Barking, Woolwich, Peckham, Croydon, Lewisham, and Tottenham.',
  },
  {
    question: 'How much is air cargo per kg from London to Nigeria?',
    answer: 'Standard air cargo from London to Nigeria starts at £6.00 per kg (1kg minimum) with a £15 handling charge per shipment.',
  },
  {
    question: 'How fast is air cargo delivery from London to Nigeria?',
    answer: 'Express Air Courier delivers in 3 to 5 working days, while Standard Air Cargo collected in London arrives in Lagos or Abuja within 5 to 8 working days, and Kano in 6 to 10 working days.',
  },
];

const cityGuides = [
  {
    city: 'Lagos',
    href: '/blog/shipping-from-london-to-lagos',
    desc: 'Complete guide for shipping to Lagos. Ladipo-Oshodi central hub pickup & doorstep delivery.',
    time: '3–5 days (Express) | 5–7 days (Standard)',
  },
  {
    city: 'Abuja',
    href: '/blog/shipping-from-london-to-abuja',
    desc: 'Air freight guide to Abuja FCT. Garki/Wuse central depot collection & regional delivery.',
    time: '3–5 days (Express) | 5–8 days (Standard)',
  },
  {
    city: 'Kano',
    href: '/blog/shipping-from-london-to-kano',
    desc: 'Northern Nigeria air cargo guide. Bonded onward transit & Sabon Gari commercial depot pickup.',
    time: '3–5 days (Express) | 6–10 days (Standard)',
  },
];

export default function ShippingFromLondonToNigeriaPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shipping from London to Nigeria',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'London',
    },
    description: 'Doorstep collection across Greater London for air cargo shipping to Lagos, Abuja, Kano, and nationwide Nigeria.',
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Shipping to Nigeria', href: '/shipping-to-nigeria' },
            { label: 'Shipping from London to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Greater London Doorstep Collection
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from London to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Fast, reliable air shipping from London to Lagos, Abuja, Kano, and all 36 Nigerian states.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            
            {/* City Guides Cards */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Destination City Guides from London</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cityGuides.map((guide, idx) => (
                  <Link key={idx} href={guide.href} className="p-5 bg-gray-50 rounded-2xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group">
                    <h3 className="font-bold text-secondary text-lg group-hover:text-primary transition-colors flex items-center justify-between">
                      London to {guide.city} <ArrowRight className="w-4 h-4 text-primary" />
                    </h3>
                    <p className="text-xs text-primary font-semibold mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {guide.time}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">{guide.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
              <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary" /> London Collection Coverage
              </h2>
              <p className="text-sm text-gray-700">
                We collect from all London boroughs: Wembley, Harrow, Barking, Dagenham, Woolwich, Greenwich, Peckham, Lewisham, Croydon, Stratford, Enfield, Ilford, Tottenham, and surrounding Home Counties.
              </p>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-secondary text-lg">Book London Collection Now</h3>
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
              <HelpCircle className="w-6 h-6 text-primary" /> London Route FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4">
              {londonFaqs.map((faq, i) => (
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
