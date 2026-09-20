import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Plane, CheckCircle2, ArrowRight, Clock, ShieldCheck, Scale, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nigeria to UK Air Freight Explained | Transit Times, Cost & Process | County Cargo',
  description:
    'Complete guide explaining air freight from Nigeria to the UK. Learn about flight schedules from Lagos and Abuja, chargeable weight formulas, customs clearance, and delivery across London, Manchester, and Liverpool.',
  keywords:
    'Nigeria to UK air freight, air cargo Lagos to London, air freight cost Nigeria to UK, how air shipping from Nigeria to UK works, express air courier Nigeria to UK, County Cargo Nigeria to UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/nigeria-to-uk-air-freight-explained',
  },
  openGraph: {
    title: 'Nigeria to UK Air Freight Explained | Transit Times, Cost & Process | County Cargo',
    description:
      'Everything you need to know about air freight logistics connecting Nigeria to the UK. Timelines, volumetric weight, customs, and door-to-door delivery.',
    url: 'https://countycargo.com/blog/nigeria-to-uk-air-freight-explained',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/nigeria-to-uk-air-freight.png',
        width: 1200,
        height: 630,
        alt: 'Nigeria to UK Air Freight plane and cargo consolidation',
      },
    ],
  },
};

export default function NigeriaToUkAirFreightExplainedPage() {
  const articleUrl = 'https://countycargo.com/blog/nigeria-to-uk-air-freight-explained';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Nigeria to UK Air Freight Explained: Transit Times, Costs, and Process',
    description:
      'In-depth operational explanation of how air freight works from Nigeria to the United Kingdom, from airport departures in Lagos to final doorstep delivery.',
    image: 'https://countycargo.com/nigeria-to-uk-air-freight.png',
    datePublished: '2026-09-02T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Air Operations Team',
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
            { label: 'Nigeria to UK Air Freight Explained' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-3.5 h-3.5" /> Air Logistics Deep Dive
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Nigeria to UK Air Freight Explained: Transit Times, Costs &amp; Procedures
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How air cargo operates between Lagos, Abuja, and UK destinations like London, Manchester, Birmingham, and Liverpool.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Air Operations Team</span>
              <span>•</span>
              <span>Published September 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            {/* Quick Summary Quotation Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Answer: How Does Nigeria to UK Air Freight Work?
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Air freight from Nigeria to the UK is the fastest and most secure method for sending personal luggage, authentic foodstuffs, documents, and commercial merchandise. Standard air cargo takes 5–10 working days, while express air courier delivers in 3 to 5 working days. Packages are received at hubs in Lagos or Abuja, screened and weighed, flown to London Heathrow or Manchester Airport, cleared through HMRC customs, and delivered directly to the recipient’s UK doorstep or Liverpool collection depot.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              1. Standard Air Cargo vs. Express Courier Services
            </h2>
            <p>
              When booking through our <Link href="/shipping-from-nigeria-to-uk" className="text-primary font-bold hover:underline">Shipping from Nigeria to UK service</Link>, customers can choose between two main air shipping tiers depending on urgency and volume:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Standard Air Freight (5–10 Working Days):</strong> Best for heavy packages, authentic dried food items, personal wardrobe shipments, and commercial inventory. Shipments are consolidated on weekly scheduled flights for maximum cost efficiency.
              </li>
              <li>
                <strong>Express Air Courier (3–5 Working Days):</strong> Priority routing for urgent documents, time-critical corporate parcels, and high-value orders requiring rapid doorstep handover.
              </li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              2. How Chargeable Weight is Calculated (Actual vs. Volumetric)
            </h2>
            <p>
              International air freight pricing is calculated based on <strong>chargeable weight</strong>. Airlines compare the actual scale weight against volumetric (dimensional) weight, billing whichever value is higher:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-center">
              <code className="text-sm sm:text-base font-bold text-primary">
                Volumetric Weight (kg) = [Length (cm) × Width (cm) × Height (cm)] ÷ 5,000
              </code>
            </div>
            <p>
              For dense, heavy packages (such as bagged yam flour or garri), actual weight usually applies. For lightweight, bulky items (such as voluminous fashion wear or empty cartons), volumetric weight applies. County Cargo assists clients with optimal packing and vacuum sealing to minimize dimensional bulk.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              3. The 4 Stages of UK Air Freight Journey
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Intake &amp; Verification:</strong> Goods are received at our Lagos hub (Ladipo-Oshodi Plaza) or Abuja branch (Wuye Market), inspected, vacuum-sealed, and weighed on certified digital scales.
              </li>
              <li>
                <strong>Export Clearance &amp; Departure:</strong> Cargo manifests are submitted to Nigeria Customs, and shipments depart from Murtala Muhammed International Airport (LOS) or Nnamdi Azikiwe International Airport (ABV).
              </li>
              <li>
                <strong>UK Border Clearance:</strong> Consignments land at London Heathrow (LHR) or Manchester (MAN) and are cleared through HM Revenue &amp; Customs (HMRC) by our licensed customs partners.
              </li>
              <li>
                <strong>Final Mile Delivery:</strong> Packages are transferred to regional depots or dispatched via domestic couriers for direct home delivery across London, Liverpool, Birmingham, Manchester, Leeds, and nationwide.
              </li>
            </ol>

            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Planning to Ship Air Cargo to the UK?</h3>
                <p className="text-sm text-gray-600">Get an instant rate calculation and book your shipment today.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-uk">
                  Calculate Shipping Rate <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Nigeria to UK Air Freight Explained" />
            <RelatedGuides currentHref="/blog/nigeria-to-uk-air-freight-explained" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
