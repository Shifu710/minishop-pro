import { NextResponse } from "next/server";
import { analyticsSeries, orderBreakdown, revenueByChannel, topProducts } from "@/lib/data";

export function GET() {
  return NextResponse.json({ analyticsSeries, orderBreakdown, revenueByChannel, topProducts });
}
