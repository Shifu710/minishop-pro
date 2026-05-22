import { PieBreakdown, SalesChart, TopProductsChart } from "@/components/admin/Charts";
import { analyticsSeries, orderBreakdown, revenueByChannel, topProducts } from "@/lib/data";

export default function AnalyticsPage() {
  return (
    <div className="grid gap-5">
      <div>
        <p className="font-bold text-cyan-700">Analytics</p>
        <h1 className="text-3xl font-black">Data overview</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <SalesChart data={analyticsSeries} />
        <PieBreakdown data={orderBreakdown} title="Order status breakdown" />
        <PieBreakdown data={revenueByChannel} title="Revenue by channel" />
        <TopProductsChart data={topProducts} />
      </div>
    </div>
  );
}
