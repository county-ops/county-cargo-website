
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AosInit } from '@/components/aos-init';
import { GoogleAnalytics } from '@/components/google-analytics';
import { CookieConsent } from '@/components/cookie-consent';
import { JsonLd } from '@/components/json-ld';
import { WhatsappButton } from '@/components/whatsapp-button';

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
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
        alt: 'County Cargo — Air & Sea Freight from UK and US to Nigeria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CountyCargo',
    title: 'County Cargo | Professional Logistics & Shipping Solutions',
    description: 'Seamless Global Shipping, Done Right. Reliable air and sea freight cargo services from UK and US to Nigeria, and Nigeria exports worldwide.',
    images: ['/cargo-plane-hero.png'],
  },
};

/** Organization + WebSite + LocalBusiness structured data graph */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://countycargo.com/#organization',
      name: 'County Cargo',
      legalName: 'County Service Group',
      alternateName: ['County Cargo', 'County Cargo UK', 'County Cargo Nigeria', 'County Service Group'],
      url: 'https://countycargo.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://countycargo.com/#logo',
        url: 'https://countycargo.com/county-logo.png',
        contentUrl: 'https://countycargo.com/county-logo.png',
        width: 280,
        height: 80,
        caption: 'County Cargo — UK & US to Nigeria Shipping',
      },
      image: { '@id': 'https://countycargo.com/#logo' },
      description:
        'County Cargo provides air, sea, standard and express cargo services between the United Kingdom and Nigeria. Customers can arrange supported shipping from the UK to Lagos, Abuja and other Nigerian destinations, as well as cargo and export services from Nigeria to the UK.',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street',
          addressLocality: 'Liverpool',
          postalCode: 'L1 0BG',
          addressCountry: 'GB',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi',
          addressLocality: 'Lagos',
          addressRegion: 'Lagos State',
          postalCode: '102214',
          addressCountry: 'NG',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: "Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street",
          addressLocality: 'Abuja',
          addressRegion: 'Federal Capital Territory',
          addressCountry: 'NG',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '1234 N Belt Line Rd',
          addressLocality: 'Irving',
          addressRegion: 'TX',
          postalCode: '75061',
          addressCountry: 'US',
        },
      ],
      telephone: '+2348110000421',
      email: 'info@countycargo.com',
      sameAs: [
        'https://www.facebook.com/CountyCargo',
        'https://www.instagram.com/countycargo/',
        'https://x.com/CountyCargo',
        'https://www.tiktok.com/@countycargong',
      ],
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Nigeria' },
        { '@type': 'Country', name: 'United States' },
      ],
      subOrganization: [
        { '@id': 'https://countycargo.com/#liverpool-branch' },
        { '@id': 'https://countycargo.com/#lagos-branch' },
        { '@id': 'https://countycargo.com/#abuja-branch' },
        { '@id': 'https://countycargo.com/#texas-branch' },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://countycargo.com/#liverpool-branch',
      name: 'County Cargo UK (Liverpool Office & Receiving Depot)',
      parentOrganization: { '@id': 'https://countycargo.com/#organization' },
      url: 'https://countycargo.com/shipping-from-uk-to-nigeria',
      telephone: '+2348110000421',
      email: 'info@countycargo.com',
      image: 'https://countycargo.com/county-logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street',
        addressLocality: 'Liverpool',
        postalCode: 'L1 0BG',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 53.3948,
        longitude: -2.9818,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '10:00',
          closes: '14:00',
        },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://countycargo.com/#lagos-branch',
      name: 'County Cargo Nigeria (Lagos Hub & Clearing Office)',
      parentOrganization: { '@id': 'https://countycargo.com/#organization' },
      url: 'https://countycargo.com/shipping-from-nigeria-to-uk',
      telephone: '+2348110000421',
      email: 'info@countycargo.com',
      image: 'https://countycargo.com/county-logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi',
        addressLocality: 'Lagos',
        addressRegion: 'Lagos State',
        postalCode: '102214',
        addressCountry: 'NG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 6.5355,
        longitude: 3.3512,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '10:00',
          closes: '14:00',
        },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://countycargo.com/#abuja-branch',
      name: 'County Cargo Nigeria (Abuja Office)',
      parentOrganization: { '@id': 'https://countycargo.com/#organization' },
      url: 'https://countycargo.com/contact',
      telephone: '+2348110000423',
      email: 'info@countycargo.com',
      image: 'https://countycargo.com/county-logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: "Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street",
        addressLocality: 'Abuja',
        addressRegion: 'Federal Capital Territory',
        addressCountry: 'NG',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '10:00',
          closes: '14:00',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://countycargo.com/#website',
      url: 'https://countycargo.com',
      name: 'County Cargo | UK & US to Nigeria Shipping, Air & Sea Freight',
      description:
        'Reliable air and sea freight cargo shipping from UK and US to Nigeria, plus export services from Nigeria worldwide.',
      publisher: { '@id': 'https://countycargo.com/#organization' },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://countycargo.com/blog?q={search_term_string}',
          },
          'query-input': {
            '@type': 'PropertyValueSpecification',
            valueRequired: true,
            valueName: 'search_term_string',
          },
        },
      ],
      inLanguage: 'en-GB',
    },
  ],
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
        <JsonLd data={organizationSchema} />
      </head>
      <body className="font-body antialiased bg-white text-gray-800" suppressHydrationWarning>
        <AosInit />
        {children}
        <WhatsappButton />
        <Toaster />
        <GoogleAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
