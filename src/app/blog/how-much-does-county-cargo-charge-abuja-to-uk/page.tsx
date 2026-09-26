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
  title: 'How Much Does County Cargo Charge from Abuja to the UK? Rates & Guide',
  description:
    'Complete guide on shipping costs from Abuja to the UK. Value export from ₦10,500/kg (10kg min), Express courier from ₦55,000/kg (3–5 days), and UK postcode-based doorstep delivery.',
  keywords:
    'shipping cost Abuja to UK, how much to ship from Abuja to UK, cargo price Abuja to London, Abuja to UK air freight rate, County Cargo Abuja UK pricing',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-much-does-county-cargo-charge-abuja-to-uk',
  },
  openGraph: {
    title: 'How Much Does County Cargo Charge from Abuja to the UK? Rates & Guide',
    description:
      'Clear price breakdown for shipping from Abuja to the UK. Value air cargo, 3–5 day express courier, and UK doorstep delivery based on postcode.',
    url: 'https://countycargo.com/blog/how-much-does-county-cargo-charge-abuja-to-uk',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo Abuja Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-abuja-to-london-documents.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo package dispatch for Abuja to London and UK air freight',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Does County Cargo Charge from Abuja to the UK?',
    description:
      'Find out exact export costs from Abuja to the UK. Value rates from ₦10,500/kg, Express from ₦55,000/kg, plus UK postcode-calculated doorstep delivery.',
    images: ['https://countycargo.com/images/blog/county-cargo-abuja-to-london-documents.jpg'],
  },
};

const faqs = [
  {
    question: 'How much does it cost to ship from Abuja to the UK?',
    answer:
      'Our Nigeria-to-UK value export rate starts from ₦10,500 per kilogram with a 10kg minimum shipment. For Abuja-origin shipments, the Abuja collection/handling component is incorporated into the final quote. For urgent parcels, Express starts from ₦55,000/kg (from 1kg).',
  },
  {
    question: 'How long does shipment take from Abuja to the UK?',
    answer:
      'Express shipments normally take approximately 3–5 working days, subject to customs, airline schedules, and operational conditions. Value air cargo takes 5–10 working days.',
  },
  {
    question: 'Can County Cargo deliver directly to a UK residential or commercial address?',
    answer:
      'Yes. County Cargo can arrange doorstep delivery to London, Liverpool, Manchester, Birmingham, and addresses nationwide across the UK. Your doorstep quotation depends on shipment weight, dimensions, and the destination UK postcode.',
  },
];

export default function AbujaToUkPricingPage() {
  const articleUrl =
    'https://countycargo.com/blog/how-much-does-county-cargo-charge-abuja-to-uk';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'How Much Does County Cargo Charge from Abuja to the UK?', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'How Much Does County Cargo Charge from Abuja to the UK?',
        description:
          'Comprehensive breakdown of shipping costs, air freight rates, and doorstep delivery options from Abuja to the UK.',
        image: 'https://countycargo.com/images/blog/county-cargo-abuja-to-london-documents.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Abuja Logistics Team',
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
              { label: 'Abuja to UK Shipping Price' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Abuja Pricing Guide &bull; UK Routes
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              How Much Does County Cargo Charge from Abuja to the UK?
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              One of the most common questions customers ask is: <em>How much does it cost to ship from Abuja to the UK?</em>
            </p>

            <div className="mt-6">
              <SocialShare
                title="How Much Does County Cargo Charge from Abuja to the UK?"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-abuja-to-london-documents.jpg"
              alt="County Cargo packages staged for air shipment from Abuja to the UK"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Abuja to UK Service Options
              </h2>
              <p>
                County Cargo provides both value and express export services from Abuja to the United Kingdom.
              </p>
              <p>
                Our Nigeria-to-UK value export rate starts from <strong>₦10,500 per kilogram</strong>, with a 10kg minimum shipment.
              </p>
              <p>
                For Abuja-origin shipments, the Abuja collection/handling component is incorporated into the final price quoted to the customer.
              </p>
              <p>
                For customers who need their shipment urgently, <strong>County Cargo Express</strong> is available from 1kg, with express rates starting from <strong>₦55,000/kg</strong> before the applicable Abuja-origin component.
              </p>
              <p>
                Express shipments normally take approximately <strong>3–5 working days</strong>, subject to customs, airline and operational conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Abuja to UK Doorstep Delivery
              </h2>
              <p>
                County Cargo can also arrange delivery to a UK address where available.
              </p>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl not-prose text-sm text-blue-950 space-y-2">
                <p className="font-bold text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Postcode-Based Final-Mile Quotation
                </p>
                <p>
                  Your doorstep delivery quotation depends on factors including the shipment weight, dimensions and UK delivery postcode.
                </p>
                <p>
                  This means customers in London, Liverpool, Manchester, Birmingham and other UK locations can request a complete Abuja-to-UK delivery quotation without hidden fees.
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
                    Get an Abuja to UK Quote
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Drop off at our Wuye Abuja hub or request citywide pickup across the FCT.
                  </p>
                  <p className="text-xs text-blue-200 mt-2">
                    Abuja Hub: Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-nigeria-to-uk">
                      Calculate Rate
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
