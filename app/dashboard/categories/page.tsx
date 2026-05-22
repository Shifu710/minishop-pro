import { CategoryTable } from "@/components/admin/AdminTables";

export default function CategoriesPage() {
  return <Page title="Categories management"><CategoryTable /></Page>;
}

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="grid gap-5"><div><p className="font-bold text-cyan-700">Management</p><h1 className="text-3xl font-black">{title}</h1></div><div className="panel p-5">{children}</div></div>;
}
