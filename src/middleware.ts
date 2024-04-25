import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
   
    //Finding the direct path
    const path = request.nextUrl.pathname

    // Getting the public paths
    const isPublicPath = path==="/login" || path==="/signup";

    // Getting the token value
    const token = request.cookies.get("token")?.value || ""

    //Checking if is public and has a token
    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    //Checking if is not a public path and has no token
    if(!isPublicPath && !token ){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile",

    ]
}