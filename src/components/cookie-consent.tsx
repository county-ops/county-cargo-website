'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'granted');
    setShowBanner(false);
    window.dispatchEvent(new Event('cookie_consent_change'));
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'denied');
    setShowBanner(false);
    window.dispatchEvent(new Event('cookie_consent_change'));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-white border-t border-slate-200 shadow-2xl p-4 sm:p-6 md:flex md:items-center md:justify-between animate-in slide-in-from-bottom duration-300">
      <div className="max-w-5xl md:mr-8 mb-4 md:mb-0">
        <h4 className="text-secondary font-bold text-sm sm:text-base mb-1">We respect your privacy</h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          County Cargo uses cookies to enhance your browsing experience, measure site traffic, and optimize our logistics services. You can accept or decline non-essential analytics cookies. For details, view our{' '}
          <a href="/info#privacy" className="text-primary font-semibold hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <div className="flex gap-3 shrink-0">
        <Button variant="outline" size="sm" onClick={handleReject} className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm">
          Decline
        </Button>
        <Button size="sm" onClick={handleAccept} className="bg-primary hover:bg-blue-700 text-white text-xs sm:text-sm">
          Accept All
        </Button>
      </div>
    </div>
  );
}
