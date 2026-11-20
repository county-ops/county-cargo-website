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
  Scale,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exporting and Shipping from Abuja to the UK: Costs, Express Options & Complete Guide | County Cargo',
  description:
    'Complete guide to exporting and shipping parcels, dry foodstuffs, fashion, and commercial cargo from Abuja (FCT) to the United Kingdom. Compare ₦11,500/kg Standard Air Cargo and 48-hour Express options.',
  keywords:
    'export from abuja to uk, ship from abuja to uk, abuja to uk cargo rates, send parcel from abuja to london, shipping foodstuff from abuja to uk, county cargo abuja wuye office, express shipping abuja to uk',
  alternates: {
    canonical: 'https://countycargo.com/blog/export-from-abuja-to-uk',
  },
  openGraph: {
    title: 'Exporting and Shipping from Abuja to the UK: Costs, Express Options & Complete Guide | County Cargo',
    description:
      'Ship from Abuja to London, Manchester, Birmingham, Liverpool, and across the UK. Standard Air Cargo from ₦11,500/kg (5–10 days) and 48-hour Express options.',
    url: 'https://countycargo.com/blog/export-from-abuja-to-uk',
    siteName: 'County Cargo',
    type: 'article',
  },
};

const ukServiceTiers = [
  {
    service: 'Standard Air Cargo (Abuja to UK)',
    rate: '₦11,500 / kg',
    minWeight: '10 kg minimum',
    transitTime: '5–10 working days',
    notes: 'Full tracking included; ideal for foodstuffs, fashion, personal effects & business stock',
  },
  {
    service: '48hrs Express Shipping',
    rate: '£24.00 / kg',
    minWeight: '1 kg minimum',
    transitTime: '2 working days',
    notes: '£20 handling charge applies; ideal for urgent parcels & priority deliveries',
  },
  {
    service: 'DHL Express (3–5 Working Days)',
    rate: 'Contact Abuja Team',
    minWeight: '1 kg minimum',
    transitTime: '3–5 working days',
    notes: 'Ideal for legal/academic documents, small parcels & commercial samples',
  },
];

const ukExportSteps = [
  {
    num: '1',
    icon: <ClipboardList className="w-5 h-5 text-primary shrink-0" />,
    title: 'Prepare your items and packing list',
    body: 'List all items, quantities, and values clearly. Ensure dry foodstuffs and spices are thoroughly dried, sealed in clean transparent packaging, and labelled in English.',
  },
  {
    num: '2',
    icon: <MapPin className="w-5 h-5 text-primary shrink-0" />,
    title: 'Drop off at County Cargo Abuja (Wuye Market)',
    body: "Bring your shipment to Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT, or call +234 811 000 0423 for guidance before visiting.",
  },
  {
    num: '3',
    icon: <Scale className="w-5 h-5 text-primary shrink-0" />,
    title: 'Compliance check & chargeable weight verification',
    body: 'Our Abuja team checks your items against UK export/import rules and measures actual scale weight and carton dimensions (L × W × H ÷ 5000) to confirm chargeable weight.',
  },
  {
    num: '4',
    icon: <CreditCard className="w-5 h-5 text-primary shrink-0" />,
    title: 'Choose your UK service tier and pay',
    body: 'Select Standard Air Cargo (₦11,500/kg from Abuja, 10kg min), 48hrs Express (£24/kg + £20 handling, 1kg min), or 3–5 day DHL Express. Confirm the recipient’s full UK address, postcode, and phone number.',
  },
  {
    num: '5',
    icon: <PackageCheck className="w-5 h-5 text-primary shrink-0" />,
    title: 'Customs clearance & UK delivery',
    body: 'Track your shipment online as it departs Nigeria, clears UK customs formalities, and is delivered to your recipient across England, Scotland, Wales, or Northern Ireland.',
  },
];

