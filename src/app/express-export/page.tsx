import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { ExpressExportCalculator } from '@/components/express-export-calculator';
import { GlobalDestinationsGrid } from '@/components/global-destinations-grid';
import {
  Plane,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Globe,
  Package,
  Boxes,
  FileText,
  MapPin,
  Phone,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Utensils,
  Shirt,
  Building2,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Express Export Shipping from Nigeria Worldwide | Instant Quote | County Cargo',
  description:
    'Fast international express export and air cargo shipping from Lagos and Abuja to over 230 countries worldwide. Get an instant quote with live rates, priority flight dispatch, and doorstep delivery.',
  keywords:
    'express export Nigeria, international shipping from Nigeria, send parcel abroad from Lagos, cargo export Abuja, air freight to USA UK Canada China, DHL export Nigeria partner, send foodstuff abroad from Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/express-export',
  },
  openGraph: {
    title: 'Express Export Shipping from Nigeria Worldwide | County Cargo',
    description:
      'Fast international express export and air cargo shipping from Lagos and Abuja to over 230 countries. Calculate live quotes instantly.',
    url: 'https://countycargo.com/express-export',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/the world.png',
        width: 1200,
        height: 630,
        alt: 'Express Export air cargo from Nigeria worldwide - County Cargo',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
};

const suitableItems = [
  {
    icon: Utensils,
    title: 'Nigerian Foodstuffs & Spices',
    desc: 'Properly dried and vacuum-sealed African foods including ogbono, egusi, crayfish, dried fish, yam flour, bitter leaf, and traditional spices with export-grade packaging.',
  },
  {
    icon: Shirt,
    title: 'African Fashion & Textiles',
    desc: 'Designer apparel, Aso-Ebi, custom Ankara collections, agbada, beaded accessories, gele, and handmade footwear for international clients and weddings.',
  },
  {
    icon: FileText,
    title: 'Urgent Documents & Contracts',
    desc: 'Legal agreements, university transcripts, academic credentials, corporate documents, and tenders delivered within 2–4 working days via priority courier.',
  },
  {
    icon: ShoppingBag,
    title: 'Commercial Samples & Trade Goods',
    desc: 'Finished manufacturing samples, agricultural extracts, beauty and skincare cosmetics, and craft merchandise for prospective overseas buyers.',
  },
  {
    icon: Package,
    title: 'E-commerce & Cross-Border Orders',
    desc: 'Reliable parcel fulfillment for Nigerian e-commerce retailers, artisans, and Etsy/Shopify merchants selling to customers in the US, UK, Canada, and Europe.',
  },
  {
    icon: Boxes,
    title: 'Personal Effects & Diaspora Care Packages',
    desc: 'Care packages, household essentials, cultural memorabilia, and gifts sent from loved ones in Nigeria directly to family residing overseas.',
  },
];

const whyChooseReasons = [
  {
    title: 'Live Rates & Zero Hidden Surcharges',
    desc: 'Our transparent rate engine calculates direct export prices based on real weight and zone pricing. What you see is what you pay.',
    icon: Sparkles,
  },
  {
    title: 'Fast Flight Connections & Global Partners',
    desc: 'Partnered with premier global logistics leaders like DHL Express, ensuring your export packages board priority scheduled flights out of Lagos (LOS) and Abuja (ABV).',
    icon: Plane,
  },
  {
    title: 'Dual Export Hubs in Lagos & Abuja',
    desc: 'Convenient drop-off locations at Ladipo-Oshodi, Lagos and Wuye Market, Abuja, alongside scheduled doorstep collection across major Nigerian cities.',
    icon: MapPin,
  },
  {
    title: 'Customs & Export Documentation Guidance',
    desc: 'Comprehensive guidance on export documentation, export clearance, prohibited goods checklists, and commercial invoice generation.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-Time End-to-End Tracking',
    desc: 'Track your shipment every mile from initial hub intake and airport security scanning to international customs clearance and final doorstep handover.',
    icon: Clock,
  },
  {
    title: 'Dedicated Export Support Specialists',
    desc: 'Reach a real logistics specialist via WhatsApp or direct phone call for tailored advice on freight packaging, commercial consignments, or bulky cargo.',
    icon: MessageCircle,
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Calculate Instant Quote',
    desc: 'Select your origin hub (Lagos or Abuja), your destination country, and enter the shipment weight in kg to see instant live rates.',
  },
  {
    step: '02',
    title: 'Book & Drop Off or Request Pickup',
    desc: 'Initiate your booking on our portal or via WhatsApp. Drop off your parcel at our Lagos or Abuja hub, or book a courier pickup from your home or business.',
  },
  {
    step: '03',
    title: 'Inspection & Priority Flight Dispatch',
    desc: 'Our export operations team inspects, weighs, and prepares your cargo for security scanning before dispatching on priority outbound international flights.',
  },
  {
    step: '04',
    title: 'Customs Clearance & Doorstep Delivery',
    desc: 'Your package is cleared through international customs and delivered straight to the recipient’s doorstep anywhere in over 230 countries.',
  },
];

