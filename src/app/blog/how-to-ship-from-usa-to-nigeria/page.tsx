import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import {
  Plane,
  Ship,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  FileText,
  AlertTriangle,
  Phone,
  Package,
  Boxes,
  HelpCircle,
  Truck,
  Check,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'How to Ship from the USA to Nigeria in 2026: Costs, Timelines & Guide | County Cargo',
  description:
    'A plain guide to shipping from the USA to Nigeria — air vs sea, real costs, customs duty, what you cannot send, and how to avoid the delays that catch people out.',
  keywords:
    'how to ship from USA to Nigeria, shipping from USA to Nigeria cost, air cargo USA to Nigeria, sea freight barrels to Nigeria, Nigeria customs duty clearance, Texas to Nigeria cargo guide',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-to-ship-from-usa-to-nigeria',
  },
  openGraph: {
    title: 'How to Ship from the USA to Nigeria in 2026: Costs, Timelines & Guide',
    description:
      'A plain guide to shipping from the USA to Nigeria — air vs sea, real costs, customs duty, what you cannot send, and how to avoid the delays that catch people out.',
    url: 'https://countycargo.com/blog/how-to-ship-from-usa-to-nigeria',
    siteName: 'County Cargo',
    type: 'article',
    publishedTime: '2026-01-15T08:00:00.000Z',
    modifiedTime: '2026-09-12T05:00:00.000Z',
    authors: ['County Cargo Logistics Team'],
    images: [
      {
        url: 'https://countycargo.com/images/blog/how-to-ship-from-usa-to-nigeria-guide.jpg',
        width: 1200,
        height: 675,
        alt: 'USA to Nigeria air cargo warehouse loading freight cartons for Lagos',
      },
    ],
  },
};

const blogFaqs = [
  {
    question: 'How much does it really cost to ship from the USA to Nigeria in 2026?',
    answer:
      'Air freight currently costs $5.00 per lb for delivery to Lagos, and $5.50 per lb for delivery to Abuja, Port Harcourt, and other Nigerian states (minimum 1 lb). This includes customs clearance and airport documentation. For large personal effects or heavy items, sea freight barrels (55-gallon drums) start from $220 to $250, while palletised commercial freight starts from $450 depending on total volume in cubic metres.',
  },
  {
    question: 'How long does shipping take from the USA to Nigeria?',
    answer:
      'Air cargo typically delivers within 5–10 working days from flight departure. Sea freight takes 6 to 8 weeks door-to-door, including ocean transit across the Atlantic, port discharge in Lagos (Apapa or Tin Can Island), customs inspection, and onward domestic delivery.',
  },
  {
    question: 'Can I send food items and toiletries from the US to Nigeria?',
    answer:
      'Yes, non-perishable canned foods, dried snacks, packaged pantry staples, perfumes, personal toiletries, and household products can be shipped. However, perishable meats, fresh agricultural produce, and uncertified medicines are strictly prohibited under Nigeria Customs regulations.',
  },
  {
    question: 'How is customs duty calculated on shipments entering Nigeria?',
    answer:
      'Nigeria Customs calculates import duty based on the CIF value (Cost of goods + Insurance + Freight), not merely the retail receipt price. Personal effects consolidated by reputable forwarders like County Cargo generally benefit from consolidated clearance, avoiding individual commercial assessments unless carrying undeclared high-value commercial stock.',
  },
];

