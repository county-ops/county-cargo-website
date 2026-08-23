import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Ship, FileText, AlertTriangle, CheckCircle, Package, Check, HelpCircle, MapPin, Phone, Globe } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Ship Cargo from the UK to Nigeria: Costs & Times',
  description: 'Learn how to ship cargo from the UK to Nigeria, including current County Cargo rates, delivery times, packaging rules and documents required.',
  alternates: {
    canonical: 'https://countycargo.com/ship-cargo-uk-to-nigeria',
  },
};

const faqItems = [
  {
    question: 'How long does cargo take from the UK to Nigeria?',
    answer: 'County Cargo’s standard air service normally takes approximately 5–10 working days. Express cargo to Lagos is estimated at 2–3 working days, while sea cargo generally takes approximately 30–45 working days. All times are subject to the shipment schedule and customs clearance.'
  },
  {
    question: 'How much is shipping from the UK to Nigeria per kilogram?',
    answer: 'Indicative standard air-cargo rates start from £6 per kg to Lagos and £6.50 per kg to Abuja, plus a £15 handling fee. Express and sea-cargo rates differ. Confirm the latest price before booking.'
  },
  {
    question: 'Can County Cargo collect my package in the UK?',
    answer: 'Collection may be available depending on your location and the size of the shipment. Contact County Cargo with your postcode and package details for confirmation.'
  },
  {
    question: 'Can I ship food from the UK to Nigeria?',
    answer: 'Some packaged, non-perishable foods may be accepted, while fresh, open or restricted food products may not be allowed. Ask the team to confirm before packing food.'
  },
  {
    question: 'Does County Cargo deliver outside Lagos?',
    answer: 'Yes. Depending on the destination, the shipment may be routed to a collection point, transport park or local delivery provider. The team will explain the available arrangement and any additional cost.'
  },
  {
    question: 'Are customs charges included in the shipping price?',
    answer: 'This depends on the goods and the service. Any customs duty, special clearance cost or destination charge that applies should be confirmed during the quotation process.'
  }
];

export default function ShipCargoUkToNigeriaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const serviceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "UK to Nigeria Cargo Shipping",
      "provider": {
        "@type": "Organization",
        "name": "County Cargo",
        "url": "https://countycargo.com"
      },
      "serviceType": "Cargo & Shipping Freight Services",
      "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
      },
      "description": "Learn how to ship cargo from the UK to Nigeria, including current County Cargo rates, delivery times, packaging rules and documents required.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "description": "Standard air cargo, express cargo, and sea cargo rates from the United Kingdom to Nigeria."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://countycargo.com/ship-cargo-uk-to-nigeria/#liverpool-office",
      "name": "County Cargo Liverpool Warehouse",
      "image": "https://countycargo.com/shipping-cargo-uk-to-nigeria-county-cargo.jpg",
      "url": "https://countycargo.com/ship-cargo-uk-to-nigeria",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Unit G6, 67-83 Queens Dock Commercial Centre, Norfolk Street",
        "addressLocality": "Liverpool",
        "postalCode": "L1 0BG",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 53.3980,
        "longitude": -2.9818
      }
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="pt-16">
        <section
          className="min-h-[50vh] flex items-center justify-center text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(rgba(13, 27, 62, 0.75), rgba(15, 23, 42, 0.85)), url('/shipping-cargo-uk-to-nigeria-county-cargo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-foreground/20 text-blue-200 border border-blue-500/30 mb-4">
              <Globe className="w-3.5 h-3.5" /> Shipping Guide &middot; UK to Nigeria
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold hero-text-glow leading-tight">
              How to Ship Cargo from the UK to Nigeria: Costs, Delivery Times and Requirements
            </h1>
            <p className="text-base sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow text-gray-200">
              Your ultimate blueprint for choosing air or sea cargo, preparing shipping documents, and managing customs clearance.
            </p>
          </div>
        </section>

        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose lg:prose-xl prose-slate">
            
            <p className="lead font-medium text-lg text-slate-700">
              Whether you are sending personal belongings to your family, delivering products to customers or moving commercial goods, choosing the right cargo service can save you time, money and unnecessary stress.
            </p>
            <p>
              County Cargo provides reliable <strong>cargo shipping from the UK to Nigeria</strong>, with options for urgent packages, regular weekly shipments and larger consignments. This guide explains how the process works, how much shipping may cost, how long delivery normally takes and what you need before sending your items.
            </p>

            {/* Options */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6">What Shipping Options Are Available from the UK to Nigeria?</h2>
            <p>
              The best service depends on the size of your shipment, your budget and how quickly the goods are required.
            </p>
            
            <h3 className="text-xl font-bold text-secondary mt-6 mb-3 flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary shrink-0" /> Standard Air Cargo
            </h3>
            <p>
              Standard <Link href="/shipping-from-uk-to-nigeria">air cargo to Nigeria</Link> is suitable for clothing, household goods, business stock and other permitted items that need to reach Nigeria reasonably quickly without the higher cost of an express service.
            </p>
            <p>
              County Cargo’s estimated standard air-cargo delivery time is 5–10 working days, subject to the weekly shipping schedule, airline movement, customs clearance and local delivery arrangements.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3 flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary shrink-0" /> Express Air Cargo
            </h3>
            <p>
              Express cargo is designed for urgent and time-sensitive shipments. It is often suitable for documents, important personal items, samples and smaller packages needed within a few days.
            </p>
            <p>
              County Cargo’s estimated express delivery time from the UK to Lagos is 2–3 working days, subject to acceptance, flight availability and customs clearance.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3 flex items-center gap-2">
              <Ship className="w-5 h-5 text-primary shrink-0" /> Sea Cargo
            </h3>
            <p>
              Standard <Link href="/shipping-from-uk-to-nigeria">sea cargo to Nigeria</Link> can be a more economical choice for large or heavy shipments that are not urgent. It is commonly used for household items, machinery, business stock and bulk consignments.
            </p>
            <p>
              County Cargo’s estimated sea-cargo delivery time is 30–45 working days. Sea freight takes longer than air cargo, so customers should allow additional time for vessel schedules, port operations and customs clearance.
            </p>

            {/* Cost Table */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6">How Much Does It Cost to Ship Cargo from the UK to Nigeria?</h2>
            <p>
              Shipping costs depend on the weight or volume of the package, the destination in Nigeria, the selected service and whether collection or local delivery is required.
            </p>
            <p>
              County Cargo’s indicative rates are:
            </p>

            <div className="border border-slate-200 rounded-xl overflow-hidden my-8 not-prose">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 font-bold text-secondary">Service</th>
                    <th className="p-4 font-bold text-secondary">Destination</th>
                    <th className="p-4 font-bold text-secondary text-right">Indicative Rate</th>
                    <th className="p-4 font-bold text-secondary">Estimated Delivery Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-4">Standard Air Cargo</td>
                    <td className="p-4">Lagos</td>
                    <td className="p-4 text-right font-medium">£6 per kg, plus £15 handling</td>
                    <td className="p-4">5–10 working days</td>
                  </tr>
                  <tr>
                    <td className="p-4">Standard Air Cargo</td>
                    <td className="p-4">Abuja</td>
                    <td className="p-4 text-right font-medium">£6.50 per kg, plus £15 handling</td>
                    <td className="p-4">5–10 working days</td>
                  </tr>
                  <tr>
                    <td className="p-4">Express Air Cargo</td>
                    <td className="p-4">Lagos</td>
                    <td className="p-4 text-right font-medium">£22 per kg, plus £15 handling</td>
                    <td className="p-4">2–3 working days</td>
                  </tr>
                  <tr>
                    <td className="p-4">Express Air Cargo</td>
                    <td className="p-4">Abuja</td>
                    <td className="p-4 text-right font-medium">£23 per kg, plus £15 handling</td>
                    <td className="p-4"><Link href="/contact" className="text-primary hover:underline">Confirm when booking</Link></td>
                  </tr>
                  <tr>
                    <td className="p-4">Sea Cargo</td>
                    <td className="p-4">Nigeria</td>
                    <td className="p-4 text-right font-medium">From £4 per kg, with a 30 kg minimum</td>
                    <td className="p-4">30–45 working days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-500 italic">
              These prices are a guide and may change. The final quotation can be affected by dimensions, destination, customs requirements, special handling and last-mile delivery. Always confirm the current rate with County Cargo before sending your goods.
            </p>

            {/* Documents */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary shrink-0" /> What Information and Documents Are Required?
            </h2>
            <p>
              Most personal shipments are straightforward, but the sender should provide complete and accurate information. You will normally need:
            </p>
            <ul>
              <li>The sender’s full name, telephone number and address</li>
              <li>The recipient’s full name and Nigerian telephone number</li>
              <li>The complete delivery or collection address in Nigeria</li>
              <li>A clear description of every item in the shipment</li>
              <li>The quantity and estimated value of the goods</li>
              <li>A commercial invoice for goods purchased for resale or business use</li>
              <li>Identification or additional customs documents when requested</li>
            </ul>
            <p>
              Incorrect contact details or a vague description such as “personal items” may cause questions or delays. Describe the contents clearly and honestly when completing your shipment information.
            </p>

            {/* Packaging */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6 flex items-center gap-3">
              <Package className="w-6 h-6 text-primary shrink-0" /> How to Prepare Your Cargo for Shipping
            </h2>
            <p>
              Good packaging protects your items throughout handling, loading, air or sea transport and customs inspection.
            </p>
            <ol>
              <li>
                <strong>Choose a strong outer box</strong>: Use a sturdy double-wall carton where possible. Avoid weak, wet or previously damaged boxes because they may collapse during transit.
              </li>
              <li>
                <strong>Protect each item</strong>: Wrap fragile items separately with suitable protective material. Fill empty spaces inside the carton so the contents cannot move around easily.
              </li>
              <li>
                <strong>Seal the package securely</strong>: Use strong parcel tape across every opening and reinforce the bottom of heavier boxes. Do not rely on string or light household tape.
              </li>
              <li>
                <strong>Label the cargo clearly</strong>: Write the sender’s and recipient’s details clearly. Where possible, place a second copy of the recipient’s contact information inside the package.
              </li>
              <li>
                <strong>Declare the contents accurately</strong>: An accurate declaration helps the cargo team identify <Link href="/info">restricted goods</Link>, prepare the correct documentation and reduce avoidable customs delays.
              </li>
            </ol>

            {/* Image Alt Hints */}
            <div className="my-10 relative aspect-video w-full rounded-2xl overflow-hidden border shadow-md not-prose">
              <Image 
                src="/shipping-cargo-uk-to-nigeria-county-cargo.jpg" 
                alt="Securely packed boxes ready for UK-to-Nigeria air cargo shipping" 
                fill 
                className="object-cover"
              />
            </div>

            {/* Banned Goods */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" /> What Items Should Not Be Shipped?
            </h2>
            <p>
              Some items are prohibited or restricted because they may be dangerous, illegal or unsuitable for air or sea transport. Examples can include:
            </p>
            <ul>
              <li>Aerosols, pressurised sprays and flammable liquids</li>
              <li>Perfumes and certain alcohol-based products</li>
              <li>Loose lithium batteries and some power banks</li>
              <li>Fuel, gas cylinders, bleach and hazardous chemicals</li>
              <li>Illegal drugs, unlicensed weapons and other contraband</li>
              <li>Cash, bank cards and certain high-value items</li>
              <li>Live animals, plants, soil and some perishable foods</li>
            </ul>
            <p>
              Restrictions can vary by carrier, service and destination. Do not pack a questionable item without first checking with County Cargo. An undeclared restricted item may delay or prevent the entire shipment from travelling.
            </p>

            {/* Process */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6">How Does the UK-to-Nigeria Shipping Process Work?</h2>
            
            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Step 1: Request a quotation</h3>
            <p>
              Tell County Cargo what you are sending, the estimated weight or dimensions, the destination and when the shipment is needed. The team can recommend standard air, express air or sea cargo.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Step 2: Deliver the cargo or arrange collection</h3>
            <p>
              You can bring your package to the County Cargo office in Liverpool or ask whether collection is available for your location.
            </p>
            <p className="bg-slate-50 p-4 border rounded-lg text-sm text-slate-700 flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Liverpool Office:</strong> County Cargo, Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG.
              </span>
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Step 3: Weighing and invoicing</h3>
            <p>
              The package is checked and weighed before the applicable shipping and handling charges are confirmed. Payment must be completed before the goods are shipped.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Step 4: Dispatch to Nigeria</h3>
            <p>
              Your cargo is assigned to the appropriate shipment and moved to Nigeria. Delivery estimates begin according to the applicable shipment schedule and service conditions.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Step 5: Customs clearance and arrival</h3>
            <p>
              All international shipments may be inspected by customs. Clearance time can vary depending on the goods, documentation and government procedures.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-3">Step 6: Collection or local delivery</h3>
            <p>
              Once cleared, the recipient is contacted regarding collection or the available delivery arrangement. Lagos rider delivery may be available. For destinations outside Lagos, goods may be sent to an agreed collection point, transport park or local delivery provider, with any additional charge confirmed separately.
            </p>

            {/* Avoid Delays */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6">How to Avoid Shipping Delays</h2>
            <p>
              You can reduce common delays by:
            </p>
            <ul>
              <li>Sending before the weekly cut-off time</li>
              <li>Providing the recipient’s correct Nigerian telephone number</li>
              <li>Using strong and secure packaging</li>
              <li>Declaring all contents accurately</li>
              <li>Removing restricted or prohibited goods</li>
              <li>Supplying invoices and requested documents promptly</li>
              <li>Paying the shipping invoice before the dispatch deadline</li>
              <li>Allowing extra time when the shipment is needed for a fixed event</li>
            </ul>
            <p>
              Delivery times are estimates rather than guarantees. Flights, weather, customs inspections, public holidays and local transport conditions can affect the final arrival date.
            </p>

            {/* Why County Cargo */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mt-12 mb-6">Why Choose County Cargo for UK-to-Nigeria Shipping?</h2>
            <p>
              County Cargo supports individuals, families, personal shoppers and businesses sending goods from the UK to Nigeria. Customers can choose between standard air cargo, express shipping and sea cargo according to their timeframe and budget.
            </p>
            <p>
              From our <strong>cargo company UK to Nigeria</strong> network based out of our Liverpool depot, we help customers prepare their shipments, understand the available service and arrange onward movement to Lagos, Abuja and other Nigerian destinations.
            </p>

            {/* Quote CTA */}
            <div className="my-12 p-8 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl shadow-lg not-prose text-center" data-aos="fade-up">
              <h3 className="text-2xl font-bold mb-3 text-white">Get a UK-to-Nigeria Shipping Quote</h3>
              <p className="opacity-95 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
                Ready to send a package to Nigeria? Tell us what you are sending, the weight/dimensions, and the destination. We will recommend the most suitable shipping option.
              </p>
              <Button asChild className="bg-primary text-white hover:bg-primary/95 border-none font-semibold px-8 py-3 text-base">
                <Link href="/contact">Get Your Quote Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>

          </div>
        </article>

        {/* FAQs */}
        <section id="faq" className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-secondary mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="w-8 h-8 text-primary" /> Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Quick answers to common questions about shipping from the UK to Nigeria.</p>
            </div>
            
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-secondary flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs shrink-0 font-extrabold mt-0.5">Q</span>
                    {item.question}
                  </h3>
                  <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed pl-8">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
