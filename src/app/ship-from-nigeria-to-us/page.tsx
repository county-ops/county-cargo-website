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
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { Faq } from './faq';
import { NigeriaUsQuoteForm } from './quote-form';
import placeholders from '@/app/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Shipping from Nigeria to the US: Reliable Cargo & Freight Solutions | County Cargo',
  description:
    'Move your cargo from Nigeria to the United States of America with confidence. Professional air and sea freight solutions from Lagos and Abuja to Atlanta, Houston, Dallas, New York, Chicago, and nationwide US destinations.',
  keywords:
    'shipping from nigeria to us, air freight nigeria to usa, cargo lagos to atlanta, shipping nigeria to houston, dallas nigeria cargo, send food to usa from nigeria, export from nigeria to usa, nepc export usa, county cargo usa',
  alternates: {
    canonical: 'https://countycargo.com/ship-from-nigeria-to-us',
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
  'Documents and legal certificates',
  'Personal parcels and care packages',
  'Fashion wear, textiles and clothing',
  'Business samples and prototypes',
  'Permitted dried food products',
  'E-commerce customer orders',
  'Smaller commercial shipments',
  'Urgent and time-sensitive cargo',
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
  'African fashion & traditional wear',
  'Textiles, fabrics & clothing',
  'Retail products & cosmetics',
  'Packaged dried food products',
  'Arts, crafts & cultural artifacts',
  'Commercial business samples',
  'E-commerce customer shipments',
  'Wholesale commercial inventory',
];

const usDestinations = [
  'Atlanta (GA)',
  'Houston (TX)',
  'Dallas / Fort Worth (TX)',
  'New York City (NY)',
  'Newark (NJ)',
  'Chicago (IL)',
  'Washington D.C.',
  'Baltimore & Maryland (MD)',
  'Los Angeles (CA)',
  'Philadelphia (PA)',
  'Boston (MA)',
  'Miami / Orlando (FL)',
  'Minneapolis / St. Paul (MN)',
  'Austin (TX)',
  'Seattle (WA)',
  'Charlotte & Raleigh (NC)',
  'Indianapolis (IN)',
  'Phoenix (AZ)',
  'San Francisco Bay Area (CA)',
];

const howItWorksSteps = [
  {
    step: '1',
    title: 'Tell Us What You Are Shipping',
    desc: 'Provide details about the cargo, destination state, approximate weight, dimensions and intended service.',
  },
  {
    step: '2',
    title: 'Choose Your Shipping Method',
    desc: 'Depending on the shipment urgency and volume, air freight or sea freight may be appropriate.',
  },
  {
    step: '3',
    title: 'Prepare Your Documentation',
    desc: 'Cargo descriptions, packing lists, and applicable Nigerian export documentation should be prepared accurately.',
  },
  {
    step: '4',
    title: 'Cargo Processing & Weighing',
    desc: 'Your shipment is received at our Lagos or Abuja hub, inspected, weighed, and prepared for international flight or sea dispatch.',
  },
  {
    step: '5',
    title: 'International Freight to the US',
    desc: 'The cargo travels from Nigeria to the United States using scheduled air or ocean freight connections.',
  },
  {
    step: '6',
    title: 'US Customs & FDA Processing',
    desc: 'Applicable US Customs and Border Protection (CBP) and FDA clearance procedures are completed before the cargo is released.',
  },
  {
    step: '7',
    title: 'US Nationwide Doorstep Delivery',
    desc: 'Once cleared and released, the shipment proceeds to its final delivery address or collection point anywhere across the USA.',
  },
];

const whyChooseUsPoints = [
  {
    icon: Globe,
    title: 'Professional International Freight Forwarding',
    desc: 'County Cargo is dedicated to helping individuals, families, and businesses move cargo between Nigeria and the USA with maximum confidence and security.',
  },
  {
    icon: FileCheck,
    title: 'Nigeria Export Expertise',
    desc: 'Our processes are structured around Nigerian export guidelines (NEPC) and US regulatory standards to ensure compliant, hassle-free customs clearance.',
  },
  {
    icon: Plane,
    title: 'Air & Sea Freight Options',
    desc: 'Choose between fast air cargo for urgent parcels and cost-effective sea freight for high-volume commercial inventory.',
  },
  {
    icon: Boxes,
    title: 'Cargo Consolidation',
    desc: 'Consolidated weekly air freight departures allow you to pay only for the weight you ship without booking whole containers or charters.',
  },
  {
    icon: Truck,
    title: 'Nationwide US Delivery',
    desc: 'Door-to-door delivery coverage across all 50 states, from major hubs in Georgia, Texas, New York, Maryland, and California to every US zip code.',
  },
];

