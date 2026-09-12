import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CalendarCheck,
  Plane,
  Ship,
  Truck,
  Package,
  Boxes,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  Building2,
  ArrowRight,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Shipping from London to Nigeria | County Cargo Charlton',
  description:
    'Ship air and sea cargo from London to Nigeria with County Cargo. Drop off at our Charlton location or book pickup in South East London (free for air cargo 30kg+, small fee for sea cargo).',
  keywords: [
    'Shipping from London to Nigeria',
    'London to Nigeria cargo',
    'Cargo company in Charlton',
    'Nigeria shipping company in London',
    'Air cargo London to Nigeria',
    'Sea cargo London to Nigeria',
    'Parcel delivery London to Nigeria',
    'Cargo drop-off point in London',
    'Cargo shipping near Greenwich',
    'Cargo shipping near Woolwich',
    'Free cargo pickup in South East London',
    'UK to Nigeria shipping',
  ].join(', '),
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-london-to-nigeria',
  },
  openGraph: {
    title: 'Shipping from London to Nigeria | County Cargo Charlton',
    description:
      'Ship air and sea cargo from London to Nigeria with County Cargo. Drop off at our Charlton location or book pickup in South East London (free for air cargo 30kg+, small fee for sea cargo).',
    url: 'https://countycargo.com/shipping-from-london-to-nigeria',
    siteName: 'County Cargo',
    type: 'website',
  },
};

const addressDetails = {
  name: 'County Cargo London Drop-Off Point',
  estate: 'New Lydenburg Commercial Estate',
  street: 'New Lydenburg Street',
  area: 'Charlton',
  city: 'London',
  postcode: 'SE7 8NF',
  country: 'United Kingdom',
  phone: '07405556668',
  altPhone: '+234 811 000 0421',
  whatsappNumber: '447405556668',
  openingHours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' },
    { days: 'Saturday', hours: '10:00 AM – 2:00 PM' },
    { days: 'Sunday & Public Holidays', hours: 'Closed' },
  ],
  googleMapsEmbed:
    'https://maps.google.com/maps?q=New%20Lydenburg%20Commercial%20Estate,%20New%20Lydenburg%20Street,%20Charlton,%20London,%20SE7%208NF&t=&z=15&ie=UTF8&iwloc=&output=embed',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=New+Lydenburg+Commercial+Estate,+New+Lydenburg+Street,+Charlton,+London,+SE7+8NF',
};

const serviceOptions = [
  {
    icon: MapPin,
    title: 'Drop off cargo at our Charlton location',
    description:
      'Bring your parcels, boxes, or barrels straight to our Charlton depot. Our warehouse team provides quick unloading, precision weight measurement, and instant booking receipts.',
  },
  {
    icon: Truck,
    title: 'Local pickup within Charlton and selected nearby areas',
    description:
      'Free local pickup is available across Charlton and selected South East London areas for air cargo shipments of 30kg and above. Sea cargo pickup is also available for a small fee.',
  },
  {
    icon: Plane,
    title: 'Air cargo from London to Nigeria',
    description:
      'Weekly consolidated air freight departures with transit to Lagos and Abuja in 5–10 working days, plus rapid 3–5 working day express options for time-critical cargo.',
  },
  {
    icon: Ship,
    title: 'Sea cargo from London to Nigeria',
    description:
      'Economical sea shipping ideal for heavy barrels, large household appliances, oversized crates, commercial stock, and multi-box relocations with delivery in 4–8 weeks.',
  },
  {
    icon: Boxes,
    title: 'Shipping to Lagos, Abuja and other Nigerian destinations',
    description:
      'Full customs clearance at Nigerian entry ports followed by doorstep delivery or collection at our regional hubs in Lagos, Abuja, Port Harcourt, Ibadan, Kano, and nationwide.',
  },
  {
    icon: Package,
    title: 'Personal effects, household goods, commercial goods and parcels',
    description:
      'Whether shipping personal effects, family gifts, clothing, foodstuffs, ecommerce orders, shop stock, or industrial machinery, our team handles consignments of any scale.',
  },
];

