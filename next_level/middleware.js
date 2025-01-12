import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/contact",
    "/studymaterial",
    "/ncert",
    "/ncert/(.*)",
    "/api/upload"
  ],
  // Protect the reward-quiz and wallet routes
  privateRoutes: [
    "/reward-quiz",
    "/reward-quiz/(.*)",
    "/wallet",
    "/quiz/(.*)"
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 
