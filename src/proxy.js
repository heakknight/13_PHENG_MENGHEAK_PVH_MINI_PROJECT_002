import { NextResponse } from 'next/server';
import { auth } from "./app/auth";

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;
  const session = !!request.auth;

  const protectedRoutes = [
    '/products',
    '/manage-products',
    '/orders',
    '/categories',
    '/cart'
  ];

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/products/:path*',
    '/manage-products/:path*',
    '/orders/:path*',
    '/categories/:path*',
    '/cart/:path*',
  ],
};