import type { LucideIcon } from "lucide-react";

export function StatCard({ title, value, note, icon: Icon }: { title: string; value: string; note: string; icon: LucideIcon }) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-700"><Icon size={18} /></span>
      </div>
      <p className="mt-4 text-3xl font-black">{value}</p>
      <p className="mt-2 text-sm text-emerald-600">{note}</p>
    </div>
  );
}
