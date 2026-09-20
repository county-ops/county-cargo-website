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
  Truck,
  Ship,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  Package,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cargo to Nigeria from Liverpool | Free Pickup L8, L7, L6, L15 | County Cargo',
  description:
    'Sending a barrel or box to Lagos, Abuja or Port Harcourt? County Cargo offers free collection across Liverpool — Toxteth L8, Kensington L6, Edge Hill L7, Wavertree L15 and more. Get a quote today.',
  keywords:
    'shipping to Nigeria from Liverpool, cargo to Nigeria Liverpool, send barrel to Lagos from Liverpool, free pickup Toxteth L8, Nigerian shipping Liverpool, freight to Nigeria Merseyside',
  alternates: {
    canonical:
      'https://countycargo.com/blog/shipping-to-nigeria-from-liverpool-free-collection',
  },
  openGraph: {
    title: 'Cargo to Nigeria from Liverpool | Free Pickup L8, L7, L6, L15 | County Cargo',
    description:
      'Free doorstep collection across Liverpool — Toxteth L8, Kensington L6, Edge Hill L7, Wavertree L15 and more. Air and sea cargo to Lagos, Abuja and Port Harcourt.',
    images: [
      {
        url: 'https://countycargo.com/images/blog/liverpool-nigeria-cargo-collection.jpg',
        alt: 'County Cargo barrel and box collection service across Liverpool postcodes to Nigeria',
      },
    ],
  },
};

