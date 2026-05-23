"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarCheck, Globe, Home, Images, LayoutGrid, Package, Settings, ShoppingBag, Users } from "lucide-react";

const nav = [
  ["/dashboard", "Overview", Home],
  ["/dashboard/products", "Products", Package],
  ["/dashboard/categories", "Categories", LayoutGrid],
  ["/dashboard/orders", "Orders", ShoppingBag],
  ["/dashboard/bookings", "Bookings", CalendarCheck],
  ["/dashboard/customers", "Customers", Users],
  ["/dashboard/promotions", "Promotions", Images],
  ["/dashboard/analytics", "Analytics", BarChart3],
  ["/dashboard/domains", "Shop Links", Globe],
  ["/dashboard/settings", "Settings", Settings],
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white p-4 lg:block">
      <Link className="flex items-center gap-3 rounded-2xl p-2 font-black" href="/">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">MS</span>
        <span>
          MiniShop Pro
          <span className="block text-xs font-medium text-slate-500">小店智选</span>
        </span>
      </Link>
      <nav className="mt-8 grid gap-1">
        {nav.map(([href, label, Icon]) => {
          const active = pathname === href;
          return (
            <Link className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-cyan-50 text-cyan-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`} href={href} key={href}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
