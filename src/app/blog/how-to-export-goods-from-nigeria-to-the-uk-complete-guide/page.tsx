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
  CheckCircle2,
  Building2,
  ShieldCheck,
  Plane,
  AlertTriangle,
  HelpCircle,
  Briefcase,
  Layers,
  DollarSign,
  MessageSquare,
  PackageCheck,
  Truck,
  FileCheck,
  XCircle,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Exporting Goods From Nigeria to the UK: The Complete 2026 Guide | County Cargo',
  description:
    'Complete 2026 guide to exporting goods from Nigeria to the UK. Learn NEPC registration, Form NXP, UK DCTS zero-tariff rules, food clearance, and air cargo rates.',
  keywords:
    'export from nigeria to uk, how to export goods from nigeria to the uk, shipping from nigeria to uk, nigeria to uk air freight, nepc exporter certificate, form nxp cbn, sending food items from nigeria to uk, uk dcts tariff nigeria',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide',
  },
  openGraph: {
    title: 'Exporting Goods From Nigeria to the UK: The Complete 2026 Guide | County Cargo',
    description:
      'Comprehensive step-by-step regulatory handbook for exporting goods from Nigeria to the UK. NEPC exporter registration, Form NXP, UK DCTS zero tariffs, food safety guidelines, and air cargo delivery.',
    url: 'https://countycargo.com/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/nigeria-export-documents-certification.jpg',
        width: 1200,
        height: 675,
        alt: 'Air cargo consignments and customs documentation for Nigeria to UK commercial export shipping',
      },
    ],
  },
};

const guideFaqs = [
  {
    question: 'What is the minimum billable weight for shipping from Nigeria to the UK?',
    answer:
      'For our economical Value Shipping (Air Cargo) service, the minimum billable weight is 10 kg. For Express Shipping, the minimum chargeable weight begins at just 0.5 kg, making it ideal for small parcels, documents, and commercial samples.',
  },
  {
    question: 'Do I need to pay customs duty when receiving goods in the UK?',
    answer:
      'Under the UK Developing Countries Trading Scheme (DCTS), many raw agricultural commodities and manufactured goods from Nigeria enter the UK at 0% customs duty. However, standard UK import VAT (20%) may apply depending on the classification, value, and intended commercial use of the shipment. Personal gifts valued below £39 are typically exempt from VAT.',
  },
  {
    question: 'How are shipping costs calculated: actual weight or volumetric weight?',
    answer:
      'International air freight regulations calculate billable weight based on whichever is greater: the actual gross weight (on a calibrated physical scale) or the volumetric weight (calculated as [Length (cm) × Width (cm) × Height (cm)] ÷ 5000). If you are shipping lightweight but bulky items (such as traditional hats, bulky textiles, or hollow containers), volumetric weight will apply.',
  },
  {
    question: 'Can I ship packaged crayfish, egusi, and dried fish to the UK?',
    answer:
      'Yes. Completely dehydrated, packaged, and vacuum-sealed dry foodstuffs—including egusi, ogbono, ground crayfish, and oven-dried fish—are fully permitted. Fresh meat, wet fish, unpasteurised dairy, and garden eggs with soil are strictly prohibited.',
  },
  {
    question: 'How long does shipping take from Lagos or Abuja to London?',
    answer:
      'Our Special Express (48-Hour) service delivers within 48 hours following direct flight departure. Our Express Shipping courier delivers in 3 to 5 working days, while our economical consolidated Value Air Freight arrives within 5–10 working days.',
  },
  {
    question: 'What documents do I need to include with my shipment?',
    answer:
      'Every export shipment requires: (1) an itemized Commercial Invoice or Packing Declaration, (2) a detailed Packing List with weights and dimensions, (3) consignee full UK name, street address, and active telephone number, and (4) an NAQS Phytosanitary Certificate specifically for commercial agro-produce.',
  },
];

