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
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  Truck,
} from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Shipping From South East and North West London to Nigeria',
  description:
    'Send air and sea cargo from South East or North West London to Nigeria with County Cargo. Free collection is available in most London areas.',
  keywords:
    'Shipping from London to Nigeria, cargo from South East London to Nigeria, cargo from North West London to Nigeria, free cargo collection London, Camberwell to Nigeria cargo, Peckham to Nigeria shipping, Elephant and Castle cargo to Nigeria',
  alternates: {
    canonical:
      'https://countycargo.com/blog/shipping-south-east-north-west-london-to-nigeria',
  },
  openGraph: {
    title: 'Shipping From South East and North West London to Nigeria',
    description:
      'Send air and sea cargo from South East or North West London to Nigeria with County Cargo. Free collection is available in most London areas.',
    images: [
      {
        url: 'https://countycargo.com/images/blog/london-southeast-northwest-cargo.jpg',
        alt: 'Air cargo service from South East and North West London to Nigeria with County Cargo',
      },
    ],
  },
};

export default function ShippingSouthEastNorthWestLondonToNigeriaPost() {
  const articleUrl =
    'https://countycargo.com/blog/shipping-south-east-north-west-london-to-nigeria';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline:
      'Shipping From South East and North West London to Nigeria',
    description:
      'Send air and sea cargo from South East or North West London to Nigeria with County Cargo. Free collection is available in most London areas.',
    image: 'https://countycargo.com/images/blog/london-southeast-northwest-cargo.jpg',
    datePublished: '2026-09-07T08:00:00+01:00',
    dateModified: '2026-09-07T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo London Dispatch Team',
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does County Cargo collect cargo from South East London?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. County Cargo offers free doorstep collection from South East London areas including Camberwell, Peckham, Elephant and Castle, Lewisham, New Cross, Deptford, Bermondsey, Walworth, Brixton, Stockwell, Clapham, Streatham, Tooting, Balham and Norwood.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does County Cargo collect cargo from North West London?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. County Cargo collects from North West London areas including Wembley, Harrow, Southall, Ealing, Acton, Greenford, Alperton, Kilburn, Cricklewood, Willesden, Brent Cross, Hendon, Finchley and Edgware.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does shipping from London to Nigeria take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard air cargo from London to Nigeria takes 5–10 working days. Express Air Courier takes 3 to 5 working days. Sea cargo takes 4 to 8 weeks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to ship cargo from London to Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard air cargo is priced at £6.00 per kg with a £15 handling fee per shipment. Sea cargo rates are calculated separately. Contact County Cargo for a personalised quote.',
        },
      },
      {
        '@type': 'Question',
        name: 'What items can I send from London to Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can send clothing, shoes, books, non-perishable packaged food, electronics, household items, personal belongings, business stock and retail goods. Prohibited items include fresh meat and dairy, flammable liquids, raw plants and soil, weapons and uncertified pharmaceuticals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there free delivery in Nigeria for shipments from London?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Eligible shipments weighing 10 kg or more qualify for free doorstep delivery in Lagos and Abuja. Delivery is available to most areas across Nigeria.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'Shipping From South East and North West London to Nigeria' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/images/blog/london-southeast-northwest-cargo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <MapPin className="w-3.5 h-3.5" /> London to Nigeria Cargo Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping From South East and North West London to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Free doorstep collection across South East and North West London. Air and sea cargo to Lagos, Abuja and all Nigerian states.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo London Dispatch Team
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">

            {/* Answer-First Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Direct Answer: Shipping From London to Nigeria
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo collects cargo free from most South East and North West London postcodes. Standard air cargo costs{' '}
                <strong>£6.00 per kg</strong> (plus a £15 handling fee per shipment) and arrives in Nigeria in{' '}
                <strong>{SHIPPING_TIMEFRAMES.STANDARD_AIR}</strong>. Express Air Courier delivers in{' '}
                <strong>{SHIPPING_TIMEFRAMES.EXPRESS_AIR}</strong>. Sea cargo takes{' '}
                <strong>{SHIPPING_TIMEFRAMES.SEA_CARGO}</strong>. Shipments of 10 kg or more qualify for free doorstep delivery in Lagos and Abuja.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              Shipping From London to Nigeria
            </h2>
            <p className="text-gray-700">
              London is home to many established Nigerian and African communities, particularly across South East and North West London. Families, students, professionals and business owners regularly send clothing, personal belongings, food products, electronics, business stock and other approved goods to Nigeria.
            </p>
            <p className="text-gray-700">
              County Cargo makes shipping from London to Nigeria more convenient by offering free doorstep collection from homes and businesses in South East and North West London. Once collected, your cargo is processed at our UK consolidation hub and dispatched to Nigeria by air or sea.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              Areas We Collect From in South East London
            </h2>
            <p className="text-gray-700">
              County Cargo provides free cargo collection from the following South East London areas:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Camberwell',
                'Peckham',
                'Elephant and Castle',
                'Lewisham',
                'New Cross',
                'Deptford',
                'Bermondsey',
                'Walworth',
                'Brixton',
                'Stockwell',
                'Clapham',
                'Streatham',
                'Tooting',
                'Balham',
                'Norwood',
                'Crystal Palace',
                'Sydenham',
                'Forest Hill',
                'Honor Oak',
                'Catford',
                'Woolwich',
                'Plumstead',
                'Charlton',
                'Eltham',
                'Blackheath',
                'Greenwich',
                'Kidbrooke',
                'Abbey Wood',
              ].map((area) => (
                <div key={area} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  {area}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 italic">
              If your area is not listed above, contact County Cargo to confirm collection availability.
            </p>

            {/* Official Charlton Drop-Off Point Spotlight Box */}
            <div className="p-6 bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl shadow-lg not-prose space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Official London Drop-Off Point (Charlton SE7)
              </div>
              <h3 className="text-xl font-bold text-white">
                Prefer to drop off your cargo in person?
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                In addition to our doorstep collection service across South East London (free for air cargo 30kg+, sea cargo for a small fee), you can bring your parcels, boxes, and barrels directly to our dedicated receiving point: <strong>County Cargo London Drop-Off Point, New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF</strong>. Open Mon–Fri 9am–5pm and Sat 10am–2pm.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/shipping-from-london-to-nigeria"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  London Drop-Off Point Details &amp; Directions <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="tel:07405556668"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-300" /> Call Depot: 07405 556668
                </a>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              Areas We Collect From in North West London
            </h2>
            <p className="text-gray-700">
              County Cargo also collects from North West London, covering the following areas:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Wembley',
                'Harrow',
                'Southall',
                'Ealing',
                'Acton',
                'Greenford',
                'Alperton',
                'Kilburn',
                'Cricklewood',
                'Willesden',
                'Brent Cross',
                'Hendon',
                'Finchley',
                'Edgware',
                'Queensbury',
                'Kingsbury',
                'Neasden',
                'Wembley Park',
                'Sudbury',
                'Perivale',
                'Northolt',
                'Ruislip',
                'Pinner',
                'North Wembley',
              ].map((area) => (
                <div key={area} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  {area}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 italic">
              If your area is not listed above, contact County Cargo to confirm collection availability.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              Shipping Costs and Delivery Times
            </h2>
            <p className="text-gray-700">
              The table below shows the shipping options available from London to Nigeria:
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl my-4">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Service</th>
                    <th className="p-3">Rate</th>
                    <th className="p-3">Delivery Time</th>
                    <th className="p-3">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold">Standard Air Cargo</td>
                    <td className="p-3 font-bold text-primary">£6.00 / kg + £15 fee</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.STANDARD_AIR_SHORT}</td>
                    <td className="p-3">Clothing, boxes, luggage, food, household items</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Express Air Courier</td>
                    <td className="p-3 font-bold text-primary">Calculated Tariff</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.EXPRESS_AIR_SHORT}</td>
                    <td className="p-3">Urgent documents, high-value electronics</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Sea Cargo (FCL / LCL)</td>
                    <td className="p-3 font-bold text-primary">Quote on request</td>
                    <td className="p-3">{SHIPPING_TIMEFRAMES.SEA_CARGO_SHORT}</td>
                    <td className="p-3">Large volumes, furniture, heavy goods</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500">
              A minimum billing threshold of 10 kg applies to standard air cargo. Shipments of 10 kg or more qualify for free doorstep delivery in Lagos and Abuja.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              What Items Can I Send From London to Nigeria?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-bold text-green-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Permitted Goods
                </h3>
                <ul className="text-xs text-green-800 space-y-1 list-disc list-inside">
                  <li>Clothing, shoes and personal luggage</li>
                  <li>Laptops, smartphones and electronics</li>
                  <li>Books and legal documents</li>
                  <li>Non-perishable packaged dry foodstuff</li>
                  <li>Commercial stock and retail goods</li>
                  <li>Household items and furniture</li>
                  <li>Business equipment and machinery parts</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <h3 className="font-bold text-red-900 text-sm mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Prohibited Items
                </h3>
                <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                  <li>Fresh uninspected meat and dairy</li>
                  <li>Flammable liquids and perfume sprays</li>
                  <li>Raw plants, seeds and soil</li>
                  <li>Weapons and counterfeit goods</li>
                  <li>Uncertified pharmaceuticals</li>
                  <li>Currency and financial instruments</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              How the Collection and Shipping Process Works
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Request a Collection',
                  description:
                    'Contact County Cargo by phone or WhatsApp to schedule a free doorstep collection from your South East or North West London address.',
                },
                {
                  step: '2',
                  title: 'Pack and Label Your Cargo',
                  description:
                    'Pack your goods securely and label each item clearly. Our team can advise on approved packaging standards and documentation requirements.',
                },
                {
                  step: '3',
                  title: 'Collection and Processing',
                  description:
                    'Our driver collects your cargo at the agreed time. Your shipment is weighed, documented and processed at our UK consolidation hub.',
                },
                {
                  step: '4',
                  title: 'Air or Sea Dispatch',
                  description:
                    'Your cargo is dispatched by your chosen service. Air cargo reaches Nigeria in 5–10 working days. Sea cargo takes 4 to 8 weeks.',
                },
                {
                  step: '5',
                  title: 'Customs Clearance and Delivery',
                  description:
                    'On arrival in Nigeria, your cargo is cleared through customs and delivered to your specified address in Lagos, Abuja or elsewhere in Nigeria.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              Customs and Documentation
            </h2>
            <p className="text-gray-700">
              All shipments from the UK to Nigeria are subject to Nigerian Customs Service requirements. You will need to provide an accurate description and declared value for all items. County Cargo assists customers with documentation guidance and customs paperwork for straightforward personal-effects shipments.
            </p>
            <p className="text-gray-700">
              Commercial shipments require additional documentation, including a commercial invoice, packing list and, depending on the goods, import permits or product certifications. Contact County Cargo for specific guidance based on your cargo type.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              Delivery in Nigeria
            </h2>
            <p className="text-gray-700">
              County Cargo delivers to Lagos, Abuja and all Nigerian states. Shipments of 10 kg or more qualify for free doorstep delivery in Lagos and Abuja. Delivery charges may apply to remote destinations and some states outside the FCT and Lagos metropolitan area.
            </p>
            <p className="text-gray-700">
              Your recipient will be notified when the cargo arrives in Nigeria and again when it is ready for delivery or collection.
            </p>

            {/* CTAs */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Ready to Ship From London to Nigeria?</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Schedule a free doorstep collection from South East or North West London today, or get an instant quote for your Nigeria cargo.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-uk-to-nigeria">Book London Cargo</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/447438827464" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Inquiry
                  </a>
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Frequently Asked Questions
              </h2>

              {[
                {
                  q: 'Does County Cargo collect cargo from South East London?',
                  a: 'Yes. County Cargo offers free doorstep collection from South East London areas including Camberwell, Peckham, Elephant and Castle, Lewisham, New Cross, Deptford, Bermondsey, Walworth, Brixton, Stockwell, Clapham, Streatham, Tooting, Balham and Norwood.',
                },
                {
                  q: 'Does County Cargo collect cargo from North West London?',
                  a: 'Yes. County Cargo collects from North West London areas including Wembley, Harrow, Southall, Ealing, Acton, Greenford, Alperton, Kilburn, Cricklewood, Willesden, Brent Cross, Hendon, Finchley and Edgware.',
                },
                {
                  q: 'How long does shipping from London to Nigeria take?',
                  a: `Standard air cargo from London to Nigeria takes ${SHIPPING_TIMEFRAMES.STANDARD_AIR}. Express Air Courier takes ${SHIPPING_TIMEFRAMES.EXPRESS_AIR}. Sea cargo takes ${SHIPPING_TIMEFRAMES.SEA_CARGO}.`,
                },
                {
                  q: 'How much does it cost to ship cargo from London to Nigeria?',
                  a: 'Standard air cargo is priced at £6.00 per kg with a £15 handling fee per shipment. Sea cargo rates are calculated separately. Contact County Cargo for a personalised quote.',
                },
                {
                  q: 'What items can I send from London to Nigeria?',
                  a: 'You can send clothing, shoes, books, non-perishable packaged food, electronics, household items, personal belongings, business stock and retail goods. Prohibited items include fresh meat and dairy, flammable liquids, raw plants and soil, weapons and uncertified pharmaceuticals.',
                },
                {
                  q: 'Is there free delivery in Nigeria for shipments from London?',
                  a: 'Yes. Eligible shipments weighing 10 kg or more qualify for free doorstep delivery in Lagos and Abuja. Delivery is available to most areas across Nigeria.',
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

            <SocialShare title="Shipping From South East and North West London to Nigeria" />

            <RelatedGuides currentHref="/blog/shipping-south-east-north-west-london-to-nigeria" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
