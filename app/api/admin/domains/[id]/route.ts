import { NextRequest, NextResponse } from "next/server";
import { deleteMerchantDomain, updateMerchantDomain } from "@/lib/shop/merchant-store";
import type { ShopStyle, ShopStatus } from "@/lib/shop/types";

function isAdmin(request: NextRequest): boolean {
  return request.cookies.get("minishop_session")?.value === "demo-session";
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as {
    merchantId?: string;
    merchantName?: string;
    domain?: string;
    suffix?: string;
    defaultStyle?: ShopStyle;
    status?: ShopStatus;
    isPrimary?: boolean;
    remark?: string;
  };

  const result = await updateMerchantDomain(id, body);
  if (result.error) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: result.record });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const result = await deleteMerchantDomain(id);
  if (result.error) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
