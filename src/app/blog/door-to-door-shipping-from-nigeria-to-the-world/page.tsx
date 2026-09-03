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
} from 'lucide-react';
import { Faq } from './faq';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';

export const metadata: Metadata = {
  title: 'Door-to-Door Shipping from Nigeria to the World | County Cargo Blog',
  description:
    'Ship from Nigeria to the UK, USA, Canada, Australia, Germany, Europe, Asia, Africa and 200+ destinations worldwide. Complete guide on door-to-door cargo, DHL Express 3–5 day delivery, food shipping rules, and NEPC export compliance.',
  keywords:
    'door to door shipping from nigeria, ship from nigeria to the world, nigeria export blog, dhl express nigeria, shipping food from nigeria, nigeria to uk, nigeria to usa, nigeria to canada, international freight nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/door-to-door-shipping-from-nigeria-to-the-world',
  },
};

const majorDestinations = [
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    cities: 'London, Manchester, Birmingham, Liverpool, Leeds, Sheffield, Leicester, Nottingham, Bristol, Coventry, Newcastle, Southampton, Glasgow, Edinburgh, Cardiff, Belfast',
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    cities: 'New York, New Jersey, Houston, Dallas, Atlanta, Chicago, Washington DC, Maryland, Virginia, Boston, Philadelphia, Los Angeles, San Francisco, California, Florida, Orlando, Miami, Seattle, Texas',
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    cities: 'Toronto, Ottawa, Montreal, Vancouver, Calgary, Edmonton, Winnipeg, Mississauga, Brampton, Hamilton, Quebec City',
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    cities: 'Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Gold Coast, Newcastle, Hobart, Darwin',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    cities: 'Berlin, Frankfurt, Munich, Hamburg, Cologne, Düsseldorf, Stuttgart, Dortmund, Leipzig, Bremen',
  },
  {
    country: 'France',
    flag: '🇫🇷',
    cities: 'Paris, Marseille, Lyon, Toulouse, Nice, Bordeaux, Lille, Strasbourg, Nantes',
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    cities: 'Rome, Milan, Naples, Turin, Bologna, Florence, Venice, Genoa, Palermo',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    cities: 'Madrid, Barcelona, Valencia, Seville, Málaga, Bilbao, Alicante, Zaragoza',
  },
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    cities: 'Amsterdam, Rotterdam, The Hague, Utrecht, Eindhoven, Tilburg',
  },
  {
    country: 'Ireland',
    flag: '🇮🇪',
    cities: 'Dublin, Cork, Galway, Limerick, Waterford',
  },
  {
    country: 'Switzerland',
    flag: '🇨🇭',
    cities: 'Zurich, Geneva, Basel, Bern, Lausanne, Lucerne',
  },
  {
    country: 'United Arab Emirates (UAE)',
    flag: '🇦🇪',
    cities: 'Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah',
  },
  {
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    cities: 'Riyadh, Jeddah, Dammam, Mecca, Medina, Khobar',
  },
  {
    country: 'South Africa',
    flag: '🇿🇦',
    cities: 'Johannesburg, Cape Town, Durban, Pretoria, Port Elizabeth, Bloemfontein',
  },
  {
    country: 'Other African Countries',
    flag: '🌍',
    cities: 'Ghana (Accra, Kumasi), Kenya (Nairobi, Mombasa), Uganda (Kampala), Tanzania (Dar es Salaam), Rwanda (Kigali), Senegal (Dakar), Sierra Leone (Freetown), Liberia (Monrovia), Morocco (Casablanca), Egypt (Cairo), Ethiopia (Addis Ababa)',
  },
  {
    country: 'Asia & Pacific',
    flag: '🌏',
    cities: 'China (Beijing, Shanghai, Guangzhou, Shenzhen), India (Mumbai, Delhi, Bangalore), Japan (Tokyo, Osaka), Singapore, Malaysia (Kuala Lumpur), Thailand (Bangkok), South Korea (Seoul), Indonesia (Jakarta), Philippines (Manila)',
  },
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

