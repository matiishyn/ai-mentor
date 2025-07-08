'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SignOutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function SignOutButton({
  variant = 'ghost',
  size = 'sm',
  className = "text-gray-600 hover:text-red-600"
}: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth');
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      className={className}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </Button>
  );
} 