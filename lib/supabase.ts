import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

console.log('Creating Supabase client...');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClientComponentClient();

console.log('Supabase client created:', !!supabase);

export type Profile = {
  id: string;
  email: string;
  role: 'child' | 'parent';
  name?: string;
  age?: number;
  interests?: string;
  xp: number;
  created_at: string;
  updated_at: string;
};