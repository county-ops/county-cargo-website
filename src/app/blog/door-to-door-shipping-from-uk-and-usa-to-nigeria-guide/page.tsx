import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Truck,
  Building2,
  PackageCheck,
  CalendarCheck,
  CreditCard,
  ClipboardList,
  ShieldCheck,
  HelpCircle,
  PhoneCall,
  Globe2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Door-to-Door Shipping from UK & USA to Nigeria: Lagos, Abuja & Kaduna Guide | County Cargo',
  description:
    'Complete guide to door-to-door and collection shipping from UK and US cities to Lagos, Abuja, Kaduna, and across Nigeria. Learn delivery coverage, booking steps, and FAQs.',
  alternates: {
    canonical: 'https://countycargo.com/blog/door-to-door-shipping-from-uk-and-usa-to-nigeria-guide',
  },
  openGraph: {
    title: 'Door-to-Door Shipping from UK & USA to Nigeria: Lagos, Abuja & Kaduna Guide | County Cargo',
    description:
      'Plan your door-to-door shipment from the UK or USA to Nigeria. Learn delivery coverage in Lagos, onward collection points in Abuja & Kaduna, and booking steps.',
    url: 'https://countycargo.com/blog/door-to-door-shipping-from-uk-and-usa-to-nigeria-guide',
    siteName: 'County Cargo',
    type: 'article',
  },
};

const townsTable = [
  { state: 'Ogun', towns: 'Abeokuta, Ijebu-Ode, Sagamu' },
  { state: 'Oyo', towns: 'Ibadan, Ogbomoso' },
  { state: 'Rivers', towns: 'Port Harcourt' },
  { state: 'Edo', towns: 'Benin City' },
  { state: 'Delta', towns: 'Asaba, Warri' },
  { state: 'Anambra', towns: 'Onitsha, Awka, Nnewi' },
  { state: 'Enugu', towns: 'Enugu, Nsukka' },
  { state: 'Kano', towns: 'Kano' },
  { state: 'Kwara', towns: 'Ilorin' },
  { state: 'Abia', towns: 'Aba, Umuahia' },
];

const bookingSteps = [
  {
    num: '1',
    icon: <ClipboardList className="w-5 h-5 text-primary shrink-0" />,
    title: 'Share your shipment details',
    body: 'Provide the UK postcode or US ZIP code, destination town and state, contents, number of parcels, packed weight and dimensions.',
  },
  {
    num: '2',
    icon: <Truck className="w-5 h-5 text-primary shrink-0" />,
    title: 'Confirm the service and full quote',
    body: 'Ask which transport options are available for your route and goods. Check collection, freight, handling and onward transport charges.',
  },
  {
    num: '3',
    icon: <ShieldCheck className="w-5 h-5 text-primary shrink-0" />,
    title: 'Prepare and declare the goods',
    body: 'Pack securely, identify fragile items and keep purchase invoices. Check acceptance before sending batteries, liquids or other items requiring special arrangements.',
  },
  {
    num: '4',
    icon: <CreditCard className="w-5 h-5 text-primary shrink-0" />,
    title: 'Complete payment before shipping',
    body: 'Check your invoice and ensure payment has been confirmed in time for the intended shipment.',
  },
  {
    num: '5',
    icon: <PackageCheck className="w-5 h-5 text-primary shrink-0" />,
    title: 'Confirm the final handover',
    body: 'Keep the recipient’s contact details current and agree doorstep delivery or collection before dispatch.',
  },
];

