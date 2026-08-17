import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Ship, FileText, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Nigeria Cargo Update: What UK and US Shippers Need to Know in August 2026 | County Cargo',
  description: 'Aviation disruption in Lagos and Abuja, a new United Cargo fee, rising sea freight prices and Nigeria Customs changes — County Cargo breaks down what UK and US shippers need to know in August 2026.',
};

export default function NigeriaCargoUpdateAugust2026Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section
          className="min-h-[55vh] flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(rgba(13, 27, 62, 0.70), rgba(15, 23, 42, 0.80)), url('/blog-9-nigeria-cargo-august-2026.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
              <AlertTriangle className="w-3.5 h-3.5" /> Shipping Update — August 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-bold hero-text-glow">Nigeria Cargo Update: What UK and US Shippers Need to Know in August 2026</h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow">
              Aviation disruption, a new US carrier fee, rising sea freight costs and Nigeria Customs changes — here is everything that may affect your shipment this month.
            </p>
            <p className="text-sm mt-5 text-gray-300">By County Cargo Staff &nbsp;·&nbsp; 17 August 2026</p>
          </div>
        </section>

        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose lg:prose-xl">

            <p className="lead">
              If you are sending cargo from the United Kingdom or United States to Nigeria, recent developments across the aviation and maritime industries may affect shipping costs, transit times and cargo clearance. At County Cargo, we monitor these changes so that customers can make informed decisions and prepare properly before shipping.
            </p>
            <p>
              Here is the latest update covering air cargo, sea freight, airport operations, Customs clearance and freight costs as of August 2026.
            </p>

            {/* Air Cargo */}
            <h2 className="flex items-center gap-3"><Plane className="w-7 h-7 text-primary shrink-0" /> Air-Cargo Operations in Lagos and Abuja</h2>
            <p>
              Aviation-union action temporarily disrupted flight operations at airports in Lagos and Abuja on 11 August 2026. Access to certain terminals was restricted, resulting in flight cancellations, delays and a temporary backlog.
            </p>
            <p>
              Flight operations subsequently resumed, although the dispute responsible for the disruption was not immediately resolved. There was no confirmed prolonged closure of international cargo terminals or NAHCO warehouses.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8 not-prose">
              <p className="flex items-start gap-3 text-amber-900 text-base font-medium">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                Airport disruption can sometimes affect cargo handling, collection, clearance and onward delivery from Lagos to Abuja or other Nigerian destinations. Customers with time-sensitive shipments should allow a small amount of additional time and avoid arranging important events around an estimated delivery date until the cargo has cleared.
              </p>
            </div>

            {/* US Air Cargo Costs */}
            <h2 className="flex items-center gap-3"><DollarSign className="w-7 h-7 text-primary shrink-0" /> Possible Increase in US Air-Cargo Costs</h2>
            <p>
              United Cargo introduced a revised Market Disruption Fee for air waybills issued from 15 August 2026. The fee is based on the shipment&apos;s chargeable weight and may affect cargo transported directly or indirectly through United Cargo&apos;s network. Other carriers and forwarding partners may also review their charges in response to fuel prices, supplier costs and wider market conditions.
            </p>
            <p>
              This does not automatically mean that every County Cargo shipment from the United States will increase in price. The effect depends on the carrier, routing and service used for a particular shipment. Customers shipping from the USA to Nigeria should obtain a current quotation before sending large or unusually heavy consignments.
            </p>

            {/* Sea Freight */}
            <h2 className="flex items-center gap-3"><Ship className="w-7 h-7 text-primary shrink-0" /> Sea-Freight Prices and Port Congestion</h2>
            <p>
              Global container freight prices increased slightly during the week ending 13 August 2026. Drewry&apos;s World Container Index rose by 1% to approximately $4,339 for a 40-foot container. Shipping companies have also reported continuing congestion, vessel-schedule changes, restricted capacity and cancelled sailings across parts of the international shipping network.
            </p>
            <p>
              Maersk identified infrastructure bottlenecks in several regions, including West Africa, as one of the factors contributing to higher costs and reduced schedule reliability.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
              {[
                { icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />, text: 'Sailing and arrival dates should be treated as estimates.' },
                { icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />, text: 'Cargo may occasionally be moved to a later sailing if space is unavailable.' },
                { icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />, text: 'Port congestion can affect unloading and clearance times.' },
                { icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />, text: 'Freight quotations may change when carrier surcharges or fuel costs are adjusted.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-5">
                  {item.icon}
                  <p className="text-gray-800 text-base">{item.text}</p>
                </div>
              ))}
            </div>

            <p>
              Sea cargo remains a practical and economical option for boxes, household goods, personal effects, equipment and non-urgent consignments. It is most suitable when the customer can allow sufficient time for the full journey — and when you ship early.
            </p>

            {/* Nigeria Customs */}
            <h2 className="flex items-center gap-3"><FileText className="w-7 h-7 text-primary shrink-0" /> Nigeria Customs and Cargo Clearance</h2>
            <p>
              No new nationwide Nigeria Customs shutdown or major cargo-clearance suspension was confirmed during the review period. Nigeria Customs continues to implement the 2026 Fiscal Policy Measures and Tariff Amendments, which include revisions to:
            </p>
            <ul>
              <li>Import duties and adjustment taxes</li>
              <li>Import and export prohibition lists</li>
              <li>Excise-liable goods</li>
              <li>Customs classifications</li>
              <li>Vehicle-related environmental surcharges</li>
              <li>The ECOWAS Common External Tariff framework</li>
            </ul>
            <p>
              Goods that were previously accepted or assessed under a particular classification may now require additional checks. Commercial goods, vehicles, food products, cosmetics, medicines, electrical equipment and other regulated items should be confirmed before shipping.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-8 not-prose">
              <p className="text-red-900 text-base font-medium">
                An incorrect description, undeclared restricted item or incomplete document can result in inspection, additional charges, seizure or delayed clearance. Contact County Cargo before packing if you have any doubt about an item.
              </p>
            </div>

            {/* Exchange Rates */}
            <h2>Exchange Rates and Nigerian Clearance Costs</h2>
            <p>
              The Central Bank of Nigeria recorded an official exchange rate of approximately <strong>₦1,357.61 to the US dollar</strong> on 14 August 2026. The rate remained relatively stable during the week, but Nigerian Customs duties and other locally assessed charges can still change according to the applicable exchange rate on the date of assessment.
            </p>
            <p>
              Customers importing commercial or high-value goods should avoid relying on an old Customs estimate. The final amount may depend on the declared value, applicable HS code, exchange rate, duty percentage and any regulatory charges.
            </p>

            {/* How to reduce delays */}
            <h2>How Customers Can Reduce the Risk of Delays</h2>
            <p>Customers shipping from the UK or USA to Nigeria can help prevent avoidable delays by following these steps:</p>

            <div className="space-y-4 my-8 not-prose">
              {[
                {
                  num: '1',
                  title: 'Describe every item accurately',
                  body: 'Provide a clear packing list and avoid using vague descriptions such as "general goods" or "personal items" where more detailed information is required.',
                },
                {
                  num: '2',
                  title: 'Check restricted items before shipping',
                  body: 'Perfumes, aerosols, loose lithium batteries, power banks, flammable substances, chemicals, cash, fresh food and certain regulated products may be restricted or prohibited. Contact County Cargo before packing if you are uncertain about an item.',
                },
                {
                  num: '3',
                  title: 'Use appropriate packaging',
                  body: 'Strong boxes, proper sealing and suitable protection for fragile items reduce the risk of damage during handling, inspection and transportation.',
                },
                {
                  num: '4',
                  title: 'Ship early',
                  body: 'Do not wait until the final week when sending items for weddings, birthdays, funerals, business deadlines or other important occasions. Air and sea transit times are estimates and may be affected by airline schedules, Customs inspections, congestion and circumstances outside the shipping company\'s control.',
                },
                {
                  num: '5',
                  title: 'Provide the correct customer information',
                  body: 'Ensure that the sender\'s name, recipient\'s name, telephone number and final Nigerian destination are correct and clearly attached to the shipment.',
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-5 bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0">{step.num}</div>
                  <div>
                    <h3 className="font-semibold text-secondary text-base mb-1">{step.title}</h3>
                    <p className="text-gray-700 text-base">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="my-12 p-8 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl shadow-lg not-prose" data-aos="fade-up">
              <h3 className="text-2xl font-bold mb-3">Shipping from the UK or USA to Nigeria with County Cargo</h3>
              <p className="opacity-90 mb-2">County Cargo provides reliable cargo services connecting families, individuals and businesses in the United Kingdom, United States and Nigeria. Our services include:</p>
              <ul className="space-y-1.5 mt-4 mb-6">
                {[
                  'Air cargo from the UK to Nigeria',
                  'Air cargo from the USA to Nigeria',
                  'Sea cargo from the UK to Nigeria',
                  'Express cargo services',
                  'Cargo services to Lagos and Abuja',
                  'Support with shipping requirements and documentation',
                ].map((service) => (
                  <li key={service} className="flex items-center gap-2 text-sm opacity-90">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> {service}
                  </li>
                ))}
              </ul>
              <p className="opacity-90 text-sm mb-6">Our team monitors shipments throughout their journey and communicates important updates when confirmed information becomes available. For current prices, shipment requirements or assistance choosing between air and sea cargo, contact County Cargo before sending your items.</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-primary text-white hover:bg-primary/95 border-none font-semibold px-6 py-2.5">
                  <Link href="/contact">Get a Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-2.5">
                  <Link href="/shipping-from-uk-to-nigeria">UK to Nigeria Shipping</Link>
                </Button>
              </div>
            </div>

            {/* Sources */}
            <h2>Sources</h2>
            <ul className="text-sm text-gray-600">
              <li>United Cargo Market Disruption Fee announcement</li>
              <li>Drewry World Container Index — week ending 13 August 2026</li>
              <li>Maersk freight and congestion update, reported by Reuters</li>
              <li>Central Bank of Nigeria official exchange rate — 14 August 2026</li>
              <li>Nigeria Customs Service — 2026 Fiscal Policy Measures and Tariff Amendments</li>
            </ul>

          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
