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
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://countycargo.com/export-from-nigeria-to-uk#service',
        name: 'Air Cargo & Export Freight Forwarding from Nigeria to the UK',
        serviceType: 'International Air Freight & Customs Export Services',
        provider: {
          '@type': 'Organization',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          logo: 'https://countycargo.com/county-logo.png',
        },
        areaServed: [
          { '@type': 'Country', name: 'Nigeria' },
          { '@type': 'Country', name: 'United Kingdom' },
        ],
        description:
          'Fast and reliable air cargo export from Nigeria to the UK. Door-to-door and depot delivery for dry African foodstuffs, commercial merchandise, personal luggage, and documents.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Nigeria to UK Air Shipping Options',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Express Air Courier (3–5 Working Days)',
                description: 'Fastest door-to-door delivery from Nigeria to UK with a 1 kg minimum chargeable weight.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Standard Air Cargo (5–7 Working Days)',
                description: 'Economical consolidated air freight for shipments 10kg and above.',
              },
            },
          ],
        },
      },
      {
        '@type': 'HowTo',
        '@id': 'https://countycargo.com/export-from-nigeria-to-uk#howto',
        name: 'How to Export Goods and Foodstuffs from Nigeria to the UK',
        description: 'Complete step-by-step procedure to export personal belongings, dry African food, and commercial cargo from Nigeria to the UK legally.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Confirm Item Eligibility and Customs Standards',
            text: 'Verify your items comply with UK customs and DEFRA food import rules. Prepare an itemised packing list.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Your Shipping Service',
            text: 'Choose Express Air Courier (3-5 business days, any weight) or Standard Air Cargo (5-7 business days, min 10kg).',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Pack and Vacuum-Seal Your Goods',
            text: 'Pack in double-wall boxes. Vacuum-seal all dried foodstuffs (crayfish, egusi, fish) to meet airline and Port Health rules.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Provide Consignor and Consignee Details',
            text: 'Submit sender details in Nigeria and the recipient UK address, postcode, and telephone number.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Drop Off at Lagos/Abuja Hub or Book Pickup',
            text: 'Drop off at our Lagos or Abuja warehouses, or book a home/office pickup across Nigeria.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Clear UK Customs and Receive Delivery',
            text: 'County Cargo handles UK customs clearance. Collect at our Liverpool depot or receive nationwide doorstep delivery.',
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': 'https://countycargo.com/export-from-nigeria-to-uk#article',
        headline: 'How to Export From Nigeria to the UK in 2026',
        description: 'Authoritative guide covering shipping options, documentation, NEPC requirements, UK customs clearance, packing rules, and delivery with County Cargo.',
        image: 'https://countycargo.com/nigeria-export-documents-guide.jpg',
        datePublished: '2026-09-06T08:00:00+01:00',
        dateModified: '2026-09-19T08:00:00+01:00',
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
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://countycargo.com/export-from-nigeria-to-uk#breadcrumbs',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://countycargo.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Export From Nigeria',
            item: 'https://countycargo.com/export-from-nigeria',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Export From Nigeria to the UK',
            item: 'https://countycargo.com/export-from-nigeria-to-uk',
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
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
              <Plane className="w-3.5 h-3.5" /> 2026 UK Export Guide &amp; Services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Export From Nigeria to the UK in 2026
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Learn how to send personal belongings, authentic African food, fashion, and commercial cargo from Nigeria to the United Kingdom safely and legally.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo UK Trade Compliance Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Logistics Compliance Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-yellow-400" /> Updated September 2026</span>
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

            {/* Pillar Topic Shortcuts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
              <Link
                href="/export-food-from-nigeria-to-uk"
                className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Foodstuff Exporters 🍲
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700">
                    Export Food from Nigeria to UK
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    DEFRA rules, vacuum sealing, approved items (garri, egusi, fish).
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 mt-3 inline-flex items-center gap-1">
                  Food Export Guide →
                </span>
              </Link>

              <Link
                href="/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide"
                className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                    Commercial Trade 📋
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-700">
                    Commercial Export &amp; NEPC
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Form NXP, commercial invoices, UK DCTS zero-tariff benefits.
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-700 mt-3 inline-flex items-center gap-1">
                  Commercial Guide →
                </span>
              </Link>

              <Link
                href="/shipping-from-nigeria-to-uk"
                className="p-4 bg-amber-50 border border-amber-200 rounded-xl hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                    Direct Booking ✈️
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-700">
                    Get Instant Shipping Quote
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Express &amp; standard rates from Lagos and Abuja to UK.
                  </p>
                </div>
                <span className="text-xs font-semibold text-amber-700 mt-3 inline-flex items-center gap-1">
                  Book Shipment →
                </span>
              </Link>
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
                  <strong>Express shipping</strong> is suitable for smaller or urgent packages and has a 1 kg minimum chargeable weight. Availability and delivery estimates depend on the contents, destination and current flight schedule.
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

            {/* Transit and Depot Information Box */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl not-prose space-y-4">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Nigerian Drop-off Hubs &amp; UK Delivery Network
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">🇳🇬 Nigeria Drop-off &amp; Collection</h4>
                  <p className="text-gray-600 text-xs leading-relaxed mb-2">
                    <strong>Lagos Main Hub:</strong> Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos.<br />
                    <strong>Abuja Office:</strong> Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, Abuja.<br />
                    <strong>Doorstep Pickup:</strong> Available across Lagos, Abuja, Port Harcourt, Ibadan, and Kano.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">🇬🇧 UK Depot &amp; Doorstep Delivery</h4>
                  <p className="text-gray-600 text-xs leading-relaxed mb-2">
                    <strong>UK Receiving Depot:</strong> Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG.<br />
                    <strong>Doorstep Delivery:</strong> Fast nationwide courier dispatch to London, Manchester, Birmingham, Leeds, Glasgow, and all mainland UK addresses.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold">Start Your Nigeria to UK Shipment</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Contact County Cargo today for competitive air freight rates, professional vacuum sealing, and smooth customs clearance from Nigeria to the UK.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-nigeria-to-uk">Book Nigeria Export</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20quote%20for%20exporting%20from%20Nigeria%20to%20the%20UK" target="_blank" rel="noopener noreferrer">
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