const faqs = [
  {
    q: 'How much does shipping from the UK or USA to Nigeria cost?',
    a: (
      <>
        The quote depends on the route, goods, chargeable weight, dimensions and service selected. Give the team your destination town as well as the state, and ask for a breakdown of any additional charges.{' '}
        <Link href="/faq" className="text-primary underline underline-offset-2 hover:opacity-80">
          See County Cargo&apos;s shipping FAQs.
        </Link>
      </>
    ),
  },
  {
    q: 'How long will my shipment take?',
    a: (
      <>
        Request a current estimate for your specific service and destination. Confirm whether it starts at collection, warehouse receipt or international departure, and whether it includes onward transport in Nigeria. Delivery estimates are not guaranteed dates.{' '}
        <Link href="/info" className="text-primary underline underline-offset-2 hover:opacity-80">
          Read our shipping terms and guidance.
        </Link>
      </>
    ),
  },
  {
    q: 'Can I shop online and send purchases to County Cargo?',
    a: 'Yes. Use the UK or US address provided through your County Cargo account, follow the addressing instructions and keep the seller’s tracking information. Check that each item is accepted for shipping before buying it.',
  },
  {
    q: 'Is doorstep delivery available in every Nigerian state?',
    a: 'No. Doorstep delivery is available within Lagos where confirmed. For Abuja, Kaduna and other destinations outside Lagos, the standard arrangement is collection at an agreed point. Confirm this before paying for your shipment.',
  },
];

