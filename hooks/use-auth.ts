'use client';

import { Profile, getProfile } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export function useAuth() {
  console.log('useAuth: Hook initialized');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  console.log('useAuth: Current state:', { user, profile, loading });

  useEffect(() => {
    console.log('useAuth: useEffect running!');
    
    // Set a maximum timeout to prevent infinite loading
    const maxTimeout = setTimeout(() => {
      console.log('useAuth: Maximum timeout reached, forcing loading to false');
      setLoading(false);
    }, 10000); // 10 seconds max
    
    // Get initial session with timeout
    const getSessionWithTimeout = async () => {
      try {
        console.log('useAuth: Getting session...');
        
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 5000)
        );
        
        const { data: { session }, error } = await Promise.race([
          sessionPromise,
          timeoutPromise
        ]) as any;
        
        console.log('useAuth: Session result:', { session, error });
        
        if (error) {
          console.error('useAuth: Session error:', error);
          setLoading(false);
          clearTimeout(maxTimeout);
          return;
        }
        
        setUser(session?.user ?? null);
        if (session?.user) {
          console.log('useAuth: User found, loading profile...');
          await loadProfile(session.user.id);
        } else {
          console.log('useAuth: No user found, setting loading to false');
          setLoading(false);
        }
        
        clearTimeout(maxTimeout);
      } catch (error) {
        console.error('useAuth: Session failed:', error);
        setLoading(false);
        clearTimeout(maxTimeout);
      }
    };

    getSessionWithTimeout();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('useAuth: Auth state changed:', event);
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      console.log('useAuth: useEffect cleanup');
      clearTimeout(maxTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      console.log('Loading profile for user:', userId);
      
      // Add timeout to profile loading
      const profilePromise = getProfile(userId);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile timeout')), 5000)
      );
      
      const { data, error } = await Promise.race([
        profilePromise,
        timeoutPromise
      ]) as any;
      
      console.log('Profile result:', { data, error });
      
      if (error) {
        console.error('Profile error:', error);
        setProfile(null);
      } else {
        setProfile(data); // data will be null if no profile exists
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = () => {
    if (user) {
      loadProfile(user.id);
    }
  };

  return { user, profile, loading, refreshProfile };
}