import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();

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