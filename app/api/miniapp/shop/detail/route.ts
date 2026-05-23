import { NextRequest, NextResponse } from "next/server";
import { getMiniappShopByMerchantId } from "@/lib/shop/public-shop-service";

export async function GET(request: NextRequest) {
  const merchantId = request.nextUrl.searchParams.get("merchantId");
  if (!merchantId) {
    return NextResponse.json({ success: false, error: "merchantId is required" }, { status: 400 });
  }

  const data = await getMiniappShopByMerchantId(merchantId);
  if (!data) {
    return NextResponse.json({ success: false, error: "Shop not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data });
}
