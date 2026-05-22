"use client";

import Link from "next/link";
import { Input } from "antd";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <Input.Search className="max-w-lg" placeholder="Search products, orders, bookings..." />
        <div className="ml-auto flex items-center gap-3">
          <Link className="btn-secondary min-h-10 px-3 text-sm" href="/mini-preview">H5 preview</Link>
          <span className="rounded-full bg-cyan-50 px-3 py-2 text-sm font-bold text-cyan-700">Demo Admin</span>
        </div>
      </div>
    </header>
  );
}
