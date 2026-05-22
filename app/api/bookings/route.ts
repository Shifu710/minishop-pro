import { NextResponse } from "next/server";
import { bookings } from "@/lib/data";

export function GET() {
  return NextResponse.json(bookings);
}
