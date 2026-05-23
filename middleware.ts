import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const host = req.headers.get("host")?.toLowerCase() ?? "";
  if (host === "ppltok.com" || host === "www.ppltok.com") {
    const url = req.nextUrl.clone();
    if (url.pathname !== "/chat") {
      url.pathname = "/chat";
      return NextResponse.rewrite(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
