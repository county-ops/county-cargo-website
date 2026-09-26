import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import {
  Plane,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  FileText,
  AlertTriangle,
  Package,
  Boxes,
  HelpCircle,
  Truck,
  Zap,
  Scale,
  Check,
  Phone,
  Calculator,
  ExternalLink,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'International Shipping to Nigeria, UK and USA: Routes & Rates | County Cargo',
  description:
    'Complete guide to international shipping between Nigeria, the UK, and the USA. Popular routes: UK to Lagos (£6/kg + £15), UK to Abuja (£6.50/kg + £15), USA to Lagos ($5/lb), and Nigeria to UK/USA.',
  keywords:
    'international shipping to Nigeria UK USA, shipping UK to Lagos, shipping UK to Abuja, shipping USA to Lagos price per lb, Nigeria to UK cargo rate, transatlantic freight County Cargo',
  alternates: {
    canonical: 'https://countycargo.com/blog/international-shipping-to-nigeria-uk-usa',
  },
  openGraph: {
    title: 'International Shipping to Nigeria, UK and USA: Routes & Rates | County Cargo',
    description:
      'Reliable international shipping between Lagos, Abuja, London, Liverpool, and the USA. Transparent air cargo and ocean freight rates.',
    url: 'https://countycargo.com/blog/international-shipping-to-nigeria-uk-usa',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo Logistics Pricing Desk'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo rate calculator and route map for Nigeria, UK, and USA shipping',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Shipping to Nigeria, UK and USA: Routes & Rates',
    description:
      'Check current freight rates connecting Nigeria, the UK, and the USA with County Cargo. Clear pricing and tailored service levels.',
    images: ['https://countycargo.com/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg'],
  },
};

const faqs = [
  {
    question: 'What are the current popular route prices with County Cargo?',
    answer:
      'Our current key rates include: UK → Lagos (£6/kg + £15 handling), UK → Abuja (£6.50/kg + £15 handling), USA → Lagos ($5/lb), USA → Abuja ($5.50/lb), Nigeria → UK (from ₦10,500/kg), and Nigeria → USA (from ₦15,500/kg).',
  },
  {
    question: 'Are there different minimum weights across these routes?',
    answer:
      'Yes. Different minimum chargeable weights and service conditions apply depending on the route and tier. For example, Value air cargo from Nigeria has a 10kg minimum, while Express shipping is available from 1kg.',
  },
  {
    question: 'How do I choose the best service for my shipment?',
    answer:
      'With County Cargo, customers can choose the service that best suits their cargo rather than paying for unnecessary speed or capacity. Use our online shipping calculator to compare standard air freight, express air courier, and sea cargo options.',
  },
];

export default function InternationalShippingRoutesPage() {
  const articleUrl =
    'https://countycargo.com/blog/international-shipping-to-nigeria-uk-usa';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'International Shipping to Nigeria, UK and USA', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'International Shipping to Nigeria, UK and USA with County Cargo',
        description:
          'County Cargo provides international shipping solutions for customers sending goods between Lagos, Abuja, London, Liverpool and the United States.',
        image: 'https://countycargo.com/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Logistics Pricing Desk',
          url: 'https://countycargo.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://countycargo.com/county-logo.png',
          },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={schema} />
      <Header />

      <main className="pt-20 sm:pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'International Shipping Routes' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Tri-Continental Shipping Network
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              International Shipping to Nigeria, UK and USA with County Cargo
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Looking for reliable international shipping between Nigeria, the UK and the USA?
            </p>

            <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
              County Cargo provides international shipping solutions for customers sending goods between Lagos, Abuja, London, Liverpool and the United States.
            </p>

            <div className="mt-6">
              <SocialShare
                title="International Shipping to Nigeria, UK and USA with County Cargo"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg"
              alt="International shipping rates between Nigeria, UK, and USA"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Practical Shipping Options for Every Consignment
              </h2>
              <p>
                Our services include standard air cargo, express shipping, sea freight on selected routes and destination delivery services.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Current Popular Routes &amp; Rates:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-primary uppercase">UK to Nigeria</span>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm font-semibold text-gray-900">UK &rarr; Lagos: <span className="text-primary font-bold">£6/kg + £15 handling</span></p>
                    <p className="text-sm font-semibold text-gray-900">UK &rarr; Abuja: <span className="text-primary font-bold">£6.50/kg + £15 handling</span></p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-emerald-700 uppercase">USA to Nigeria</span>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm font-semibold text-gray-900">USA &rarr; Lagos: <span className="text-emerald-700 font-bold">$5/lb</span></p>
                    <p className="text-sm font-semibold text-gray-900">USA &rarr; Abuja: <span className="text-emerald-700 font-bold">$5.50/lb</span></p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 sm:col-span-2">
                  <span className="text-xs font-bold text-indigo-700 uppercase">Nigeria Outbound Exports</span>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p className="text-sm font-semibold text-gray-900">Nigeria &rarr; UK: <span className="text-indigo-700 font-bold">From ₦10,500/kg</span></p>
                    <p className="text-sm font-semibold text-gray-900">Nigeria &rarr; USA: <span className="text-indigo-700 font-bold">From ₦15,500/kg</span></p>
                  </div>
                </div>
              </div>

              <p>
                Different minimum weights and service conditions apply depending on the route.
              </p>
              <p>
                With County Cargo, customers can choose the service that best suits their shipment rather than paying for unnecessary speed or capacity.
              </p>
            </section>

            <section className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>
              <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-2xs not-prose">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-sm leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section className="mt-12 p-8 bg-gradient-to-br from-primary via-blue-900 to-slate-900 text-white rounded-2xl not-prose shadow-xl text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    Get an Instant Route Quotation
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Check current live rates for UK, USA, and Nigeria shipments on County Cargo.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-rates-uk-to-nigeria">
                      View Rate Sheet
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
