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
  title: 'Lagos to UK Doorstep Delivery: Door-to-Door Shipping | County Cargo',
  description:
    'Lagos to UK door-to-door shipping with County Cargo. Value air cargo from ₦10,500/kg (10kg min), Express from ₦55,000/kg (1kg min), and doorstep delivery across London, Manchester, and the UK based on postcode.',
  keywords:
    'Lagos to UK doorstep delivery, door to door cargo Lagos to UK, Lagos to London door delivery, send goods to UK doorstep from Lagos, County Cargo UK delivery',
  alternates: {
    canonical: 'https://countycargo.com/blog/lagos-to-uk-doorstep-delivery',
  },
  openGraph: {
    title: 'Lagos to UK Doorstep Delivery: Door-to-Door Shipping | County Cargo',
    description:
      'Seamless door-to-door cargo shipping from Lagos to UK residential and business addresses. Clear rates with postcode-based final-mile delivery.',
    url: 'https://countycargo.com/blog/lagos-to-uk-doorstep-delivery',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo Lagos Export Division'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-lagos-to-uk-groupage.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo cargo boxes packed in Lagos for direct UK doorstep delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lagos to UK Doorstep Delivery: Door-to-Door Shipping',
    description:
      'Ship from Lagos directly to your UK recipient’s doorstep. Value and Express shipping with transparent postcode-based courier rates.',
    images: ['https://countycargo.com/images/blog/county-cargo-lagos-to-uk-groupage.jpg'],
  },
};

const faqs = [
  {
    question: 'How does County Cargo’s Lagos to UK doorstep delivery work?',
    answer:
      'You drop off your parcel at our Lagos hub (or request Lagos doorstep pickup). We handle international air freight and customs clearance at the UK border. Once cleared, our courier partners deliver directly to the recipient’s doorstep in London, Manchester, Birmingham, Liverpool, or any UK postcode.',
  },
  {
    question: 'What are the base shipping rates from Lagos to the UK?',
    answer:
      'Our Nigeria-to-UK value cargo rate starts from ₦10,500/kg with a 10kg minimum, while our express service starts from ₦55,000/kg with a 1kg minimum. The destination delivery fee is calculated additionally based on the recipient’s postcode.',
  },
  {
    question: 'What information do I need to get a doorstep quotation?',
    answer:
      'Customers simply provide the package weight, dimensions, and the complete destination UK postcode when requesting their quotation.',
  },
];

export default function LagosToUkDoorstepDeliveryPage() {
  const articleUrl =
    'https://countycargo.com/blog/lagos-to-uk-doorstep-delivery';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Lagos to UK Doorstep Delivery', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Lagos to UK Doorstep Delivery: Lagos to UK Door-to-Door Shipping with County Cargo',
        description:
          'Sending goods from Lagos to the UK does not have to end at the destination warehouse. County Cargo coordinates complete door-to-door delivery.',
        image: 'https://countycargo.com/images/blog/county-cargo-lagos-to-uk-groupage.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Lagos Export Division',
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
              { label: 'Lagos to UK Doorstep Delivery' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Doorstep Delivery Series &bull; Lagos
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Lagos to UK Doorstep Delivery: Door-to-Door Shipping with County Cargo
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Sending goods from Lagos to the United Kingdom does not have to end when your shipment arrives at the destination warehouse.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Lagos to UK Doorstep Delivery with County Cargo"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-lagos-to-uk-groupage.jpg"
              alt="County Cargo packages staged for London and UK doorstep distribution"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Full-Journey Logistics from Lagos to UK Doorsteps
              </h2>
              <p>
                County Cargo customers can request UK doorstep delivery for eligible Lagos export shipments.
              </p>
              <p>
                Our Nigeria-to-UK value cargo rate starts from <strong>₦10,500/kg</strong> with a 10kg minimum, while our express service starts from <strong>₦55,000/kg</strong> with a 1kg minimum.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Postcode Quoting Procedure
              </h2>
              <p>
                Customers requiring doorstep delivery simply provide their complete UK postcode when requesting their quotation.
              </p>
              <p>
                County Cargo can then calculate the international transportation and applicable final delivery charge accurately.
              </p>
              <p>
                From Lagos to <strong>London, Manchester, Liverpool, Birmingham</strong> and other supported UK destinations, we can help coordinate the entire journey.
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
                    Request Lagos to UK Doorstep Delivery
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Drop off at Ladipo-Oshodi or request pickup across Lagos mainland and island.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-nigeria-to-uk">
                      Calculate Doorstep Rate
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
