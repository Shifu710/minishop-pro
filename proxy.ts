import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const session = request.cookies.get("minishop_session")?.value;

  if (isDashboard && session !== "demo-session") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
