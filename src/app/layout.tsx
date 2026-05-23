
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/hooks/use-auth';
import React, { Suspense } from 'react';
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@/lib/google-analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  title: {
    template: '%s | County Cargo',
    default: 'County Cargo | Shipment Management',
  },
  description: 'Streamlined logistics and shipment tracking.',
  ...(PIXEL_ID && {
    other: {
      "facebook-domain-verification": process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || "",
    },
  }),
  ...(PIXEL_ID && {
    icons: [
        {
          rel: 'icon',
          url: '/favicon.ico',
        },
    ],
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         {PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
      </head>
       <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      <body className={cn("font-sans antialiased", inter.variable)} suppressHydrationWarning>
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
