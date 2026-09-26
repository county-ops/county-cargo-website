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
  title: 'Shipping from Abuja to Canada: County Cargo Express Price & Guide',
  description:
    'Shipping from Abuja to Canada with County Cargo. Express international export starting from ₦55,000/kg (1kg min), 3–5 working day transit, and Canadian postal code-based doorstep delivery.',
  keywords:
    'shipping from Abuja to Canada, Abuja to Canada courier price, Abuja to Toronto shipping, Abuja to Calgary freight, County Cargo Canada export price',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-abuja-to-canada-price',
  },
  openGraph: {
    title: 'Shipping from Abuja to Canada: County Cargo Express Price & Guide',
    description:
      'Express export from Abuja to Canada starting from ₦55,000/kg. 3–5 working days delivery with Canadian postal code-based doorstep delivery.',
    url: 'https://countycargo.com/blog/shipping-from-abuja-to-canada-price',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo Canadian Route Specialist'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-abuja-to-canada-collection.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo package collection in Abuja for express air export to Canada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping from Abuja to Canada – County Cargo Price',
    description:
      'Find out exact costs to send parcels from Abuja to Canada. Express from ₦55,000/kg, 3–5 days transit, and postal code-based doorstep delivery.',
    images: ['https://countycargo.com/images/blog/county-cargo-abuja-to-canada-collection.jpg'],
  },
};

const faqs = [
  {
    question: 'How much does it cost to ship from Abuja to Canada?',
    answer:
      'County Cargo’s international express service from Nigeria to Canada starts from ₦55,000 per kg, with a 1kg minimum shipment. Applicable Abuja-origin logistics and handling charges are incorporated into the final quote.',
  },
  {
    question: 'How long does express delivery take to Canada?',
    answer:
      'The express service normally operates within approximately 3–5 working days, subject to customs clearance, airline schedules, and destination processing across Canadian provinces.',
  },
  {
    question: 'How is Canadian doorstep delivery calculated?',
    answer:
      'Doorstep delivery is calculated based on the destination Canadian postal code (e.g. Toronto M5V, Calgary T2P, Ottawa K1P), together with shipment weight and dimensions.',
  },
];

export default function AbujaToCanadaPricePage() {
  const articleUrl =
    'https://countycargo.com/blog/shipping-from-abuja-to-canada-price';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Shipping from Abuja to Canada Price', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Shipping from Abuja to Canada – County Cargo Price',
        description:
          'Pricing, transit times, and Canadian postal code doorstep delivery options for sending parcels from Abuja to Canada.',
        image: 'https://countycargo.com/images/blog/county-cargo-abuja-to-canada-collection.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Canadian Route Specialist',
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
              { label: 'Abuja to Canada Shipping Price' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Canada Express Route
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Shipping from Abuja to Canada – County Cargo Price
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              County Cargo provides express export options for customers sending eligible shipments from Nigeria to Canada.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Shipping from Abuja to Canada – County Cargo Price"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-abuja-to-canada-collection.jpg"
              alt="Parcel collection in Abuja for express dispatch to Canadian cities"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Express Air Export Rates &amp; Timelines
              </h2>
              <p>
                Our international express service starts from <strong>₦55,000/kg</strong>, with a 1kg minimum. Abuja-origin charges are incorporated into the final quotation where applicable.
              </p>
              <p>
                The express service normally operates within approximately <strong>3–5 working days</strong>, subject to customs clearance, airline schedules and destination processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Abuja to Canada Doorstep Delivery
              </h2>
              <p>
                Customers requiring delivery directly to a Canadian address can request a complete quotation based on their destination.
              </p>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl not-prose text-sm text-blue-950 space-y-3">
                <p className="font-bold text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> How to Get Your Accurate Doorstep Quote:
                </p>
                <p>
                  The final doorstep price will depend on the shipment’s weight, dimensions and Canadian postal code.
                </p>
                <div className="bg-white p-3 rounded-lg border border-blue-100 font-mono text-xs text-blue-900">
                  Shipment weight + dimensions + Canadian postal code
                </div>
                <p>
                  Contact County Cargo with these details and our team can calculate the appropriate international shipping and final-mile Canadian delivery cost.
                </p>
              </div>
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
                    Ship from Abuja to Canada Today
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Drop off at our Abuja hub in Wuye Market or arrange doorstep pickup.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-nigeria-to-canada">
                      View Canada Services
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
