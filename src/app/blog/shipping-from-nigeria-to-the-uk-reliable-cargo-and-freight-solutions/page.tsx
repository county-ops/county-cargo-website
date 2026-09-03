import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Plane,
  Ship,
  FileText,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  PackageCheck,
  AlertTriangle,
  ShoppingBag,
  Boxes,
  FileCheck,
  Truck,
  Scale,
  Utensils,
  Store,
  Building2,
  Globe,
  Sparkles,
  Check,
} from 'lucide-react';
import { Faq } from './faq';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';

export const metadata: Metadata = {
  title: 'Shipping from Nigeria to the UK: Reliable Cargo & Freight Solutions | County Cargo Blog',
  description:
    'Move your cargo from Nigeria to the UK with confidence. Comprehensive guide covering air and sea freight, NEPC export documentation, UK customs clearance, permitted foodstuff shipping, and delivery across the UK.',
  keywords:
    'shipping from nigeria to uk, air freight nigeria to uk, sea freight nigeria to uk, send food to uk from nigeria, export goods nigeria to uk, lagos to london cargo, manchester shipping nigeria, county cargo',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-nigeria-to-the-uk-reliable-cargo-and-freight-solutions',
  },
};

const suitableCargoList = [
  'Personal effects',
  'Household belongings',
  'Clothing and footwear',
  'Permitted food products',
  'Business merchandise',
  'Commercial cargo',
  'Documents and parcels',
  'E-commerce shipments',
  'Business samples',
  'Other permitted goods',
];

const airFreightItems = [
  'Documents',
  'Personal parcels',
  'Clothing',
  'Business samples',
  'Permitted food products',
  'E-commerce orders',
  'Smaller commercial shipments',
  'Time-sensitive cargo',
];

const permittedFoodItems = [
  'Garri',
  'Egusi',
  'Ogbono',
  'Plantain flour',
  'Yam flour',
  'Dried pepper',
  'Dried spices',
  'Dried vegetables',
  'Stockfish',
  'Dried prawns',
];

const businessExportItems = [
  'African fashion',
  'Clothing',
  'Retail products',
  'Packaged foods',
  'Art and crafts',
  'Business samples',
  'E-commerce orders',
  'Commercial merchandise',
];

const ukDestinations = [
  'London',
  'Manchester',
  'Birmingham',
  'Liverpool',
  'Leeds',
  'Sheffield',
  'Leicester',
  'Nottingham',
  'Bristol',
  'Glasgow',
  'Edinburgh',
  'Cardiff',
  'Newcastle',
  'Southampton',
];

const howItWorksSteps = [
  {
    step: '1',
    title: 'Tell Us What You Are Shipping',
    desc: 'Provide details about the cargo, destination, approximate weight, dimensions and intended service.',
  },
  {
    step: '2',
    title: 'Choose Your Shipping Method',
    desc: 'Depending on the shipment, air freight or sea freight may be appropriate.',
  },
  {
    step: '3',
    title: 'Prepare Your Documentation',
    desc: 'Cargo information and applicable export documentation should be prepared accurately.',
  },
  {
    step: '4',
    title: 'Cargo Processing',
    desc: 'Your shipment is received, processed and prepared for international transportation.',
  },
  {
    step: '5',
    title: 'International Freight',
    desc: 'The cargo travels from Nigeria to the UK using the selected freight service.',
  },
  {
    step: '6',
    title: 'Customs Processing',
    desc: 'Applicable UK customs procedures are completed before the shipment proceeds.',
  },
  {
    step: '7',
    title: 'Delivery or Collection',
    desc: 'Once cleared and released, the shipment can proceed to its final delivery or collection point.',
  },
];

const whyChooseUsPoints = [
  {
    title: 'Professional International Freight Forwarding',
    desc: 'County Cargo is focused on helping individuals and businesses move cargo internationally with greater confidence.',
  },
  {
    title: 'Nigeria Export Expertise',
    desc: 'Our services are designed around the practical requirements of customers shipping from Nigeria to international destinations.',
  },
  {
    title: 'Air & Sea Freight',
    desc: 'Choose the transportation method that best fits your cargo, budget and timeframe.',
  },
  {
    title: 'Cargo Consolidation',
    desc: 'Consolidated shipping can provide a practical solution for customers who do not require an entire container.',
  },
  {
    title: 'UK Delivery',
    desc: 'Ship to London and destinations throughout the UK, subject to the selected service.',
  },
];

