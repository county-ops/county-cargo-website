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
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck,
  FileText,
  HelpCircle,
  Info,
  MapPin,
  PackageCheck,
  Plane,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  UserCheck,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'UK & USA to Nigeria Cargo Update | County Cargo',
  description:
    'Shipping cargo from the UK or USA to Nigeria? Follow these practical steps to avoid customs delays, missed shipment cut-offs and unexpected charges.',
  keywords:
    'Shipping cargo to Nigeria, UK to Nigeria cargo, USA to Nigeria shipping, air cargo to Lagos, cargo delivery to Abuja, Nigeria customs clearance',
  alternates: {
    canonical: 'https://countycargo.com/blog/uk-usa-nigeria-cargo-update-september-2026',
  },
  openGraph: {
    title: 'UK & USA to Nigeria Cargo Update | County Cargo',
    description:
      'Shipping cargo from the UK or USA to Nigeria? Follow these practical steps to avoid customs delays, missed shipment cut-offs and unexpected charges.',
    url: 'https://countycargo.com/blog/uk-usa-nigeria-cargo-update-september-2026',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/cargo-update-delays-september.jpg',
        alt: 'County Cargo air and sea freight logistics update for UK and USA shipments to Nigeria',
        width: 1200,
        height: 630,
      },
    ],
    type: 'article',
  },
};