export default function DoorToDoorShippingNigeriaWorldBlogPage() {
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': 'Door-to-Door Shipping from Nigeria to the World | County Cargo',
    'description':
      'Ship from Nigeria to the UK, USA, Canada, Australia, Germany, Europe and 200+ destinations worldwide. Professional freight, express courier, foodstuff shipping, and export documentation guide.',
    'image': 'https://countycargo.com/service-nigeria-world.png',
    'datePublished': '2026-08-28T08:00:00+01:00',
    'dateModified': '2026-08-28T08:00:00+01:00',
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
      '@id': 'https://countycargo.com/blog/door-to-door-shipping-from-nigeria-to-the-world',
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
            background: `linear-gradient(rgba(10, 25, 47, 0.82), rgba(15, 23, 42, 0.9)), url('/service-nigeria-world.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Globe className="w-3.5 h-3.5" /> Worldwide Export Guide · 200+ Countries
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Door-to-Door Shipping from Nigeria to the World
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow text-blue-100 font-light">
              Ship from Nigeria to the UK, USA, Canada, Australia, Germany, Europe and 200+ destinations worldwide with County Cargo.
            </p>
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Staff</span>
              <span>•</span>
              <span>28 August 2026</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </div>
        </section>

        {/* ARTICLE BODY */}
        <article className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose lg:prose-xl text-gray-800">
            <p className="lead text-lg sm:text-xl text-gray-700 leading-relaxed font-normal">
              Whether you are sending a parcel to family abroad, exporting Nigerian products, shipping business inventory or sending personal belongings overseas, County Cargo provides international door-to-door shipping from Nigeria to destinations around the world.
            </p>
            <p>
              From Lagos, Abuja, Port Harcourt, Kano, Ibadan and other locations across Nigeria, we help customers move permitted cargo internationally with reliable freight, express courier and delivery solutions.
            </p>
            <p>
              Our services cover major destinations across Europe, North America, Africa, Asia, the Middle East and Australia, with options designed for individuals, families, online businesses and commercial exporters.
            </p>

            <hr />

            {/* DOOR TO DOOR OVERVIEW */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Boxes className="w-7 h-7 text-primary shrink-0" /> Door-to-Door Shipping from Nigeria
            </h2>
            <p>
              International shipping should not require you to organise multiple companies for collection, transportation and final delivery.
            </p>
            <p>
              With County Cargo’s door-to-door shipping service, your shipment can be collected or accepted in Nigeria, processed for international transportation and delivered to the recipient’s address at the destination, subject to the selected service and destination requirements.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-8 not-prose">
              <h3 className="text-base sm:text-lg font-bold text-secondary mb-3">
                This means you can ship from Nigeria to:
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                United Kingdom • United States • Canada • Australia • Germany • France • Italy • Spain • Netherlands • Ireland • Belgium • Portugal • Switzerland • Austria • Sweden • Norway • Denmark • Finland • Poland • Czech Republic • UAE • Saudi Arabia • Qatar • South Africa • Ghana • Kenya • Uganda • Tanzania • Rwanda • Cameroon • Sierra Leone • Liberia • Senegal • Morocco • Egypt • India • China • Japan • Singapore • Malaysia • New Zealand and many other destinations worldwide.
              </p>
              <p className="text-xs text-primary font-bold mt-4 pt-3 border-t border-gray-200">
                County Cargo currently advertises international export services from Nigeria to more than 200 countries.
              </p>
            </div>

            <hr />

            {/* DESTINATIONS BREAKDOWN */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Globe className="w-7 h-7 text-primary shrink-0" /> Global Destination Coverage &amp; Popular Cities
            </h2>
            <div className="space-y-6 my-8 not-prose">
              {majorDestinations.map((dest, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
                  <h3 className="text-base sm:text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                    <span className="text-xl">{dest.flag}</span> Ship from Nigeria to {dest.country}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    <strong>Popular destinations:</strong> {dest.cities}
                  </p>
                </div>
              ))}
            </div>

            <hr />

            {/* DHL EXPRESS BANNER */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Zap className="w-7 h-7 text-amber-500 shrink-0" /> Express Shipping from Nigeria with DHL
            </h2>
            <p>
              When speed is critical, County Cargo offers an Express Shipping service from Nigeria using DHL Express.
            </p>
            <p>
              Our website currently advertises a DHL Express 3–5 day service, subject to destination, shipment type, customs processing and other applicable conditions.
            </p>
            <p>
              DHL Express operates a global network covering more than 220 countries and territories and describes its core Express services as providing secure door-to-door delivery with tracking.
            </p>
            <p>This makes express shipping particularly useful when you need to send:</p>
            <ul>
              <li>Important documents &amp; certificates</li>
              <li>Business samples &amp; prototypes</li>
              <li>Urgent parcels &amp; care packages</li>
              <li>E-commerce orders</li>
              <li>Small packages</li>
              <li>Time-sensitive personal belongings</li>
              <li>Permitted food products</li>
              <li>Commercial samples</li>
            </ul>

            <hr />

            {/* NATIONWIDE NIGERIA COVERAGE */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <MapPin className="w-7 h-7 text-primary shrink-0" /> County Cargo Door-to-Door Shipping Across Nigeria
            </h2>
            <p>
              Your international shipment doesn’t have to start in Lagos.
            </p>
            <p>
              County Cargo’s current pricing information lists door-to-door and collection services across all Nigerian states and the Federal Capital Territory, with delivery time and pricing varying by state.
            </p>
            <p>
              This gives customers outside Lagos and Abuja an easier way to access international export services.
            </p>
            <p>
              Customers can ship from or arrange cargo movement from locations including: <strong>Lagos, Abuja, Port Harcourt, Ibadan, Kano, Benin City, Enugu, Kaduna, Jos, Ilorin, Abeokuta, Akure, Uyo, Calabar, Owerri, Asaba, Warri, Onitsha, Aba</strong> and other locations across Nigeria.
            </p>

            <hr />

            {/* WHAT CAN I SHIP */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Package className="w-7 h-7 text-primary shrink-0" /> What Can I Ship from Nigeria?
            </h2>
            <p>County Cargo handles a wide range of permitted international shipments.</p>
            <p>Depending on destination-country regulations, customers may ship:</p>

            <h3>1. Personal Effects</h3>
            <ul>
              <li>Clothing &amp; traditional attire</li>
              <li>Shoes, bags &amp; accessories</li>
              <li>Household belongings</li>
              <li>Gifts &amp; souvenirs</li>
              <li>Personal items</li>
            </ul>

            <h3>2. Nigerian Food Products</h3>
            <p>Depending on destination restrictions, customers may ship permitted items such as:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4 not-prose">
              {permittedFoodItems.map((food, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800">
                  <Utensils className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{food}</span>
                </div>
              ))}
            </div>

            <h3>3. Business &amp; Commercial Cargo</h3>
            <ul>
              <li>Fashion products &amp; African wear</li>
              <li>Retail merchandise &amp; cosmetics</li>
              <li>Business samples &amp; materials</li>
              <li>E-commerce orders</li>
              <li>Documents &amp; paperwork</li>
              <li>Commercial merchandise</li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
              <div className="flex items-start gap-3 text-amber-950 text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Important Compliance Rule:</strong> Not every product is permitted in every country. Food, agricultural products, medicines, cosmetics, batteries, liquids and other regulated goods may have additional restrictions. Always confirm the specific item and destination before dispatch.
                </div>
              </div>
            </div>

            <hr />

            {/* HOW IT WORKS */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Truck className="w-7 h-7 text-primary shrink-0" /> How County Cargo Door-to-Door Shipping Works
            </h2>
            <ol className="space-y-3">
              <li><strong>Request a Quote:</strong> Tell us what you are shipping, where it is going, the approximate weight and the destination.</li>
              <li><strong>Prepare Your Shipment:</strong> Pack your goods securely and ensure the contents are permitted for transportation.</li>
              <li><strong>Collection or Drop-Off:</strong> Depending on your location and selected service, your cargo can be collected or delivered to the appropriate County Cargo location.</li>
              <li><strong>Documentation:</strong> We process the shipment information and applicable transportation documentation. Nigeria’s National Export Promotion Council confirms that export documentation is an important requirement for formal exports (NEPC).</li>
              <li><strong>International Transportation:</strong> Your shipment is transported using the selected international freight or express service.</li>
              <li><strong>Customs Processing:</strong> The shipment undergoes applicable customs and regulatory procedures in the destination country.</li>
              <li><strong>Door-to-Door Delivery:</strong> Once released for delivery, the shipment proceeds to the recipient’s address according to the selected service.</li>
            </ol>

            <hr />

            {/* WHY CHOOSE US */}
            <h2 className="flex items-center gap-3 text-secondary font-bold">
              <Sparkles className="w-7 h-7 text-primary shrink-0" /> Why Choose County Cargo for International Shipping?
            </h2>
            <ul>
              <li><strong>200+ International Destinations:</strong> County Cargo currently advertises export shipping from Nigeria to more than 200 countries worldwide.</li>
              <li><strong>Door-to-Door Service:</strong> We provide solutions designed to move your shipment from Nigeria to the recipient’s destination.</li>
              <li><strong>DHL Express Option:</strong> For customers requiring a faster service, County Cargo offers DHL Express shipping (3–5 day delivery timeframe).</li>
              <li><strong>Nationwide Nigeria Coverage:</strong> Coverage across Nigerian states and the FCT for collection and drop-off.</li>
              <li><strong>International Freight Experience:</strong> Tailored for individuals, families, entrepreneurs and businesses moving cargo internationally.</li>
              <li><strong>Shipment Tracking:</strong> Access shipment visibility through our client portal.</li>
            </ul>

            {/* CTA BOX */}
            <div className="my-12 p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white rounded-2xl shadow-xl not-prose" data-aos="fade-up">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/20 mb-3">
                Get Your Door-to-Door Shipping Quote
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">
                Export from Nigeria with Confidence
              </h3>
              <p className="opacity-90 text-sm sm:text-base mb-4 leading-relaxed">
                Ready to send your cargo from Nigeria? Tell us your pickup location, destination, cargo type, weight and dimensions, and our team can help you identify the appropriate door-to-door, economy or express shipping solution.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-5 text-base rounded-full shadow-lg">
                  <Link href="https://ship.countycargo.com">
                    Get a Free Quote Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-5 text-base rounded-full">
                  <Link href="/ship-from-nigeria-to-world">Explore Global Services</Link>
                </Button>
              </div>
            </div>

            {/* REFERENCES */}
            <h2>Official References &amp; Sources</h2>
            <ul className="text-sm text-gray-600">
              <li>Nigerian Export Promotion Council (NEPC) — Exporter Guidelines &amp; Documentation</li>
              <li>County Cargo International Freight Network (200+ Destinations)</li>
              <li>DHL Express Global Network Specifications</li>
            </ul>
            <SocialShare title="Door-to-Door Shipping from Nigeria to the World | County Cargo Blog" />
          </div>
        </article>

        {/* FAQS */}
        <Faq />
      </main>
      <Footer />
    </>
  );
}
