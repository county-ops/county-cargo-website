import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Laptop, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Zap, Box } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'How to Ship Electronics from UK to Nigeria Safely | County Cargo',
  description: 'Expert guide to shipping laptops, iPhones, TVs, and household electronics from London, Liverpool, and the UK to Nigeria. Covers lithium battery rules, packaging, and customs.',
  keywords: 'ship electronics to Nigeria, ship laptop UK to Nigeria, ship iPhone Lagos, send TV to Nigeria, lithium battery cargo UK Nigeria, electronics shipping customs',
  alternates: {
    canonical: 'https://countycargo.com/blog/shipping-electronics-uk-to-nigeria',
  },
};

export default function ShippingElectronicsUkToNigeriaPost() {
  const articleUrl = 'https://countycargo.com/blog/shipping-electronics-uk-to-nigeria';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Ship Electronics from the UK to Nigeria Safely',
    description: 'Complete guide for shipping high-value electronics, laptops, smartphones, and home appliances from the UK to Nigeria. Packed with lithium battery rules, anti-shock packaging tips, and customs guidelines.',
    image: 'https://countycargo.com/blog-5-uk-shopping.png',
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
            { label: 'Shipping Electronics UK to Nigeria' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Laptop className="w-3.5 h-3.5" /> High-Value Cargo Packaging &amp; Shipping Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Ship Electronics from the UK to Nigeria Safely
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Step-by-step advice on packing, lithium battery compliance, shockproofing, and customs clearing for laptops, phones, and appliances.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Packaging Specialist</span>
              <span>•</span>
              <span>29 August 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </section>

        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-8">
            <div className="p-6 bg-blue-50 border-l-4 border-primary rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Shipping Electronics Safely
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                To ship electronics safely from the UK to Nigeria, devices must be powered down, padded with high-density anti-static bubble wrap, and packed in double-walled corrugated boxes. Laptops and smartphones with built-in lithium batteries can be sent via air cargo under IATA Section II rules, but standalone power banks are prohibited on cargo planes. County Cargo offers insured express air freight with door delivery in Lagos, Abuja, and nationwide.
              </p>
            </div>

            <p className="text-lg text-gray-700">
              Electronics represent some of the most frequently shipped items from the UK to Nigeria. Whether you are sending a gift laptop to family in Lagos, purchasing refurbished MacBooks for a software startup in Abuja, or shipping television screens to Port Harcourt, proper packaging and regulatory compliance are essential to prevent damage or airport delays.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2 pt-4">
              <Zap className="w-6 h-6 text-amber-500" /> IATA Lithium Battery Rules for Air Cargo
            </h2>
            <p>
              The International Air Transport Association (IATA) enforces strict safety regulations regarding lithium-ion batteries on commercial and cargo aircraft:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <h3 className="font-bold text-emerald-900 flex items-center gap-2 text-base mb-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Permitted in Cargo
                </h3>
                <ul className="text-xs sm:text-sm text-emerald-800 space-y-1">
                  <li>• Laptops with internal battery installed</li>
                  <li>• iPhones &amp; Android smartphones</li>
                  <li>• Tablets &amp; iPads inside device</li>
                  <li>• Smartwatches &amp; wireless earbuds</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="font-bold text-red-900 flex items-center gap-2 text-base mb-1">
                  <AlertTriangle className="w-5 h-5 text-red-600" /> Prohibited on Aircraft
                </h3>
                <ul className="text-xs sm:text-sm text-red-800 space-y-1">
                  <li>• Standalone power banks &amp; external battery packs</li>
                  <li>• Loose spare lithium-ion cells</li>
                  <li>• Damaged or swollen lithium batteries</li>
                  <li>• Electric scooters &amp; hoverboards</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2 pt-4">
              <Box className="w-6 h-6 text-primary" /> Step-by-Step Electronics Packaging Checklist
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li><strong>Power Off Completely:</strong> Ensure all laptops, phones, and devices are fully turned off (not in sleep mode) to prevent accidental activation.</li>
              <li><strong>Anti-Static Wrap:</strong> Wrap electronic circuit boards and screens in anti-static bubble wrap to protect against electrostatic discharge.</li>
              <li><strong>Double-Walled Outer Box:</strong> Place padded electronics into a heavy-duty double-walled cardboard shipping box, leaving 2 inches of cushioning space on all sides.</li>
              <li><strong>Fill Void Space:</strong> Fill all box voids with packing peanuts or air pillows so the item cannot shift when shaken.</li>
              <li><strong>H-Taping Technique:</strong> Seal all box seams with heavy-duty 2-inch shipping tape using the H-taping method along top and bottom edges.</li>
            </ol>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Need to ship laptops or phones from the UK to Nigeria?</h3>
                <p className="text-sm text-gray-600">Get your free UK shipping address and standard £6.00/kg air freight rates.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Ship Electronics Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How to Ship Electronics from the UK to Nigeria Safely" />

            <RelatedGuides currentHref="/blog/shipping-electronics-uk-to-nigeria" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
