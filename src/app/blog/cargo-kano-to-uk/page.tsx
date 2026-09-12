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
  Ship,
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
  Layers,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cargo From Kano to the UK | Collection & Delivery | County Cargo',
  description:
    'Ship cargo from Kano to the UK with County Cargo. Collection across Kano State, consolidated freight and tracked door-to-door UK delivery.',
  keywords:
    'cargo Kano to UK, shipping from Kano to United Kingdom, Kano to London cargo, send parcel Kano to UK, Kano leather export UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-kano-to-uk',
  },
  openGraph: {
    title: 'Cargo From Kano to the UK | Collection & Delivery | County Cargo',
    description:
      'Ship cargo from Kano to the UK with County Cargo. Collection across Kano State, consolidated freight and tracked door-to-door UK delivery.',
    url: 'https://countycargo.com/blog/cargo-kano-to-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-kano-to-uk-trade-goods.jpg',
        width: 1200,
        height: 675,
        alt: 'Leather goods and textiles being packed in Kano for County Cargo shipping to the UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Kano to the UK | Collection & Delivery | County Cargo',
    description:
      'Ship cargo from Kano to the UK with County Cargo. Collection across Kano State, consolidated freight and tracked door-to-door UK delivery.',
    images: [
      'https://countycargo.com/images/blog/county-cargo-kano-to-uk-trade-goods.jpg',
    ],
  },
};

