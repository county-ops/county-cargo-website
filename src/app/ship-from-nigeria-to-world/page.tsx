import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Globe,
  Plane,
  Ship,
  Truck,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Zap,
  Package,
  FileCheck,
  Building2,
  Store,
  Scale,
  Utensils,
  AlertTriangle,
  Boxes,
  Clock,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Door-to-Door Shipping from Nigeria to the World (200+ Countries) | County Cargo',
  description:
    'Ship from Nigeria to the UK, USA, Canada, Australia, Germany, Europe, Asia, Africa and 200+ destinations worldwide. Professional door-to-door cargo, DHL Express 3–5 day delivery, foodstuff shipping, and NEPC export handling.',
  keywords:
    'door to door shipping from nigeria, ship from nigeria to worldwide, nigeria to uk cargo, nigeria to usa freight, nigeria to canada shipping, nigeria to australia, dhl express nigeria, send food from nigeria, export cargo nigeria, international shipping from nigeria',
  alternates: {
    canonical: 'https://countycargo.com/ship-from-nigeria-to-world',
  },
};

const majorDestinations = [
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    popularCities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds', 'Sheffield', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast'],
    href: '/ship-from-nigeria-to-uk',
    description: 'Weekly scheduled consolidated air and ocean cargo with nationwide UK doorstep delivery.',
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    popularCities: ['New York', 'Houston', 'Atlanta', 'Dallas', 'Chicago', 'Washington D.C.', 'Maryland', 'Los Angeles', 'Miami'],
    href: '/ship-from-nigeria-to-us',
    description: 'Door-to-door delivery across all 50 states with FDA Prior Notice & CBP customs clearance.',
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    popularCities: ['Toronto', 'Ottawa', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Winnipeg', 'Brampton', 'Mississauga'],
    href: 'https://ship.countycargo.com',
    description: 'Personal belongings, foodstuff, and business merchandise delivered across Canadian provinces.',
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    popularCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast'],
    href: 'https://ship.countycargo.com',
    description: 'International freight & express courier compliant with Australian biosecurity standards.',
  },
  {
    country: 'Germany & Europe',
    flag: '🇪🇺',
    popularCities: ['Berlin', 'Frankfurt', 'Munich', 'Hamburg', 'Paris', 'Rome', 'Madrid', 'Amsterdam', 'Dublin', 'Zurich'],
    href: 'https://ship.countycargo.com',
    description: 'Direct air links and EU customs clearance to Germany, France, Italy, Spain, Netherlands, Ireland, Switzerland, and 30+ European nations.',
  },
  {
    country: 'UAE & Middle East',
    flag: '🇦🇪',
    popularCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Riyadh', 'Jeddah', 'Dammam', 'Doha'],
    href: 'https://ship.countycargo.com',
    description: 'High-frequency air cargo connecting Nigerian traders and families to Dubai, Saudi Arabia, and Qatar.',
  },
  {
    country: 'African Countries',
    flag: '🌍',
    popularCities: ['Accra', 'Nairobi', 'Kampala', 'Johannesburg', 'Cape Town', 'Kigali', 'Dakar', 'Cairo'],
    href: 'https://ship.countycargo.com',
    description: 'Intra-African trade corridors connecting Ghana, Kenya, Uganda, South Africa, Rwanda, and 20+ countries.',
  },
  {
    country: 'Asia & Pacific',
    flag: '🌏',
    popularCities: ['Beijing', 'Guangzhou', 'Mumbai', 'Delhi', 'Tokyo', 'Singapore', 'Kuala Lumpur', 'Auckland'],
    href: 'https://ship.countycargo.com',
    description: 'Trade and sample freight to China, India, Japan, Singapore, Malaysia, and New Zealand.',
  },
];

const nigerianOriginHubs = [
  'Lagos (Ikeja, Lekki, Trade Fair)',
  'Abuja (FCT)',
  'Port Harcourt (Rivers)',
  'Ibadan (Oyo)',
  'Kano (Kano)',
  'Benin City (Edo)',
  'Enugu (Enugu)',
  'Kaduna (Kaduna)',
  'Jos (Plateau)',
  'Ilorin (Kwara)',
  'Abeokuta (Ogun)',
  'Akure (Ondo)',
  'Uyo (Akwa Ibom)',
  'Calabar (Cross River)',
  'Owerri (Imo)',
  'Asaba & Warri (Delta)',
  'Onitsha & Aba (Anambra / Abia)',
];

