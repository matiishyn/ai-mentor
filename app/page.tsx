'use client';

import { useAuth } from '@/hooks/use-auth';
import { Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, profile, loading } = useAuth();
  console.log(user, profile, loading);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth');
      } else if (!profile) {
        router.push('/auth/role-select');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, profile, loading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
        <p className="text-gray-600">Loading Astra...</p>
      </div>
    </div>
  );
}