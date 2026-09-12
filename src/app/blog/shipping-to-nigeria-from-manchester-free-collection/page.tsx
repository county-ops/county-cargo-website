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
  Ship,
  Plane,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cargo to Nigeria from Manchester | Free Pickup M14, M16, M8, M13 | County Cargo',
  description:
    'Sending a barrel or box to Lagos, Abuja or Port Harcourt? County Cargo offers free collection across Manchester — Moss Side M14, Old Trafford M16, Cheetham Hill M8, Longsight M13 and more. Sea freight and air cargo over 30kg. Get a quote today.',
  keywords:
    'shipping to Nigeria from Manchester, cargo to Nigeria Manchester, send barrel to Lagos from Manchester, free pickup Moss Side M14, Nigerian shipping Manchester, freight to Nigeria Greater Manchester',
  alternates: {
    canonical:
      'https://countycargo.com/blog/shipping-to-nigeria-from-manchester-free-collection',
  },
  openGraph: {
    title: 'Cargo to Nigeria from Manchester | Free Pickup M14, M16, M8, M13 | County Cargo',
    description:
      'Free doorstep collection across Manchester — Moss Side M14, Old Trafford M16, Cheetham Hill M8, Longsight M13 and more. Barrels, boxes and freight to Lagos, Abuja and Port Harcourt.',
    images: [
      {
        url: 'https://countycargo.com/images/blog/manchester-nigeria-cargo-collection.jpg',
        alt: 'County Cargo barrel and box collection service across Manchester postcodes to Nigeria',
      },
    ],
  },
};

