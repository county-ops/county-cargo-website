import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Plane,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Building2,
  CalendarClock,
  ClipboardList,
  CreditCard,
  PackageCheck,
  HelpCircle,
  ArrowRight,
  Truck,
  ExternalLink,
} from 'lucide-react';
import { UkNigeriaQuoteForm } from '../shipping-from-uk-to-nigeria/quote-form';

export const metadata: Metadata = {
  title: 'UK to Nigeria Express Shipping in 2–3 Days | County Cargo',
  description:
    'County Cargo Express offers UK-to-Lagos shipping estimated at 2–3 working days. Confirm availability, charges and delivery arrangements before booking.',
  alternates: {
    canonical: 'https://countycargo.com/express-shipping-uk-to-nigeria',
  },
  openGraph: {
    title: 'UK to Nigeria Express Shipping in 2–3 Days | County Cargo',
    description:
      'County Cargo Express offers UK-to-Lagos shipping estimated at 2–3 working days. Fast, secure priority air freight from Liverpool and nationwide UK to Lagos, Abuja, and Nigeria.',
    url: 'https://countycargo.com/express-shipping-uk-to-nigeria',
    siteName: 'County Cargo',
    type: 'website',
  },
};

const faqItems = [
  {
    q: 'Can County Cargo ship from the UK to Lagos in 2–3 working days?',
    a: (
      <>
        Yes. Eligible Express air cargo shipments from the UK to Lagos have an estimated delivery time of 2–3 working days. This timeframe is subject to package acceptance, airline flight schedules, and standard customs clearance procedures at Murtala Muhammed International Airport in Lagos.
      </>
    ),
  },
  {
    q: 'When does the Express delivery estimate begin?',
    a: (
      <>
        The 2–3 working day delivery estimate begins once your parcel has been processed, payment confirmed, and the shipment departs on the scheduled international cargo flight from the UK. The clock does not begin at the time of initial website inquiry or domestic courier collection within the UK.
      </>
    ),
  },
  {
    q: 'What are the booking cut-off and payment requirements?',
    a: (
      <>
        Express shipments require a completed item declaration and confirmed invoice payment prior to the flight cut-off deadline. Packages received after weekly flight dispatch cut-offs will be scheduled on the next available international flight.
      </>
    ),
  },
  {
    q: 'Can County Cargo arrange collection in my UK town?',
    a: (
      <>
        Yes. While our primary UK consolidation and logistics warehouse is in Liverpool (supporting Manchester, Bolton, Preston, and Warrington), customers in London, Birmingham, Leeds, Coventry, Sheffield, Leicester, Nottingham, Luton, Milton Keynes, and nationwide can provide their postcode to arrange UK courier collection or drop off parcels directly at our depot.
      </>
    ),
  },
  {
    q: 'What does the Express shipping quote include?',
    a: (
      <>
        Express quotes cover priority air freight and airline handling. The standard handling charge (£20 per shipment) and any agreed onward transport or doorstep delivery fees are itemized clearly. Any applicable customs duty, special clearance costs, or statutory regulatory fees for commercial goods are confirmed prior to dispatch.
      </>
    ),
  },
  {
    q: 'Which items can I send on Express cargo?',
    a: (
      <>
        Express cargo is designed for urgent documents, clothing, personal effects, electronics (laptops, phones, tablets), product samples, and packaged commercial goods. Hazardous materials, flammable liquids, loose lithium batteries, power banks, cash, and items on the Nigeria Customs Import Prohibition List cannot be accepted.
      </>
    ),
  },
  {
    q: 'How are shipments to Abuja and Kaduna handled?',
    a: (
      <>
        Express shipments destined for Abuja (in the Federal Capital Territory) and Kaduna State arrive in Nigeria via air freight in Lagos or Abuja and are routed via secure onward transport to an agreed regional collection point. Doorstep delivery is not standard outside Lagos; customers should allow 1–2 additional working days for onward movement and confirm local transport charges before booking.
      </>
    ),
  },
  {
    q: 'Is the delivery time guaranteed?',
    a: (
      <>
        Delivery times are realistic operational estimates rather than contractual guarantees. While the majority of Express shipments arrive within 2–3 working days, unforeseen circumstances outside our control—such as airline schedule changes, adverse weather, or Nigeria Customs inspection audits—can occasionally extend timelines.
      </>
    ),
  },
];

