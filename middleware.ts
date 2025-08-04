import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get('admin-auth')?.value

  if (request.nextUrl.pathname.startsWith('/admin/add')) {
    if (isAuth !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/add'],
}
