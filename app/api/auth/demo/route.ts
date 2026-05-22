import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = schema.parse(await request.json());
  const demoEmail = process.env.DEMO_EMAIL || "demo@minishop.pro";
  const demoPassword = process.env.DEMO_PASSWORD || "demo123456";

  if (body.email !== demoEmail || body.password !== demoPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("minishop_session", "demo-session", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ user: { name: "Demo Admin", email: demoEmail, role: "admin" } });
}
