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
import { UkBarrelFaq } from './faq';

export const metadata: Metadata = {
  title: 'Ship Barrels from UK to Nigeria | Air & Sea Cargo',
  description:
    'Ship barrels, boxes and personal belongings from the UK to Nigeria with County Cargo. Reliable air and sea cargo services to Lagos, Abuja and destinations across Nigeria. Request a quote today.',
  keywords:
    'Shipping barrels from UK to Nigeria, UK to Nigeria cargo shipping, Send a barrel from UK to Lagos, Shipping boxes from UK to Nigeria, London to Lagos air cargo, UK to Nigeria sea cargo, Affordable cargo service from UK, Door-to-door shipping from UK to Nigeria, Nigeria shipping company serving UK, Ship personal belongings from UK to Nigeria, UK to Abuja cargo service, Shipping barrels from London to Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-barrels-from-uk-to-nigeria',
  },
  openGraph: {
    title: 'Ship Barrels from UK to Nigeria | Air & Sea Cargo',
    description:
      'Ship barrels, boxes and personal belongings from the UK to Nigeria with County Cargo. Reliable air and sea cargo services to Lagos, Abuja and destinations across Nigeria. Request a quote today.',
    url: 'https://countycargo.com/shipping-barrels-from-uk-to-nigeria',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/uk-nigeria-barrels.jpg',
        alt: 'County Cargo air and ocean freight shipping barrels and boxes from the UK to Nigeria',
        width: 1200,
        height: 630,
      },
    ],
    type: 'article',
  },
};

