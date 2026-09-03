import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Truck, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Liverpool to Abuja Cargo Services | Air Freight to Nigeria FCT | County Cargo',
  description:
    'Fast air cargo and parcel delivery from Liverpool (Queens Dock L1 0BG) to Abuja, Nigeria. Doorstep delivery across Maitama, Wuse, Garki, Gwarinpa, and Abuja FCT.',
  keywords:
    'Liverpool to Abuja cargo, shipping from Liverpool to Abuja, send parcel Liverpool to Abuja, air cargo to Abuja FCT, County Cargo Abuja office, Queens Dock Liverpool cargo',
  alternates: {
    canonical: 'https://countycargo.com/blog/liverpool-to-abuja-cargo-services',
  },
  openGraph: {
    title: 'Liverpool to Abuja Cargo Services | Air Freight to Nigeria FCT | County Cargo',
    description:
      'Send air cargo and parcels from Liverpool directly to Abuja, Nigeria with doorstep delivery and transparent pricing.',
    url: 'https://countycargo.com/blog/liverpool-to-abuja-cargo-services',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/service-uk-nigeria-new.jpg',
        width: 1200,
        height: 630,
        alt: 'Liverpool to Abuja Cargo Freight Services',
      },
    ],
  },
};

export default function LiverpoolToAbujaCargoServicesPage() {
  const articleUrl = 'https://countycargo.com/blog/liverpool-to-abuja-cargo-services';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Liverpool to Abuja Cargo Services: Fast Air Freight from Merseyside to the Federal Capital',
    description:
      'Detailed shipping guide for customers sending personal effects, electronics, documents, and commercial goods from Liverpool to Abuja FCT.',
    image: 'https://countycargo.com/service-uk-nigeria-new.jpg',
    datePublished: '2026-09-02T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Abuja Route Specialist',
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

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'Liverpool to Abuja Cargo Services' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-3.5 h-3.5" /> Liverpool to Abuja Route
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Liverpool to Abuja Cargo Services: Air Freight &amp; FCT Doorstep Delivery
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How to send packages, personal belongings, electronics, and documents from Liverpool directly to Abuja with full customs clearance.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Abuja Route Specialist</span>
              <span>•</span>
              <span>Published September 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            {/* Direct Answer Summary */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Answer: How to Send Cargo from Liverpool to Abuja?
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo provides weekly air freight shipping from our Liverpool depot (Unit G6, Queens Dock, L1 0BG) to Abuja. Shipments are flown to Nigeria, cleared through customs, and delivered directly to the recipient’s doorstep across Abuja (Maitama, Wuse 2, Garki, Asokoro, Jabi, Gwarinpa, Kubwa) or made available for pickup at our Abuja office (Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market). Delivery transit time is 5 to 10 working days.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              1. Liverpool Intake &amp; Weekly Consolidations
            </h2>
            <p>
              Merseyside shippers can bring packages directly to our <Link href="/shipping-from-uk-to-nigeria" className="text-primary font-bold hover:underline">UK to Nigeria receiving depot</Link> in Liverpool (Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG). Our team weighs and registers each box with digital tracking.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              2. Delivery Coverage Across Abuja &amp; the FCT
            </h2>
            <p>
              Once your shipment completes customs release in Nigeria, our Abuja delivery network covers all residential and business districts:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 not-prose text-sm text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">• Maitama &amp; Asokoro</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">• Wuse 1 &amp; Wuse 2</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">• Garki &amp; Central Area</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">• Jabi &amp; Utako</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">• Gwarinpa &amp; Life Camp</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">• Kubwa &amp; Lugbe</div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              3. County Cargo Abuja Branch Pick-Up
            </h2>
            <p>
              Recipients who prefer in-person collection can visit our Abuja branch: <strong>Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT</strong> (Phone: +234 811 000 0423).
            </p>

            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Send Cargo from Liverpool to Abuja</h3>
                <p className="text-sm text-gray-600">Calculate rates and book your shipment today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Check Shipping Rates <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Liverpool to Abuja Cargo Services" />
            <RelatedGuides currentHref="/blog/liverpool-to-abuja-cargo-services" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
