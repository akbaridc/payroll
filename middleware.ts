// File: /pages/_middleware.ts (for TypeScript) or /pages/_middleware.js (for JavaScript)
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Assuming you are using session storage or cookies for auth
    const isAuthenticated = Boolean(req.cookies.get("auth_token")); // Replace with your actual auth check
    console.log(isAuthenticated);

    // Check if the user is on a protected route and is not authenticated
    // if (!isAuthenticated && req.nextUrl.pathname !== '/auth') {
    //   // Redirect them to the login page if they are not authenticated
    //   return NextResponse.redirect(new URL('/auth', req.url));
    // }

    // Allow the request to continue if they are authenticated or if the route is public (e.g., login page)
    return NextResponse.next();
}

export const config = {
    matcher: ["/backoffice/:path*"],
};
