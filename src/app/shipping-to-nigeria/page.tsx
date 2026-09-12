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
  Globe,
  Plane,
  Ship,
  Truck,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Calculator,
  AlertTriangle,
  Box,
  Building2,
  Laptop,
  HeartHandshake,
  HelpCircle,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping Cargo from UK & USA to Nigeria: Complete Guide | County Cargo',
  description:
    'Master guide to shipping cargo from the UK and USA to Nigeria. Compare air vs sea freight, £6.00/kg rates, delivery times, volumetric weight, customs rules, and Lagos/Abuja door delivery.',
  keywords: 'shipping to Nigeria, cargo from UK to Nigeria, shipping from USA to Nigeria, air cargo Lagos, sea freight Nigeria, door to door delivery Nigeria',
  alternates: {
    canonical: 'https://countycargo.com/shipping-to-nigeria',
  },
};

const pillarFaqs = [
  {
    question: 'How long does shipping from the UK and USA to Nigeria take?',
    answer:
      'Air cargo from the UK takes 5 to 10 working days (3 to 5 working days for Express Air). Air cargo from the USA takes 5 to 10 working days. Sea freight from the UK/USA to Lagos ports (Apapa/Tin Can) takes 4 to 8 weeks.',
  },
  {
    question: 'How are cargo shipping charges calculated?',
    answer:
      'Freight charges are calculated per kilogram (or per CBM for sea freight) based on whichever is greater: actual scale weight or volumetric (dimensional) weight, calculated as (Length x Width x Height in cm) / 5000.',
  },
  {
    question: 'Does County Cargo handle customs clearance in Nigeria?',
    answer:
      'Yes! All County Cargo door-to-door shipping rates include standard customs clearing at Lagos airport or sea ports.',
  },
  {
    question: 'What are the main delivery destinations in Nigeria?',
    answer:
      'We deliver directly to doorsteps in Lagos, Abuja, Port Harcourt, Ibadan, Kano, Kaduna, Benin City, Enugu, Asaba, Warri, Uyo, Calabar, Owerri, and across all 36 Nigerian states.',
  },
];

const ukOrigins = [
  { name: 'Liverpool (Queens Dock Depot)', href: '/shipping-from-liverpool-to-nigeria' },
  { name: 'London & Home Counties', href: '/shipping-from-london-to-nigeria' },
  { name: 'Manchester & Greater Manchester', href: '/shipping-from-manchester-to-nigeria' },
  { name: 'Birmingham & West Midlands', href: '/shipping-from-birmingham-to-nigeria' },
  { name: 'Leeds & West Yorkshire', href: '/shipping-from-leeds-to-nigeria' },
  { name: 'Preston & Lancashire', href: '/shipping-from-preston-to-nigeria' },
  { name: 'Bolton & North West', href: '/shipping-from-bolton-to-nigeria' },
  { name: 'Warrington & Cheshire', href: '/shipping-from-warrington-to-nigeria' },
];

const ngDestinations = [
  { name: 'Lagos State (Ikeja, Lekki, VI, Main Dispatch Hub)', href: '/shipping-to-lagos' },
  { name: 'Abuja FCT (Garki, Wuse, Maitama, Gwarinpa)', href: '/shipping-to-abuja' },
  { name: 'Kaduna State (Barnawa, Kakuri, Zaria)', href: '/shipping-to-kaduna' },
  { name: 'Kano Commercial Hub (Sabon Gari, Fagge, Sharada)', href: '/shipping-to-kano' },
];

const clusterPosts = [
  { title: 'Nigeria Customs Clearance Guide', href: '/blog/nigeria-customs-clearance-guide' },
  { title: 'How to Ship Electronics Safely', href: '/blog/shipping-electronics-uk-to-nigeria' },
  { title: 'Shipping Personal Belongings Guide', href: '/blog/shipping-personal-belongings-to-nigeria' },
  { title: 'How to Ship Commercial Goods', href: '/blog/shipping-commercial-goods-to-nigeria' },
  { title: 'Air Freight vs Sea Freight to Nigeria', href: '/blog/air-freight-vs-sea-freight-to-nigeria' },
  { title: 'How Much Does It Cost to Ship Cargo?', href: '/blog/cargo-shipping-cost-to-nigeria' },
  { title: 'Calculate Volumetric Weight Formula', href: '/blog/how-to-calculate-volumetric-weight' },
  { title: 'UK to Nigeria Shipping Timelines', href: '/blog/uk-to-nigeria-shipping-time' },
  { title: 'Prohibited & Restricted Items List', href: '/blog/prohibited-items-shipping-to-nigeria' },
  { title: 'How to Package Cargo for Nigeria', href: '/blog/how-to-package-cargo-for-nigeria' },
  { title: 'Shipping from USA & Texas Guide', href: '/blog/shipping-from-usa-texas-to-nigeria' },
  { title: 'Door-to-Door Cargo Delivery to Nigeria', href: '/blog/door-to-door-cargo-delivery-nigeria' },
];

