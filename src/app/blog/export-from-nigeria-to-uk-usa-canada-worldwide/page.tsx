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
  Globe,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Export from Nigeria to the UK, USA, Canada & Worldwide | County Cargo',
  description:
    'Export goods from Nigeria to the UK, USA, Canada, and worldwide with County Cargo. Value air cargo from ₦10,500/kg (UK) & ₦15,500/kg (USA), Express from ₦55,000/kg, and postal code-based doorstep delivery.',
  keywords:
    'export from Nigeria, export from Nigeria to UK, export from Nigeria to USA, export to Canada from Nigeria, Nigeria export price per kg, air cargo export Nigeria, commercial export Nigeria, County Cargo export',
  alternates: {
    canonical: 'https://countycargo.com/blog/export-from-nigeria-to-uk-usa-canada-worldwide',
  },
  openGraph: {
    title: 'Export from Nigeria to the UK, USA, Canada & Worldwide | County Cargo',
    description:
      'Reliable international export services from Lagos and Abuja to the UK, USA, Canada, and worldwide. Value & Express air cargo with optional destination doorstep delivery.',
    url: 'https://countycargo.com/blog/export-from-nigeria-to-uk-usa-canada-worldwide',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-26T08:00:00.000Z',
    modifiedTime: '2026-09-26T08:00:00.000Z',
    authors: ['County Cargo Export Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/how-to-export-goods-nigeria-to-uk-commercial-guide.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo export air freight staging in Nigeria for UK, USA, and Canada dispatch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Export from Nigeria to the UK, USA, Canada & Worldwide | County Cargo',
    description:
      'Export from Nigeria with County Cargo. Value air cargo from ₦10,500/kg, Express courier from 1kg, and postcode/ZIP code-based doorstep delivery overseas.',
    images: ['https://countycargo.com/images/blog/how-to-export-goods-nigeria-to-uk-commercial-guide.jpg'],
  },
};

const faqs = [
  {
    question: 'What are County Cargo’s current export rates from Nigeria?',
    answer:
      'Value air cargo rates start from ₦10,500 per kg for the UK (minimum 10kg) and ₦15,500 per kg for the USA (minimum 10kg). For urgent shipments across supported international destinations, County Cargo Express is available from 1kg starting from ₦55,000 per kg. Shipments originating from Abuja incorporate an applicable Abuja handling and transportation component.',
  },
  {
    question: 'How long does export delivery take from Nigeria?',
    answer:
      'Express delivery normally takes approximately 3–5 working days, while Value air cargo operates within 5–10 working days, subject to airline operations, customs clearance, and destination procedures.',
  },
  {
    question: 'How is doorstep delivery priced in destination countries?',
    answer:
      'For shipments requiring delivery beyond the destination airport or port warehouse, County Cargo calculates final-mile doorstep delivery charges based on the destination postcode or ZIP code, parcel weight, and physical dimensions. Contact our team with your destination postal code for an all-inclusive quotation.',
  },
  {
    question: 'What goods can I export from Nigeria?',
    answer:
      'Permitted exports include personal belongings, fashion items, clothing, commercial goods, business supplies, documents, and approved, fully dehydrated, shelf-stable food products. Perishables, hazardous items, and goods requiring specialized export licenses must be verified with our compliance team prior to booking.',
  },
];