const faqs = [
  {
    q: 'How much does it cost to ship from Abuja to the UK?',
    a: (
      <>
        Standard Air Cargo from Abuja to the UK is <strong>₦11,500 per kg</strong> (with a <strong>10 kg minimum chargeable weight</strong>) and delivers within 5–10 working days. For urgent shipments starting from 1 kg, we offer <strong>48hrs Express Shipping at £24.00/kg</strong> (plus a £20 handling charge) as well as <strong>3–5 day DHL Express</strong>.{' '}
        <Link href="/ship-from-nigeria-to-uk" className="text-primary underline underline-offset-2 hover:opacity-80">
          Calculate your Abuja-to-UK shipping estimate online.
        </Link>
      </>
    ),
  },
  {
    q: 'Where can I drop off packages in Abuja for UK shipping?',
    a: (
      <>
        Drop off your packages at our Abuja office: <strong>Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT</strong>. Call our Abuja team on{' '}
        <a href="tel:+2348110000423" className="text-primary underline underline-offset-2 hover:opacity-80">
          +234 811 000 0423
        </a>{' '}
        (Mon–Fri 9:00 AM – 5:00 PM; Sat 10:00 AM – 2:00 PM).
      </>
    ),
  },
  {
    q: 'How fast can I send an urgent parcel from Abuja to London or Manchester?',
    a: 'With our 48hrs Express Shipping service (£24.00/kg + £20 handling charge, 1 kg minimum) or our 3–5 working day DHL Express service, you can send urgent fashion outfits, documents, or small parcels from Abuja to London, Manchester, Liverpool, Birmingham, and across the UK in just 2 to 5 working days.',
  },
  {
    q: 'What foodstuffs can I export from Abuja to the UK?',
    a: 'You can send properly dried, non-perishable Nigerian foodstuffs such as garri, dried crayfish, ogbono, egusi, dried pepper, suya spice, locust beans, and packaged snacks, provided they comply with UK Border Force and DEFRA regulations. Perishable foods, fresh meat, dairy products, and prohibited plant or animal items are not accepted.',
  },
  {
    q: 'Are UK customs duties included in the shipping rate?',
    a: 'County Cargo guides you through export documentation and assists with UK customs processing, while any import duties, VAT, or regulatory fees assessed by HM Revenue & Customs (HMRC) in the UK remain the responsibility of the recipient/customer.',
  },
];

export default function ExportFromAbujaToUkPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Exporting and Shipping from Abuja to the UK: Costs, Express Options & Complete Guide',
        description:
          'Complete guide to exporting parcels, dry foodstuffs, fashion, and commercial cargo from Abuja (FCT) to the United Kingdom with County Cargo.',
        image: 'https://countycargo.com/blog-export-abuja-to-uk.jpg',
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
        datePublished: '2026-11-20',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://countycargo.com/blog/export-from-abuja-to-uk',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much does it cost to ship from Abuja to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standard Air Cargo from Abuja to the UK costs ₦11,500 per kg (10 kg minimum weight, 5–10 working days). 48hrs Express Shipping is £24.00/kg plus a £20 handling charge (1 kg minimum, 2 working days), and 3–5 day DHL Express is also available.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where can I drop off packages in Abuja for UK shipping?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Visit County Cargo's Abuja office at Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT, or call +234 811 000 0423.",
            },
          },
          {
            '@type': 'Question',
            name: 'How fast can I send an urgent parcel from Abuja to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '48hrs Express Shipping delivers in 2 working days, while DHL Express delivers in 3–5 working days and Standard Air Cargo takes 5–10 working days.',
            },
          },
          {
            '@type': 'Question',
            name: 'What foodstuffs can I export from Abuja to the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dry, non-perishable foodstuffs such as garri, dried crayfish, egusi, ogbono, dried spices, and packaged snacks can be shipped when properly sealed, labelled in English, and compliant with UK import regulations.',
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
            background: `linear-gradient(rgba(13, 27, 62, 0.78), rgba(15, 23, 42, 0.88)), url('/blog-export-abuja-to-uk.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-4">
              <Truck className="w-3.5 h-3.5" /> Abuja to UK Export Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold hero-text-glow leading-tight">
              Exporting and Shipping from Abuja to the UK: Costs, Express Options &amp; Complete Guide
            </h1>
            <p className="text-base sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow text-gray-200">
              How to send foodstuffs, Nigerian fashion, student care packages, and commercial cargo from Abuja to London, Manchester, Liverpool, Birmingham, and across the UK.
            </p>
            <p className="text-xs sm:text-sm mt-5 text-gray-300">
              By County Cargo Staff &nbsp;·&nbsp; 20 November 2026 &nbsp;·&nbsp; 7 min read
            </p>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose lg:prose-xl prose-slate">
            <p className="lead font-medium text-lg text-slate-700">
              Strong family, educational, and business ties connect Abuja with cities across the United Kingdom. Whether you are sending a student care package to Manchester, shipping bespoke Aso-Ebi and native wear to clients in London, or exporting dry Nigerian groceries and retail goods to Birmingham or Liverpool, having a reliable local export partner in Abuja makes all the difference.
            </p>
            <p>
              From our Abuja office in <strong>Wuye Ultra Modern Market</strong>—backed by our UK operations hub at <strong>Queens Dock Commercial Centre in Liverpool</strong>—County Cargo provides seamless air export options tailored to both budget-conscious bulk shipments and urgent 48-hour express deliveries.{' '}
              <Link href="/ship-from-nigeria-to-uk" className="text-primary font-semibold underline underline-offset-2 hover:opacity-80">
                View our Nigeria to UK shipping page.
              </Link>
            </p>

            {/* Abuja & UK Hub Callout */}
            <div className="bg-blue-50 border-l-4 border-primary rounded-r-xl p-6 my-8 not-prose">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-bold text-secondary text-base sm:text-lg">
                    Direct Abuja Drop-Off &amp; UK Logistics Network
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    <strong>Abuja Office:</strong> Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT &nbsp;·&nbsp; Tel:{' '}
                    <a href="tel:+2348110000423" className="text-primary font-semibold hover:underline">
                      +234 811 000 0423
                    </a>
                  </p>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    <strong>UK Operations Hub:</strong> Unit G6, 67-83 Queens Dock Commercial Centre, Norfolk Street, Liverpool, L1 0BG, United Kingdom
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1: Abuja to UK Rates & Service Tiers */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary shrink-0" /> Abuja to UK Shipping Rates &amp; Service Tiers
            </h2>
            <p>
              We offer three flexible export services from Abuja to the United Kingdom so you can match your shipment size and delivery deadline:
            </p>

            <div className="border border-slate-200 rounded-2xl overflow-hidden my-8 not-prose shadow-sm">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-bold">Service Option</th>
                    <th className="p-4 font-bold">Abuja Rate</th>
                    <th className="p-4 font-bold">Min. Weight</th>
                    <th className="p-4 font-bold">Delivery Window</th>
                    <th className="p-4 font-bold hidden sm:table-cell">Key Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {ukServiceTiers.map((row, idx) => (
                    <tr key={row.service} className={idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
                      <td className="p-4 font-semibold text-secondary">{row.service}</td>
                      <td className="p-4 font-bold text-primary">{row.rate}</td>
                      <td className="p-4">{row.minWeight}</td>
                      <td className="p-4">{row.transitTime}</td>
                      <td className="p-4 hidden sm:table-cell text-slate-600 text-sm">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
              <p className="flex items-start gap-2.5 text-amber-950 text-sm sm:text-base font-medium">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Chargeable Weight Calculation:</strong> Air cargo is charged on the greater of actual scale weight or volumetric weight (<code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">Length cm × Width cm × Height cm ÷ 5000</code>), subject to the minimum weight for your chosen service (10 kg for Standard Air Cargo; 1 kg for 48hrs Express and DHL Express).
                </span>
              </p>
            </div>

            {/* Section 2: What to Export from Abuja to the UK */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6 flex items-center gap-3">
              <PackageCheck className="w-6 h-6 text-primary shrink-0" /> Popular Exports from Abuja to the UK
            </h2>
            <p>
              Customers from Wuse, Garki, Maitama, Asokoro, Gwarinpa, Utako, Jabi, Kubwa, Lugbe, Apo, and Guzape regularly use our Abuja export desk to dispatch:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> Bespoke Nigerian Fashion &amp; Aso-Ebi
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Abuja tailors, bridal couture houses, and fashion retailers use our Standard Air Cargo (5–10 days) and 48hrs Express service to deliver wedding Aso-Ebi, agbada, kaftans, Ankara sets, and accessories to UK customers on time.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> Dry Nigerian Foodstuffs &amp; Student Packages
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Garri, dried crayfish, egusi, ogbono, dried vegetables, suya spice (yaji), dried pepper, plantain chips, and dry pantry staples sent to university students and families across the UK.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> Natural Cosmetics, Shea Butter &amp; Crafts
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Pure shea butter, black soap, woven textiles, leather goods, artwork, and non-perishable Nigerian lifestyle products exported to UK diaspora boutiques and online sellers.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> Urgent Documents &amp; Small Parcels
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Official certificates, contracts, academic credentials, and lightweight urgent parcels starting from 1 kg via our 48hrs Express or 3–5 day DHL Express services.
                </p>
              </div>
            </div>

            {/* Section 3: UK Customs & Packaging Tips */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" /> UK Customs Compliance &amp; Packaging Rules
            </h2>
            <p>
              Every shipment entering Great Britain is subject to <strong>HM Revenue &amp; Customs (HMRC)</strong> and <strong>UK Border Force</strong> controls. To keep your shipment moving smoothly without customs holds:
            </p>
            <ul>
              <li>
                <strong>Provide a specific itemised packing list:</strong> List each item accurately with quantities and realistic values. Avoid generic labels like <em>&quot;foodstuff&quot;</em> or <em>&quot;gift&quot;</em>.
              </li>
              <li>
                <strong>Ensure foodstuffs are bone-dry and sealed:</strong> Moisture or poor sealing can lead to spoilage or rejection during border inspection. Use strong double-bagging and clear English labels.
              </li>
              <li>
                <strong>Do not pack prohibited or restricted goods:</strong> Fresh meat, dairy, perishable produce, hazardous chemicals, flammable liquids, loose lithium batteries, cash, counterfeit goods, and controlled substances are strictly prohibited.{' '}
                <Link href="/info" className="text-primary font-semibold underline underline-offset-2 hover:opacity-80">
                  See our complete Prohibited &amp; Restricted Goods section.
                </Link>
              </li>
              <li>
                <strong>Understand UK import duties &amp; VAT:</strong> While County Cargo handles export dispatch and customs clearance coordination, any statutory UK import duties or VAT charged by HMRC are payable by the recipient/customer.
              </li>
            </ul>

            {/* Section 4: Step-by-Step Booking Process */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-14 mb-6 flex items-center gap-3">
              <CalendarCheck className="w-6 h-6 text-primary shrink-0" /> How to Book Your Abuja to UK Shipment in 5 Steps
            </h2>

            <div className="space-y-4 my-8 not-prose">
              {ukExportSteps.map((step) => (
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

            {/* Section 5: UK Coverage */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-primary shrink-0" /> UK Cities &amp; Regions We Deliver To from Abuja
            </h2>
            <p>
              We deliver packages from Abuja across the entire United Kingdom, including:
            </p>
            <ul>
              <li><strong>Greater London &amp; South East:</strong> London, Milton Keynes, Luton, Reading, Oxford, Cambridge, Brighton, Southampton</li>
              <li><strong>North West (Home to our Liverpool Hub):</strong> Liverpool, Manchester, Bolton, Preston, Warrington, St Helens, Wigan</li>
              <li><strong>Midlands &amp; Yorkshire:</strong> Birmingham, Coventry, Leicester, Nottingham, Leeds, Sheffield, Bradford</li>
              <li><strong>South West, Wales, Scotland &amp; North East:</strong> Bristol, Cardiff, Newcastle, Glasgow, Edinburgh, Aberdeen</li>
            </ul>

            {/* FAQs */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-14 mb-6 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary shrink-0" /> Frequently Asked Questions: Abuja to UK Shipping
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
                Start Shipping from Abuja to the UK Today
              </h3>
              <p className="opacity-90 mb-4 text-sm sm:text-base leading-relaxed text-slate-200">
                Drop off your shipment at <strong>Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT</strong>, or get an instant estimate using our online calculator.
              </p>
              <p className="text-sm opacity-90 mb-6 text-slate-300 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Abuja Office Telephone: <a href="tel:+2348110000423" className="underline font-semibold text-white">+234 811 000 0423</a></span>
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-primary text-white hover:bg-primary/95 border-none font-semibold px-6 py-2.5"
                >
                  <Link href="/ship-from-nigeria-to-uk">
                    Calculate Abuja to UK Rate <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-2.5"
                >
                  <Link href="/contact">Contact Abuja Office</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-2.5"
                >
                  <Link href="/blog/export-from-abuja-to-usa">Export from Abuja to USA Guide</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-2.5"
                >
                  <Link href="/shipping-from-uk-to-nigeria">UK to Nigeria Shipping</Link>
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
