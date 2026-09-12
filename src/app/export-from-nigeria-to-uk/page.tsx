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
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  FileText,
  Package,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Export From Nigeria to the UK in 2026 | County Cargo',
  description: 'Learn how to export from Nigeria to the UK safely, including shipping options, documentation, customs requirements, packing and delivery with County Cargo.',
  keywords: 'Export from Nigeria to the UK, shipping from Nigeria to the UK, cargo from Nigeria to the UK, Nigeria to UK delivery, air freight Nigeria to UK, send parcel from Nigeria to UK',
  alternates: {
    canonical: 'https://countycargo.com/export-from-nigeria-to-uk',
  },
  openGraph: {
    title: 'Export From Nigeria to the UK in 2026 | County Cargo',
    description: 'Learn how to export from Nigeria to the UK safely, including shipping options, documentation, customs requirements, packing and delivery with County Cargo.',
    images: [{ url: 'https://countycargo.com/nigeria-export-documents-guide.jpg', alt: 'Export documentation and air freight packing in Nigeria' }],
  },
};

export default function ExportFromNigeriaToUkPage() {
  const articleUrl = 'https://countycargo.com/export-from-nigeria-to-uk';
  
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Export From Nigeria to the UK in 2026',
    description: 'Authoritative guide covering shipping options, documentation, NEPC requirements, UK customs clearance, packing rules, and delivery with County Cargo.',
    image: 'https://countycargo.com/nigeria-export-documents-guide.jpg',
    datePublished: '2026-09-06T08:00:00+01:00',
    dateModified: '2026-09-06T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo UK Trade Compliance Team',
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
            { label: 'Export From Nigeria', href: '/export-from-nigeria' },
            { label: 'Export From Nigeria to the UK in 2026' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/service-nigeria-uk-enhanced.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Plane className="w-3.5 h-3.5" /> 2026 UK Export Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Export From Nigeria to the UK in 2026
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Learn how to send personal belongings, food, fashion, and commercial cargo from Nigeria to the United Kingdom safely and legally.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo UK Trade Compliance Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Logistics Compliance Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-yellow-400" /> 6 September 2026</span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            
            {/* Overview Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Overview: Exporting from Nigeria to the UK
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Exporting goods from Nigeria to the UK does not have to be complicated. Whether you are sending personal belongings, gifts, approved food products, fashion items, business stock or product samples, proper preparation can help prevent delays, additional charges and customs problems.
              </p>
            </div>

            <p className="text-gray-700">
              County Cargo provides a practical shipping service for individuals and businesses looking to send cargo from Nigeria to the UK. This guide explains the process, documents and important checks you should complete before shipping.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">What Can You Export From Nigeria to the UK?</h2>
            <p className="text-gray-700">
              Many personal and commercial items can be shipped from Nigeria to the UK, subject to airline, customs and product-specific regulations.
            </p>

            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-secondary text-base mb-3">Common shipments may include:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 list-disc list-inside">
                <li>Clothing, shoes and fashion accessories</li>
                <li>Personal belongings and household items</li>
                <li>Books and educational materials</li>
                <li>Documents and product samples</li>
                <li>Approved packaged food products</li>
                <li>Fabrics, crafts and approved handmade products</li>
                <li>Beauty products that meet shipping requirements</li>
                <li>Business stock and commercial goods</li>
                <li>Electronics without prohibited or undeclared batteries</li>
              </ul>
            </div>

            <p className="text-gray-700">
              Acceptance depends on the item, packaging, quantity and shipping method. Always provide County Cargo with a complete description of everything you want to send before bringing the shipment to the warehouse.
            </p>
            <p className="text-gray-700">
              Some foods, medicines, liquids, batteries, chemicals, plants, animal products and other controlled goods may require additional approval or documentation. Certain products may not be accepted at all. See our <Link href="/blog/uk-customs-packaging-restricted-items-explained" className="text-primary font-semibold hover:underline">UK customs and restricted items guide</Link>.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">How to Ship From Nigeria to the UK</h2>

            <div className="space-y-6">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                  Confirm That Your Items Are Allowed
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  Send County Cargo an accurate list of the goods before booking. Do not describe a shipment simply as “foodstuff,” “personal items” or “general goods.” Provide the exact name, quantity and purpose of each item. For example:
                </p>
                <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2">
                  <li>Six sealed packets of dried seasoning</li>
                  <li>Ten cotton shirts for personal use</li>
                  <li>Twenty pairs of handmade sandals for resale</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Accurate descriptions help determine whether the items can be transported and whether additional documentation is required.
                </p>
              </div>

              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                  Choose the Appropriate Shipping Service
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  County Cargo offers standard and express options for eligible shipments from Nigeria to the UK.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  <strong>Standard shipping</strong> is suitable for customers sending larger or less urgent cargo. The standard service has a minimum shipment weight of 10kg.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mt-1">
                  <strong>Express shipping</strong> is suitable for smaller or urgent packages and has no minimum weight. Availability and delivery estimates depend on the contents, destination and current flight schedule.
                </p>
              </div>

              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                  Pack the Goods Securely
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Good packaging protects your shipment during handling, loading and transportation. Use a strong box that is appropriate for the weight of the contents. Wrap fragile items separately, seal liquids carefully and use sufficient protective material to prevent movement inside the box. Read our <Link href="/blog/how-to-package-cargo-for-nigeria" className="text-primary font-semibold hover:underline">packaging guide</Link>.
                </p>
              </div>

              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">4</span>
                  Provide the Sender and Receiver’s Details
                </h3>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  <li>Sender’s full name</li>
                  <li>Sender’s Nigerian phone number and address</li>
                  <li>Receiver’s full name</li>
                  <li>Receiver’s UK phone number</li>
                  <li>Complete UK delivery address and postcode</li>
                  <li>Accurate description of every item</li>
                  <li>Quantity, value and intended use of the goods</li>
                </ul>
              </div>

              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">5</span>
                  Prepare the Required Documents
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  Personal shipments may require identification, a packing list, proof of value or other supporting information. Commercial exporters may require additional documents, including:
                </p>
                <ul className="text-xs text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1 list-disc list-inside">
                  <li>NEPC exporter registration</li>
                  <li>Commercial invoice</li>
                  <li>Detailed packing list</li>
                  <li>Export contract or purchase order</li>
                  <li>Certificate of origin</li>
                  <li>Product or quality certification</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  A UK business importing goods into England, Scotland or Wales will usually need a GB EORI number. The importer may also need to submit a customs declaration and pay any applicable Customs Duty or import VAT.
                </p>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Will the Receiver Pay Customs Charges in the UK?</h2>
            <p className="text-gray-700">
              Customs Duty or import VAT may apply depending on the type of goods, declared value, country of origin and purpose of the shipment.
            </p>
            <p className="text-gray-700">
              Shipping charges paid to County Cargo should not automatically be treated as payment of every possible UK customs charge. Any applicable duty, tax, inspection or regulatory charge may be assessed separately by HMRC.
            </p>
            <p className="text-gray-700">
              Always declare the correct value of the goods. Deliberately undervaluing a shipment can result in delays, reassessment, penalties or seizure.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Personal Shipments and Commercial Exports</h2>
            <p className="text-gray-700">
              A personal parcel and a commercial export are not always treated in the same way. A personal shipment may contain belongings, gifts or items that are not intended for resale. A commercial shipment normally contains goods being supplied, distributed or sold in the UK.
            </p>
            <p className="text-gray-700">
              If you regularly export products from Nigeria, you should operate through the appropriate business and export registration process. Commercial exporters should also confirm that their goods meet applicable UK labelling, safety and product standards.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Common Mistakes That Delay Nigeria to UK Shipments</h2>
            <div className="p-5 bg-red-50 rounded-xl border border-red-200">
              <h3 className="font-bold text-red-950 text-base mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" /> Avoid these common problems:
              </h3>
              <ul className="text-sm text-red-900 space-y-1 list-disc list-inside">
                <li>Giving an incomplete description of the contents</li>
                <li>Sending restricted items without approval</li>
                <li>Using weak or damaged packaging</li>
                <li>Providing an incorrect UK postcode</li>
                <li>Failing to declare batteries, liquids or fragile items</li>
                <li>Understating the quantity or value of commercial goods</li>
                <li>Waiting until the shipment deadline before asking about documentation</li>
                <li>Assuming that every food or agricultural product is permitted</li>
                <li>Failing to provide a commercial invoice for goods intended for resale</li>
              </ul>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Why Ship From Nigeria to the UK With County Cargo?</h2>
            <p className="text-gray-700">
              County Cargo supports customers through the shipping process from initial enquiry to final delivery. Our service includes:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside">
              <li>Standard (10kg minimum) and express shipping options</li>
              <li>Clear guidance before accepting your shipment</li>
              <li>Support for personal and commercial cargo</li>
              <li>Accurate weighing and shipment records</li>
              <li>Customer shipment updates</li>
              <li>Delivery and collection arrangements in the UK</li>
              <li>Assistance identifying documentation that may be required</li>
            </ul>

            {/* CTAs */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Start Your Nigeria to UK Shipment</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Contact County Cargo today for a quotation and reliable assistance with your Nigeria to UK shipment.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-nigeria-to-uk">Book Nigeria Export</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Inquiry
                  </a>
                </Button>
              </div>
            </div>

            <SocialShare title="Export From Nigeria to the UK in 2026 | County Cargo" />

            <RelatedGuides currentHref="/export-from-nigeria-to-uk" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
