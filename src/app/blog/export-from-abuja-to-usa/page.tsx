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
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Export and Ship from Abuja to the USA: Rates, Delivery Times & Complete Guide | County Cargo',
  description:
    'Complete guide to exporting and shipping parcels, foodstuffs, fashion, and commercial cargo from Abuja (FCT) to the United States. View Abuja-to-USA rates, Wuye office details, and customs tips.',
  keywords:
    'export from abuja to usa, ship from abuja to us, abuja to usa cargo, send parcel from abuja to usa, shipping foodstuff from abuja to us, county cargo abuja office, international shipping abuja to america',
  alternates: {
    canonical: 'https://countycargo.com/blog/export-from-abuja-to-usa',
  },
  openGraph: {
    title: 'How to Export and Ship from Abuja to the USA: Rates, Delivery Times & Complete Guide | County Cargo',
    description:
      'Ship packages, dry foodstuffs, fashion, and business cargo from our Wuye, Abuja office to any US state. Transparent per-kg rates and reliable 7–14 day or 3–5 day express delivery.',
    url: 'https://countycargo.com/blog/export-from-abuja-to-usa',
    siteName: 'County Cargo',
    type: 'article',
  },
};

const serviceOptions = [
  {
    service: 'Standard Air Cargo (Abuja to USA)',
    rate: '₦15,500 / kg',
    minWeight: '10 kg minimum',
    transitTime: '7–14 working days',
    idealFor: 'Dry foodstuffs, fashion & textiles, personal effects, family care packages, and SME stock',
  },
  {
    service: 'DHL Express (3–5 Working Days)',
    rate: 'Contact Abuja Team',
    minWeight: '1 kg minimum',
    transitTime: '3–5 working days',
    idealFor: 'Urgent documents, small parcels, product samples, and time-critical deliveries',
  },
];

const exportSteps = [
  {
    num: '1',
    icon: <ClipboardList className="w-5 h-5 text-primary shrink-0" />,
    title: 'Prepare and list your export items',
    body: 'Create a clear itemised list showing every item, quantity, and value. Ensure dry foodstuffs are properly dried, sealed in transparent tamper-evident packaging, and clearly labelled in English.',
  },
  {
    num: '2',
    icon: <MapPin className="w-5 h-5 text-primary shrink-0" />,
    title: 'Visit or contact our Abuja Office in Wuye',
    body: "Bring your items to Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT, or call +234 811 000 0423 to discuss your shipment before drop-off.",
  },
  {
    num: '3',
    icon: <Scale className="w-5 h-5 text-primary shrink-0" />,
    title: 'Inspection, weighing & volumetric check',
    body: 'Our Abuja logistics team inspects the contents for export compliance and records the actual scale weight and carton dimensions (L × W × H ÷ 5000) to confirm the final chargeable weight.',
  },
  {
    num: '4',
    icon: <CreditCard className="w-5 h-5 text-primary shrink-0" />,
    title: 'Select your service tier and complete payment',
    body: 'Choose between Standard Air Cargo (₦15,500/kg, 10kg minimum) or 3–5 day DHL Express. Confirm your recipient’s full US street address, ZIP code, email, and active phone number, then complete payment.',
  },
  {
    num: '5',
    icon: <PackageCheck className="w-5 h-5 text-primary shrink-0" />,
    title: 'Track your shipment to US doorstep delivery',
    body: 'Receive your tracking reference and monitor your shipment as it clears customs and is delivered directly to your recipient’s address anywhere in the United States.',
  },
];

