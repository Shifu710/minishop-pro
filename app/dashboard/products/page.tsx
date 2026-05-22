import { ProductTable } from "@/components/admin/ProductTable";

export default function ProductsPage() {
  return <Page title="Products / services" subtitle="Manage products, services, packages, pricing, stock, and booking availability."><ProductTable /></Page>;
}

function Page({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <div className="grid gap-5"><div><p className="font-bold text-cyan-700">Management</p><h1 className="text-3xl font-black">{title}</h1><p className="text-slate-500">{subtitle}</p></div>{children}</div>;
}
