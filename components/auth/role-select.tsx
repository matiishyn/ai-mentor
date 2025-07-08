'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createProfile } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { Users, Baby, Loader2, ArrowRight } from 'lucide-react';

export default function RoleSelect() {
  const [selectedRole, setSelectedRole] = useState<'child' | 'parent' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleRoleSelect = async () => {
    if (!selectedRole || !user) return;

    setLoading(true);
    setError('');

    try {
      const { error } = await createProfile({
        id: user.id,
        email: user.email!,
        role: selectedRole,
      });

      if (error) throw error;

      if (selectedRole === 'child') {
        router.push('/auth/onboarding');
      } else {
        router.push('/parent/dashboard');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Choose Your Role
          </h1>
          <p className="text-gray-600">
            Select how you'll be using Astra to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedRole === 'child' 
                ? 'ring-2 ring-purple-500 bg-purple-50' 
                : 'bg-white/80 backdrop-blur-sm'
            }`}
            onClick={() => setSelectedRole('child')}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedRole === 'child' 
                    ? 'bg-purple-500' 
                    : 'bg-gradient-to-br from-purple-400 to-pink-400'
                }`}>
                  <Baby className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl">I'm a Child</CardTitle>
              <CardDescription>
                Learn life skills with your AI mentor Astra
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Daily conversations with Astra</li>
                <li>• Earn XP and unlock achievements</li>
                <li>• Build confidence and social skills</li>
                <li>• Track your personal growth</li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedRole === 'parent' 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'bg-white/80 backdrop-blur-sm'
            }`}
            onClick={() => setSelectedRole('parent')}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedRole === 'parent' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-br from-blue-400 to-indigo-400'
                }`}>
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl">I'm a Parent</CardTitle>
              <CardDescription>
                Monitor and guide your child's learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• View your child's progress</li>
                <li>• Set learning goals together</li>
                <li>• Receive weekly reports</li>
                <li>• Customize learning preferences</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <Button 
            onClick={handleRoleSelect}
            disabled={!selectedRole || loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}