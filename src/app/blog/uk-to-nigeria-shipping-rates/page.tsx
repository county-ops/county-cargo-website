import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { DollarSign, CheckCircle2, ArrowRight, Plane, Ship, Package } from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'UK to Nigeria Shipping Rates 2026 | Air & Sea Freight Charges',
  description: 'Official UK to Nigeria shipping rates guide. Standard air cargo from £6.00/kg (+ £15 fee), 5 to 10 working days delivery, sea freight barrels, and Lagos/Abuja door-to-door delivery.',
  keywords: 'UK to Nigeria shipping rates, air cargo rates UK to Nigeria, shipping cost London to Lagos, £6 per kg cargo Nigeria, sea freight rates Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-shipping-cost-to-nigeria',
  },
};

const faqList = [
  {
    question: 'What is the current UK to Nigeria standard air cargo shipping rate?',
    answer: 'Standard air cargo from the UK to Nigeria costs £6.00 per kilogram with a £15 handling charge per shipment. Delivery takes 5 to 10 working days.',
  },
  {
    question: 'What is the minimum weight requirement for UK to Nigeria air cargo?',
    answer: 'Standard air cargo has a minimum chargeable weight of 1 kg. Shipments weighing 10 kg or more qualify for free doorstep delivery in Abuja.',
  },
  {
    question: 'How are volumetric weights calculated for UK to Nigeria shipments?',
    answer: 'Volumetric (dimensional) weight is calculated as (Length x Width x Height in cm) / 5000. County Cargo charges based on the higher value between actual scale weight and volumetric weight.',
  },
  {
    question: 'How long does sea freight take from the UK to Nigeria?',
    answer: 'Sea freight barrels and ocean containers from the UK take 4 to 8 weeks from vessel departure to customs clearance at Apapa or Tin Can ports in Lagos.',
  },
];

export default function UkToNigeriaShippingRatesPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-shipping-cost-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'UK to Nigeria Shipping Rates: Air and Sea Cargo Prices',
    description: 'Complete official breakdown of UK to Nigeria shipping rates per kg, minimum weights, handling fees, and doorstep delivery terms.',
    image: 'https://countycargo.com/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-09-07T00:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Logistics Strategist',
      url: 'https://countycargo.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'County Cargo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://countycargo.com/county-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'UK to Nigeria Shipping Rates' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <DollarSign className="w-3.5 h-3.5" /> Official 2026 Rate Card
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              UK to Nigeria Shipping Rates &amp; Pricing Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Transparent UK air freight rates per kg, sea cargo barrel pricing, handling fees, and doorstep delivery options across Nigeria.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Logistics Strategist</span>
              <span>•</span>
              <span>Updated September 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> At a Glance: UK to Nigeria Rates
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Standard Air Cargo from the UK to Nigeria costs <strong>£6.00 per kg</strong> plus a <strong>£15 handling fee</strong> per shipment, with a delivery timeframe of <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>. Shipments weighing 10 kg or more qualify for free doorstep delivery in Abuja!
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Detailed UK to Nigeria Shipping Rates Table
            </h2>
            <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-2xs">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Service Type</th>
                    <th className="p-3">Rate per KG / Unit</th>
                    <th className="p-3">Handling Fee</th>
                    <th className="p-3">Delivery Timeframe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <Plane className="w-4 h-4 text-primary" /> Standard UK Air Freight
                    </td>
                    <td className="p-3">£6.00 / kg</td>
                    <td className="p-3">£15 per shipment</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <Plane className="w-4 h-4 text-primary" /> Express Air Courier
                    </td>
                    <td className="p-3">From £12.50 / kg</td>
                    <td className="p-3">Included</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.EXPRESS_AIR}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <Ship className="w-4 h-4 text-primary" /> 55-Gallon Sea Barrel
                    </td>
                    <td className="p-3">Flat rate per barrel</td>
                    <td className="p-3">Included</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.SEA_CARGO}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" /> Commercial Sea Freight (CBM)
                    </td>
                    <td className="p-3">Per CBM / Container</td>
                    <td className="p-3">Custom quote</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.SEA_CARGO}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Cost Examples for UK Air Cargo
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>1 kg parcel:</strong> £6 freight + £15 handling = <strong>£21 total</strong>.</li>
              <li><strong>5 kg parcel:</strong> £30 freight + £15 handling = <strong>£45 total</strong>.</li>
              <li><strong>10 kg shipment:</strong> £60 freight + £15 handling = <strong>£75 total</strong> (Includes free delivery to Abuja).</li>
              <li><strong>20 kg shipment:</strong> £120 freight + £15 handling = <strong>£135 total</strong>.</li>
              <li><strong>30 kg shipment:</strong> £180 freight + £15 handling = <strong>£195 total</strong>.</li>
            </ul>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to send cargo from the UK to Nigeria?</h3>
                <p className="text-sm text-gray-600">Calculate exact shipping costs or book a UK collection today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  View Master UK Pillar Guide <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="UK to Nigeria Shipping Rates 2026" />

            <RelatedGuides currentHref="/blog/cargo-shipping-cost-to-nigeria" />
          </div>
        </article>

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqList.map((faq, index) => (
                <div key={index} className="p-5 bg-white rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-secondary text-base">{faq.question}</h3>
                  <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
