import { PromotionTable } from "@/components/admin/AdminTables";

export default function PromotionsPage() {
  return <Page title="Promotions and banners"><PromotionTable /></Page>;
}

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="grid gap-5"><div><p className="font-bold text-cyan-700">Marketing</p><h1 className="text-3xl font-black">{title}</h1><p className="text-slate-500">Banner list, coupon placeholders, campaign timing, and active/inactive status.</p></div><div className="panel p-5">{children}</div></div>;
}