const exportFaqs = [
  {
    q: 'How does County Cargo calculate Express Export shipping rates?',
    a: 'Our Express Export prices are calculated using live destination zone matrices and certified weight tiers from our international courier partners (including DHL Express) and consolidated air freight networks. Prices are based on the higher of actual weight or volumetric weight (Length × Width × Height in cm ÷ 5,000).',
  },
  {
    q: 'What is the difference between Value Export and Express Export?',
    a: 'Express Export is our fastest service (typically 2 to 5 working days) routed via premium global carriers like DHL Express with daily scheduled flights and end-to-end priority handling. Value Export is an economical consolidated air cargo service (typically 7 to 14 working days) suited for larger parcels (10kg minimum) to popular destinations like the United States, United Kingdom, and Canada.',
  },
  {
    q: 'Can I export Nigerian foodstuffs through Express Export?',
    a: 'Yes, dried and non-perishable foodstuffs can be exported to eligible destinations including the US, UK, Canada, and Europe. Food items must be completely dried, hygienically packed, and odor-free (preferably vacuum-sealed). Perishable wet goods, fresh meat, and items not permitted by destination customs authorities (such as certain seeds or unauthorized animal products) cannot be shipped.',
  },
  {
    q: 'Who pays destination customs duties and import taxes?',
    a: 'For Express Export shipments, international shipments enter destination countries under standard Delivery Duty Unpaid (DDU) terms unless arranged otherwise. The recipient is responsible for any applicable local customs duties, VAT, or import tariffs assessed by their country’s border authorities upon arrival.',
  },
  {
    q: 'Where are County Cargo drop-off hubs located in Nigeria?',
    a: 'We operate two primary export hubs in Nigeria:\n- Lagos Hub: Suite F8, Magnet Shopping Plaza, 525 Agege Motor Road, Ladipo-Oshodi, Lagos.\n- Abuja Hub: Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT.\nYou can drop off packages Monday through Saturday, or schedule doorstep courier collection from your doorstep.',
  },
  {
    q: 'What items are strictly prohibited from international air export?',
    a: 'Prohibited items include hazardous materials, flammable liquids, pressurized spray cans, ammunition or weapons, perishable fresh meat/fish, counterfeit goods, illegal narcotics, raw cash, and lithium batteries not contained within certified electronic equipment.',
  },
];