export default function ShippingToNigeriaPillarPage() {
  const pageUrl = 'https://countycargo.com/shipping-to-nigeria';
  const pillarSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Shipping Cargo from the UK and USA to Nigeria: Complete Guide',
    description: 'Master pillar guide for air and sea freight shipping from the UK and USA to Nigeria.',
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'County Cargo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://countycargo.com/county-logo.png',
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pillarFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[pillarSchema, faqSchema]} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs items={[{ label: 'Shipping to Nigeria Complete Guide' }]} />

        {/* HERO SECTION */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-4 h-4 text-blue-300" /> Master Pillar Shipping Guide · UK &amp; USA to Nigeria
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold hero-text-glow leading-tight">
              Shipping Cargo from the UK and USA to Nigeria: Complete Guide
            </h1>
            <p className="text-lg md:text-2xl mt-4 text-blue-100 font-light max-w-4xl mx-auto">
              Everything you need to know about air freight, ocean containers, £6.00/kg UK rates, Texas US receiving, customs clearance, and door-to-door delivery across Lagos, Abuja, and nationwide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-5 text-base rounded-full shadow-lg">
                <Link href="/shipping-from-uk-to-nigeria">
                  Ship from UK to Nigeria <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-8 py-5 text-base rounded-full">
                <Link href="/ship-from-us-to-nigeria">Ship from USA to Nigeria</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PILLAR BODY */}
        <article className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-10">
            {/* FEATURED SNIPPET ANSWER BOX */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Master Guide Overview: Shipping to Nigeria
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Shipping cargo from the UK and USA to Nigeria is streamlined through County Cargo’s air freight (5–10 working days from UK, 5–10 working days from USA) and sea freight (4–8 weeks) networks. Standard UK air cargo starts at £6.00/kg with full customs clearing and doorstep delivery across Lagos, Abuja, Port Harcourt, Kano, Kaduna, and all 36 Nigerian states.
              </p>
            </div>

            {/* AIR vs SEA COMPARISON */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2 pt-4">
              <Plane className="w-7 h-7 text-primary" /> <Ship className="w-7 h-7 text-emerald-600" /> Air Freight vs Sea Freight Options
            </h2>
            <p>
              County Cargo provides four primary shipping channels tailored for personal luggage, e-commerce purchases, high-value electronics, and commercial container freight:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-2xs">
                <h3 className="font-bold text-secondary text-lg flex items-center gap-2 mb-2">
                  <Plane className="w-5 h-5 text-primary" /> Express Air Courier (3–5 Working Days)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">Powered by DHL Express integration for urgent documents, luxury items, and time-sensitive care packages.</p>
              </div>
              <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-2xs">
                <h3 className="font-bold text-secondary text-lg flex items-center gap-2 mb-2">
                  <Plane className="w-5 h-5 text-primary" /> Standard Air Cargo (5–10 Working Days)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">Our most popular £6.00/kg service from London and Liverpool to Lagos, ideal for clothes, shoes, and personal effects.</p>
              </div>
              <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-2xs">
                <h3 className="font-bold text-secondary text-lg flex items-center gap-2 mb-2">
                  <Ship className="w-5 h-5 text-emerald-600" /> Ocean LCL Freight (4–8 Weeks)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">Economical shared container shipping billed per CBM for bulky household goods, furniture, and heavy boxes.</p>
              </div>
              <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-2xs">
                <h3 className="font-bold text-secondary text-lg flex items-center gap-2 mb-2">
                  <Ship className="w-5 h-5 text-emerald-600" /> Ocean FCL Containers (4–8 Weeks)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">Dedicated 20ft and 40ft shipping containers for commercial importers and major household relocations.</p>
              </div>
            </div>

            {/* UK & USA ORIGINS */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              UK &amp; USA Receiving Hubs &amp; Regional Pickup Routes
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 my-6 not-prose">
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                <h3 className="font-bold text-secondary text-lg mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> UK Origins &amp; Drop-off Depot
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">Drop off at our Liverpool Queens Dock depot (L1 0BG) or schedule doorstep collection across:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm font-medium">
                  {ukOrigins.map((origin, i) => (
                    <li key={i}>
                      <Link href={origin.href} className="text-primary hover:underline flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> {origin.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                <h3 className="font-bold text-secondary text-lg mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> USA &amp; Texas Receiving Hub
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">Send online shopping orders or drop off cargo at our Irving, Texas receiving center (75061) for nationwide delivery to:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm font-medium">
                  {ngDestinations.map((dest, i) => (
                    <li key={i}>
                      <Link href={dest.href} className="text-primary hover:underline flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> {dest.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* TOPIC CLUSTER LINKS */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              In-Depth Topic Guides &amp; Resources
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 my-6 not-prose">
              {clusterPosts.map((post, idx) => (
                <Link
                  key={idx}
                  href={post.href}
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex items-center justify-between text-sm font-semibold text-secondary hover:text-primary"
                >
                  <span>{post.title}</span>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                </Link>
              ))}
            </div>

            {/* CTA BANNER */}
            <div className="my-12 p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white rounded-2xl shadow-xl not-prose">
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">
                Ready to Ship Cargo from the UK or USA to Nigeria?
              </h3>
              <p className="opacity-90 text-sm sm:text-base mb-6 leading-relaxed">
                Get an instant freight quote, receive your free UK/US shipping address, or book a doorstep collection with County Cargo today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-5 text-base rounded-full shadow-lg">
                  <Link href="/shipping-from-uk-to-nigeria">
                    Ship from UK (£6.00/kg) <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-8 py-5 text-base rounded-full">
                  <Link href="/ship-from-us-to-nigeria">Ship from USA</Link>
                </Button>
              </div>
            </div>

            <SocialShare title="Shipping Cargo from UK & USA to Nigeria: Complete Guide" />

            <RelatedGuides />
          </div>
        </article>

        {/* FAQS */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Master Shipping Guide FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4">
              {pillarFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-secondary">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
