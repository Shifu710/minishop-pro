import { NextResponse } from "next/server";
import { categories } from "@/lib/data";

export function GET() {
  return NextResponse.json(categories);
}
