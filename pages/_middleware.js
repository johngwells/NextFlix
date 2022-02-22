import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../lib/utils';

export async function middleware(req, ev) {
  const token = req ? req?.cookies.token : null;
  const userId = await verifyToken(token);
  const { pathname } = req.nextUrl;

  if (
    pathname.includes('/api/login') ||
    userId ||
    pathname.includes('/static')
  ) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