export default function UkUsaNigeriaCargoUpdatePost() {
  const articleUrl = 'https://countycargo.com/blog/uk-usa-nigeria-cargo-update-september-2026';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'UK and USA to Nigeria Cargo Update: How to Avoid Shipping Delays This Week',
    description:
      'Shipping cargo from the UK or USA to Nigeria? Follow these practical steps to avoid customs delays, missed shipment cut-offs and unexpected charges.',
    image: 'https://countycargo.com/cargo-update-delays-september.jpg',
    datePublished: '2026-09-02T08:00:00+01:00',
    dateModified: '2026-09-02T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Operations Team',
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
    inLanguage: 'en-GB',
    isPartOf: { '@id': 'https://countycargo.com/#website' },
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'UK & USA to Nigeria Cargo Update' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 23, 42, 0.94)), url('/cargo-update-delays-september.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
              <AlertTriangle className="w-3.5 h-3.5" /> Operational Update — September 2026
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              UK and USA to Nigeria Cargo Update: How to Avoid Shipping Delays This Week
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Shipping cargo from the UK or USA to Nigeria? Follow these practical steps to avoid customs delays, missed shipment cut-offs and unexpected charges.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-400" /> By County Cargo Operations Team
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed by Logistics Compliance Lead
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" /> 2 September 2026
              </span>
            </div>
          </div>
        </section>

        {/* Main Article Content */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-10">

            {/* Quick Summary / Answer-First Box */}
            <div className="p-6 bg-blue-50/80 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Key Takeaway for Shippers This Week
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Customers shipping cargo from the United Kingdom or the United States to Nigeria can avoid customs holds and transit delays by meeting warehouse cut-offs, providing precise item descriptions (especially for phones and electronics), adhering to Nigeria Customs import rules, packing efficiently to reduce volumetric weight, and pre-confirming final Nigerian delivery arrangements in Lagos, Abuja, Kano, or Kaduna.
              </p>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Planning to Ship Cargo to Nigeria This Week?
              </h2>
              <p className="text-gray-700 text-lg">
                Customers shipping from the UK or USA to Nigeria can reduce avoidable delays by preparing their packages correctly, declaring every item accurately and meeting the appropriate weekly shipment cut-off.
              </p>
              <p className="text-gray-700">
                County Cargo provides standard air cargo, express shipping and sea cargo options for customers sending personal belongings, electronics and commercial goods to Nigeria.
              </p>
              <p className="text-gray-700">
                This week, customers should pay particular attention to package descriptions, warehouse addressing, volumetric weight, restricted items and their final delivery arrangements in Nigeria.
              </p>
            </div>

            {/* Aviation Update */}
            <div className="p-6 sm:p-8 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-4 not-prose">
              <div className="flex items-center gap-2.5 text-amber-900 font-bold text-lg sm:text-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <h3>Current Aviation Update for Nigeria</h3>
              </div>
              <p className="text-gray-800 text-base leading-relaxed">
                An aviation-sector union has warned of possible industrial action following a dispute involving some of its officials. This is currently a warning and not confirmation that County Cargo shipments have been suspended or delayed. However, customers sending urgent cargo should allow reasonable flexibility and continue checking for operational updates (source:{' '}
                <a
                  href="https://punchng.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-950 underline hover:text-primary inline-flex items-center gap-1"
                >
                  punchng.com <ExternalLink className="w-3.5 h-3.5" />
                </a>
                ).
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                County Cargo will continue monitoring airline movements, cargo handling and clearance conditions. Customers will be informed directly if any confirmed disruption affects a scheduled shipment.
              </p>
            </div>

            {/* Step 1: Meet Weekly Cargo Cut-Off */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                  1
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                  Meet the Weekly Cargo Cut-Off
                </h2>
              </div>
              <p className="text-gray-700">
                Packages received after a shipment has been prepared may have to move with the following week’s cargo.
              </p>
              <p className="text-gray-700">
                Customers should avoid sending urgent packages at the last minute. Courier tracking that shows <em>“delivered”</em> does not always mean the package has already been received, identified, weighed and entered into the County Cargo system.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4 space-y-3">
                <h4 className="font-semibold text-secondary text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  To avoid missing the weekly shipment:
                </h4>
                <ul className="space-y-2 text-gray-700 text-base pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span><strong>Use the correct County Cargo warehouse address</strong> with all unit and bay indicators.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span><strong>Include your full name and customer identification details</strong> on the parcel label.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span><strong>Send the tracking number</strong> immediately after your supplier or retailer dispatches the package.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span><strong>Allow enough time</strong> for the package to be received, inspected and processed by warehouse handlers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span><strong>Pay the invoice promptly</strong> because only cleared and paid packages can be manifested and loaded for flight departure.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 text-sm bg-blue-50/60 p-4 rounded-lg border border-blue-100">
                <strong>US Warehouse Notice:</strong> Customers using our US receiving warehouse should ensure items arrive well before the applicable weekly flight cut-off. Late arrivals will automatically move with the next weekly consolidation.
              </p>
            </div>

            {/* Step 2: Declare Every Item Accurately */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                  2
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                  Declare Every Item Accurately
                </h2>
              </div>
              <p className="text-gray-700">
                A vague description such as <em>“personal items,” “gift”</em> or <em>“accessories”</em> does not provide sufficient detail for aviation security screening or customs declaration.
              </p>
              <p className="text-gray-700">
                Customers should identify the contents clearly with specific descriptive terms:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 not-prose">
                {[
                  'Used mobile phone',
                  'New laptop',
                  'Children’s clothing',
                  'Kitchen utensils',
                  'Shoes',
                  'Cosmetics',
                  'Vehicle parts',
                  'Commercial samples',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-gray-200 rounded-xl text-center text-sm font-medium text-secondary shadow-2xs hover:border-primary/40 transition-colors"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-xl not-prose">
                <p className="text-amber-900 text-sm sm:text-base leading-relaxed">
                  <strong>Important Electronics Notice:</strong> Phones, laptops, standalone batteries and other powered electronics must be declared prior to shipping. Certain electronic devices require specific documentation, UN3481 battery compliance handling, or separate shipping tariffs.
                </p>
              </div>

              <p className="text-gray-700">
                Incorrect, inaccurate or incomplete declarations can trigger secondary customs inspections, punitive penalty charges, prolonged clearance delays or the item being held back from departure.
              </p>
            </div>

            {/* Step 3: Check Restricted and Prohibited Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                  3
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                  Check Restricted and Prohibited Items
                </h2>
              </div>
              <p className="text-gray-700">
                Do not assume that an item can be imported into Nigeria simply because it can be freely purchased online in the UK or the United States.
              </p>
              <p className="text-gray-700">
                The Nigeria Customs Service enforces strict import requirements and a revised import-prohibition list (consult current rules at{' '}
                <a
                  href="https://customs.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline inline-flex items-center gap-1"
                >
                  customs.gov.ng <ExternalLink className="w-3.5 h-3.5" />
                </a>
                ).
              </p>

              <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-6 my-4 not-prose">
                <h4 className="font-semibold text-red-950 text-base mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                  Items that require advance verification or special documentation include:
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5 text-sm text-red-900">
                  {[
                    'Medicines and pharmaceutical products',
                    'Food and agricultural consumables',
                    'Batteries and high-capacity power banks',
                    'Chemicals, solvents and flammable liquids',
                    'Cosmetics in commercial quantities',
                    'High-value luxury merchandise & jewelry',
                    'Commercial inventory intended for resale',
                    'Vehicle spare parts and mechanical components',
                    'Telecommunications & transmission equipment',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/70 p-2.5 rounded-lg border border-red-100">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-gray-700">
                Always contact County Cargo before dispatching anything you are uncertain about. This is especially vital when sending commercial quantities, controlled goods or packages containing built-in lithium batteries.
              </p>
            </div>

            {/* Step 4: Understand Actual and Volumetric Weight */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                  4
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                  Understand Actual and Volumetric Weight
                </h2>
              </div>
              <p className="text-gray-700">
                Air cargo is charged according to either the package’s actual physical weight or its volumetric (dimensional) weight, depending on whichever value is greater.
              </p>
              <p className="text-gray-700">
                A lightweight item placed inside an excessively large carton will occupy valuable aircraft hold space and will therefore cost more to transport than expected.
              </p>

              {/* Volumetric Formula Card */}
              <div className="p-6 bg-slate-900 text-white rounded-xl shadow-md my-4 not-prose">
                <div className="flex items-center gap-2 text-primary-foreground font-semibold text-sm uppercase tracking-wider mb-2">
                  <Scale className="w-4 h-4 text-blue-400" /> Standard IATA Volumetric Formula
                </div>
                <p className="text-xl sm:text-2xl font-mono text-cyan-300 font-bold mb-2">
                  Volumetric Weight (kg) = (Length × Width × Height in cm) / 5000
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  If your package weighs 4 kg on a physical scale but measures 50 × 40 × 30 cm, its volumetric weight is (50 × 40 × 30) / 5000 = <strong>12.0 kg</strong>. The billable cargo weight is 12 kg.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-secondary text-base">
                  How customers can reduce unnecessary freight charges:
                </h4>
                <ul className="space-y-2 text-gray-700 text-base pl-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                    <span><strong>Choose snug packaging:</strong> Use a box that fits the dimensions of the contents closely.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                    <span><strong>Remove bulky retail boxes:</strong> Strip excess outer store packaging when items are already securely protected.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                    <span><strong>Consolidate shipments:</strong> Pack several compatible items together instead of shipping multiple small boxes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                    <span><strong>Consult before dispatch:</strong> Ask our team for guidance before sending unusually large or irregularly shaped packages.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 text-sm text-gray-500 italic">
                Note: The weight recorded by a local courier or online seller may not reflect the final chargeable cargo weight after international measuring and security screening.
              </p>
            </div>

            {/* Step 5: Protect Fragile and Valuable Goods */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                  5
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                  Protect Fragile and Valuable Goods
                </h2>
              </div>
              <p className="text-gray-700">
                Cookware, glass items, televisions, electronics, monitors and other delicate goods should be packed specifically for international air and ocean cargo handling, not merely for standard domestic delivery.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-4 not-prose">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-2.5">
                  <h4 className="font-semibold text-secondary text-sm flex items-center gap-1.5">
                    <PackageCheck className="w-4 h-4 text-primary" /> Robust Packaging Checklist
                  </h4>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                    <li>• Heavy-duty, double-wall corrugated outer carton</li>
                    <li>• Thick bubble wrap around each individual item</li>
                    <li>• Corner, lid and handle edge protectors</li>
                    <li>• Void filling (kraft paper or air pillows) to eliminate movement</li>
                    <li>• Heavy-duty packing tape across all box seams</li>
                    <li>• Highly visible &quot;Fragile / Handle With Care&quot; labels</li>
                  </ul>
                </div>

                <div className="bg-blue-50/70 p-5 rounded-xl border border-blue-200 space-y-2.5">
                  <h4 className="font-semibold text-secondary text-sm flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-primary" /> Documentation Best Practices
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    Manufacturer packaging alone is frequently insufficient for international freight transfer. Before handing your package over, always:
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                    <li>• Retain official purchase receipts and invoices</li>
                    <li>• Record model and serial numbers</li>
                    <li>• Take clear timestamped photos of the item and internal packing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 6: Prepare for Customs Clearance */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                  6
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                  Prepare for Customs Clearance
                </h2>
              </div>
              <p className="text-gray-700">
                The Nigeria Customs Service continues to modernise trade processing through digital systems, including the unified <strong>B’Odogwu</strong> trade platform (accessible via{' '}
                <a
                  href="https://mail.customs.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline inline-flex items-center gap-1"
                >
                  mail.customs.gov.ng <ExternalLink className="w-3.5 h-3.5" />
                </a>
                ). Transparent documentation and accurate item valuation remain vital prerequisites for swift cargo release.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4 space-y-3">
                <h4 className="font-semibold text-secondary text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  Commercial &amp; bulk shipments may require:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <strong>1. Detailed packing list:</strong> Exact piece counts, box numbers and item descriptions.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <strong>2. Commercial invoice:</strong> Showing declared unit prices, total value and currency.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <strong>3. Proof of purchase:</strong> Official receipts or order confirmations.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <strong>4. Regulatory permits:</strong> NAFDAC or SONCAP certificates where applicable.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <strong>5. Receiver identification:</strong> Valid Nigerian ID and contact credentials.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <strong>6. Explanation of use:</strong> Clarifying whether items are personal effects or for resale.
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 bg-amber-50/60 p-3.5 rounded-lg border border-amber-100">
                <strong>Customs Authority Note:</strong> Import duties, assessments and physical inspections are determined solely by the competent customs authorities. County Cargo facilitates prompt document submission but cannot guarantee that an individual package will be exempt from mandatory physical examination or statutory duty assessment.
              </p>
            </div>

            {/* Step 7: Confirm Nigerian Destination */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                  7
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                  Confirm Your Nigerian Destination
                </h2>
              </div>
              <p className="text-gray-700">
                Customers must supply the complete, verified receiver name, working local telephone number and exact delivery destination in Nigeria before the consignment arrives at the destination airport or port.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-4 not-prose">
                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-2xs space-y-2">
                  <h4 className="font-semibold text-secondary text-base flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    Lagos Deliveries
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    County Cargo arranges prompt local rider and van delivery across Lagos State, as well as collection from our central dispatch depot.
                  </p>
                </div>

                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-2xs space-y-2">
                  <h4 className="font-semibold text-secondary text-base flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary shrink-0" />
                    Abuja, Kano, Kaduna &amp; Nationwide
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    For destinations outside Lagos, freight is dispatched through agreed partner transport services, dedicated regional collection points, interstate parks or trusted delivery drivers.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <h4 className="font-semibold text-secondary text-sm">
                  Customers with destinations outside Lagos should confirm prior to shipping:
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 pl-2">
                  <li>• Exact final town, state and landmark</li>
                  <li>• Active recipient mobile number (with alternate backup contact)</li>
                  <li>• Whether self-collection at an interstate park or door delivery is requested</li>
                  <li>• Who is responsible for any agreed local onward transit fee</li>
                  <li>• Confirmation that the receiver is in town and prepared to collect immediately upon arrival</li>
                </ul>
              </div>

              <p className="text-gray-700 text-sm">
                Do not assume that every shipment automatically includes unconditional free door-to-door delivery across all states. All specific delivery arrangements should be clarified and confirmed during your initial quotation request.
              </p>
            </div>

            {/* Service Comparison Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center">
                Choosing the Right County Cargo Service
              </h2>
              <p className="text-gray-700 text-center max-w-2xl mx-auto">
                Select the transportation option that matches your cargo type, budget and transit timeline:
              </p>

              <div className="grid md:grid-cols-3 gap-6 not-prose">
                {/* Standard Air */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col justify-between hover:border-primary transition-all">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                      <Plane className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Standard Air Cargo</h3>
                    <div className="text-xs font-semibold px-2.5 py-1 bg-blue-100/80 text-blue-800 rounded-full inline-block">
                      Est. 5–10 Working Days
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ideal for personal effects, clothes, household essentials, e-commerce purchases and general cargo. Subject to regular airline schedules and standard customs clearance.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-primary">Best for balanced cost &amp; speed</span>
                  </div>
                </div>

                {/* Express Air */}
                <div className="p-6 bg-blue-900 text-white rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 font-bold text-[10px] uppercase px-3 py-1 rounded-bl-lg">
                    Urgent
                  </div>
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-cyan-300 flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Express Air Cargo</h3>
                    <div className="text-xs font-semibold px-2.5 py-1 bg-white/20 text-cyan-200 rounded-full inline-block">
                      Est. 2–3 Working Days
                    </div>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      Tailored for time-critical UK-to-Lagos consignments and urgent documents. Express transit to Abuja and regional cities is confirmed on request based on flight links.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="text-xs font-semibold text-cyan-300">Fastest direct air routing</span>
                  </div>
                </div>

                {/* Sea Cargo */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col justify-between hover:border-primary transition-all">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Ship className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Sea Freight</h3>
                    <div className="text-xs font-semibold px-2.5 py-1 bg-emerald-100/80 text-emerald-800 rounded-full inline-block">
                      Cost-Effective Bulk Freight
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Recommended for heavy machinery, bulk commercial merchandise, large barrels and non-urgent household relocations where planning allows for sea transit and port clearance.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-emerald-700">Maximum savings on heavy volume</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div
              className="my-12 p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl shadow-xl not-prose relative overflow-hidden"
              data-aos="fade-up"
            >
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/30 text-blue-200 border border-blue-400/20">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Seamless Transatlantic Freight
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Ship with County Cargo
                </h3>
                <p className="text-blue-100 text-base leading-relaxed max-w-2xl">
                  County Cargo provides dependable standard air, express and ocean cargo solutions connecting the United Kingdom, the United States and Nigeria.
                </p>

                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-5 my-4 border border-white/10 space-y-2">
                  <h4 className="font-semibold text-white text-sm">
                    Before dispatching your package, request a route-specific quotation and confirm:
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-blue-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Precise type of goods
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Exact weight &amp; box dimensions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Departure origin (UK or USA)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Final Nigerian destination
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Shipment urgency level
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Local collection or delivery needs
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-3 rounded-xl shadow-md border-none"
                  >
                    <Link href="/contact">
                      Request Your Quote <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-3 rounded-xl"
                  >
                    <Link href="/shipping-from-uk-to-nigeria">
                      UK to Nigeria Services
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-3 rounded-xl"
                  >
                    <Link href="/ship-from-us-to-nigeria">
                      US to Nigeria Services
                    </Link>
                  </Button>
                </div>

                <p className="text-xs text-blue-200/80 pt-4 border-t border-white/10">
                  <em>Disclaimer:</em> Shipping times, airline schedules and customs procedures are estimates and may vary due to airline routing changes, physical customs examinations, weather events, regulatory reviews and third-party operational conditions outside County Cargo’s direct control.
                </p>
              </div>
            </div>

            {/* Sources and Citations */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-base font-bold text-secondary mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" /> Sources &amp; Regulatory References
              </h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 list-disc pl-5">
                <li>
                  Aviation Union Industrial Action Monitoring:{' '}
                  <a
                    href="https://punchng.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    punchng.com
                  </a>
                </li>
                <li>
                  Nigeria Customs Service Import Guidelines &amp; Prohibition List:{' '}
                  <a
                    href="https://customs.gov.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    customs.gov.ng
                  </a>
                </li>
                <li>
                  Nigeria Customs Service Modernisation &amp; B&apos;Odogwu Unified Trade Platform:{' '}
                  <a
                    href="https://mail.customs.gov.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mail.customs.gov.ng
                  </a>
                </li>
              </ul>
            </div>

            <SocialShare title="UK & USA to Nigeria Cargo Update: How to Avoid Shipping Delays This Week | County Cargo" />

            <RelatedGuides currentHref="/blog/uk-usa-nigeria-cargo-update-september-2026" />

          </div>
        </article>

        {/* FAQ Section */}
        <Faq />
      </main>
      <Footer />
    </>
  );
}
