import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import {
  MapPin,
  Plane,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  Package,
  FileText,
  Briefcase,
  Building2,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cargo From Abuja to London | Fast, Tracked | County Cargo',
  description:
    'Ship cargo from Abuja to London with County Cargo. Tracked air freight for documents and business goods, plus collection across the FCT.',
  keywords:
    'cargo from Abuja to London, shipping Abuja to London, Abuja to London courier, send documents Abuja to London, air cargo Abuja to London',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-abuja-to-london',
  },
  openGraph: {
    title: 'Cargo From Abuja to London | Fast, Tracked | County Cargo',
    description:
      'Ship cargo from Abuja to London with County Cargo. Tracked air freight for documents and business goods, plus collection across the FCT.',
    url: 'https://countycargo.com/blog/cargo-abuja-to-london',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-abuja-to-london-documents.jpg',
        width: 1200,
        height: 675,
        alt: 'County Cargo tracked document shipment being signed for in an Abuja office for delivery to London',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Abuja to London | Fast, Tracked | County Cargo',
    description:
      'Ship cargo from Abuja to London with County Cargo. Tracked air freight for documents and business goods, plus collection across the FCT.',
    images: [
      'https://countycargo.com/images/blog/county-cargo-abuja-to-london-documents.jpg',
    ],
  },
};

