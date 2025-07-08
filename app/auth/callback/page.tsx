'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // This page will be handled by the route handler
    // But we show a loading state just in case
    const timer = setTimeout(() => {
      router.push('/auth/role-select');
    }, 2000);
    

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
        <p className="text-gray-600">Completing your registration...</p>
      </div>
    </div>
  );
}