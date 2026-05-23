import { NextRequest, NextResponse } from "next/server";
import {
  createMerchantDomain,
  listMerchantDomains,
} from "@/lib/shop/merchant-store";
import type { ShopStyle, ShopStatus } from "@/lib/shop/types";

function isAdmin(request: NextRequest): boolean {
  return request.cookies.get("minishop_session")?.value === "demo-session";
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const data = await listMerchantDomains();
  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

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

  if (!body.merchantId || !body.merchantName || !body.domain || !body.suffix || !body.defaultStyle) {
    return NextResponse.json(
      { success: false, error: "merchantId, merchantName, domain, suffix, and defaultStyle are required." },
      { status: 400 }
    );
  }

  const result = await createMerchantDomain({
    merchantId: body.merchantId,
    merchantName: body.merchantName,
    domain: body.domain,
    suffix: body.suffix,
    defaultStyle: body.defaultStyle,
    status: body.status ?? "active",
    isPrimary: body.isPrimary,
    remark: body.remark,
  });

  if (result.error) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: result.record }, { status: 201 });
}
