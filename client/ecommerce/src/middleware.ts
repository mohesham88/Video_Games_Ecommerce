import { NextRequest, NextResponse } from 'next/server';
/* import jwt from 'jsonwebtoken';
 */
export function middleware(req : NextRequest) {
  const userToken = req.cookies.get('accessToken')?.value;
  const url = req.nextUrl.clone();
  const {pathname} = url;
    // Redirect unauthenticated users to /auth if trying to access protected routes
  if (!userToken && pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', req.url));
  }
  
   // Redirect authenticated users away from /auth pages to the home page
  if (userToken && pathname.startsWith('/auth')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  try {
    /* fetch("http://localhost:8080/api/v1/auth/verify", {) */
    return NextResponse.next();
  } catch (err) {
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard', '/profile' , '/auth' ], // Routes to protect
};