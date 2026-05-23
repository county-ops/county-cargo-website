
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

declare global {
    interface Window {
        fbq: (...args: any[]) => void;
    }
}

export const MetaPixel = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!PIXEL_ID) {
      console.warn("Meta Pixel ID not found. Tracking is disabled.");
      return;
    }

    // Initialize fbq function
    if (!window.fbq) {
        window.fbq = function() {
            // @ts-ignore
            window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)
        };
        // @ts-ignore
        if (!window._fbq) window._fbq = window.fbq;
        // @ts-ignore
        window.fbq.push = window.fbq;
        // @ts-ignore
        window.fbq.loaded = true;
        // @ts-ignore
        window.fbq.version = '2.0';
        // @ts-ignore
        window.fbq.queue = [];
    }

    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
    setIsInitialized(true);
  }, []);


  useEffect(() => {
    if (!isInitialized) return;
    
    // Track page views on route changes
    window.fbq('track', 'PageView');

  }, [pathname, searchParams, isInitialized])

  if (!PIXEL_ID) {
    return null;
  }

  return (
      <Script
        id="fb-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `,
        }}
      />
  )
}

// Function to track a specific event
export const trackMetaEvent = (name: string, options = {}) => {
  if (!PIXEL_ID || typeof window.fbq !== 'function') {
    return;
  }
  window.fbq('track', name, options);
};
