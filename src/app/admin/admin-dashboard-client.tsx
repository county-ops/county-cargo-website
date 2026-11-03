'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  PlusCircle,
  LogOut,
  ExternalLink,
  Eye,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Loader2,
  Sparkles,
  BookOpen,
  Calendar,
  User,
  Tag,
  Folder,
  Image as ImageIcon,
  Heading,
  List,
  Quote,
  Table,
  PhoneCall,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { slugify, type BlogPost } from '@/lib/blog-utils';

interface UserSession {
  username: string;
  name: string;
  role: 'admin' | 'agent';
}

const PRESET_IMAGES = [
  {
    url: '/cargo-plane-hero.png',
    title: 'Cargo Plane Aircraft',
  },
  {
    url: '/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg',
    title: 'Nigeria to UK Air Freight',
  },
  {
    url: '/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
    title: 'Nigeria to USA Air Cargo',
  },
  {
    url: '/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg',
    title: 'UK to Nigeria Rates & Map',
  },
  {
    url: '/images/blog/how-to-export-goods-nigeria-to-uk-commercial-guide.jpg',
    title: 'Commercial Export Cargo',
  },
  {
    url: '/images/blog/complete-guide-nigeria-to-uk-freight.jpg',
    title: 'Warehouse & Consolidated Pallets',
  },
];

const CATEGORIES = [
  'Nigeria to UK Cargo',
  'Nigeria to US Shipping',
  'UK to Nigeria',
  'USA to Nigeria',
  'Global Routes',
  'Customs & Guides',
  'Export Services',
  'Warehouse & Logistics',
];