export default function ExportFromNigeriaWorldwidePage() {
  const articleUrl =
    'https://countycargo.com/blog/export-from-nigeria-to-uk-usa-canada-worldwide';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://countycargo.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://countycargo.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Export from Nigeria to UK, USA, Canada & Worldwide', item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Export from Nigeria to the UK, USA, Canada and Worldwide with County Cargo',
        description:
          'Exporting goods from Nigeria should not be complicated. County Cargo provides international export services connecting Lagos and Abuja with the UK, USA, Canada, and global destinations.',
        image: 'https://countycargo.com/images/blog/how-to-export-goods-nigeria-to-uk-commercial-guide.jpg',
        datePublished: '2026-09-26T08:00:00.000Z',
        dateModified: '2026-09-26T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Export Logistics Team',
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
              { label: 'Export from Nigeria Worldwide' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Export Logistics &bull; Global Routes
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Lagos &amp; Abuja Hubs
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Export from Nigeria to the UK, USA, Canada and Worldwide with County Cargo
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Exporting goods from Nigeria should not be complicated.
            </p>

            <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
              County Cargo provides international export services designed for individuals, families, online sellers and businesses looking for a reliable way to move goods from Nigeria to destinations overseas.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Export from Nigeria to the UK, USA, Canada and Worldwide with County Cargo"
                url={articleUrl}
              />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/how-to-export-goods-nigeria-to-uk-commercial-guide.jpg"
              alt="Export goods from Nigeria to the UK, USA, and Canada"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Quick Snapshot */}
          <section className="mb-12 bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/50 border border-blue-200/70 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Export Rates Snapshot from Nigeria
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Nigeria &rarr; UK</p>
                <p className="text-xl font-extrabold text-primary mt-1">₦10,500/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 10kg (Value Air)</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Nigeria &rarr; USA</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">₦15,500/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Min 10kg (Value Air)</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Express Cargo</p>
                <p className="text-xl font-extrabold text-indigo-700 mt-1">From ₦55k/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">From 1kg (3–5 Days)</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Doorstep Delivery</p>
                <p className="text-xl font-extrabold text-amber-700 mt-1">By Postcode</p>
                <p className="text-xs text-gray-500 mt-0.5">UK, USA, Canada</p>
              </div>
            </div>
          </section>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Connecting Nigerian Hubs to Global Markets
              </h2>
              <p>
                Our export service operates from <strong>Lagos</strong> and <strong>Abuja</strong>, connecting customers with major international destinations including the United Kingdom, United States and Canada.
              </p>
              <p>
                Whether you are exporting personal belongings, clothing, food products permitted for international transportation, commercial goods or business supplies, County Cargo provides both value and express shipping options depending on the destination and urgency.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Nigeria Export Prices
              </h2>
              <p>
                Our value air-cargo service starts from:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                <div className="bg-white border-2 border-primary/20 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-lg">Nigeria to UK</span>
                    <Plane className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-black text-primary mt-2">₦10,500 <span className="text-sm font-normal text-gray-600">/ kg</span></p>
                  <p className="text-xs text-gray-500 mt-1">Minimum shipment: 10kg</p>
                </div>
                <div className="bg-white border-2 border-emerald-500/20 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-lg">Nigeria to USA</span>
                    <Plane className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-emerald-700 mt-2">₦15,500 <span className="text-sm font-normal text-gray-600">/ kg</span></p>
                  <p className="text-xs text-gray-500 mt-1">Minimum shipment: 10kg</p>
                </div>
              </div>

              <p>
                For urgent shipments, <strong>County Cargo Express</strong> is available from 1kg, with express international shipping starting from <strong>₦55,000/kg</strong> on supported routes.
              </p>
              <p>
                Shipments originating from Abuja may carry an additional Abuja handling and transportation component incorporated into the final quotation.
              </p>
              <p>
                Express delivery normally takes approximately <strong>3–5 working days</strong>, subject to airline operations, customs clearance and destination procedures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Overseas Doorstep Delivery (Calculated by Destination Postcode)
              </h2>
              <p>
                For customers who need delivery beyond the destination airport or port warehouse, County Cargo can also arrange doorstep delivery where available.
              </p>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl not-prose text-sm text-blue-950 space-y-2">
                <p className="font-bold text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Transparent Postcode / ZIP Code Quoting
                </p>
                <p>
                  Because final-mile courier logistics vary across cities, states, and regional postal zones, doorstep delivery charges are never arbitrarily guessed. The final delivery charge is calculated accurately based on your destination UK postcode, US ZIP code, or Canadian postal code, combined with parcel weight and dimensions.
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
                    Export from Nigeria with County Cargo
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Get an instant quote online or contact our dedicated international trade team.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-emerald-400" /> Website: <strong className="text-white">www.countycargo.com</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-400" /> Phone: <strong className="text-white">+44 7405 556668</strong>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/export-from-nigeria">
                      <Calculator className="w-4 h-4 mr-2" />
                      Export Calculator
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                    <a href="https://wa.me/2348110000421" target="_blank" rel="noopener noreferrer">
                      WhatsApp Support
                    </a>
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
