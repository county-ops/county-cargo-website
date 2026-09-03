import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, Scale, ArrowRight, Truck, Building2 } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Nigeria Customs Clearance Guide for Air & Sea Cargo | County Cargo',
  description:
    'Complete guide to Nigeria Customs clearance for UK and US shippers. Learn about Form M, PAAR documentation, duty rates, HS codes, and smooth clearing at Lagos ports.',
  keywords:
    'Nigeria customs clearance, Form M Nigeria, PAAR customs clearance, customs duty Nigeria, air cargo clearance Lagos, sea freight customs clearing Apapa, Nigeria Customs Service rules',
  alternates: {
    canonical: 'https://countycargo.com/blog/nigeria-customs-clearance-guide',
  },
};

export default function NigeriaCustomsClearanceGuidePost() {
  const articleUrl = 'https://countycargo.com/blog/nigeria-customs-clearance-guide';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Nigeria Customs Clearance Guide for Air and Sea Cargo',
    description:
      'Step-by-step breakdown of Nigeria Customs clearance procedures for air and ocean freight. Includes Form M requirements, PAAR processing, duty calculation rules, and expert tips for fast release.',
    image: 'https://countycargo.com/blog-9-nigeria-cargo-august-2026.jpg',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
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
        url: 'https://countycargo.com/county-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does Nigeria Customs clearance take at Lagos airport or port?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Air cargo clearance at Lagos airport takes 24–48 hours for complete documentation. Sea cargo clearance at Apapa or Tin Can ports takes 3–7 working days.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Form M and do I need it for personal cargo to Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Form M is an official import registration document required by the Central Bank of Nigeria for commercial imports valued above $10,000 USD. Personal door-to-door cargo handled by County Cargo is cleared under consolidated clearing manifests.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={[blogPostingSchema, faqSchema]} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'Nigeria Customs Clearance Guide' },
          ]}
        />

        {/* HERO HEADER */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Customs &amp; Compliance Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Nigeria Customs Clearance Guide for Air &amp; Sea Cargo
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Everything UK and US shippers need to know about Form M, PAAR documentation, import duties, and hassle-free clearing in Lagos.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Logistics Team</span>
              <span>•</span>
              <span>Updated: 29 August 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        {/* CONTENT BODY */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            {/* FEATURED SNIPPET / AI OVERVIEW BOX */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Direct Summary: How Nigeria Customs Clearance Works
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Nigeria Customs clearance requires matching declared cargo against packing lists, commercial invoices, and tariff HS codes. Air cargo arriving at Lagos Airport (LOS) is cleared within 24 to 48 hours, while sea freight at Apapa or Tin Can Island takes 3 to 7 working days. County Cargo handles full door-to-door customs clearing for UK and US shipments, absorbing routine inspection procedures into consolidated manifest declarations.
              </p>
            </div>

            <p className="text-lg text-gray-700">
              Navigating international shipping regulations can seem overwhelming, especially when sending goods into West Africa’s largest economy. Whether you are shipping personal belongings, commercial merchandise, or heavy machinery from the UK or United States, understanding the Nigeria Customs Service (NCS) process is key to avoiding delays, demurrage, and unexpected fees.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2 pt-4">
              <FileText className="w-6 h-6 text-primary" /> Key Documents Required for Nigeria Customs Clearance
            </h2>
            <p>
              To ensure fast clearance through Nigerian ports and airport cargo terminals, proper documentation must be completed prior to vessel or aircraft arrival:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              | Document | Applicable Cargo | Purpose |
              | :--- | :--- | :--- |
              | **Airway Bill (AWB) / Bill of Lading (B/L)** | Air &amp; Ocean Cargo | Master transport contract and ownership title |
              | **Commercial Invoice &amp; Packing List** | All Shipments | Itemized declaration of cargo values, weights, and descriptions |
              | **Form M** | Commercial shipments &gt;$10,000 | Mandatory CBN import registration number |
              | **Pre-Arrival Assessment Report (PAAR)** | Formal Commercial Freight | Customs risk assessment tool determining inspection channels |
              | **SONCAP / NAFDAC Certificate** | Regulated Goods &amp; Food | Standards Organization of Nigeria / Food &amp; Drug safety clearance |
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Step-by-Step Nigeria Customs Clearing Process
            </h2>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Pre-Arrival Manifest Filing:</strong> Prior to cargo landing, County Cargo submits cargo manifests electronically to the Nigeria Customs Integrated System (NICIS II).
              </li>
              <li>
                <strong>Customs Assessment &amp; Inspection Channeling:</strong> Shipments are processed through PAAR and routed via Green (fast clearance), Yellow (document verification), or Red Channel (physical container examination).
              </li>
              <li>
                <strong>Duty Assessment &amp; Tariff Payment:</strong> Import duty, VAT (7.5%), and port levies are calculated based on the CIF (Cost, Insurance, Freight) value.
              </li>
              <li>
                <strong>Terminal Release &amp; Door-to-Door Delivery:</strong> Once duties are confirmed and terminal charges cleared, cargo is released for final delivery across Lagos, Abuja, Port Harcourt, and nationwide.
              </li>
            </ol>

            {/* DUTY ESTIMATION TABLE */}
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Standard Nigeria Import Duty &amp; Levy Structure
            </h2>
            <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-2xs">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-secondary font-bold text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-3">Cargo Category</th>
                    <th className="p-3">Standard Duty Rate</th>
                    <th className="p-3">VAT &amp; Surcharges</th>
                    <th className="p-3">Typical Processing Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-semibold">Personal Effects &amp; Clothes</td>
                    <td className="p-3">0% – 10% (Consolidated)</td>
                    <td className="p-3">7.5% VAT</td>
                    <td className="p-3">24 – 48 Hours (Air)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Laptops &amp; Smartphones</td>
                    <td className="p-3">5% – 10%</td>
                    <td className="p-3">7.5% VAT + Levy</td>
                    <td className="p-3">24 – 48 Hours (Air)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Commercial Merchandise</td>
                    <td className="p-3">10% – 35% (by HS Code)</td>
                    <td className="p-3">7.5% VAT + CISS + ETLS</td>
                    <td className="p-3">3 – 5 Days (Sea)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* EDITORIAL COMPLIANCE NOTE */}
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-950 text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Editorial Disclaimer:</strong> Customs regulations, tariffs, and duty rates in Nigeria are set by the Federal Ministry of Finance and the Nigeria Customs Service (NCS) and are subject to revision. Official duty calculations are determined at the port of entry.
              </div>
            </div>

            {/* LINK TO PILLAR PAGE */}
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 my-8">
              <div>
                <h3 className="text-lg font-bold text-secondary">Need to ship cargo from the UK or US to Nigeria?</h3>
                <p className="text-sm text-gray-600">Read our master pillar guide covering air, sea, rates, and transit times.</p>
              </div>
              <Button asChild className="bg-primary text-white hover:bg-blue-700 font-bold shrink-0">
                <Link href="/shipping-to-nigeria">
                  View Master Shipping Guide <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Nigeria Customs Clearance Guide for Air & Sea Cargo" />

            <RelatedGuides currentHref="/blog/nigeria-customs-clearance-guide" />
          </div>
        </article>

        {/* FAQS */}
        <Faq />
      </main>
      <Footer />
    </>
  );
}
