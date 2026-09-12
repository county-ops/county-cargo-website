import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { FileText, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documents Required for Exporting Goods from Nigeria to the UK | County Cargo',
  description:
    'Comprehensive guide on export documentation in Nigeria: Form NXP, NEPC certificate, commercial invoices, packing lists, and DEFRA UK foodstuff compliance.',
  keywords:
    'documents required export Nigeria, Form NXP Nigeria, NEPC export certificate, export food from Nigeria to UK, export documentation Lagos, Nigeria customs export guidelines',
  alternates: {
    canonical: 'https://countycargo.com/blog/documents-required-for-exporting-goods-from-nigeria',
  },
  openGraph: {
    title: 'Documents Required for Exporting Goods from Nigeria to the UK | County Cargo',
    description:
      'Understand the exact paperwork needed to legally export commercial goods, African foodstuffs, and personal cargo from Nigeria to the UK.',
    url: 'https://countycargo.com/blog/documents-required-for-exporting-goods-from-nigeria',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/images/blog/nigeria-export-documents-certification.jpg',
        width: 1200,
        height: 675,
        alt: 'Export documentation and certification for shipments from Nigeria to the UK',
      },
    ],
  },
};

export default function DocumentsRequiredForExportingGoodsPage() {
  const articleUrl = 'https://countycargo.com/blog/documents-required-for-exporting-goods-from-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Documents Required for Exporting Goods from Nigeria to the UK',
    description:
      'Step-by-step regulatory breakdown of documentation needed for exporting commercial merchandise, agricultural foodstuffs, and personal effects from Nigeria to the UK.',
    image: 'https://countycargo.com/images/blog/nigeria-export-documents-certification.jpg',
    datePublished: '2026-09-01T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Trade & Compliance Advisor',
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
            { label: 'Export Documents Nigeria to UK' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <FileText className="w-3.5 h-3.5" /> Export Compliance &amp; Trade Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Documents Required for Exporting Goods from Nigeria to the UK
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Everything Nigerian exporters, fashion brands, and individuals need to know about Form NXP, NEPC registration, phytosanitary certificates, and UK customs clearance.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Trade Advisor</span>
              <span>•</span>
              <span>Published September 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            {/* Quick Answer Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Direct Answer: What Documents Do You Need?
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                For personal luggage and small parcels, only a detailed packing list and sender/recipient identification are required. For commercial trade and wholesale exports from Nigeria to the UK, businesses require an electronic Form NXP (via the Trade Monitoring System), an active NEPC Export Certificate, an itemized Commercial Invoice with HS Tariff Codes, a Packing List, and relevant quality or phytosanitary certificates for agricultural food items.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              1. Commercial Exports vs. Personal Effects: Key Differences
            </h2>
            <p>
              When sending shipments via <Link href="/shipping-from-nigeria-to-uk" className="text-primary font-bold hover:underline">County Cargo’s Nigeria to UK air freight service</Link>, paperwork requirements depend on whether the shipment is classified as personal effects or formal commercial trade.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" /> Personal Belongings &amp; Family Food
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Valid Government ID of Sender (NIN / Passport)</li>
                  <li>• UK Recipient Full Name, Address &amp; Contact Number</li>
                  <li>• Itemized contents declaration list</li>
                  <li>• Proof of vacuum-sealing for dried food items</li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-secondary text-lg mb-2 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> Commercial &amp; Wholesale Cargo
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Form NXP (e-Form NXP via authorized bank)</li>
                  <li>• NEPC (Nigerian Export Promotion Council) Certificate</li>
                  <li>• Certified Commercial Invoice &amp; Packing List</li>
                  <li>• HS Codes (Harmonized System tariff classification)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              2. Understanding the Electronic Form NXP
            </h2>
            <p>
              The <strong>Form NXP (Nigeria Export Proceeds)</strong> is a statutory regulatory document mandated by the Central Bank of Nigeria (CBN) and Nigeria Customs Service for commercial export transactions. Exporters register the form electronically through the Single Window for Trade portal, which is processed by their authorized commercial bank before goods depart Murtala Muhammed International Airport or Apapa Port.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              3. Nigerian Export Promotion Council (NEPC) Certificate
            </h2>
            <p>
              Any registered Nigerian business intending to export agricultural produce, cosmetics, textiles, or handcrafted goods must hold a valid NEPC registration. Having an NEPC certificate ensures seamless customs clearance at Lagos and prevents unapproved commercial cargo holds.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              4. DEFRA &amp; UK Border Force Requirements for Foodstuffs
            </h2>
            <p>
              The UK Department for Environment, Food &amp; Rural Affairs (DEFRA) strictly regulates the entry of food and plant materials. When exporting dry Nigerian foodstuffs (such as smoked fish, egusi, ogbono, garri, and yam flour):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All dried fish must be thoroughly smoked, boneless, and moisture-free.</li>
              <li>Grains, flours, and seeds must be vacuum-sealed in food-grade airtight pouches.</li>
              <li>Fresh, unpasteurized meat, poultry, and dairy products are strictly prohibited under UK border laws.</li>
            </ul>

            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Need Assistance with Nigeria-to-UK Export Logistics?</h3>
                <p className="text-sm text-gray-600">Our compliance officers guide you through documentation and fast air freight.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-uk">
                  View UK Route Rates <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Documents Required for Exporting Goods from Nigeria to the UK" />
            <RelatedGuides currentHref="/blog/documents-required-for-exporting-goods-from-nigeria" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
