import { BookingTable } from "@/components/admin/AdminTables";

export default function BookingsPage() {
  return <Page title="Booking management"><BookingTable /></Page>;
}

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="grid gap-5"><div><p className="font-bold text-cyan-700">Schedule</p><h1 className="text-3xl font-black">{title}</h1><p className="text-slate-500">Booking calendar and table workflow with reschedule placeholders.</p></div><div className="panel p-5">{children}</div></div>;
}