export default function CargoAbujaToLondonPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-abuja-to-london';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Abuja to London',
        description:
          'Fast, tracked air freight, expedited business document couriers, and relocation shipping from Abuja FCT to London.',
        provider: {
          '@type': 'MovingCompany',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          telephone: '+2348110000421',
          address: [
            {
              '@type': 'PostalAddress',
              streetAddress: 'Shop HF426, Turai Yar\'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street',
              addressLocality: 'Abuja',
              addressRegion: 'FCT',
              addressCountry: 'NG',
            },
            {
              '@type': 'PostalAddress',
              streetAddress: 'Unit G6, Queens Dock Commercial Centre, 67-83 Norfolk Street',
              addressLocality: 'Liverpool',
              postalCode: 'L1 0BG',
              addressCountry: 'GB',
            },
            {
              '@type': 'PostalAddress',
              streetAddress: '1234 N Belt Line Rd',
              addressLocality: 'Irving',
              addressRegion: 'TX',
              postalCode: '75061',
              addressCountry: 'US',
            },
          ],
        },
        areaServed: [
          { '@type': 'City', name: 'Abuja' },
          { '@type': 'City', name: 'London' },
        ],
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: articleUrl,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How fast can documents go from Abuja to London?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Our expedited air courier delivers urgent documents in ${SHIPPING_TIMEFRAMES.EXPRESS_AIR} door to door, fully tracked throughout. Standard air freight delivers in ${SHIPPING_TIMEFRAMES.STANDARD_AIR}.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Do you handle customs paperwork for commercial goods?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We prepare the commercial invoice, export packing list, and UK customs import declaration with correct HS commodity codes as part of the service.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I book a collection from my Abuja office?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — office collections can be booked for a dedicated time window across the FCT, including Maitama, Central Business District, Asokoro, Wuse, and Garki.',
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Abuja to London | Fast, Tracked | County Cargo',
        description:
          'Ship cargo from Abuja to London with County Cargo. Tracked air freight for documents and business goods, plus collection across the FCT.',
        image: 'https://countycargo.com/images/blog/county-cargo-abuja-to-london-documents.jpg',
        datePublished: '2026-09-07T08:00:00+01:00',
        dateModified: '2026-09-07T08:00:00+01:00',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Abuja Team',
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
      },
    ],
  };

  return (
    <>
      <JsonLd data={combinedSchema} />
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Cargo Abuja to London' },
            ]}
          />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">
                Abuja Outbound Routes
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> 7 September 2026
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">5 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cargo From Abuja to London: Business and Family Shipping
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Abuja ships differently from Lagos. As the seat of government and the diplomatic hub of Nigeria, shipments require punctuality, meticulous customs documentation, and seamless corporate desk collections.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  CC
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Abuja Operations</p>
                  <p className="text-xs text-gray-500">Wuye Ultra Modern Market • Abuja FCT</p>
                </div>
              </div>
              <SocialShare title="Cargo From Abuja to London | Fast, Tracked | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-abuja-to-london-documents.jpg"
              alt="County Cargo tracked document shipment being signed for in an Abuja office for delivery to London"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Route Summary Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-blue-950 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-700" /> Key Route Facts: Abuja to London
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-blue-950">
              <div className="bg-white/80 p-3 rounded-xl border border-blue-100">
                <p className="font-semibold text-blue-900">Urgent Documents</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.EXPRESS_AIR}</p>
                <p className="text-xs text-gray-600">Tracked door-to-door courier</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-blue-100">
                <p className="font-semibold text-blue-900">Standard Air Freight</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p>
                <p className="text-xs text-gray-600">Commercial cargo &amp; parcels</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-blue-100">
                <p className="font-semibold text-blue-900">FCT Collection</p>
                <p className="text-lg font-bold text-primary mt-0.5">Maitama to Garki</p>
                <p className="text-xs text-gray-600">Direct office &amp; home pickup</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Cargo From Abuja to London: Business and Family Shipping
              </h2>
              <p className="leading-relaxed">
                Abuja ships differently from Lagos. As the seat of government and the base for the diplomatic, consultancy, and corporate sector, a large share of Abuja-to-London consignments are time-critical: contracts, certified documents, tender submissions, equipment samples, and professional relocations. County Cargo runs the Abuja route with that exact precision in mind.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Time-Critical Documents
              </h3>
              <p className="leading-relaxed">
                Certified academic transcripts, legal contracts, visa paperwork, embassy submissions, and company registration documents all move on our expedited air courier service.
              </p>
              <p className="leading-relaxed">
                Each envelope is tracked from collection in the FCT to signature at its London destination. You receive real-time checkpoint timestamps, and we provide proof of delivery (POD) on request with named recipient signatures.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Business and Commercial Cargo
              </h3>
              <p className="leading-relaxed">
                If you are sending product samples, engineering equipment parts, fashion collections, or commercial trade goods, we handle the commercial invoice and customs paperwork alongside the freight.
              </p>
              <p className="leading-relaxed">
                Getting the HS codes and declared values right at the Abuja end is what keeps a consignment moving smoothly at London Heathrow rather than sitting in a bonded warehouse accruing demurrage and storage charges.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Relocations and Personal Effects
              </h3>
              <p className="leading-relaxed">
                Professionals moving from Abuja to London — whether for a diplomatic posting, postgraduate studies, corporate secondment, or a permanent relocation — typically ship a mix of clothing, books, kitchen equipment, and personal belongings.
              </p>
              <p className="leading-relaxed">
                Personal effects usually qualify for Transfer of Residence (ToR) relief from UK import duty and VAT, provided the goods are used, have been owned for the qualifying period, and are declared correctly. We help prepare the required customs declarations on your behalf to prevent unexpected taxes.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Collection Across the Federal Capital Territory (FCT)
              </h3>
              <p className="leading-relaxed">
                You do not have to leave your office or residence. We collect across central Abuja and the wider territory:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Maitama
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Asokoro
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Wuse (Zones 1-7) &amp; II
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Garki (Area 1-11)
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Gwarinpa Estate
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Jabi &amp; Utako
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Lugbe &amp; Airport Road
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Kubwa &amp; Nyanya
                </div>
              </div>
              <p className="leading-relaxed">
                Office collections can be booked for a specific time window so you are not waiting all day. Our driver arrives with digital weighing scales and official County Cargo dockets.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Delivery in London
              </h3>
              <p className="leading-relaxed">
                Consignments are cleared on arrival at London Heathrow and delivered to any London address — corporate headquarters, diplomatic missions, residential homes, or serviced apartments. Business deliveries can be scheduled specifically during reception hours with a designated contact name.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Getting a Fast Quote
              </h3>
              <p className="leading-relaxed">
                Simply send us your parcel dimensions, actual weight, and contents description:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>For legal documents and paperwork:</strong> A straightforward flat rate applies per envelope.</li>
                <li><strong>For freight and parcels:</strong> We quote on chargeable weight, which is whichever is greater between actual gross weight and volumetric weight (Length × Width × Height in cm / 6,000).</li>
              </ul>
            </section>
          </div>

          {/* Cross-linking Cluster Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">
              Explore Related Abuja &amp; UK Shipping Guides
            </h3>
            <p className="text-sm text-blue-900 mb-4">
              Sending goods to other British university cities, or planning student relocation? Check our companion routes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/cargo-abuja-to-uk"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Cargo From Abuja to the UK: Students &amp; Families &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Luggage and academic supplies delivery to university cities nationwide.
                </p>
              </Link>
              <Link
                href="/shipping-from-nigeria-to-uk"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Main Hub Page</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Nigeria to UK Shipping &amp; Freight Services Hub &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Pricing tables, customs documentation, and booking tools for all UK destinations.
                </p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions: Abuja to London Shipping
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  How fast can documents go from Abuja to London?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Our expedited air courier delivers urgent paperwork in <strong>{SHIPPING_TIMEFRAMES.EXPRESS_AIR}</strong> door to door, tracked throughout. Standard air freight delivers in <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Do you handle customs paperwork for commercial goods?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Yes. We prepare the commercial invoice, export packing list, and UK customs declaration with proper HS commodity codes as part of our comprehensive freight forwarding service.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Can I book a collection from my Abuja office?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Yes — office collections can be booked for a dedicated time window across the FCT, including Central Business District, Maitama, Asokoro, Wuse, Garki, Jabi, and Gwarinpa.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Book Fast Cargo from Abuja to London Today
              </h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">
                Contact our Abuja office at Wuye Ultra Modern Market for instant quotes, corporate billing, and scheduled office collection across the FCT.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20send%20cargo%20from%20Abuja%20to%20London"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold gap-2">
                  <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
                </Button>
              </a>
              <Link href="/shipping-from-nigeria-to-uk">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 font-bold">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>

          <RelatedGuides />
        </article>
      </main>
      <Footer />
    </>
  );
}
