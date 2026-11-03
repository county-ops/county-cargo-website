import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogPostGrid } from '@/components/blog-post-grid';
import blogPosts from '@/lib/blog-posts.json';

export const metadata: Metadata = {
  title: 'Shipping & Cargo Blog | County Cargo Guides & Insights',
  description:
    'Complete index of all international cargo and shipping guides. Rates, flight schedules, packaging rules, customs regulations, and door-to-door delivery between Nigeria, the UK, the USA, and worldwide.',
  alternates: {
    canonical: 'https://countycargo.com/blog',
  },
  openGraph: {
    title: 'Shipping & Cargo Blog | County Cargo Guides & Insights',
    description:
      'Complete index of international shipping guides: Nigeria to UK, Nigeria to USA, UK to Lagos/Abuja, barrels, and customs clearance regulations.',
    url: 'https://countycargo.com/blog',
    siteName: 'County Cargo',
    images: [
      {
        url: '/cargo-plane-hero.png',
        width: 1200,
        height: 630,
        alt: 'County Cargo Shipping & Logistics Blog',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping & Cargo Blog | County Cargo Guides & Insights',
    description: 'Browse all 104+ cargo guides, route rates, and international shipping insights.',
    images: ['/cargo-plane-hero.png'],
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section
          className="min-h-[40vh] flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(rgba(30, 64, 175, 0.65), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16" data-aos="fade-up">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Knowledge Hub &bull; {blogPosts.length} Published Shipping Guides
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold hero-text-glow">
              County Cargo Shipping &amp; Logistics Guides
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow text-blue-100">
              Browse our complete library of verified route pricing, DEFRA &amp; FDA customs regulations, packaging advice, and international cargo updates.
            </p>
          </div>
        </section>

        <section id="blog-posts" className="py-12 sm:py-16 bg-white min-h-[60vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogPostGrid posts={blogPosts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
