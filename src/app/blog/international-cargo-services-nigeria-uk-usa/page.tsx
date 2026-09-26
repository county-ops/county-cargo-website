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
  Ship,
  Zap,
  Scale,
  Check,
  Phone,
  Calculator,
  ExternalLink,
  Warehouse,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'International Cargo Services Between Nigeria, UK & USA | County Cargo',
  description:
    'County Cargo coordinates international cargo between Nigeria, the UK, and the USA. Dedicated hubs in Lagos, Abuja, Liverpool, and Texas providing air and sea freight with 3–5 day express options.',
  keywords:
    'international cargo services, cargo between Nigeria UK USA, Lagos cargo Liverpool, Abuja cargo Texas, international freight forwarding Nigeria, transatlantic cargo County Cargo',
  alternates: {
    canonical: 'https://countycargo.com/blog/international-cargo-services-nigeria-uk-usa',
  },
  openGraph: {
    title: 'International Cargo Services Between Nigeria, UK & USA | County Cargo',
    description:
      'Coordinating international cargo movement between Lagos, Abuja, Liverpool, and Texas. Straightforward air freight, sea cargo, and express solutions.',
    url: 'https://countycargo.com/blog/international-cargo-services-nigeria-uk-usa',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo International Logistics Operations'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/complete-guide-nigeria-to-uk-freight.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo international cargo freight pallets connecting Nigeria, the UK, and the USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Cargo Services Between Nigeria, UK & USA | County Cargo',
    description:
      'Move personal and commercial cargo seamlessly between Nigeria, the UK, and the USA with County Cargo hubs in Lagos, Abuja, Liverpool, and Texas.',
    images: ['https://countycargo.com/images/blog/complete-guide-nigeria-to-uk-freight.jpg'],
  },
};

const faqs = [
  {
    question: 'Where are County Cargo’s key operational facilities located?',
    answer:
      'County Cargo operates physical facilities and consolidation hubs in Lagos (Ladipo-Oshodi Plaza), Abuja (Wuye Ultra Modern Market), the UK (Liverpool Queens Dock L1 0BG and London Charlton), and the USA (Texas receiving depot).',
  },
  {
    question: 'What types of cargo can be shipped between Nigeria, the UK, and the USA?',
    answer:
      'We handle clothing and personal effects, household goods, business merchandise, approved shelf-stable food products, documents, electronics, and general commercial cargo complying with international customs standards.',
  },
  {
    question: 'What are the typical cargo timelines?',
    answer:
      'Standard air cargo services between the UK, US, and Nigeria operate within 5–10 working days. Selected express options deliver within approximately 3–5 working days, while sea freight operates within 30–45 working days, subject to customs and airline schedules.',
  },
  {
    question: 'Is sea freight available for large cargo?',
    answer:
      'Yes, County Cargo provides ocean sea freight services on supported UK–Nigeria routes, ideal for heavier commercial consignments, large household relocations, and shipping barrels.',
  },
];

export default function InternationalCargoNigeriaUkUsaPage() {
  const articleUrl =
    'https://countycargo.com/blog/international-cargo-services-nigeria-uk-usa';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'International Cargo Services Between Nigeria, UK and USA', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'International Cargo Services Between Nigeria, UK and USA',
        description:
          'County Cargo coordinates international cargo movement between Lagos, Abuja, Liverpool, and Texas for personal and commercial shippers.',
        image: 'https://countycargo.com/images/blog/complete-guide-nigeria-to-uk-freight.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo International Logistics Operations',
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
              { label: 'International Cargo Services' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Multi-Hub Global Cargo Logistics
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Warehouse className="w-3.5 h-3.5 text-emerald-600" /> Lagos &bull; Abuja &bull; Liverpool &bull; Texas
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              International Cargo Services Between Nigeria, UK and USA
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              County Cargo provides international cargo services connecting Nigeria, the United Kingdom and the United States.
            </p>

            <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
              Our service is built for customers who need a straightforward way to move personal and commercial cargo internationally without unnecessary complications.
            </p>

            <div className="mt-6">
              <SocialShare
                title="International Cargo Services Between Nigeria, UK and USA"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/complete-guide-nigeria-to-uk-freight.jpg"
              alt="International cargo freight logistics between Nigeria, UK, and USA"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Operations in Key Transatlantic Hubs
              </h2>
              <p>
                From our operations in <strong>Lagos, Abuja, Liverpool and Texas</strong>, County Cargo coordinates cargo movement between our key markets.
              </p>
              <p>
                Customers can ship:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 not-prose my-4 text-sm text-gray-700">
                <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Clothing and personal effects</span>
                </li>
                <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Household goods &amp; furnishings</span>
                </li>
                <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Business merchandise &amp; trade inventory</span>
                </li>
                <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Approved dried food products</span>
                </li>
                <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Time-critical documents</span>
                </li>
                <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Other permitted international cargo</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Service Tiers and Delivery Timelines
              </h2>
              <p>
                Our standard UK and US services generally operate within <strong>5–10 working days</strong>, while selected express services operate within approximately <strong>3–5 working days</strong>, subject to customs, airline and operational conditions.
              </p>
              <p>
                For customers shipping larger quantities, County Cargo also provides sea cargo services on supported UK–Nigeria routes.
              </p>
              <p>
                Whether you are sending one shipment or moving goods regularly for your business, County Cargo provides a practical international cargo solution.
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
                    Your World. Delivered.
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Experience seamless international cargo handling with County Cargo across Nigeria, the UK, and the USA.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-blue-200">
                    <span>Website: <strong className="text-white">www.countycargo.com</strong></span>
                    <span>Telephone: <strong className="text-white">+44 7405 556668</strong></span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-to-nigeria">
                      Calculate Shipping
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
