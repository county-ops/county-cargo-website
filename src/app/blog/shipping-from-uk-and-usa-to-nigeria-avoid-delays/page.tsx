import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  PackageCheck,
  Scale,
  MapPin,
  CalendarClock,
  ClipboardList,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping from the UK and USA to Nigeria: 7 Ways to Avoid Delays and Unexpected Costs | County Cargo',
  description:
    'Before your next shipment from the UK or USA to Nigeria, use these seven practical checks to keep your cargo moving smoothly and your budget under control.',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-from-uk-and-usa-to-nigeria-avoid-delays',
  },
};

const tips = [
  {
    num: '1',
    icon: <Scale className="w-6 h-6 text-primary shrink-0" />,
    title: 'Get a shipping estimate before you buy',
    body: (
      <>
        <p>
          A good purchase price does not always mean a low shipping cost. Before ordering, ask the
          seller for the packed weight and box dimensions, then request an estimate for your
          destination in Nigeria.
        </p>
        <p className="mt-3">
          Tell the shipping team what the item is, how many you are buying and whether it is for
          personal use or resale. Ask what the estimate includes and what could be charged
          separately.{' '}
          <Link href="/faq" className="text-primary underline underline-offset-2 hover:opacity-80">
            See our shipping FAQs.
          </Link>
        </p>
      </>
    ),
  },
  {
    num: '2',
    icon: <Scale className="w-6 h-6 text-primary shrink-0" />,
    title: 'Understand product weight and shipping weight',
    body: (
      <>
        <p>
          The weight shown on a retailer&apos;s website may describe the product alone. The complete
          parcel also includes its box and protective packaging.
        </p>
        <p className="mt-3">
          Bulky items can also attract volumetric weight charges. This measures the space a parcel
          occupies rather than just what it weighs on a scale. Depending on the service, the higher
          of actual and volumetric weight may determine the charge.
        </p>
        <p className="mt-3">
          Ask County Cargo which calculation applies to your shipment. Do not assume a lightweight
          product will always be inexpensive to send.
        </p>
      </>
    ),
  },
  {
    num: '3',
    icon: <MapPin className="w-6 h-6 text-primary shrink-0" />,
    title: 'Use the correct warehouse address and customer details',
    body: (
      <>
        <p>
          Before checkout, copy the shipping address supplied through your County Cargo account or
          by the team. Include your name and any customer reference exactly as instructed.
        </p>
        <p className="mt-3">
          Keep the retailer&apos;s order confirmation and tracking number. If several sellers are
          sending separate parcels, maintain a list so you can check that every package has been
          accounted for.
        </p>
        <p className="mt-3">
          A retailer marking a parcel as delivered does not, by itself, confirm that it has been
          processed and booked for international departure.
        </p>
      </>
    ),
  },
  {
    num: '4',
    icon: <CalendarClock className="w-6 h-6 text-primary shrink-0" />,
    title: 'Confirm the next shipment cut-off',
    body: (
      <>
        <p>
          Ask when your parcel must arrive, what processing is required and when payment must be
          completed for the intended shipment. Allow time between retailer delivery and international
          departure.
        </p>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-5 not-prose">
          <p className="flex items-start gap-3 text-amber-900 text-sm font-medium">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            For customers ordering this weekend, Monday 31 August 2026 is a bank holiday in England
            and Wales. Check your seller&apos;s and courier&apos;s arrangements before relying on a
            Monday delivery or collection. This is a planning reminder, not confirmation of a County
            Cargo closure or delay.{' '}
            <a
              href="https://www.gov.uk/bank-holidays"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 ml-1"
            >
              Check the official bank holiday calendar.
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    num: '5',
    icon: <ClipboardList className="w-6 h-6 text-primary shrink-0" />,
    title: 'Describe every item accurately',
    body: (
      <>
        <p>
          Avoid vague descriptions such as &quot;personal items&quot; when your parcel contains
          several different products. Prepare a clear list of the contents, quantities and purchase
          values, and keep the receipts available.
        </p>
        <p className="mt-3">
          If you are sending electronics, liquids, batteries or anything you are unsure about,
          contact the team before purchasing or dispatching it. Confirm whether the item can travel
          on your chosen service and whether supporting documents or special packaging are needed.
        </p>
      </>
    ),
  },
  {
    num: '6',
    icon: <ShieldCheck className="w-6 h-6 text-primary shrink-0" />,
    title: 'Protect fragile items properly',
    body: (
      <>
        <p>
          Retail packaging may not provide enough protection for an international journey. Ask the
          seller to secure fragile goods so they cannot move around inside the box.
        </p>
        <p className="mt-3">
          For cookware, glassware and similar items, pay particular attention to lids, handles and
          separate components. Request suitable cushioning and a strong outer carton. If the original
          packaging must be retained for resale, explain this before any repacking is arranged.
        </p>
        <p className="mt-3">
          Photographs taken before dispatch can help document the item&apos;s condition and
          packaging, although they cannot guarantee against damage.
        </p>
      </>
    ),
  },
  {
    num: '7',
    icon: <Truck className="w-6 h-6 text-primary shrink-0" />,
    title: 'Plan the final handover in Nigeria',
    body: (
      <>
        <p>
          Confirm the destination city, recipient&apos;s telephone number and agreed collection or
          delivery arrangement before the shipment departs. Ask whether onward transport is included
          in the quote.
        </p>
        <p className="mt-3">
          When collecting, check the number of packages and inspect their condition. Report any
          concern promptly, keeping the packaging, photographs and shipment reference available.{' '}
          <Link
            href="/info"
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            Read County Cargo&apos;s shipment guidance.
          </Link>
        </p>
      </>
    ),
  },
];

export default function ShippingUKUSANigeriaAvoidDelaysPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section
          className="min-h-[55vh] flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(rgba(13, 27, 62, 0.72), rgba(15, 23, 42, 0.82)), url('/blog-9-nigeria-cargo-august-2026.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-blue-200 border border-primary/30 mb-4">
              <PackageCheck className="w-3.5 h-3.5" /> Shipping Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold hero-text-glow">
              Shipping from the UK and USA to Nigeria: 7 Ways to Avoid Delays and Unexpected Costs
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow">
              A few practical checks before ordering can keep your shipment on track and your budget
              under control.
            </p>
            <p className="text-sm mt-5 text-gray-300">
              By County Cargo Staff &nbsp;·&nbsp; 28 August 2026
            </p>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose lg:prose-xl">
            <p className="lead">
              Buying goods from the UK or USA is only one part of getting them to Nigeria. Whether
              you are ordering for yourself, sending gifts or restocking your business, planning the
              shipping properly is just as important as choosing the right products.
            </p>
            <p>
              Before placing your next order, use these seven practical checks to help your shipment
              move smoothly and keep your budget under control.
            </p>

            {/* Tips */}
            <div className="space-y-10 my-10 not-prose">
              {tips.map((tip) => (
                <div
                  key={tip.num}
                  className="flex gap-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8"
                >
                  <div className="w-11 h-11 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0 mt-0.5">
                    {tip.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      {tip.icon}
                      <h2 className="font-bold text-secondary text-xl leading-snug">{tip.title}</h2>
                    </div>
                    <div className="text-gray-700 text-base leading-relaxed">{tip.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className="my-12 p-8 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl shadow-lg not-prose"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold mb-3">Ready to plan your next shipment?</h3>
              <p className="opacity-90 mb-4">
                A few checks before ordering can save time and make shipping costs easier to
                understand. Start with the item details, packed weight, dimensions and destination,
                then confirm the service that suits your needs.
              </p>
              <p className="opacity-90 mb-2 text-sm">
                County Cargo provides reliable cargo services from the UK and USA to Nigeria,
                including:
              </p>
              <ul className="space-y-1.5 mt-3 mb-6">
                {[
                  'Air cargo from the UK to Nigeria',
                  'Air cargo from the USA to Nigeria',
                  'Sea cargo from the UK to Nigeria',
                  'Express cargo services',
                  'Cargo to Lagos, Abuja and across Nigeria',
                  'Support with documentation and shipping requirements',
                ].map((service) => (
                  <li key={service} className="flex items-center gap-2 text-sm opacity-90">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> {service}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-primary text-white hover:bg-primary/95 border-none font-semibold px-6 py-2.5"
                >
                  <Link href="/contact">
                    Get a Shipping Quote <ArrowRight className="ml-2 w-4 h-4" />
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
                  <Link href="/ship-from-us-to-nigeria">USA to Nigeria Shipping</Link>
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
