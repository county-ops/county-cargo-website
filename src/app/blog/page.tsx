
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogPostCard } from '@/components/blog-post-card';
import blogPosts from '@/lib/blog-posts.json';

export const metadata: Metadata = {
  title: 'Shipping & Cargo Blog | County Cargo Guides & Insights',
  description: 'Latest news, rate updates, customs regulations, and step-by-step guides on international shipping between Nigeria, the UK, the USA, and worldwide.',
  alternates: {
    canonical: 'https://countycargo.com/blog',
  },
  openGraph: {
    title: 'Shipping & Cargo Blog | County Cargo Guides & Insights',
    description: 'Latest news, rate updates, customs regulations, and step-by-step guides on international shipping between Nigeria, the UK, the USA, and worldwide.',
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
    description: 'Latest news, rate updates, and shipping guides from County Cargo.',
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
            background: `linear-gradient(rgba(30, 64, 175, 0.5), rgba(31, 41, 55, 0.6)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold hero-text-glow">From Our Blog</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto hero-text-glow">Latest news, insights, and guides from the logistics world.</p>
          </div>
        </section>
        
        <section id="blog-posts" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <BlogPostCard key={index} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