export default function ShippingBarrelsFromUkToNigeriaPage() {
  const pageUrl = 'https://countycargo.com/shipping-barrels-from-uk-to-nigeria';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Shipping Barrels from the UK to Nigeria: Complete Air & Sea Freight Guide',
    description:
      'Comprehensive guide for individuals, families and businesses shipping standard barrels, boxes, household effects and personal cargo from London, Manchester, Birmingham, Liverpool and nationwide UK to Nigeria.',
    image: 'https://countycargo.com/uk-nigeria-barrels.jpg',
    datePublished: '2026-09-03T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo UK Operations Team',
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
    inLanguage: 'en-GB',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shipping Barrels from UK to Nigeria',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      {
        '@type': 'City',
        name: 'London',
      },
      {
        '@type': 'Country',
        name: 'Nigeria',
      },
    ],
    description:
      'Air and ocean freight coordination for shipping barrels, boxes, personal effects and commercial goods from London and communities across the UK to Lagos, Abuja, and nationwide Nigeria.',
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={serviceSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'UK to Nigeria Shipping', href: '/shipping-from-uk-to-nigeria' },
            { label: 'Shipping Barrels from UK to Nigeria' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/uk-nigeria-barrels.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Package className="w-3.5 h-3.5" /> UK to Nigeria Cargo Logistics &bull; Air &amp; Sea Freight
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping Barrels from UK to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Reliable air and sea cargo solutions for sending shipping barrels, boxes, household goods and personal belongings from London and across the UK to Lagos, Abuja, and nationwide Nigeria.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo UK Operations Team
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Freight Logistics Specialists
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" /> Published: 3 September 2026 &bull; Updated: 3 September 2026
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
                &ldquo;County Cargo helps customers across the UK ship barrels, boxes, household goods and personal belongings to Nigeria. Customers can choose suitable air or sea cargo options, receive packing guidance and arrange doorstep collection across London and nationwide UK or direct delivery to our UK warehouse, with delivery to Lagos, Abuja and other Nigerian destinations.&rdquo;
              </blockquote>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Sending care packages, heavy barrels and household cargo from the United Kingdom to Nigeria is a vital lifeline for families, diasporan communities, students and commercial traders. At County Cargo, we support individuals, families and businesses who want to send shipping barrels, reinforced cartons, household goods, clothing, packaged food provisions and permitted commercial merchandise from London, Manchester, Birmingham, Liverpool, Leeds, and communities across England, Scotland and Wales directly to Nigeria.
              </p>
              <p className="text-gray-700">
                Whether you are packing a standard 55-gallon blue plastic drum for relatives in Lagos, sending household effects to Abuja, or dispatching retail inventory to Port Harcourt, our comprehensive air and ocean freight services provide clear guidance, transparent pricing, and secure customs handling from collection to delivery.
              </p>
            </div>

            {/* Section: Reliable UK-to-Nigeria Cargo Shipping */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Reliable UK-to-Nigeria Cargo Shipping
              </h2>
              <p className="text-gray-700">
                County Cargo coordinates transatlantic shipping through dedicated UK receiving warehouses and nationwide collection networks. We make the shipping process seamless for customers across the British Isles:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-gray-700">
                <li>
                  <strong>Doorstep Collection in Greater London:</strong> We offer regular doorstep pickup across North, South, East, and West London, including Peckham, Woolwich, Wembley, Barking, Croydon, Lewisham, and Tottenham.
                </li>
                <li>
                  <strong>Nationwide UK Courier Pickups:</strong> Customers in Birmingham, Manchester, Liverpool, Leeds, Preston, Bolton, Sheffield, Newcastle, Glasgow and Cardiff can have their barrels or boxes collected directly from their premises or deliver them to our designated receiving facilities.
                </li>
                <li>
                  <strong>Direct Drop-off at UK Warehouses:</strong> Customers who prefer dropping off their freight can bring their shipments directly to our established UK receiving hubs in Liverpool or London following booking confirmation.
                </li>
              </ul>
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-5 not-prose flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-secondary leading-relaxed">
                  <strong>Collection Booking Notice:</strong> Doorstep collections outside scheduled London routes are subject to location scheduling and confirmation. When you book your shipment, our support team will provide your unique cargo reference, warehouse handling guidelines, and collection driver schedule.
                </p>
              </div>
            </div>

            {/* Section: What Can You Pack in a Shipping Barrel? */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                What Can You Pack in a Shipping Barrel?
              </h2>
              <p className="text-gray-700">
                Shipping barrels—both standard fiberboard drums and high-density polyethylene (plastic) drums—offer unmatched security and volume for shipping heavy items. Permitted categories include:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 my-4 not-prose">
                {[
                  { title: 'Clothing, Shoes & Fabrics', desc: 'Everyday clothes, winter jackets, baby apparel, shoes, handbags, traditional fabrics and bedding.' },
                  { title: 'Household Supplies & Cookware', desc: 'Kitchenware, pots, pans, non-electric blenders, cutlery, towels, and small homeware.' },
                  { title: 'Non-Perishable Packaged Food', desc: 'Tinned foods, cereals, dried grains, biscuits, sealed seasonings, cooking oil and powdered milk.' },
                  { title: 'Toiletries & Personal Care', desc: 'Soaps, lotions, hair products, toothpaste, washing detergents, and cosmetic care essentials.' },
                  { title: 'Gifts & Personal Effects', desc: 'Books, school supplies, toys, baby care products, souvenirs, and diaspora care items.' },
                  { title: 'Approved Electronics', desc: 'Televisions, laptops, sound systems, and home gadgets (subject to battery safety rules).' },
                  { title: 'Commercial & Business Inventory', desc: 'Shop inventory, tools, automotive spare parts, equipment, and commercial samples.' },
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
                  You must never pack restricted, hazardous, flammable, leaking, toxic or illegal goods. Strictly prohibited items include firearms, ammunition, fireworks, pressurized aerosol canisters, corrosive chemicals, combustible fuels, unsealed liquids that risk leaking onto surrounding cargo, perishable fresh foods, counterfeit currency or goods, and items prohibited on the official Nigeria Customs import prohibition list.
                </p>
                <p className="text-xs text-red-800">
                  Shippers should always check our{' '}
                  <Link
                    href="/blog/prohibited-items-shipping-to-nigeria"
                    className="font-semibold underline hover:text-primary"
                  >
                    Prohibited &amp; Restricted Items Guide
                  </Link>{' '}
                  and verify any uncertain items with County Cargo prior to sealing your barrel.
                </p>
              </div>
            </div>

            {/* Section: Air Cargo and Sea Cargo Options */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Air Cargo and Sea Cargo Options
              </h2>
              <p className="text-gray-700">
                Choosing between air freight and ocean sea freight depends on your delivery schedule, package size, and budget:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                {/* Air Cargo Card */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                      <Plane className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">London &amp; UK to Nigeria Air Cargo</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Air freight is the premier choice for smaller boxes, urgent commercial goods, electronics and time-sensitive cargo. Air cargo charges are calculated based on actual gross weight or volumetric dimensional weight—learn more in our{' '}
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
                    Fastest air cargo transit &bull; Regular weekly flights
                  </div>
                </div>

                {/* Sea Cargo Card */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Ship className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">UK to Nigeria Ocean Sea Cargo</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ocean container shipping is by far the most economical solution for heavy 55-gallon and 75-gallon jumbo plastic barrels, massive crates, machinery and bulk household effects. Sea freight provides maximum value when you can plan around maritime sailings.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-xs font-semibold text-emerald-700">
                    Maximum savings on heavy drums &amp; bulk boxes
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
                <strong>Transparent Quotations:</strong> Freight tariffs, sailing dates and carrier handling fees depend on season and freight volume. Visit our{' '}
                <Link
                  href="/shipping-from-uk-to-nigeria"
                  className="text-primary font-semibold underline"
                >
                  UK to Nigeria shipping service page
                </Link>{' '}
                or contact our team for current rates and departure dates without hidden surcharges.
              </p>
            </div>

            {/* Section: How to Ship a Barrel from the UK to Nigeria (8 Steps) */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                How to Ship a Barrel from the UK to Nigeria
              </h2>
              <p className="text-gray-700">
                Follow our clear, eight-step process to ensure smooth transatlantic shipping and on-time clearance in Nigeria:
              </p>

              <div className="space-y-4 not-prose">
                {[
                  {
                    step: '1',
                    title: 'Contact County Cargo and request a quote',
                    desc: 'Reach out online or by phone with your UK collection postcode, barrel dimensions, estimated weight, and destination city in Nigeria.',
                  },
                  {
                    step: '2',
                    title: 'Confirm the contents, size and estimated weight',
                    desc: 'Specify whether you are shipping standard 55-gallon plastic drums, fiber drums or reinforced boxes, and provide a summary of contents.',
                  },
                  {
                    step: '3',
                    title: 'Book collection or receive UK warehouse instructions',
                    desc: 'Book a convenient doorstep collection slot across London/UK or receive delivery instructions for our Liverpool or London warehouse.',
                  },
                  {
                    step: '4',
                    title: 'Pack and secure the barrel properly',
                    desc: 'Place heavy items at the base, cushion fragile articles, seal liquids in individual plastic bags, and lock the lid with a metal ring clamp or heavy seal.',
                  },
                  {
                    step: '5',
                    title: 'Label the shipment with sender & receiver details',
                    desc: 'Write the sender’s UK details, recipient’s full legal name, delivery address, and two active Nigerian phone numbers directly on the drum with waterproof marker.',
                  },
                  {
                    step: '6',
                    title: 'Complete the required shipping documentation',
                    desc: 'Submit your packing inventory and declared value to enable compliant customs declaration with Nigeria Customs Service.',
                  },
                  {
                    step: '7',
                    title: 'Pay the confirmed shipping charges',
                    desc: 'After weight and dimension verification at our UK facility, settle your clear invoice via bank transfer or online payment.',
                  },
                  {
                    step: '8',
                    title: 'Receive shipment and delivery updates',
                    desc: 'Track your consignment through international departure, sea/air transit, port customs clearance, and final delivery in Nigeria.',
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
                County Cargo manages customs clearance through primary Nigerian ports and airports, ensuring prompt delivery across all regions:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 not-prose">
                {[
                  { name: 'Lagos (Hub & Doorstep)', link: '/shipping-to-lagos' },
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
                <em>Delivery Notice:</em> Door-to-door delivery, regional depot collection points, transit schedules, and onward haulage charges vary according to destination state. Details are confirmed during your quotation.
              </p>
            </div>

            {/* Section: Areas Across the UK We Can Assist */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Areas Across the UK We Can Assist
              </h2>
              <p className="text-gray-700">
                Our logistics network covers major cities and regional communities across England, Scotland, and Wales, including:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 not-prose">
                {[
                  'Greater London (All Boroughs)',
                  'Birmingham & West Midlands',
                  'Manchester & Greater Manchester',
                  'Liverpool & Merseyside',
                  'Leeds & Yorkshire',
                  'Preston, Bolton & Warrington',
                  'Leicester & Nottingham',
                  'Nationwide England, Wales & Scotland',
                ].map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-center text-xs sm:text-sm font-medium text-secondary"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Why Choose County Cargo? */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center">
                Why Choose County Cargo?
              </h2>
              <p className="text-gray-700 text-center max-w-2xl mx-auto">
                Discover why thousands of British-Nigerian families and commercial enterprises trust County Cargo for cargo to Nigeria:
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
                {[
                  {
                    title: 'Proven UK-to-Nigeria Expertise',
                    desc: 'Decades of combined experience navigating UK freight forwarding and Nigerian customs regulations.',
                  },
                  {
                    title: 'Clear Packing & Sealing Guidance',
                    desc: 'Practical advice on drum securing, weight management, and customs-compliant itemization.',
                  },
                  {
                    title: 'Air & Sea Freight Options',
                    desc: 'Flexible shipping modes allowing you to match your cargo needs to speed or economic ocean savings.',
                  },
                  {
                    title: 'UK Doorstep Collection',
                    desc: 'Convenient home and business pickup services across London and nationwide UK couriers.',
                  },
                  {
                    title: 'Nationwide Nigerian Delivery',
                    desc: 'Robust distribution network serving Lagos, Abuja, Port Harcourt, Kano, and all 36 states.',
                  },
                  {
                    title: 'Transparent Pricing',
                    desc: 'Upfront quotations with clear weight, handling, and delivery details—no unexpected charges.',
                  },
                  {
                    title: 'Personal & Commercial Freight',
                    desc: 'Specialized care for diaspora family care packages, jumbo barrels, and containerized business stock.',
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
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Start Your UK Barrel Shipment Today
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Ready to Ship a Barrel from the UK to Nigeria?
                </h3>
                <p className="text-blue-100 text-base leading-relaxed max-w-2xl">
                  Ready to ship a barrel, box or household goods from the UK to Nigeria? Contact County Cargo for the current air or sea cargo rate, packing guidance and collection or delivery instructions for our UK warehouse.
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
                  <Link href="/shipping-from-uk-to-nigeria">
                    Start Your Shipment
                  </Link>
                </Button>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-blue-200/80">
                <em>Customer Support:</em> Speak with our UK logistics coordinators for barrel advice, packing tips, and flight/sailing schedules.
              </div>
            </div>

            <SocialShare title="Shipping Barrels from UK to Nigeria | County Cargo" />

            <RelatedGuides currentHref="/shipping-barrels-from-uk-to-nigeria" />

          </div>
        </article>

        {/* FAQ Section */}
        <UkBarrelFaq />
      </main>
      <Footer />
    </>
  );
}
