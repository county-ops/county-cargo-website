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
  title: 'Nigeria to USA Doorstep Delivery: Lagos & Abuja to US Addresses | County Cargo',
  description:
    'Nigeria to USA doorstep shipping with County Cargo. Value export from ₦15,500/kg (10kg min), Express from ₦55,000/kg (1kg min), delivering to Texas, New York, Maryland, Georgia, and across all 50 states based on ZIP code.',
  keywords:
    'Nigeria to USA doorstep delivery, Lagos to USA door delivery, Abuja to America shipping, send parcel to USA from Nigeria, County Cargo USA delivery',
  alternates: {
    canonical: 'https://countycargo.com/blog/nigeria-to-usa-doorstep-delivery',
  },
  openGraph: {
    title: 'Nigeria to USA Doorstep Delivery: Lagos & Abuja to US Addresses | County Cargo',
    description:
      'Seamless door-to-door cargo delivery from Nigeria to US addresses. Clear rates with ZIP code-based final delivery quoting across all 50 states.',
    url: 'https://countycargo.com/blog/nigeria-to-usa-doorstep-delivery',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo USA Route Logistics Desk'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/nigeria-to-usa-freight-solutions.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo freight pallets departing Nigeria for USA doorstep delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nigeria to USA Doorstep Delivery: Lagos & Abuja to US Addresses',
    description:
      'Ship from Lagos and Abuja directly to US homes and businesses. Transparent ZIP code pricing across Texas, New York, Maryland, Georgia, and California.',
    images: ['https://countycargo.com/images/blog/nigeria-to-usa-freight-solutions.jpg'],
  },
};

const faqs = [
  {
    question: 'Which US states are covered by County Cargo doorstep delivery?',
    answer:
      'We deliver nationwide across all 50 US states, including popular destinations such as Texas (Houston, Dallas, Austin), New York, Maryland, Georgia (Atlanta), California, Florida, and Illinois.',
  },
  {
    question: 'What are the base freight rates from Nigeria to the USA?',
    answer:
      'Our Value export service starts from ₦15,500 per kg with a 10kg minimum chargeable weight. For urgent consignments, County Cargo Express starts from ₦55,000 per kg with a 1kg minimum.',
  },
  {
    question: 'How is the final US doorstep delivery fee calculated?',
    answer:
      'To obtain an accurate doorstep quotation, provide County Cargo with the shipment weight, parcel dimensions, and your destination US ZIP code. Our logistics desk calculates the final-mile US courier charge accordingly.',
  },
];

export default function NigeriaToUsaDoorstepDeliveryPage() {
  const articleUrl =
    'https://countycargo.com/blog/nigeria-to-usa-doorstep-delivery';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Nigeria to USA Doorstep Delivery', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Nigeria to USA Doorstep Delivery: Lagos & Abuja to US Addresses with County Cargo',
        description:
          'County Cargo provides international cargo services for customers shipping from Lagos and Abuja to addresses across the United States.',
        image: 'https://countycargo.com/images/blog/nigeria-to-usa-freight-solutions.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo USA Route Logistics Desk',
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
              { label: 'Nigeria to USA Doorstep Delivery' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                USA Doorstep Delivery Series
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Nigeria to USA Doorstep Delivery with County Cargo
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              County Cargo provides international cargo services for customers shipping from Lagos and Abuja to the United States.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Nigeria to USA Doorstep Delivery with County Cargo"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/nigeria-to-usa-freight-solutions.jpg"
              alt="Air freight pallets staged for transatlantic delivery to US residences and businesses"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Service Tiers from Lagos &amp; Abuja
              </h2>
              <p>
                Our value Nigeria-to-USA export service starts from:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose my-4">
                <p className="text-2xl font-black text-gray-900">
                  ₦15,500 <span className="text-sm font-normal text-gray-600">/ kg</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">Minimum shipment: <strong>10kg</strong></p>
              </div>

              <p>
                For smaller or urgent shipments, our express international service starts from:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose my-4">
                <p className="text-2xl font-black text-indigo-900">
                  ₦55,000 <span className="text-sm font-normal text-gray-600">/ kg</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">Minimum express shipment: <strong>1kg</strong></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                ZIP Code-Based US Final Delivery Quoting
              </h2>
              <p>
                Customers can also request final delivery to a US address where available.
              </p>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl not-prose text-sm text-blue-950 space-y-2">
                <p className="font-bold text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Destination ZIP Code Calculation
                </p>
                <p>
                  To obtain an accurate doorstep quotation, provide County Cargo with the shipment weight, dimensions and destination ZIP code.
                </p>
                <p>
                  Whether your shipment is going to <strong>Texas, New York, Maryland, Georgia, California</strong> or another supported US destination, our team can calculate the appropriate final delivery option.
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
                    Ship from Nigeria to USA Doorstep
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Get an instant quote online or chat with our US route specialists.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/shipping-from-nigeria-to-usa">
                      Calculate USA Shipping
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
