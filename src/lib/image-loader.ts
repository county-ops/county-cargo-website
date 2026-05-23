'use client';
 
export default function firebaseImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const connector = src.includes('?') ? '&' : '?';
  return `${src}${connector}w=${width}&q=${quality || 75}`;
}
