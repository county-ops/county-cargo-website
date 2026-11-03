export interface BlogPost {
  title: string;
  image: string;
  imageHint?: string;
  author?: string;
  publicationDate?: string;
  category?: string;
  tags?: string[];
  description: string;
  url: string;
  content?: string;
  isCustom?: boolean;
  createdAt?: string;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
