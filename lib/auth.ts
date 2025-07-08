import { supabase } from './supabase';

export interface Profile {
  id: string;
  email: string;
  role: 'child' | 'parent';
  name?: string;
  age?: number;
  interests?: string;
  xp?: number;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/auth/callback',
    },
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

export async function createProfile(profile: {
  id: string;
  email: string;
  role: 'child' | 'parent';
  name?: string;
  age?: number;
  interests?: string;
}) {
  console.log('Creating profile:', profile);
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: profile.id,
        email: profile.email,
        role: profile.role,
        name: profile.name || null,
        age: profile.age || null,
        interests: profile.interests || null,
      })
      .select()
      .single();
      
    console.log('Profile creation result:', { data, error });
    
    if (error) {
      console.error('Supabase error details:', error);
      throw new Error(`Failed to create profile: ${error.message}`);
    }
    
    return { data, error };
  } catch (err) {
    console.error('Profile creation error:', err);
    return { 
      data: null, 
      error: err instanceof Error ? err : new Error('Unknown error occurred') 
    };
  }
}

export async function getProfile(userId: string) {
  console.log('getProfile: Starting query for userId:', userId);
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    console.log('getProfile: Query completed:', { data, error });
    return { data, error };
  } catch (err) {
    console.error('getProfile: Query failed with exception:', err);
    return { data: null, error: err };
  }
}

export async function updateProfile(userId: string, updates: Partial<{
  name: string;
  age: number;
  interests: string;
  xp: number;
}>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
}