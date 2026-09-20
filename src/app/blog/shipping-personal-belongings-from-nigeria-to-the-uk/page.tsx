import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { ShoppingBag, CheckCircle2, ArrowRight, ShieldCheck, Box, UserCheck, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Personal Belongings from Nigeria to the UK | Relocation & Luggage | County Cargo',
  description:
    'Complete guide for students, families, and professionals shipping personal effects, traditional clothing, books, and excess luggage from Lagos and Abuja to the UK.',
  keywords:
    'shipping personal belongings Nigeria to UK, send luggage Lagos to London, relocate from Nigeria to UK cargo, student excess baggage shipping Nigeria UK, County Cargo personal effects',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-personal-belongings-from-nigeria-to-the-uk',
  },
  openGraph: {
    title: 'Shipping Personal Belongings from Nigeria to the UK | Relocation & Luggage | County Cargo',
    description:
      'How to ship your personal luggage, traditional wear, books, and household effects from Nigeria to the UK without paying commercial import taxes.',
    url: 'https://countycargo.com/blog/shipping-personal-belongings-from-nigeria-to-the-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/shipping-personal-belongings-nigeria-uk.jpg',
        width: 1200,
        height: 630,
        alt: 'Shipping personal luggage and clothing from Nigeria to the UK',
      },
    ],
  },
};

export default function ShippingPersonalBelongingsNigeriaToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/shipping-personal-belongings-from-nigeria-to-the-uk';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Shipping Personal Belongings from Nigeria to the UK: Relocation & Excess Baggage Guide',
    description:
      'Practical advice for students, families, and individuals sending personal effects, traditional clothing, books, and luggage from Nigeria to UK addresses.',
    image: 'https://countycargo.com/shipping-personal-belongings-nigeria-uk.jpg',
    datePublished: '2026-09-02T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Relocation Specialist',
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
            { label: 'Shipping Personal Belongings Nigeria to UK' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <ShoppingBag className="w-3.5 h-3.5" /> Relocation &amp; Excess Luggage Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Shipping Personal Belongings from Nigeria to the UK
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Cost-effective air freight for excess baggage, traditional attire, books, and household goods from Lagos and Abuja to all UK destinations.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Relocation Team</span>
              <span>•</span>
              <span>Published September 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            {/* Direct Answer Box */}
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Answer: How to Ship Personal Belongings to the UK?
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                Shipping personal effects and excess luggage via air freight with County Cargo is up to 70% cheaper than paying commercial airline excess baggage fees at the airport check-in counter. Items are dropped off at our Lagos (Ladipo-Oshodi) or Abuja (Wuye Market) depot, packed and weighed, flown on scheduled air freighters to London or Manchester, and delivered directly to your UK residence in 5–10 working days with full tracking.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              1. Who Uses Personal Belongings Freight?
            </h2>
            <p>
              Through our <Link href="/shipping-from-nigeria-to-uk" className="text-primary font-bold hover:underline">dedicated Nigeria to UK cargo service</Link>, we regularly move:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>International Students:</strong> University students heading to London, Manchester, Birmingham, Leeds, or Liverpool who need to send study books, bedding, and winter clothing ahead of term.</li>
              <li><strong>Relocating Professionals &amp; Families:</strong> High-volume wardrobes, personal electronics, sentimental keepsakes, and household effects.</li>
              <li><strong>Event Attendees:</strong> Traditional African wedding attire (aso-ebi, ankara lace, agbada, headgear, beads) for UK celebrations.</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              2. How to Avoid UK Import Duties on Personal Effects (ToR Relief)
            </h2>
            <p>
              Under UK HMRC rules, individuals relocating their permanent home to the United Kingdom can apply for <strong>Transfer of Residence (ToR01) relief</strong>, exempting used personal belongings and household goods from UK Customs Duty and VAT.
            </p>
            <p>
              To qualify, goods must have been owned and used by you for at least 6 months prior to departure. For students or short-stay visitors, standard personal effects declarations apply with zero commercial documentation overhead.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              3. Packing Tips for Clothes and Personal Effects
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Use Vacuum Storage Bags:</strong> Compressing bulky clothing, duvet covers, and traditional lace fabrics significantly reduces volumetric weight.</li>
              <li><strong>Heavy Items at the Bottom:</strong> Pack books, shoes, and dense items at the bottom of the carton.</li>
              <li><strong>Reinforce with Quality Tape:</strong> Seal all box seams in an 'H' pattern using heavy-duty shipping tape.</li>
            </ul>

            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Shipping Your Excess Luggage to the UK?</h3>
                <p className="text-sm text-gray-600">Get a transparent per-kg quote and save on airline excess baggage charges.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-uk">
                  Get Shipping Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Shipping Personal Belongings from Nigeria to the UK" />
            <RelatedGuides currentHref="/blog/shipping-personal-belongings-from-nigeria-to-the-uk" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
