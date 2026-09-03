import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import {
  Package,
  Ship,
  Plane,
  Truck,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
  Calendar,
  UserCheck,
  Phone,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { UsBarrelsFaq } from './faq';

export const metadata: Metadata = {
  title: 'The US Barrels Guide | Ship Barrels from USA to Nigeria | County Cargo',
  description:
    'The complete US barrels guide. Ship 55-gallon drums, boxes and personal belongings from anywhere in the USA to Nigeria with County Cargo. Affordable air and sea cargo to Lagos, Abuja and all 36 states.',
  keywords:
    'The US Barrels Guide, Shipping barrels from USA to Nigeria, Send a barrel from US to Lagos, Shipping boxes from USA to Nigeria, US to Lagos air cargo, US to Nigeria sea cargo, Affordable cargo service from USA, Door-to-door shipping from USA to Nigeria, Nigeria shipping company serving USA, Ship personal belongings from US to Nigeria, US to Abuja cargo service, Texas to Nigeria barrels, Georgia to Nigeria shipping, New York to Nigeria cargo',
  alternates: {
    canonical: 'https://countycargo.com/shipping-barrels-from-the-usa-to-nigeria',
  },
  openGraph: {
    title: 'The US Barrels Guide | Ship Barrels from USA to Nigeria | County Cargo',
    description:
      'The complete US barrels guide. Ship 55-gallon drums, boxes and personal belongings from anywhere in the USA to Nigeria with County Cargo. Affordable air and sea cargo to Lagos, Abuja and all 36 states.',
    url: 'https://countycargo.com/shipping-barrels-from-the-usa-to-nigeria',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/us-barrels-nigeria.jpg',
        alt: 'County Cargo air and ocean freight shipping barrels and boxes from across the USA to Nigeria',
        width: 1200,
        height: 630,
      },
    ],
    type: 'article',
  },
};

