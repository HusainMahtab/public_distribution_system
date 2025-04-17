import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 export {default} from 'next-auth/middleware'
 import {getToken} from "next-auth/jwt"
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token=await getToken({req:request,secret:process.env.JWT_SECRET_KEY})
    //console.log("token",token)
    const url=request.nextUrl
    if(token && (
       url.pathname.startsWith('/home') ||
       url.pathname.startsWith('/sign-in') || 
       url.pathname.startsWith('/sign-up')        
    )
){
    return NextResponse.redirect(new URL('/admin-panel', request.url))
}
if(!token && url.pathname.startsWith('/admin-panel')){
    return NextResponse.redirect(new URL('/login', request.url))
}
if(!token && url.pathname.startsWith('/distributions')){
    return NextResponse.redirect(new URL('/login', request.url))
}
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/loin',
    '/signup',
    '/home',
    '/distributions',
    '/admin-panel/:path*',
]
}