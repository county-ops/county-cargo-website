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
  MapPin,
  Plane,
  Ship,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  Package,
  Building,
  Truck,
  Box,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Shipping From North West England and Leeds to Nigeria | County Cargo',
  description:
    'Send air and sea cargo from Liverpool, Manchester, Preston, Leeds and surrounding areas to Nigeria with County Cargo. Fast air cargo in 5 to 10 working days & sea freight.',
  keywords:
    'Shipping from North West England to Nigeria, cargo from Preston to Nigeria, shipping from Leeds to Nigeria, Liverpool to Nigeria cargo, Manchester to Nigeria shipping, air cargo to Nigeria, sea cargo to Nigeria',
  alternates: {
    canonical:
      'https://countycargo.com/blog/shipping-north-west-england-leeds-to-nigeria',
  },
  openGraph: {
    title: 'Shipping From North West England and Leeds to Nigeria | County Cargo',
    description:
      'Send air and sea cargo from Liverpool, Manchester, Preston, Leeds and surrounding areas to Nigeria with County Cargo.',
    images: [
      {
        url: 'https://countycargo.com/images/blog/north-west-england-leeds-cargo.jpg',
        alt: 'Air and sea cargo shipping from North West England and Leeds to Nigeria with County Cargo',
      },
    ],
  },
};