const faqs = [
  {
    q: 'How much does it cost to export from Abuja to the USA?',
    a: (
      <>
        Our Standard Air Cargo rate from Abuja to the United States starts at <strong>₦15,500 per kg</strong> with a{' '}
        <strong>10 kg minimum chargeable weight</strong> and no hidden handling charges. For urgent documents or small parcels under 10 kg, we also offer <strong>3–5 day DHL Express</strong> rates on request.{' '}
        <Link href="/ship-from-nigeria-to-us" className="text-primary underline underline-offset-2 hover:opacity-80">
          Use our Nigeria-to-US shipping calculator for an instant estimate.
        </Link>
      </>
    ),
  },
  {
    q: 'Where is the County Cargo drop-off office in Abuja?',
    a: (
      <>
        Our Abuja office is located at <strong>Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT</strong>. You can reach the Abuja team directly on{' '}
        <a href="tel:+2348110000423" className="text-primary underline underline-offset-2 hover:opacity-80">
          +234 811 000 0423
        </a>{' '}
        (Monday – Friday: 9:00 AM – 5:00 PM; Saturday: 10:00 AM – 2:00 PM).
      </>
    ),
  },
  {
    q: 'How long does shipping from Abuja to the US take?',
    a: 'Standard Air Cargo from Abuja to US destinations typically takes 7 to 14 working days. If you need faster delivery for urgent documents, fashion orders, or small parcels, our DHL Express service delivers in 3 to 5 working days.',
  },
  {
    q: 'Can I send Nigerian foodstuffs from Abuja to the USA?',
    a: 'Yes, many dry and non-perishable Nigerian foodstuffs—such as garri, dried crayfish, ogbono, egusi, kilishi (subject to current US agricultural rules), dried spices, and packaged snacks—can be exported when properly dried, sealed, labelled, and declared. Perishable foods, fresh meat, unpasteurised dairy, and wet or leaking items are not accepted.',
  },
  {
    q: 'Which US cities and states do you deliver to from Abuja?',
    a: 'We deliver door-to-door across all 50 US states, including major Nigerian diaspora hubs such as Houston, Dallas, Atlanta, New York City, Newark, Baltimore, Washington D.C., Chicago, Los Angeles, Boston, Seattle, and Miami.',
  },
];

export default function ExportFromAbujaToUsaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'How to Export and Ship from Abuja to the USA: Rates, Delivery Times & Complete Guide',
        description:
          'A complete guide to exporting packages, dry foodstuffs, fashion, and commercial cargo from Abuja (FCT) to the United States with County Cargo.',
        image: 'https://countycargo.com/blog-export-abuja-to-usa.jpg',
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
          '@id': 'https://countycargo.com/blog/export-from-abuja-to-usa',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much does it cost to export from Abuja to the USA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standard Air Cargo from Abuja to the United States starts at ₦15,500 per kg with a 10 kg minimum chargeable weight and no handling fee. 3–5 day DHL Express is also available for urgent documents and small parcels.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is the County Cargo drop-off office in Abuja?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "County Cargo's Abuja office is at Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT. Telephone: +234 811 000 0423.",
            },
          },
          {
            '@type': 'Question',
            name: 'How long does shipping from Abuja to the US take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standard Air Cargo takes 7–14 working days, while DHL Express takes 3–5 working days.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I send Nigerian foodstuffs from Abuja to the USA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, dry, non-perishable foodstuffs that are properly sealed, labelled in English, and declared for US customs can be shipped. Fresh, wet, or prohibited agricultural products are not accepted.',
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
            background: `linear-gradient(rgba(13, 27, 62, 0.78), rgba(15, 23, 42, 0.88)), url('/blog-export-abuja-to-usa.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-4">
              <Globe2 className="w-3.5 h-3.5" /> Abuja Export Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold hero-text-glow leading-tight">
              How to Export and Ship from Abuja to the USA: Rates, Delivery Times &amp; Step-by-Step Guide
            </h1>
            <p className="text-base sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow text-gray-200">
              Everything individuals, families, and SMEs in Abuja need to send foodstuffs, fashion, documents, and commercial cargo to any US state reliably.
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
              Whether you are an Abuja fashion brand fulfilling client orders in Houston and Atlanta, a family in Gwarinpa or Maitama sending dry Nigerian foodstuffs to relatives studying in the United States, or a business dispatching documents and product samples, exporting from Abuja to the USA does not have to be complicated.
            </p>
            <p>
              With County Cargo&apos;s dedicated Abuja office at <strong>Wuye Ultra Modern Market</strong>, shippers across the Federal Capital Territory (FCT) and neighbouring North-Central states can drop off exports locally, get transparent per-kilogram pricing, and enjoy tracked doorstep delivery across all 50 US states.{' '}
              <Link href="/ship-from-nigeria-to-us" className="text-primary font-semibold underline underline-offset-2 hover:opacity-80">
                Explore our Nigeria to US shipping page.
              </Link>
            </p>

            {/* Abuja Office Callout Box */}
            <div className="bg-blue-50 border-l-4 border-primary rounded-r-xl p-6 my-8 not-prose">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-secondary text-base sm:text-lg mb-1">
                    County Cargo Abuja Export Hub — Wuye Ultra Modern Market
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-2">
                    <strong>Address:</strong> Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT
                  </p>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    <strong>Telephone:</strong>{' '}
                    <a href="tel:+2348110000423" className="text-primary font-semibold hover:underline">
                      +234 811 000 0423
                    </a>{' '}
                    &nbsp;|&nbsp; <strong>Hours:</strong> Mon–Fri 9:00 AM – 5:00 PM, Sat 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1: Rates & Service Options */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <Truck className="w-6 h-6 text-primary shrink-0" /> Abuja to USA Shipping Rates &amp; Delivery Options
            </h2>
            <p>
              Choosing the right export tier depends on your parcel weight, urgency, and budget. County Cargo offers two reliable air export routes from Abuja to the United States:
            </p>

            <div className="border border-slate-200 rounded-2xl overflow-hidden my-8 not-prose shadow-sm">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-bold">Service Tier</th>
                    <th className="p-4 font-bold">Rate</th>
                    <th className="p-4 font-bold">Min. Weight</th>
                    <th className="p-4 font-bold">Est. Delivery</th>
                    <th className="p-4 font-bold hidden sm:table-cell">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {serviceOptions.map((row, idx) => (
                    <tr key={row.service} className={idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
                      <td className="p-4 font-semibold text-secondary">{row.service}</td>
                      <td className="p-4 font-bold text-primary">{row.rate}</td>
                      <td className="p-4">{row.minWeight}</td>
                      <td className="p-4">{row.transitTime}</td>
                      <td className="p-4 hidden sm:table-cell text-slate-600 text-sm">{row.idealFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
              <p className="flex items-start gap-2.5 text-amber-950 text-sm sm:text-base font-medium">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>How Chargeable Weight Works:</strong> International air freight is billed on whichever is greater between actual scale weight and volumetric weight (<code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">Length cm × Width cm × Height cm ÷ 5000</code>), subject to the 10 kg minimum for Standard Air Cargo. Packing snugly in a strong carton helps avoid paying for empty space.
                </span>
              </p>
            </div>

            {/* Section 2: Popular Exports from Abuja to the US */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6 flex items-center gap-3">
              <PackageCheck className="w-6 h-6 text-primary shrink-0" /> What Can You Export from Abuja to the USA?
            </h2>
            <p>
              Our Abuja export desk serves a wide range of personal and commercial shippers across Wuse, Garki, Maitama, Asokoro, Gwarinpa, Utako, Jabi, Kubwa, Lugbe, and Apo. Common exports include:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> Dry Nigerian Foodstuffs &amp; Spices
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Garri, dried crayfish, egusi, ogbono, dried bitterleaf, suya spice (yaji), dried pepper, locust beans (iru/dadawa), plantain chips, and packaged Nigerian snacks—properly dehydrated, double-sealed, and clearly labelled.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> Nigerian Fashion, Aso-Ebi &amp; Textiles
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Bespoke senator suits, Ankara collections, Aso-Ebi packages for US weddings, bridal wear, gele, leather footwear, handbags, and handmade accessories from Abuja designers to American clients.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> Non-Perishable Agro &amp; Natural Products
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Unrefined shea butter (properly sealed in leak-proof containers), black soap, moringa powder, hibiscus (zobo) leaves, and artisanal crafts compliant with US Customs and Border Protection (CBP) rules.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" /> Documents, Books &amp; Personal Effects
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Academic transcripts, legal and corporate documents (via 3–5 day DHL Express), books, artwork, and personal care packages for students and families living in the US.
                </p>
              </div>
            </div>

            {/* Section 3: US Customs & Packaging Rules */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" /> US Customs, FDA Compliance &amp; Packaging Checklist
            </h2>
            <p>
              Shipments entering the United States are screened by <strong>US Customs and Border Protection (CBP)</strong>, and food or cosmetic products may also be reviewed under <strong>FDA</strong> and <strong>USDA</strong> rules. Following these guidelines prevents delays or confiscation:
            </p>
            <ul>
              <li>
                <strong>No wet, fresh, or perishable foods:</strong> Ensure all food items are completely dry. Moisture causes mould in transit and triggers agricultural quarantine holds.
              </li>
              <li>
                <strong>Label every food package in English:</strong> Write the common English name (for example, <em>&quot;Dried Ground Melon Seeds (Egusi)&quot;</em> or <em>&quot;Roasted Cassava Granules (Garri)&quot;</em>) rather than local names alone.
              </li>
              <li>
                <strong>Declare every item honestly:</strong> Never hide powders, creams, or liquids inside clothing. Our Abuja team inspects packages before sealing so your customs declaration matches the physical contents.
              </li>
              <li>
                <strong>Check prohibited items before drop-off:</strong> Cash, currency, narcotics, firearms, flammable liquids, Aerosols, loose lithium batteries, counterfeit designer goods, and restricted animal products are strictly prohibited.{' '}
                <Link href="/info" className="text-primary font-semibold underline underline-offset-2 hover:opacity-80">
                  Review our full prohibited items policy.
                </Link>
              </li>
            </ul>

            {/* Section 4: Step-by-Step Process */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-14 mb-6 flex items-center gap-3">
              <CalendarCheck className="w-6 h-6 text-primary shrink-0" /> 5 Steps to Ship from Abuja to the USA
            </h2>

            <div className="space-y-4 my-8 not-prose">
              {exportSteps.map((step) => (
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

            {/* Section 5: US Destinations */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-4 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-primary shrink-0" /> Delivering Across Major US Cities &amp; States
            </h2>
            <p>
              Once your cargo departs Nigeria and clears US entry formalities, our last-mile delivery partners deliver directly to your recipient&apos;s doorstep across the United States, including:
            </p>
            <ul>
              <li><strong>Texas:</strong> Houston, Dallas, Fort Worth, Austin, San Antonio, Irving</li>
              <li><strong>Georgia &amp; South:</strong> Atlanta, Charlotte, Miami, Orlando, Jacksonville</li>
              <li><strong>East Coast &amp; Mid-Atlantic:</strong> New York City, Newark, Baltimore, Washington D.C., Philadelphia, Boston</li>
              <li><strong>Midwest &amp; West Coast:</strong> Chicago, Columbus, Indianapolis, Los Angeles, San Francisco, San Diego, Seattle, Phoenix, Denver</li>
            </ul>
            <p className="text-sm text-slate-600 italic">
              Reminder: Any applicable US import duties, taxes, or regulatory inspection fees levied by US authorities are the responsibility of the recipient/customer under our standard shipping terms.
            </p>

            {/* FAQs */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-14 mb-6 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary shrink-0" /> Frequently Asked Questions: Abuja to USA Export
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
                Ready to Export from Abuja to the USA?
              </h3>
              <p className="opacity-90 mb-4 text-sm sm:text-base leading-relaxed text-slate-200">
                Visit our Abuja office at <strong>Shop HF426, Turai Yar&apos;adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT</strong>, or calculate your shipping estimate online today.
              </p>
              <p className="text-sm opacity-90 mb-6 text-slate-300 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Call our Abuja Export Desk: <a href="tel:+2348110000423" className="underline font-semibold text-white">+234 811 000 0423</a></span>
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-primary text-white hover:bg-primary/95 border-none font-semibold px-6 py-2.5"
                >
                  <Link href="/ship-from-nigeria-to-us">
                    Calculate Abuja to USA Rate <ArrowRight className="ml-2 w-4 h-4" />
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
                  <Link href="/blog/export-from-abuja-to-uk">Export from Abuja to UK Guide</Link>
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
