"use client";

import Image from "next/image";
import { Button, Input, Modal, Select, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { ProductTypeBadge } from "@/components/shared/Badges";
import { categories, products as initialProducts, type Product } from "@/lib/data";

export function ProductTable() {
  const [rows, setRows] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => rows.filter((item) => (type === "all" || item.type === type) && `${item.name} ${item.nameZh}`.toLowerCase().includes(query.toLowerCase())), [query, rows, type]);
  const columns: ColumnsType<Product> = [
    { title: "Image", dataIndex: "image", render: (src: string, row) => <Image alt={row.name} className="rounded-xl object-cover" height={48} src={src} width={64} /> },
    { title: "Name", dataIndex: "name", render: (_, row) => <span className="font-bold">{row.nameZh}<span className="block text-xs font-normal text-slate-500">{row.name}</span></span> },
    { title: "Type", dataIndex: "type", render: (value: Product["type"]) => <ProductTypeBadge type={value} /> },
    { title: "Category", dataIndex: "category" },
    { title: "Price", dataIndex: "price", render: (value: number) => `¥${value}` },
    { title: "Stock", dataIndex: "stock" },
    { title: "Sales", dataIndex: "salesCount" },
    { title: "Status", dataIndex: "status", render: (value: string) => <Tag color={value === "active" ? "green" : value === "sold-out" ? "red" : "gold"}>{value}</Tag> },
    { title: "Actions", render: (_, row) => <div className="flex gap-2"><Button>Edit</Button><Button danger onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}>Delete</Button></div> },
  ];
  return (
    <div className="panel p-5">
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px_auto]">
        <Input placeholder="Search product or service" value={query} onChange={(event) => setQuery(event.target.value)} />
        <Select value={type} onChange={setType} options={[{ label: "All types", value: "all" }, { label: "Product", value: "product" }, { label: "Service", value: "service" }, { label: "Package", value: "package" }]} />
        <Button onClick={() => setOpen(true)} type="primary">Add product</Button>
      </div>
      <Table columns={columns} dataSource={filtered} pagination={{ pageSize: 8 }} rowKey="id" />
      <Modal open={open} onCancel={() => setOpen(false)} onOk={() => {
        message.success("Demo product saved");
        setOpen(false);
      }} title="Add product/service">
        <div className="grid gap-3">
          <Input placeholder="English name" />
          <Input placeholder="Chinese name" />
          <Select options={categories.map((category) => ({ label: category.nameZh, value: category.id }))} placeholder="Category" />
          <Input placeholder="Image URL" />
          <Input.TextArea placeholder="Description" rows={4} />
        </div>
      </Modal>
    </div>
  );
}
