"use client";

import { Button, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BookingStatusBadge, OrderStatusBadge } from "@/components/shared/Badges";
import { bookings, categories, customers, orders, promotions, type Booking, type Category, type Customer, type Order, type Promotion } from "@/lib/data";

export function CategoryTable() {
  const columns: ColumnsType<Category> = [
    { title: "Icon", dataIndex: "icon" },
    { title: "English name", dataIndex: "name" },
    { title: "Chinese name", dataIndex: "nameZh" },
    { title: "Sort", dataIndex: "sortOrder" },
    { title: "Status", dataIndex: "isActive", render: (value: boolean) => <Tag color={value ? "green" : "red"}>{value ? "active" : "inactive"}</Tag> },
    { title: "Actions", render: () => <Button>Edit</Button> },
  ];
  return <Table columns={columns} dataSource={categories} rowKey="id" />;
}

export function OrderTable() {
  const columns: ColumnsType<Order> = [
    { title: "Order ID", dataIndex: "orderNo", render: (value: string) => <button className="font-bold text-cyan-700" onClick={() => {
      void navigator.clipboard.writeText(value);
      message.success("Order ID copied");
    }} type="button">{value}</button> },
    { title: "Customer", dataIndex: "customerName" },
    { title: "Products/services", dataIndex: "items", render: (items: string[]) => items.join(", ") },
    { title: "Amount", dataIndex: "totalAmount", render: (value: number) => `¥${value}` },
    { title: "Payment", dataIndex: "paymentStatus", render: (value: string) => <Tag color={value === "paid" ? "green" : value === "simulated" ? "cyan" : "gold"}>{value}</Tag> },
    { title: "Status", dataIndex: "orderStatus", render: (value: Order["orderStatus"]) => <OrderStatusBadge status={value} /> },
    { title: "Channel", dataIndex: "channel" },
    { title: "Created", dataIndex: "createdAt" },
    { title: "Actions", render: () => <Button>View drawer</Button> },
  ];
  return <Table columns={columns} dataSource={orders} rowKey="id" />;
}

export function BookingTable() {
  const columns: ColumnsType<Booking> = [
    { title: "Customer", dataIndex: "customerName" },
    { title: "Service", dataIndex: "serviceName" },
    { title: "Booking time", dataIndex: "bookingTime" },
    { title: "Duration", dataIndex: "duration", render: (value: number) => `${value} min` },
    { title: "Status", dataIndex: "status", render: (value: Booking["status"]) => <BookingStatusBadge status={value} /> },
    { title: "Staff", dataIndex: "assignedStaff" },
    { title: "Notes", dataIndex: "notes" },
    { title: "Actions", render: () => <Button>Update status</Button> },
  ];
  return <Table columns={columns} dataSource={bookings} rowKey="id" />;
}

export function CustomerTable() {
  const columns: ColumnsType<Customer> = [
    { title: "Customer", dataIndex: "name" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Language", dataIndex: "language" },
    { title: "Total spent", dataIndex: "totalSpent", render: (value: number) => `¥${value}` },
    { title: "Orders", dataIndex: "totalOrders" },
    { title: "Last activity", dataIndex: "lastActivity" },
    { title: "Tags", dataIndex: "tags", render: (tags: string[]) => tags.map((tag) => <Tag key={tag}>{tag}</Tag>) },
    { title: "Actions", render: () => <Button>Profile</Button> },
  ];
  return <Table columns={columns} dataSource={customers} rowKey="id" />;
}

export function PromotionTable() {
  const columns: ColumnsType<Promotion> = [
    { title: "Title", dataIndex: "title", render: (_, row) => <span className="font-bold">{row.titleZh}<span className="block text-xs font-normal text-slate-500">{row.title}</span></span> },
    { title: "Type", dataIndex: "type" },
    { title: "Status", dataIndex: "status", render: (value: string) => <Tag color={value === "active" ? "green" : "default"}>{value}</Tag> },
    { title: "Start", dataIndex: "startDate" },
    { title: "End", dataIndex: "endDate" },
    { title: "Actions", render: () => <Button>Edit</Button> },
  ];
  return <Table columns={columns} dataSource={promotions} rowKey="id" />;
}
