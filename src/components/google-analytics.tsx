'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    // Read consent from localStorage
    const savedConsent = localStorage.getItem('cookie_consent');
    setConsent(savedConsent);

    const handleConsentChange = () => {
      setConsent(localStorage.getItem('cookie_consent'));
    };
    window.addEventListener('cookie_consent_change', handleConsentChange);

    return () => {
      window.removeEventListener('cookie_consent_change', handleConsentChange);
    };
  }, []);

  if (!gaId || consent !== 'granted') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
