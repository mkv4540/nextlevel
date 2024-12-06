import { withClerkMiddleware } from "@clerk/nextjs/server";

export default withClerkMiddleware();

export const config = {
  matcher: ["/dashboard/:path*", "/protected-route/:path*"],
};