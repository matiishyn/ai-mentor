'use client';

import XPDashboard from '@/components/dashboard/xp-dashboard';
import ParentDashboard from '@/components/parent/parent-dashboard';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  console.log('user', user);
  console.log('profile', profile);
  console.log('loading', loading);

  useEffect(() => {
    if (!loading && !user) {
      // router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return profile.role === 'child' ? <XPDashboard /> : <ParentDashboard />;
}