export default function ShippingToNigeriaFromLiverpoolPage() {
  const articleUrl =
    'https://countycargo.com/blog/shipping-to-nigeria-from-liverpool-free-collection';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline:
      'Shipping to Nigeria from Liverpool: Free Collection Across L8, L7, L6, L15 and Beyond',
    description:
      'County Cargo collects cargo free across Liverpool — Toxteth L8, Kensington L6, Edge Hill L7, Wavertree L15 — and ships barrels, boxes and freight to Lagos, Abuja and Port Harcourt.',
    image: 'https://countycargo.com/images/blog/liverpool-nigeria-cargo-collection.jpg',
    datePublished: '2026-09-07T08:00:00+01:00',
    dateModified: '2026-09-07T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Liverpool Dispatch Team',
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
      'Air and sea cargo shipping to Nigeria from Liverpool with free doorstep collection across Toxteth L8, Edge Hill L7, Kensington L6, Wavertree L15 and surrounding postcodes.',
    areaServed: [
      { '@type': 'PostalAddress', postalCode: 'L1', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L2', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L3', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L4', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L5', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L6', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L7', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L8', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L11', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L12', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L13', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L14', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L15', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L17', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L18', addressCountry: 'GB' },
      { '@type': 'PostalAddress', postalCode: 'L69', addressCountry: 'GB' },
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
        name: 'Do you really collect from L8 for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. L8 — Toxteth, Granby, Princes Park and Dingle — is our busiest collection zone in Liverpool. There is no collection charge and no minimum weight requirement.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does cargo take to reach Nigeria from Liverpool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard air cargo takes 5–10 working days from the UK to Nigeria. Sea freight typically takes 4 to 8 weeks door to port, plus customs clearance at the Nigerian end. We will give you a firm estimate against the current sailing schedule when you book.',
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
        name: 'Do you collect outside Liverpool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We cover Merseyside including Wirral (CH), St Helens (WA), Southport (PR) and Warrington. Collection charges may apply outside the free postcode zones listed above.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I send food items to Nigeria from Liverpool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most dry goods and packaged provisions are fine to send. Some items are restricted or prohibited under UK export and Nigerian import rules. Contact us before you pack and we will advise you.',
        },
      },
    ],
  };

  const postcodeZones = [
    {
      code: 'L8',
      name: 'Toxteth, Granby, Princes Park, Dingle',
      highlight: true,
      description:
        'The heart of Liverpool\'s established African and Nigerian community. Lodge Lane, Granby Street, Princes Avenue, Upper Parliament Street, Windsor Street and Dingle Lane are all covered. L8 is our busiest collection zone in Liverpool.',
      streets: ['Lodge Lane', 'Granby Street', 'Princes Avenue', 'Upper Parliament Street', 'Windsor Street', 'Dingle Lane'],
    },
    {
      code: 'L7',
      name: 'Edge Hill, Kensington Fields, Fairfield',
      highlight: false,
      description:
        'Heavy student territory and a growing Nigerian family population. Close to the universities and hospitals, with a well-established shipping community.',
      streets: [],
    },
    {
      code: 'L6',
      name: 'Kensington, Fairfield, Tuebrook',
      highlight: false,
      description:
        'Kensington is home to one of the largest shares of Liverpool\'s student and African community. Kensington High Street, Prescot Road, Sheil Road and Newsham Park all covered.',
      streets: ['Kensington High Street', 'Prescot Road', 'Sheil Road', 'Newsham Park'],
    },
    {
      code: 'L15',
      name: 'Wavertree and Smithdown Road',
      highlight: false,
      description:
        'Smithdown Road is the hub of Merseyside\'s Afro-Caribbean community, separating Toxteth and Wavertree. Smithdown Road, Picton Road, High Street and Wavertree Road all covered.',
      streets: ['Smithdown Road', 'Picton Road', 'High Street', 'Wavertree Road'],
    },
    {
      code: 'L17',
      name: 'Aigburth and Sefton Park',
      highlight: false,
      description:
        'Quieter streets, larger houses and a significant Nigerian professional community. Named in census reporting as one of Liverpool\'s districts with a notable Black population.',
      streets: [],
    },
    {
      code: 'L1, L2, L3',
      name: 'Liverpool City Centre, Ropewalks, Georgian Quarter',
      highlight: false,
      description:
        'City-centre students finishing their courses and shipping belongings home before flying. Hall-of-residence collections welcome — just name the building when you book.',
      streets: [],
    },
    {
      code: 'L4 & L5',
      name: 'Anfield, Walton, Everton, Kirkdale',
      highlight: false,
      description:
        'North Liverpool has seen steady African and Nigerian settlement over the last fifteen years. Solid shipping demand across both postcodes.',
      streets: [],
    },
    {
      code: 'L13 & L14',
      name: 'Old Swan, Stoneycroft, Broad Green, Dovecot',
      highlight: false,
      description:
        'Popular with Nigerian families moving out of the inner city for more space. Broad Green sits close to the hospital, with a strong NHS-employed community.',
      streets: [],
    },
    {
      code: 'L18',
      name: 'Mossley Hill, Allerton',
      highlight: false,
      description: 'Free collection across Mossley Hill and Allerton.',
      streets: [],
    },
    {
      code: 'L11 & L12',
      name: 'Norris Green, West Derby, Croxteth',
      highlight: false,
      description: 'Newer settlement areas with growing African populations. Free collection throughout.',
      streets: [],
    },
    {
      code: 'L69',
      name: 'University of Liverpool',
      highlight: false,
      description:
        'Hall-of-residence addresses welcome. We collect from the building entrance — just tell us the hall name when you book.',
      streets: [],
    },
  ];

  const whatWeShip = [
    { icon: '🛢️', label: 'Barrels', desc: 'Standard 55-gallon drums — provisions, clothing, household goods' },
    { icon: '📦', label: 'Boxes', desc: 'From a single carton upward' },
    { icon: '🧳', label: 'Personal effects', desc: 'Part loads and personal belongings' },
    { icon: '🚢', label: 'Full containers', desc: '20ft and 40ft for commercial cargo' },
    { icon: '🚗', label: 'Vehicles', desc: 'Cars and light commercial vehicles' },
    { icon: '🏭', label: 'Commercial freight', desc: 'For Liverpool businesses trading into Nigeria' },
  ];

  const nigeriaDests = ['Lagos (Apapa & Tin Can Island)', 'Port Harcourt', 'Abuja', 'Kano', 'Onitsha', 'Aba', 'Benin City'];

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
            { label: 'Shipping to Nigeria from Liverpool — Free Collection' },
          ]}
        />

        {/* Hero */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/images/blog/liverpool-nigeria-cargo-collection.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Liverpool to Nigeria Cargo Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping to Nigeria from Liverpool: Free Collection Across L8, L7, L6, L15 and Beyond
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Barrels, boxes and commercial freight to Lagos, Abuja and Port Harcourt. Free doorstep pickup across most Liverpool postcodes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo Liverpool Dispatch Team
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
                <CheckCircle2 className="w-4 h-4 text-primary" /> Direct Answer: Shipping to Nigeria from Liverpool
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo collects barrels, boxes and freight free from your door across most Liverpool postcodes — including Toxteth{' '}
                <strong>L8</strong>, Edge Hill <strong>L7</strong>, Kensington <strong>L6</strong> and Wavertree{' '}
                <strong>L15</strong>. Standard air cargo reaches Nigeria in{' '}
                <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>. Sea freight takes{' '}
                <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>. No depot run. No collection fee.
              </p>
            </div>

            {/* Intro */}
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                If you live in Liverpool and you have people back home in Lagos, Enugu, Kano or Warri, you already know the routine. The barrel gets filled slowly over months — provisions, clothes, shoes for the children, medicine, a small generator part. Then comes the hard bit: getting it to a depot.
              </p>
              <p className="text-gray-700">
                County Cargo collects from your door. Free, across most of Liverpool. Here is exactly where, and why we set the business up this way.
              </p>
            </div>

            {/* Community context */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Liverpool's African Community
              </h2>
              <p className="text-gray-700">
                Liverpool holds one of the United Kingdom's oldest and longest-established Black communities, with roots going back several generations. That history sits at the heart of the city, and it is the reason Liverpool feels different from other UK cities when it comes to African settlement.
              </p>
              <p className="text-gray-700">
                Layered on top of that older community are the newer arrivals: Nigerian families who came for work in the 1980s and 90s, and the thousands of West African students now studying at the University of Liverpool, Liverpool John Moores and Liverpool Hope. Different generations, same shipping needs.
              </p>
              <p className="text-gray-700">
                The majority of Liverpool's ethnic minority residents live within the inner-city area, particularly in and around Toxteth. That is where the community built its churches, its markets and its social infrastructure. So that is where we built our collection routes.
              </p>
            </div>

            {/* Postcode zones */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Free Cargo Collection by Liverpool Postcode
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
                        className={`shrink-0 px-2.5 py-1 rounded-lg text-sm font-extrabold ${
                          zone.highlight
                            ? 'bg-primary text-white'
                            : 'bg-secondary text-white'
                        }`}
                      >
                        {zone.code}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-secondary text-base leading-snug">
                          {zone.name}
                        </h3>
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
                          <CheckCircle2 className="w-3.5 h-3.5" /> Free collection — no charge
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 italic">
                If your postcode is not listed above, contact County Cargo to confirm availability. We also cover Merseyside including Wirral (CH), St Helens (WA), Southport (PR) and Warrington — collection charges may apply outside the free zones.
              </p>
            </div>

            {/* What we ship */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                What We Ship to Nigeria
              </h2>
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
                Why Free Collection Actually Matters
              </h2>
              <p className="text-gray-700">
                Most Liverpool shippers make you drive to a depot. If you do not have a car — and plenty of students and elderly residents do not — a full barrel is not something you are moving on the 86 bus.
              </p>
              <p className="text-gray-700">
                We come to your door, on a day that suits you, anywhere in the postcodes listed above. No collection fee. No fuel surcharge. No "within 3 miles only" small print.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'No depot run', desc: 'We collect directly from your home or business address' },
                  { title: 'No minimum weight', desc: 'We collect whether you have one box or a full container' },
                  { title: 'Day that suits you', desc: 'Book a collection slot that fits your schedule' },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                    <p className="font-bold text-green-900 text-sm">{item.title}</p>
                    <p className="text-xs text-green-700 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery times */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Delivery Times from Liverpool to Nigeria
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
              <h3 className="text-xl font-bold">Book Your Free Liverpool Collection</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                County Cargo has been moving cargo from the UK and USA into Nigeria for years. Liverpool collection, Nigerian routes, no middleman. Call us, WhatsApp us or get an online quote.
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
                  q: 'Do you really collect from L8 for free?',
                  a: 'Yes. L8 — Toxteth, Granby, Princes Park and Dingle — is our busiest collection zone in Liverpool. There is no collection charge and no minimum weight requirement.',
                },
                {
                  q: 'How long does cargo take to reach Nigeria from Liverpool?',
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
                  q: 'Do you collect outside Liverpool?',
                  a: 'Yes. We cover Merseyside including Wirral (CH), St Helens (WA), Southport (PR) and Warrington. Collection charges may apply outside the free postcode zones listed above.',
                },
                {
                  q: 'Can I send food items to Nigeria from Liverpool?',
                  a: 'Most dry goods and packaged provisions are fine to send. Some items are restricted or prohibited under UK export and Nigerian import rules. Contact us before you pack and we will advise you.',
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

            <SocialShare title="Shipping to Nigeria from Liverpool: Free Collection Across L8, L7, L6, L15 and Beyond" />

            <RelatedGuides currentHref="/blog/shipping-to-nigeria-from-liverpool-free-collection" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
