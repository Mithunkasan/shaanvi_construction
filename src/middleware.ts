import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Redirect for the hidden admin path
    if (path === '/admin') {
      if (token?.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    // 2. Protect Admin Dashboard
    if (path.startsWith('/admin/dashboard')) {
      if (token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    // 3. Protect User Dashboard
    if (path.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: () => true, // Always run the middleware function to allow custom redirects
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/dashboard/:path*', '/admin'],
};
