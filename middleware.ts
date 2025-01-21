import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    
    // Get the auth token from cookies
    const authToken = req.cookies.get("auth_token"); // Use cookies to store the token on the client side

    // Check if the user is accessing the root page and is already authenticated
    if (authToken && req.nextUrl.pathname === "/") {
        // Redirect to the backoffice dashboard if user is authenticated and visiting the root URL
        const response = NextResponse.redirect(new URL('/', req.url)); // Adjust the redirect path as needed

        // Set a cookie that will be used by the client-side to show the dialog
        response.cookies.set("dialogOpen", JSON.stringify({
            title: "Error!",
            message: "You must be logged in to access this page.",
            type: "error",
        }));

        return response;
    }

    // Example check for protected route
    if (!authToken && req.nextUrl.pathname.startsWith("/backoffice")) {
        // Redirect if not authenticated
        return NextResponse.redirect(new URL('/', req.url)); // Adjust the redirect path as needed
    }

    // Allow the request to continue if the user is authenticated or the route is public
    return NextResponse.next();
}

export const config = {
    matcher: ["/backoffice/:path*", "/"],  // Adjust to match your protected routes
};
