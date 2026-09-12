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
  title: 'Cargo From Warri to the UK | County Cargo',
  description:
    'Ship cargo from Warri to the UK with County Cargo. Door-to-door collection across Delta State, air and sea freight, full tracking and UK customs clearance.',
  keywords:
    'cargo Warri to UK, shipping Warri to United Kingdom, Delta State freight to UK, send goods Warri to London, Warri cargo shipping',
  alternates: { canonical: 'https://countycargo.com/blog/cargo-warri-to-uk' },
  openGraph: {
    title: 'Cargo From Warri to the UK | County Cargo',
    description: 'Ship cargo from Warri to the UK with County Cargo. Door-to-door collection across Delta State, air and sea freight, full tracking and UK customs clearance.',
    url: 'https://countycargo.com/blog/cargo-warri-to-uk',
    siteName: 'County Cargo',
    images: [{ url: 'https://countycargo.com/images/blog/county-cargo-warri-to-uk-family.jpg', width: 1200, height: 675, alt: 'County Cargo collecting a sealed barrel in Warri for shipping to the UK' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Warri to the UK | County Cargo',
    description: 'Ship cargo from Warri to the UK with County Cargo. Door-to-door collection across Delta State, air and sea freight, full tracking and UK customs clearance.',
    images: ['https://countycargo.com/images/blog/county-cargo-warri-to-uk-family.jpg'],
  },
};

export default function CargoWarriToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-warri-to-uk';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Warri to the UK',
        description: 'Door-to-door air and sea freight collection across Delta State with delivery to all UK addresses.',
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
        areaServed: [{ '@type': 'City', name: 'Warri' }, { '@type': 'Country', name: 'United Kingdom' }],
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: articleUrl },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do you collect from Warri directly?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — we collect from your address across Warri including GRA, Effurun, Ekpan, Ugbuwangue, Okumagba, Okirigwe, and Agbarho. Collections from other Delta State towns can be arranged.' } },
          { '@type': 'Question', name: 'How long does shipping from Warri to the UK take?', acceptedAnswer: { '@type': 'Answer', text: `Air freight from Warri to the UK takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` } },
          { '@type': 'Question', name: 'What can I send from Warri to the UK?', acceptedAnswer: { '@type': 'Answer', text: 'Dried foodstuffs, clothing, personal belongings, cosmetics, electronics (with receipt), medication (with prescription if required), and documents.' } },
          { '@type': 'Question', name: 'What is the cheapest way to ship from Warri to the UK?', acceptedAnswer: { '@type': 'Answer', text: `Consolidated sea freight is the most affordable option for heavy or bulky shipments, arriving in approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` } },
          { '@type': 'Question', name: 'How do I get a quote for shipping from Warri to the UK?', acceptedAnswer: { '@type': 'Answer', text: 'Contact us on WhatsApp or phone with your contents list, estimated weight, and UK delivery postcode. We send a quote and arrange your doorstep collection.' } },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Warri to the UK | County Cargo',
        description: 'Ship cargo from Warri to the UK with County Cargo. Door-to-door collection across Delta State, air and sea freight, full tracking and UK customs clearance.',
        image: 'https://countycargo.com/images/blog/county-cargo-warri-to-uk-family.jpg',
        datePublished: '2026-09-10T08:00:00+01:00',
        dateModified: '2026-09-10T08:00:00+01:00',
        author: { '@type': 'Organization', name: 'County Cargo Delta State Logistics Team', url: 'https://countycargo.com' },
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
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Cargo Warri to UK' }]} />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">South-South Nigeria Route</span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500"><Calendar className="w-3.5 h-3.5" /> 10 September 2026</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cargo From Warri to the UK: Door-to-Door Freight
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Warri&apos;s energy — its music, culture, and entrepreneurial spirit — has reached every major UK city. County Cargo makes the physical connection easy: doorstep collection across Delta State, air and sea freight, delivered to any UK address.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">CC</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Delta State Logistics Team</p>
                  <p className="text-xs text-gray-500">South-South Hub</p>
                </div>
              </div>
              <SocialShare title="Cargo From Warri to the UK | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image src="/images/blog/county-cargo-warri-to-uk-family.jpg" alt="County Cargo collecting a sealed barrel in Warri for shipping to the UK" fill className="object-cover" priority />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700" /> Key Route Facts: Warri to UK
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
                <p className="font-semibold text-emerald-900">Delta State Pickup</p>
                <p className="text-lg font-bold text-primary mt-0.5">Direct Doorstep</p>
                <p className="text-xs text-gray-600">GRA, Effurun, Ekpan &amp; more</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shipping From Warri to the UK</h2>
              <p className="leading-relaxed">
                Warri people are known for two things: liveliness and loyalty to family. That loyalty means regular care packages — foodstuffs, clothing, provisions — making their way from GRA and Effurun to addresses in London, Birmingham, Coventry, and beyond. County Cargo collects from your Warri doorstep and handles every step to UK delivery.
              </p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Who Ships from Warri</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Families sending provisions:</strong> Dry fish, banga soup ingredients, dried crayfish, periwinkle, and okro that cannot be sourced in the UK.</li>
                <li><strong>Students and young professionals:</strong> Sending personal effects, clothing, and documents ahead of a UK move or study programme.</li>
                <li><strong>Business owners:</strong> Exporting handcrafted goods, fabrics, and commercial stock to the UK.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Air Freight or Sea Freight?</h3>
              <p className="leading-relaxed"><strong>Air freight</strong> delivers door to door in <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>. Best for urgent or lighter shipments.</p>
              <p className="leading-relaxed"><strong>Sea freight</strong> is built for volume — barrels, furniture, and bulk goods at a much lower cost per kilogram, arriving in approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Collection Areas in Warri and Delta State</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                {['GRA', 'Effurun', 'Ekpan', 'Ugbuwangue', 'Okumagba', 'Okirigwe', 'Agbarho', 'Aghalokpe', 'Ughelli', 'Sapele', 'Asaba', 'Abraka'].map((area) => (
                  <div key={area} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {area}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Customs and UK Import Rules</h3>
              <p className="leading-relaxed">Personal effects and genuine gifts under UK thresholds clear without import duty. Commercial shipments need a commercial invoice and declared value. We handle the paperwork — accuracy always speeds clearance.</p>
            </section>
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Your Warri Collection</h3>
              <p className="leading-relaxed">Contact us via WhatsApp or phone with your contents list, estimated weight, and UK postcode. We confirm your quote, schedule a Warri collection, and issue a tracking reference at pickup.</p>
            </section>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">More Nigeria to UK Shipping Routes</h3>
            <p className="text-sm text-blue-900 mb-4">Shipping from Port Harcourt or looking for our full Nigeria to UK guide?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/blog/cargo-port-harcourt-to-uk" className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group">
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Cargo From Port Harcourt to the UK &rarr;</p>
                <p className="text-xs text-gray-600 mt-1">Door-to-door freight from Rivers State to UK addresses.</p>
              </Link>
              <Link href="/shipping-from-nigeria-to-uk" className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group">
                <p className="text-xs font-semibold text-primary uppercase">Main Hub Page</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Nigeria to UK Shipping &amp; Freight Services Hub &rarr;</p>
                <p className="text-xs text-gray-600 mt-1">Full pricing, customs documentation, packaging rules, and instant quote.</p>
              </Link>
            </div>
          </div>

          <section className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions: Warri to UK Shipping</h3>
            <div className="space-y-4">
              {[
                { q: 'Do you collect from Warri directly?', a: 'Yes — we collect from your address across Warri including GRA, Effurun, Ekpan, Ugbuwangue, Okumagba, Okirigwe, and Agbarho. Collections from other Delta State towns can be arranged.' },
                { q: 'How long does shipping from Warri to the UK take?', a: `Air freight takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` },
                { q: 'What can I send from Warri to the UK?', a: 'Dried foodstuffs, clothing, personal belongings, cosmetics, electronics (with receipt), medication (with prescription if required), and documents.' },
                { q: 'What is the cheapest way to ship from Warri to the UK?', a: `Consolidated sea freight is the most affordable option for heavy or bulky shipments, arriving in approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}.` },
                { q: 'How do I get a quote for shipping from Warri to the UK?', a: 'Contact us on WhatsApp or phone with your contents list, estimated weight, and UK delivery postcode. We send a quote and arrange your doorstep collection.' },
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
              <h3 className="text-2xl font-extrabold text-white">Ship Directly from Warri to the UK</h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">Doorstep collection across Delta State. Reliable delivery to any UK address.</p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20Warri%20to%20the%20UK" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold gap-2">
                  <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
                </Button>
              </a>
              <Link href="/shipping-from-nigeria-to-uk">
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
