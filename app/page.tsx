import Link from "next/link";
import { ArrowRight, BarChart3, CalendarCheck, Package, ShieldCheck, ShoppingBag, Smartphone } from "lucide-react";
import { MiniAppPreview } from "@/components/mini/MiniAppPreview";

const features = [
  ["Mini program H5 preview", "Chinese-first mobile commerce and booking flow.", Smartphone],
  ["Product and service sales", "Products, services, packages, cart, and checkout simulation.", ShoppingBag],
  ["Booking workflow", "Service slots, booking status, and admin-side booking management.", CalendarCheck],
  ["Admin dashboard", "Products, orders, customers, promotions, analytics, and settings.", BarChart3],
  ["Prisma data model", "Schema prepared for Supabase PostgreSQL and production upgrade.", Package],
  ["Safe payment simulation", "No real WeChat Pay or merchant credentials in portfolio mode.", ShieldCheck],
] as const;

export default function LandingPage() {
  return (
    <main className="admin-bg min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link className="flex items-center gap-3 font-black" href="/">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-200">MS</span>
          MiniShop Pro
        </Link>
        <div className="flex gap-3">
          <Link className="btn-secondary hidden sm:inline-flex" href="/case-study/minishop-pro">Case study</Link>
          <Link className="btn-primary" href="/login">Try admin demo</Link>
        </div>
      </nav>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1fr_430px]">
        <div>
          <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100">小店智选 / China-market portfolio project</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">WeChat Mini Program E-commerce & Booking System</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">MiniShop Pro helps small businesses sell products, manage service bookings, track orders, and operate from one modern admin dashboard.</p>
          <p className="mt-3 max-w-2xl text-slate-400">小店智选帮助本地商家通过小程序完成商品销售、服务预约、订单管理和数据分析。</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" href="/login">Try Admin Demo <ArrowRight size={18} /></Link>
            <Link className="btn-secondary" href="/t/demo-shop">Open Public Shop</Link>
            <Link className="btn-secondary" href="/mini-preview">H5 Preview</Link>
            <Link className="btn-secondary" href="/case-study/minishop-pro">View Case Study</Link>
          </div>
        </div>
        <MiniAppPreview />
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map(([title, body, Icon]) => (
            <div className="dark-panel p-5" key={title}>
              <Icon className="text-cyan-300" />
              <h2 className="mt-4 font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl font-black">Demo mode is safe for recruiters</h2>
        <p className="mt-3 text-slate-400">The project uses mock data, simulated payment, and no real WeChat credentials. Real WeChat Login and WeChat Pay are documented as future secure server-side integrations.</p>
        <Link className="btn-primary mt-6" href="/login">Open dashboard</Link>
      </section>
    </main>
  );
}
