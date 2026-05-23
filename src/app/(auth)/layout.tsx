
'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { NavigationEvents } from '@/components/navigation-events';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
       <header className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/login" className="flex items-center gap-2 font-semibold text-lg">
            <Image src="/logo.png" alt="County Cargo logo" width={24} height={24} />
            <span className="">County Cargo</span>
          </Link>
        </header>
      <main className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        {children}
      </main>
    </div>
  );
}
