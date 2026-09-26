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
  title: 'Abuja to UK Doorstep Delivery: Direct to Your UK Address | County Cargo',
  description:
    'Ship from Abuja directly to any UK address with County Cargo. Combining Nigerian export handling with UK final-mile courier delivery to London, Manchester, Birmingham, and Liverpool based on postcode.',
  keywords:
    'Abuja to UK doorstep delivery, door to door cargo Abuja to UK, ship to UK address from Abuja, Abuja to London doorstep courier, County Cargo doorstep UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/abuja-to-uk-doorstep-delivery',
  },
  openGraph: {
    title: 'Abuja to UK Doorstep Delivery: Direct to Your UK Address | County Cargo',
    description:
      'Ship from Abuja directly to a UK address with County Cargo. Seamless international express transit in 3–5 working days with postcode-based doorstep delivery.',
    url: 'https://countycargo.com/blog/abuja-to-uk-doorstep-delivery',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo Abuja Logistics Operations'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-abuja-to-uk-student.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo parcel delivery from Abuja directly to a UK residence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abuja to UK Doorstep Delivery: Direct to Your UK Address',
    description:
      'Send goods from Abuja straight to UK doorsteps in London, Manchester, and Birmingham. Express transit with accurate postcode pricing.',
    images: ['https://countycargo.com/images/blog/county-cargo-abuja-to-uk-student.jpg'],
  },
};

const faqs = [
  {
    question: 'Which UK cities are covered by Abuja doorstep delivery?',
    answer:
      'County Cargo delivers to addresses across England, Scotland, Wales, and Northern Ireland, including London, Liverpool, Manchester, Birmingham, Leeds, Glasgow, and all UK postcode zones.',
  },
  {
    question: 'How long does the Abuja to UK doorstep delivery process take?',
    answer:
      'Our express international air service normally takes approximately 3–5 working days to clear customs upon arrival in the UK. Final-mile courier delivery to your recipient’s door adds standard local transit time depending on the destination postcode.',
  },
  {
    question: 'How is the final doorstep price calculated?',
    answer:
      'The final quotation depends on the total shipment weight, parcel dimensions, and the recipient’s specific UK delivery postcode. Provide these details to County Cargo to receive an all-inclusive quotation.',
  },
];

export default function AbujaToUkDoorstepDeliveryPage() {
  const articleUrl =
    'https://countycargo.com/blog/abuja-to-uk-doorstep-delivery';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Abuja to UK Doorstep Delivery', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Abuja to UK Doorstep Delivery: Ship from Abuja Directly to a UK Address',
        description:
          'County Cargo makes international shipping from Abuja easier by combining Nigerian export handling with UK destination delivery.',
        image: 'https://countycargo.com/images/blog/county-cargo-abuja-to-uk-student.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Abuja Logistics Operations',
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
              { label: 'Abuja to UK Doorstep Delivery' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Doorstep Delivery Series &bull; Abuja
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Abuja to UK Doorstep Delivery: Ship Directly to a UK Address
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              County Cargo makes international shipping from Abuja easier by combining Nigerian export handling with UK destination delivery.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Abuja to UK Doorstep Delivery: Direct to Your UK Address"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-abuja-to-uk-student.jpg"
              alt="Parcel shipped from Abuja delivered directly to a UK doorstep"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                End-to-End Convenience from Nigeria to the UK
              </h2>
              <p>
                Customers can send eligible shipments from Abuja to addresses across the United Kingdom, including <strong>London, Liverpool, Manchester, Birmingham</strong> and other supported destinations.
              </p>
              <p>
                Instead of worrying about arranging another courier after your cargo reaches the UK, customers can request doorstep delivery as part of their shipment.
              </p>
              <p>
                Our express international service normally takes approximately <strong>3–5 working days</strong>, subject to customs and operational conditions. Doorstep delivery time is additional where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Postcode-Based Final-Mile Pricing
              </h2>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl not-prose text-sm text-blue-950 space-y-3">
                <p className="font-bold text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Transparent Pricing Based on Postcode
                </p>
                <p>
                  The final price depends on the shipment weight, dimensions and UK destination postcode.
                </p>
                <p className="text-base font-extrabold text-primary">
                  Abuja &rarr; UK &rarr; Your Door.
                </p>
                <p>
                  That is international shipping made simpler.
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
                    Book Abuja Doorstep Shipping
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Provide your parcel weight, dimensions, and UK delivery postcode for an instant door-to-door rate.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-nigeria-to-uk">
                      Book Now
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
