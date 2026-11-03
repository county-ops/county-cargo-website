import fs from 'fs';
import path from 'path';
import standardPosts from './blog-posts.json';
import { slugify, type BlogPost } from './blog-utils';

export type { BlogPost };
export { slugify };

const CUSTOM_POSTS_PATH = path.join(process.cwd(), 'src', 'data', 'custom-blog-posts.json');
let inMemoryCustomPosts: BlogPost[] | null = null;

export function getCustomBlogPosts(): BlogPost[] {
  if (inMemoryCustomPosts !== null) {
    return inMemoryCustomPosts;
  }

  try {
    if (fs.existsSync(CUSTOM_POSTS_PATH)) {
      const fileData = fs.readFileSync(CUSTOM_POSTS_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        inMemoryCustomPosts = parsed;
        return inMemoryCustomPosts;
      }
    }
  } catch (err) {
    console.error('Error reading custom blog posts file:', err);
  }

  inMemoryCustomPosts = [];
  return inMemoryCustomPosts;
}

export function saveCustomBlogPosts(posts: BlogPost[]): boolean {
  inMemoryCustomPosts = posts;
  try {
    const dir = path.dirname(CUSTOM_POSTS_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CUSTOM_POSTS_PATH, JSON.stringify(posts, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing custom blog posts file:', err);
    return false;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  const custom = getCustomBlogPosts();
  const standard = (standardPosts as BlogPost[]).map((p) => ({
    ...p,
    isCustom: false,
  }));

  // Custom posts appear first so newly posted blogs are featured at the top of the blog grid
  return [...custom, ...standard];
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const cleanSlug = slug.replace(/^\/blog\//, '').replace(/\/$/, '');
  const targetUrl = `/blog/${cleanSlug}`;

  // Check custom posts first
  const customPosts = getCustomBlogPosts();
  const foundCustom = customPosts.find(
    (p) => p.url === targetUrl || p.url.endsWith(`/${cleanSlug}`)
  );
  if (foundCustom) return foundCustom;

  // Check standard posts
  const foundStandard = (standardPosts as BlogPost[]).find(
    (p) => p.url === targetUrl || p.url.endsWith(`/${cleanSlug}`)
  );
  if (foundStandard) {
    return {
      ...foundStandard,
      isCustom: false,
    };
  }

  return null;
}

export interface CreatePostInput {
  title: string;
  slug?: string;
  image?: string;
  imageHint?: string;
  author?: string;
  category?: string;
  tags?: string[] | string;
  description: string;
  content: string;
  publicationDate?: string;
}

export function createNewBlogPost(
  input: CreatePostInput,
  authorInfo: { name: string; username: string }
): { success: boolean; post?: BlogPost; error?: string } {
  const title = (input.title || '').trim();
  if (!title) {
    return { success: false, error: 'Title is required.' };
  }

  const rawSlug = (input.slug || slugify(title)).trim();
  const cleanSlug = slugify(rawSlug);
  if (!cleanSlug) {
    return { success: false, error: 'A valid slug could not be generated from the title.' };
  }

  const url = `/blog/${cleanSlug}`;

  // Check if a post with this slug already exists
  const existingCustom = getCustomBlogPosts();
  if (existingCustom.some((p) => p.url === url)) {
    return { success: false, error: `A blog post with URL "${url}" already exists.` };
  }

  // Parse tags
  let tagList: string[] = [];
  if (Array.isArray(input.tags)) {
    tagList = input.tags.map((t) => t.trim()).filter(Boolean);
  } else if (typeof input.tags === 'string') {
    tagList = input.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  if (tagList.length === 0) {
    tagList = ['County Cargo', 'Air Freight', 'Shipping Guide'];
  }

  const now = new Date();
  const dateStr = input.publicationDate || now.toISOString().split('T')[0];

  const defaultImages = [
    '/cargo-plane-hero.png',
    '/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg',
    '/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
    '/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg',
  ];

  const post: BlogPost = {
    title,
    url,
    category: input.category || 'Shipping Guides',
    author: input.author || authorInfo.name || 'County Cargo Logistics Team',
    publicationDate: dateStr,
    tags: tagList,
    description: (input.description || '').trim() || title,
    image: input.image?.trim() || defaultImages[0],
    imageHint: input.imageHint || `${title} - County Cargo logistics & freight guide`,
    content: (input.content || '').trim(),
    isCustom: true,
    createdAt: now.toISOString(),
  };

  const updatedCustom = [post, ...existingCustom];
  saveCustomBlogPosts(updatedCustom);

  return { success: true, post };
}

export function deleteCustomBlogPost(slug: string): { success: boolean; error?: string } {
  const cleanSlug = slug.replace(/^\/blog\//, '').replace(/\/$/, '');
  const targetUrl = `/blog/${cleanSlug}`;

  const existingCustom = getCustomBlogPosts();
  const filtered = existingCustom.filter((p) => p.url !== targetUrl);

  if (filtered.length === existingCustom.length) {
    return { success: false, error: 'Custom post not found or it is a standard core guide.' };
  }

  saveCustomBlogPosts(filtered);
  return { success: true };
}
