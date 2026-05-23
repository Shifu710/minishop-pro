import { NextRequest, NextResponse } from "next/server";
import { resolvePublicShop } from "@/lib/shop/public-shop-service";

export async function GET(request: NextRequest) {
  const suffix = request.nextUrl.searchParams.get("suffix");
  const host =
    request.nextUrl.searchParams.get("host") ??
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host");

  if (!suffix?.trim()) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_REQUEST", message: "Suffix is required." } },
      { status: 400 }
    );
  }

  const result = await resolvePublicShop(suffix, host);

  if (!result.ok) {
    const status = result.code === "NOT_FOUND" ? 404 : result.code === "DISABLED" ? 403 : 404;
    return NextResponse.json(
      { success: false, error: { code: result.code, message: result.message } },
      { status }
    );
  }

  return NextResponse.json({ success: true, data: result.data });
}
