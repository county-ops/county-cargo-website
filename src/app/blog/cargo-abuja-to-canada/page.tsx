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
  title: 'Cargo From Abuja to Canada | County Cargo',
  description:
    'Ship cargo from Abuja to Canada with County Cargo. Door-to-door collection across FCT, air and sea freight, full tracking and Canadian customs clearance.',
  keywords:
    'cargo Abuja to Canada, shipping Abuja to Canada, Abuja to Toronto freight, send goods Abuja to Canada, Nigeria to Canada shipping Abuja',
  alternates: { canonical: 'https://countycargo.com/blog/cargo-abuja-to-canada' },
  openGraph: {
    title: 'Cargo From Abuja to Canada | County Cargo',
    description: 'Ship cargo from Abuja to Canada with County Cargo. Door-to-door collection across FCT, air and sea freight, full tracking and Canadian customs clearance.',
    url: 'https://countycargo.com/blog/cargo-abuja-to-canada',
    siteName: 'County Cargo',
    images: [{ url: 'https://countycargo.com/images/blog/abuja-to-canada-student-relocation.jpg', width: 1200, height: 675, alt: 'County Cargo collecting a sealed carton in Abuja for shipping to Canada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Abuja to Canada | County Cargo',
    description: 'Ship cargo from Abuja to Canada with County Cargo. Door-to-door collection across FCT, air and sea freight, full tracking and Canadian customs clearance.',
    images: ['https://countycargo.com/images/blog/abuja-to-canada-student-relocation.jpg'],
  },
};

export default function CargoAbujaToCanadaPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-abuja-to-canada';
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Abuja to Canada',
        description: 'Door-to-door air and sea freight collection across Abuja FCT with delivery to Toronto, Calgary, Vancouver, and all Canadian provinces.',
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
        areaServed: [{ '@type': 'City', name: 'Abuja' }, { '@type': 'Country', name: 'Canada' }],
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: articleUrl },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do you ship from Abuja to Canada?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — County Cargo collects from your Abuja address and delivers door to door to Toronto, Calgary, Vancouver, Ottawa, and all Canadian provinces.' } },
          { '@type': 'Question', name: 'How long does shipping from Abuja to Canada take?', acceptedAnswer: { '@type': 'Answer', text: `Air freight from Abuja to Canada takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` } },
          { '@type': 'Question', name: 'What can I ship from Abuja to Canada?', acceptedAnswer: { '@type': 'Answer', text: 'Personal effects, clothing, dried foodstuffs, cosmetics, electronics (with receipt), medication (with documentation), and documents.' } },
          { '@type': 'Question', name: 'What Canadian customs paperwork is needed for Abuja shipments?', acceptedAnswer: { '@type': 'Answer', text: 'Personal effects may enter duty-free under CBSA rules. Commercial shipments require a commercial invoice and declared value. Our team prepares all documentation.' } },
          { '@type': 'Question', name: 'How do I book a shipment from Abuja to Canada?', acceptedAnswer: { '@type': 'Answer', text: 'Contact us on WhatsApp or phone with your contents list, estimated weight, and Canadian delivery address. We confirm a quote and schedule your Abuja collection.' } },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Abuja to Canada | County Cargo',
        description: 'Ship cargo from Abuja to Canada with County Cargo. Door-to-door collection across FCT, air and sea freight, full tracking and Canadian customs clearance.',
        image: 'https://countycargo.com/images/blog/abuja-to-canada-student-relocation.jpg',
        datePublished: '2026-09-10T08:00:00+01:00',
        dateModified: '2026-09-10T08:00:00+01:00',
        author: { '@type': 'Organization', name: 'County Cargo Abuja Operations Team', url: 'https://countycargo.com' },
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
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Abuja to Canada' }]} />
          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">Nigeria to Canada Route</span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500"><Calendar className="w-3.5 h-3.5" /> 10 September 2026</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">Cargo From Abuja to Canada: Door-to-Door Freight</h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">Abuja has a professional class with a growing Canadian connection — Toronto, Calgary, and Ottawa all have established Nigerian communities. County Cargo collects from your Abuja FCT address and delivers to any Canadian city.</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">CC</div>
                <div><p className="text-sm font-semibold text-gray-900">County Cargo Abuja Operations Team</p><p className="text-xs text-gray-500">FCT Hub</p></div>
              </div>
              <SocialShare title="Cargo From Abuja to Canada | County Cargo" url={articleUrl} />
            </div>
          </header>
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image src="/images/blog/abuja-to-canada-student-relocation.jpg" alt="County Cargo collecting a sealed carton in Abuja for shipping to Canada" fill className="object-cover" priority />
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2"><Truck className="w-5 h-5 text-emerald-700" /> Key Route Facts: Abuja to Canada</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100"><p className="font-semibold text-emerald-900">Air Cargo</p><p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p><p className="text-xs text-gray-600">Urgent parcels &amp; documents</p></div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100"><p className="font-semibold text-emerald-900">Sea Cargo</p><p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p><p className="text-xs text-gray-600">Barrels &amp; bulk goods</p></div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100"><p className="font-semibold text-emerald-900">Canada Coverage</p><p className="text-lg font-bold text-primary mt-0.5">Nationwide</p><p className="text-xs text-gray-600">ON, AB, BC &amp; all provinces</p></div>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shipping From Abuja to Canada</h2>
              <p className="leading-relaxed">Canada is one of the most popular destinations for Nigerians from the Federal Capital Territory — particularly for healthcare workers, IT professionals, and students on study permits. Toronto, Calgary, and Ottawa have established Abuja connections. County Cargo serves those connections: doorstep collection across FCT and delivery to any Canadian address.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Who Ships from Abuja to Canada</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Families:</strong> Sending provisions, personal effects, and care packages to relatives in Toronto, Calgary, or Ottawa.</li>
                <li><strong>Students and professionals:</strong> Forwarding personal belongings, clothing, and documents ahead of a move or study programme in Canada.</li>
                <li><strong>Business owners:</strong> Shipping fabrics, fashion goods, and commercial stock to Nigerian-Canadian shops.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Air Freight or Sea Freight?</h3>
              <p className="leading-relaxed"><strong>Air freight</strong> delivers in <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong> — fastest for urgent or lighter items.</p>
              <p className="leading-relaxed"><strong>Sea freight</strong> is cost-effective for large loads, arriving in approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Canadian Customs for Abuja Shipments</h3>
              <p className="leading-relaxed">Personal effects and genuine gifts may enter Canada duty-free under CBSA rules for new immigrants and returning residents. Commercial shipments require a commercial invoice and declared value. Our team handles all documentation — accurately, every time.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Collection Areas in Abuja FCT</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                {['Maitama', 'Garki', 'Wuse', 'Gwarinpa', 'Asokoro', 'Jabi', 'Kubwa', 'Lugbe'].map((area) => (
                  <div key={area} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {area}</div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Your Abuja to Canada Shipment</h3>
              <p className="leading-relaxed">Contact us via WhatsApp or phone with your contents, weight, and Canadian delivery address. We confirm a quote and schedule your Abuja collection.</p>
            </section>
          </div>
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">More Nigeria to Canada Routes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/blog/cargo-lagos-to-toronto" className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group">
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Shipping From Lagos to Toronto &rarr;</p>
                <p className="text-xs text-gray-600 mt-1">Door-to-door freight from Lagos to Toronto and Canada.</p>
              </Link>
              <Link href="/shipping-from-nigeria-to-canada" className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group">
                <p className="text-xs font-semibold text-primary uppercase">Main Hub</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Nigeria to Canada Shipping Hub &rarr;</p>
                <p className="text-xs text-gray-600 mt-1">Full pricing, customs documentation, and instant quote.</p>
              </Link>
            </div>
          </div>
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">FAQs: Abuja to Canada Shipping</h3>
            <div className="space-y-4">
              {[
                { q: 'Do you ship from Abuja to Canada?', a: 'Yes — County Cargo collects from your Abuja address and delivers door to door to Toronto, Calgary, Vancouver, Ottawa, and all Canadian provinces.' },
                { q: 'How long does shipping from Abuja to Canada take?', a: `Air freight takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` },
                { q: 'What can I ship from Abuja to Canada?', a: 'Personal effects, clothing, dried foodstuffs, cosmetics, electronics (with receipt), medication (with documentation), and documents.' },
                { q: 'What Canadian customs paperwork is needed?', a: 'Personal effects may enter duty-free under CBSA rules. Commercial shipments require a commercial invoice and declared value. Our team prepares all documentation.' },
                { q: 'How do I book a shipment from Abuja to Canada?', a: 'Contact us on WhatsApp or phone with your contents list, estimated weight, and Canadian delivery address. We confirm a quote and schedule your Abuja collection.' },
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
              <h3 className="text-2xl font-extrabold text-white">Ship From Abuja to Canada Today</h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">Doorstep collection across Abuja FCT. Reliable delivery to all Canadian provinces.</p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20Abuja%20to%20Canada" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold gap-2"><MessageSquare className="w-5 h-5" /> Chat on WhatsApp</Button>
              </a>
              <Link href="/shipping-from-nigeria-to-canada">
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
