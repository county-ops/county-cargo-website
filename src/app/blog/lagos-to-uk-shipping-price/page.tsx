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
  title: 'Lagos to UK Shipping Price: Value & Express Rates | County Cargo',
  description:
    'Current shipping prices from Lagos to the UK with County Cargo. Value air export starting from ₦10,500/kg (10kg min), Express courier from ₦55,000/kg (3–5 days), and UK postcode-calculated doorstep delivery.',
  keywords:
    'Lagos to UK shipping price, how much to ship from Lagos to UK, Lagos to London cargo cost per kg, cheap shipping Lagos to UK, County Cargo Lagos rates',
  alternates: {
    canonical: 'https://countycargo.com/blog/lagos-to-uk-shipping-price',
  },
  openGraph: {
    title: 'Lagos to UK Shipping Price: Value & Express Rates | County Cargo',
    description:
      'Clear pricing from Lagos to the UK. ₦10,500/kg Value air cargo, ₦55,000/kg Express courier, and direct London doorstep delivery based on postcode.',
    url: 'https://countycargo.com/blog/lagos-to-uk-shipping-price',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo Lagos Operations Desk'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-lagos-to-london-collection.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo parcel consolidation in Lagos for air dispatch to London and UK cities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lagos to UK Shipping Price: How Much Does County Cargo Charge?',
    description:
      'Official pricing for Lagos to UK cargo. Value shipping from ₦10,500/kg, Express from ₦55,000/kg, and London doorstep delivery.',
    images: ['https://countycargo.com/images/blog/county-cargo-lagos-to-london-collection.jpg'],
  },
};

const faqs = [
  {
    question: 'How much does it cost to ship from Lagos to the UK?',
    answer:
      'Shipping from Lagos to the UK starts from ₦10,500 per kilogram on our Value export service (10kg minimum chargeable weight). For faster delivery, County Cargo Express starts from ₦55,000 per kilogram with a 1kg minimum.',
  },
  {
    question: 'How long does shipment take from Lagos to the UK?',
    answer:
      'Express shipments normally operate within approximately 3–5 working days, while Value air cargo delivers within 5–10 working days, subject to airline operations and customs clearance.',
  },
  {
    question: 'Can I have my shipment delivered to my doorstep in London or other UK cities?',
    answer:
      'Yes. Customers can request delivery beyond the UK arrival point directly to a London or UK regional address. The final doorstep delivery charge depends on the parcel’s size, weight, and delivery postcode.',
  },
];

export default function LagosToUkPricePage() {
  const articleUrl =
    'https://countycargo.com/blog/lagos-to-uk-shipping-price';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Lagos to UK Shipping Price', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Lagos to UK Shipping Price – How Much Does County Cargo Charge?',
        description:
          'Clear pricing breakdown for sending parcels, commercial goods, and personal items from Lagos to the UK.',
        image: 'https://countycargo.com/images/blog/county-cargo-lagos-to-london-collection.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Lagos Operations Desk',
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
              { label: 'Lagos to UK Shipping Price' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Lagos to UK Official Rates
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Lagos to UK Shipping Price – How Much Does County Cargo Charge?
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Shipping from Lagos to the United Kingdom with County Cargo starts from:
            </p>

            <div className="my-4 p-5 bg-blue-50/80 border border-blue-200 rounded-xl inline-block">
              <p className="text-3xl font-extrabold text-primary">₦10,500 <span className="text-lg font-normal text-gray-600">per kilogram</span></p>
              <p className="text-xs text-gray-500 mt-1">Value export service (10kg minimum)</p>
            </div>

            <div className="mt-6">
              <SocialShare
                title="Lagos to UK Shipping Price – How Much Does County Cargo Charge?"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-lagos-to-london-collection.jpg"
              alt="County Cargo packages packed in Lagos for London delivery"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Service Tiers: Value vs. Express
              </h2>
              <p>
                Our value export service has a 10kg minimum, making it ideal for larger personal consignments, business stock, and foodstuffs.
              </p>
              <p>
                For customers who need faster transportation, <strong>County Cargo Express</strong> starts from:
              </p>
              <p className="text-2xl font-bold text-indigo-900">
                ₦55,000 per kilogram
              </p>
              <p>
                Express shipments can start from 1kg and normally operate within approximately <strong>3–5 working days</strong>, subject to airline operations and customs clearance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Lagos to London Doorstep Delivery
              </h2>
              <p>
                Customers can also request delivery beyond the UK arrival point to a London address.
              </p>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl not-prose text-sm text-blue-950 space-y-2">
                <p className="font-bold text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Postcode-Based Final-Mile Courier Quote
                </p>
                <p>
                  The final doorstep delivery charge depends on the parcel’s size, weight and delivery postcode.
                </p>
                <p>
                  This allows customers to request a complete <strong>Lagos &rarr; UK &rarr; doorstep solution</strong> rather than arranging the final UK journey separately.
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
                    Drop Off in Lagos Today
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Lagos Hub: Suite F8, Magnet Shopping Plaza, 525 Agege Motor Road, Ladipo-Oshodi. Doorstep Lagos pickup is also available.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-nigeria-to-uk">
                      Calculate Shipping Cost
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