export default function DoorToDoorShippingGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Door-to-Door Shipping from the UK and USA to Nigeria: Lagos, Abuja and Kaduna Guide',
        description:
          'Comprehensive guide to door-to-door and collection shipping from UK & US cities to Lagos, Abuja, Kaduna and states across Nigeria.',
        author: {
          '@type': 'Organization',
          name: 'County Cargo Staff',
        },
        publisher: {
          '@type': 'Organization',
          name: 'County Cargo',
          logo: {
            '@type': 'ImageObject',
            url: 'https://countycargo.com/county-logo-1.png',
          },
        },
        datePublished: '2026-08-28',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://countycargo.com/blog/door-to-door-shipping-from-uk-and-usa-to-nigeria-guide',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much does shipping from the UK or USA to Nigeria cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The quote depends on the route, goods, chargeable weight, dimensions and service selected. Give the team your destination town as well as the state, and ask for a breakdown of any additional charges.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long will my shipment take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Request a current estimate for your specific service and destination. Confirm whether it starts at collection, warehouse receipt or international departure, and whether it includes onward transport in Nigeria.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I shop online and send purchases to County Cargo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Use the UK or US address provided through your County Cargo account, follow the addressing instructions and keep the seller’s tracking information.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is doorstep delivery available in every Nigerian state?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Doorstep delivery is available within Lagos where confirmed. For Abuja, Kaduna and other destinations outside Lagos, the standard arrangement is collection at an agreed point.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section
          className="min-h-[55vh] flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(rgba(13, 27, 62, 0.75), rgba(15, 23, 42, 0.85)), url('/service-uk-to-nigeria-enhanced.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-4">
              <Truck className="w-3.5 h-3.5" /> Comprehensive Logistics Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold hero-text-glow leading-tight">
              Door-to-Door Shipping from the UK and USA to Nigeria: Lagos, Abuja and Kaduna Guide
            </h1>
            <p className="text-base sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow text-gray-200">
              Plan the complete journey for family gifts, personal belongings or business stock from your overseas supplier or home to destination in Nigeria.
            </p>
            <p className="text-xs sm:text-sm mt-5 text-gray-300">
              By County Cargo Staff &nbsp;·&nbsp; 28 August 2026 &nbsp;·&nbsp; 6 min read
            </p>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose lg:prose-xl prose-slate">
            
            <p className="lead font-medium text-lg text-slate-700">
              Looking for door-to-door shipping from the UK or USA to Nigeria? Whether you are sending family gifts, personal belongings or business stock, County Cargo can help you plan the journey from your supplier or home to the agreed destination in Nigeria.
            </p>
            <p>
              Start with the full journey, not just the international flight. Confirm how the goods will reach our overseas warehouse, which shipping service suits them and how the recipient will receive or collect them in Nigeria.
            </p>

            {/* Delivery Coverage Callout */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 my-8 not-prose">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-900 text-base sm:text-lg mb-1">Delivery Coverage &amp; Arrangements</h3>
                  <p className="text-amber-900/90 text-sm sm:text-base leading-relaxed">
                    <strong>Doorstep delivery</strong> is available within Lagos, subject to the address and shipment. Outside Lagos, including <strong>Abuja</strong> and <strong>Kaduna</strong>, the standard arrangement is onward transport to an agreed collection point, not doorstep delivery. Confirm availability and local transport charges before booking.
                  </p>
                </div>
              </div>
            </div>

            {/* UK Section */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary shrink-0" /> Shipping from UK Towns and Cities to Nigeria
            </h2>
            <p>
              County Cargo’s Liverpool warehouse supports customers across the North West, including Manchester, Bolton, Preston and Warrington. Customers can send online purchases to the warehouse or arrange a drop-off after registering for their customer details.{' '}
              <Link href="/shipping-from-uk-to-nigeria" className="text-primary font-semibold underline underline-offset-2 hover:opacity-80">
                Explore our UK to Nigeria shipping service.
              </Link>
            </p>
            <p>
              If you are arranging a shipment from St Helens, Wigan, London, Birmingham, Coventry, Leicester, Nottingham, Leeds, Sheffield, Luton or Milton Keynes, send us your postcode and parcel details. We can discuss how your goods can reach the UK warehouse and confirm any available collection arrangements.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6 not-prose">
              <p className="flex items-start gap-2.5 text-blue-950 text-sm sm:text-base font-medium">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong>Planning Tip:</strong> Before arranging a collection, ask about the price, parcel size limits and collection window. A request is not a confirmed collection until the arrangements have been agreed.</span>
              </p>
            </div>

            {/* US Section */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-primary shrink-0" /> Shipping from US Towns and Cities to Nigeria
            </h2>
            <p>
              Shopping in America does not have to end at the checkout because a retailer does not deliver directly to Nigeria. Register for a County Cargo account and use the US shipping address supplied to you for eligible purchases.{' '}
              <Link href="/ship-from-us-to-nigeria" className="text-primary font-semibold underline underline-offset-2 hover:opacity-80">
                Read about our US to Nigeria shipping service.
              </Link>
            </p>
            <p>
              For purchases from sellers in Dallas, Irving and Houston in Texas, Atlanta in Georgia, New York City, Newark in New Jersey, Baltimore in Maryland, Chicago in Illinois or Los Angeles in California, ask the seller to confirm delivery to your County Cargo US address.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 not-prose text-slate-700 text-sm sm:text-base">
              <p>
                <strong>Please note:</strong> These city examples do not mean County Cargo has a branch or collection team in each location. Confirm the domestic delivery arrangement with your seller and retain every tracking number.
              </p>
            </div>

            {/* Hub Destinations */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6">Key Destinations in Nigeria</h2>

            {/* Lagos */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 my-6 not-prose">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2.5 mb-3">
                <Building2 className="w-5 h-5 text-primary shrink-0" /> UK and USA to Lagos Shipping: Lagos State
              </h3>
              <p className="text-slate-700 text-base leading-relaxed mb-4">
                Sending a parcel to Ikeja, Lekki, Yaba, Surulere, Ikorodu or another part of Lagos State? Give us the full address and recipient’s telephone number when requesting a quote.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>The team will confirm whether doorstep delivery is suitable for the location and parcel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Ask whether local delivery is included in the quoted amount or payable separately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>For a business delivery, explain any access requirements and provide the name of the person authorised to receive the goods.</span>
                </li>
              </ul>
            </div>

            {/* Abuja */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 my-6 not-prose">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2.5 mb-3">
                <Building2 className="w-5 h-5 text-primary shrink-0" /> UK and USA to Abuja Shipping: Federal Capital Territory (FCT)
              </h3>
              <p className="text-slate-700 text-base leading-relaxed mb-4">
                Abuja is in the Federal Capital Territory, or FCT, rather than a state. If your recipient is in Wuse, Garki, Maitama, Kubwa, Lugbe or Gwarinpa, include that area in your enquiry.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Confirm collection point:</strong> Confirm the agreed collection point before shipping. A recipient’s home address helps identify the destination, but it does not automatically turn the booking into a home-delivery service.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Allow for onward movement and collection arrangements after the cargo reaches Nigeria, particularly when sending goods for an event or business deadline.</span>
                </li>
              </ul>
            </div>

            {/* Kaduna */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 my-6 not-prose">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2.5 mb-3">
                <Building2 className="w-5 h-5 text-primary shrink-0" /> UK and USA to Kaduna Shipping: Kaduna State
              </h3>
              <p className="text-slate-700 text-base leading-relaxed mb-4">
                For cargo intended for Kaduna city, Zaria, Kafanchan or another location in Kaduna State, provide the exact destination before booking. Ask the team to confirm available onward transport, the collection point and applicable charges.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Make sure the recipient can reach the agreed collection location in Kaduna.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>International arrival and local availability may not happen on the same day.</span>
                </li>
              </ul>
            </div>

            {/* Other Nigerian Destinations Table */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary shrink-0" /> Other Nigerian Towns and Cities to Include in Your Enquiry
            </h2>
            <p>
              Your state and town help us assess the onward journey. For destinations such as those below, contact the team to confirm the available route and collection arrangement before sending any goods:
            </p>

            <div className="border border-slate-200 rounded-2xl overflow-hidden my-8 not-prose shadow-sm">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-bold w-1/3">State</th>
                    <th className="p-4 font-bold">Towns and Cities Covered for Enquiries</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {townsTable.map((row, idx) => (
                    <tr key={row.state} className={idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
                      <td className="p-4 font-semibold text-secondary">{row.state}</td>
                      <td className="p-4">{row.towns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-600 italic">
              This is a destination enquiry guide, not a list of County Cargo branches or guaranteed doorstep delivery locations. Outside Lagos, confirm the collection point and local transport cost with the team.
            </p>

            {/* How to book */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-14 mb-6 flex items-center gap-3">
              <CalendarCheck className="w-6 h-6 text-primary shrink-0" /> How to Book Your Shipment
            </h2>

            <div className="space-y-4 my-8 not-prose">
              {bookingSteps.map((step) => (
                <div
                  key={step.num}
                  className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6"
                >
                  <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-base flex items-center justify-center shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-base sm:text-lg mb-1 flex items-center gap-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-14 mb-6 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary shrink-0" /> Frequently Asked Questions
            </h2>

            <div className="space-y-4 my-8 not-prose">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-slate-300 transition-colors"
                >
                  <h3 className="font-bold text-secondary text-lg mb-2">{faq.q}</h3>
                  <div className="text-slate-700 text-sm sm:text-base leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div
              className="my-14 p-8 sm:p-10 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl shadow-xl not-prose"
              data-aos="fade-up"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                Request Your County Cargo Shipping Quote
              </h3>
              <p className="opacity-90 mb-6 text-sm sm:text-base leading-relaxed text-slate-200">
                Whether you are planning Liverpool to Lagos shipping, Manchester to Abuja cargo or sending purchases from the USA to Kaduna, start with a clear quote and an agreed delivery or collection arrangement.
              </p>
              <p className="text-sm opacity-90 mb-6 text-slate-300">
                Send us your origin postcode or ZIP code, Nigerian destination, parcel weight, dimensions and contents. We will help you confirm the available shipping option for your goods.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-primary text-white hover:bg-primary/95 border-none font-semibold px-6 py-2.5"
                >
                  <Link href="/contact">
                    Request a Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-2.5"
                >
                  <Link href="/express-shipping-uk-to-nigeria">UK Express Shipping (2–3 Days)</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-2.5"
                >
                  <Link href="/shipping-from-uk-to-nigeria">UK to Nigeria Shipping</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-2.5"
                >
                  <Link href="/ship-from-us-to-nigeria">US to Nigeria Shipping</Link>
                </Button>
              </div>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
