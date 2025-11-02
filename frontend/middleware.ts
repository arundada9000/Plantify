import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Public routes that don't require authentication
const publicRoutes = ["/login", "/signup", "/"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Get user from cookie or session (in a real app, this would be verified)
  const userCookie = request.cookies.get("currentUser")

  // If no user cookie and trying to access protected route
  if (!userCookie) {
    // Allow the request to proceed - client-side will handle redirect
    // This is because we're using localStorage for auth in this demo
    return NextResponse.next()
  }

  // Route protection is handled client-side via useAuthGuard hook
  // This middleware just ensures public routes are always accessible
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
