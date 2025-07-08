import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If trying to access protected routes without authentication
  if (!session && (
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/chat') ||
    req.nextUrl.pathname.startsWith('/parent')
  )) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // If authenticated, check profile status for proper routing
  if (session) {
    // Get user profile to determine routing
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();

    // If trying to access auth pages but already have a profile, redirect to dashboard
    if (profile && req.nextUrl.pathname.startsWith('/auth') && !req.nextUrl.pathname.includes('/callback')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // If no profile and trying to access protected routes, redirect to role selection
    if (!profile && (
      req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/chat') ||
      req.nextUrl.pathname.startsWith('/parent')
    )) {
      return NextResponse.redirect(new URL('/auth/role-select', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};