import { redirect } from 'next/navigation';
import { getCurrentAdminSession } from '@/lib/admin-auth';
import { AdminDashboardClient } from './admin-dashboard-client';

export const metadata = {
  title: 'Staff & Agent Blog Portal | County Cargo',
  description: 'Manage and publish blog posts and shipping guides for County Cargo.',
};

export default async function AdminPage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return <AdminDashboardClient initialUser={session} />;
}
