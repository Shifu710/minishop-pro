import type { BookingStatus, ItemType, OrderStatus } from "@/lib/data";

const orderColors: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-cyan-100 text-cyan-700",
  preparing: "bg-blue-100 text-blue-700",
  booked: "bg-violet-100 text-violet-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-slate-100 text-slate-700",
  refunded: "bg-rose-100 text-rose-700",
};

const bookingColors: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-cyan-100 text-cyan-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-slate-100 text-slate-700",
  "no-show": "bg-rose-100 text-rose-700",
};

const typeColors: Record<ItemType, string> = {
  product: "bg-teal-100 text-teal-700",
  service: "bg-orange-100 text-orange-700",
  package: "bg-purple-100 text-purple-700",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${orderColors[status]}`}>{status}</span>;
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${bookingColors[status]}`}>{status}</span>;
}

export function ProductTypeBadge({ type }: { type: ItemType }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${typeColors[type]}`}>{type}</span>;
}
