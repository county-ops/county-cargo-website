import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Utensils, CheckCircle2, ArrowRight, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sending Food Products from Nigeria to the UK | DEFRA Packaging & Rules | County Cargo',
  description:
    'Complete UK customs and DEFRA guide for sending authentic Nigerian foodstuffs to the UK. Permitted dry items (fish, egusi, garri, ogbono, yam flour), vacuum sealing rules, and prohibited goods.',
  keywords:
    'sending food from Nigeria to UK, send foodstuffs to London, DEFRA food rules Nigeria UK, ship egusi ogbono garri to UK, vacuum seal African food shipping, County Cargo food shipping',
  alternates: {
    canonical: 'https://countycargo.com/blog/sending-food-products-from-nigeria-to-the-uk',
  },
  openGraph: {
    title: 'Sending Food Products from Nigeria to the UK | DEFRA Packaging & Rules | County Cargo',
    description:
      'Learn how to legally ship authentic Nigerian foodstuffs to the UK without border confiscation or customs delays.',
    url: 'https://countycargo.com/blog/sending-food-products-from-nigeria-to-the-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/service-nigeria-uk-enhanced.png',
        width: 1200,
        height: 630,
        alt: 'Sending authentic Nigerian food products to the United Kingdom',
      },
    ],
  },
};

export default function SendingFoodProductsNigeriaToUkPage() {
  const articleUrl = 'https://countycargo.com/blog/sending-food-products-from-nigeria-to-the-uk';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Sending Food Products from Nigeria to the UK: DEFRA Rules and Packaging Standards',
    description:
      'Comprehensive guide explaining which Nigerian foodstuffs are permitted into the UK, packaging protocols, and how County Cargo ensures smooth customs clearance.',
    image: 'https://countycargo.com/service-nigeria-uk-enhanced.png',
    datePublished: '2026-09-02T08:00:00+01:00',
    dateModified: '2026-09-03T08:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'County Cargo Food Freight Specialist',
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
            { label: 'Sending Food Products Nigeria to UK' },
          ]}
        />

        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
              <Utensils className="w-3.5 h-3.5" /> Food Logistics &amp; Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Sending Food Products from Nigeria to the UK: Rules, Packaging &amp; DEFRA Guidelines
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How to safely and legally ship dried fish, egusi, ogbono, garri, yam flour, and spices to family and customers across the UK.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Food Freight Specialist</span>
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
            <div className="p-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quick Answer: What Food Can You Ship to the UK?
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                You can legally ship commercially dried and processed plant-based food items and dried, boneless smoked fish into the United Kingdom under DEFRA regulations. Permitted items include garri, egusi, ogbono, yam flour (elubo), plantain flour, ground crayfish, dried bitterleaf, and sealed traditional seasonings. All items must be thoroughly dry, moisture-free, and vacuum-sealed. Fresh meats, poultry, bushmeat, and unpasteurized dairy are strictly prohibited and subject to immediate border seizure.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              1. Permitted Nigerian Food Items (Full Breakdown)
            </h2>
            <p>
              When booking through <Link href="/shipping-from-nigeria-to-uk" className="text-primary font-bold hover:underline">County Cargo’s Nigeria to UK shipping corridor</Link>, the following food items are accepted and cleared smoothly:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h3 className="font-bold text-secondary text-base flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Dried Fish &amp; Seafood
                </h3>
                <p className="text-xs text-slate-600">
                  Thoroughly smoked, dried, and boneless fish (e.g., catfish, stockfish pieces) and ground crayfish. Must be bone-dry with zero residual moisture.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h3 className="font-bold text-secondary text-base flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Flours &amp; Grains
                </h3>
                <p className="text-xs text-slate-600">
                  White and yellow garri, yam flour (elubo), plantain flour, cassava flour, packaged semolina, and ground melon seeds (egusi).
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h3 className="font-bold text-secondary text-base flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Seeds &amp; Soup Condiments
                </h3>
                <p className="text-xs text-slate-600">
                  Ogbono seeds, dawadawa (locust beans in sealed pouches), dried scent leaf, dried bitterleaf, utazi, and dried vegetables.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h3 className="font-bold text-secondary text-base flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Packaged Snacks &amp; Spices
                </h3>
                <p className="text-xs text-slate-600">
                  Chin-chin, plantain chips, kilishi (only commercially certified and shelf-stable where approved), and pepper soup spice blends.
                </p>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              2. Strict Packaging Rules &amp; Vacuum-Sealing Protocol
            </h2>
            <p>
              UK Border Force and airline cargo handlers reject foodstuffs that emit strong odors or leak in transit. To guarantee your package is accepted:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Vacuum Sealing:</strong> All fish, dried leaves, crayfish, and milled seeds must be vacuum-sealed in heavy-duty food bags. County Cargo provides free vacuum-sealing at our Lagos (Ladipo-Oshodi) and Abuja (Wuye Market) receiving hubs.
              </li>
              <li>
                <strong>Double-Layer Bagging:</strong> Flours (garri, elubo) should be placed in clear interior bags before being boxed.
              </li>
              <li>
                <strong>Sturdy Double-Wall Boxes:</strong> Avoid soft retail cartons. Use heavy-duty export boxes to prevent crushing under airline cargo pallets.
              </li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              3. Prohibited Food Items Under UK Law
            </h2>
            <div className="p-5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-900 space-y-2 not-prose">
              <div className="font-bold text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" /> Do NOT attempt to ship:
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fresh, raw, or frozen beef, goat meat, chicken, or pork</li>
                <li>Bushmeat, wild game, or uncertified animal carcasses</li>
                <li>Fresh dairy, raw milk, unpasteurized butter, or soft cheeses</li>
                <li>Live plants, soil, bulbs, or uncertified farming seeds</li>
              </ul>
            </div>

            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Ready to Send Foodstuffs to the UK?</h3>
                <p className="text-sm text-gray-600">Drop off at our Lagos or Abuja hub for professional vacuum sealing &amp; fast air cargo.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-nigeria-to-uk">
                  Ship Food to UK <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="Sending Food Products from Nigeria to the UK" />
            <RelatedGuides currentHref="/blog/sending-food-products-from-nigeria-to-the-uk" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