export default function ExpressExportPage() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'County Cargo Express Export Services',
    serviceType: 'International Air Cargo & Express Courier Export',
    provider: {
      '@type': 'Organization',
      name: 'County Cargo',
      url: 'https://countycargo.com',
      logo: 'https://countycargo.com/the world.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+44-7883-309489',
        contactType: 'customer service',
        areaServed: ['NG', 'US', 'GB', 'CA', 'DE', 'AE', 'CN'],
        availableLanguage: ['en'],
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    description:
      'Fast international express export and air cargo shipping from Lagos and Abuja to over 230 countries worldwide with instant online quotation, door-to-door tracking, and reliable delivery.',
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <JsonLd data={jsonLdData} />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200/80">
          <div className="container mx-auto px-4 py-3 max-w-6xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/#services' },
                { label: 'Express Export (Worldwide)', href: '/express-export' },
              ]}
            />
          </div>
        </div>

        {/* HERO SECTION WITH EMBEDDED CALCULATOR */}
        <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            {/* Hero Heading & Badges */}
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold text-blue-200 mb-4 backdrop-blur-sm">
                <Plane className="w-4 h-4 text-blue-400" />
                <span>Express Air Export Worldwide from Lagos & Abuja</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Fast International Export <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-red-300">
                  Shipping From Nigeria
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
                Connect your business, diaspora shipments, and food cargo from Lagos and Abuja to over 230 global destinations.
                Calculate your live quote instantly below with zero hidden charges.
              </p>

              {/* Quick Trust Highlights */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>230+ Global Destinations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>2–5 Working Days Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Lagos & Abuja Hub Drop-Off</span>
                </div>
              </div>
            </div>

            {/* INSTANT SHIPPING QUOTATION CALCULATOR WIDGET */}
            <div className="mt-4">
              <ExpressExportCalculator
                initialOrigin="Abuja"
                initialDestination="United States"
                initialWeight={16}
              />
            </div>
          </div>
        </section>

        {/* GLOBAL DESTINATIONS SECTION (Silhouette Cards) */}
        <GlobalDestinationsGrid />

        {/* SUITABLE ITEMS FOR EXPRESS EXPORT */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full">
                What Can You Ship?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
                Items Suitable for Express Export
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-600">
                From high-priority commercial shipments to personal care parcels, our export air cargo network is optimized for safety, speed, and regulatory compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suitableItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-gray-50/70 border border-gray-200/80 hover:border-primary/40 hover:bg-white hover:shadow-md transition-all flex flex-col justify-start group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE COUNTY CARGO */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white border-y border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full">
                The County Cargo Edge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
                Why Ship With County Cargo Express Export
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-600">
                Experience seamless cross-border freight forwarding backed by proven reliability, established carrier infrastructure, and dedicated Nigerian export hubs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseReasons.map((reason, idx) => {
                const IconComponent = reason.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/60 text-primary flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (4-STEP PROGRESSION) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full">
                Simple & Transparent
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
                How Express Export Works
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-600">
                From your initial quote to final doorstep delivery abroad in 4 straightforward steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {workflowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between relative group hover:border-primary/40 hover:bg-white hover:shadow-md transition-all"
                >
                  <div>
                    <div className="text-3xl font-black text-blue-200 group-hover:text-primary transition-colors mb-3">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Calculator Callout */}
            <div className="mt-12 text-center">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 rounded-xl shadow-md"
              >
                <a href="#express-calculator-widget">
                  Calculate Your Shipping Quote Now &uarr;
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* DUAL HUBS INFORMATION BANNER */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Lagos Hub */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-300 font-semibold tracking-wide uppercase">Hub Intake 01</span>
                    <h3 className="text-lg font-bold text-white">Lagos Export Processing Centre</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos.
                </p>
                <div className="mt-3 text-xs text-gray-400 flex items-center gap-4">
                  <span>Mon – Fri: 9am – 6pm</span>
                  <span>Sat: 10am – 4pm</span>
                </div>
              </div>

              {/* Abuja Hub */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-red-300 font-semibold tracking-wide uppercase">Hub Intake 02</span>
                    <h3 className="text-lg font-bold text-white">Abuja FCT Export Drop-Off</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Shop HF426, Turai Yar’adua Block, Wuye Ultra Modern Market, 697 Idris Gidado St, Abuja.
                </p>
                <div className="mt-3 text-xs text-gray-400 flex items-center gap-4">
                  <span>Mon – Fri: 9am – 6pm</span>
                  <span>Sat: 10am – 4pm</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="py-16 md:py-24 bg-gray-50/60">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-primary mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Export Shipping FAQs
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Key questions answered regarding packaging, customs, rates, and transit schedules.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {exportFaqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-white border border-gray-200 rounded-xl px-4 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary text-base py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-4 whitespace-pre-line">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-16 md:py-20 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/40 pointer-events-none" />
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Export Your Cargo Worldwide?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Book online in minutes or speak directly with an export consultant for commercial consignments, dry foodstuffs, or urgent international express deliveries.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="w-full sm:w-auto h-12 px-8 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-base rounded-xl shadow-lg"
              >
                <a href="#express-calculator-widget">
                  Calculate Instant Quote
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold text-base rounded-xl backdrop-blur-sm"
              >
                <a
                  href="https://wa.me/447883309489?text=Hello%20County%20Cargo%2C%20I%20would%20like%20to%20inquire%20about%20Express%20Export%20shipping%20from%20Nigeria."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>Chat with Export Specialist</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
