import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import {
  Plane,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  FileText,
  AlertTriangle,
  Package,
  Boxes,
  HelpCircle,
  Truck,
  Warehouse,
  Zap,
  Scale,
  DollarSign,
  Utensils,
  Check,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from Nigeria to the UK with County Cargo | Rates & Guide',
  description:
    'Reliable air cargo from Nigeria to the UK. ₦10,500/kg Value shipping (5–10 working days, 10kg min), 48-Hour Special Express, packaging rules, foodstuff customs clearance, and UK doorstep delivery.',
  keywords:
    'Shipping from Nigeria to the UK, Cargo from Nigeria to the UK, Air cargo from Nigeria, International shipping from Nigeria, Express shipping from Nigeria, Lagos to London air freight, Abuja to UK shipping, send foodstuff to UK, County Cargo UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-nigeria-to-the-uk-with-county-cargo',
  },
  openGraph: {
    title: 'Shipping from Nigeria to the UK with County Cargo | Rates & Guide',
    description:
      'Reliable air cargo from Nigeria to the UK. ₦10,500/kg Value shipping (5–10 working days, 10kg min), 48-Hour Special Express, packaging rules, foodstuff customs clearance, and UK doorstep delivery.',
    url: 'https://countycargo.com/blog/shipping-from-nigeria-to-the-uk-with-county-cargo',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-09-20T08:00:00.000Z',
    modifiedTime: '2026-09-20T08:00:00.000Z',
    authors: ['County Cargo UK Trade Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg',
        width: 1200,
        height: 675,
        alt: 'Commercial air cargo boxes and palletized export freight arriving in the UK from Nigeria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping from Nigeria to the UK with County Cargo',
    description:
      'Fast, reliable air freight and express cargo from Nigeria to the United Kingdom. ₦10,500/kg Value air shipping, 5–10 working days transit.',
    images: ['https://countycargo.com/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg'],
  },
};

const ukFaqs = [
  {
    question: 'What is the current rate and minimum weight for shipping from Nigeria to the UK?',
    answer:
      'For our economical Value Shipping (Air Cargo), rates start at ₦10,500 per kg for drop-offs at our Lagos Hub (Ladipo-Oshodi Plaza) and ₦11,000 per kg for drop-offs at our Abuja Hub (Wuye Ultra Modern Market). The minimum billable weight for Value Shipping is strictly 10 kg. For smaller parcels starting from 1 kg, our Express Courier service is available with delivery in 3 to 5 working days.',
  },
  {
    question: 'How long does delivery take from Nigeria to the UK?',
    answer:
      'County Cargo provides three scheduled service tiers: (1) Special Express (48-Hour) provides a premium 48-hour flight connection exclusively between Nigeria and the UK; (2) Express Shipping delivers door-to-door in 3 to 5 working days; and (3) Value Shipping delivers across the UK in 5–10 working days from flight departure.',
  },
  {
    question: 'Can I send traditional Nigerian foodstuffs to friends and family in the UK?',
    answer:
      'Yes. Commercially processed, completely dehydrated, and vacuum-sealed dry food products are fully permitted. This includes dried crayfish, yam flour (elubo), ground egusi, ogbono, garri, dried pepper, spices, and dried fish. However, fresh meats, unpasteurised dairy, wet fish, and garden eggs with soil residue are strictly prohibited under UK DEFRA bio-security regulations.',
  },
  {
    question: 'Where can I drop off my parcel in Lagos and Abuja?',
    answer:
      'In Lagos, you can drop off at our central hub: Suite F8, Magnet Shopping Plaza, 525 Agege Motor Road, Ladipo-Oshodi. In Abuja, drop off at Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street. Optional doorstep pickup is also available across Lagos and Abuja for a flat fee of ₦5,000.',
  },
  {
    question: 'How are shipments cleared through UK customs?',
    answer:
      'All County Cargo air freight arrives on scheduled cargo flights into the UK and is transferred to our bonded customs clearing operations and central distribution depot at Unit G6, Queens Dock Commercial Centre, Norfolk Street, Liverpool (L1 0BG). From here, parcels are sorted and handed over for final mile courier delivery to doorsteps across London, Manchester, Birmingham, Leeds, Glasgow, and every UK postcode.',
  },
  {
    question: 'How is volumetric dimensional weight calculated?',
    answer:
      'Under international IATA air freight rules, billable weight is the higher figure between actual scale weight (kg) and dimensional volumetric weight. The volumetric weight formula is: [Length (cm) × Width (cm) × Height (cm)] ÷ 5,000. If your parcel is lightweight but bulky (e.g. traditional caps, textiles, or puffed packaging), the volumetric weight applies.',
  },
];

export default function ShippingNigeriaToUkPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-from-nigeria-to-the-uk-with-county-cargo';

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://countycargo.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://countycargo.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Shipping from Nigeria to the UK with County Cargo',
            item: articleUrl,
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: 'Shipping from Nigeria to the UK with County Cargo | Rates, Timelines & Guide',
        description:
          'Comprehensive guide to air cargo from Nigeria to the UK. ₦10,500/kg Value shipping (5–10 working days), 48-Hour Special Express, packaging rules, foodstuff clearance, and UK doorstep delivery.',
        image: 'https://countycargo.com/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg',
        datePublished: '2026-09-20T08:00:00+01:00',
        dateModified: '2026-09-20T08:00:00.000Z',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo UK Trade Logistics Team',
          url: 'https://countycargo.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'County Cargo',
          url: 'https://countycargo.com',
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
      {
        '@type': 'FAQPage',
        mainEntity: ukFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={combinedSchema} />
      <Header />

      <main className="pt-20 sm:pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Shipping from Nigeria to the UK' },
            ]}
          />

          <header className="mt-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Nigeria &rarr; United Kingdom Trade &bull; Verified Route
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Updated September 2026
              </span>
              <span className="text-gray-400 text-xs">&bull;</span>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> HMRC &amp; DEFRA Compliant
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Shipping from Nigeria to the UK with County Cargo: The Complete Guide
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Looking for dependable, transparent, and cost-effective <strong>cargo from Nigeria to the UK</strong>? Whether you are a business sending commercial merchandise, a student dispatching documents, or a family shipping authentic dried foodstuffs to relatives in the UK, County Cargo provides daily air dispatches, verified customs handling, and nationwide doorstep delivery.
            </p>

            <div className="mt-6">
              <SocialShare
                title="Shipping from Nigeria to the UK with County Cargo | Rates, Timelines & Guide"
                url={articleUrl}
              />
            </div>
          </header>

          {/* Featured Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg"
              alt="Commercial air cargo boxes and palletized export freight arriving in the UK from Nigeria"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Quick Snapshot Highlight */}
          <section
            aria-label="Route Overview"
            className="mb-12 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/70 rounded-2xl p-6 sm:p-8 shadow-xs"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Route Snapshot: Nigeria to United Kingdom
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Standard Transit</p>
                <p className="text-xl font-extrabold text-primary mt-1">5–10 Days</p>
                <p className="text-xs text-gray-500 mt-0.5">Value Air Cargo</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Minimum Weight</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">10 kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Value service (1kg Express)</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Value Freight Rate</p>
                <p className="text-xl font-extrabold text-gray-900 mt-1">₦10,500/kg</p>
                <p className="text-xs text-gray-500 mt-0.5">Lagos Hub drop-off</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Special Express</p>
                <p className="text-xl font-extrabold text-purple-700 mt-1">48 Hours</p>
                <p className="text-xs text-gray-500 mt-0.5">Direct flight connection</p>
              </div>
            </div>
          </section>

          {/* Article Main Body */}
          <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed space-y-10 text-base sm:text-lg">
            
            {/* Section 1: Introduction */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                International Shipping from Nigeria to the UK: What You Need to Know
              </h2>
              <p>
                The United Kingdom is home to one of the largest Nigerian diaspora communities in the world. Every week, tonnes of essential consignments—ranging from traditional textiles, elubo, and spices to commercial e-commerce goods and corporate documents—move between Nigerian commercial centres and major British cities such as London, Manchester, Birmingham, Leeds, and Liverpool.
              </p>
              <p>
                However, navigating <strong>international shipping from Nigeria</strong> can often be frustrating when faced with unexpected customs holds, inconsistent delivery timeframes, or opaque pricing structures. With County Cargo, your shipments are managed through our direct air cargo pipeline, eliminating unnecessary middlemen and ensuring complete regulatory compliance from drop-off in Ikeja or Wuye to final delivery at your UK doorstep.
              </p>
            </section>

            {/* Section 2: Available Shipping Options */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Available Shipping Options &amp; Verified Central Rates
              </h2>
              <p>
                To cater to diverse logistical needs and budgets, County Cargo offers three distinct service tiers for air cargo moving from Nigeria to the United Kingdom. All prices and service limits are derived directly from our central, verified pricing matrix:
              </p>

              <div className="space-y-4 my-6 not-prose">
                <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                      <Plane className="w-5 h-5 text-primary" />
                      1. Value Shipping (Air Cargo Consolidation) &bull; Best Value
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 self-start sm:self-auto">
                      5–10 Working Days
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Our flagship, highly economical consolidated air freight service. Cargo is batched for weekly scheduled flights from Lagos and Abuja, cleared through customs at our Queens Dock depot in Liverpool (L1 0BG), and dispatched nationwide to all UK postcodes.
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1 mb-3">
                    <li>&bull; <strong>Lagos Drop-Off:</strong> ₦10,500 / kg</li>
                    <li>&bull; <strong>Abuja Drop-Off:</strong> ₦11,000 / kg</li>
                    <li>&bull; <strong>Minimum Chargeable Weight:</strong> 10 kg</li>
                    <li>&bull; <strong>Handling Fee:</strong> ₦0 (Included)</li>
                    <li>&bull; <strong>Optional Doorstep Collection:</strong> ₦5,000 (Lagos or Abuja)</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-purple-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      2. Special Express Shipping (48-Hour Connection) &bull; Fastest
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 self-start sm:self-auto">
                      48-Hour Flight Connection
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    An exclusive priority direct air connection operating strictly between Nigeria and the UK. Ideal for highly urgent business contracts, critical time-sensitive documents, and emergency supplies.
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <li>&bull; <strong>Freight Rate:</strong> £22.00 / kg (~₦41,800/kg) + £20 handling fee</li>
                    <li>&bull; <strong>Minimum Chargeable Weight:</strong> 1 kg</li>
                    <li>&bull; <strong>Dispatch:</strong> Direct flight departure from Murtala Muhammed Airport (LOS)</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-emerald-900 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-emerald-600" />
                      3. Express Shipping (DHL Partner Network) &bull; Priority Doorstep
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                      3 to 5 Working Days
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Rapid international courier transit via our integrated DHL Global partner pipeline. Consignments are processed on the next available commercial flight with real-time end-to-end tracking.
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <li>&bull; <strong>Transit Time:</strong> 3 to 5 working days</li>
                    <li>&bull; <strong>Minimum Chargeable Weight:</strong> 1 kg (0.5 kg increments up to 30 kg)</li>
                    <li>&bull; <strong>Export Packaging:</strong> ₦2,000/kg professional protective packing</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: How the Shipping Process Works */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Step-by-Step: How Shipping to the UK Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-2">1</div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">Book Online or Get an Estimate</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Use our central shipping calculator to determine billable weight and choose your preferred service level.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-2">2</div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">Drop-Off or Request Collection</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Deliver your boxes to our Lagos Hub (Ladipo-Oshodi Plaza) or Abuja Hub (Wuye Market), or book a ₦5,000 doorstep pickup.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-2">3</div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">Inspection &amp; Flight Departure</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Your items undergo security screening and customs documentation before departure on scheduled direct cargo flights.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-2">4</div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">UK Customs &amp; Door Delivery</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Parcels clear UK customs through our Liverpool bonded hub and are delivered directly to your recipient’s door.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Packaging and Labelling Guidance */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Packaging &amp; Labelling Guidance
              </h2>
              <p>
                Proper packaging ensures your cargo withstands international air transport and passes aviation security scanning without delays:
              </p>
              <ul className="space-y-2">
                <li>&bull; <strong>Use Double-Walled Cartons:</strong> Always pack goods in sturdy, double-walled corrugated cardboard boxes capable of handling stack pressure.</li>
                <li>&bull; <strong>Vacuum Seal All Foodstuffs:</strong> Dried foods such as crayfish, spices, and egusi must be completely dry and heat-sealed in transparent polythene or vacuum bags to prevent moisture absorption and odour release.</li>
                <li>&bull; <strong>Cushion Fragile Goods:</strong> Surround delicate items with at least 5 cm of bubble wrap, foam, or corrugated packing paper on all sides.</li>
                <li>&bull; <strong>Clear Dual-Side Labelling:</strong> Affix clear labels showing the recipient’s full legal UK name, complete street address, UK postcode, and active UK telephone number.</li>
              </ul>
            </section>

            {/* Section 5: Permitted vs Prohibited Items */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Items You Can and Cannot Send to the UK
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <h3 className="font-bold text-emerald-900 text-base mb-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" /> Permitted Items
                  </h3>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                    <li>&check; Dehydrated, vacuum-sealed foodstuffs (yam flour, egusi, ogbono, crayfish)</li>
                    <li>&check; Traditional and modern clothing, textiles, and lace (Ankara, Aso-Oke)</li>
                    <li>&check; Personal effects, footwear, and household belongings</li>
                    <li>&check; Commercial merchandise, craft items, and business samples</li>
                    <li>&check; Sealed cosmetics, black soap, and shea butter (solid/dry)</li>
                    <li>&check; Educational transcripts, books, and business documents</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50">
                  <h3 className="font-bold text-rose-900 text-base mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> Strictly Prohibited Items
                  </h3>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                    <li>&cross; Fresh or unpasteurised meats, dairy products, and wet fish</li>
                    <li>&cross; Fresh agricultural produce with soil, garden eggs, or live seeds</li>
                    <li>&cross; Unlicensed medications, prescription pharmaceuticals, or narcotics</li>
                    <li>&cross; Flammables, pressurised aerosols, perfumes, and solvent liquids</li>
                    <li>&cross; Loose lithium batteries or power banks without UN38.3 certification</li>
                    <li>&cross; Weapons, sharp objects, counterfeit currency, or cash</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                For a complete directory of aviation restrictions, consult our dedicated <Link href="/blog/prohibited-items-shipping-to-nigeria" className="text-primary underline font-medium">prohibited items guide</Link>.
              </p>
            </section>

            {/* Section 6: UK Customs and DCTS Rules */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                UK Customs &amp; Duty Information (HMRC &amp; DCTS)
              </h2>
              <p>
                Shipments entering the UK are cleared under HM Revenue and Customs (HMRC) regulations. Under the <strong>UK Developing Countries Trading Scheme (DCTS)</strong>, thousands of manufactured and agricultural products originating from Nigeria qualify for <strong>0% customs tariffs</strong> upon import.
              </p>
              <p>
                Personal gifts valued below £39 are typically exempt from import VAT. For commercial shipments, standard UK VAT (20%) applies to the declared value. Because County Cargo operates a physical receiving depot at Queens Dock in Liverpool (L1 0BG), our in-house compliance specialists oversee bonded customs clearance directly, shielding customers from arbitrary third-party demurrage fees.
              </p>
            </section>

            {/* Section 7: Why Choose County Cargo */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Why Choose County Cargo for Your UK Shipments?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Physical Depots in Both Countries
                  </h3>
                  <p className="text-xs text-gray-600">
                    We own and operate physical hubs in Lagos, Abuja, and Liverpool—not outsourced third-party broker agents.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent All-Inclusive Rates
                  </h3>
                  <p className="text-xs text-gray-600">
                    Zero surprise terminal charges upon arrival in the UK. What you are quoted is what you pay.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 48-Hour Special Express Option
                  </h3>
                  <p className="text-xs text-gray-600">
                    The only dedicated 48-hour scheduled air connection exclusively connecting Nigeria and the UK.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Nationwide Doorstep Delivery
                  </h3>
                  <p className="text-xs text-gray-600">
                    Seamless dispatch across London, Manchester, Birmingham, Leeds, Scotland, and Wales postcodes.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: FAQ Accordion */}
            <section className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Frequently Asked Questions: Shipping from Nigeria to the UK
                </h2>
              </div>
              <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-2xs not-prose">
                {ukFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-sm leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Section 9: Call to Action Block */}
            <section className="mt-12 p-8 bg-gradient-to-br from-primary to-blue-900 text-white rounded-2xl not-prose shadow-xl text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    Ready to Send Cargo to the United Kingdom?
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                    Get an instant transparent quote using our shipping calculator, register your parcel, or chat with our logistics team on WhatsApp for prompt assistance.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold w-full sm:w-auto shadow-md">
                    <Link href="/#quote">
                      Calculate Quote <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                    <a href="https://wa.me/447883309489?text=Hello%20County%20Cargo,%20I%20want%20to%20ship%20cargo%20from%20Nigeria%20to%20the%20UK" target="_blank" rel="noopener noreferrer">
                      WhatsApp Us
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-6 pt-6 border-t border-white/10 text-xs text-blue-200">
                <Link href="/shipping-from-nigeria-to-uk" className="hover:text-white underline">
                  Nigeria to UK Route Services
                </Link>
                <span>&bull;</span>
                <Link href="/export-from-nigeria-to-uk" className="hover:text-white underline">
                  UK Export Hub
                </Link>
                <span>&bull;</span>
                <Link href="/export-food-from-nigeria-to-uk" className="hover:text-white underline">
                  Food Export Guidelines
                </Link>
                <span>&bull;</span>
                <Link href="/contact" className="hover:text-white underline">
                  Contact Customer Support
                </Link>
              </div>
            </section>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
