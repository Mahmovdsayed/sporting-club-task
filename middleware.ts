import { NextResponse } from "next/server";
import { getAuthCookie, getDecodedToken } from "./helpers/auth";
import { baseURL } from "./constant/statics";

export const runtime = "nodejs";

export async function middleware(req: Request) {
  const { pathname, origin } = new URL(req.url);

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  const requestOrigin = req.headers.get("origin");
  const allowedOrigins = [baseURL];

  if (requestOrigin && !allowedOrigins.includes(requestOrigin)) {
    return new NextResponse("CORS policy violation", { status: 403 });
  }

  const token = await getAuthCookie();

  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(`${origin}/auth/signin`);
    }
    return response;
  }

  const decodedToken = await getDecodedToken();

  if (!decodedToken) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(`${origin}/auth/signin`);
    }
    return response;
  }

  if (
    (pathname === "/auth/signin" || pathname === "/auth/signup") &&
    decodedToken
  ) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
