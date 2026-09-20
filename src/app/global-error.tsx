'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global layout error caught by GlobalError boundary:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 text-gray-900 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
            !
          </div>
          <h1 className="text-2xl font-bold mb-2">County Cargo</h1>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            A temporary client-side error occurred while rendering the page. Please click reload to refresh the session.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => reset()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Reload Page
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-300"
            >
              <a href="/">Go to Homepage</a>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
