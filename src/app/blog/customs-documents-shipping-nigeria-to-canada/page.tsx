import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'Customs Documents Needed to Ship from Nigeria to Canada',
  description: 'Essential checklist of export documentation required by the Canada Border Services Agency (CBSA) and Nigerian authorities including Commercial Invoice, NEPC, and packing lists.',
  keywords: 'Canada customs documents Nigeria export, CBSA clearance paperwork Lagos, NEPC registration Canada, commercial invoice Nigeria to Canada',
  alternates: {
    canonical: 'https://countycargo.com/blog/customs-documents-shipping-nigeria-to-canada',
  },
};

export default function CustomsDocumentsCanadaPost() {
  const articleUrl = 'https://countycargo.com/blog/customs-documents-shipping-nigeria-to-canada';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Customs Documents Needed to Ship from Nigeria to Canada',
    description: 'Complete documentation guide for exporting goods from Nigeria to Canada under CBSA regulations.',
    image: 'https://countycargo.com/canada-customs-documents.jpg',
    datePublished: '2026-08-30T08:00:00+01:00',
    dateModified: '2026-08-30T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Compliance Specialist',
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
            { label: 'Customs Documents for Canada Shipping' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <FileText className="w-3.5 h-3.5" /> CBSA Customs Documentation
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Customs Documents Needed to Ship from Nigeria to Canada
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Prepare error-free paperwork for Canada Border Services Agency (CBSA) and Nigerian Customs clearance.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Compliance Specialist</span>
              <span>•</span>
              <span>30 August 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Required Export Paperwork
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                To ship cargo from Nigeria to Canada, you need: <strong>1) Commercial Invoice / Valued Packing List</strong>, <strong>2) Airway Bill (AWB)</strong>, <strong>3) Sender &amp; Recipient Identification</strong> (Government ID / Passport), and <strong>4) CFIA Certificates</strong> for regulated plant and processed food items.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Need help with Canada export clearance paperwork?</h3>
                <p className="text-sm text-gray-600">Our compliance team reviews your invoices and declarations before dispatch.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-canada">
                  Visit Canada Route Hub <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Customs Documents Needed to Ship from Nigeria to Canada" />

            <RelatedGuides currentHref="/blog/customs-documents-shipping-nigeria-to-canada" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
