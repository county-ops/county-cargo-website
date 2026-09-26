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
  title: 'Nigeria to Canada Doorstep Delivery: Lagos & Abuja to Canadian Addresses | County Cargo',
  description:
    'Ship from Nigeria to Canada with County Cargo. Express international shipping starting from ₦55,000/kg (1kg min) with 3–5 working day transit and Canadian postal code-based doorstep delivery across Ontario, Alberta, and beyond.',
  keywords:
    'Nigeria to Canada doorstep delivery, Lagos to Canada courier, Abuja to Canada shipping, send parcel to Toronto from Lagos, County Cargo Canada doorstep',
  alternates: {
    canonical: 'https://countycargo.com/blog/nigeria-to-canada-doorstep-delivery',
  },
  openGraph: {
    title: 'Nigeria to Canada Doorstep Delivery: Lagos & Abuja to Canadian Addresses | County Cargo',
    description:
      'Seamless express parcel delivery from Lagos and Abuja directly to Canadian residential and business addresses. Clear rates with postal code-based final delivery.',
    url: 'https://countycargo.com/blog/nigeria-to-canada-doorstep-delivery',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo Canadian Operations Desk'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-canada-air-cargo-county.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo air cargo packages arriving in Canada from Nigeria for doorstep distribution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nigeria to Canada Doorstep Delivery: Lagos & Abuja to Canadian Addresses',
    description:
      'Send goods from Lagos and Abuja straight to Canadian doorsteps in Toronto, Calgary, and Vancouver. Express 3–5 day delivery with transparent postal code pricing.',
    images: ['https://countycargo.com/images/blog/shipping-from-nigeria-to-canada-air-cargo-county.jpg'],
  },
};

const faqs = [
  {
    question: 'How do I send a parcel from Nigeria to Canada with doorstep delivery?',
    answer:
      'Package your items securely and declare all contents. Drop off at our Lagos or Abuja hub (or request local pickup). We fly your parcel express to Canada, manage customs clearance, and dispatch it for direct delivery to your recipient’s Canadian address.',
  },
  {
    question: 'What is the rate for Nigeria to Canada express shipping?',
    answer:
      'Our international express rate starts from ₦55,000 per kg with a 1kg minimum shipment. For shipments originating in Abuja, applicable Abuja-origin handling costs are incorporated into the final quote.',
  },
  {
    question: 'How is the final Canadian doorstep charge determined?',
    answer:
      'Simply provide the shipment weight, parcel dimensions, and the destination Canadian postal code (e.g., M5V for Toronto, T2P for Calgary) to receive an accurate, all-inclusive quotation.',
  },
];

export default function NigeriaToCanadaDoorstepDeliveryPage() {
  const articleUrl =
    'https://countycargo.com/blog/nigeria-to-canada-doorstep-delivery';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Nigeria to Canada Doorstep Delivery', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Nigeria to Canada Doorstep Delivery: Ship from Nigeria to Canada with County Cargo',
        description:
          'County Cargo provides international express shipping from Nigeria to Canada for shipments starting from 1kg with Canadian postal code-based doorstep delivery.',
        image: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-canada-air-cargo-county.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Canadian Operations Desk',
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
              { label: 'Nigeria to Canada Doorstep Delivery' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Canada Doorstep Delivery Series
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Ship from Nigeria to Canada with County Cargo: Doorstep Delivery
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Need to send a parcel or cargo from Lagos or Abuja to Canada?
            </p>

            <div className="mt-6">
              <SocialShare
                title="Ship from Nigeria to Canada with County Cargo: Doorstep Delivery"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/shipping-from-nigeria-to-canada-air-cargo-county.jpg"
              alt="Air freight parcels loaded in Nigeria for Canadian doorstep delivery"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Express Shipping from 1kg
              </h2>
              <p>
                County Cargo provides international express shipping from Nigeria to Canada, with services available for shipments starting from 1kg.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose my-4">
                <p className="text-2xl font-black text-indigo-900">
                  ₦55,000 <span className="text-sm font-normal text-gray-600">/ kg</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">Starting from <strong>1kg</strong></p>
              </div>
              <p>
                Abuja-origin costs are incorporated into the final Abuja quotation where applicable.
              </p>
              <p>
                Express international transportation normally takes approximately <strong>3–5 working days</strong>, subject to customs clearance, airline schedules and operational conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Doorstep Delivery Across Canada
              </h2>
              <p>
                Customers can also request doorstep delivery to supported Canadian destinations.
              </p>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl not-prose text-sm text-blue-950 space-y-3">
                <p className="font-bold text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Canadian Postal Code Pricing
                </p>
                <p>
                  Simply provide the shipment weight, dimensions and Canadian postal code to receive the appropriate quotation.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-white px-3 py-1 rounded-md border border-blue-100 font-semibold text-xs text-blue-900">Lagos &rarr; Canada</span>
                  <span className="bg-white px-3 py-1 rounded-md border border-blue-100 font-semibold text-xs text-blue-900">Abuja &rarr; Canada</span>
                  <span className="bg-primary text-white px-3 py-1 rounded-md font-semibold text-xs">International Shipping + Doorstep Delivery</span>
                </div>
                <p className="pt-2 font-medium">
                  County Cargo makes international shipping easier.
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
                    Start Your Canada Consignment
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Drop off in Lagos or Abuja, or request pickup. Fast delivery to Toronto, Montreal, Calgary, and across Canada.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-nigeria-to-canada">
                      Calculate Canada Rate
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