const pricingTiers = [
  {
    title: 'Standard Air Cargo',
    origin: 'Lagos to USA',
    price: '₦15,500',
    per: '/kg',
    delivery: '7–14 Working Days',
    minWeight: '10kg minimum chargeable weight',
    features: [
      'Weekly scheduled air dispatch',
      'Personal effects & household goods',
      'Permitted dried foodstuffs accepted',
      'Full tracking number included',
      'Door-to-door delivery across the USA',
    ],
    highlight: true,
  },
  {
    title: 'DHL / Express Air Cargo',
    origin: 'Direct Air Courier',
    price: 'Contact Us',
    per: 'for custom quote',
    delivery: '3–5 Working Days',
    minWeight: 'Documents & Small Parcels',
    features: [
      'Fastest transit for urgent consignments',
      'Direct courier express processing',
      'Business samples & critical documents',
      'Priority customs processing',
      'Real-time door-to-door tracking',
    ],
    highlight: false,
  },
];

export default function ShipFromNigeriaToUsPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Shipping from Nigeria to the United States: Freight & Cargo Services',
    'provider': {
      '@type': 'Organization',
      'name': 'County Cargo',
      'url': 'https://countycargo.com',
      'logo': 'https://countycargo.com/county-logo.png',
    },
    'serviceType': 'Air Freight, Sea Freight, Cargo Consolidation, Door-to-Door Delivery',
    'areaServed': [
      {
        '@type': 'Country',
        'name': 'Nigeria',
      },
      {
        '@type': 'Country',
        'name': 'United States',
      },
    ],
    'description':
      'Professional freight forwarding from Nigeria to the USA. Send personal effects, permitted food items, business merchandise, and parcels from Lagos and Abuja to Atlanta, Houston, Dallas, New York, Chicago, and nationwide US destinations.',
    'offers': [
      {
        '@type': 'Offer',
        'name': 'Standard Air Cargo to USA',
        'price': '15500',
        'priceCurrency': 'NGN',
        'unitText': 'per kg',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main className="pt-16 sm:pt-20">
        {/* HERO SECTION */}
        <section
          className="relative text-white overflow-hidden py-16 sm:py-24"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1578575437130-5278ce682623?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 text-center lg:text-left" data-aos="fade-right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs sm:text-sm font-semibold mb-4">
                  <Globe className="w-4 h-4" /> Nigeria to United States Cargo Routes
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold hero-text-glow leading-tight">
                  Shipping from Nigeria to the US: Reliable Cargo &amp; Freight Solutions
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mt-4 font-light text-blue-100 hero-text-glow">
                  Move your cargo from Nigeria to the United States of America with confidence.
                </p>
                <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Whether you are sending personal belongings to family, exporting Nigerian products to American customers, shipping business inventory or sending a parcel to the US, County Cargo provides professional international freight solutions designed to make the process simple, secure and efficient.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start text-xs sm:text-sm text-blue-200">
                  <span className="px-3 py-1 bg-white/10 rounded-md border border-white/10">📍 Lagos &amp; Abuja Origins</span>
                  <span className="px-3 py-1 bg-white/10 rounded-md border border-white/10">✈️ Weekly Air Consolidations</span>
                  <span className="px-3 py-1 bg-white/10 rounded-md border border-white/10">🇺🇸 50 US States Covered</span>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold px-8 py-6 text-base shadow-xl rounded-full">
                    <Link href="#quote">Get Instant Quote &amp; Book</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-6 text-base rounded-full">
                    <Link href="#pricing">View US Rates (from ₦15,500/kg)</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5" data-aos="fade-left">
                <div className="relative aspect-square max-w-[460px] mx-auto bg-white/5 rounded-3xl p-4 border border-white/10 shadow-2xl backdrop-blur-xs">
                  <Image
                    src={placeholders.nigeriaUsHero.url}
                    alt="Shipping from Nigeria to the US"
                    fill
                    className="object-contain object-center drop-shadow-2xl"
                    data-ai-hint={placeholders.nigeriaUsHero.hint}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW & SUITABLE CARGO */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Full-Service Freight Forwarding
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
                Ship from Nigeria to the US with County Cargo
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                From Lagos and Abuja to different parts of the United States, County Cargo helps individuals and businesses move permitted cargo internationally.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Shipping internationally involves much more than simply sending a parcel. Your shipment may need to be correctly packaged, documented, classified, processed for export and cleared through US customs before it reaches its final destination. County Cargo brings these essential stages together through a professional freight-forwarding service.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm" data-aos="fade-up">
              <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-3 text-center sm:text-left">
                Our Nigeria-to-US shipping solutions are suitable for:
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 text-center sm:text-left">
                The most appropriate shipping method depends on the type, size, value and urgency of your shipment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {suitableCargoList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200/70 shadow-xs hover:border-primary/50 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AIR VS SEA FREIGHT MODALITIES */}
        <section className="py-16 sm:py-24 bg-gray-50/70 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Freight Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
                Air Freight &amp; Sea Freight from Nigeria to the US
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Choose the freight mode that best balances speed, volume, and budget for your specific cargo.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* AIR FREIGHT CARD */}
              <div
                className="bg-white rounded-2xl border-2 border-blue-500/20 hover:border-blue-500 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                data-aos="fade-right"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 bg-blue-50 text-primary rounded-xl">
                        <Plane className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-secondary">
                          Air Freight from Nigeria to the US
                        </h3>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                          Speed &amp; Time-Sensitive Cargo
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                    If speed is your priority, air freight from Nigeria to the US is an excellent solution. Air freight is particularly suitable for smaller, urgent or time-sensitive shipments.
                  </p>

                  <h4 className="font-bold text-secondary text-sm sm:text-base mb-3">
                    Customers commonly choose air freight for:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {airFreightItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-600 italic">
                    County Cargo can help you determine whether air freight is appropriate for your shipment and destination.
                  </p>
                </div>
              </div>

              {/* SEA FREIGHT CARD */}
              <div
                className="bg-white rounded-2xl border-2 border-gray-200 hover:border-secondary/60 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                data-aos="fade-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 bg-slate-100 text-secondary rounded-xl">
                        <Ship className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-secondary">
                          Sea Freight from Nigeria to the US
                        </h3>
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Volume, Pallets &amp; Containers
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                    For larger consignments, sea freight from Nigeria to the US provides a practical, cost-effective alternative to air transportation.
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                    Sea freight is particularly suitable for customers moving larger quantities of cargo, commercial inventory or consolidated shipments.
                  </p>

                  <h4 className="font-bold text-secondary text-sm sm:text-base mb-3">
                    Key advantages of ocean freight:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>Transport larger volumes and heavy merchandise without strict air weight restrictions</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>Substantially lower cost per cubic meter for commercial trade &amp; bulk exports</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>Integrated supply-chain support for recurring commercial importers and distributors</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>Full container loads (FCL) and less-than-container loads (LCL) available</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-600 italic">
                    For businesses importing or exporting regularly, sea freight forms an essential part of a broader international supply-chain strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSPARENT PRICING SECTION */}
        <section id="pricing" className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Transparent Rates
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
                Our Shipping Rates from Nigeria to the US
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Transparent and competitive pricing for your shipping needs from Lagos &amp; Abuja to any US city.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`rounded-3xl border-2 p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between ${
                    tier.highlight
                      ? 'border-primary bg-gradient-to-b from-blue-50/50 via-white to-white shadow-xl ring-2 ring-primary/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 shadow-md'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                >
                  <div>
                    {tier.highlight && (
                      <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-secondary">{tier.title}</h3>
                      <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md">
                        {tier.origin}
                      </span>
                    </div>

                    <div className="my-6">
                      <p className="text-4xl sm:text-5xl font-extrabold text-primary">
                        {tier.price}
                        <span className="text-base font-normal text-gray-500"> {tier.per}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-gray-600 font-medium">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Transit Time: {tier.delivery}</span>
                      </div>
                      <p className="text-xs text-amber-700 bg-amber-50 rounded-md p-2 mt-2 border border-amber-200/60 font-medium">
                        {tier.minWeight}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-xs sm:text-sm text-gray-700">
                          <Check className="h-4 w-4 text-green-600 mr-2.5 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild size="lg" className="w-full font-bold shadow-md rounded-xl">
                    <Link href="#quote">Calculate Cost &amp; Book</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSTANT QUOTE CALCULATOR SECTION */}
        <section id="quote" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-blue-50/20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Instant Pricing Tool
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
                Nigeria to US Shipping Calculator
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Enter your shipment details below to receive an instant estimate based on actual or volumetric weight.
              </p>
            </div>
            <NigeriaUsQuoteForm />
          </div>
        </section>

        {/* EXPORT DOCUMENTATION & US CUSTOMS CLEARANCE */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Compliance &amp; Regulations
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
                Export Documentation &amp; US Customs Clearance
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Correct export paperwork from Nigeria and proper US Customs declaration ensure your cargo clears smoothly without unnecessary holds.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* NEPC GUIDELINES */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-50 text-primary rounded-xl">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-secondary">
                      Exporting from Nigeria: Required Documents
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                    Formal exports from Nigeria require appropriate export documentation. The <strong>Nigerian Export Promotion Council (NEPC)</strong> states that exporters need to register and obtain an Exporter’s Certificate, while export documentation can include commercial invoices, packing lists, quality certificates and transportation documents depending on the goods and transaction. (NEPC)
                  </p>
                  <h4 className="font-bold text-secondary text-sm mb-2">Requirements vary according to:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700 mb-6">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> Type of goods</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> Commercial vs. personal cargo</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> Shipment declared value</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> US destination state</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> Air vs. Sea freight mode</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> Applicable regulatory controls</li>
                  </ul>
                </div>
                <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200/60 text-xs sm:text-sm text-blue-950 font-medium">
                  For commercial exporters, preparing accurate documentation before the cargo moves reduces delays and facilitates fast clearance.
                </div>
              </div>

              {/* US CUSTOMS CLEARANCE */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-secondary">
                      US Customs &amp; Border Protection (CBP)
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                    Cargo entering the United States is subject to US Customs and Border Protection (CBP) requirements. Importers and shippers need to determine whether an import declaration is required, identify the appropriate <strong>Harmonized Tariff Schedule (HTS)</strong> commodity code, and establish the customs value of the goods.
                  </p>
                  <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/60 my-4 text-xs sm:text-sm text-amber-950">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Why accurate declarations matter:</strong> Your cargo description must clearly and accurately identify what is being shipped. Commercial invoices, values, and item quantities must reflect the true contents to avoid customs holds.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-gray-600">
                  <span>County Cargo assists customers with documentation guidance, while applicable customs declarations and regulatory requirements must be completed by the appropriate parties.</span>
                  <Link
                    href="/blog/shipping-from-nigeria-to-the-us-reliable-cargo-and-freight-solutions"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1 shrink-0 mt-1 sm:mt-0"
                  >
                    Read full US export guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAN I SEND NIGERIAN FOOD TO THE US? */}
        <section className="py-16 sm:py-24 bg-gray-50/70 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Foodstuff Shipping Guidelines
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mt-2 mb-4">
                Can I Send Nigerian Food to the US?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                One of the most common reasons people ship from Nigeria to the US is to send familiar Nigerian food products to family, diaspora communities, and African food retailers.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm" data-aos="fade-up">
              <h3 className="text-base sm:text-lg font-bold text-secondary mb-3 text-center sm:text-left">
                Permitted Nigerian Food Products Commonly Shipped to the US:
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 text-center sm:text-left">
                Depending on the specific product and US FDA/USDA import rules, customers may ship permitted dried items such as:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
                {permittedFoodItems.map((food, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800 hover:border-primary/40 transition-colors"
                  >
                    <Utensils className="w-4 h-4 text-primary shrink-0" />
                    <span>{food}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-xs sm:text-sm text-amber-950">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1">Important US Food Compliance Notice:</h4>
                    <p className="leading-relaxed">
                      Food is not automatically permitted simply because it is commercially available in Nigeria. Import restrictions vary according to the type of product, ingredients, processing, packaging, and quantity. Perishable fresh meats, poultry, dairy, and unprocessed seeds are strictly prohibited. <em>Always confirm the acceptability and commercial packaging requirements of a specific food product before dispatch.</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NIGERIA TO US SHIPPING FOR BUSINESSES */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6" data-aos="fade-right">
                <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                  Commercial Freight &amp; SME Export
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mt-2 mb-4">
                  Nigeria to US Shipping for Businesses
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                  County Cargo supports businesses looking to move products between Nigeria and the United States. For Nigerian enterprises, international freight provides a reliable route into the vast US market for permitted goods and merchandise.
                </p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                  Whether you are fulfilling e-commerce orders for American shoppers or exporting wholesale inventory to US retail partners, a professional export process helps businesses establish predictable logistics as they scale.
                </p>
                <Button asChild className="font-semibold shadow-md">
                  <Link href="#quote">
                    Get Commercial Cargo Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className="lg:col-span-6" data-aos="fade-left">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                    <Store className="w-5 h-5 text-primary" /> Popular Commercial Cargo Categories:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {businessExportItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200/70 text-xs sm:text-sm font-medium text-gray-800">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* US NATIONWIDE DESTINATIONS COVERAGE */}
        <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Nationwide US Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mt-2 mb-4">
                Shipping from Nigeria to Atlanta, Houston, Dallas &amp; Across the USA
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Your recipient does not have to be located in a single major coastal city. County Cargo supports shipments destined for locations throughout all 50 US states.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-4xl mx-auto shadow-xs" data-aos="fade-up">
              <h3 className="text-base sm:text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Popular US Destination Cities &amp; Hubs:
              </h3>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {usDestinations.map((dest, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-50 text-secondary border border-blue-200/80 text-xs sm:text-sm font-semibold hover:bg-blue-100/70 transition-colors"
                  >
                    {dest}
                  </span>
                ))}
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700">
                <strong>Delivery Tip:</strong> When requesting a quotation or booking a shipment, provide the complete US delivery street address, state, and 5-digit Zip Code so the appropriate domestic delivery service and rate can be calculated accurately.
              </div>
            </div>
          </div>
        </section>

        {/* 7-STEP WORKFLOW */}
        <section id="process" className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Step-by-Step Logistics
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
                How Nigeria-to-US Shipping Works
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Our structured 7-step process manages your shipment from origin receiving in Nigeria all the way to final delivery across the US.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {howItWorksSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 hover:bg-blue-50/30 border border-gray-200 hover:border-primary/30 rounded-2xl p-5 sm:p-6 transition-all"
                  data-aos="fade-up"
                  data-aos-delay={`${idx * 50}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-secondary mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16" data-aos="fade-up">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Why County Cargo
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
                Why Choose County Cargo for US Freight?
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Built on dependability, transparent billing, and dedicated international cargo handling.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {whyChooseUsPoints.map((point, idx) => {
                const IconComponent = point.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all hover:border-primary/40"
                    data-aos="fade-up"
                    data-aos-delay={`${idx * 80}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-5">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary mb-2">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ COMPONENT */}
        <Faq />

        {/* FINAL CALL TO ACTION */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/20 mb-4">
              Get Started Today
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 hero-text-glow">
              Ship from Nigeria to the US with County Cargo
            </h2>
            <p className="text-base sm:text-lg text-blue-100 opacity-90 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
              Whether you are sending a single parcel to family in the US or exporting commercial goods to American customers, County Cargo can help you navigate the international shipping process.
            </p>
            <p className="text-base sm:text-lg font-semibold text-white mb-8">
              Ready to ship from Nigeria to the US? Request a quotation from County Cargo today and let our team help you identify the right freight solution for your shipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-bold px-10 py-6 text-base rounded-full shadow-2xl transition-all hover:scale-105"
              >
                <Link href="https://ship.countycargo.com">Start Shipping Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-8 py-6 text-base rounded-full"
              >
                <Link href="#quote">Calculate Shipping Cost</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