export default function ShippingNigeriaToUkBlogPage() {
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': 'Shipping from Nigeria to the UK: Reliable Cargo & Freight Solutions',
    'description':
      'Move your cargo from Nigeria to the United Kingdom with confidence. Discover air & sea freight solutions, export documentation, UK customs rules, food shipping, and nationwide UK delivery.',
    'image': 'https://countycargo.com/service-nigeria-uk-enhanced.png',
    'datePublished': '2026-08-22T08:00:00+01:00',
    'dateModified': '2026-08-22T08:00:00+01:00',
    'author': {
      '@type': 'Organization',
      'name': 'County Cargo Staff',
      'url': 'https://countycargo.com',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'County Cargo',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://countycargo.com/county-logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://countycargo.com/blog/shipping-from-nigeria-to-the-uk-reliable-cargo-and-freight-solutions',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <Header />
      <main className="pt-16 bg-white">
        {/* HERO SECTION */}
        <section
          className="min-h-[50vh] flex items-center justify-center text-white relative"
          style={{
            background: `linear-gradient(rgba(13, 27, 62, 0.78), rgba(15, 23, 42, 0.85)), url('/service-nigeria-uk-enhanced.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-3.5 h-3.5" /> Shipping Guides · Nigeria to UK
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping from Nigeria to the UK: Reliable Cargo &amp; Freight Solutions
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow text-blue-100 font-light">
              Move your cargo from Nigeria to the United Kingdom with confidence.
            </p>
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Staff</span>
              <span>•</span>
              <span>22 August 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        {/* ARTICLE BODY */}
        <article className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose lg:prose-xl text-gray-800">
            <p className="lead text-lg sm:text-xl text-gray-700 leading-relaxed font-normal">
              Whether you are sending personal belongings to family, exporting Nigerian products to British customers, shipping business inventory or sending a parcel to the UK, County Cargo provides professional international freight solutions designed to make the process simple, secure and efficient.
            </p>
            <p>
              From Lagos and Abuja to London, Manchester, Birmingham, Liverpool and destinations across the UK, County Cargo helps individuals and businesses move permitted cargo internationally.
            </p>

            {/* OVERVIEW */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Boxes className="w-7 h-7 text-primary shrink-0" /> Ship from Nigeria to the UK with County Cargo
            </h2>
            <p>
              Shipping internationally involves much more than simply sending a parcel.
            </p>
            <p>
              Your shipment may need to be correctly packaged, documented, classified, processed for export and cleared through customs before it reaches its final destination.
            </p>
            <p>
              County Cargo brings these essential stages together through a professional freight-forwarding service.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-base sm:text-lg font-bold text-secondary mb-3">
                Our Nigeria-to-UK shipping solutions are suitable for:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suitableCargoList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-200">
                The most appropriate shipping method depends on the type, size, value and urgency of your shipment.
              </p>
            </div>

            {/* AIR FREIGHT */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Plane className="w-7 h-7 text-primary shrink-0" /> Air Freight from Nigeria to the UK
            </h2>
            <p>
              If speed is your priority, air freight from Nigeria to the UK can be an excellent solution.
            </p>
            <p>
              Air freight is particularly suitable for smaller, urgent or time-sensitive shipments.
            </p>
            <p>Customers may choose air freight for:</p>
            <ul>
              {airFreightItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>
              County Cargo can help you determine whether air freight is appropriate for your shipment and destination.
            </p>

            {/* SEA FREIGHT */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Ship className="w-7 h-7 text-primary shrink-0" /> Sea Freight from Nigeria to the UK
            </h2>
            <p>
              For larger consignments, sea freight from Nigeria to the UK can provide a practical alternative to air transportation.
            </p>
            <p>
              Sea freight is particularly suitable for customers moving larger quantities of cargo, commercial inventory or consolidated shipments.
            </p>
            <p>
              The key advantage is that customers can transport larger volumes without relying exclusively on air-freight capacity.
            </p>
            <p>
              For businesses importing or exporting regularly, sea freight can also form an important part of a broader international supply-chain strategy.
            </p>

            {/* EXPORTING FROM NIGERIA */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <FileCheck className="w-7 h-7 text-primary shrink-0" /> Exporting from Nigeria: What Documents Are Required?
            </h2>
            <p>
              Formal exports from Nigeria require appropriate export documentation.
            </p>
            <p>
              The <strong>Nigerian Export Promotion Council (NEPC)</strong> states that exporters need to register and obtain an Exporter’s Certificate, while export documentation can include commercial invoices, packing lists, quality certificates and transportation documents depending on the goods and transaction. (NEPC)
            </p>
            <p>The exact documents required can vary according to:</p>
            <ul>
              <li>The type of goods</li>
              <li>Whether the shipment is commercial or personal</li>
              <li>The value of the shipment</li>
              <li>The destination</li>
              <li>The transportation method</li>
              <li>Applicable regulatory controls</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6 not-prose">
              <p className="text-blue-950 text-sm sm:text-base font-medium flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                For commercial exporters, preparing accurate documentation before the cargo moves can help reduce unnecessary delays.
              </p>
            </div>

            {/* UK CUSTOMS CLEARANCE */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <ShieldCheck className="w-7 h-7 text-primary shrink-0" /> UK Customs Clearance
            </h2>
            <p>
              Cargo entering the UK is subject to customs requirements.
            </p>
            <p>
              <strong>UK Government guidance</strong> states that importers need to determine whether an import declaration is required, identify the appropriate commodity code and establish the customs value of the goods. Depending on the circumstances, an importer may also need an EORI number, licences or certificates. (GOV.UK)
            </p>
            <p>
              This is why accurate information matters.
            </p>
            <p>
              Your cargo description should clearly identify what is actually being shipped. Values and quantities should also be declared accurately.
            </p>
            <p>
              County Cargo can help customers understand the shipping and documentation process, while applicable customs declarations and regulatory requirements must be completed by the appropriate parties.
            </p>

            {/* CAN I SEND NIGERIAN FOOD TO THE UK */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Utensils className="w-7 h-7 text-primary shrink-0" /> Can I Send Nigerian Food to the UK?
            </h2>
            <p>
              One of the most common reasons people ship from Nigeria to the UK is to send familiar Nigerian food products to family and friends.
            </p>
            <p>
              Depending on the specific product and UK import rules, customers may wish to ship permitted products such as:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-6 not-prose">
              {permittedFoodItems.map((food, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800">
                  <Utensils className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{food}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
              <div className="flex items-start gap-3 text-amber-950 text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Important Compliance Rule:</strong> However, food is not automatically permitted simply because it is commercially available in Nigeria. Import restrictions can vary according to the type of product, ingredients, processing, packaging and quantity. <em>Always confirm the acceptability of a specific food product before sending it.</em>
                </div>
              </div>
            </div>

            {/* NIGERIA TO UK SHIPPING FOR BUSINESSES */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Store className="w-7 h-7 text-primary shrink-0" /> Nigeria to UK Shipping for Businesses
            </h2>
            <p>
              County Cargo also supports businesses looking to move products between Nigeria and the UK.
            </p>
            <p>
              For Nigerian businesses, international freight can provide a route into the UK market for permitted products and merchandise.
            </p>
            <p>Examples can include:</p>
            <ul>
              {businessExportItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>
              A professional export process can help businesses establish more predictable logistics as they grow.
            </p>

            {/* NATIONWIDE DESTINATIONS */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <MapPin className="w-7 h-7 text-primary shrink-0" /> Shipping from Nigeria to London, Manchester and Across the UK
            </h2>
            <p>
              Your recipient does not have to be located in London.
            </p>
            <p>
              County Cargo can support shipments destined for locations throughout the United Kingdom, subject to service availability.
            </p>
            <p className="font-semibold">Popular destinations include:</p>
            <div className="flex flex-wrap gap-2 my-4 not-prose">
              {ukDestinations.map((dest, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-blue-50 text-secondary border border-blue-200 text-xs sm:text-sm font-semibold">
                  {dest}
                </span>
              ))}
            </div>
            <p>
              When requesting a quotation, provide the complete delivery address or postcode so the appropriate service can be assessed.
            </p>

            {/* HOW IT WORKS */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Truck className="w-7 h-7 text-primary shrink-0" /> How Nigeria-to-UK Shipping Works
            </h2>
            <div className="space-y-4 my-8 not-prose">
              {howItWorksSteps.map((step) => (
                <div key={step.step} className="flex gap-4 bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5">
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-sm sm:text-base mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WHY CHOOSE US */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Sparkles className="w-7 h-7 text-primary shrink-0" /> Why Choose County Cargo?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
              {whyChooseUsPoints.map((point, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-secondary text-sm sm:text-base mb-1.5">{point.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA BOX */}
            <div className="my-12 p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white rounded-2xl shadow-xl not-prose" data-aos="fade-up">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/20 mb-3">
                Ready to Ship?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">
                Ship from Nigeria to the UK with County Cargo
              </h3>
              <p className="opacity-90 text-sm sm:text-base mb-4 leading-relaxed">
                Whether you are sending a single parcel to family in the UK or exporting commercial goods to British customers, County Cargo can help you navigate the international shipping process.
              </p>
              <p className="opacity-90 text-sm sm:text-base mb-6 text-blue-100 font-medium">
                Ready to ship from Nigeria to the UK? Request a quotation from County Cargo today and let our team help you identify the right freight solution for your shipment.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-5 text-base rounded-full shadow-lg">
                  <Link href="https://ship.countycargo.com">
                    Start Shipping Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-5 text-base rounded-full">
                  <Link href="/ship-from-nigeria-to-uk">View UK Rates &amp; Calculator</Link>
                </Button>
              </div>
            </div>

            {/* SOURCES */}
            <h2>Official References &amp; Regulatory Sources</h2>
            <ul className="text-sm text-gray-600">
              <li>Nigerian Export Promotion Council (NEPC) — Exporter Guidelines &amp; Documentation</li>
              <li>GOV.UK — Importing Goods into the UK: Declarations, Commodity Codes &amp; Customs Valuation</li>
              <li>UK Trade Tariff: Look up Commodity Codes, Duty and VAT rates</li>
            </ul>
            <SocialShare title="Shipping from Nigeria to the UK: Reliable Cargo & Freight Solutions | County Cargo Blog" />
          </div>
        </article>

        {/* FAQS */}
        <Faq />
      </main>
      <Footer />
    </>
  );
}
