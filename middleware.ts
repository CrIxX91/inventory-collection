// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async  function middleware(req: NextRequest) {
  
    const nextCookies  = req.cookies;
    const accessToken = nextCookies.get('accessToken');
    // console.log(accessToken);
    
    

    if(!accessToken){
      const requestedPage = req.nextUrl.pathname;
      console.log(req.nextUrl.pathname)
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      url.search =`p=${requestedPage}`;
      return NextResponse.redirect(url);
    }

    // console.log('req.nextUrl',req.nextUrl)
    // return NextResponse.next();
    if (req.nextUrl.pathname == '' && accessToken) {
      return NextResponse.rewrite(new URL('/collection/add', req.url))
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/collection/:path*',
}