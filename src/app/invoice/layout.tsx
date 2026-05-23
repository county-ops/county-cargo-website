import type {Metadata} from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster"
import React from 'react';
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Invoice | County Cargo',
};

export default function InvoiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased bg-muted", inter.variable)}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
