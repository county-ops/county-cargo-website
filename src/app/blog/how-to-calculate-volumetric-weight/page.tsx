import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import { Scale, CheckCircle2, ArrowRight, Calculator } from 'lucide-react';
import { Faq } from './faq';

export const metadata: Metadata = {
  title: 'How to Calculate Volumetric Weight for Air Cargo | Formula Guide',
  description: 'Learn how dimensional volumetric weight is calculated for air freight to Nigeria using the (L x W x H) / 5000 formula. Avoid unexpected freight charges.',
  keywords: 'volumetric weight formula air cargo, dimensional weight calculator Nigeria, how volumetric weight works, air freight chargeable weight',
  alternates: {
    canonical: 'https://countycargo.com/blog/how-to-calculate-volumetric-weight',
  },
  openGraph: {
    title: 'How to Calculate Volumetric Weight for Air Cargo | Formula Guide',
    description: 'Learn how dimensional volumetric weight is calculated for air freight to Nigeria using the (L x W x H) / 5000 formula.',
    images: [{ url: 'https://countycargo.com/images/blog/air-cargo-volumetric-weight-guide.jpg', alt: 'Measuring box dimensions with tape measure for volumetric weight' }],
  },
};

export default function HowToCalculateVolumetricWeightPost() {
  const articleUrl = 'https://countycargo.com/blog/how-to-calculate-volumetric-weight';
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Calculate Volumetric Weight for Air Cargo',
    description: 'Master the air cargo volumetric weight formula with step-by-step examples and tips to minimize dimensional weight charges on Nigeria cargo.',
    image: 'https://countycargo.com/images/blog/air-cargo-volumetric-weight-guide.jpg',
    datePublished: '2026-08-29T08:00:00+01:00',
    dateModified: '2026-08-29T08:00:00+01:00',
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
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'How to Calculate Volumetric Weight' },
          ]}
        />

        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(15, 23, 42, 0.92)), url('/images/blog/air-cargo-volumetric-weight-guide.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Calculator className="w-3.5 h-3.5" /> Air Freight Formula Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              How to Calculate Volumetric Weight for Air Cargo
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              Understand the difference between actual scale weight and dimensional volumetric weight for air freight to Nigeria.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mt-6">
              <span>By County Cargo Operations Team</span>
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
                <CheckCircle2 className="w-4 h-4" /> Quick Summary: Volumetric Weight Formula
              </h2>
              <p className="text-base sm:text-lg text-secondary font-medium leading-relaxed">
                The air freight volumetric weight formula is: <strong>Volumetric Weight (kg) = (Length x Width x Height in cm) / 5000</strong>. Airlines compare actual scale weight against volumetric weight and bill the higher figure as the "chargeable weight".
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary pt-4">
              Practical Volumetric Weight Example
            </h2>
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 not-prose">
              <h3 className="font-bold text-secondary text-lg">Example Box Dimensions:</h3>
              <p className="text-sm text-gray-700">Box dimensions: 50 cm (L) x 40 cm (W) x 40 cm (H)</p>
              <p className="text-sm font-mono text-primary font-bold">Volume = 50 x 40 x 40 = 80,000 cm³</p>
              <p className="text-sm font-mono text-primary font-bold">Volumetric Weight = 80,000 / 5000 = 16.0 kg</p>
              <p className="text-xs text-gray-600">If actual scale weight is 10 kg, the chargeable weight is <strong>16 kg</strong>. If actual scale weight is 20 kg, the chargeable weight is <strong>20 kg</strong>.</p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 my-8">
              <div>
                <h3 className="font-bold text-secondary text-lg">Need help calculating your parcel weight?</h3>
                <p className="text-sm text-gray-600">Enter box dimensions into our delivery quote tool for an instant calculation.</p>
              </div>
              <Button asChild className="bg-primary text-white font-bold shrink-0">
                <Link href="/shipping-from-uk-to-nigeria">
                  Calculate Chargeable Weight <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <SocialShare title="How to Calculate Volumetric Weight for Air Cargo" />

            <RelatedGuides currentHref="/blog/how-to-calculate-volumetric-weight" />
          </div>
        </article>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
