
'use client'

import { useProfile } from '@/components/profile-provider';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, profileLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!profileLoading && profile?.role !== 'Admin' && profile?.role !== 'Staff') {
      router.push('/dashboard');
    }
  }, [profile, profileLoading, router]);

  if (profileLoading || (profile?.role !== 'Admin' && profile?.role !== 'Staff')) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
