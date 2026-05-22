import { OrderTable } from "@/components/admin/AdminTables";

export default function OrdersPage() {
  return <Page title="Orders management"><OrderTable /></Page>;
}

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="grid gap-5"><div><p className="font-bold text-cyan-700">Operations</p><h1 className="text-3xl font-black">{title}</h1><p className="text-slate-500">Search, update status, copy order IDs, and export CSV in demo mode.</p></div><div className="panel p-5">{children}</div></div>;
}
