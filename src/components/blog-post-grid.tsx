'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Sparkles, Filter, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { BlogPostCard, type BlogPost } from './blog-post-card';

interface BlogPostGridProps {
  posts: BlogPost[];
}

type CategoryTab =
  | 'All'
  | 'Nigeria to UK'
  | 'Nigeria to USA'
  | 'UK to Nigeria'
  | 'USA to Nigeria'
  | 'Global Routes'
  | 'Customs & Guides';

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<CategoryTab>('All');
  const [visibleCount, setVisibleCount] = useState(24);

  // Categorization helper
  const categorizePost = (post: BlogPost): CategoryTab => {
    const text = (
      (post.title || '') +
      ' ' +
      (post.url || '') +
      ' ' +
      (post.category || '') +
      ' ' +
      (post.tags || []).join(' ')
    ).toLowerCase();

    if (
      text.includes('nigeria to uk') ||
      text.includes('lagos to london') ||
      text.includes('abuja to uk') ||
      text.includes('cargo-lagos-to-london') ||
      text.includes('cargo-abuja-to-london')
    ) {
      return 'Nigeria to UK';
    }
    if (
      text.includes('nigeria to usa') ||
      text.includes('nigeria to us') ||
      text.includes('lagos to houston') ||
      text.includes('abuja to usa') ||
      text.includes('america')
    ) {
      return 'Nigeria to USA';
    }
    if (
      text.includes('uk to nigeria') ||
      text.includes('london to') ||
      text.includes('liverpool to') ||
      text.includes('manchester') ||
      text.includes('birmingham') ||
      text.includes('leeds')
    ) {
      return 'UK to Nigeria';
    }
    if (
      text.includes('usa to nigeria') ||
      text.includes('us to nigeria') ||
      text.includes('texas to nigeria') ||
      text.includes('barrels from')
    ) {
      return 'USA to Nigeria';
    }
    if (
      text.includes('canada') ||
      text.includes('germany') ||
      text.includes('france') ||
      text.includes('turkey')
    ) {
      return 'Global Routes';
    }
    return 'Customs & Guides';
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryTab, number> = {
      All: posts.length,
      'Nigeria to UK': 0,
      'Nigeria to USA': 0,
      'UK to Nigeria': 0,
      'USA to Nigeria': 0,
      'Global Routes': 0,
      'Customs & Guides': 0,
    };

    posts.forEach((p) => {
      const tab = categorizePost(p);
      counts[tab] = (counts[tab] || 0) + 1;
    });

    return counts;
  }, [posts]);

  // Filtered posts based on active tab and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Tab filter
      if (activeTab !== 'All') {
        const postTab = categorizePost(post);
        if (postTab !== activeTab) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const searchable = (
          (post.title || '') +
          ' ' +
          (post.description || '') +
          ' ' +
          (post.category || '') +
          ' ' +
          (post.tags || []).join(' ') +
          ' ' +
          (post.url || '')
        ).toLowerCase();

        return searchable.includes(query);
      }

      return true;
    });
  }, [posts, activeTab, searchQuery]);

  const tabs: { label: CategoryTab; displayName: string }[] = [
    { label: 'All', displayName: `All Articles (${categoryCounts['All']})` },
    { label: 'Nigeria to UK', displayName: `Nigeria → UK (${categoryCounts['Nigeria to UK']})` },
    { label: 'Nigeria to USA', displayName: `Nigeria → US (${categoryCounts['Nigeria to USA']})` },
    { label: 'UK to Nigeria', displayName: `UK → Nigeria (${categoryCounts['UK to Nigeria']})` },
    { label: 'USA to Nigeria', displayName: `USA → Nigeria (${categoryCounts['USA to Nigeria']})` },
    { label: 'Global Routes', displayName: `Global & Canada (${categoryCounts['Global Routes']})` },
    { label: 'Customs & Guides', displayName: `Customs & Guides (${categoryCounts['Customs & Guides']})` },
  ];

  const handleTabChange = (tab: CategoryTab) => {
    setActiveTab(tab);
    setVisibleCount(24);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(24);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setVisibleCount(24);
  };

  const showAll = () => {
    setVisibleCount(filteredPosts.length);
  };

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="space-y-10">
      {/* Search & Filter Controls */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search across all 104 articles (e.g., Nigeria to UK, rates, food)..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Result Count Status */}
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium shrink-0">
            <Layers className="w-4 h-4 text-primary" />
            <span>
              Showing <strong className="text-gray-900">{displayedPosts.length}</strong> of{' '}
              <strong className="text-gray-900">{filteredPosts.length}</strong> matching articles
              {filteredPosts.length !== posts.length && (
                <span className="text-gray-500 text-xs"> (from {posts.length} total)</span>
              )}
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-5 pt-5 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-primary" /> Filter by Route or Topic
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => handleTabChange(tab.label)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {tab.displayName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Spotlight Section (when on 'All' and no search) */}
      {activeTab === 'All' && !searchQuery && posts.length >= 2 && (
        <section className="bg-gradient-to-br from-blue-900 via-primary to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" /> Latest Shipping Guides (October 2026)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.slice(0, 2).map((post, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 p-5 flex flex-col justify-between hover:bg-white/15 transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 border border-white/10">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <span className="inline-block bg-white/20 text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                    {post.category || 'Featured Guide'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-200 text-xs sm:text-sm mt-2 line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <Link
                    href={post.url}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-yellow-300 hover:text-yellow-200 hover:underline"
                  >
                    Read Complete Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Grid of All Articles */}
      {displayedPosts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900">No matching articles found</h3>
          <p className="text-gray-600 text-sm mt-1 max-w-md mx-auto">
            We couldn't find any articles matching &ldquo;{searchQuery}&rdquo;. Try another keyword
            or reset your filter.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={clearSearch}
              className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              Reset Search Filter
            </button>
            <button
              onClick={() => handleTabChange('Nigeria to UK')}
              className="bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Browse Nigeria to UK
            </button>
            <button
              onClick={() => handleTabChange('Nigeria to USA')}
              className="bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Browse Nigeria to USA
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post, index) => (
              <BlogPostCard key={post.url || index} post={post} index={index} />
            ))}
          </div>

          {/* Load More / Show All Controls */}
          {visibleCount < filteredPosts.length && (
            <div className="text-center pt-8 border-t border-gray-200 space-y-3">
              <p className="text-sm text-gray-600">
                Showing <strong>{displayedPosts.length}</strong> of{' '}
                <strong>{filteredPosts.length}</strong> articles
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredPosts.length))}
                  className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 shadow-sm transition-all text-sm"
                >
                  Load Next 24 Articles
                </button>
                <button
                  onClick={showAll}
                  className="bg-slate-800 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-900 shadow-sm transition-all text-sm"
                >
                  Show All {filteredPosts.length} Articles
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
