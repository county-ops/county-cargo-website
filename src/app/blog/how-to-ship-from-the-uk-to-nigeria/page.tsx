import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Globe, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Truck, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Ship from the UK to Nigeria | Step-by-Step Logistics Guide | County Cargo',
  description:
    'Master guide for shipping parcels, barrels, electronics, and commercial cargo from the UK to Nigeria. Learn about our Liverpool receiving depot, air cargo timelines, sea freight options, and Lagos customs clearance.',
  keywords:
    'how to ship from UK to Nigeria, UK to Nigeria cargo guide, send parcels London to Lagos, Liverpool to Nigeria freight, ship electronics to Nigeria, County Cargo UK to Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-to-ship-from-the-uk-to-nigeria',
  },
  openGraph: {
    title: 'How to Ship from the UK to Nigeria | Step-by-Step Logistics Guide | County Cargo',
    description:
      'Everything UK residents, online shoppers, and businesses need to know to ship cargo smoothly from the UK to Lagos, Abuja, and all Nigerian states.',
    url: 'https://countycargo.com/blog/how-to-ship-from-the-uk-to-nigeria',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/service-uk-nigeria-new.jpg',
        width: 1200,
        height: 630,
        alt: 'Step by step shipping from the UK to Nigeria',
      },
    ],
  },
};

export default function HowToShipFromUkToNigeriaPage() {
  const articleUrl = 'https://countycargo.com/blog/how-to-ship-from-the-uk-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Ship from the UK to Nigeria: Complete Step-by-Step Guide',
    description:
      'Authoritative walkthrough covering parcel preparation, Liverpool warehouse receiving, air cargo vs sea freight barrels, Lagos customs clearance, and Nigerian doorstep delivery.',
    image: 'https://countycargo.com/service-uk-nigeria-new.jpg',
    datePublished: '2026-09-02T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo UK Logistics Team',
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
            { label: 'How to Ship from UK to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-3.5 h-3.5" /> UK to Nigeria Masterclass
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Ship from the UK to Nigeria: Complete 2026 Step-by-Step Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Learn how to send personal belongings, online shopping purchases, shipping barrels, and commercial inventory from the UK to Lagos, Abuja, and nationwide.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo UK Team</span>
              <span>•</span>
              <span>Published September 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            {/* Quick Answer Summary */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Answer: How Do You Ship from the UK to Nigeria?
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                To ship cargo from the UK to Nigeria with County Cargo: (1) Pack your goods and drop them off at our Liverpool depot (Unit G6, Queens Dock, L1 0BG) or book a nationwide UK collection; (2) Choose between Standard Air Cargo (5–10 days), Express Air (3–5 days), or Ocean Sea Freight Barrels (4–6 weeks); (3) County Cargo handles transatlantic transit and all Nigerian customs clearance in Lagos; (4) Collect your package at our Ladipo-Oshodi Lagos hub or receive direct doorstep delivery to Lagos, Abuja, Port Harcourt, and any state across Nigeria.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Step 1: Choose Your Shipping Method (Air vs. Sea Freight)
            </h2>
            <p>
              Depending on what you are sending, our <Link href="/shipping-from-uk-to-nigeria" className="text-primary font-bold hover:underline">Shipping from the UK to Nigeria service</Link> offers distinct transit modes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Standard Air Cargo (5–10 working days):</strong> Recommended for clothing, electronics, shoes, gifts, cosmetics, and everyday packages.</li>
              <li><strong>Express Air Courier (3–5 working days):</strong> For urgent contracts, business spare parts, and time-critical deliveries.</li>
              <li><strong>Sea Freight &amp; 55-Gallon Barrels (4–6 weeks):</strong> The most economical method for shipping heavy provisions, appliances, generators, drums, and full container loads (FCL).</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Step 2: UK Drop-Off in Liverpool or Doorstep Collection
            </h2>
            <p>
              We provide two convenient intake options across Great Britain:
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-4 not-prose">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-bold text-secondary text-base flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Liverpool Receiving Depot
                </div>
                <p className="text-sm text-slate-600">
                  Deliver directly to: <strong>Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG</strong>. Open Monday–Friday (9am–5pm) and Saturday (10am–2pm).
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-bold text-secondary text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Nationwide UK Courier Pickup
                </div>
                <p className="text-sm text-slate-600">
                  Book a collection from your doorstep in London, Manchester, Birmingham, Leeds, Leicester, Nottingham, Newcastle, Bristol, Scotland, or Wales.
                </p>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Step 3: Online Shopping Forwarding from UK Retailers
            </h2>
            <p>
              Nigerian shoppers can buy from Amazon UK, eBay, Argos, ASOS, Currys, and UK wholesale suppliers using our Liverpool warehouse address at checkout. We receive, inspect, consolidate your purchases to minimize freight costs, and fly them safely to Nigeria.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Step 4: Stress-Free Nigerian Customs Clearance
            </h2>
            <p>
              One of the greatest headaches in international shipping is customs clearing at Nigerian ports. With County Cargo, standard air freight and ocean shipments are cleared through Murtala Muhammed Airport and Lagos seaports by our in-house licensed clearing brokers, sparing you unexpected terminal charges or bureaucratic delays.
            </p>

            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to Ship from the UK to Nigeria?</h3>
                <p className="text-sm text-gray-600">Get an instant quote, check weekly departure schedules, and book today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Get UK Shipping Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How to Ship from the UK to Nigeria" />
            <RelatedGuides currentHref="/blog/how-to-ship-from-the-uk-to-nigeria" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
