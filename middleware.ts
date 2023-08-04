// Importing the authMiddleware from "@clerk/nextjs" to protect routes with authentication
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

// Configuring authMiddleware to protect all routes except the ones specified in publicRoutes array
export default authMiddleware({
    publicRoutes: ["/", "/api/webhook"], // List of routes that are public and do not require authentication
});

// Configuring custom config for the middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], // Custom matcher for fine-grained control over which routes to protect
};
