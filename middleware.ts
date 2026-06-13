import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Proteger /admin con Basic Auth
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const auth = req.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "empleoon-admin";
    const expected = "Basic " + Buffer.from(`admin:${adminPassword}`).toString("base64");

    if (auth !== expected) {
      return new NextResponse("Acceso denegado", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Empleoon Admin"' },
      });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
