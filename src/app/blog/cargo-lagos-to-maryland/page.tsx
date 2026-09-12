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
import { MapPin, MessageSquare, Calendar, Truck } from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cargo From Lagos to Maryland | County Cargo',
  description:
    'Ship cargo from Lagos to Maryland and the Washington DC area with County Cargo. Air and sea freight, door-to-door collection across Lagos, full tracking and US customs handling.',
  keywords:
    'shipping Lagos to Maryland, cargo Lagos to Washington DC, Lagos to Maryland freight, send goods Lagos to USA, Nigeria to Maryland shipping',
  alternates: { canonical: 'https://countycargo.com/blog/cargo-lagos-to-maryland' },
  openGraph: {
    title: 'Cargo From Lagos to Maryland | County Cargo',
    description: 'Ship cargo from Lagos to Maryland and the Washington DC area with County Cargo. Air and sea freight, door-to-door collection across Lagos, full tracking and US customs handling.',
    url: 'https://countycargo.com/blog/cargo-lagos-to-maryland',
    siteName: 'County Cargo',
    images: [{ url: 'https://countycargo.com/images/blog/lagos-to-maryland-doorstep-delivery.jpg', width: 1200, height: 675, alt: 'County Cargo collecting a sealed box in Lagos for shipping to Maryland USA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Lagos to Maryland | County Cargo',
    description: 'Ship cargo from Lagos to Maryland and the Washington DC area with County Cargo. Air and sea freight, door-to-door collection across Lagos, full tracking and US customs handling.',
    images: ['https://countycargo.com/images/blog/lagos-to-maryland-doorstep-delivery.jpg'],
  },
};

export default function CargoLagosToMarylandPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-lagos-to-maryland';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Lagos to Maryland',
        description: 'Door-to-door air and sea freight collection across Lagos with delivery to Maryland, Washington DC, and Northern Virginia.',
        provider: {
          '@type': 'MovingCompany',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          telephone: '+2348110000421',
          address: [
            { '@type': 'PostalAddress', streetAddress: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi', addressLocality: 'Lagos', postalCode: '102214', addressCountry: 'NG' },
            { '@type': 'PostalAddress', streetAddress: 'Unit G6, Queens Dock Commercial Centre, 67-83 Norfolk Street', addressLocality: 'Liverpool', postalCode: 'L1 0BG', addressCountry: 'GB' },
            { '@type': 'PostalAddress', streetAddress: '1234 N Belt Line Rd', addressLocality: 'Irving', addressRegion: 'TX', postalCode: '75061', addressCountry: 'US' },
          ],
        },
        areaServed: [{ '@type': 'City', name: 'Lagos' }, { '@type': 'State', name: 'Maryland' }, { '@type': 'City', name: 'Washington DC' }],
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: articleUrl },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do you ship from Lagos to Maryland?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — County Cargo collects from your Lagos address and delivers door to door to Maryland, Washington DC, and Northern Virginia.' } },
          { '@type': 'Question', name: 'How long does shipping from Lagos to Maryland take?', acceptedAnswer: { '@type': 'Answer', text: `Air freight from Lagos to Maryland takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` } },
          { '@type': 'Question', name: 'What can I ship from Lagos to Maryland?', acceptedAnswer: { '@type': 'Answer', text: 'Personal effects, clothing, dried foodstuffs, cosmetics, electronics (with receipt), medication (with documentation), and documents. Commercial shipments accepted with the correct paperwork.' } },
          { '@type': 'Question', name: 'Do I need to pay US customs duties on goods shipped from Lagos?', acceptedAnswer: { '@type': 'Answer', text: 'Personal effects and genuine gifts may qualify for duty-free entry. Commercial shipments require a commercial invoice and declared value. Our team guides you through all required documentation.' } },
          { '@type': 'Question', name: 'How do I book a shipment from Lagos to Maryland?', acceptedAnswer: { '@type': 'Answer', text: 'Contact us on WhatsApp or phone with your contents list, estimated weight, and Maryland delivery address. We confirm a quote and schedule your Lagos collection.' } },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Lagos to Maryland | County Cargo',
        description: 'Ship cargo from Lagos to Maryland and the Washington DC area with County Cargo. Air and sea freight, door-to-door collection across Lagos, full tracking and US customs handling.',
        image: 'https://countycargo.com/images/blog/lagos-to-maryland-doorstep-delivery.jpg',
        datePublished: '2026-09-10T08:00:00+01:00',
        dateModified: '2026-09-10T08:00:00+01:00',
        author: { '@type': 'Organization', name: 'County Cargo USA Logistics Team', url: 'https://countycargo.com' },
        publisher: { '@type': 'Organization', name: 'County Cargo', logo: { '@type': 'ImageObject', url: 'https://countycargo.com/county-logo.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
      },
    ],
  };

  return (
    <>
      <JsonLd data={combinedSchema} />
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Lagos to Maryland' }]} />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">Nigeria to USA Route</span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500"><Calendar className="w-3.5 h-3.5" /> 10 September 2026</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cargo From Lagos to Maryland and Washington DC
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Maryland and the Washington DC metro area host one of the densest Nigerian-American communities in the United States. County Cargo connects Lagos to that community — doorstep collection, air and sea freight, full US customs handling.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">CC</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo USA Logistics Team</p>
                  <p className="text-xs text-gray-500">Irving, TX Hub</p>
                </div>
              </div>
              <SocialShare title="Cargo From Lagos to Maryland | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image src="/images/blog/lagos-to-maryland-doorstep-delivery.jpg" alt="County Cargo collecting a sealed box in Lagos for shipping to Maryland USA" fill className="object-cover" priority />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700" /> Key Route Facts: Lagos to Maryland
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-emerald-950">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Standard Air Cargo</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p>
                <p className="text-xs text-gray-600">Urgent parcels, gifts &amp; documents</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">Economical Sea Cargo</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p>
                <p className="text-xs text-gray-600">Barrels, bulk goods &amp; furniture</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900">US Coverage</p>
                <p className="text-lg font-bold text-primary mt-0.5">Maryland, DC &amp; VA</p>
                <p className="text-xs text-gray-600">Full metro area delivery</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shipping From Lagos to Maryland</h2>
              <p className="leading-relaxed">
                Maryland has the highest concentration of Nigerian-Americans of any US state. From Silver Spring and College Park to Bowie, Laurel, and Prince George&apos;s County, the community is established and growing. Nigerian churches, restaurants, grocery shops, and professional networks fill every corner of the DC metro. County Cargo collects from any Lagos address and delivers into that world — reliably, with tracking every step of the way.
              </p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Who Ships from Lagos to Maryland</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Families sending provisions:</strong> Dried crayfish, egusi, ogiri, ofo, palm oil, and Nigerian foodstuffs that even the best African grocery in Maryland cannot always supply.</li>
                <li><strong>Professionals relocating:</strong> Forwarding personal effects, clothing, and important documents ahead of or during a move to the DC area.</li>
                <li><strong>Business owners:</strong> Shipping Ankara fabric, fashion goods, and commercial stock to Nigerian-American shops and market traders.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Air Freight or Sea Freight?</h3>
              <p className="leading-relaxed"><strong>Air freight</strong> delivers in <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong> — the fastest route for urgent or lighter consignments.</p>
              <p className="leading-relaxed"><strong>Sea freight</strong> is best for large loads — barrels, multiple boxes, and heavy goods at far lower cost per kilogram, arriving in approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">US Customs: What to Expect</h3>
              <p className="leading-relaxed">Personal effects and genuine gifts may qualify for duty-free entry under US CBP rules. Commercial shipments require a commercial invoice and declared value for duty assessment. Our team advises on all required paperwork and prepares documentation accurately.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Collection Across Lagos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                {['Ikeja', 'Surulere', 'Lekki', 'Festac', 'Isolo', 'Agege', 'Oshodi', 'Ojota', 'Yaba', 'Gbagada', 'Ikorodu', 'Mushin'].map((area) => (
                  <div key={area} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {area}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Your Lagos to Maryland Shipment</h3>
              <p className="leading-relaxed">Contact us via WhatsApp or phone with your contents list, weight, and Maryland delivery address. We confirm a quote, schedule your Lagos collection, and issue a tracking reference at pickup.</p>
            </section>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">More Nigeria to USA Routes</h3>
            <p className="text-sm text-blue-900 mb-4">Shipping to Houston or New York instead?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/blog/cargo-lagos-to-houston" className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group">
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Shipping From Lagos to Houston Texas &rarr;</p>
                <p className="text-xs text-gray-600 mt-1">Door-to-door freight from Lagos to the Houston metro area.</p>
              </Link>
              <Link href="/shipping-from-nigeria-to-usa" className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group">
                <p className="text-xs font-semibold text-primary uppercase">Main Hub Page</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Nigeria to USA Shipping Hub &rarr;</p>
                <p className="text-xs text-gray-600 mt-1">Full pricing, customs documentation, and instant quote.</p>
              </Link>
            </div>
          </div>

          <section className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions: Lagos to Maryland Shipping</h3>
            <div className="space-y-4">
              {[
                { q: 'Do you ship from Lagos to Maryland?', a: 'Yes — County Cargo collects from your Lagos address and delivers door to door to Maryland, Washington DC, and Northern Virginia.' },
                { q: 'How long does shipping from Lagos to Maryland take?', a: `Air freight takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` },
                { q: 'What can I ship from Lagos to Maryland?', a: 'Personal effects, clothing, dried foodstuffs, cosmetics, electronics (with receipt), medication (with documentation), and documents. Commercial shipments accepted with the correct paperwork.' },
                { q: 'Do I need to pay US customs duties on goods shipped from Lagos?', a: 'Personal effects and genuine gifts may qualify for duty-free entry. Commercial shipments require a commercial invoice and declared value. Our team guides you through all required documentation.' },
                { q: 'How do I book a shipment from Lagos to Maryland?', a: 'Contact us on WhatsApp or phone with your contents list, estimated weight, and Maryland delivery address. We confirm a quote and schedule your Lagos collection.' },
              ].map(({ q, a }) => (
                <div key={q} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-base">{q}</h4>
                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-extrabold text-white">Ship From Lagos to Maryland Today</h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">Doorstep collection across Lagos. Reliable delivery to Maryland, DC, and Virginia.</p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20Lagos%20to%20Maryland" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold gap-2">
                  <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
                </Button>
              </a>
              <Link href="/shipping-from-nigeria-to-usa">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 font-bold">Get a Quote</Button>
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