export default function ShippingBarrelsFromTheUsaToNigeriaPage() {
  const pageUrl = 'https://countycargo.com/shipping-barrels-from-the-usa-to-nigeria';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The US Barrels Guide: Shipping Barrels and Cargo from the USA to Nigeria',
    description:
      'Comprehensive master guide for individuals, diaspora families, churches, and businesses shipping standard barrels, boxes, household effects and personal cargo from across the United States to Nigeria.',
    image: 'https://countycargo.com/us-barrels-nigeria.jpg',
    datePublished: '2026-09-02T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo US Operations Team',
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
      '@id': pageUrl,
    },
    inLanguage: 'en-US',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shipping Barrels from USA to Nigeria',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'Country',
        name: 'Nigeria',
      },
    ],
    description:
      'Air and ocean freight coordination for shipping barrels, boxes, personal effects and commercial goods from across the United States to Lagos, Abuja, and nationwide Nigeria.',
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'US to Nigeria Shipping', href: '/ship-from-us-to-nigeria' },
            { label: 'The US Barrels Guide' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/us-barrels-nigeria.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Package className="w-3.5 h-3.5" /> The US Barrels Guide &bull; Transatlantic Air &amp; Sea Freight
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping Barrels from the USA to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              The authoritative transatlantic shipping guide for sending 55-gallon drums, boxes, household effects and personal belongings from anywhere in the USA to Lagos, Abuja, and across Nigeria.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo US Operations Team
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Freight Logistics Specialists
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" /> Published: 2 September 2026 &bull; Updated: 3 September 2026
              </span>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-10">

            {/* AI Overview Summary Box */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50/60 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-primary" /> AI Overview Summary
              </div>
              <blockquote className="text-base sm:text-lg text-secondary font-medium leading-relaxed italic m-0 p-0 border-none">
                &ldquo;County Cargo helps customers in Chicago and surrounding areas ship barrels, boxes, household goods and personal belongings to Nigeria. Customers can choose suitable air or sea cargo options, receive packing guidance and arrange delivery to Lagos, Abuja and other Nigerian destinations.&rdquo;
              </blockquote>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Sending cargo across the Atlantic requires careful planning, transparent communication and dependable logistics. At County Cargo, we support individuals, families, diaspora associations and businesses who want to send shipping barrels, heavy-duty cartons, household goods, clothing, packaged food items and permitted commercial inventory from Chicago and surrounding Illinois communities to Nigeria.
              </p>
              <p className="text-gray-700">
                Whether you are preparing a traditional 55-gallon jumbo plastic shipping drum for family in Lagos, relocating household personal effects to Abuja, or dispatching retail stock to Port Harcourt, our transatlantic freight services are designed to give you clarity on options, documentation and delivery schedules.
              </p>
            </div>

            {/* Section: Reliable Chicago-to-Nigeria Cargo Shipping */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Reliable Chicago-to-Nigeria Cargo Shipping
              </h2>
              <p className="text-gray-700">
                County Cargo coordinates end-to-end freight forwarding for customers situated across the Greater Chicago metropolitan area. While County Cargo does not operate a walk-in physical branch or local store in Chicago, we provide a seamless receiving and consolidation process that enables Illinois shippers to move cargo reliably to Nigeria.
              </p>
              <p className="text-gray-700">
                When you initiate your shipment with our team, you will receive clear, detailed instructions for sending or transporting your prepared barrel or boxes to our designated US central processing warehouse. From our specialized processing facility, shipments are weighed, measured, manifested and staged for departure.
              </p>
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-5 not-prose flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-secondary leading-relaxed">
                  <strong>Local Collection Notice:</strong> Any collection service or local freight pickup within Chicago neighborhoods or Illinois suburbs is strictly subject to scheduling, vehicle availability and advance confirmation. Alternatively, customers can utilize domestic freight carriers or drop-off partners to route their packages directly to our US receiving address.
                </p>
              </div>
            </div>

            {/* Section: What Can You Pack in a Shipping Barrel? */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                What Can You Pack in a Shipping Barrel?
              </h2>
              <p className="text-gray-700">
                Shipping barrels—both standard fiberboard drums and high-density polyethylene (plastic) drums—are widely recognized as durable, high-capacity containers for transatlantic freight. You can pack a broad range of permitted household and commercial items, including:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 my-4 not-prose">
                {[
                  { title: 'Clothing and Shoes', desc: 'New and gently used garments, traditional attire, shoes, winter coats, and baby clothes.' },
                  { title: 'Household Supplies', desc: 'Bedding, curtains, kitchen utensils, cookware, non-electric homeware, and small appliances.' },
                  { title: 'Non-Perishable Packaged Food', desc: 'Canned goods, dried grains, sealed spices, flour, powdered milk, cooking oils, and cereals.' },
                  { title: 'Toiletries & Personal Care', desc: 'Bar soaps, shampoos, sealed lotions, hair products, toothpaste, and sanitary supplies.' },
                  { title: 'Gifts & Personal Belongings', desc: 'Luggage, books, toys, souvenirs, and personal effects for family and community members.' },
                  { title: 'Approved Electronics', desc: 'Televisions, laptops, audio systems, and declared electronics (subject to battery guidelines).' },
                  { title: 'Business & Commercial Goods', desc: 'Commercial samples, tools, automotive replacement components, hardware, and shop inventory.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                    <h4 className="font-semibold text-secondary text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Warning Box */}
              <div className="bg-red-50/80 border border-red-200 rounded-xl p-6 not-prose space-y-3">
                <div className="flex items-center gap-2 text-red-900 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  Important Restricted and Prohibited Goods Warning
                </div>
                <p className="text-sm text-red-900 leading-relaxed">
                  You must never pack restricted, dangerous, leaking, highly flammable, toxic or illegal goods. Prohibited items include firearms, ammunition, fireworks, pressurized aerosols, corrosive chemicals, combustible fuels, unsealed liquids that risk leaking onto other cargo, perishable fresh meats or produce, counterfeit goods, and items strictly forbidden on the official Nigeria Customs import prohibition list.
                </p>
                <p className="text-xs text-red-800">
                  Customers should always review our{' '}
                  <Link
                    href="/blog/prohibited-items-shipping-to-nigeria"
                    className="font-semibold underline hover:text-primary"
                  >
                    Prohibited &amp; Restricted Items Guide
                  </Link>{' '}
                  and confirm any uncertain items with County Cargo before sealing their shipment.
                </p>
              </div>
            </div>

            {/* Section: Air Cargo and Sea Cargo Options */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Air Cargo and Sea Cargo Options
              </h2>
              <p className="text-gray-700">
                Understanding the differences between air freight and ocean sea freight will help you select the most practical solution for your timeline and budget:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                {/* Air Cargo Card */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                      <Plane className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Chicago to Lagos Air Cargo</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Air freight is best suited for smaller cartons, urgent documents, high-value electronics and time-sensitive cargo. Air cargo charges are based on either actual gross weight or volumetric dimensional weight—learn more in our{' '}
                      <Link
                        href="/blog/how-to-calculate-volumetric-weight"
                        className="text-primary underline font-medium"
                      >
                        volumetric weight guide
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-xs font-semibold text-primary">
                    Fastest transatlantic transit option
                  </div>
                </div>

                {/* Sea Cargo Card */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Ship className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Chicago to Nigeria Sea Cargo</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ocean container freight is the most economical and cost-effective choice for heavy standard 55-gallon drums, oversized boxes, bulky machinery and large household consignments. Sea freight is ideal when transit schedules allow for maritime voyage and port clearance.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-xs font-semibold text-emerald-700">
                    Maximum economy for heavy barrels &amp; bulk boxes
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
                <strong>Transparent Pricing Policy:</strong> Freight tariffs, sailing frequencies, air carrier schedules and fuel indices vary based on global logistics conditions. We encourage all customers to explore our{' '}
                <Link
                  href="/ship-from-us-to-nigeria"
                  className="text-primary font-semibold underline"
                >
                  US to Nigeria shipping page
                </Link>{' '}
                and contact our team to request current, route-specific rates and departure dates without unexpected surprises.
              </p>
            </div>

            {/* Section: How to Ship a Barrel from Chicago to Nigeria (8 Steps) */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                How to Ship a Barrel from Chicago to Nigeria
              </h2>
              <p className="text-gray-700">
                Shipping a barrel or carton from Illinois to Nigeria follows an organized, straightforward eight-step process:
              </p>

              <div className="space-y-4 not-prose">
                {[
                  {
                    step: '1',
                    title: 'Contact County Cargo and request a quote',
                    desc: 'Reach out to our customer support team with details of your shipment origin, planned cargo type and preferred destination city in Nigeria.',
                  },
                  {
                    step: '2',
                    title: 'Confirm the contents, size and estimated weight',
                    desc: 'Specify whether you are shipping standard plastic/fiber drums or cardboard cartons, along with an itemized breakdown of the contents.',
                  },
                  {
                    step: '3',
                    title: 'Receive the designated US warehouse instructions',
                    desc: 'We will provide you with your unique shipping identifier and complete addressing guidelines for our designated US processing facility.',
                  },
                  {
                    step: '4',
                    title: 'Pack and secure the barrel properly',
                    desc: 'Distribute weight evenly, place heavier goods at the bottom, cushion fragile items, seal all liquids in zip-lock bags, and lock the lid firmly with a metal ring clamp or heavy seal.',
                  },
                  {
                    step: '5',
                    title: 'Label the shipment with the customer’s full details',
                    desc: 'Clearly write the sender’s name, receiver’s full legal name, delivery address, and active Nigerian phone numbers directly on the exterior with waterproof marker.',
                  },
                  {
                    step: '6',
                    title: 'Complete the required shipping documentation',
                    desc: 'Submit your packing list and declared cargo value to ensure seamless customs declaration and compliance screening.',
                  },
                  {
                    step: '7',
                    title: 'Pay the confirmed shipping charges',
                    desc: 'Upon verification of physical weight and dimensions at our US facility, pay your transparent invoice so your consignment can be manifested.',
                  },
                  {
                    step: '8',
                    title: 'Receive shipment and delivery updates',
                    desc: 'Track your shipment as it moves through departure, international transit, Nigeria Customs clearance, and final-mile delivery in Nigeria.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 p-5 bg-gray-50/90 border border-gray-200 rounded-xl hover:bg-white hover:border-primary/40 transition-all shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary text-base mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Nigerian Destinations We Serve */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Nigerian Destinations We Serve
              </h2>
              <p className="text-gray-700">
                County Cargo coordinates freight forwarding and customs clearance through Nigeria’s primary entry ports, ensuring your cargo reaches destinations nationwide. We serve major commercial cities and regional hubs across the country, including:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 not-prose">
                {[
                  { name: 'Lagos', link: '/shipping-to-lagos' },
                  { name: 'Abuja (FCT)', link: '/shipping-to-abuja' },
                  { name: 'Port Harcourt', link: '/contact' },
                  { name: 'Benin City', link: '/contact' },
                  { name: 'Ibadan', link: '/contact' },
                  { name: 'Kano', link: '/shipping-to-kano' },
                  { name: 'Kaduna', link: '/shipping-to-kaduna' },
                  { name: 'Enugu', link: '/contact' },
                  { name: 'Owerri', link: '/contact' },
                  { name: 'Onitsha', link: '/contact' },
                  { name: 'Warri', link: '/contact' },
                  { name: 'Asaba', link: '/contact' },
                  { name: 'Ilorin', link: '/contact' },
                  { name: 'All 36 States', link: '/contact' },
                ].map((city, idx) => (
                  <Link
                    key={idx}
                    href={city.link}
                    className="p-3 bg-white border border-gray-200 rounded-xl text-center text-sm font-semibold text-secondary hover:border-primary hover:text-primary hover:shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{city.name}</span>
                  </Link>
                ))}
              </div>

              <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
                <em>Please note:</em> Door-to-door delivery arrangements, collection hub locations, transit times and local handling surcharges vary depending on the destination state and accessibility of the recipient&apos;s address. All delivery options should be confirmed when requesting your initial quotation.
              </p>
            </div>

            {/* Section: Areas Around Chicago We Can Assist */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Areas Around Chicago We Can Assist
              </h2>
              <p className="text-gray-700">
                We assist customers across the entire Chicago metropolitan area and neighboring Illinois communities. Shippers from across Cook County, DuPage County, Will County, Kane County and Lake County can easily organize transatlantic shipments with County Cargo, including:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 not-prose">
                {[
                  'Chicago (All Neighborhoods)',
                  'Naperville',
                  'Aurora',
                  'Joliet',
                  'Schaumburg',
                  'Evanston',
                  'Oak Park',
                  'Surrounding Illinois Areas',
                ].map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-center text-xs sm:text-sm font-medium text-secondary"
                  >
                    {area}
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-gray-500 italic">
                *Note: County Cargo operates central receiving warehouses in designated US transit hubs. We do not maintain physical storefronts or public walk-in customer branches in these individual Illinois municipalities. All cargo movements are managed via scheduled courier transport or direct shipping to our designated warehouse.
              </p>
            </div>

            {/* Section: Why Choose County Cargo? */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center">
                Why Choose County Cargo?
              </h2>
              <p className="text-gray-700 text-center max-w-2xl mx-auto">
                Discover why families, traders and diaspora organizations rely on County Cargo for dependable transatlantic logistics:
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
                {[
                  {
                    title: 'Transatlantic Experience',
                    desc: 'Years of specialized expertise handling UK, US, and Nigeria air and sea freight logistics.',
                  },
                  {
                    title: 'Clear Packing Guidance',
                    desc: 'Comprehensive advice on barrel sealing, weight distribution, and customs declaration rules.',
                  },
                  {
                    title: 'Air & Sea Cargo Options',
                    desc: 'Flexible solutions allowing you to balance fast air delivery against economical ocean freight.',
                  },
                  {
                    title: 'Dedicated Support',
                    desc: 'Personalized assistance throughout the shipping process from warehouse drop-off to arrival.',
                  },
                  {
                    title: 'Nationwide Distribution',
                    desc: 'Organized delivery and collection networks serving Lagos, Abuja, and regional Nigerian hubs.',
                  },
                  {
                    title: 'Upfront Transparent Quotes',
                    desc: 'Clear itemized quotations provided prior to dispatch so there are no unexpected hidden charges.',
                  },
                  {
                    title: 'Personal & Commercial Cargo',
                    desc: 'Equal care given to individual family care packages, heavy barrels, and bulk commercial inventory.',
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-gray-200 rounded-xl shadow-2xs space-y-2 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-2 font-bold text-secondary text-sm sm:text-base">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <h4>{feature.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box with 3 Visible Buttons */}
            <div
              className="my-12 p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl shadow-xl not-prose space-y-6"
              data-aos="fade-up"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/30 text-blue-200 border border-blue-400/20">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Start Your US Shipment Today
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Ready to Ship a Barrel from the USA to Nigeria?
                </h3>
                <p className="text-blue-100 text-base leading-relaxed max-w-2xl">
                  Ready to ship a 55-gallon drum, cargo boxes, or personal belongings from the USA to Nigeria? Contact County Cargo for current air or sea cargo rates, packing support, and designated warehouse dispatch instructions.
                </p>
              </div>

              {/* Three Visible Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-3 rounded-xl shadow-md border-none text-sm sm:text-base"
                >
                  <Link href="/contact">
                    Get a Shipping Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-3 rounded-xl text-sm sm:text-base"
                >
                  <Link href="/contact">
                    Contact County Cargo
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-3 rounded-xl text-sm sm:text-base"
                >
                  <Link href="/ship-from-us-to-nigeria">
                    Start Your Shipment
                  </Link>
                </Button>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-blue-200/80">
                <em>Customer Support Notice:</em> Our transatlantic logistics specialists are available to answer your questions on barrel sizing, container loading, and delivery across Nigeria.
              </div>
            </div>

            <SocialShare title="The US Barrels Guide | Shipping Barrels from USA to Nigeria | County Cargo" />

            <RelatedGuides currentHref="/shipping-barrels-from-the-usa-to-nigeria" />

          </div>
        </article>

        {/* FAQ Section */}
        <UsBarrelsFaq />
      </main>
      <Footer />
    </>
  );
}
