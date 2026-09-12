import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Truck, Plane, Ship } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Liverpool to Lagos Cargo Services | Air & Sea Freight from Merseyside | County Cargo',
  description:
    'Dedicated air cargo and sea freight services from Liverpool and Merseyside to Lagos, Nigeria. Drop off at our Queens Dock depot (L1 0BG) for fast, secure delivery to Lagos.',
  keywords:
    'Liverpool to Lagos cargo, shipping from Liverpool to Nigeria, Nigerian cargo company Liverpool, send barrel Liverpool to Lagos, Queens Dock cargo depot Liverpool, County Cargo Liverpool',
  alternates: {
    canonical: 'https://countycargo.com/blog/liverpool-to-lagos-cargo-services',
  },
  openGraph: {
    title: 'Liverpool to Lagos Cargo Services | Air & Sea Freight from Merseyside | County Cargo',
    description:
      'Reliable air freight, sea cargo barrels, and parcel delivery directly from Queens Dock, Liverpool (L1 0BG) to Lagos, Nigeria.',
    url: 'https://countycargo.com/blog/liverpool-to-lagos-cargo-services',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/liverpool-to-lagos-cargo.jpg',
        width: 1200,
        height: 630,
        alt: 'Liverpool to Lagos Cargo Services at Queens Dock Commercial Centre',
      },
    ],
  },
};

export default function LiverpoolToLagosCargoServicesPage() {
  const articleUrl = 'https://countycargo.com/blog/liverpool-to-lagos-cargo-services';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Liverpool to Lagos Cargo Services: Air Freight, Sea Barrels & Depot Drop-Off',
    description:
      'Comprehensive logistics guide for residents, businesses, and Nigerian diaspora across Liverpool, Merseyside, and Greater Manchester shipping cargo directly to Lagos.',
    image: 'https://countycargo.com/liverpool-to-lagos-cargo.jpg',
    datePublished: '2026-09-02T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Liverpool Branch Team',
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
            { label: 'Liverpool to Lagos Cargo Services' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Liverpool Hub Special
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Liverpool to Lagos Cargo Services: Air Freight, Sea Barrels &amp; Direct Depot Drop-Off
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How Merseyside and North West shippers send personal luggage, shipping barrels, electronics, and commercial stock directly to Lagos, Nigeria.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Liverpool Branch</span>
              <span>•</span>
              <span>Published September 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            {/* Quick Answer Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Direct Answer: Shipping from Liverpool to Lagos
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo operates a direct physical depot at Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG. Shippers in Liverpool, Wirral, Chester, and Greater Manchester can drop off parcels, electronics, boxes, and 55-gallon jumbo shipping barrels with zero appointment necessary. We provide weekly air cargo (5–10 working days) and regular sea freight (4–8 weeks) with full customs clearance and collection at our Ladipo-Oshodi Lagos hub or doorstep delivery across Lagos State.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              1. Our Liverpool Receiving Facility &amp; Opening Hours
            </h2>
            <p>
              Located centrally in the Queens Dock Commercial Centre on Norfolk Street, our Liverpool warehouse is equipped with certified digital scales, packaging materials, and strapping tools.
            </p>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl my-4 text-sm text-slate-700 not-prose space-y-2">
              <p className="font-bold text-secondary text-base">📍 Depot Address &amp; Schedule:</p>
              <p><strong>Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG, UK</strong></p>
              <p>• Monday to Friday: 9:00 AM – 5:00 PM</p>
              <p>• Saturday: 10:00 AM – 2:00 PM</p>
              <p>• Phone / WhatsApp Support: +234 811 000 0421</p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              2. Air Cargo vs. Sea Freight from Liverpool to Lagos
            </h2>
            <div className="grid md:grid-cols-2 gap-6 my-4 not-prose">
              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-2">
                <h3 className="font-bold text-secondary text-base flex items-center gap-2">
                  <Plane className="w-5 h-5 text-primary" /> Air Freight (5–10 Working Days)
                </h3>
                <p className="text-xs text-slate-600">
                  Ideal for clothing, laptops, smartphones, cosmetics, and urgent parcels. Consolidated weekly and flown directly to Lagos with airport customs clearing included.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-2">
                <h3 className="font-bold text-secondary text-base flex items-center gap-2">
                  <Ship className="w-5 h-5 text-primary" /> Sea Cargo Barrels (4–8 Weeks)
                </h3>
                <p className="text-xs text-slate-600">
                  Ideal for standard 55-gallon jumbo plastic drums, machinery, household goods, and bulk pallets shipped via ocean vessel into Lagos Apapa / Tin Can Port.
                </p>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              3. Lagos Pick-Up &amp; Door-to-Door Delivery
            </h2>
            <p>
              When your shipment arrives in Lagos and completes customs release, recipients can collect in person from our Lagos clearing office (Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi) or receive doorstep delivery to Ikeja, Lekki, Victoria Island, Surulere, Yaba, Ikorodu, and all parts of Lagos State.
            </p>

            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Shipping from Liverpool to Nigeria?</h3>
                <p className="text-sm text-gray-600">Explore full service details and book your drop-off today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  View UK to Nigeria Services <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Liverpool to Lagos Cargo Services" />
            <RelatedGuides currentHref="/blog/liverpool-to-lagos-cargo-services" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
