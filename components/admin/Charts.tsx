"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#0891b2", "#f97316", "#10b981", "#8b5cf6", "#f43f5e"];

function ChartClient({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  if (!ready) {
    return <div className="h-56 rounded-2xl bg-slate-100" />;
  }

  return <>{children}</>;
}

export function SalesChart({ data }: { data: { date: string; revenue: number; orders: number; bookings: number }[] }) {
  return (
    <div className="panel min-h-80 p-5">
      <h2 className="font-black">Weekly sales and booking trend</h2>
      <div className="mt-5 h-56">
        <ChartClient>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid stroke="#e2e8f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="revenue" stroke="#0891b2" strokeWidth={3} dot={false} />
              <Line dataKey="bookings" stroke="#f97316" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartClient>
      </div>
    </div>
  );
}

export function PieBreakdown({ title, data }: { title: string; data: { name: string; value: number }[] }) {
  return (
    <div className="panel min-h-80 p-5">
      <h2 className="font-black">{title}</h2>
      <div className="mt-5 h-56">
        <ChartClient>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={48} outerRadius={82}>
                {data.map((item, index) => <Cell fill={colors[index % colors.length]} key={item.name} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartClient>
      </div>
    </div>
  );
}

export function TopProductsChart({ data }: { data: { name: string; sales: number; revenue: number }[] }) {
  return (
    <div className="panel min-h-80 p-5">
      <h2 className="font-black">Top products and services</h2>
      <div className="mt-5 h-56">
        <ChartClient>
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical">
              <CartesianGrid stroke="#e2e8f0" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={110} />
              <Tooltip />
              <Bar dataKey="sales" fill="#0891b2" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartClient>
      </div>
    </div>
  );
}
