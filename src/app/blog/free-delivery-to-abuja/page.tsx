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
  Truck,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  Gift,
  Scale,
} from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Free Delivery to Abuja | UK-to-Abuja & US to Abuja',
  description: 'Ship cargo from the UK to Abuja with County Cargo and receive free Abuja delivery on eligible shipments weighing at least 10 kg. Request a quote today.',
  keywords: 'Free delivery to Abuja, UK-to-Abuja cargo, shipping from the UK to Abuja, air cargo to Abuja, cargo delivery in Abuja, send goods from London to Abuja',
  alternates: {
    canonical: 'https://countycargo.com/blog/free-delivery-to-abuja',
  },
  openGraph: {
    title: 'Free Delivery to Abuja | UK-to-Abuja & US to Abuja',
    description: 'Ship cargo from the UK to Abuja with County Cargo and receive free Abuja delivery on eligible shipments weighing at least 10 kg. Request a quote today.',
    images: [{ url: 'https://countycargo.com/abuja-free-delivery.jpg', alt: 'Free doorstep cargo delivery van arriving in Abuja' }],
  },
};

export default function FreeDeliveryToAbujaPost() {
  const articleUrl = 'https://countycargo.com/blog/free-delivery-to-abuja';
  
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Free Delivery to Abuja | UK-to-Abuja & US to Abuja',
    description: 'Ship cargo from the UK to Abuja with County Cargo and receive free Abuja delivery on eligible shipments weighing at least 10 kg. Request a quote today.',
    image: 'https://countycargo.com/abuja-free-delivery.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Abuja Dispatch Team',
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

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'Free Delivery to Abuja' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/abuja-free-delivery.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
              <Gift className="w-3.5 h-3.5" /> Special Promotional Offer
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Free Delivery to Abuja | UK-to-Abuja &amp; US to Abuja
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Ship qualifying cargo weighing 10 kg or more from the UK to Abuja and enjoy free doorstep delivery upon arrival in the FCT.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo Abuja Dispatch Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Logistics Compliance Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-yellow-400" /> 30 August 2026</span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            
            {/* Highlights Box */}
            <div className="p-6 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-emerald-600" /> Free Abuja Delivery Offer Summary
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                County Cargo now offers <strong>free local delivery in Abuja</strong> for qualifying UK-to-Abuja cargo weighing <strong>10 kg or more</strong>. Normal international shipping, handling, and customs charges still apply.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Free Delivery to Abuja</h2>
            <p className="text-gray-700">
              Shipping cargo from the UK to Abuja has just become more convenient. County Cargo now offers free delivery to Abuja for qualifying shipments weighing 10 kg or more.
            </p>
            <p className="text-gray-700">
              Whether you are sending personal belongings, clothing, household items, business goods or gifts to family members, you can arrange your <Link href="/shipping-from-uk-to-abuja" className="text-primary font-semibold hover:underline">UK-to-Abuja cargo</Link> with County Cargo and avoid an additional delivery charge when your shipment arrives.
            </p>
            <p className="text-gray-700">
              The free-delivery offer applies to the final local delivery of eligible cargo in Abuja. Normal international shipping, handling and any applicable customs charges still apply.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Reliable Cargo Shipping from the UK to Abuja</h2>
            <p className="text-gray-700">
              County Cargo provides a straightforward cargo service for customers sending goods from London and other parts of the United Kingdom to Abuja.
            </p>
            <p className="text-gray-700">
              We understand that receiving cargo can sometimes involve additional travel, collection arrangements and local delivery costs. Our free Abuja delivery offer is designed to make the final part of the shipping process simpler for qualifying customers.
            </p>
            
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-secondary text-base mb-3">County Cargo can assist customers sending:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 list-disc list-inside">
                <li>Personal belongings</li>
                <li>Clothing and shoes</li>
                <li>Household goods</li>
                <li>Gifts for family and friends</li>
                <li>Business and commercial goods</li>
                <li>Approved food products</li>
                <li>Documents and small parcels</li>
                <li>Excess luggage</li>
                <li>Declared electronic items</li>
              </ul>
            </div>
            <p className="text-xs text-gray-500 italic">
              All goods remain subject to County Cargo’s acceptance policy, customs requirements and <Link href="/blog/prohibited-items-shipping-to-nigeria" className="text-primary underline">prohibited-items rules</Link>.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">How the UK-to-Abuja Cargo Service Works</h2>
            <p className="text-gray-700">
              Shipping your goods to Abuja involves a simple process:
            </p>
            <ol className="space-y-3 pl-2">
              {[
                'Contact County Cargo for the current shipping price and schedule.',
                'Confirm that the items you intend to send are accepted.',
                'Package and label your cargo correctly.',
                'Deliver the cargo to the approved County Cargo location or arrange collection where available.',
                'Provide a complete and accurate description of the contents.',
                'Pay the applicable freight and handling charges.',
                'County Cargo processes and ships the cargo to Nigeria.',
                'After clearance and arrival in Abuja, an eligible shipment is arranged for free local delivery.',
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-gray-700">
              Customers should provide the recipient’s correct name, telephone number and complete Abuja delivery address before dispatch.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Who Can Benefit from Free Delivery to Abuja?</h2>
            <p className="text-gray-700">
              This offer can help families, students, business owners, online sellers and anyone regularly sending cargo from the UK to Abuja.
            </p>
            <p className="text-gray-700">
              It is particularly useful when sending several items together. Instead of shipping multiple small packages separately, customers can consolidate their goods into one shipment of at least 10 kg and qualify for free Abuja delivery. Consolidation may also make packaging, documentation and shipment tracking easier.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Standard and Express Cargo Options</h2>
            <p className="text-gray-700">
              County Cargo provides <Link href="/blog/uk-to-nigeria-shipping-time" className="text-primary font-semibold hover:underline">standard and express cargo options</Link> depending on the type of goods, destination and current shipment schedule.
            </p>
            <p className="text-gray-700">
              Standard cargo is suitable for customers who want a cost-effective service and do not require urgent delivery. Express cargo may be more appropriate for urgent, approved shipments.
            </p>
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-secondary text-base mb-2">Contact County Cargo before sending your goods to confirm:</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>The current price per kilogram</li>
                <li>Applicable handling charges</li>
                <li>The next available shipment date</li>
                <li>Estimated delivery time</li>
                <li>Whether standard or express service is suitable</li>
                <li>Whether your Abuja address is within the approved delivery area</li>
              </ul>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">How Is Cargo Weight Calculated?</h2>
            <p className="text-gray-700">
              Cargo may be charged according to its actual weight or volumetric weight, depending on the size and density of the package.
            </p>
            <p className="text-gray-700">
              A lightweight but very large box can occupy considerable aircraft space and may therefore have a higher chargeable weight. County Cargo can help explain the applicable weight calculation before shipment using the <Link href="/blog/how-to-calculate-volumetric-weight" className="text-primary font-semibold hover:underline">volumetric weight formula</Link>.
            </p>
            <p className="text-gray-700">
              The package must meet the offer’s minimum qualifying weight of 10 kg. Several eligible items belonging to the same customer may be consolidated where permitted.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Packaging Your Cargo Properly</h2>
            <p className="text-gray-700">
              Correct packaging helps protect your goods during handling, transportation and customs inspection. Customers should follow our <Link href="/blog/how-to-package-cargo-for-nigeria" className="text-primary font-semibold hover:underline">packaging guide</Link>:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside">
              <li>Use strong boxes suitable for international shipping.</li>
              <li>Seal every box securely.</li>
              <li>Protect fragile items with suitable cushioning.</li>
              <li>Avoid overloading damaged or weak cartons.</li>
              <li>Label packages with the sender’s and recipient’s information.</li>
              <li>Declare electronic devices and other sensitive items.</li>
              <li>Provide an honest and complete description of the contents.</li>
              <li>Confirm restricted items with County Cargo before sending them.</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Restricted and Prohibited Items</h2>
            <p className="text-gray-700">
              Not every item can be shipped by air. Restrictions may apply to batteries, liquids, aerosols, perfumes, medicines, chemicals, perishable products and other regulated goods.
            </p>
            <p className="text-gray-700">
              Customers should never conceal or incorrectly describe an item. Undeclared or prohibited goods can cause delays, additional charges, confiscation or cancellation of the shipment.
            </p>

            {/* CTAs */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Request a UK-to-Abuja Cargo Quote</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Ready to send goods from the UK to Abuja? Contact County Cargo today to confirm current pricing, schedule, and free delivery eligibility.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-uk-to-nigeria">Request Freight Quote</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/447438827464" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Inquiry
                  </a>
                </Button>
              </div>
            </div>

            {/* Important Terms Box */}
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900">
              <h4 className="font-bold text-amber-950 text-base mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Important Offer Conditions
              </h4>
              <p className="leading-relaxed">
                A minimum shipment weight of <strong>10 kg</strong> is required to qualify for free delivery to Abuja. Shipments weighing less than 10 kg do not qualify, and normal collection or delivery arrangements will apply. Free delivery applies only to the eligible local Abuja delivery service. It does not include international freight, handling, customs duties or other applicable shipping charges. Delivery coverage must be confirmed with County Cargo before the shipment is accepted.
              </p>
            </div>

            <SocialShare title="Free Delivery to Abuja | UK-to-Abuja & US to Abuja" />

            <RelatedGuides currentHref="/blog/free-delivery-to-abuja" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