const nearbyAreas = [
  { name: 'Charlton (SE7)', note: 'Depot Location & Instant Drop-Off' },
  { name: 'Greenwich (SE10)', note: '5–10 mins drive / Free Pickup (Air 30kg+)' },
  { name: 'Woolwich (SE18)', note: '5–10 mins drive / Free Pickup (Air 30kg+)' },
  { name: 'Blackheath (SE3)', note: '8–12 mins drive / Pickup (Free Air 30kg+)' },
  { name: 'Kidbrooke (SE3/SE9)', note: '8–12 mins drive / Pickup (Free Air 30kg+)' },
  { name: 'Lewisham (SE13)', note: '12–15 mins drive / Scheduled Pickup' },
  { name: 'Deptford (SE8)', note: '12–15 mins drive / Scheduled Pickup' },
  { name: 'Eltham (SE9)', note: '10–15 mins drive / Scheduled Pickup' },
  { name: 'Thamesmead (SE28)', note: '10–15 mins drive / Scheduled Pickup' },
  { name: 'Canary Wharf & Docklands', note: 'Via Blackwall Tunnel' },
  { name: 'Peckham & Camberwell (SE15/SE5)', note: 'South East London Collection' },
  { name: 'Bexleyheath & Dartford', note: 'East London & Kent Borders' },
];

const faqs = [
  {
    question: 'Where can I drop off cargo for Nigeria in London?',
    answer:
      'You can drop off your cargo directly at County Cargo’s official London drop-off point: New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF. We are open Monday to Friday from 9:00 AM to 5:00 PM, and Saturday from 10:00 AM to 2:00 PM.',
  },
  {
    question: 'Does County Cargo offer free pickup in London?',
    answer:
      'Yes! We offer free local cargo pickup within Charlton and selected nearby South East London areas (including Greenwich, Woolwich, Blackheath, Kidbrooke, Lewisham, Deptford, and Eltham) exclusively for air cargo shipments of 30kg and above. For air cargo under 30kg or sea cargo shipments (including barrels and heavy boxes), local pickup is available for a small fee. Direct drop-off at our Charlton depot is always completely free.',
  },
  {
    question: 'How do I book a cargo pickup?',
    answer:
      'Booking a pickup is easy. You can call our London customer service team at 07405556668, message us on WhatsApp, or book online through our portal. Provide your London collection address, cargo type (air cargo or sea cargo), estimated weight (air cargo 30kg+ is free of charge; sea cargo is collected for a small fee), and your desired pickup date.',
  },
  {
    question: 'Can I ship by air or sea from London to Nigeria?',
    answer:
      'Yes, County Cargo provides both air cargo and sea freight services from our London drop-off location. Air cargo is ideal for fast delivery of boxes, parcels, electronics, documents, and personal effects. Sea freight is the most cost-effective choice for large shipping barrels, bulky household furniture, vehicles, and commercial pallet loads.',
  },
  {
    question: 'How long does shipping from the UK to Nigeria take?',
    answer:
      'Express air courier delivers in 3 to 5 working days. Standard consolidated air cargo takes 5 to 10 working days following our weekly flight consolidation cut-off. Sea freight shipping takes approximately 4 to 8 weeks from vessel sailing in the UK to port clearance and distribution in Nigeria.',
  },
  {
    question: 'Which Nigerian cities does County Cargo serve?',
    answer:
      'County Cargo delivers nationwide across Nigeria. We provide central depot collection and doorstep delivery in Lagos, Abuja FCT, Port Harcourt, Ibadan, Kano, Benin City, Enugu, Kaduna, Warri, Aba, Onitsha, and all 36 states across the federation.',
  },
  {
    question: 'What items can and cannot be shipped?',
    answer:
      'You can ship personal effects, clothing, footwear, dried non-perishable foodstuffs, packaged provisions, cosmetics, books, computers, phones, household goods, auto parts, and commercial merchandise. Prohibited items include flammable gases or liquids, corrosives, counterfeit currency, firearms or weapons, illegal substances, and hazardous chemicals.',
  },
];