export default function ShippingNorthWestEnglandLeedsToNigeriaPage() {
  const articleUrl =
    'https://countycargo.com/blog/shipping-north-west-england-leeds-to-nigeria';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Shipping From North West England and Leeds to Nigeria',
    description:
      'Send air and sea cargo from Liverpool, Manchester, Preston, Leeds and surrounding areas to Nigeria with County Cargo.',
    image: 'https://countycargo.com/images/blog/north-west-england-leeds-cargo.jpg',
    datePublished: '2026-09-07T08:00:00+01:00',
    dateModified: '2026-09-07T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Logistics Team',
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
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: 'County Cargo',
    url: 'https://countycargo.com',
    logo: 'https://countycargo.com/county-logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street',
      addressLocality: 'Liverpool',
      postalCode: 'L1 0BG',
      addressCountry: 'GB',
    },
    description:
      'Air and sea cargo shipping to Nigeria from Liverpool, Manchester, Preston, Bolton, Blackburn, Wigan, Warrington, Chester, Blackpool, Lancaster and Leeds.',
    areaServed: [
      'Liverpool',
      'Manchester',
      'Preston',
      'Bolton',
      'Blackburn',
      'Burnley',
      'Blackpool',
      'Warrington',
      'Chester',
      'Wigan',
      'Stockport',
      'Lancaster',
      'Leeds',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+447438827464',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does County Cargo ship from Preston to Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. County Cargo serves customers in Preston and surrounding PR postcode areas. Contact the team with your postcode and shipment details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I send cargo from Leeds to Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Customers across Leeds and the LS postcode districts can use County Cargo’s UK to Nigeria shipping service.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does County Cargo cover Manchester and Liverpool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. County Cargo serves Liverpool, Manchester and many surrounding areas across Merseyside and Greater Manchester.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does air cargo to Nigeria take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The estimated timeframe for standard air cargo is ${SHIPPING_TIMEFRAMES.STANDARD_AIR}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How long does sea cargo to Nigeria take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The estimated timeframe for sea cargo is ${SHIPPING_TIMEFRAMES.SEA_CARGO}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Can I ship to Abuja?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Eligible goods can be shipped to Abuja. Contact County Cargo to confirm the applicable rate, minimum weight and delivery arrangements.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does shipping to Nigeria cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The price depends on the service, weight, dimensions, contents and Nigerian destination. Contact County Cargo with your shipment details for an accurate quotation.',
        },
      },
    ],
  };

  const coverageAreas = [
    {
      region: 'Liverpool & Merseyside',
      badge: 'HQ Location',
      description: 'Air and sea cargo drop-off depot & doorstep collections.',
      postcodes: [
        'City Centre: L1, L2, L3',
        'Kensington & Fairfield: L6, L7',
        'Toxteth: L8',
        'Anfield: L4, L5',
        'Wavertree: L15',
        'Childwall: L16',
        'Aigburth: L17',
        'Allerton & Mossley Hill: L18',
        'Garston: L19',
        'Bootle: L20, L30',
        'Crosby: L22, L23',
        'Maghull: L31',
        'Prescot: L34, L35',
        'Kirkby: L32, L33',
        'Huyton: L36',
        'Ormskirk: L39, L40',
      ],
    },
    {
      region: 'Manchester & Greater Manchester',
      badge: 'Key Hub',
      description: 'Doorstep pickup across Greater Manchester for personal effects & commercial stock.',
      postcodes: [
        'City Centre: M1, M2, M3, M4',
        'Cheetham Hill: M8',
        'Harpurhey: M9',
        'Openshaw & Clayton: M11',
        'Ardwick & Longsight: M12, M13',
        'Fallowfield & Rusholme: M14',
        'Hulme: M15',
        'Old Trafford: M16',
        'Gorton: M18',
        'Levenshulme: M19',
        'Didsbury & Withington: M20',
        'Chorlton: M21',
        'Wythenshawe: M22, M23',
        'Salford: M3, M5, M6, M7, M50',
      ],
    },
    {
      region: 'Preston & Central Lancashire',
      badge: 'Covered',
      description: 'Serving Preston, Chorley, Leyland and Ribble Valley communities.',
      postcodes: [
        'Preston City Centre: PR1',
        'Fulwood & Grimsargh: PR2',
        'Penwortham: PR1',
        'Longridge & Ribchester: PR3',
        'Garstang & Kirkham: PR3, PR4',
        'Chorley: PR6, PR7',
        'Leyland: PR25, PR26',
      ],
    },
    {
      region: 'Blackburn & Burnley (East Lancashire)',
      badge: 'Covered',
      description: 'Regular cargo collections across East Lancashire towns.',
      postcodes: [
        'Blackburn: BB1, BB2',
        'Darwen: BB3',
        'Accrington: BB5',
        'Clitheroe: BB7',
        'Burnley: BB10, BB11',
        'Nelson: BB9',
        'Colne: BB8',
        'Rossendale: BB4',
      ],
    },
    {
      region: 'Bolton, Bury & Rochdale',
      badge: 'Covered',
      description: 'Northern Greater Manchester towns and commercial districts.',
      postcodes: [
        'Bolton: BL1 to BL7',
        'Bury: BL8, BL9',
        'Rochdale: OL11, OL12, OL16',
        'Oldham: OL1 to OL9',
        'Ashton-under-Lyne: OL6, OL7',
        'Middleton: M24',
      ],
    },
    {
      region: 'Wigan & Warrington',
      badge: 'Covered',
      description: 'Direct air and sea cargo booking for Cheshire-Lancashire borders.',
      postcodes: [
        'Wigan: WN1 to WN6',
        'Leigh: WN7',
        'Skelmersdale: WN8',
        'Warrington: WA1 to WA5',
        'Lymm: WA13',
        'Widnes: WA8',
        'Runcorn: WA7',
      ],
    },
    {
      region: 'Chester, Wirral & Cheshire',
      badge: 'Covered',
      description: 'Serving residential communities, students and businesses across Cheshire and Wirral.',
      postcodes: [
        'Chester: CH1 to CH4',
        'Birkenhead: CH41, CH42',
        'Wallasey: CH44, CH45',
        'Wirral: CH46 to CH49',
        'Ellesmere Port: CH65, CH66',
        'Crewe: CW1, CW2',
        'Nantwich: CW5',
        'Macclesfield: SK10, SK11',
        'Wilmslow: SK9',
        'Stockport: SK1 to SK8',
      ],
    },
    {
      region: 'Blackpool & Lancaster',
      badge: 'Covered',
      description: 'Coastal and northern Lancashire university and residential areas.',
      postcodes: [
        'Blackpool: FY1 to FY4',
        'Lytham St Annes: FY8',
        'Fleetwood: FY7',
        'Lancaster: LA1, LA2',
        'Morecambe: LA3, LA4',
        'Carnforth: LA5, LA6',
        'Barrow-in-Furness: LA14',
      ],
    },
    {
      region: 'Leeds & West Yorkshire',
      badge: 'Regional Hub',
      description: 'Serving student, medical and family diaspora across Leeds and West Yorkshire.',
      postcodes: [
        'Leeds City Centre: LS1, LS2',
        'Burley & Kirkstall: LS4, LS5',
        'Headingley: LS6',
        'Chapel Allerton: LS7',
        'Harehills: LS8, LS9',
        'Beeston & Hunslet: LS10, LS11',
        'Roundhay: LS8',
        'Moortown: LS17',
        'Pudsey: LS28',
        'Morley: LS27',
        'Bradford Border: LS12, LS13, LS19',
        'Wider Leeds: LS14 to LS29',
      ],
    },
  ];

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'Shipping From North West England and Leeds to Nigeria' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/images/blog/north-west-england-leeds-cargo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Regional Shipping Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping From North West England and Leeds to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Air and sea cargo from Liverpool, Manchester, Preston, Bolton, Blackburn, Wigan, Chester, Blackpool, Lancaster and Leeds to Lagos, Abuja and beyond.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo Logistics Team
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by UK–Nigeria Cargo Operations
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" /> 7 September 2026
              </span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-10">

            {/* Answer-First Executive Summary */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Key Details: North West England &amp; Leeds to Nigeria Cargo
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo provides full air and sea freight coverage across Liverpool, Manchester, Preston, Leeds, and all surrounding North West and West Yorkshire towns. Standard air cargo takes{' '}
                <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>, while sea cargo takes{' '}
                <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>. Drop-offs are welcome at our Liverpool headquarters, or you can book collection directly from your door.
              </p>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                North West England is home to established Nigerian and African communities, families, students, professionals and businesses that regularly send goods to Nigeria.
              </p>
              <p className="text-gray-700">
                County Cargo helps customers ship approved personal belongings, clothing, food products, household goods, electronics, business stock, boxes, suitcases, bags and barrels from North West England to Lagos, Abuja and other Nigerian destinations.
              </p>
              <p className="text-gray-700">
                Our service covers Liverpool, Manchester, Preston, Bolton, Blackburn, Blackpool, Warrington, Chester, Wigan, Stockport, Lancaster and surrounding locations. County Cargo also serves customers in Leeds and nearby areas of West Yorkshire.
              </p>
            </div>

            {/* Liverpool Office Callout */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <Building className="w-5 h-5" /> County Cargo Liverpool Headquarters
              </div>
              <p className="text-slate-300 text-sm">
                Customers can drop off cargo or arrange direct logistics through our Liverpool office:
              </p>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-sm text-slate-200">
                <p className="font-bold text-white text-base">County Cargo</p>
                <p>Unit G6, Queens Dock Commercial Centre</p>
                <p>67–83 Norfolk Street</p>
                <p>Liverpool, L1 0BG</p>
              </div>
              <p className="text-xs text-slate-400">
                * Customers should contact the team before bringing their goods to confirm shipment requirements, opening times and the applicable rate.
              </p>
            </div>

            {/* Comprehensive Area Breakdown */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Complete Service Coverage by Town &amp; Postcode
              </h2>
              <p className="text-gray-600">
                Whether you live in a city centre apartment, student accommodation or residential suburb, find your area below to see our local coverage:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coverageAreas.map((area) => (
                  <div key={area.region} className="p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-secondary text-base">{area.region}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        {area.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{area.description}</p>
                    <div className="border-t border-gray-200 pt-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1.5">Covered Postcodes &amp; Districts:</p>
                      <div className="flex flex-wrap gap-1">
                        {area.postcodes.map((pc) => (
                          <span
                            key={pc}
                            className="text-xs bg-white border border-gray-200 rounded px-2 py-0.5 text-gray-700 font-mono"
                          >
                            {pc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Air vs Sea Cargo Details */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Air Cargo vs Sea Cargo From North West England
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Air Cargo */}
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <Plane className="w-5 h-5 text-primary" /> Air Cargo to Nigeria
                  </div>
                  <p className="text-sm text-gray-700">
                    Standard air cargo is suitable for customers who require a faster service for eligible goods.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-blue-100">
                    <span className="text-xs text-gray-500 uppercase font-bold block">Estimated Timeframe</span>
                    <span className="text-lg font-extrabold text-primary">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 uppercase mb-2">Suitable For:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Clothing and footwear</li>
                      <li>• Personal belongings</li>
                      <li>• Approved packaged food products</li>
                      <li>• Household items &amp; business stock</li>
                      <li>• Product samples &amp; educational materials</li>
                      <li>• Approved electronics</li>
                    </ul>
                  </div>
                </div>

                {/* Sea Cargo */}
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-secondary font-bold text-lg">
                    <Ship className="w-5 h-5 text-secondary" /> Sea Cargo to Nigeria
                  </div>
                  <p className="text-sm text-gray-700">
                    Sea cargo is suitable for larger, heavier or less urgent shipments where cost-efficiency is paramount.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-xs text-gray-500 uppercase font-bold block">Estimated Timeframe</span>
                    <span className="text-lg font-extrabold text-secondary">{SHIPPING_TIMEFRAMES.SEA_CARGO}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 uppercase mb-2">Suitable For:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Boxes and cartons</li>
                      <li>• 55-gallon barrels &amp; drums</li>
                      <li>• Suitcases and large bags</li>
                      <li>• Heavy household goods &amp; appliances</li>
                      <li>• Business and commercial stock</li>
                      <li>• Bulky personal effects &amp; part loads</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Nigerian Destinations */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Nigerian Delivery Destinations
              </h2>
              <p className="text-gray-700">
                County Cargo ships eligible goods to <strong>Lagos</strong>, <strong>Abuja</strong> and destinations across Nigeria.
              </p>
              <p className="text-gray-700">
                For locations outside Lagos, the final delivery may be arranged through an approved collection point, local delivery provider, motor park or another agreed method. Customers should confirm the delivery arrangement and any applicable charge before shipment.
              </p>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-wrap gap-2">
                {[
                  'Lagos (Door delivery or collection)',
                  'Abuja (Doorstep delivery available)',
                  'Port Harcourt',
                  'Kano',
                  'Ibadan',
                  'Enugu',
                  'Onitsha',
                  'Benin City',
                  'Aba',
                  'Warri',
                ].map((dest) => (
                  <span key={dest} className="text-xs bg-white border border-gray-300 rounded-md px-3 py-1 font-medium text-secondary">
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* What Can You Ship */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                What Can You Ship to Nigeria?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-green-50 border border-green-200 rounded-xl space-y-2">
                  <h3 className="font-bold text-green-900 flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-700" /> Commonly Accepted Goods
                  </h3>
                  <ul className="text-xs text-green-900 space-y-1">
                    <li>• Clothing, footwear and textiles</li>
                    <li>• Personal belongings and toiletries</li>
                    <li>• Books, educational items and documents</li>
                    <li>• Approved dry/packaged food items</li>
                    <li>• Household goods and kitchenware</li>
                    <li>• Commercial inventory and stock samples</li>
                    <li>• Approved electrical appliances</li>
                  </ul>
                </div>

                <div className="p-5 bg-red-50 border border-red-200 rounded-xl space-y-2">
                  <h3 className="font-bold text-red-900 flex items-center gap-1.5 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-700" /> Restricted &amp; Prohibited Items
                  </h3>
                  <ul className="text-xs text-red-900 space-y-1">
                    <li>• Loose lithium batteries or unapproved power banks</li>
                    <li>• Flammable liquids, perfumes and aerosols</li>
                    <li>• Restricted prescription medicines without clearance</li>
                    <li>• Perishable fresh food items</li>
                    <li>• Hazardous chemicals, weapons and explosives</li>
                    <li>• Concealed or falsely declared goods</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">
                * Do not conceal or incorrectly describe any item. Send County Cargo a complete list of contents before arranging your shipment.
              </p>
            </div>

            {/* How to Prepare Your Cargo */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                How to Prepare Your Cargo
              </h2>
              <p className="text-gray-700">
                Use a strong box, suitcase, bag or barrel that can support the weight of the contents. Wrap fragile goods individually, seal liquids securely and prevent items from moving inside the package.
              </p>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <p className="font-semibold text-secondary text-sm">
                  Every shipment must include the following information:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  <div className="bg-white p-2.5 rounded border border-gray-200">
                    <strong>Sender Details:</strong> Full name, UK address, postcode &amp; telephone number
                  </div>
                  <div className="bg-white p-2.5 rounded border border-gray-200">
                    <strong>Receiver Details:</strong> Full name, Nigerian address &amp; local telephone number
                  </div>
                  <div className="bg-white p-2.5 rounded border border-gray-200">
                    <strong>Cargo Information:</strong> Complete description of contents &amp; package count
                  </div>
                  <div className="bg-white p-2.5 rounded border border-gray-200">
                    <strong>Weight &amp; Value:</strong> Estimated weight and declared value where required
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Send Cargo From North West England or Leeds to Nigeria</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Send us your postcode, number of packages, estimated weight, description of the goods and Nigerian destination. Our team will provide the appropriate shipping instructions and quotation.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-uk-to-nigeria">Get an Online Quote</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/447438827464" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Us (+44 7438 827464)
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <Link href="/contact">Visit Liverpool Office</Link>
                </Button>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Frequently Asked Questions
              </h2>
              {[
                {
                  q: 'Does County Cargo ship from Preston to Nigeria?',
                  a: 'Yes. County Cargo serves customers in Preston and surrounding PR postcode areas. Contact the team with your postcode and shipment details.',
                },
                {
                  q: 'Can I send cargo from Leeds to Nigeria?',
                  a: 'Yes. Customers across Leeds and the LS postcode districts can use County Cargo’s UK to Nigeria shipping service.',
                },
                {
                  q: 'Does County Cargo cover Manchester and Liverpool?',
                  a: 'Yes. County Cargo serves Liverpool, Manchester and many surrounding areas across Merseyside and Greater Manchester.',
                },
                {
                  q: 'How long does air cargo to Nigeria take?',
                  a: `The estimated timeframe for standard air cargo is ${SHIPPING_TIMEFRAMES.STANDARD_AIR}.`,
                },
                {
                  q: 'How long does sea cargo to Nigeria take?',
                  a: `The estimated timeframe for sea cargo is ${SHIPPING_TIMEFRAMES.SEA_CARGO}.`,
                },
                {
                  q: 'Can I ship to Abuja?',
                  a: 'Yes. Eligible goods can be shipped to Abuja. Contact County Cargo to confirm the applicable rate, minimum weight and delivery arrangements.',
                },
                {
                  q: 'How much does shipping to Nigeria cost?',
                  a: 'The price depends on the service, weight, dimensions, contents and Nigerian destination. Contact County Cargo with your shipment details for an accurate quotation.',
                },
              ].map((item, i) => (
                <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-secondary text-sm">
                    {item.q}
                    <ArrowRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                  </summary>
                  <div className="p-4 text-sm text-gray-700 border-t border-gray-200 bg-white">
                    {item.a}
                  </div>
                </details>
              ))}
            </section>

            <SocialShare title="Shipping From North West England and Leeds to Nigeria" />

            <RelatedGuides currentHref="/blog/shipping-north-west-england-leeds-to-nigeria" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
