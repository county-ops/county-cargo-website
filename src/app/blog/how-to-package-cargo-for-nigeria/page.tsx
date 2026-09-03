import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Box, CheckCircle2, ArrowRight } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'How to Package Cargo for Shipping to Nigeria | Packing Guide',
  description: 'Expert advice on choosing heavy-duty double-wall boxes, bubble wrap cushioning, H-taping, labeling, and protecting fragile goods bound for Nigeria.',
  keywords: 'how to package cargo Nigeria, box packing shipping London to Lagos, double wall boxes freight, packing guidelines air cargo',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-to-package-cargo-for-nigeria',
  },
  openGraph: {
    title: 'How to Package Cargo for Shipping to Nigeria | Packing Guide',
    description: 'Master international freight packing techniques to protect your personal effects and commercial goods during transit to Nigeria.',
    images: [{ url: 'https://countycargo.com/nigeria-market-packing-enhanced.png', alt: 'Bubble wrap cardboard box strapping heavy duty packing cargo Nigeria' }],
  },
};

export default function HowToPackageCargoForNigeriaPost() {
  const articleUrl = 'https://countycargo.com/blog/how-to-package-cargo-for-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Package Cargo for Shipping to Nigeria',
    description: 'Master international freight packing techniques to protect your personal effects and commercial goods during transit to Nigeria.',
    image: 'https://countycargo.com/nigeria-market-packing-enhanced.png',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Packaging Specialist',
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
            { label: 'How to Package Cargo for Nigeria' },
          ]}
        />

        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(15, 23, 42, 0.92)), url('/nigeria-market-packing-enhanced.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Box className="w-3.5 h-3.5" /> Cargo Packaging Masterclass
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Package Cargo for Shipping to Nigeria
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Prevent box crushing, moisture damage, and transit shocks with professional international packing guidelines.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Packaging Specialist</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Packaging Rules
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Always use heavy-duty double-walled cardboard boxes, wrap fragile items in bubble wrap, fill all internal voids with packing materials, tape seams securely using the H-taping method, and attach clear destination labels showing recipient details and phone numbers in Nigeria.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Need professional boxes or crating services in the UK?</h3>
                <p className="text-sm text-gray-600">Contact County Cargo for packing materials or depot drop-off assistance.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Book Cargo Dispatch <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How to Package Cargo for Shipping to Nigeria" />

            <RelatedGuides currentHref="/blog/how-to-package-cargo-for-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