export default function ShippingToNigeriaFromManchesterPage() {
  const articleUrl =
    'https://countycargo.com/blog/shipping-to-nigeria-from-manchester-free-collection';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline:
      'Shipping to Nigeria from Manchester: Free Collection Across M14, M16, M8, M13 and Beyond',
    description:
      'County Cargo collects cargo free across Manchester — Moss Side M14, Old Trafford M16, Cheetham Hill M8, Longsight M13 — and ships barrels, boxes and freight to Lagos, Abuja and Port Harcourt.',
    image: 'https://countycargo.com/images/blog/manchester-nigeria-cargo-collection.jpg',
    datePublished: '2026-09-07T08:00:00+01:00',
    dateModified: '2026-09-07T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Manchester Dispatch Team',
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
    description:
      'Air and sea cargo shipping to Nigeria from Manchester with free doorstep collection across Moss Side M14, Old Trafford M16, Cheetham Hill M8, Longsight M13 and surrounding postcodes.',
    areaServed: [
      { '@type': 'PostalAddress', postalCode: 'M1',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M2',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M3',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M4',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M5',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M6',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M7',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M8',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M9',  addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M11', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M12', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M13', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M14', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M15', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M16', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M18', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M19', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M20', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M21', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M22', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M23', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M32', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'M40', addressCountry: 'GB' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
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
        name: 'Do you really collect from M14 and M16 for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Moss Side (M14) and Old Trafford (M16) are our busiest Manchester zones. Collection is free for all sea freight with no minimum weight, and free for air cargo over 30 kg.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is there a 30kg minimum on air cargo collection?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Air freight moves in much smaller consignments than sea freight. At 30 kg and above the collection pays for itself and we pass that back to you as a free pickup. Below 30 kg by air, we will quote a small collection fee, or you are welcome to drop the cargo to us at no cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'What counts toward the 30kg air cargo minimum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The total weight of your air shipment on that collection — not per box. Three 12 kg cartons going out together is 36 kg and qualifies for free collection.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the 30kg rule apply to barrels?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Barrels travel by sea freight, and sea freight collection is free with no weight minimum.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does cargo take to reach Nigeria from Manchester?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard air cargo takes 5 to 10 working days from the UK to Nigeria. Sea freight typically takes 4 to 8 weeks door to port, plus customs clearance at the Nigerian end. We will give you a firm estimate against the current sailing schedule when you book.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I buy a barrel from County Cargo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We supply new and used 55-gallon barrels and can drop one off before collection day so you can pack at your own pace.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who pays customs duty in Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The receiver clears the goods at the Nigerian end and is responsible for any applicable customs duty. We will tell you exactly what documentation your receiver needs before your cargo sails.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you collect outside Manchester?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We cover Greater Manchester including Bolton (BL), Stockport (SK), Oldham (OL) and Wigan (WN), plus Liverpool and Merseyside. Collection charges may apply outside the free postcode zones.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I send food items to Nigeria from Manchester?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most dry goods and packaged provisions are fine to send. Some items are restricted under UK export and Nigerian import rules. Contact us before you pack and we will advise you.',
        },
      },
    ],
  };

  const postcodeZones = [
    {
      code: 'M14',
      name: 'Moss Side, Rusholme, Fallowfield',
      highlight: true,
      stat: '17% African population — highest in Manchester',
      description:
        'Our busiest Manchester collection zone. Moss Side has the highest African population share of any Manchester ward. Rusholme\'s Curry Mile and Fallowfield\'s student population make this the heart of our Manchester operation.',
      streets: ['Claremont Road', 'Princess Road', 'Wilmslow Road', 'Great Western Street', 'Alexandra Park'],
    },
    {
      code: 'M16',
      name: 'Old Trafford, Whalley Range, Firswood',
      highlight: true,
      stat: 'Major centre for newer Nigerian, Somali & Eritrean communities',
      description:
        'Old Trafford is one of the main centres for newer Nigerian and West African communities in Manchester. Whalley Range sits among Greater Manchester\'s most diverse wards.',
      streets: ['Ayres Road', 'Upper Chorlton Road', 'Withington Road', 'Seymour Grove'],
    },
    {
      code: 'M8',
      name: 'Cheetham Hill, Crumpsall',
      highlight: false,
      stat: 'Key hub for newer African migrant communities',
      description:
        'Cheetham Hill is one of the main centres for Manchester\'s newer African migrant communities. Cheetham Hill Road is the commercial spine — African food shops, hair shops, money transfer, churches.',
      streets: ['Cheetham Hill Road', 'Waterloo Road', 'Bury Old Road', 'Crescent Road'],
    },
    {
      code: 'M13',
      name: 'Longsight, Chorlton-on-Medlock, Ardwick, University',
      highlight: false,
      stat: 'One of the most diverse wards in Greater Manchester',
      description:
        'Longsight is one of the most diverse wards in Greater Manchester. M13 also covers the university corridor — a steady flow of West African students shipping home at the end of term.',
      streets: ['Stockport Road', 'Dickenson Road', 'Plymouth Grove', 'Hathersage Road'],
    },
    {
      code: 'M12',
      name: 'Ardwick, Longsight, Gorton West',
      highlight: false,
      stat: '~11% African population',
      description: 'Ardwick is one of the five Manchester wards where the African population exceeds 10%.',
      streets: ['Hyde Road', 'Stockport Road', 'Ashton Old Road'],
    },
    {
      code: 'M15',
      name: 'Hulme, Moss Side North, City Fringe',
      highlight: false,
      stat: 'Long-standing African and Afro-Caribbean community',
      description:
        'Hulme holds one of Manchester\'s oldest established African and Afro-Caribbean communities and ranks among the most diverse wards in Greater Manchester.',
      streets: ['Princess Road', 'Stretford Road', 'Royce Road'],
    },
    {
      code: 'M9',
      name: 'Harpurhey, Blackley, Crumpsall',
      highlight: false,
      stat: '~11% African population',
      description:
        'Harpurhey carries one of the highest African population shares in Manchester and is among the least served by cargo collection companies.',
      streets: [],
    },
    {
      code: 'M11 & M40',
      name: 'Openshaw, Clayton, Bradford, Newton Heath, Miles Platting, Moston',
      highlight: false,
      stat: '~11% African in Bradford ward; Newton Heath — key Nigerian centre',
      description:
        'Newton Heath is named alongside Cheetham Hill and Old Trafford as a centre for newer Nigerian migration. North and east Manchester is genuinely underserved for cargo collection.',
      streets: [],
    },
    {
      code: 'M18',
      name: 'Gorton',
      highlight: false,
      stat: '~10% African population in Gorton North',
      description: 'Gorton North sits at roughly 10% African population — solid shipping demand throughout.',
      streets: [],
    },
    {
      code: 'M19',
      name: 'Levenshulme',
      highlight: false,
      stat: 'Popular with families moving out for more space',
      description:
        'Among Manchester\'s more diverse wards and a popular area for families moving out of the inner city.',
      streets: [],
    },
    {
      code: 'M20 & M21',
      name: 'Withington, Didsbury, Chorlton',
      highlight: false,
      stat: 'Strong Nigerian professional and NHS community',
      description:
        'Where many Nigerian professional families and NHS staff settle. Quieter streets, larger houses, consistent shipping demand.',
      streets: [],
    },
    {
      code: 'M1–M4',
      name: 'Manchester City Centre, Northern Quarter, Ancoats, Deansgate',
      highlight: false,
      stat: 'Student flats and apartments',
      description:
        'Finishing a course and shipping things home before you fly? Ground floor or building entrance collection. Just tell us the block name when you book.',
      streets: [],
    },
    {
      code: 'M32',
      name: 'Stretford',
      highlight: false,
      stat: 'Same community spread as Old Trafford',
      description: 'Neighbouring Old Trafford, with the same established community and shipping demand.',
      streets: [],
    },
    {
      code: 'M5, M6 & M7',
      name: 'Salford, Broughton, Pendleton, Ordsall',
      highlight: false,
      stat: "Salford's African community is growing steadily",
      description:
        "Salford's African population has grown steadily. Broughton has a substantial and well-established community.",
      streets: [],
    },
    {
      code: 'M22 & M23',
      name: 'Wythenshawe, Northenden, Baguley',
      highlight: false,
      stat: 'South Manchester family areas',
      description: 'Free collection across Wythenshawe and Northenden — further south but still on our route.',
      streets: [],
    },
  ];

  const whatWeShip = [
    { icon: '🛢️', label: 'Barrels', desc: 'Standard 55-gallon drums — provisions, clothing, household goods' },
    { icon: '📦', label: 'Boxes', desc: 'From a single carton upward' },
    { icon: '🧳', label: 'Personal effects', desc: 'Part loads and personal belongings' },
    { icon: '🚢', label: 'Full containers', desc: '20ft and 40ft for commercial cargo' },
    { icon: '🚗', label: 'Vehicles', desc: 'Cars and light commercial vehicles' },
    { icon: '🏭', label: 'Commercial freight', desc: 'For Manchester businesses trading into Nigeria' },
  ];

  const nigeriaDests = [
    'Lagos (Apapa & Tin Can Island)',
    'Port Harcourt',
    'Abuja',
    'Kano',
    'Onitsha',
    'Aba',
    'Benin City',
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
            { label: 'Shipping to Nigeria from Manchester — Free Collection' },
          ]}
        />

        {/* Hero */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/images/blog/manchester-nigeria-cargo-collection.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Manchester to Nigeria Cargo Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping to Nigeria from Manchester: Free Collection Across M14, M16, M8, M13 and Beyond
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Barrels, boxes and commercial freight to Lagos, Abuja and Port Harcourt. Free doorstep pickup across most Manchester postcodes — all sea freight, and air cargo over 30 kg.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo Manchester Dispatch Team
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Logistics Compliance Team
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" /> 7 September 2026
              </span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-10">

            {/* Answer-First Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Direct Answer: Shipping to Nigeria from Manchester
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo collects barrels, boxes and freight free from your door across most Manchester postcodes —
                including Moss Side <strong>M14</strong>, Old Trafford <strong>M16</strong>, Cheetham Hill{' '}
                <strong>M8</strong> and Longsight <strong>M13</strong>. Free collection applies to{' '}
                <strong>all sea freight</strong> (no minimum) and to{' '}
                <strong>air cargo over 30 kg</strong>. Standard air cargo reaches Nigeria in{' '}
                <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>. Sea freight takes{' '}
                <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>.
              </p>
            </div>

            {/* Collection terms callout */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 text-sm">One condition to know up front</p>
                <p className="text-sm text-amber-800 mt-0.5">
                  Free collection applies to <strong>all sea freight</strong> — barrels, boxes, part loads, containers — with no minimum weight.
                  For <strong>air cargo</strong>, your shipment needs to be <strong>over 30 kg</strong> to qualify.
                  Under 30 kg by air, we will quote a small collection fee or you can drop it to us at no charge.
                </p>
              </div>
            </div>

            {/* Intro */}
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                Manchester has one of the strongest African communities in the North of England, and if you are part of it you already know the routine. The barrel fills up slowly — provisions, wax print, shoes for the children, medicine, spare parts. Then comes the hard part: getting it to a depot on the other side of the city.
              </p>
              <p className="text-gray-700">
                County Cargo collects from your door. Free, across most of Manchester. Here is exactly where, and why.
              </p>
            </div>

            {/* Community context */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Where Manchester's African Community Lives
              </h2>
              <p className="text-gray-700">
                Manchester's African and Afro-Caribbean presence splits into two stories. The long-standing communities sit in Moss Side and Hulme — generations deep, with the churches, food shops and social infrastructure to match. Then there are the newer arrivals from Nigeria, Somalia and Eritrea, concentrated in Cheetham Hill, Old Trafford and Newton Heath.
              </p>
              <p className="text-gray-700">
                The census data backs this up. The African ethnic group is clustered in Manchester, accounting for more than a tenth of the population in the wards of <strong>Moss Side (17%)</strong>, <strong>Bradford (11%)</strong>, <strong>Harpurhey (11%)</strong>, <strong>Ardwick (11%)</strong> and <strong>Gorton North (10%)</strong>. Moss Side, Ardwick, Cheetham, Rusholme, Longsight, Whalley Range, Hulme and Crumpsall are among the most diverse wards in the whole of Greater Manchester.
              </p>
              <p className="text-gray-700">
                Those wards are our collection map.
              </p>
            </div>

            {/* Postcode zones */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Free Cargo Collection by Manchester Postcode
              </h2>
              <div className="space-y-4">
                {postcodeZones.map((zone) => (
                  <div
                    key={zone.code}
                    className={`p-5 rounded-xl border ${
                      zone.highlight
                        ? 'bg-primary/5 border-primary/30'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`shrink-0 px-2.5 py-1 rounded-lg text-sm font-extrabold whitespace-nowrap ${
                          zone.highlight ? 'bg-primary text-white' : 'bg-secondary text-white'
                        }`}
                      >
                        {zone.code}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-secondary text-base leading-snug">{zone.name}</h3>
                        {zone.stat && (
                          <p className="text-xs font-semibold text-primary mt-0.5">{zone.stat}</p>
                        )}
                        <p className="text-sm text-gray-600 mt-1">{zone.description}</p>
                        {zone.streets.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {zone.streets.map((s) => (
                              <span
                                key={s}
                                className="text-xs bg-white border border-gray-200 rounded-md px-2 py-0.5 text-gray-600"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs font-semibold text-green-700 mt-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Free collection — all sea freight · air cargo over 30 kg
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 italic">
                If your postcode is not listed above, contact County Cargo to confirm availability. We also cover Greater Manchester including Bolton (BL), Stockport (SK), Oldham (OL) and Wigan (WN). Collection charges may apply outside the free zones.
              </p>
            </div>

            {/* What we ship */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">What We Ship to Nigeria</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whatWeShip.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-secondary text-sm">{item.label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm font-semibold text-secondary mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" /> Nigerian Destinations We Serve
                </p>
                <div className="flex flex-wrap gap-2">
                  {nigeriaDests.map((dest) => (
                    <span key={dest} className="text-xs bg-white border border-blue-200 rounded-md px-2.5 py-1 text-secondary font-medium">
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Why free collection matters */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Why Free Collection Matters in Manchester
              </h2>
              <p className="text-gray-700">
                Manchester is spread out. Getting a full barrel from Harpurhey or Wythenshawe to a depot in Trafford Park is not a bus journey, and it is not a favour you want to keep asking of friends with cars.
              </p>
              <p className="text-gray-700">
                We come to your door, on a day that suits you, anywhere in the postcodes above. No collection fee. No fuel surcharge. No three-mile radius.
              </p>

              {/* Collection terms table */}
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                    <tr>
                      <th className="p-3">Service</th>
                      <th className="p-3">Free Collection?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-3 font-semibold">Sea freight — barrels, boxes, part loads, containers</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Yes — no minimum weight
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Air cargo over 30 kg</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Yes
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Air cargo under 30 kg</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                          <AlertTriangle className="w-4 h-4" /> Small collection fee, or drop off free
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500">
                That is the whole of it. We would rather tell you the condition now than surprise you at the door.
              </p>
            </div>

            {/* Delivery times */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Delivery Times from Manchester to Nigeria
              </h2>
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                    <tr>
                      <th className="p-3">Service</th>
                      <th className="p-3">Transit Time</th>
                      <th className="p-3">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-3 font-semibold">Standard Air Cargo</td>
                      <td className="p-3 font-bold text-primary">{SHIPPING_TIMEFRAMES.STANDARD_AIR}</td>
                      <td className="p-3">Clothing, electronics, documents, dry goods</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Express Air Courier</td>
                      <td className="p-3 font-bold text-primary">{SHIPPING_TIMEFRAMES.EXPRESS_AIR}</td>
                      <td className="p-3">Urgent parcels and documents</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Sea Freight (Barrels &amp; Containers)</td>
                      <td className="p-3 font-bold text-primary">{SHIPPING_TIMEFRAMES.SEA_CARGO}</td>
                      <td className="p-3">Barrels, furniture, vehicles, large volumes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500">
                Sea freight transit times are to port (Apapa or Tin Can Island, Lagos; or Port Harcourt). Customs clearance at the Nigerian end adds additional time. We will give you a firm estimate against the current sailing schedule when you book.
              </p>
            </div>

            {/* CTA */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Book Your Free Manchester Collection</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                County Cargo moves cargo from the UK and USA into Nigeria. North West based, Nigerian routes, no middleman. Call us, WhatsApp us or get an online quote.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-uk-to-nigeria">Get a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/447438827464" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Frequently Asked Questions
              </h2>
              {[
                {
                  q: 'Do you really collect from M14 and M16 for free?',
                  a: 'Yes. Moss Side (M14) and Old Trafford (M16) are our busiest Manchester zones. Collection is free for all sea freight with no minimum weight, and free for air cargo over 30 kg.',
                },
                {
                  q: 'Why is there a 30 kg minimum on air cargo collection?',
                  a: 'Air freight moves in much smaller consignments than sea freight. At 30 kg and above the collection pays for itself and we pass that back to you as a free pickup. Below 30 kg by air, we will quote a small collection fee, or you are welcome to drop the cargo to us at no cost.',
                },
                {
                  q: 'What counts toward the 30 kg air cargo minimum?',
                  a: 'The total weight of your air shipment on that collection — not per box. Three 12 kg cartons going out together is 36 kg and qualifies for free collection.',
                },
                {
                  q: 'Does the 30 kg rule apply to barrels?',
                  a: 'No. Barrels travel by sea freight, and sea freight collection is free with no weight minimum.',
                },
                {
                  q: 'How long does cargo take to reach Nigeria from Manchester?',
                  a: `Standard air cargo takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR} from the UK to Nigeria. Sea freight typically takes ${SHIPPING_TIMEFRAMES.SEA_CARGO} door to port, plus customs clearance at the Nigerian end. We will give you a firm estimate against the current sailing schedule when you book.`,
                },
                {
                  q: 'Can I buy a barrel from County Cargo?',
                  a: 'Yes. We supply new and used 55-gallon barrels and can drop one off before collection day so you can pack at your own pace.',
                },
                {
                  q: 'Who pays customs duty in Nigeria?',
                  a: 'The receiver clears the goods at the Nigerian end and is responsible for any applicable customs duty. We will tell you exactly what documentation your receiver needs before your cargo sails.',
                },
                {
                  q: 'Do you collect outside Manchester?',
                  a: 'Yes. We cover Greater Manchester including Bolton (BL), Stockport (SK), Oldham (OL) and Wigan (WN), plus Liverpool and Merseyside. Collection charges may apply outside the free postcode zones.',
                },
                {
                  q: 'Can I send food items to Nigeria from Manchester?',
                  a: 'Most dry goods and packaged provisions are fine to send. Some items are restricted under UK export and Nigerian import rules. Contact us before you pack and we will advise you.',
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

            <SocialShare title="Shipping to Nigeria from Manchester: Free Collection Across M14, M16, M8, M13 and Beyond" />

            <RelatedGuides currentHref="/blog/shipping-to-nigeria-from-manchester-free-collection" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