export default function HowToExportGoodsNigeriaToUkGuidePage() {
  const pageUrl = 'https://countycargo.com/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        headline: 'Exporting Goods From Nigeria to the UK: The Complete 2026 Guide',
        description:
          'Comprehensive step-by-step regulatory handbook for exporting goods from Nigeria to the UK. NEPC exporter registration, Form NXP, UK DCTS zero tariffs, food safety guidelines, and air cargo delivery.',
        image: 'https://countycargo.com/images/blog/nigeria-export-documents-certification.jpg',
        datePublished: '2026-09-20T08:00:00+01:00',
        dateModified: '2026-09-20T08:00:00+01:00',
        inLanguage: 'en-GB',
        author: {
          '@type': 'Organization',
          name: 'County Cargo International Trade Compliance Division',
          url: 'https://countycargo.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://countycargo.com/county-logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: guideFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
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
            name: 'Blog',
            item: 'https://countycargo.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Nigeria to UK Export Guide',
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Export From Nigeria', href: '/export-from-nigeria' },
            { label: 'Blog', href: '/blog' },
            { label: 'Nigeria to UK Export Guide' },
          ]}
        />

        {/* Hero Banner */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
              <Briefcase className="w-3.5 h-3.5" /> B2B Trade &amp; Commercial Export Guide (2026)
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Exporting Goods From Nigeria to the UK: The Complete 2026 Guide
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              A comprehensive regulatory handbook for Nigerian manufacturers, agricultural traders, fashion designers, and diaspora shippers navigating NEPC registration, CBN Form NXP, UK DCTS zero tariffs, and air freight logistics.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" /> County Cargo International Trade Compliance Division
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Verified Against HMRC, NEPC &amp; DEFRA Guidelines
              </span>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-10">

            {/* Answer-First Executive Summary */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Key Takeaway: Commercial Exporting from Nigeria to the UK
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Exporting commercial merchandise from Nigeria to the UK requires five key milestones: (1) Corporate Affairs Commission (CAC) incorporation and an active Nigerian Export Promotion Council (NEPC) certificate; (2) electronic Form NXP registration via an authorized commercial dealer bank on the Central Bank of Nigeria Trade Monitoring System (TRMS); (3) an accurate Commercial Invoice with correct Harmonized System (HS) codes; (4) relevant product health certification (NAQS Phytosanitary or NAFDAC); and (5) a UK importer with a valid GB EORI number. Under the UK Developing Countries Trading Scheme (DCTS), thousands of Nigerian non-oil products enjoy 0% import tariffs.
              </p>
            </div>

            {/* Direct Links to Pillar & Food Export Pages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              <Link
                href="/export-from-nigeria-to-uk"
                className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:shadow-sm transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary text-sm">
                    Nigeria to UK General Export Hub
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Shipping rules, rates, drop-off depots, and package tracking.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/export-food-from-nigeria-to-uk"
                className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:border-emerald-600 hover:shadow-sm transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 text-sm">
                    Exporting Foodstuffs?
                  </h3>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    View permitted items, vacuum sealing, and DEFRA rules.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Introduction */}
            <section className="space-y-4">
              <p className="text-base text-gray-700">
                Whether you are an established Nigerian manufacturer, an emerging fashion label, an agricultural trader, or an individual sending personal effects and approved dry foodstuffs to family in London, exporting to the United Kingdom represents one of the largest and most lucrative bilateral trade corridors between Africa and Europe.
              </p>
              <p className="text-base text-gray-700">
                With bilateral UK-Nigeria trade exceeding £7 billion and a vibrant diaspora community of over 500,000 residents across London, Manchester, Birmingham, Leeds, and Liverpool, demand for authentic Nigerian products—from textiles and cosmetics to dried ginger and packaged foodstuffs—has never been higher.
              </p>
              <p className="text-base text-gray-700">
                However, navigating the intersection of <strong>Nigerian export regulations</strong> (NEPC, Central Bank Form NXP, NAQS) and <strong>United Kingdom border controls</strong> (HMRC, DEFRA, Food Standards Agency, UK DCTS) requires strict procedural discipline. A single missing phytosanitary certificate, an incorrect Harmonised System (HS) code, or substandard packaging can lead to impounded shipments, heavy demurrage, or outright destruction at British ports of entry.
              </p>
            </section>

            {/* Section 1: Regulatory Requirements */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" /> 1. Regulatory Requirements: Getting Started in Nigeria
              </h2>
              <p className="text-gray-700">
                Before dispatching your first commercial export consignment from Nigeria, federal regulatory frameworks mandate registration with key export oversight bodies.
              </p>

              <div className="space-y-4">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-secondary text-base mb-2">
                    A. Nigerian Export Promotion Council (NEPC) Exporter Registration
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    Under the Export (Incentives and Miscellaneous Provisions) Act, any business entity seeking to export commercial cargo out of Nigeria must register with the <strong>Nigerian Export Promotion Council (NEPC)</strong>.
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2">
                    <li><strong>Eligibility:</strong> Must be a registered Nigerian company with the Corporate Affairs Commission (CAC) — Business Names (enterprises) are not permitted to export commercial commodities; only Limited Liability Companies (Ltd) or registered Cooperative Societies are eligible.</li>
                    <li><strong>Required Documents:</strong> Certificate of Incorporation, Memorandum and Articles of Association, Form CAC 1.1 (Status Report / Particulars of Directors), FIRS Tax Identification Number (TIN), and Board Resolution to register as an exporter.</li>
                    <li><strong>Turnaround Time:</strong> Online registration through the official NEPC e-portal is typically processed and issued within 48 to 72 working hours.</li>
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-secondary text-base mb-2">
                    B. Electronic Form NXP (Non-Oil Export) via CBN TRMS
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    The Central Bank of Nigeria (CBN) enforces mandatory documentation of all non-oil commercial shipments exceeding $1,000 in commercial value via the <strong>Trade Monitoring System (TRMS)</strong>:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2">
                    <li>You must open a dedicated <strong>Export Proceeds Account</strong> with a licensed Nigerian commercial bank.</li>
                    <li>The electronic <strong>Form NXP</strong> must be initiated online through the TRMS portal before cargo is presented for Nigerian Customs Service (NCS) inspection.</li>
                    <li>Once inspected by a government-appointed Pre-Shipment Inspection Agent (such as Cobalt, Neroli, or Arlington), a <strong>Clean Certificate of Inspection (CCI)</strong> is issued, authorizing customs dispatch.</li>
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-secondary text-base mb-2">
                    C. Inspection &amp; Phytosanitary Clearances (Agro &amp; Foodstuffs)
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    If your consignment includes agricultural produce, seeds, timber, or dried food:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2">
                    <li><strong>Nigeria Agricultural Quarantine Service (NAQS):</strong> Inspects agricultural goods to ensure freedom from quarantine pests, issuing an official NAQS Phytosanitary Certificate.</li>
                    <li><strong>Federal Ministry of Industry, Trade and Investment (FMITI):</strong> Issues the Federal Certificate of Origin and Export Quality Certificates where applicable.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: UK DCTS */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-emerald-600" /> 2. UK Import Tariffs: Maximising the UK DCTS Scheme
              </h2>
              <p className="text-gray-700">
                Following the United Kingdom departure from the European Union, the British government established the <strong>Developing Countries Trading Scheme (DCTS)</strong> in June 2023, offering one of the most generous trade preference schemes in the world.
              </p>
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <h4 className="font-bold text-emerald-950 text-sm">Key Advantages of the UK DCTS for Nigerian Exporters:</h4>
                <ul className="text-xs text-emerald-900 space-y-2 list-disc list-inside">
                  <li><strong>0% Customs Duty (Duty-Free Access):</strong> Over 85% of tariff lines enter the UK tariff-free. This includes agricultural commodities such as cocoa beans, sesame seeds, cashew nuts, ginger, shea butter, and natural gum, as well as manufactured garments and fashion accessories.</li>
                  <li><strong>Simplified Rules of Origin:</strong> Exporters must ensure their commercial invoice clearly declares the country of origin as Nigeria (<code>Origin: Nigeria</code>) and references DCTS qualifying criteria.</li>
                  <li><strong>Value Added Tax (VAT):</strong> Even when customs duty is 0%, standard UK import VAT (20%) applies to most taxable commercial goods unless the product is zero-rated (such as most staple human foodstuffs, books, and children clothes).</li>
                </ul>
              </div>
            </section>

            {/* Section 3: Food Products Compliance */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-primary" /> 3. Shipping Food Products: Legal vs Strictly Prohibited Items
              </h2>
              <p className="text-gray-700">
                The United Kingdom enforces rigorous biosecurity and public health standards overseen by the <strong>Department for Environment, Food &amp; Rural Affairs (DEFRA)</strong> and the <strong>Food Standards Agency (FSA)</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <h3 className="font-bold text-emerald-950 text-base mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Permitted Food Items (Dry &amp; Vacuum-Packed)
                  </h3>
                  <p className="text-xs text-emerald-800 mb-3">Allowed when completely dehydrated, commercially sealed, and labeled:</p>
                  <ul className="text-xs text-emerald-900 space-y-1.5 list-disc list-inside">
                    <li><strong>Dried Vegetables:</strong> Bitter leaf, scent leaf, ukazi, utazi, and fluted pumpkin (ugwu)—thoroughly oven-dehydrated.</li>
                    <li><strong>Ground Spices:</strong> Crayfish (finely blended and vacuum-sealed), dry pepper, uziza seeds, ehuru, locust beans (iru/dawadawa).</li>
                    <li><strong>Tubers &amp; Flours:</strong> Yam flour (elubo), plantain flour, cassava flour, packaged garri (ijebu and white).</li>
                    <li><strong>Seeds &amp; Melons:</strong> Egusi (peeled and dry), ogbono, sesame seeds, cashew nuts, roasted groundnuts.</li>
                    <li><strong>Smoked &amp; Dried Fish:</strong> Mangala, stockfish, and catfish—provided zero moisture content and commercially heat-sealed.</li>
                  </ul>
                </div>

                <div className="p-5 bg-rose-50 border border-rose-200 rounded-xl">
                  <h3 className="font-bold text-rose-950 text-base mb-2 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600" /> Strictly Prohibited &amp; Restricted Items
                  </h3>
                  <p className="text-xs text-rose-800 mb-3">Will be seized and incinerated immediately by UK Border Force:</p>
                  <ul className="text-xs text-rose-900 space-y-1.5 list-disc list-inside">
                    <li><strong>Fresh or Uncooked Meat:</strong> Beef, goat meat, poultry, pork, bushmeat, suya, or kilishi without certified commercial sterilization.</li>
                    <li><strong>Dairy Products:</strong> Unpasteurised milk, fresh cheeses, or butter made from raw animal dairy.</li>
                    <li><strong>Fresh Perishables:</strong> Fresh oranges, mangoes, garden eggs, fresh pepper, or yams with raw soil attached.</li>
                    <li><strong>Controlled Substances:</strong> Unlabeled traditional herbal concoctions (agbo), unsealed liquids, or unverified bark powders.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Service Level Comparison Table */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
                <Plane className="w-6 h-6 text-primary" /> 4. County Cargo Service Levels: Nigeria to the UK
              </h2>
              <p className="text-gray-700">
                County Cargo operates scheduled commercial air logistics, courier services, and direct air freight lanes connecting Lagos (Murtala Muhammed International Airport) and Abuja (Nnamdi Azikiwe International Airport) directly with London Heathrow and our Liverpool UK Distribution Depot.
              </p>

              <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-2xs not-prose">
                <table className="w-full text-left text-xs sm:text-sm text-gray-700">
                  <thead className="bg-slate-900 text-white font-semibold">
                    <tr>
                      <th className="p-3">Feature</th>
                      <th className="p-3">Value Shipping (Air Cargo)</th>
                      <th className="p-3">Express Shipping (Priority)</th>
                      <th className="p-3">Special Express (48-Hour)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-gray-900">Ideal For</td>
                      <td className="p-3">Bulk commercial cargo, large boxes, personal effects, dry foodstuffs</td>
                      <td className="p-3">Fast commercial samples, ecommerce parcels, urgent inventory</td>
                      <td className="p-3">Critical documents, time-sensitive medical products, VIP cargo</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-gray-900">Transit Time</td>
                      <td className="p-3 font-bold text-primary">5–10 working days</td>
                      <td className="p-3 font-bold text-primary">3 to 5 working days</td>
                      <td className="p-3 font-bold text-amber-600">48-Hour Flight Schedule</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-gray-900">Minimum Weight</td>
                      <td className="p-3">10 kg</td>
                      <td className="p-3">0.5 kg</td>
                      <td className="p-3">1 kg</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-gray-900">Origin Depots</td>
                      <td className="p-3">Lagos Hub (Ladipo-Oshodi) &amp; Abuja (Wuye Market)</td>
                      <td className="p-3">Nationwide Doorstep Collection or Hubs</td>
                      <td className="p-3">Direct Lagos / Abuja Airport Express</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-gray-900">UK Destination</td>
                      <td className="p-3">London, Manchester, Birmingham, Nationwide UK</td>
                      <td className="p-3">Nationwide UK Doorstep Delivery</td>
                      <td className="p-3">Direct London Heathrow Clearance</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-gray-900">Tracking</td>
                      <td className="p-3">Milestone tracking updates</td>
                      <td className="p-3">Real-time global courier tracking</td>
                      <td className="p-3">Priority real-time dispatch alerts</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-gray-900">Customs Handover</td>
                      <td className="p-3">Consolidated clearance included</td>
                      <td className="p-3">Express priority clearance</td>
                      <td className="p-3">Top direct priority flight connection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: Step-by-Step Export Checklist */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
                <Layers className="w-6 h-6 text-primary" /> 5. Step-by-Step Export Checklist: From Warehouse to UK Doorstep
              </h2>
              <div className="space-y-4 not-prose">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Confirm Product Eligibility &amp; HS Code Classification</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Verify that your items are permitted under UK DEFRA/HMRC guidelines and assign the correct 6-digit to 10-digit Harmonized System (HS) code for 0% DCTS preferential tariff treatment.</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Industrial Packaging &amp; Vacuum Sealing</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Vacuum-pack organic food items, wrap fragile goods with high-density bubble wrap, and pack into certified heavy-duty 5-ply export cartons rated for international air transit.</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Complete Commercial Invoice &amp; Packing List</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Generate clear, unambiguous documentation detailing itemized product descriptions, declared values in GBP/USD, origin declarations, and complete consignee contact details.</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Drop Off or Request Doorstep Collection</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Hand over your consignment at County Cargo Lagos Hub (Ladipo-Oshodi Plaza) or Abuja Hub (Wuye Ultra Modern Market). Alternatively, schedule certified doorstep collection across Nigeria.</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">5</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Export Inspection &amp; Scheduled Flight Dispatch</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Consignments undergo mandatory Nigerian export security screening and customs manifest verification before departing on scheduled direct air cargo flights to London.</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">6</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">UK Customs Clearance &amp; Doorstep Delivery</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Cleared through HMRC CDS at London Heathrow and routed through our Liverpool logistics depot (Queens Dock, L1 0BG) for final doorstep delivery nationwide across England, Scotland, Wales, and Northern Ireland.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Actionable CTAs */}
            <div className="p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-2xl text-center space-y-5 shadow-md not-prose">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Truck className="w-3.5 h-3.5" /> Ready to Ship to the UK?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold hero-text-glow">Start Your Nigeria-to-UK Export Consignment</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Get an instant quote with our central rate calculator, book online in minutes, or connect directly with our international trade compliance team.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5">
                  <Link href="/#quote-calculator">
                    <Calculator className="w-4 h-4 mr-2" /> Calculate Shipping Rates
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/10 font-bold px-6 py-2.5">
                  <a href="https://ship.countycargo.com/login" target="_blank" rel="noopener noreferrer">
                    <PackageCheck className="w-4 h-4 mr-2" /> Book Consignment Online
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10 font-bold px-6 py-2.5">
                  <a
                    href="https://wa.me/447883309489?text=Hello%20County%20Cargo%2C%20I%20need%20assistance%20with%20commercial%20export%20from%20Nigeria%20to%20the%20UK"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Trade Desk
                  </a>
                </Button>
              </div>
            </div>

            <SocialShare title="Exporting Goods From Nigeria to the UK: The Complete 2026 Guide | County Cargo" />

            <RelatedGuides currentHref="/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide" />
          </div>
        </article>

        {/* FAQs */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Nigeria to UK Export</h2>
            </div>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
              {guideFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-secondary hover:text-primary text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