const permittedFoodBadgeList = [
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

const commercialExportList = [
  'African fashion & traditional attire',
  'Fabrics, textiles, and clothing',
  'Retail merchandise & cosmetics',
  'Packaged dried food products',
  'Arts, crafts & cultural artifacts',
  'Commercial product samples',
  'E-commerce order fulfillment',
  'Wholesale trade consignments',
];

const workflowSteps = [
  {
    num: '01',
    title: 'Request a Quote',
    desc: 'Tell us what you are shipping, origin state in Nigeria, destination country, weight, and dimensions.',
  },
  {
    num: '02',
    title: 'Prepare Your Shipment',
    desc: 'Pack your items securely. Ensure all goods are permitted under destination import and biosecurity regulations.',
  },
  {
    num: '03',
    title: 'Collection or Drop-Off',
    desc: 'Arrange doorstep pickup anywhere in Nigeria or drop off your cargo at our Lagos, Abuja, or regional branches.',
  },
  {
    num: '04',
    title: 'Documentation & NEPC Verification',
    desc: 'We process airway bills, commercial invoices, packing lists, and Nigerian Export Promotion Council (NEPC) paperwork.',
  },
  {
    num: '05',
    title: 'International Transportation',
    desc: 'Your cargo is dispatched via scheduled international air cargo, DHL Express flight, or ocean freight.',
  },
  {
    num: '06',
    title: 'Destination Customs Clearance',
    desc: 'Shipment undergoes standard customs inspection, duty assessment, and regulatory release in the recipient country.',
  },
  {
    num: '07',
    title: 'Door-to-Door Delivery',
    desc: 'Once cleared, the courier delivers the package directly to the recipient’s doorstep with real-time tracking.',
  },
];

const whyChooseUsPillars = [
  {
    title: '200+ International Destinations',
    desc: 'Ship from Nigeria to the UK, USA, Canada, Australia, Europe, Asia, Middle East, and worldwide seamlessly.',
  },
  {
    title: 'Complete Door-to-Door Service',
    desc: 'From nationwide Nigerian pickup to the recipient’s doorstep abroad, we manage every single stage of the supply chain.',
  },
  {
    title: 'DHL Express 3–5 Day Option',
    desc: 'For urgent documents, samples, and time-critical parcels, enjoy premium global courier speed powered by DHL.',
  },
  {
    title: 'Nationwide Nigeria Coverage',
    desc: 'Send cargo from Lagos, Abuja, Port Harcourt, Kano, Ibadan, Enugu, or any of the 36 states and the FCT.',
  },
  {
    title: 'Export Compliance & Documentation',
    desc: 'Professional assistance with NEPC export certificates, commercial invoices, FDA notice, and customs clearance.',
  },
  {
    title: 'Live Online Shipment Tracking',
    desc: 'Monitor your shipment 24/7 through our modern client tracking portal from origin drop-off to destination delivery.',
  },
];

export default function ShipFromNigeriaToWorldPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Door-to-Door Shipping from Nigeria to the World',
            'provider': {
              '@type': 'Organization',
              'name': 'County Cargo',
              'url': 'https://countycargo.com',
              'logo': 'https://countycargo.com/county-logo.png',
            },
            'serviceType': 'International Freight Forwarding & Door-to-Door Cargo',
            'areaServed': {
              '@type': 'Country',
              'name': 'Worldwide',
            },
            'description':
              'Door-to-door air freight, sea freight, and DHL Express shipping from Nigeria to the UK, USA, Canada, Australia, Germany, and over 200 countries worldwide.',
            'offers': {
              '@type': 'Offer',
              'priceCurrency': 'NGN',
              'description': 'Competitive international freight rates tailored by weight, volume, and destination country.',
            },
          }),
        }}
      />
      <Header />
      <main className="pt-16 bg-white">
        {/* HERO SECTION */}
        <section
          className="min-h-[60vh] sm:min-h-[65vh] flex items-center justify-center text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.82), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-5">
              <Globe className="w-4 h-4" /> Global Export Services · 200+ Destinations
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold hero-text-glow leading-tight">
              Door-to-Door Shipping from Nigeria <br className="hidden sm:inline" /> to the World
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow text-blue-100 font-light leading-relaxed">
              Ship from Nigeria to the UK, USA, Canada, Australia, Germany, Europe and 200+ destinations worldwide with County Cargo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 font-bold px-8 py-6 text-base rounded-full shadow-xl">
                <Link href="https://ship.countycargo.com">
                  Get Your Shipping Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-8 py-6 text-base rounded-full">
                <Link href="/contact">Speak with an Export Specialist</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> 200+ Countries Covered
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> DHL Express 3–5 Day Option
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> NEPC Export Documentation
              </span>
            </div>
          </div>
        </section>

        {/* INTRO OVERVIEW */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                Single-Provider Convenience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
                Seamless International Freight from Nigeria
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                International shipping should not require you to organise multiple companies for collection, transportation and final delivery. With County Cargo’s door-to-door shipping service, your shipment can be collected or accepted in Nigeria, processed for international transportation and delivered directly to the recipient’s address overseas.
              </p>
            </div>

            {/* QUICK COUNTRY ROUTE TILES */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/40 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-secondary text-center mb-6">
                Direct Shipping Corridors from Nigeria:
              </h3>
              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-gray-700">
                {[
                  'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'France', 'Italy',
                  'Spain', 'Netherlands', 'Ireland', 'Belgium', 'Portugal', 'Switzerland', 'Austria',
                  'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'UAE', 'Saudi Arabia',
                  'Qatar', 'South Africa', 'Ghana', 'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Cameroon',
                  'Senegal', 'Sierra Leone', 'Liberia', 'Morocco', 'Egypt', 'India', 'China', 'Japan',
                  'Singapore', 'Malaysia', 'New Zealand', '200+ More Destinations'
                ].map((c, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white border border-gray-200/80 rounded-lg shadow-2xs hover:border-primary/50 hover:text-primary transition-all">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MAJOR DESTINATIONS GRID */}
        <section className="py-16 sm:py-20 bg-gray-50/70 border-t border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                Global Network
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
                Popular Destination Countries &amp; City Hubs
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Explore our primary door-to-door shipping corridors connecting Nigerian families, diaspora communities, and commercial exporters to the world.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {majorDestinations.map((dest, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  data-aos="fade-up"
                  data-aos-delay={`${idx * 60}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{dest.flag}</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-primary uppercase">
                        Door-to-Door
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-2">{dest.country}</h3>
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed">{dest.description}</p>
                    <div className="border-t border-gray-100 pt-3 mb-4">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Key Cities:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.popularCities.slice(0, 6).map((city, cIdx) => (
                          <span key={cIdx} className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full mt-2 font-semibold text-xs border-primary/30 text-primary hover:bg-primary hover:text-white">
                    <Link href={dest.href}>
                      Ship to {dest.country} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DHL EXPRESS BANNER */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden" data-aos="fade-up">
              <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/20 text-white border border-white/20 mb-3">
                    <Zap className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" /> Official Courier Service
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                    Express Shipping from Nigeria with DHL (3–5 Working Days)
                  </h2>
                  <p className="text-amber-50 text-sm sm:text-base leading-relaxed mb-6">
                    When speed is critical, County Cargo offers an Express Shipping service from Nigeria powered by DHL Express. Delivering across 220+ countries and territories with rapid door-to-door tracking.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-semibold text-white">
                    <div className="bg-black/15 rounded-xl p-3 text-center">Urgent Documents</div>
                    <div className="bg-black/15 rounded-xl p-3 text-center">Business Samples</div>
                    <div className="bg-black/15 rounded-xl p-3 text-center">E-Commerce Orders</div>
                    <div className="bg-black/15 rounded-xl p-3 text-center">Priority Parcels</div>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-black font-bold px-8 py-6 text-base rounded-full shadow-2xl">
                    <Link href="https://ship.countycargo.com">
                      Book DHL Express <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NATIONWIDE NIGERIA ORIGIN COVERAGE */}
        <section className="py-16 sm:py-20 bg-gray-50/70 border-t border-gray-200/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div data-aos="fade-right">
                <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                  Nationwide Collection
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
                  Door-to-Door Shipping Across All Nigerian States
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                  Your international shipment doesn’t have to start in Lagos. County Cargo covers door-to-door collection across all 36 Nigerian states and the Federal Capital Territory (FCT), giving individuals and businesses across Nigeria easy access to global markets.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {nigerianOriginHubs.map((hub, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 shadow-2xs">
                      {hub}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 italic">
                  * Collection schedules and domestic transit times vary slightly by state. Contact us for pickup arrangements.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm" data-aos="fade-left">
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Easy Pickup &amp; Drop-off Process
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-primary font-bold text-xs flex items-center justify-center shrink-0">1</div>
                    <p className="text-xs sm:text-sm text-gray-700"><strong>Book Online:</strong> Enter your local address anywhere in Nigeria and destination country.</p>
                  </div>
                  <div className="flex gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-primary font-bold text-xs flex items-center justify-center shrink-0">2</div>
                    <p className="text-xs sm:text-sm text-gray-700"><strong>Doorstep Pickup:</strong> A dispatched courier collects the cargo directly from your home, office, or farm.</p>
                  </div>
                  <div className="flex gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-primary font-bold text-xs flex items-center justify-center shrink-0">3</div>
                    <p className="text-xs sm:text-sm text-gray-700"><strong>Central Hub Processing:</strong> Cargo is safely routed to our Lagos or Abuja international air cargo gateway for export dispatch.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT CAN I SHIP FROM NIGERIA */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                Cargo Classification
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
                What Can I Ship from Nigeria?
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                County Cargo handles a comprehensive range of permitted personal, commercial, and food consignments.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Personal Effects */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6" data-aos="fade-up" data-aos-delay="0">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-3">Personal &amp; Household Effects</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> Clothing &amp; Traditional Wear</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> Shoes, bags &amp; accessories</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> Household belongings</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> Gifts &amp; care packages</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> Legal documents &amp; certificates</li>
                </ul>
              </div>

              {/* Nigerian Foodstuffs */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6" data-aos="fade-up" data-aos-delay="100">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-3">Permitted Nigerian Foodstuffs</h3>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  {permittedFoodBadgeList.map((f, i) => (
                    <span key={i} className="px-2 py-1 bg-white rounded border border-gray-200 text-[11px] font-semibold text-gray-700">
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 leading-tight">
                  * Must be commercially packaged and dried. Perishable meats &amp; fresh produce are restricted.
                </p>
              </div>

              {/* Business & Commercial Cargo */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6" data-aos="fade-up" data-aos-delay="200">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-3">Business &amp; Commercial Cargo</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {commercialExportList.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 text-amber-950 text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Important Compliance Note:</strong> Not every product is permitted in every country. Food, agricultural items, cosmetics, batteries, liquids, and regulated merchandise are subject to destination import standards (e.g. US FDA, UK DEFRA, Australia Biosecurity). Always confirm item permissibility prior to dispatch.
              </div>
            </div>
          </div>
        </section>

        {/* 7-STEP WORKFLOW */}
        <section className="py-16 sm:py-20 bg-gray-50/70 border-t border-gray-200/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
                7 Simple Steps: Nigeria to Global Doorstep
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                We handle the heavy lifting, documentation, and logistics coordination from start to finish.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowSteps.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between"
                  data-aos="fade-up"
                  data-aos-delay={`${idx * 50}`}
                >
                  <div>
                    <span className="text-2xl font-extrabold text-primary/30 font-mono mb-2 block">{s.num}</span>
                    <h3 className="text-lg font-bold text-secondary mb-2">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE COUNTY CARGO */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                The County Cargo Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
                Why Choose County Cargo for International Shipping?
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Tailored solutions designed for individuals, families, diaspora communities, and high-growth African enterprises.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUsPillars.map((p, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-secondary mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-300 border border-white/20 mb-3">
              Export with Confidence
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Ready to Send Your Cargo from Nigeria?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Whether you are shipping from Lagos to London, Abuja to New York, Port Harcourt to Toronto, or Kano to Dubai, County Cargo delivers reliable, door-to-door international freight.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 font-bold px-8 py-6 text-base rounded-full shadow-2xl">
                <Link href="https://ship.countycargo.com">
                  Book Your Cargo Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-8 py-6 text-base rounded-full">
                <Link href="/contact">Contact Our Support Team</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <Faq />
      </main>
      <Footer />
    </>
  );
}
