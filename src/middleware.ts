import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Checking for some form of auth state if possible. 
  // Since we use zustand with localstorage, the server middleware can't directly read it.
  // Instead, we can look for the refreshToken cookie.
  const hasRefreshToken = request.cookies.has('refreshToken');
  
  const isPublicRoute = publicRoutes.includes(pathname);
  
  if (!hasRefreshToken && !isPublicRoute) {
    // Redirect to login if accessing a protected route without auth
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (hasRefreshToken && (pathname === '/login' || pathname === '/register')) {
    // Redirect to dashboard if trying to access login/register while authenticated
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
