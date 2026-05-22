import { BarChart3, CalendarCheck, Package, ShoppingBag, Users, Wallet } from "lucide-react";
import { PieBreakdown, SalesChart, TopProductsChart } from "@/components/admin/Charts";
import { StatCard } from "@/components/admin/StatCard";
import { analyticsSeries, bookings, customers, orderBreakdown, orders, products, topProducts } from "@/lib/data";

export default function DashboardPage() {
  const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <p className="text-sm font-bold text-cyan-700">Admin overview</p>
        <h1 className="mt-2 text-3xl font-black">Welcome back, Demo Admin. Your MiniShop Pro dashboard is ready.</h1>
        <p className="mt-2 text-slate-500">欢迎回来，Demo Admin。小店智选后台已准备就绪。</p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard icon={Wallet} note="+18% this week" title="Total revenue" value={`¥${revenue}`} />
        <StatCard icon={ShoppingBag} note="12 demo orders" title="Orders today" value="24" />
        <StatCard icon={CalendarCheck} note="8 active bookings" title="Pending bookings" value={String(bookings.length)} />
        <StatCard icon={Users} note="+10 customers" title="Customers" value={String(customers.length)} />
        <StatCard icon={Package} note="12 live items" title="Products active" value={String(products.length)} />
        <StatCard icon={BarChart3} note="+3.2%" title="Conversion" value="8.6%" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <SalesChart data={analyticsSeries} />
        <PieBreakdown data={orderBreakdown} title="Order status breakdown" />
      </section>
      <TopProductsChart data={topProducts} />
    </div>
  );
}
