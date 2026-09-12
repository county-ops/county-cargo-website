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
  GraduationCap,
  Users,
  Scale,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cargo From Abuja to the UK | Students & Families | County Cargo',
  description:
    'Send cargo from Abuja to anywhere in the UK. Student shipping, family parcels and business freight, collected across the FCT and tracked door to door.',
  keywords:
    'cargo Abuja to UK, shipping Abuja to United Kingdom, Abuja to UK student shipping, send luggage Abuja to UK, student excess baggage Abuja to UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/cargo-abuja-to-uk',
  },
  openGraph: {
    title: 'Cargo From Abuja to the UK | Students & Families | County Cargo',
    description:
      'Send cargo from Abuja to anywhere in the UK. Student shipping, family parcels and business freight, collected across the FCT and tracked door to door.',
    url: 'https://countycargo.com/blog/cargo-abuja-to-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/county-cargo-abuja-to-uk-student.jpg',
        width: 1200,
        height: 675,
        alt: 'Student in Abuja packing a County Cargo carton of belongings to ship ahead to a UK university',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo From Abuja to the UK | Students & Families | County Cargo',
    description:
      'Send cargo from Abuja to anywhere in the UK. Student shipping, family parcels and business freight, collected across the FCT and tracked door to door.',
    images: [
      'https://countycargo.com/images/blog/county-cargo-abuja-to-uk-student.jpg',
    ],
  },
};

