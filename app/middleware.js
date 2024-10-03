import pb from "../lib/pocketbase";
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const cookie = request.cookies.get('pb_auth');
  pb.authStore.loadFromCookie(cookie?.value || '');

  console.log('middleware', pb.authStore.isValid, request.url);

  if (!pb.authStore.isValid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login route)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};