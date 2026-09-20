import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { DollarSign, CheckCircle2, ArrowRight, Plane, Ship, Package, ShieldCheck, HelpCircle } from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Shipping Rates to Nigeria from UK (2026 Price List) | County Cargo',
  description: 'Complete 2026 price guide for cargo shipping from UK to Nigeria. Air freight per kg, sea freight per CBM, barrel shipping rates, and customs clearance in Lagos & Abuja.',
  keywords: 'shipping rates UK to Nigeria, cargo price per kg UK Nigeria, cost of shipping London to Lagos, air freight rates Nigeria, sea cargo barrels UK Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-rates-uk-to-nigeria',
  },
};

const faqList = [
  {
    question: 'How much does standard air freight cost from the UK to Nigeria?',
    answer: 'Standard air cargo from the UK to Nigeria costs £6.00 per kg plus a £15 handling fee per shipment. Delivery takes 5 to 10 working days.',
  },
  {
    question: 'What is the minimum shipping weight for UK to Nigeria air cargo?',
    answer: 'Standard air cargo has a minimum chargeable weight of 1 kg. Qualifying shipments weighing 10 kg or more receive free doorstep delivery in Abuja.',
  },
  {
    question: 'How much does sea freight barrel shipping cost to Nigeria?',
    answer: 'Shipping a standard 55-gallon jumbo plastic shipping barrel from the UK to Nigeria is charged at a flat rate with sea transit of 4 to 8 weeks to Apapa or Tin Can ports in Lagos.',
  },
  {
    question: 'Are customs clearance fees included in County Cargo rates?',
    answer: 'Yes, all standard door-to-door shipping rates include standard customs clearing at Lagos airport or sea ports.',
  },
];

export default function UkToNigeriaShippingRatesPage() {
  const articleUrl = 'https://countycargo.com/shipping-rates-uk-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Shipping Rates to Nigeria from UK (2026 Price List)',
    description: 'Complete 2026 price guide for cargo shipping from UK to Nigeria. Air freight per kg, sea freight per CBM, barrel shipping rates, and customs clearance.',
    image: 'https://countycargo.com/service-uk-to-nigeria-enhanced.png',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-09-07T01:12:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Pricing Team',
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
            { label: 'Home', href: '/' },
            { label: 'UK to Nigeria Shipping Rates (2026 Price List)' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 via-slate-900 to-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <DollarSign className="w-3.5 h-3.5" /> Official 2026 Pricing Sheet
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping Rates to Nigeria from UK (2026 Price List)
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Complete official price guide for air freight per kg, sea freight per CBM, 55-gallon shipping barrels, and customs clearance to Lagos, Abuja, and nationwide Nigeria.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Logistics Specialists</span>
              <span>•</span>
              <span>Updated 2026</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Fully Verified Rates
              </span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 2026 Rate Summary
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Standard Air Freight from the UK to Nigeria starts at <strong>£6.00 per kg</strong> plus a <strong>£15 handling charge</strong> per consignment ({SHIPPING_TIMEFRAMES.STANDARD_AIR}). Ocean Sea Freight barrels and containers deliver in <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>. All shipments over 10 kg qualify for free delivery to Abuja!
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              UK to Nigeria Rate Matrix (Air &amp; Sea Cargo)
            </h2>
            <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-2xs">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Shipping Method</th>
                    <th className="p-3">Price / Rate Structure</th>
                    <th className="p-3">Handling Fee</th>
                    <th className="p-3">Transit Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <Plane className="w-4 h-4 text-primary" /> Standard Air Freight
                    </td>
                    <td className="p-3">£6.00 / kg</td>
                    <td className="p-3">£15 per shipment</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <Plane className="w-4 h-4 text-primary" /> Express Courier (DHL)
                    </td>
                    <td className="p-3">From £12.50 / kg</td>
                    <td className="p-3">Included</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.EXPRESS_AIR}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <Ship className="w-4 h-4 text-primary" /> 55-Gallon Jumbo Sea Barrel
                    </td>
                    <td className="p-3">Flat Rate per Barrel</td>
                    <td className="p-3">Included</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.SEA_CARGO}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" /> Commercial Sea Container (CBM)
                    </td>
                    <td className="p-3">Per CBM / 20ft / 40ft Container</td>
                    <td className="p-3">Custom Quote</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.SEA_CARGO}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Air Cargo Price Examples
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h3 className="font-bold text-secondary text-base">10 kg Shipment</h3>
                <p className="text-sm text-gray-600 mt-1">£60 freight + £15 handling = <strong>£75 total</strong>.</p>
                <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Includes Free Abuja Doorstep Delivery
                </span>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h3 className="font-bold text-secondary text-base">20 kg Shipment</h3>
                <p className="text-sm text-gray-600 mt-1">£120 freight + £15 handling = <strong>£135 total</strong>.</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h3 className="font-bold text-secondary text-base">30 kg Shipment</h3>
                <p className="text-sm text-gray-600 mt-1">£180 freight + £15 handling = <strong>£195 total</strong>.</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h3 className="font-bold text-secondary text-base">50 kg Shipment</h3>
                <p className="text-sm text-gray-600 mt-1">£300 freight + £15 handling = <strong>£315 total</strong>.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-8">
              <Link href="/shipping-from-uk-to-nigeria" className="p-4 bg-white border border-primary/20 rounded-xl hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-primary uppercase">Main Route Guide</span>
                <h4 className="font-bold text-secondary text-base group-hover:text-primary mt-1">Shipping from UK to Nigeria</h4>
                <p className="text-xs text-gray-500 mt-1">Master cargo guide with instant rate calculator &amp; weekly schedules.</p>
              </Link>
              <Link href="/shipping-from-uk-to-lagos" className="p-4 bg-white border border-primary/20 rounded-xl hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-primary uppercase">Lagos Dedicated</span>
                <h4 className="font-bold text-secondary text-base group-hover:text-primary mt-1">UK to Lagos Cargo</h4>
                <p className="text-xs text-gray-500 mt-1">From £6.00/kg. Ladipo-Oshodi depot collection &amp; mainland/island delivery.</p>
              </Link>
              <Link href="/shipping-from-uk-to-abuja" className="p-4 bg-white border border-primary/20 rounded-xl hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-emerald-600 uppercase">Special Promo</span>
                <h4 className="font-bold text-secondary text-base group-hover:text-primary mt-1">Shipping from UK to Abuja</h4>
                <p className="text-xs text-gray-500 mt-1">From £6.50/kg with 100% Free Doorstep Delivery on qualifying 10kg+ shipments.</p>
              </Link>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl text-white my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Calculate UK to Nigeria Shipping Cost</h3>
                <p className="text-sm text-blue-100 mt-1">Try our instant rate calculator with zero personal info required.</p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold text-base px-6 py-3 shrink-0">
                <Link href="/shipping-from-uk-to-nigeria#quote-calculator">
                  Instant Calculator <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Shipping Rates to Nigeria from UK (2026 Price List)" />

            <RelatedGuides currentHref="/shipping-rates-uk-to-nigeria" />
          </div>
        </article>

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary text-center mb-8 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqList.map((faq, index) => (
                <div key={index} className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs">
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
