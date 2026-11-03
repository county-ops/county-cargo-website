import standardPosts from './blog-posts.json';
import { slugify, type BlogPost } from './blog-utils';
import { getFirestoreDb } from './firebase-admin';

export type { BlogPost };
export { slugify };

const COLLECTION_NAME = 'blog_posts';

/**
 * Retrieve all custom blog posts stored persistently in Firestore.
 */
export async function getCustomBlogPosts(): Promise<BlogPost[]> {
  try {
    const db = getFirestoreDb();
    const snapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map((doc) => doc.data() as BlogPost);
  } catch (err: any) {
    console.error('Error fetching blog posts from Firestore:', err);
    // Return empty list on connection fallback so page loads standard guides
    return [];
  }
}

/**
 * Retrieve all blog posts: persistent Firestore articles prepended before static core guides.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const custom = await getCustomBlogPosts();

  const standard = (standardPosts as BlogPost[]).map((p) => ({
    ...p,
    isCustom: false,
  }));

  // Newly published custom posts in Firestore appear at the top
  return [...custom, ...standard];
}

/**
 * Retrieve a single blog post by its URL slug, checking Firestore first then standard guides.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const cleanSlug = slug.replace(/^\/blog\//, '').replace(/\/$/, '');
  const targetUrl = `/blog/${cleanSlug}`;

  // 1. Direct O(1) Firestore lookup by document ID (which is the slug)
  try {
    const db = getFirestoreDb();
    const docRef = db.collection(COLLECTION_NAME).doc(cleanSlug);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return docSnap.data() as BlogPost;
    }
  } catch (err) {
    console.error(`Error querying slug "${cleanSlug}" from Firestore:`, err);
  }

  // 2. Check standard core guides
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

/**
 * Enforce unique slug, validate fields, and persist new blog post to Firestore.
 * Returns an error if saving fails.
 */
export async function createNewBlogPost(
  input: CreatePostInput,
  authorInfo: { name: string; username: string }
): Promise<{ success: boolean; post?: BlogPost; error?: string; statusCode?: number }> {
  const title = (input.title || '').trim();
  if (!title) {
    return { success: false, statusCode: 400, error: 'Title is required.' };
  }

  const rawSlug = (input.slug || slugify(title)).trim();
  const cleanSlug = slugify(rawSlug);
  if (!cleanSlug) {
    return { success: false, statusCode: 400, error: 'A valid slug could not be generated from the title.' };
  }

  const url = `/blog/${cleanSlug}`;

  // Enforce unique slug against static core guides
  const standardExists = (standardPosts as BlogPost[]).some(
    (p) => p.url === url || p.url.endsWith(`/${cleanSlug}`)
  );
  if (standardExists) {
    return {
      success: false,
      statusCode: 409,
      error: `Slug collision: A core shipping guide with URL "${url}" already exists.`,
    };
  }

  // Enforce unique slug against Firestore documents
  let db;
  try {
    db = getFirestoreDb();
  } catch (err: any) {
    return {
      success: false,
      statusCode: 500,
      error: `Firestore database initialization failed: ${err.message || err}`,
    };
  }

  try {
    const docRef = db.collection(COLLECTION_NAME).doc(cleanSlug);

    // Parse and sanitize tags
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
    const defaultImage = '/cargo-plane-hero.png';

    const post: BlogPost = {
      title,
      url,
      category: input.category || 'Shipping Guides',
      author: input.author || authorInfo.name || 'County Cargo Logistics Team',
      publicationDate: dateStr,
      tags: tagList,
      description: (input.description || '').trim() || title,
      image: input.image?.trim() || defaultImage,
      imageHint: input.imageHint || `${title} - County Cargo logistics & freight guide`,
      content: (input.content || '').trim(),
      isCustom: true,
      createdAt: now.toISOString(),
    };

    // Use atomic document creation (docRef.create) to prevent overwriting existing articles.
    // If a document with cleanSlug already exists, create() throws ALREADY_EXISTS (code 6).
    await docRef.create(post);

    return { success: true, post };
  } catch (err: any) {
    console.error('Failed to save blog post to Firestore:', err);
    if (err.code === 6 || err.code === 'ALREADY_EXISTS' || err.message?.includes('ALREADY_EXISTS')) {
      return {
        success: false,
        statusCode: 409,
        error: `Slug collision: An article with slug "${cleanSlug}" already exists in Firestore.`,
      };
    }
    return {
      success: false,
      statusCode: 500,
      error: `Firestore persistence failed: ${err.message || 'Unknown Firestore write error'}`,
    };
  }
}

/**
 * Delete a custom post from Firestore by slug.
 */
export async function deleteCustomBlogPost(slug: string): Promise<{ success: boolean; error?: string }> {
  const cleanSlug = slug.replace(/^\/blog\//, '').replace(/\/$/, '');

  try {
    const db = getFirestoreDb();
    const docRef = db.collection(COLLECTION_NAME).doc(cleanSlug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return { success: false, error: 'Custom post not found in Firestore.' };
    }

    await docRef.delete();
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: `Failed to delete post from Firestore: ${err.message || err}`,
    };
  }
}
