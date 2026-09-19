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
  FileText,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Plane,
  Clock,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  Briefcase,
  Layers,
  Scale,
  DollarSign,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'How to Export Goods From Nigeria to the UK: Complete 2026 Commercial Guide | County Cargo',
  description:
    'Complete step-by-step commercial export guide from Nigeria to the UK. NEPC exporter registration, electronic Form NXP, UK DCTS zero-tariff rules, GB EORI, and air freight logistics.',
  keywords:
    'how to export goods from Nigeria to UK, export to UK from Nigeria, NEPC exporter registration, Form NXP CBN, UK DCTS tariff Nigeria, commercial invoice export Nigeria, ship commercial cargo Lagos to London, export fashion from Nigeria to UK',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide',
  },
  openGraph: {
    title: 'How to Export Goods From Nigeria to the UK: Complete 2026 Commercial Guide | County Cargo',
    description:
      'Step-by-step regulatory roadmap for Nigerian businesses, agro-exporters, fashion brands, and SMEs exporting goods to the United Kingdom legally and profitably.',
    url: 'https://countycargo.com/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/nigeria-export-documents-certification.jpg',
        width: 1200,
        height: 675,
        alt: 'Commercial export procedures and documentation from Nigeria to the UK',
      },
    ],
  },
};

const guideFaqs = [
  {
    question: 'What is the UK Developing Countries Trading Scheme (DCTS) for Nigerian exporters?',
    answer:
      'The DCTS is the UK trade preference framework that allows qualifying non-oil goods exported from Nigeria to enter the United Kingdom duty-free or at substantially reduced customs tariff rates. Products like cocoa, cashew nuts, shea butter, sesame seeds, textiles, and manufactured apparel benefit directly from 0% UK import tariffs when proper origin documentation is provided.',
  },
  {
    question: 'Is Form NXP required for all commercial exports from Nigeria?',
    answer:
      'Yes. The Central Bank of Nigeria (CBN) and Nigeria Customs Service require an electronic Form NXP (submitted through the Trade Monitoring System TRMS portal) for all commercial export consignments exceeding $1,000 USD in commercial value, ensuring legal repatriation of export proceeds.',
  },
  {
    question: 'How do I obtain an NEPC Exporter Certificate?',
    answer:
      'You can register online through the Nigerian Export Promotion Council (NEPC) portal. You will need your Corporate Affairs Commission (CAC) certificate of incorporation, Tax Identification Number (TIN), Memorandum & Articles of Association, and valid ID of company directors. Registration is typically issued within 48 to 72 hours.',
  },
  {
    question: 'Does the UK buyer or importer need a GB EORI number?',
    answer:
      'Yes. Any UK business or registered entity importing commercial goods from outside the UK must possess a GB Economic Operators Registration and Identification (GB EORI) number to lodge customs declarations through HM Revenue & Customs (HMRC) Customs Declaration Service (CDS).',
  },
  {
    question: 'What is the fastest way to ship commercial product samples from Lagos to the UK?',
    answer:
      'County Cargo Express Courier service delivers commercial product samples, fashion garments, and documents door-to-door from Lagos or Abuja to London and nationwide UK in 3 to 5 business days, with full tracking and priority customs clearance.',
  },
  {
    question: 'How can County Cargo help my business export smoothly?',
    answer:
      'County Cargo provides end-to-end export support: air freight consolidation, industrial export packing and vacuum sealing, documentation review (commercial invoices, packing lists, HS codes), Nigerian customs export clearance, UK HMRC clearance, and nationwide UK distribution from our Liverpool depot (L1 0BG).',
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
        headline: 'How to Export Goods From Nigeria to the UK: Complete Commercial Guide (2026)',
        description:
          'Comprehensive handbook for Nigerian businesses and SMEs on commercial export compliance, NEPC registration, Form NXP, UK DCTS zero tariffs, and freight forwarding to the UK.',
        image: 'https://countycargo.com/images/blog/nigeria-export-documents-certification.jpg',
        datePublished: '2026-09-19T08:00:00+01:00',
        dateModified: '2026-09-19T08:00:00+01:00',
        author: {
          '@type': 'Organization',
          name: 'County Cargo International Trade Compliance Division',
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
          '@id': pageUrl,
        },
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        name: 'How to Legally Export Commercial Cargo from Nigeria to the United Kingdom',
        description: 'Step-by-step roadmap to fulfill Nigerian export mandates and UK HMRC customs rules.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Register with CAC and Obtain NEPC Exporter Certificate',
            text: 'Incorporate your enterprise with the Corporate Affairs Commission (CAC) and obtain an official exporter certificate from the Nigerian Export Promotion Council.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'File Electronic Form NXP on CBN Trade Monitoring System',
            text: 'Submit e-Form NXP through your authorized commercial dealer bank on the CBN TRMS portal to record non-oil export proceeds.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Obtain Necessary Quality & Health Certificates',
            text: 'Acquire NAFDAC export certificates for cosmetics/food, or NAQS Phytosanitary certificates for agricultural produce.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Issue Commercial Invoice with Accurate HS Codes',
            text: 'Prepare a compliant commercial invoice detailing product description, Harmonized System (HS) codes, unit price, and origin declaration.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Ensure UK Importer Has GB EORI Number',
            text: 'Verify your UK consignee has an active GB EORI number registered with HM Revenue & Customs for customs clearance.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Book Air Cargo or Express Freight with County Cargo',
            text: 'Deliver cargo to County Cargo Lagos or Abuja hubs for weight verification, export documentation stamping, and scheduled UK air freight.',
          },
        ],
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
        '@id': `${pageUrl}#breadcrumbs`,
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
            name: 'Blog',
            item: 'https://countycargo.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Commercial Export from Nigeria to UK Guide',
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
            { label: 'Commercial Export Nigeria to UK' },
          ]}
        />

        {/* Hero Banner */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
              <Briefcase className="w-3.5 h-3.5" /> B2B Trade &amp; Commercial Export Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Export Goods From Nigeria to the UK in 2026
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              A comprehensive blueprint for Nigerian SMEs, fashion designers, cosmetics makers, and agro-exporters looking to access the lucrative UK market legally, duty-free under DCTS, and without logistics friction.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" /> County Cargo Trade Compliance Division
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Reviewed Against HMRC &amp; NEPC 2026 Guidelines
              </span>
              <span>•</span>
              <span>8 min read</span>
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
                Exporting commercial merchandise from Nigeria to the UK requires five key milestones: (1) Corporate Affairs Commission (CAC) registration and an active Nigerian Export Promotion Council (NEPC) certificate; (2) electronic Form NXP registration via an authorized commercial dealer bank on the Central Bank of Nigeria's Trade Monitoring System; (3) an accurate Commercial Invoice with correct Harmonized System (HS) codes; (4) relevant product health certification (NAQS Phytosanitary or NAFDAC); and (5) a UK importer with a valid GB EORI number. Under the UK's Developing Countries Trading Scheme (DCTS), thousands of Nigerian non-oil products enjoy 0% import tariffs.
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
                <span className="text-primary font-bold text-sm">→</span>
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
                <span className="text-emerald-700 font-bold text-sm">→</span>
              </Link>
            </div>

            {/* Section 1: UK Market Opportunity & DCTS */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-emerald-600" /> 1. The UK Opportunity &amp; Zero-Tariff Access Under DCTS
              </h2>
              <p className="text-gray-700">
                The United Kingdom is home to one of the largest and most vibrant Nigerian diaspora communities globally, creating immense commercial demand for authentic African products:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
                <li><strong>African Fashion &amp; Textiles:</strong> Aso-oke, ankara prints, ready-to-wear bespoke tailoring, and leather accessories.</li>
                <li><strong>Processed Agricultural Goods:</strong> Shea butter, black soap, dried spices, sesame seeds, ginger, and cashew nuts.</li>
                <li><strong>Packaged African Food:</strong> Premium packaged flours, snacks (chin chin, plantain chips), and vacuum-sealed dry provisions.</li>
                <li><strong>Cosmetics &amp; Beauty:</strong> Natural hair growth oils, whipped shea butter, herbal skin creams, and organic soaps.</li>
              </ul>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <h4 className="font-bold text-emerald-950 text-sm mb-1">Benefit: The UK Developing Countries Trading Scheme (DCTS)</h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Under the UK DCTS framework introduced post-Brexit, Nigeria benefits from simplified rules of origin and preferential tariff treatment. Over 85% of qualifying non-oil tariff lines enter Great Britain with <strong>0% customs duties</strong>, giving Nigerian exporters a distinct competitive advantage over exporters from developed nations.
                </p>
              </div>
            </section>

            {/* Section 2: Step-by-Step Commercial Export Roadmap */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                2. Step-by-Step Commercial Export Roadmap
              </h2>

              <div className="space-y-4">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-secondary text-base mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                    Corporate Incorporation (CAC) &amp; NEPC Exporter Registration
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    Informal cross-border trade without corporate registration carries severe confiscation risks. You must operate as a registered Nigerian business:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2">
                    <li>Register a Limited Liability Company (Ltd) with the Corporate Affairs Commission.</li>
                    <li>Apply online for an Exporter Certificate via the <strong>Nigerian Export Promotion Council (NEPC)</strong> portal.</li>
                    <li>Certificate issuance takes 2–3 business days and is renewable annually.</li>
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-secondary text-base mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                    The Electronic Form NXP (CBN Single Window TRMS)
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    The Central Bank of Nigeria requires every commercial exporter to declare goods electronically:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2">
                    <li>Log onto the <strong>Trade Monitoring System (TRMS)</strong> via the Single Window portal.</li>
                    <li>Select Form NXP and submit your CAC, NEPC certificate, commercial proforma invoice, and bank details.</li>
                    <li>Your designated Nigerian commercial bank validates and approves the form.</li>
                    <li>The approved e-Form NXP is transmitted directly to Nigeria Customs Service for physical verification at air cargo export terminals.</li>
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-secondary text-base mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                    Commercial Invoicing with Harmonized System (HS) Codes
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    UK HM Revenue &amp; Customs (HMRC) requires precise documentation. Your Commercial Invoice must contain:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2">
                    <li>Detailed, unambiguous product descriptions (not generic "clothing" or "provisions").</li>
                    <li>6-digit or 8-digit international <strong>Harmonized System (HS) tariff classification codes</strong>.</li>
                    <li>Country of origin declaration: "Goods originate in Nigeria".</li>
                    <li>Unit quantities, net and gross weights, currency (GBP or USD), and Incoterms (e.g. DAP - Delivered at Place).</li>
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-secondary text-base mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">4</span>
                    Statutory Product Quality &amp; Phytosanitary Certifications
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    Depending on your export commodity, Nigerian regulatory agencies require inspection certificates:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2">
                    <li><strong>Agricultural produce &amp; plants:</strong> Phytosanitary Certificate issued by the Nigeria Agricultural Quarantine Service (NAQS).</li>
                    <li><strong>Processed foods &amp; cosmetics:</strong> Certificate of Quality / Export Clearance from NAFDAC.</li>
                    <li><strong>Manufactured goods:</strong> Standard Organisation of Nigeria (SON) conformity certification.</li>
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-secondary text-base mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">5</span>
                    UK Importer Clearance: GB EORI &amp; Customs Declaration Service (CDS)
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Your UK customer or business entity must be registered with HMRC:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 pl-2 mt-2">
                    <li>A <strong>GB EORI number</strong> is mandatory to clear goods through UK border controls.</li>
                    <li>UK customs clearance is processed electronically through the HMRC Customs Declaration Service (CDS).</li>
                    <li>Standard UK VAT (20%) is assessed unless the item is zero-rated (such as most essential human food items and children's apparel).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Shipping Modes Comparison */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                3. Choosing the Right Freight Option: Air vs Sea Freight
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                  <h3 className="font-bold text-secondary text-base mb-1 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-primary" /> Commercial Air Freight (Recommended)
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">Best for: Fashion, beauty, food samples, urgent orders</p>
                  <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                    <li><strong>Transit:</strong> 3–5 working days (Express) | 5–7 days (Standard)</li>
                    <li><strong>Minimum:</strong> 10kg for standard cargo (no minimum for express)</li>
                    <li><strong>Risk:</strong> Minimal risk of moisture damage or insect contamination</li>
                    <li><strong>Arrival:</strong> London Heathrow, Liverpool Hub, or doorstep delivery</li>
                  </ul>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                  <h3 className="font-bold text-secondary text-base mb-1 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-amber-600" /> Commercial Sea Freight (FCL / LCL)
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">Best for: Bulk raw commodities, heavy machinery, furniture</p>
                  <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                    <li><strong>Transit:</strong> 4 to 8 weeks port-to-port</li>
                    <li><strong>Minimum:</strong> 1 CBM (Cubic Meter) or full container load</li>
                    <li><strong>Risk:</strong> Extended sea voyage requires specialized silica desiccant bags</li>
                    <li><strong>Arrival:</strong> Felixstowe, Southampton, or Tilbury Port</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Common Commercial Export Pitfalls */}
            <section className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl not-prose space-y-3">
              <h3 className="text-xl font-bold text-red-950 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" /> 4 Costly Mistakes Made by Nigerian Exporters
              </h3>
              <ul className="text-sm text-red-900 space-y-2 list-disc list-inside">
                <li><strong>Vague Invoicing:</strong> Invoicing items simply as "African wares" or "Merchandise" results in immediate Border Force holds and penalties.</li>
                <li><strong>Attempting to Export Dried Beans:</strong> Commercial shipments of beans without official laboratory pesticide residue certificates will be seized and incinerated.</li>
                <li><strong>Inadequate Packaging:</strong> Using single-wall cartons that collapse under stacking pressure during international handling.</li>
                <li><strong>Ignoring UK VAT Thresholds:</strong> Failing to agree with the UK consignee whether freight is shipped DAP (buyer pays import duties/VAT) or DDP (sender pays).</li>
              </ul>
            </section>

            {/* Section 5: Why Partner With County Cargo */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Why Nigerian Commercial Exporters Choose County Cargo
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                County Cargo acts as your complete export department in Nigeria and your logistics partner in the UK:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-secondary text-sm">✓ Documentation Vetting</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    We review your invoices, packing lists, and HS codes before cargo leaves Nigeria to ensure 100% compliance.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-secondary text-sm">✓ Industrial Packaging &amp; Sealing</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    We provide export-grade palletising, vacuum sealing for dry foodstuffs, strapping, and heavy-duty boxing in Lagos.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-secondary text-sm">✓ UK Receiving Depot (Liverpool L1 0BG)</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Your UK commercial customers can collect directly from our warehouse or receive tracked pallet/parcel distribution.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-secondary text-sm">✓ Competitive Commercial Cargo Rates</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Discounted volumetric freight rates for recurring B2B exporters, fashion ateliers, and retail aggregators.
                  </p>
                </div>
              </div>
            </section>

            {/* CTAs */}
            <div className="p-6 bg-blue-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">Launch Your Commercial UK Export Pipeline</h3>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Speak directly with our trade compliance managers in Lagos, Abuja, or the UK to structure your export documentation and book scheduled air freight.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-nigeria-to-uk">Book Commercial Cargo</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a
                    href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20assistance%20with%20commercial%20export%20from%20Nigeria%20to%20the%20UK"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Trade Desk
                  </a>
                </Button>
              </div>
            </div>

            <SocialShare title="How to Export Goods From Nigeria to the UK: Complete Commercial Guide | County Cargo" />

            <RelatedGuides currentHref="/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide" />
          </div>
        </article>

        {/* FAQs */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Commercial Nigeria to UK Export</h2>
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