export default function CargoAbujaToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/cargo-abuja-to-uk';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'International cargo and freight forwarding',
        name: 'Cargo from Abuja to the UK',
        description:
          'Specialist student shipping, family parcel delivery, and commercial freight forwarding from Abuja FCT to nationwide UK destinations.',
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
            name: 'When should students ship to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Book collection 3 to 4 weeks before your flight date for sea freight, or 10 to 14 days prior for standard air cargo so that your consignment arrives comfortably after your official move-in date.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you deliver to university halls of residence?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, provided your student halls reception accepts parcel deliveries and you have officially completed move-in check-in. Always check with your accommodation reception team beforehand.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is shipping cheaper than excess baggage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — significantly cheaper. Airlines charge punitive excess luggage fees for anything exceeding the standard 23kg allowance, often charging £150 or more per extra suitcase, whereas cargo shipping is priced economically per kilogram.',
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Cargo From Abuja to the UK | Students & Families | County Cargo',
        description:
          'Send cargo from Abuja to anywhere in the UK. Student shipping, family parcels and business freight, collected across the FCT and tracked door to door.',
        image: 'https://countycargo.com/images/blog/county-cargo-abuja-to-uk-student.jpg',
        datePublished: '2026-09-07T08:00:00+01:00',
        dateModified: '2026-09-07T08:00:00+01:00',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Student Services Team',
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
              { label: 'Cargo Abuja to UK' },
            ]}
          />

          <header className="mt-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="bg-primary/10 px-2.5 py-1 rounded-full">
                Student &amp; Family Relocation
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> 7 September 2026
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cargo From Abuja to the UK: Students, Families and Business
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Every September and January, thousands of Nigerian students and relocating families arrive at UK universities and cities. Learn how shipping ahead saves hundreds of pounds compared to airport excess baggage.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  CC
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">County Cargo Student Services Team</p>
                  <p className="text-xs text-gray-500">Abuja Desk • Wuye Market</p>
                </div>
              </div>
              <SocialShare title="Cargo From Abuja to the UK | Students & Families | County Cargo" url={articleUrl} />
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/county-cargo-abuja-to-uk-student.jpg"
              alt="Student in Abuja packing a County Cargo carton of belongings to ship ahead to a UK university"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Route Summary Card */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-bold text-purple-950 mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-700" /> Key Facts: Abuja to UK Student &amp; Family Shipping
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-purple-950">
              <div className="bg-white/80 p-3 rounded-xl border border-purple-100">
                <p className="font-semibold text-purple-900">Air Freight Transit</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</p>
                <p className="text-xs text-gray-600">Urgent items, books &amp; personal bags</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-purple-100">
                <p className="font-semibold text-purple-900">Sea Cargo Transit</p>
                <p className="text-lg font-bold text-primary mt-0.5">{SHIPPING_TIMEFRAMES.SEA_CARGO}</p>
                <p className="text-xs text-gray-600">Cost-effective barrels &amp; large trunks</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-purple-100">
                <p className="font-semibold text-purple-900">University Delivery</p>
                <p className="text-lg font-bold text-primary mt-0.5">All UK Campuses</p>
                <p className="text-xs text-gray-600">Manchester, Leeds, Birmingham, etc.</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Cargo From Abuja to the UK: Students, Families and Business
              </h2>
              <p className="leading-relaxed">
                Every September and January, thousands of Nigerian students arrive at UK universities with a fraction of what they need, because airline baggage allowances are unforgiving and excess baggage charges are punishing. Shipping ahead is almost always cheaper — and County Cargo runs the Abuja-to-UK route with the academic calendar in mind.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Shipping Ahead for University
              </h3>
              <p className="leading-relaxed">
                Book collection <strong>3 to 4 weeks</strong> before your travel date and your belongings can be waiting safely in the UK ready for your term-time arrival. What students typically ship:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Heavy winter clothing, thermal coats, boots, and scarves</li>
                <li>Bedding, duvets, blankets, and towels</li>
                <li>Kitchen equipment, compact pressure cookers, and familiar cooking utensils</li>
                <li>Hardcover textbooks, study materials, and binders</li>
                <li>Approved dry packaged foodstuffs from home (garri, egusi, seasoning cubes, dried crayfish)</li>
                <li>Study laptops, tablets, and academic stationery</li>
              </ul>
              <p className="leading-relaxed">
                We deliver to university halls, private student accommodations (PBSA), and private residential tenancies across every UK university town:
              </p>
              <p className="leading-relaxed font-semibold text-gray-800">
                Manchester, Birmingham, Leeds, Sheffield, Nottingham, Coventry, Leicester, Liverpool, Newcastle, Glasgow, Edinburgh, Cardiff, Bristol, and London.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-950 text-sm">
                <p className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> A Word on Halls of Residence Deliveries:
                </p>
                <p className="mt-1 leading-relaxed">
                  Most university student accommodations will not accept parcels on your behalf before your official move-in date. Time your shipment so it arrives shortly after you check in, or arrange delivery to an established friend or family member already resident in the UK.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Family Parcels
              </h3>
              <p className="leading-relaxed">
                Sending items to family across the UK? Traditional dress for weddings and graduations, authentic food supplies from home, bespoke lace fabric, and gifts for children and grandchildren move seamlessly on our standard air or sea service depending on your budget and urgency.
              </p>
              <p className="leading-relaxed">
                Dried and processed foods are completely fine; fresh meat, unpreserved fish, and raw plants are prohibited under UK regulations.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Business Freight
              </h3>
              <p className="leading-relaxed">
                Abuja businesses ship commercial samples, trade goods, retail fashion lines, and exhibition materials with export documentation, packing lists, and commercial invoices prepared directly by our team.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Collection Across the FCT and Surrounding States
              </h3>
              <p className="leading-relaxed">
                We collect throughout Abuja and neighboring locations:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-sm font-medium text-gray-800">
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Maitama &amp; Asokoro
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Wuse &amp; Garki
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Gwarinpa &amp; Jabi
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Lugbe &amp; Airport Rd
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Kubwa &amp; Bwari
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Nyanya &amp; Mararaba
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Suleja (Niger State)
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Keffi &amp; Nasarawa
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                What It Costs: Transparent Chargeable Weight
              </h3>
              <p className="leading-relaxed">
                Freight is priced on chargeable weight, which is the greater of actual gross weight or volumetric weight:
              </p>
              <div className="p-4 bg-gray-100 rounded-xl font-mono text-sm text-gray-800 my-2">
                Volumetric Weight (kg) = [Length (cm) × Width (cm) × Height (cm)] / 6,000
              </div>
              <p className="leading-relaxed">
                A large, light box with empty air can cost more than a compact, heavy package. If you are budget-conscious, pack densely, nest items within shoes and pots, and avoid oversized boxes.
              </p>
            </section>
          </div>

          {/* Cross-linking Cluster Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-blue-950 mb-2">
              Explore Related Abuja &amp; UK Shipping Guides
            </h3>
            <p className="text-sm text-blue-900 mb-4">
              Sending documents or corporate cargo directly to London, or need full pricing charts? Check our sister guides:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/cargo-abuja-to-london"
                className="p-4 bg-white rounded-xl border border-blue-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-primary uppercase">Sister Guide</p>
                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Cargo From Abuja to London: Business &amp; Family &rarr;
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Fast tracked document courier and corporate consignments to the capital.
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
              Frequently Asked Questions: Abuja to UK Shipping
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  When should students ship to the UK?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Book collection <strong>3 to 4 weeks</strong> before your flight so your shipment arrives right after your official move-in date, rather than before when halls cannot accept it.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Can you deliver to university halls of residence?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Yes, provided your student accommodation accepts parcels and you have moved in. Always double-check with your hall&apos;s reception team before scheduling.
                </p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base">
                  Is shipping cheaper than excess baggage?
                </h4>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  For most students, yes — significantly, especially on anything over 23kg. Airlines charge hundreds of pounds for additional suitcases, while cargo shipping offers straightforward per-kilo pricing.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Planning Your Move from Abuja to the UK?
              </h3>
              <p className="mt-2 text-gray-300 text-sm max-w-xl leading-relaxed">
                Avoid heavy airport luggage fees. Let County Cargo collect from your Abuja doorstep and deliver smoothly to your UK student accommodation or residence.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20am%20a%20student%2Ffamily%20shipping%20from%20Abuja%20to%20the%20UK"
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
