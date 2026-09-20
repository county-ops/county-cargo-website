'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, MessageSquare } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client-side error to console
    console.error('Unhandled client exception caught by Error Boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>
        
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          We encountered an unexpected issue while loading this page. You can reload the page or return to our homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button
            onClick={() => reset()}
            className="bg-primary hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </Button>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <a
            href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20noticed%20an%20error%20on%20the%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Need assistance? Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
