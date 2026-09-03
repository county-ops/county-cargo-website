
'use client';

import { useEffect, useState } from 'react';

interface SocialShareProps {
  title: string;
}

/**
 * Social sharing buttons for blog posts.
 * Shares the current page URL via Facebook, WhatsApp, X/Twitter, and Email.
 */
export function SocialShare({ title }: SocialShareProps) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M22 12a10 10 0 1 0-11.563 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988A10.004 10.004 0 0 0 22 12z"/>
        </svg>
      ),
    },
    {
      label: 'Share on WhatsApp',
      href: `https://api.whatsapp.com/send/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-green-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M24 4C12.95 4 4 12.95 4 24c0 3.55.93 6.88 2.55 9.77L4 44l10.5-2.5A19.87 19.87 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm8.78 24.24c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.04-.75-3.88-2.39-1.44-1.28-2.4-2.86-2.68-3.34-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.4-.96-.8-.82-1.08-.84-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.03.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z"/>
        </svg>
      ),
    },
    {
      label: 'Share on X (Twitter)',
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-black hover:bg-gray-800',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: 'Share via Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      color: 'bg-gray-600 hover:bg-gray-700',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Share this article</p>
      <div className="flex flex-wrap gap-2">
        {links.map(({ label, href, color, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors ${color}`}
          >
            {icon}
            <span className="hidden sm:inline">{label.replace('Share on ', '').replace('Share via ', '')}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