const nigerianDestinationsTable = [
  { state: 'Lagos State', coverage: 'Doorstep delivery available where confirmed (Ikeja, Lekki, Yaba, Surulere, VI, etc.) or depot collection', timing: '2–3 working days' },
  { state: 'Federal Capital Territory (Abuja)', coverage: 'Onward transit to agreed central collection point (Wuse, Garki, Maitama, Kubwa)', timing: '3–5 working days' },
  { state: 'Kaduna State', coverage: 'Onward transit to agreed collection point in Kaduna city or Zaria', timing: '4–6 working days' },
  { state: 'Ogun / Oyo', coverage: 'Onward transit to Abeokuta, Sagamu, Ibadan, Ogbomoso collection points', timing: '3–5 working days' },
  { state: 'Rivers / Delta', coverage: 'Onward transit to Port Harcourt, Warri, Asaba collection points', timing: '4–6 working days' },
  { state: 'Anambra / Enugu / Abia', coverage: 'Onward transit to Onitsha, Awka, Enugu, Aba collection points', timing: '4–6 working days' },
  { state: 'Kano / Kwara / Edo', coverage: 'Onward transit to Kano, Ilorin, Benin City collection points', timing: '4–6 working days' },
];

export default function ExpressShippingUkToNigeriaPage() {
  const serviceSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'County Cargo Express: UK to Nigeria Shipping in 2–3 Working Days',
      serviceType: 'Express Air Freight & Cargo Services',
      provider: {
        '@type': 'Organization',
        name: 'County Cargo',
        url: 'https://countycargo.com',
        logo: 'https://countycargo.com/county-logo-1.png',
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'Nigeria',
        },
        {
          '@type': 'Country',
          name: 'United Kingdom',
        },
      ],
      description:
        'County Cargo Express provides fast shipping from the UK to Lagos, Nigeria, with estimated delivery in 2–3 working days, subject to shipment acceptance, flight availability and customs clearance.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        price: '22.00',
        description: 'Priority Express Air Cargo from £22/kg plus handling charge.',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://countycargo.com/express-shipping-uk-to-nigeria/#liverpool-depot',
      name: 'County Cargo UK Depot & Warehouse',
      image: 'https://countycargo.com/shipping-cargo-uk-to-nigeria-county-cargo.jpg',
      url: 'https://countycargo.com/express-shipping-uk-to-nigeria',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Unit G6, 67-83 Queens Dock Commercial Centre, Norfolk Street',
        addressLocality: 'Liverpool',
        postalCode: 'L1 0BG',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 53.398,
        longitude: -2.9818,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            typeof item.a === 'string'
              ? item.a
              : 'County Cargo provides reliable 2-3 working day express shipping from the UK to Lagos, Nigeria, subject to flight schedules and customs clearance.',
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main className="pt-20 sm:pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative w-full bg-slate-900 text-white overflow-hidden py-14 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 opacity-95" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-6">
              <Zap className="w-3.5 h-3.5" /> High-Priority Air Cargo
            </span>
            
            {/* Section 1 Required Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              County Cargo Express: UK to Nigeria Shipping in 2–3 Working Days
            </h1>

            {/* Section 1 Required Opening Statement */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto mb-8 text-left sm:text-center shadow-xl">
              <p className="text-base sm:text-lg md:text-xl text-slate-100 leading-relaxed font-medium">
                &ldquo;County Cargo Express provides fast shipping from the UK to Lagos, Nigeria, with estimated delivery in 2–3 working days, subject to shipment acceptance, flight availability and customs clearance. Contact County Cargo to confirm the dispatch schedule, charges and final delivery or collection arrangements before booking.&rdquo;
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-base shadow-lg hover:shadow-primary/30 transition-all">
                <Link href="#quote">
                  Request an Express Shipping Quote <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-8 py-6 text-base">
                <Link href="https://ship.countycargo.com/login" target="_blank" rel="noopener noreferrer">
                  Client Portal &amp; Booking <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Delivery Claim Precision & Clock Section */}
        <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">
                Understanding the 2–3 Working Day Delivery Window
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                We believe in complete transparency. Here is exactly how our Express delivery timeframe is structured from our UK depot to Nigeria.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4">
                  <CalendarClock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">1. When the Clock Starts</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The delivery timeline begins when your parcel is processed, paid, and departs on the scheduled international cargo flight from the UK.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">2. UK to Lagos Direct</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The 2–3 working day estimate applies directly to <strong>Lagos State</strong> shipments, concluding upon arrival and customs clearance at the airport terminal.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">3. Abuja &amp; Regional States</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Destinations outside Lagos (including Abuja FCT &amp; Kaduna) require secure onward transport to central collection points (+1–2 days).
                </p>
              </div>
            </div>

            {/* US Disclaimer Callout */}
            <div className="mt-8 bg-amber-50/70 border border-amber-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm sm:text-base text-amber-950">
                <span className="font-bold">Shipping from the United States?</span> Our 2–3 working day Express service applies specifically to UK departures. For shipments originating in the USA, please review our separate schedules and rates on our dedicated{' '}
                <Link href="/ship-from-us-to-nigeria" className="text-primary font-semibold underline underline-offset-2 hover:opacity-80">
                  US to Nigeria Shipping Service
                </Link>.
              </div>
            </div>
          </div>
        </section>

        {/* Priority Pricing Tiers */}
        <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-3">
                Express Air Cargo Rates
              </h2>
              <p className="text-slate-600 text-base">
                Clear, upfront pricing with no hidden charges. All Express shipments include end-to-end flight tracking.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* 48hrs Express Card */}
              <div className="bg-white border-2 border-blue-500 rounded-2xl p-6 sm:p-8 shadow-md relative">
                <span className="absolute -top-3.5 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popular Choice
                </span>
                <h3 className="text-2xl font-bold text-secondary mb-2">48hrs Express Air Cargo</h3>
                <p className="text-sm text-slate-500 mb-6">Estimated 2–3 working days to Lagos</p>
                <div className="text-4xl font-extrabold text-primary mb-6">
                  £22.00 <span className="text-base font-medium text-slate-500">/ kg</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-700 mb-8">
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> 1kg minimum chargeable weight</li>
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Fast delivery in 2–3 working days (Lagos)</li>
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Full international flight tracking</li>
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> £20 handling fee per consignment</li>
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Doorstep delivery in Lagos (where confirmed)</li>
                </ul>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                  <Link href="#quote">Calculate 48hrs Cost</Link>
                </Button>
              </div>

              {/* 24hrs Express Card */}
              <div className="bg-white border-2 border-purple-500 rounded-2xl p-6 sm:p-8 shadow-md relative">
                <span className="absolute -top-3.5 right-6 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Highest Priority
                </span>
                <h3 className="text-2xl font-bold text-secondary mb-2">24hrs Express Air Cargo</h3>
                <p className="text-sm text-slate-500 mb-6">Next-flight out priority dispatch</p>
                <div className="text-4xl font-extrabold text-primary mb-6">
                  £24.00 <span className="text-base font-medium text-slate-500">/ kg</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-700 mb-8">
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> 1kg minimum chargeable weight</li>
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Highest priority air freight booking</li>
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Immediate customs manifest processing</li>
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> £20 handling fee per consignment</li>
                  <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Ideal for urgent documents &amp; high-value goods</li>
                </ul>
                <Button asChild variant="outline" className="w-full border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold">
                  <Link href="#quote">Calculate 24hrs Cost</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Local Geographic Coverage Details */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              
              {/* UK Origins & Collection */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4 flex items-center gap-2.5">
                  <MapPin className="w-6 h-6 text-primary shrink-0" /> UK Warehouse &amp; Town Collections
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                  Our central UK logistics warehouse is located in <strong>Liverpool</strong>, making drop-offs fast and convenient for shippers across the North West:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
                  <p className="font-bold text-secondary text-sm">County Cargo Liverpool Depot</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG
                  </p>
                  <p className="text-xs text-primary font-semibold mt-2">
                    Serving Liverpool, Manchester, Bolton, Preston &amp; Warrington
                  </p>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                  Shipping from <strong>London, Birmingham, Leeds, Leicester, Sheffield, Coventry, Nottingham, Luton, or Milton Keynes</strong>? Simply provide your UK postcode when requesting a quote, and we will confirm courier collection arrangements directly from your home, office, or supplier.
                </p>
              </div>

              {/* Nigerian Destination Specifics */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4 flex items-center gap-2.5">
                  <Building2 className="w-6 h-6 text-primary shrink-0" /> Destination Delivery Coverage in Nigeria
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                  Delivery arrangements differ between Lagos and other states:
                </p>
                <div className="space-y-3">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <h3 className="font-bold text-secondary text-sm sm:text-base flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" /> Lagos State: Doorstep Delivery
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Doorstep delivery is available across Ikeja, Lekki, Yaba, Surulere, Victoria Island, and other confirmed Lagos areas upon customs clearance.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <h3 className="font-bold text-secondary text-sm sm:text-base flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" /> Abuja (FCT) &amp; Kaduna State
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Shipments are routed to agreed regional collection points. Doorstep delivery is not standard outside Lagos; confirm onward transit charges before booking.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Regional Table */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-secondary mb-4">Regional Destination Summary</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-3 sm:p-4 font-semibold w-1/3">Nigerian Region / State</th>
                      <th className="p-3 sm:p-4 font-semibold">Delivery / Collection Arrangement</th>
                      <th className="p-3 sm:p-4 font-semibold text-right">Est. Transit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                    {nigerianDestinationsTable.map((row, idx) => (
                      <tr key={row.state} className={idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
                        <td className="p-3 sm:p-4 font-semibold text-secondary">{row.state}</td>
                        <td className="p-3 sm:p-4">{row.coverage}</td>
                        <td className="p-3 sm:p-4 text-right font-medium text-primary">{row.timing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* Instant Quote Form Section */}
        <section id="quote" className="py-14 sm:py-20 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
                <Zap className="w-3.5 h-3.5" /> Instant Calculator
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3">
                Calculate Your Express Shipping Quote
              </h2>
              <p className="text-slate-600 text-base max-w-xl mx-auto">
                Select 48hrs or 24hrs Express to view accurate estimates based on actual vs. volumetric weight.
              </p>
            </div>

            <UkNigeriaQuoteForm />
          </div>
        </section>

        {/* 8-Point FAQ Section */}
        <section id="faq" className="py-16 sm:py-20 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="w-8 h-8 text-primary shrink-0" /> Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-base max-w-2xl mx-auto">
                Verified answers to customer questions about County Cargo Express UK to Nigeria shipping.
              </p>
            </div>

            <div className="space-y-5">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-slate-300 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-bold text-secondary mb-3 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">
                      Q{index + 1}
                    </span>
                    <span>{item.q}</span>
                  </h3>
                  <div className="text-slate-700 text-sm sm:text-base leading-relaxed pl-10">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Ready to Send Your UK to Nigeria Express Shipment?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Get in touch with our operations team in Liverpool or submit your parcel details online for rapid dispatch.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-base">
                <Link href="/contact">Contact Our Team <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-8 py-6 text-base">
                <Link href="/shipping-from-uk-to-nigeria">General UK to Nigeria Hub</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
