import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
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

  const cookieHeader = req.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  const allowedOrigins = [baseURL];
  const requestOrigin = req.headers.get("origin");

  if (requestOrigin && !allowedOrigins.includes(requestOrigin)) {
    return new NextResponse("CORS policy violation", { status: 403 });
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(`${origin}/auth/signin`);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET || "");
    } catch {
      return NextResponse.redirect(`${origin}/auth/signin`);
    }
  }

  if ((pathname === "/auth/signin" || pathname === "/auth/signup") && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET || "");
      return NextResponse.redirect(`${origin}/dashboard`);
    } catch {
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
