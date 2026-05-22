import { CustomerTable } from "@/components/admin/AdminTables";

export default function CustomersPage() {
  return <Page title="Customers management"><CustomerTable /></Page>;
}

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="grid gap-5"><div><p className="font-bold text-cyan-700">CRM</p><h1 className="text-3xl font-black">{title}</h1><p className="text-slate-500">Customer profiles, order history, booking history, tags, notes, and language preferences.</p></div><div className="panel p-5">{children}</div></div>;
}