export default function CargoKanoToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-kano-to-uk';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Kano to the UK',
        description:
          'Direct collection in Kano State and door-to-door air and sea freight forwarding to all UK cities and addresses.',
        provider: {
          '@type': 'MovingCompany',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          telephone: '+2348110000421',
          address: [
            {
              '@type': 'PostalAddress',
              streetAddress: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi',
              addressLocality: 'Lagos',
              postalCode: '102214',
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
          { '@type': 'City', name: 'Kano' },
          { '@type': 'Country', name: 'United Kingdom' },
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
            name: 'Do you collect from Kano, or do I need to send goods to Lagos first?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We collect directly from your location in Kano. You do not need to arrange your own domestic transport down to Lagos or manage multiple courier handovers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I export leather goods from Kano to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, commercial leather goods, processed hides, and artisan accessories are exportable. Because animal-derived products face UK import controls, speak with our export documentation team first so all required veterinary certifications and declarations are in place.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does it take from Kano to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Air freight takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR} door to door; sea freight takes approximately ${SHIPPING_TIMEFRAMES.SEA_CARGO}, which includes domestic northern consolidation and onward UK delivery.`,
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Kano to the UK | Collection & Delivery | County Cargo',
        description:
          'Ship cargo from Kano to the UK with County Cargo. Collection across Kano State, consolidated freight and tracked door-to-door UK delivery.',
        image: 'https://countycargo.com/images/blog/county-cargo-kano-to-uk-trade-goods.jpg',
        datePublished: '2026-09-07T08:00:00+01:00',
        dateModified: '2026-09-07T08:00:00+01:00',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Northern Nigeria Operations',
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
              { label: 'Cargo Kano to UK' },
            ]}
          />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">
                Northern Nigeria Routes
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> 7 September 2026
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cargo From Kano to the UK: Northern Nigeria&apos;s Route to Britain
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Northern Nigeria is often treated as an afterthought by freight companies, with customers told to arrange their own transport to Lagos. County Cargo collects directly in Kano and delivers door-to-door anywhere in the UK.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  CC
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Northern Nigeria Operations</p>
                  <p className="text-xs text-gray-500">Direct Kano Logistics Support</p>
                </div>
              </div>
              <SocialShare title="Cargo From Kano to the UK | Collection & Delivery | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-kano-to-uk-trade-goods.jpg"
              alt="Leather goods and textiles being packed in Kano for County Cargo shipping to the UK"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Route Summary Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-amber-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" /> Key Route Facts: Kano to UK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-amber-950">
              <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-900">Air Freight Transit</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p>
                <p className="text-xs text-gray-600">Tracked door to door</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-900">Sea Cargo Transit</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p>
                <p className="text-xs text-gray-600">Economical for bulky artisan goods</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-900">Direct Collection</p>
                <p className="text-lg font-bold text-primary mt-0.5">Across Kano</p>
                <p className="text-xs text-gray-600">No need to send down to Lagos</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Cargo From Kano to the UK: Northern Nigeria&apos;s Route to Britain
              </h2>
              <p className="leading-relaxed">
                Northern Nigeria is often treated as an afterthought by freight companies, with customers told to arrange their own transport down to Lagos before anything can be shipped. County Cargo collects directly in Kano.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Why the Kano Route Matters
              </h3>
              <p className="leading-relaxed">
                Kano is the commercial heart of northern Nigeria and one of the oldest and most historic trading cities in West Africa. The goods that move from Kano to Britain reflect that heritage:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Fine Leather Goods &amp; Tanned Hides:</strong> Handcrafted bags, sandals, slippers, ottomans, and finished leather upholstery materials.</li>
                <li><strong>Textiles &amp; Traditional Fabric:</strong> Indigo dyed cloths, embroidery fabrics, traditional northern attires, and bespoke brocade.</li>
                <li><strong>Kola Nut &amp; Northern Foodstuffs:</strong> Kilishi (spiced beef jerky), dried tiger nuts, groundnut products, sesame seeds, and local spices.</li>
                <li><strong>Artisan Craft Goods:</strong> Handcrafted brass items, decorative woodwork, woven baskets, and cultural artifacts.</li>
              </ul>
              <p className="leading-relaxed">
                Alongside the trade traffic sits a steady flow of family parcels connecting relatives across London, Manchester, Leeds, and Birmingham.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                How the Kano Route Works
              </h3>
              <p className="leading-relaxed">
                Consignments are collected directly at your address in Kano, consolidated, and moved to the departure terminal for onward air or sea freight to Britain.
              </p>
              <p className="leading-relaxed">
                You deal with County Cargo once, right at your doorstep in Kano, and we manage every subsequent leg. There is no separate transport for you to arrange, no night buses to coordinate, and no third-party cargo agent to chase.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Collection Across Kano State
              </h3>
              <p className="leading-relaxed">
                We collect throughout the Kano metropolitan area and surrounding commercial zones:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Fagge
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Nassarawa
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Bompai Industrial
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Sabon Gari
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Tarauni
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Gwale
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Dala
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Wudil &amp; Gaya
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Trade Goods and Export Documentation
              </h3>
              <p className="leading-relaxed">
                If you are exporting commercially, the paperwork is just as vital as the packing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We prepare the commercial invoice, itemised packing list, and customs export entry.</li>
                <li>
                  <strong>Special Regulations for Leather:</strong> Finished leather goods and animal-derived products face specific UK import controls. Raw, untreated hides require statutory veterinary and phytosanitary certificates before export. Consult our logistics team before dispatch so your paperwork is verified.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Family and Personal Parcels
              </h3>
              <p className="leading-relaxed">
                Clothing, woven fabrics, dried approved foods, books, and family gifts all travel on our standard scheduled air and sea services. Dried spices and processed foodstuffs are welcome; raw, fresh meat, unpreserved seafood, and agricultural seeds are strictly prohibited by UK border health inspectors.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Doorstep Delivery Across the United Kingdom
              </h3>
              <p className="leading-relaxed">
                Every consignment is given a unique tracking number at the point of collection in Kano. Once the freight lands in the UK and clears customs, it is dispatched to any UK address — from London, Birmingham, and Manchester to Glasgow, Edinburgh, and Belfast. Recipients receive proactive text messages with an allocated delivery window.
              </p>
            </section>
          </div>

          {/* Cross-linking Cluster Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">
              Explore Northern Nigeria &amp; UK Shipping Routes
            </h3>
            <p className="text-sm text-blue-900 mb-4">
              Need collection in neighboring Kaduna State, or full details on our nationwide freight hub? Explore these connected guides:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/cargo-kaduna-to-uk"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Cargo From Kaduna to the UK: Door-to-Door Freight &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Crossroads freight, personal effects, and agricultural cargo from Kaduna State.
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
                  Full pricing, customs documentation, packaging rules, and instant quote calculator.
                </p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions: Kano to UK Cargo
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Do you collect from Kano, or do I need to send goods to Lagos first?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  We collect directly in Kano. You do not need to arrange your own transport down to Lagos or manage complex third-party handoffs.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Can I export leather goods from Kano to the UK?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Yes, commercial finished leather products and artisan crafts can be exported. Because animal-derived products face UK veterinary controls, please talk to our team before booking so all paperwork is properly certified.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  How long does it take from Kano to the UK?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Standard air freight takes <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong> door to door. Sea freight takes approximately <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>, inclusive of domestic consolidation.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Book Reliable Cargo Pickup in Kano Today
              </h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">
                Send artisan goods, textiles, and family packages from Kano to any destination in the UK with end-to-end tracking and direct collection.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20ship%20cargo%20from%20Kano%20to%20the%20UK"
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
