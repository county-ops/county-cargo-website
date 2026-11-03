import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import {
  Calendar,
  User,
  Folder,
  ArrowLeft,
  PhoneCall,
  Calculator,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Clock,
  Share2,
} from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog-storage';
import { SHIP_COUNTY_CARGO_QUOTE_URL, SHIP_COUNTY_CARGO_URL } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | County Cargo',
    };
  }

  const canonicalUrl = `https://countycargo.com/blog/${slug}`;

  return {
    title: `${post.title} | County Cargo Shipping & Logistics`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: 'County Cargo',
      images: [
        {
          url: post.image || '/cargo-plane-hero.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publicationDate,
      authors: [post.author || 'County Cargo Logistics Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image || '/cargo-plane-hero.png'],
    },
  };
}

export default async function BlogPostDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `https://countycargo.com/blog/${slug}`,
    datePublished: post.publicationDate || '2026-01-01',
    dateModified: post.createdAt || post.publicationDate || '2026-01-01',
    image: post.image.startsWith('http') ? post.image : `https://countycargo.com${post.image}`,
    author: {
      '@type': 'Organization',
      name: post.author || 'County Cargo Logistics Team',
      url: 'https://countycargo.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'County Cargo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://countycargo.com/county-cargo-logo-transparent.png',
      },
    },
    inLanguage: 'en-GB',
    isPartOf: { '@id': 'https://countycargo.com/#website' },
  };

  // Simple Markdown-to-HTML parser for formatted paragraphs, headings, bullet lists, blockquotes, and tables
  const renderFormattedContent = (rawContent: string) => {
    if (!rawContent) return null;

    const lines = rawContent.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-4 space-y-2 pl-6 list-disc text-slate-700">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInlineFormatting(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Heading 2
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-2xl sm:text-3xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2"
          >
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
        return;
      }

      // Heading 3
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-3">
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
        return;
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="my-5 p-4 rounded-xl bg-blue-50/80 border-l-4 border-blue-600 text-blue-900 text-sm italic"
          >
            {parseInlineFormatting(trimmed.replace(/^>\s+/, ''))}
          </blockquote>
        );
        return;
      }

      // Bullet List item
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        inList = true;
        listItems.push(trimmed.replace(/^[-*]\s+/, ''));
        return;
      }

      // Table line
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList();
        // Skip separator row
        if (trimmed.includes('---')) return;
        const cells = trimmed
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        elements.push(
          <div key={`table-row-${index}`} className="my-1 overflow-x-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800">
              {cells.map((cell, cIdx) => (
                <div key={cIdx} className="font-medium">
                  {parseInlineFormatting(cell)}
                </div>
              ))}
            </div>
          </div>
        );
        return;
      }

      // Empty line
      if (!trimmed) {
        flushList();
        return;
      }

      // Standard paragraph
      flushList();
      elements.push(
        <p key={`p-${index}`} className="my-4 text-slate-700 leading-relaxed text-base sm:text-lg">
          {parseInlineFormatting(trimmed)}
        </p>
      );
    });

    flushList();
    return elements;
  };

  // Helper for **bold** and [link text](url)
  const parseInlineFormatting = (text: string) => {
    // Quick regex replacement
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <Link
            key={i}
            href={linkMatch[2]}
            className="text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            {linkMatch[1]}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Header />

      <main className="pt-16 bg-white min-h-screen">
        {/* Hero Section */}
        <section
          className="relative text-white py-14 sm:py-20"
          style={{
            background: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 64, 175, 0.8)), url('${post.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs text-blue-200 mb-4">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:underline">Blog</Link>
              <span>/</span>
              <span className="text-white truncate max-w-[200px]">{post.category}</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm mb-4">
              <Folder className="w-3.5 h-3.5" /> {post.category || 'Shipping Guide'}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-100">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-300" /> {post.author || 'County Cargo'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-300" /> {post.publicationDate || '2026'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-300" /> 4 Min Read
              </span>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Featured Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 mb-8 bg-slate-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {post.imageHint && (
            <p className="text-center text-xs text-slate-500 italic -mt-5 mb-8">
              {post.imageHint}
            </p>
          )}

          {/* Excerpt Lead */}
          <div className="bg-blue-50/60 p-5 sm:p-6 rounded-2xl border border-blue-100 mb-8 text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            {post.description}
          </div>

          {/* Formatted Content Body */}
          <div className="prose prose-blue max-w-none">
            {post.content ? (
              renderFormattedContent(post.content)
            ) : (
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                {post.description}
              </p>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1">Related Tags:</span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-1">
                Ready to Send Your Cargo?
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Calculate Rates &amp; Book Shipment</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                Fast air freight (5–10 days) and express courier (3–5 days) connecting Nigeria, UK, USA, and worldwide.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-semibold">
                <Link href={SHIP_COUNTY_CARGO_QUOTE_URL} className="flex items-center justify-center gap-2">
                  <Calculator className="w-4 h-4" /> Get Instant Quote
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <PhoneCall className="w-4 h-4" /> Contact Hub
                </Link>
              </Button>
            </div>
          </div>

          {/* Office Warehouses */}
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" /> County Cargo Drop-Off &amp; Receiving Centers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-600">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-slate-800">🇳🇬 Lagos Hub</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Ladipo-Oshodi, Lagos</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-slate-800">🇳🇬 Abuja Hub</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Wuye Market, Abuja</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-slate-800">🇬🇧 UK Hub</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Queens Dock, Liverpool</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-slate-800">🇺🇸 USA Hub</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Irving, Texas</p>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-10 text-center">
            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold">
                <ArrowLeft className="w-4 h-4" /> Back to All 104+ Shipping Guides
              </Link>
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
