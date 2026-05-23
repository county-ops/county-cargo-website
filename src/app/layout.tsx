
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AosInit } from '@/components/aos-init';

export const metadata: Metadata = {
  title: 'County Cargo - Professional Logistics Solutions',
  description: 'Seamless Global Shipping, Done Right. Send and receive goods worldwide - Nigeria, UK, USA & Beyond.',
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
      </body>
    </html>
  );
}