export function AdminDashboardClient({ initialUser }: { initialUser: UserSession }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugAuto, setIsSlugAuto] = useState(true);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [author, setAuthor] = useState(initialUser.name);
  const [publicationDate, setPublicationDate] = useState(
    () => new Date().toISOString().split('T')[0]
  );
  const [tags, setTags] = useState('Nigeria to UK, Air Cargo, Shipping Guide');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [content, setContent] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [successPost, setSuccessPost] = useState<BlogPost | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Posts list
  const [customPosts, setCustomPosts] = useState<BlogPost[]>([]);
  const [totalCoreCount, setTotalCoreCount] = useState(0);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  // Auto-slugify when title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (isSlugAuto) {
      setSlug(slugify(val));
    }
  };

  // Fetch posts on mount & after publish/delete
  const loadPosts = async () => {
    try {
      setLoadingPosts(true);
      const res = await fetch('/api/admin/posts');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setCustomPosts(data.customPosts || []);
          setTotalCoreCount(data.totalPostsCount || 0);
        }
      }
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  // Content helpers for quick insertion
  const insertContent = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('blog-content-input') as HTMLTextAreaElement | null;
    if (!textarea) {
      setContent((prev) => prev + '\n' + prefix + suffix);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const replacement = prefix + (selected || 'text') + suffix;
    const newValue =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setContent(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessPost(null);

    if (!title.trim()) {
      setErrorMsg('Please enter a post title.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please enter a short description/excerpt.');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Please enter article content.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          category,
          author,
          publicationDate,
          tags,
          description,
          image,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to publish post. Please check fields.');
        setSubmitting(false);
        return;
      }

      setSuccessPost(data.post);
      setSubmitting(false);

      // Refresh posts list
      loadPosts();

      // Clear form
      setTitle('');
      setSlug('');
      setDescription('');
      setContent('');
      setIsSlugAuto(true);
    } catch {
      setErrorMsg('Network error while saving post.');
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (postSlug: string) => {
    if (!confirm('Are you sure you want to delete this custom post? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/posts?slug=${encodeURIComponent(postSlug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        loadPosts();
      } else {
        alert(data.error || 'Failed to delete post.');
      }
    } catch {
      alert('Error connecting to server.');
    }
  };

  const filteredCustomPosts = customPosts.filter((p) => {
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      (p.category || '').toLowerCase().includes(query) ||
      (p.author || '').toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/county-cargo-logo-transparent.png"
                alt="County Cargo"
                width={140}
                height={38}
                className="h-8 w-auto brightness-110"
              />
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-600/30 text-blue-300 border border-blue-500/40">
              Agent &amp; Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-300 font-medium">{initialUser.name}</p>
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">
                {initialUser.role} Account
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700"
            >
              <Link href="/blog" target="_blank" className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Blog</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Top Header & Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Shipping Blog &amp; Guide Publisher
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Draft, edit, and instantly publish route guides, customs updates, and air/sea freight articles to countycargo.com.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  {totalCoreCount}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-800">Total Published</p>
                  <p className="text-slate-500">Shipping Guides</p>
                </div>
              </div>
              <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center font-bold text-sm">
                  {customPosts.length}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-800">Agent Posts</p>
                  <p className="text-slate-500">Custom Articles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-3 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'create'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Write New Article
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`pb-3 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'manage'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              Manage Agent Articles ({customPosts.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Create New Post */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Success Notification */}
              {successPost && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 shadow-sm animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">Blog Post Published Live!</h4>
                      <p className="text-xs text-green-700 mt-0.5">
                        Your article &quot;{successPost.title}&quot; is now live on County Cargo.
                      </p>
                      <div className="mt-2.5 flex items-center gap-3">
                        <Link
                          href={successPost.url}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline bg-white px-2.5 py-1 rounded border border-green-300"
                        >
                          <span>View Article Live: {successPost.url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => setSuccessPost(null)}
                          className="text-xs text-slate-500 hover:text-slate-700"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 shadow-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <h4 className="font-semibold text-sm">Failed to Publish</h4>
                    <p className="mt-0.5 text-red-700">{errorMsg}</p>
                  </div>
                </div>
              )}

              {/* Main Post Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <form onSubmit={handlePublish} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="e.g. Nigeria to UK Air Cargo: 2026 Rates, Packaging & DEFRA Food Rules"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-base font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        URL Slug (Live Web Address)
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsSlugAuto(!isSlugAuto)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {isSlugAuto ? 'Edit Slug Manually' : 'Auto-Generate from Title'}
                      </button>
                    </div>
                    <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                      <span className="font-mono text-slate-400 shrink-0">countycargo.com/blog/</span>
                      <input
                        type="text"
                        disabled={isSlugAuto}
                        value={slug}
                        onChange={(e) => setSlug(slugify(e.target.value))}
                        placeholder="my-shipping-guide"
                        className="w-full bg-transparent pl-1 font-mono text-slate-900 focus:outline-none disabled:text-slate-600 text-xs"
                      />
                    </div>
                  </div>

                  {/* Category & Date Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        <Folder className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        <Calendar className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        Publication Date
                      </label>
                      <input
                        type="date"
                        value={publicationDate}
                        onChange={(e) => setPublicationDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Author & Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        <User className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="County Cargo Logistics Team"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        <Tag className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Nigeria to UK, Foodstuff, DEFRA, Air Cargo"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Excerpt / Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Short Excerpt / Meta Description * (Displays on cards &amp; Google Search)
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Concise 1-2 sentence overview explaining the key shipping rates, delivery timeframes, or regulations in this article."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Content Editor Toolbar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-800">
                        Article Body Content *
                      </label>
                      <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() => setEditorMode('write')}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                            editorMode === 'write'
                              ? 'bg-white shadow-sm text-blue-600'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Write
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditorMode('preview')}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                            editorMode === 'preview'
                              ? 'bg-white shadow-sm text-blue-600'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Live Preview
                        </button>
                      </div>
                    </div>

                    {/* Toolbar */}
                    {editorMode === 'write' && (
                      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border border-slate-300 border-b-0 rounded-t-lg text-xs text-slate-700">
                        <button
                          type="button"
                          onClick={() => insertContent('## ', '\n')}
                          className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-200 font-semibold flex items-center gap-1"
                          title="Heading 2"
                        >
                          <Heading className="w-3.5 h-3.5" /> H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContent('### ', '\n')}
                          className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-200 font-semibold flex items-center gap-1"
                          title="Heading 3"
                        >
                          <Heading className="w-3 h-3" /> H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContent('**', '**')}
                          className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-200 font-bold"
                          title="Bold Text"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContent('- ', '\n- ')}
                          className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-200 flex items-center gap-1"
                          title="Bullet List"
                        >
                          <List className="w-3.5 h-3.5" /> List
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            insertContent(
                              '\n> **Logistics Note:** ',
                              '\n'
                            )
                          }
                          className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-200 flex items-center gap-1"
                          title="Callout Box"
                        >
                          <Quote className="w-3.5 h-3.5" /> Note Box
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            insertContent(
                              '\n| Service Route | Weight Min | Standard Rate | Delivery Time |\n| --- | --- | --- | --- |\n| Nigeria to UK Air Cargo | 10kg | ₦10,500/kg | 5–10 working days |\n| Nigeria to US Air Cargo | 10kg | ₦16,000/kg | 5–10 working days |\n| Express Courier (Worldwide) | 1kg | ₦55,000/kg | 3–5 working days |\n'
                            )
                          }
                          className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-200 flex items-center gap-1"
                          title="Insert Shipping Rates Table"
                        >
                          <Table className="w-3.5 h-3.5" /> Rates Table
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            insertContent(
                              '\n[Get an Instant Shipping Quote](https://ship.countycargo.com/shipping-calculator)\n'
                            )
                          }
                          className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-200 flex items-center gap-1 text-blue-700"
                          title="Quotation Button Link"
                        >
                          <PhoneCall className="w-3.5 h-3.5" /> Quote CTA
                        </button>
                      </div>
                    )}

                    {/* Textarea or Preview */}
                    {editorMode === 'write' ? (
                      <textarea
                        id="blog-content-input"
                        rows={16}
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`Write your article here using headings, paragraphs, and bullet points.

## Overview
County Cargo provides reliable international air cargo and freight forwarding between Nigeria, the UK, the USA, and worldwide destinations.

## Current Air Cargo Rates & Schedules
- Nigeria to UK: From ₦10,500/kg (10kg minimum)
- Nigeria to USA: From ₦16,000/kg (10kg minimum)
- Express Courier: ₦55,000/kg (3–5 working days delivery)

## Packaging & Customs Guidelines
Ensure all commercial goods and food items are packaged in sturdy, tamper-evident cartons or barrels.

> **Need assistance with packaging?** Visit our drop-off centers in Lagos (Ladipo-Oshodi) or Abuja (Wuye Market).`}
                        className="w-full px-4 py-3 border border-slate-300 rounded-b-lg text-sm text-slate-900 font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none leading-relaxed"
                      />
                    ) : (
                      <div className="w-full min-h-[380px] p-6 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 overflow-y-auto">
                        <div className="max-w-2xl mx-auto space-y-4">
                          <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                            {category}
                          </span>
                          <h2 className="text-2xl font-bold text-slate-900">{title || 'Untitled Article'}</h2>
                          <p className="text-xs text-slate-500">
                            By {author} &bull; {publicationDate}
                          </p>
                          <hr className="border-slate-200" />
                          <div className="prose prose-blue prose-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
                            {content || 'No content entered yet.'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Articles publish immediately to <code className="text-blue-600 font-mono">/blog/{slug || '...'}</code>
                    </p>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Publishing Article...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Publish to Blog
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Featured Image & Quick Presets */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" /> Featured Article Image
                </h3>

                {/* Selected Preview */}
                <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 relative aspect-video bg-slate-100">
                  <Image
                    src={image || PRESET_IMAGES[0].url}
                    alt="Featured Image Preview"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Custom Image URL
                    </label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="/cargo-plane-hero.png"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Or Select from County Cargo Library:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setImage(preset.url)}
                          className={`group text-left rounded-lg overflow-hidden border transition-all p-1 ${
                            image === preset.url
                              ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/50'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="relative aspect-video rounded overflow-hidden mb-1">
                            <Image
                              src={preset.url}
                              alt={preset.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <span className="block text-[10px] font-medium text-slate-700 truncate">
                            {preset.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guidelines Box */}
              <div className="bg-blue-50/80 rounded-2xl border border-blue-200/80 p-5 text-xs text-blue-900 space-y-2.5">
                <h4 className="font-bold flex items-center gap-1.5 text-blue-900">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> SEO &amp; Publishing Tips
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-blue-800 leading-relaxed">
                  <li>Keep titles clear with primary routes (e.g. &quot;Nigeria to UK&quot;).</li>
                  <li>Include chargeable weight minimums and current per-kg rates.</li>
                  <li>Mention drop-off hubs in Lagos (Ladipo) and Abuja (Wuye).</li>
                  <li>Articles are indexed on Google and automatically appear on <Link href="/blog" target="_blank" className="underline font-semibold">/blog</Link>.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Articles */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Agent &amp; Custom Blog Articles</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  View, preview, and manage articles published through the staff portal.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter articles..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {loadingPosts ? (
              <div className="py-12 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> Loading articles...
              </div>
            ) : filteredCustomPosts.length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-xl p-6">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-slate-700">No Custom Articles Found</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchFilter
                    ? 'No articles match your search filter.'
                    : 'You haven\'t created any custom blog posts yet. Switch to the "Write New Article" tab to publish your first post!'}
                </p>
                <Button
                  onClick={() => setActiveTab('create')}
                  size="sm"
                  className="mt-4 text-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Create First Article
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Title &amp; URL</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Author</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredCustomPosts.map((post) => (
                      <tr key={post.url} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-900">{post.title}</p>
                          <Link
                            href={post.url}
                            target="_blank"
                            className="text-blue-600 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                          >
                            <span>{post.url}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                            {post.category || 'General'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{post.author || 'Agent'}</td>
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {post.publicationDate || '-'}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="h-7 px-2 text-xs text-slate-600 hover:text-blue-600"
                            >
                              <Link href={post.url} target="_blank">
                                <Eye className="w-3.5 h-3.5 mr-1" /> View
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.url)}
                              className="h-7 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