export default function HowToShipFromUsaToNigeriaPost() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: blogFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Ship from the USA to Nigeria in 2026: Costs, Timelines and What Nobody Tells You',
    description:
      'A plain guide to shipping from the USA to Nigeria — air vs sea, real costs, customs duty, what you cannot send, and how to avoid the delays that catch people out.',
    image: 'https://countycargo.com/images/blog/how-to-ship-from-usa-to-nigeria-guide.jpg',
    datePublished: '2026-01-15T08:00:00.000Z',
    dateModified: '2026-09-12T05:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Logistics Team',
      url: 'https://countycargo.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'County Cargo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://countycargo.com/county-cargo-logo-transparent.png',
      },
    },
    mainEntityOfPage: 'https://countycargo.com/blog/how-to-ship-from-usa-to-nigeria',
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />

      <Header />

      <main className="min-h-screen bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'How to Ship from USA to Nigeria' },
          ]}
        />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Header */}
          <header className="mb-10 pb-8 border-b border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Comprehensive Shipping Guide &bull; Updated for 2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              How to Ship from the USA to Nigeria in 2026: Costs, Timelines and What Nobody Tells You
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              A plain guide to shipping from the USA to Nigeria — air vs sea, real costs, customs
              duty, what you cannot send, and how to avoid the delays that catch people out.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
              <span>By County Cargo Logistics Team</span>
              <span>&bull;</span>
              <span>10 min read</span>
              <span>&bull;</span>
              <span>Verified with Nigeria Customs Service Guidelines</span>
            </div>
          </header>

          {/* Featured Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image
              src="/images/blog/how-to-ship-from-usa-to-nigeria-guide.jpg"
              alt="USA to Nigeria air cargo warehouse loading freight cartons for Lagos"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Body Content */}
          <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed space-y-8 text-base sm:text-lg">
            <p>
              Most people sending cargo to Nigeria for the first time make the same three mistakes.
              They choose air freight when sea freight would have done the job at a third of the price.
              They underdeclare the value or fail to produce an itemised packing list, losing two weeks
              at customs. And they pick the cheapest headline quote online without asking what happens
              after the container lands at the port.
            </p>
            <p>
              Here is how shipping from the United States to Nigeria actually works in practice, based on
              moving thousands of consignments through our Irving, Texas consolidation warehouse.
            </p>

            {/* Section 1 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plane className="h-6 w-6 text-primary" /> Air Freight vs Sea Freight: The Honest Comparison
              </h2>
              <p>
                The fundamental rule of international freight forwarding is simple: <strong>air freight is priced by weight</strong>, whereas <strong>sea freight is priced by volume</strong>.
                That single distinction determines almost every shipping decision you will make.
              </p>
              <p>
                A standard carton of clothing, shoes, beddings, or kitchenware is light and bulky — it occupies substantial physical space while weighing relatively little. Shipping that box via air freight incurs heavy volumetric penalties. Ocean sea freight is built precisely for that kind of cargo. Conversely, a carton containing smartphone screens, laptop components, precision instruments, or emergency industrial valves is dense, high-value, and time-critical. Air cargo is the obvious and only sensible answer.
              </p>

              {/* Comparison Table */}
              <div className="my-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm not-prose">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-gray-900">Feature</th>
                      <th className="px-4 py-3 text-left font-bold text-blue-700">Air Freight</th>
                      <th className="px-4 py-3 text-left font-bold text-emerald-800">Sea Freight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Transit Duration</td>
                      <td className="px-4 py-3 text-gray-700">5–10 working days</td>
                      <td className="px-4 py-3 text-gray-700">6 to 8 weeks</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Pricing Basis</td>
                      <td className="px-4 py-3 text-gray-700">Actual weight or Volumetric weight ($5.00–$5.50/lb)</td>
                      <td className="px-4 py-3 text-gray-700">Cubic feet / CBM / Per Drum ($220–$250/barrel)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Airport / Seaport Entry</td>
                      <td className="px-4 py-3 text-gray-700">Murtala Muhammed (LOS) / Nnamdi Azikiwe (ABV)</td>
                      <td className="px-4 py-3 text-gray-700">Apapa Port / Tin Can Island Port</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Best For</td>
                      <td className="px-4 py-3 text-gray-700">Gadgets, urgent parts, medicines, documents</td>
                      <td className="px-4 py-3 text-gray-700">Barrels, furniture, generators, pallets, relocations</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Air cargo delivers door to door in <strong>5–10 working days</strong>. Sea freight takes approximately <strong>6 to 8 weeks</strong>. For a standard 100 lb box of personal belongings, air freight can easily cost three to four times as much as ocean cargo. Once you understand this dynamic, the choice between them usually makes itself.
              </p>
              <p>
                If you are planning a route to Lagos, check our dedicated{' '}
                <Link href="/shipping-from-usa-to-lagos" className="text-primary font-semibold hover:underline">
                  Shipping from USA to Lagos guide
                </Link>
                , or view our{' '}
                <Link href="/shipping-from-usa-to-abuja" className="text-primary font-semibold hover:underline">
                  Shipping from USA to Abuja breakdown
                </Link>{' '}
                to see direct flight vs overland routing options.
              </p>
            </div>

            {/* Section 2 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" /> What You Can and Cannot Send
              </h2>
              <p>
                The Nigeria Customs Service (NCS) maintains a strict import prohibition list that surprises many first-time shippers. Everyone knows you cannot ship firearms, ammunition, military apparel, narcotics, or counterfeit currency. However, people frequently get caught out by everyday retail items.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl not-prose my-6">
                <h4 className="font-bold text-amber-900 mb-2">Common Problematic &amp; Restricted Items:</h4>
                <ul className="space-y-1.5 text-sm text-amber-800 list-disc list-inside">
                  <li>Used clothing packed in commercial bulk bales without proper permits</li>
                  <li>Certain used motor vehicle tyres and substandard retreaded spares</li>
                  <li>Uncertified over-the-counter pharmaceuticals and prescription drugs</li>
                  <li>Loose lithium-ion batteries not packed inside host equipment</li>
                  <li>Flammable aerosols, compressed gas canisters, and industrial chemicals</li>
                  <li>Pornographic materials and politically sensitive literature</li>
                </ul>
              </div>
              <p>
                Here is why this matters: sending a single prohibited or undeclared item does not just risk seizure of that individual item. Customs officers can impound the entire container or groupage consignment, subjecting every other customer’s box to physical inspection and weeks of avoidable demurrage.
              </p>
              <p>
                Always review the current NCS import list before packing, or send your item inventory to the County Cargo team for pre-clearance advice.
              </p>
            </div>

            {/* Section 3 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" /> Customs Duty: How It Is Actually Calculated
              </h2>
              <p>
                A widespread misconception is that import duty is charged solely on the retail purchase price printed on your Amazon receipt or invoice. In reality, international customs authorities assess duty on the <strong>CIF value</strong>:
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center font-mono text-base font-semibold text-gray-800 my-4 not-prose">
                CIF Value = Cost of Goods + Marine Insurance + International Freight Charges
              </div>
              <p>
                Once the CIF figure is established, the appropriate Common External Tariff (CET) duty percentage is applied according to the Harmonised System (HS) code, plus 7.5% Value Added Tax (VAT) and applicable port development surcharges.
              </p>
              <p>
                <strong>Never underdeclare value.</strong> Nigerian customs officers inspect thousands of commercial and diaspora packages every single week. They know the market value of an iPhone 16, a Honda generator, or a solar inverter down to the dollar. If an officer flags an undervalued invoice, the cargo is reassessed at prevailing benchmark values, penalties are levied, and your package sits on the tarmac while paperwork is redone.
              </p>
              <p>
                When you ship through County Cargo’s door-to-door service, standard customs duties and terminal clearance are consolidated into our upfront rate, meaning you don’t have to negotiate with clearing agents at the terminal gate.
              </p>
            </div>

            {/* Section 4 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Boxes className="h-6 w-6 text-primary" /> Packing: The Part That Decides Whether It Arrives Intact
              </h2>
              <p>
                From our warehouse in Irving, Texas to your recipient’s doorstep in Ikeja, Abuja, or Port Harcourt, your consignment will be handled by warehouse staff, forklift operators, airline ramp crews, and delivery van drivers. It will sit beneath hundreds of pounds of other boxes inside a pressurized aircraft hold or a 40-foot ocean shipping container.
              </p>
              <p>Pack for that journey with these battle-tested standards:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" /> Double-Wall Corrugated Boxes
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Never use single-wall grocery cartons. High-grade double-wall corrugated cardboard
                    resists crushing when stacked five high.
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" /> Eliminate Empty Interior Space
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Air inside a box invites compression collapse. Fill voids tightly with bubble wrap,
                    packing paper, or soft clothing.
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" /> Heavy Items on the Bottom
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    When filling 55-gallon drums, pack canned foods and heavy items at the base, and soft
                    linens near the top. Never strain the lid.
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" /> Duplicate Itemised Inventory
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Tape one complete packing list inside the box lid, and place a second duplicate copy
                    in an exterior document pouch.
                  </p>
                </div>
              </div>
              <p>
                At County Cargo, we physically pack, re-wrap, and palletise shipments in our Irving,
                Texas facility. If a box arrives from Amazon with insufficient tape, our warehouse team
                reinforces it before it touches an aircraft pallet.
              </p>
            </div>

            {/* Section 5 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" /> The Delays Nobody Warns You About
              </h2>
              <p>
                In our years running freight between the US and Nigeria, ocean vessels and aircraft
                schedules account for less than 10% of real delays. The overwhelming cause of stalled
                cargo comes down to three human factors:
              </p>
              <ol className="list-decimal list-inside space-y-3 pl-2">
                <li>
                  <strong>Incomplete or missing documentation:</strong> Vague descriptions like &quot;household items&quot; or &quot;gift&quot; immediately trigger secondary inspection alerts at Nigerian customs. Specify &quot;men&apos;s cotton shirts, 5 pairs of leather shoes, electric blender&quot;.
                </li>
                <li>
                  <strong>An unreachable recipient:</strong> Delivery drivers in Lagos, Abuja, and Port Harcourt cannot deliver without verbal confirmation. If the phone number on the parcel rings unanswered, the driver cannot enter gated residential estates and the parcel returns to the depot. Always provide two active Nigerian phone numbers (including a WhatsApp line).
                </li>
                <li>
                  <strong>Descriptive rather than geographic addresses:</strong> In many Nigerian neighbourhoods, formal street numbering is erratic. Providing a well-known local landmark (e.g. &quot;Opposite Zenith Bank, Beside Total Filling Station&quot;) saves hours of navigation confusion.
                </li>
              </ol>
            </div>

            {/* Section 6 */}
            <div className="pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" /> What a Proper Quote Should Include
              </h2>
              <p>
                If a freight forwarder gives you an unusually low quote that fails to mention customs
                clearance, handling, and doorstep delivery, you are looking at a <em>port-to-port quote</em>.
                When your goods land in Nigeria, you will suddenly be asked to pay separate handling
                charges, customs fees, and terminal demurrage to release the container.
              </p>
              <p>
                Always ask directly: <em>&quot;Does this rate include Nigerian customs clearance and delivery to my recipient’s address?&quot;</em> Any professional forwarder will answer clearly and concisely.
              </p>
            </div>

            {/* Section 7 - Call to Action */}
            <div className="my-10 p-6 sm:p-8 bg-blue-50 border border-blue-200 rounded-2xl not-prose">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Ship with Total Confidence?</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                County Cargo ships from <strong>Irving, Texas</strong> and <strong>Liverpool &amp; London, UK</strong> to Lagos, Abuja, Port Harcourt, and all 36 Nigerian states. Packed by our team, cleared by our licensed customs agents, and delivered directly to the door.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-blue-700 text-white font-semibold">
                  <Link href="/shipping-from-usa-to-nigeria">
                    Get Free US to Nigeria Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-300 text-gray-800 hover:bg-white">
                  <a
                    href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20read%20your%20US%20shipping%20guide%20and%20need%20a%20quote"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* FAQ Accordion in Article */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" /> Key Questions Answered
              </h2>
              <Accordion type="single" collapsible className="space-y-4 not-prose">
                {blogFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`post-faq-${index}`}
                    className="border border-gray-200 rounded-xl px-5 py-2 shadow-sm bg-gray-50/50"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-sm leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Related Service Guides */}
            <div className="pt-8 border-t border-gray-200 not-prose">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Route Pages &amp; Guides:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <Link
                  href="/shipping-from-usa-to-lagos"
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary text-gray-800 font-medium block transition-colors"
                >
                  &rarr; Shipping from USA to Lagos
                </Link>
                <Link
                  href="/shipping-from-usa-to-abuja"
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary text-gray-800 font-medium block transition-colors"
                >
                  &rarr; Shipping from USA to Abuja
                </Link>
                <Link
                  href="/shipping-from-usa-to-port-harcourt"
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary text-gray-800 font-medium block transition-colors"
                >
                  &rarr; USA to Port Harcourt Cargo
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
