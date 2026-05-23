
'use client';

import Header from '@/components/header';
import { Suspense } from 'react';
import { NavigationEvents } from '@/components/navigation-events';
import AppSidebar from '@/components/app-sidebar';
import { ProfileProvider, useProfile } from '@/components/profile-provider';
import { MetaPixel } from '@/lib/meta-pixel';

function AppWithTracking({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = useProfile();
  const isAdminOrStaff = profile?.role === 'Admin' || profile?.role === 'Staff';
  
  return (
    <>
      {!isAdminOrStaff && (
         <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
      )}
      <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
          <div className="hidden md:block h-full border-r border-blue-100">
            <AppSidebar />
         </div>
        <div className="flex flex-col">
            <header className="flex h-14 items-center justify-between gap-4 border-b border-blue-100 bg-white px-4 lg:h-[60px] lg:px-6 sticky top-0 z-40 non-printable">
              <div className="flex h-full w-full items-center">
                  <Header />
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-8 lg:p-10 bg-blue-50/20 min-h-[calc(100vh-60px)]">
              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
              {children}
            </main>
        </div>
      </div>
    </>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ProfileProvider>
       <AppWithTracking>
        {children}
       </AppWithTracking>
    </ProfileProvider>
  );
}