export default function LondonCharltonDropOffPage() {
  const whatsappUrl = `https://wa.me/${addressDetails.whatsappNumber}?text=${encodeURIComponent(
    'Hello County Cargo, I would like to drop off or book a pickup at your Charlton London location for shipping to Nigeria.'
  )}`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'County Cargo London Drop-Off Point',
    legalName: 'County Service Group',
    description:
      'Dedicated London drop-off point and receiving depot for County Cargo. Offering air and sea freight forwarding from Charlton, Greenwich, Woolwich, and South East London to Nigeria. Free local pickup for air cargo 30kg and above; sea cargo pickup available for a small fee.',
    url: 'https://countycargo.com/shipping-from-london-to-nigeria',
    telephone: '07405556668',
    email: 'info@countycargo.com',
    priceRange: '££',
    image: 'https://countycargo.com/county-logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'New Lydenburg Commercial Estate, New Lydenburg Street',
      addressLocality: 'Charlton',
      addressRegion: 'London',
      postalCode: 'SE7 8NF',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.4925,
      longitude: 0.038,
    },
    hasMap: addressDetails.directionsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    areaServed: [
      'Charlton',
      'Greenwich',
      'Woolwich',
      'Blackheath',
      'Lewisham',
      'Deptford',
      'Eltham',
      'Kidbrooke',
      'Thamesmead',
      'South East London',
      'London',
      'United Kingdom',
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'County Cargo',
    url: 'https://countycargo.com',
    logo: 'https://countycargo.com/county-logo.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '07405556668',
        contactType: 'Customer Service London Depot',
        areaServed: 'GB',
        availableLanguage: 'en',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+2348110000421',
        contactType: 'Global Customer Support',
        availableLanguage: 'en',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      <Header />

      <main className="pt-14 sm:pt-16 min-h-screen bg-slate-50">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/shipping-from-uk-to-nigeria' },
            { label: 'UK to Nigeria Shipping', href: '/shipping-from-uk-to-nigeria' },
            { label: 'London Charlton Drop-Off' },
          ]}
        />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#061d43] via-[#0a2a5e] to-slate-900 text-white py-14 sm:py-20 overflow-hidden">
          {/* Subtle glowing highlights */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              Official London Drop-Off Point &bull; Charlton SE7
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight hero-text-glow max-w-4xl mx-auto leading-tight">
              Shipping from London to Nigeria | County Cargo Charlton Drop-Off
            </h1>

            <p className="text-base sm:text-lg md:text-xl mt-5 text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
              Your trusted Nigeria shipping company in London. Drop off air and sea cargo at our
              convenient Charlton receiving depot, or arrange doorstep collection across Charlton,
              Greenwich, Woolwich, and South East London (free for air cargo 30kg and above, sea cargo for a small fee).
            </p>

            {/* Prominent Action Buttons Bar (Call, WhatsApp, Get Directions, Book Pickup) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
              <a
                href={`tel:${addressDetails.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Call {addressDetails.phone}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-green-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M24 4C12.95 4 4 12.95 4 24c0 3.55.93 6.88 2.55 9.77L4 44l10.5-2.5A19.87 19.87 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm8.78 24.24c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.04-.75-3.88-2.39-1.44-1.28-2.4-2.86-2.68-3.34-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.4-.96-.8-.82-1.08-.84-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.03.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z" />
                </svg>
                WhatsApp Us
              </a>

              <a
                href={addressDetails.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all transform hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4 text-sky-300" />
                Get Directions
              </a>

              <Link
                href="/shipping-from-uk-to-nigeria#quote"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="w-4 h-4" />
                Book a Pickup
              </Link>
            </div>
          </div>
        </section>

        {/* Official Location Details & Embedded Map Section */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Location Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Charlton Location Details
                    </h2>
                    <p className="text-xs text-slate-500">Official London Receiving Point</p>
                  </div>
                </div>

                {/* Full Address */}
                <div className="space-y-4 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Full Depot Address
                      </span>
                      <p className="text-slate-900 font-bold text-base leading-snug">
                        {addressDetails.name}
                      </p>
                      <p className="text-slate-700 text-sm mt-0.5">
                        {addressDetails.estate}
                        <br />
                        {addressDetails.street}
                        <br />
                        {addressDetails.area}, {addressDetails.city}
                        <br />
                        <span className="font-semibold text-slate-900">
                          {addressDetails.postcode}
                        </span>
                        <br />
                        {addressDetails.country}
                      </p>
                    </div>
                  </div>

                  {/* Direct Contact */}
                  <div className="flex items-start gap-3 pt-2">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Telephone &amp; WhatsApp
                      </span>
                      <a
                        href={`tel:${addressDetails.phone}`}
                        className="text-blue-600 font-bold text-sm block hover:underline"
                      >
                        {addressDetails.phone} (London Depot Line)
                      </a>
                      <a
                        href={`tel:${addressDetails.altPhone}`}
                        className="text-slate-600 text-xs block mt-0.5 hover:text-blue-600"
                      >
                        {addressDetails.altPhone} (General Support)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="pt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Opening Hours
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {addressDetails.openingHours.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-1 border-b border-slate-50 last:border-none"
                      >
                        <span className="text-slate-600 font-medium">{item.days}</span>
                        <span className="text-slate-900 font-bold">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link to Directions */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <a
                  href={addressDetails.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors"
                >
                  <Navigation className="w-4 h-4 text-sky-400" />
                  Google Maps Directions
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm font-bold border border-emerald-200 transition-colors"
                >
                  Message Depot
                </a>
              </div>
            </div>

            {/* Right: Embedded Google Map & Driving Access */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 px-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Find Our Charlton Receiving Depot
                    </h3>
                    <p className="text-xs text-slate-500">
                      Convenient access off the A206 and Woolwich Road, close to Charlton Railway Station.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Free Parking On-Site
                  </span>
                </div>

                <div className="w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner">
                  <iframe
                    src={addressDetails.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="County Cargo London Drop-Off Point Map"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Transit & Driving Directions Guide */}
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 px-2">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">🚗 By Car / Van</span>
                  <p>
                    Easily accessible via the A206 Woolwich Road and A102 Blackwall Tunnel Southern
                    Approach. Ample commercial loading space for cars, vans, and commercial vehicles.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">🚆 By Public Transport</span>
                  <p>
                    Minutes from Charlton Rail Station (Southeastern and Thameslink) and Woolwich Arsenal
                    (Elizabeth Line and DLR). Bus routes 161, 177, 180, and 472 stop close by.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Banner Call To Action (Requirement 4) */}
        <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 py-10 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200 block">
                Fast &bull; Affordable &bull; Reliable
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Drop off your cargo at our Charlton location or book a local pickup today.
              </h2>
              <p className="text-sm text-blue-100">
                Free local pickup for air cargo 30kg and above. Sea cargo collection available for a small fee across South East London.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white text-blue-900 font-bold text-sm shadow-md hover:bg-blue-50 transition-colors"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${addressDetails.phone}`}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm shadow-md transition-colors"
              >
                Call to Book
              </a>
            </div>
          </div>
        </section>

        {/* Clear Service Options (Requirement 3) */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Complete Cargo Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Our Shipping Services from London
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Choose the exact service suited to your timeline, cargo volume, and budget from our
              Charlton drop-off center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceOptions.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Natural Local SEO & South East London Neighborhood Coverage (Requirements 5 & 6) */}
        <section className="py-14 sm:py-18 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Local Community &amp; London Coverage
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  Your Reliable Nigeria Shipping Company in London &amp; Charlton
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Looking for a trustworthy <strong>cargo company in Charlton</strong> or a dependable{' '}
                  <strong>Nigeria shipping company in London</strong>? County Cargo provides seamless{' '}
                  <strong>UK to Nigeria shipping</strong> for families, diaspora communities, students,
                  traders, and corporate businesses.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Our strategic drop-off depot at New Lydenburg Commercial Estate allows customers
                  searching for <strong>cargo shipping near Greenwich</strong>,{' '}
                  <strong>cargo shipping near Woolwich</strong>, or a centralized{' '}
                  <strong>cargo drop-off point in London</strong> to drop parcels quickly without
                  navigating central congestion charge zones.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Need a collection from your house or office? We offer regular{' '}
                  <strong>cargo pickup in South East London</strong> for personal effects, barrels,
                  and commercial cargo — <strong>free for air cargo weighing 30kg and above</strong>, with{' '}
                  <strong>sea cargo pickup available for a small fee</strong>. Whether you require fast{' '}
                  <strong>air cargo London to Nigeria</strong> (5–10 working days) or economical{' '}
                  <strong>sea cargo London to Nigeria</strong> for large containers and barrels, we
                  guarantee secure delivery to Lagos, Abuja, Port Harcourt, and nationwide.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Doorstep Collection Available
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Full Nigerian Customs Clearance
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live Parcel Tracking Included
                  </div>
                </div>
              </div>

              {/* Right: Area Served Tags Grid */}
              <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" /> Nearby London Areas Served
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Customers in these South East London districts can drop off in Charlton or arrange pickup (free for air cargo 30kg+, sea cargo for a small fee):
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {nearbyAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors"
                    >
                      <p className="font-bold text-xs text-slate-800">{area.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{area.note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 text-center">
                  <Link
                    href="/blog/shipping-south-east-north-west-london-to-nigeria"
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    Read our South East London shipping guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works 4-Step Process */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              How London to Nigeria Shipping Works
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              From Charlton drop-off or doorstep pickup to arrival in Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Drop Off or Book Pickup',
                desc: 'Bring your packages to New Lydenburg Street in Charlton, or call 07405556668 to book doorstep pickup (free for air cargo 30kg+, sea cargo for a small fee).',
              },
              {
                step: '02',
                title: 'Weighing & Labelling',
                desc: 'Our staff weighs, inspects, securely repacks if needed, and issues a tracking reference for your consignment.',
              },
              {
                step: '03',
                title: 'Air or Sea Freight Dispatch',
                desc: 'Weekly consolidated flights take off for Lagos and Abuja, or sea vessels depart for heavy cargo and barrels.',
              },
              {
                step: '04',
                title: 'Clearance & Delivery',
                desc: 'Our clearing team handles Nigerian customs seamlessly. Collect at our Lagos/Abuja hubs or receive doorstep delivery across Nigeria.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden"
              >
                <div className="text-4xl font-black text-blue-100 absolute top-4 right-4 select-none">
                  {item.step}
                </div>
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Complete FAQ Section (Requirement 7) */}
        <section className="py-14 sm:py-20 bg-slate-100/70 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2.5 mb-4 text-center">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                London to Nigeria Shipping FAQ
              </h2>
            </div>
            <p className="text-center text-slate-600 text-sm max-w-xl mx-auto mb-10">
              Clear answers to the most common questions regarding our London drop-off point,
              pickup options, rates, transit times, and prohibited goods.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-white border border-slate-200 rounded-2xl px-5 py-1 shadow-2xs overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-bold text-slate-900 text-sm sm:text-base hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4 pt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Bottom Destination Links / Related Guides */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-slate-900">
                Explore Destination Guides from London
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Detailed freight guides for major Nigerian arrival hubs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Link
                href="/blog/shipping-from-london-to-lagos"
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all group"
              >
                <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 flex items-center justify-between">
                  London to Lagos Cargo <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Air and sea freight to Lagos, Ladipo-Oshodi hub &amp; doorstep delivery.
                </p>
              </Link>

              <Link
                href="/blog/shipping-from-london-to-abuja"
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all group"
              >
                <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 flex items-center justify-between">
                  London to Abuja Cargo <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Direct air freight to Abuja FCT, Wuye Ultra Modern Market hub.
                </p>
              </Link>

              <Link
                href="/blog/shipping-from-london-to-kano"
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all group"
              >
                <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 flex items-center justify-between">
                  London to Kano Cargo <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Northern Nigeria distribution and commercial consignments.
                </p>
              </Link>
            </div>

            <RelatedGuides />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
