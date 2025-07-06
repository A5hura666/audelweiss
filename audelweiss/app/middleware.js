// middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/auth';

export function middleware(request) {
    const protectedPaths = ['/protected', '/admin', '/account'];
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('token')?.value || request.headers.get('authorization');

    if (protectedPaths.some((path) => pathname.startsWith(path))) {
        if (!token) {
            return NextResponse.redirect(new URL('/my-account', request.url));
        }

        const valid = verifyToken(token);
        if (!valid) {
            return NextResponse.redirect(new URL('/my-account', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/protected/:path*', '/admin/:path*', '/account'],
};