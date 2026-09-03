
'use client';

/**
 * Floating WhatsApp CTA button.
 * Visible on all pages (added in layout.tsx).
 * Opens a pre-filled WhatsApp conversation with County Cargo.
 */
export function WhatsappButton() {
  const phone = '2348110000421'; // County Cargo WhatsApp number (international format, no +)
  const message = encodeURIComponent(
    'Hello County Cargo, I would like to enquire about shipping.'
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with County Cargo on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="white"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M24 4C12.95 4 4 12.95 4 24c0 3.55.93 6.88 2.55 9.77L4 44l10.5-2.5A19.87 19.87 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.12 0-6.08-.84-8.63-2.3l-.62-.37-6.23 1.48 1.53-5.93-.4-.65A15.93 15.93 0 0 1 8 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.78-11.76c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.04-.75-3.88-2.39-1.44-1.28-2.4-2.86-2.68-3.34-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.4-.96-.8-.82-1.08-.84-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.03.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z" />
      </svg>
    </a>
  );
}
