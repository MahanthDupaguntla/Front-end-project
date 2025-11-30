import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_user');
  const { pathname } = request.nextUrl;

  // If user is not logged in and trying to access protected routes
  if (!token && !pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and tries to access login page
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
