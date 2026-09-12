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
  title: 'Cargo From Port Harcourt to the USA | County Cargo',
  description:
    'Ship cargo from Port Harcourt to the USA with County Cargo. Door-to-door collection across Rivers State, air and sea freight, full US customs handling.',
  keywords:
    'cargo Port Harcourt to USA, shipping Port Harcourt to United States, Rivers State freight to USA, send goods Port Harcourt to America',
  alternates: { canonical: 'https://countycargo.com/blog/cargo-port-harcourt-to-usa' },
  openGraph: {
    title: 'Cargo From Port Harcourt to the USA | County Cargo',
    description: 'Ship cargo from Port Harcourt to the USA with County Cargo. Door-to-door collection across Rivers State, air and sea freight, full US customs handling.',
    url: 'https://countycargo.com/blog/cargo-port-harcourt-to-usa',
    siteName: 'County Cargo',
    images: [{ url: 'https://countycargo.com/images/blog/port-harcourt-to-usa-oil-cargo.jpg', width: 1200, height: 675, alt: 'County Cargo collecting sealed parcels in Port Harcourt for shipping to the USA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Port Harcourt to the USA | County Cargo',
    description: 'Ship cargo from Port Harcourt to the USA with County Cargo. Door-to-door collection across Rivers State, air and sea freight, full US customs handling.',
    images: ['https://countycargo.com/images/blog/port-harcourt-to-usa-oil-cargo.jpg'],
  },
};

export default function CargoPortHarcourtToUsaPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-port-harcourt-to-usa';
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Port Harcourt to the USA',
        description: 'Door-to-door air and sea freight collection across Rivers State with delivery to major US cities.',
        provider: {
          '@type': 'MovingCompany',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          telephone: '+2348110000421',
          address: [
            { '@type': 'PostalAddress', streetAddress: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi', addressLocality: 'Lagos', postalCode: '102214', addressCountry: 'NG' },
            { '@type': 'PostalAddress', streetAddress: '1234 N Belt Line Rd', addressLocality: 'Irving', addressRegion: 'TX', postalCode: '75061', addressCountry: 'US' },
          ],
        },
        areaServed: [{ '@type': 'City', name: 'Port Harcourt' }, { '@type': 'Country', name: 'United States' }],
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: articleUrl },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do you ship from Port Harcourt to the USA?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — County Cargo collects from your Port Harcourt address and delivers door to door to major US cities including Houston, Texas; Maryland; New York; and Atlanta.' } },
          { '@type': 'Question', name: 'How long does shipping from Port Harcourt to the USA take?', acceptedAnswer: { '@type': 'Answer', text: `Air freight takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` } },
          { '@type': 'Question', name: 'What can I ship from Port Harcourt to the USA?', acceptedAnswer: { '@type': 'Answer', text: 'Personal effects, clothing, dried foodstuffs, cosmetics, electronics (with receipt), medication (with documentation), and documents.' } },
          { '@type': 'Question', name: 'How do I book a Port Harcourt to USA shipment?', acceptedAnswer: { '@type': 'Answer', text: 'Contact us on WhatsApp or phone with your contents list, estimated weight, and US delivery address. We confirm a quote and schedule your doorstep collection.' } },
          { '@type': 'Question', name: 'What US customs paperwork is needed?', acceptedAnswer: { '@type': 'Answer', text: 'Personal effects may enter duty-free; commercial shipments require a commercial invoice and declared value. County Cargo prepares all documentation accurately.' } },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Port Harcourt to the USA | County Cargo',
        description: 'Ship cargo from Port Harcourt to the USA with County Cargo. Door-to-door collection across Rivers State, air and sea freight, full US customs handling.',
        image: 'https://countycargo.com/images/blog/port-harcourt-to-usa-oil-cargo.jpg',
        datePublished: '2026-09-10T08:00:00+01:00',
        dateModified: '2026-09-10T08:00:00+01:00',
        author: { '@type': 'Organization', name: 'County Cargo Rivers State Logistics Team', url: 'https://countycargo.com' },
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
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Port Harcourt to USA' }]} />
          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">Nigeria to USA Route</span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500"><Calendar className="w-3.5 h-3.5" /> 10 September 2026</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">Cargo From Port Harcourt to the USA</h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">Port Harcourt has a large diaspora in Houston, Atlanta, and across the US. County Cargo collects from your Rivers State door and delivers to any American address.</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">CC</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Rivers State Logistics Team</p>
                  <p className="text-xs text-gray-500">South-South Hub</p>
                </div>
              </div>
              <SocialShare title="Cargo From Port Harcourt to the USA | County Cargo" url={articleUrl} />
            </div>
          </header>
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image src="/images/blog/port-harcourt-to-usa-oil-cargo.jpg" alt="County Cargo collecting sealed parcels in Port Harcourt for shipping to the USA" fill className="object-cover" priority />
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2"><Truck className="w-5 h-5 text-emerald-700" /> Key Route Facts: Port Harcourt to USA</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100"><p className="font-semibold text-emerald-900">Air Cargo</p><p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p><p className="text-xs text-gray-600">Urgent parcels &amp; documents</p></div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100"><p className="font-semibold text-emerald-900">Sea Cargo</p><p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p><p className="text-xs text-gray-600">Barrels &amp; bulk goods</p></div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100"><p className="font-semibold text-emerald-900">US Coverage</p><p className="text-lg font-bold text-primary mt-0.5">Nationwide</p><p className="text-xs text-gray-600">TX, MD, NY, GA &amp; all states</p></div>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shipping From Port Harcourt to the USA</h2>
              <p className="leading-relaxed">Port Harcourt&apos;s professional class — engineers, doctors, lawyers, and oil sector workers — has a significant American footprint. Texas, Maryland, Georgia, and New York all have established Port Harcourt communities. County Cargo moves cargo from your PH doorstep to their American address, with full tracking and US customs clearance.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">What Can I Ship?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal effects and household goods</li>
                <li>Dried foodstuffs — dried fish, crayfish, pepper, and provisions</li>
                <li>Clothing and fashion goods</li>
                <li>Electronics (with receipt)</li>
                <li>Medication (with prescription if required)</li>
                <li>Documents and official correspondence</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Air or Sea?</h3>
              <p className="leading-relaxed"><strong>Air freight</strong> delivers in <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong> — fastest for urgent items.</p>
              <p className="leading-relaxed"><strong>Sea freight</strong> is cost-effective for large loads, arriving in approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Collection Areas in Port Harcourt</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                {['GRA Phase 2', 'Trans Amadi', 'Rumuola', 'Rumuokoro', 'Diobu', 'Elekahia', 'Woji', 'Obio-Akpor'].map((area) => (
                  <div key={area} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {area}</div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Your Port Harcourt to USA Shipment</h3>
              <p className="leading-relaxed">Contact us via WhatsApp or phone with your contents, weight, and US delivery address. We confirm your quote and schedule doorstep collection.</p>
            </section>
          </div>
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">More Nigeria to USA Routes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/blog/cargo-lagos-to-houston" className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group">
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Shipping From Lagos to Houston Texas &rarr;</p>
                <p className="text-xs text-gray-600 mt-1">Door-to-door freight from Lagos to Houston.</p>
              </Link>
              <Link href="/shipping-from-nigeria-to-usa" className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group">
                <p className="text-xs font-semibold text-primary uppercase">Main Hub Page</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Nigeria to USA Shipping Hub &rarr;</p>
                <p className="text-xs text-gray-600 mt-1">Full pricing, customs documentation, and instant quote.</p>
              </Link>
            </div>
          </div>
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">FAQs: Port Harcourt to USA Shipping</h3>
            <div className="space-y-4">
              {[
                { q: 'Do you ship from Port Harcourt to the USA?', a: 'Yes — County Cargo collects from your Port Harcourt address and delivers door to door to major US cities including Houston, Maryland, New York, and Atlanta.' },
                { q: 'How long does shipping from Port Harcourt to the USA take?', a: `Air freight takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` },
                { q: 'What can I ship from Port Harcourt to the USA?', a: 'Personal effects, clothing, dried foodstuffs, cosmetics, electronics (with receipt), medication (with documentation), and documents.' },
                { q: 'How do I book a Port Harcourt to USA shipment?', a: 'Contact us on WhatsApp or phone with your contents list, estimated weight, and US delivery address. We confirm a quote and schedule your doorstep collection.' },
                { q: 'What US customs paperwork is needed?', a: 'Personal effects may enter duty-free; commercial shipments require a commercial invoice and declared value. County Cargo prepares all documentation accurately.' },
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
              <h3 className="text-2xl font-extrabold text-white">Ship From Port Harcourt to the USA</h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">Doorstep collection across Rivers State. Reliable delivery to any US address.</p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20Port%20Harcourt%20to%20the%20USA" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold gap-2"><MessageSquare className="w-5 h-5" /> Chat on WhatsApp</Button>
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
