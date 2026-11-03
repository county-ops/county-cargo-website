import standardPosts from './blog-posts.json';
import { slugify, type BlogPost } from './blog-utils';
import { getFirestoreDb } from './firebase-admin';

export type { BlogPost };
export { slugify };

const COLLECTION_NAME = 'blog_posts';
const SLOTS_COLLECTION_NAME = 'blog_slots';

/**
 * Retrieve all custom blog posts stored persistently in Firestore.
 * Throws an error on Firestore failure so admin routes return HTTP 500 instead of disguising failure as an empty list.
 */
export async function getCustomBlogPosts(): Promise<BlogPost[]> {
  const db = getFirestoreDb();
  const snapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc) => doc.data() as BlogPost);
}

/**
 * Retrieve all blog posts: persistent Firestore articles prepended before static core guides.
 * Gracefully preserves core guides for public readers if Firestore experiences an outage.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  let custom: BlogPost[] = [];
  try {
    custom = await getCustomBlogPosts();
  } catch (err) {
    console.error('Failed to fetch custom posts for blog index, falling back to core guides:', err);
  }

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
  slotId?: string;
}

/**
 * Enforce unique slug, validate fields, reserve slotId, and atomically create the article
 * in a Firestore transaction. Prevents concurrent duplicate slots and overwrites.
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

  // Initialize Firestore
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
  const trimmedSlotId = (input.slotId || '').trim();

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
    slotId: trimmedSlotId || undefined,
  };

  const docRef = db.collection(COLLECTION_NAME).doc(cleanSlug);
  const slotRef = trimmedSlotId ? db.collection(SLOTS_COLLECTION_NAME).doc(trimmedSlotId) : null;

  try {
    // Execute atomic transaction: reserves slotId and creates article together
    await db.runTransaction(async (transaction) => {
      // 1. If slotId is provided, atomically check that it has not already been reserved
      if (slotRef) {
        const slotSnap = await transaction.get(slotRef);
        if (slotSnap.exists) {
          const collisionErr: any = new Error(`Slot collision: Slot "${trimmedSlotId}" has already been reserved.`);
          collisionErr.code = 'SLOT_COLLISION';
          throw collisionErr;
        }
      }

      // 2. Atomically check that document slug does not already exist
      const articleSnap = await transaction.get(docRef);
      if (articleSnap.exists) {
        const slugErr: any = new Error(`Slug collision: An article with slug "${cleanSlug}" already exists in Firestore.`);
        slugErr.code = 'SLUG_COLLISION';
        throw slugErr;
      }

      // 3. Atomically reserve slot and create article
      if (slotRef) {
        transaction.set(slotRef, {
          slotId: trimmedSlotId,
          slug: cleanSlug,
          title,
          reservedAt: now.toISOString(),
        });
      }
      transaction.set(docRef, post);
    });

    return { success: true, post };
  } catch (err: any) {
    console.error('Failed to atomically save blog post to Firestore:', err);
    if (err.code === 'SLOT_COLLISION') {
      return {
        success: false,
        statusCode: 409,
        error: err.message,
      };
    }
    if (err.code === 'SLUG_COLLISION' || err.code === 6 || err.code === 'ALREADY_EXISTS') {
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

    const postData = docSnap.data() as BlogPost;
    const slotId = postData.slotId;

    await db.runTransaction(async (transaction) => {
      if (slotId) {
        const slotRef = db.collection(SLOTS_COLLECTION_NAME).doc(slotId);
        transaction.delete(slotRef);
      }
      transaction.delete(docRef);
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: `Failed to delete post from Firestore: ${err.message || err}`,
    };
  }
}
