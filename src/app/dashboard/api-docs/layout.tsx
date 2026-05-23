'use client'

import { useProfile } from '@/components/profile-provider';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BusinessApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, profileLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    // If loading is done and profile is loaded, check the role.
    if (!profileLoading && profile?.role !== 'Business') {
      // Redirect non-business users away.
      router.push('/dashboard');
    }
  }, [profile, profileLoading, router]);

  // Show a loader while profile is being checked.
  if (profileLoading || profile?.role !== 'Business') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If the user is a business user, render the children.
  return <>{children}</>;
}
