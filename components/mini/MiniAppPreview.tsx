"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, orders, products } from "@/lib/data";

type Tab = "home" | "category" | "cart" | "orders" | "profile";

export function MiniAppPreview() {
  const [tab, setTab] = useState<Tab>("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<string[]>(["p-004"]);
  const filtered = useMemo(() => activeCategory === "all" ? products : products.filter((item) => item.categoryId === activeCategory), [activeCategory]);
  const cartItems = products.filter((item) => cart.includes(item.id));
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  function productCard(productId: string) {
    const product = products.find((item) => item.id === productId) ?? products[0];
    return (
      <div className="mini-card overflow-hidden" key={product.id}>
        <Image alt={product.nameZh} className="h-28 w-full object-cover" height={160} src={product.image} width={240} />
        <div className="p-3">
          <p className="line-clamp-1 font-bold text-slate-900">{product.nameZh}</p>
          <p className="mt-1 text-xs text-slate-500">{product.type === "service" ? "可预约服务" : product.type === "package" ? "精选套餐" : "商品"}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-black text-orange-500">¥{product.price}</span>
            <button className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white" onClick={() => setCart((items) => Array.from(new Set([...items, product.id])))} type="button">
              {product.type === "product" ? "加购" : "预约"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="phone-frame mx-auto flex flex-col">
      <div className="bg-gradient-to-br from-cyan-600 to-teal-600 px-5 pb-5 pt-8 text-white">
        <p className="text-xs opacity-80">H5 Preview Mode / 小程序浏览器预览</p>
        <h1 className="mt-2 text-2xl font-black">小店智选</h1>
        <p className="mt-1 text-sm opacity-90">商品销售 · 服务预约 · 模拟支付</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "home" ? (
          <div className="grid gap-4">
            <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-500">搜索商品或服务</div>
            <div className="rounded-3xl bg-orange-100 p-4 text-orange-800">
              <p className="font-black">限时优惠</p>
              <p className="mt-1 text-sm">新人下单立减 ¥30，当前为演示支付流程，不会产生真实付款。</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {categories.slice(0, 4).map((category) => (
                <button className="mini-card grid place-items-center gap-1 p-3 text-xs" key={category.id} onClick={() => {
                  setActiveCategory(category.id);
                  setTab("category");
                }} type="button">
                  <span className="text-xl">{category.icon}</span>
                  {category.nameZh}
                </button>
              ))}
            </div>
            <SectionTitle title="热门推荐" />
            <div className="grid grid-cols-2 gap-3">{products.slice(0, 4).map((item) => productCard(item.id))}</div>
            <SectionTitle title="精选服务" />
            <div className="grid gap-3">{products.filter((item) => item.type === "service").slice(0, 2).map((item) => (
              <div className="mini-card flex gap-3 p-3" key={item.id}>
                <Image alt={item.nameZh} className="h-20 w-20 rounded-xl object-cover" height={120} src={item.image} width={120} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">{item.nameZh}</p>
                  <p className="mt-1 text-xs text-slate-500">服务时长 {item.serviceDuration} 分钟</p>
                  <p className="mt-2 font-black text-orange-500">¥{item.price}</p>
                </div>
              </div>
            ))}</div>
          </div>
        ) : null}
        {tab === "category" ? (
          <div className="grid gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button className={`rounded-full px-3 py-2 text-sm ${activeCategory === "all" ? "bg-cyan-600 text-white" : "bg-white text-slate-700"}`} onClick={() => setActiveCategory("all")} type="button">全部</button>
              {categories.map((category) => <button className={`shrink-0 rounded-full px-3 py-2 text-sm ${activeCategory === category.id ? "bg-cyan-600 text-white" : "bg-white text-slate-700"}`} key={category.id} onClick={() => setActiveCategory(category.id)} type="button">{category.nameZh}</button>)}
            </div>
            <div className="grid grid-cols-2 gap-3">{filtered.map((item) => productCard(item.id))}</div>
          </div>
        ) : null}
        {tab === "cart" ? (
          <div className="grid gap-4">
            <h2 className="text-xl font-black">购物车</h2>
            {cartItems.length ? cartItems.map((item) => (
              <div className="mini-card flex gap-3 p-3" key={item.id}>
                <Image alt={item.nameZh} className="h-16 w-16 rounded-xl object-cover" height={96} src={item.image} width={96} />
                <div className="flex-1">
                  <p className="font-bold">{item.nameZh}</p>
                  <p className="font-black text-orange-500">¥{item.price}</p>
                </div>
                <button className="text-sm text-slate-400" onClick={() => setCart((items) => items.filter((id) => id !== item.id))} type="button">删除</button>
              </div>
            )) : <div className="mini-card p-6 text-center text-slate-500">购物车为空</div>}
            <div className="mini-card p-4">
              <p className="text-sm text-slate-500">合计</p>
              <p className="text-2xl font-black text-orange-500">¥{total}</p>
              <button className="mt-3 h-12 w-full rounded-2xl bg-cyan-600 font-bold text-white" type="button">提交订单 · 模拟微信支付</button>
              <p className="mt-3 text-xs text-slate-500">当前为演示支付流程，不会产生真实付款。</p>
            </div>
          </div>
        ) : null}
        {tab === "orders" ? (
          <div className="grid gap-3">
            <h2 className="text-xl font-black">订单</h2>
            {orders.slice(0, 5).map((order) => <div className="mini-card p-4" key={order.id}><div className="flex justify-between"><span className="font-bold">{order.orderNo}</span><span className="text-sm text-cyan-700">{order.orderStatus}</span></div><p className="mt-2 text-sm text-slate-500">{order.items.join(" / ")}</p><p className="mt-2 font-black text-orange-500">¥{order.totalAmount}</p></div>)}
          </div>
        ) : null}
        {tab === "profile" ? (
          <div className="grid gap-4">
            <div className="mini-card p-5">
              <p className="text-xl font-black">我的</p>
              <p className="mt-1 text-slate-500">Demo User / H5 Preview</p>
            </div>
            {["我的订单", "我的预约", "我的收藏", "优惠券", "联系客服", "设置"].map((item) => <button className="mini-card flex justify-between p-4 text-left" key={item} type="button"><span>{item}</span><span>›</span></button>)}
          </div>
        ) : null}
      </div>
      <div className="safe-bottom grid grid-cols-5 border-t bg-white px-2 pt-2 text-center text-xs">
        {[
          ["home", "首页"],
          ["category", "分类"],
          ["cart", "购物车"],
          ["orders", "订单"],
          ["profile", "我的"],
        ].map(([key, label]) => (
          <button className={`py-2 ${tab === key ? "font-bold text-cyan-700" : "text-slate-500"}`} key={key} onClick={() => setTab(key as Tab)} type="button">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-lg font-black text-slate-900">{title}</h2>;
}
