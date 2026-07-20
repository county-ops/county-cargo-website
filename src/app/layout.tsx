
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AosInit } from '@/components/aos-init';
import { GoogleAnalytics } from '@/components/google-analytics';
import { CookieConsent } from '@/components/cookie-consent';

export const metadata: Metadata = {
  title: {
    default: 'County Cargo | Professional Logistics & Shipping Solutions',
    template: '%s | County Cargo',
  },
  description: 'Seamless Global Shipping, Done Right. Reliable air and sea freight cargo services from UK and US to Nigeria, and Nigeria exports worldwide.',
  metadataBase: new URL('https://countycargo.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://countycargo.com',
    siteName: 'County Cargo',
    title: 'County Cargo | Professional Logistics & Shipping Solutions',
    description: 'Seamless Global Shipping, Done Right. Reliable air and sea freight cargo services from UK and US to Nigeria, and Nigeria exports worldwide.',
    images: [
      {
        url: '/cargo-plane-hero.png',
        width: 1200,
        height: 630,
        alt: 'County Cargo Logistics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'County Cargo | Professional Logistics & Shipping Solutions',
    description: 'Seamless Global Shipping, Done Right. Reliable air and sea freight cargo services from UK and US to Nigeria, and Nigeria exports worldwide.',
    images: ['/cargo-plane-hero.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-white text-gray-800" suppressHydrationWarning>
        <AosInit />
        {children}
        <Toaster />
        <GoogleAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
