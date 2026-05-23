"use client";

import { useMemo, useState } from "react";
import { ProductImage } from "./ProductImage";
import type { PublicProduct, PublicShopPayload } from "@/lib/shop/types";

type Tab = "home" | "category" | "cart" | "orders" | "profile";

type Props = {
  data: PublicShopPayload;
};

export function Style2Shop({ data }: Props) {
  const [tab, setTab] = useState<Tab>("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? data.products
        : data.products.filter((item) => item.categoryId === activeCategory),
    [activeCategory, data.products]
  );

  const cartItems = data.products.filter((item) => cart.includes(item.id));
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shopName = data.merchant.nameZh ?? data.merchant.name;

  function productCard(product: PublicProduct) {
    return (
      <div className="mini-card overflow-hidden" key={product.id}>
        <ProductImage
          alt={product.nameZh}
          className="h-28 w-full object-cover"
          height={160}
          src={product.image}
          width={240}
        />
        <div className="p-3">
          <p className="line-clamp-1 font-bold text-slate-900">{product.nameZh}</p>
          <p className="mt-1 text-xs text-slate-500">
            {product.type === "service"
              ? "Bookable service"
              : product.type === "package"
                ? "Package"
                : "Product"}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-black text-orange-500">¥{product.price}</span>
            <button
              className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white disabled:opacity-50"
              disabled={product.status === "sold-out"}
              onClick={() =>
                setCart((items) => Array.from(new Set([...items, product.id])))
              }
              type="button"
            >
              {product.type === "product" ? "Add" : "Book"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasProducts = data.products.length > 0;

  return (
    <div className="phone-frame mx-auto flex w-full max-w-[390px] flex-col overflow-x-hidden md:max-w-[420px]">
      <div className="bg-gradient-to-br from-cyan-600 to-teal-600 px-5 pb-5 pt-8 text-white">
        <p className="text-xs opacity-80">Mini App Style · Live API Data</p>
        <h1 className="mt-2 text-2xl font-black">{shopName}</h1>
        <p className="mt-1 text-sm opacity-90">
          {data.merchant.descriptionZh ?? data.merchant.description}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        {tab === "home" ? (
          <div className="grid gap-4">
            {data.banners[0] ? (
              <div className="rounded-3xl bg-orange-100 p-4 text-orange-800">
                <p className="font-black">{data.banners[0].titleZh}</p>
                <p className="mt-1 text-sm">{data.banners[0].description}</p>
              </div>
            ) : null}
            <div className="grid grid-cols-4 gap-3">
              {data.categories.slice(0, 4).map((category) => (
                <button
                  className="mini-card grid place-items-center gap-1 p-3 text-xs"
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setTab("category");
                  }}
                  type="button"
                >
                  <span className="text-xl">{category.icon}</span>
                  {category.nameZh}
                </button>
              ))}
            </div>
            <SectionTitle title="Featured" />
            {!hasProducts ? (
              <div className="mini-card p-6 text-center text-sm text-slate-500">
                No products available yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {data.products
                  .filter((p) => p.isFeatured)
                  .slice(0, 4)
                  .map((item) => productCard(item))}
              </div>
            )}
            <SectionTitle title="Services" />
            <div className="grid gap-3">
              {data.products
                .filter((item) => item.type === "service")
                .slice(0, 2)
                .map((item) => (
                  <div className="mini-card flex gap-3 p-3" key={item.id}>
                    <ProductImage
                      alt={item.nameZh}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      height={120}
                      src={item.image}
                      width={120}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">{item.nameZh}</p>
                      {item.serviceDuration ? (
                        <p className="mt-1 text-xs text-slate-500">
                          {item.serviceDuration} min
                        </p>
                      ) : null}
                      <p className="mt-2 font-black text-orange-500">¥{item.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
        {tab === "category" ? (
          <div className="grid gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              <TabPill
                active={activeCategory === "all"}
                label="All"
                onClick={() => setActiveCategory("all")}
              />
              {data.categories.map((category) => (
                <TabPill
                  active={activeCategory === category.id}
                  key={category.id}
                  label={category.nameZh}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>
            {filtered.length === 0 ? (
              <div className="mini-card p-6 text-center text-slate-500">No products yet</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">{filtered.map(productCard)}</div>
            )}
          </div>
        ) : null}
        {tab === "cart" ? (
          <div className="grid gap-4">
            <h2 className="text-xl font-black">Cart</h2>
            {cartItems.length ? (
              cartItems.map((item) => (
                <div className="mini-card flex gap-3 p-3" key={item.id}>
                  <ProductImage
                    alt={item.nameZh}
                    className="h-16 w-16 rounded-xl object-cover"
                    height={96}
                    src={item.image}
                    width={96}
                  />
                  <div className="flex-1">
                    <p className="font-bold">{item.nameZh}</p>
                    <p className="font-black text-orange-500">¥{item.price}</p>
                  </div>
                  <button
                    className="text-sm text-slate-400"
                    onClick={() => setCart((items) => items.filter((id) => id !== item.id))}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="mini-card p-6 text-center text-slate-500">Cart is empty</div>
            )}
            <div className="mini-card p-4">
              <p className="text-sm text-slate-500">Total</p>
              <p className="text-2xl font-black text-orange-500">¥{total}</p>
              <button
                className="mt-3 h-12 w-full rounded-2xl bg-cyan-600 font-bold text-white"
                type="button"
              >
                Checkout (demo)
              </button>
            </div>
          </div>
        ) : null}
        {tab === "orders" ? (
          <div className="grid gap-3">
            <h2 className="text-xl font-black">Orders</h2>
            <div className="mini-card p-6 text-center text-sm text-slate-500">
              Sign in on WeChat mini program to view orders.
            </div>
          </div>
        ) : null}
        {tab === "profile" ? (
          <div className="grid gap-4">
            <div className="mini-card p-5">
              <p className="text-xl font-black">Profile</p>
              <p className="mt-1 text-slate-500">{data.merchant.customerService}</p>
            </div>
            {["Orders", "Bookings", "Favorites", "Coupons", "Support", "Settings"].map(
              (item) => (
                <button className="mini-card flex justify-between p-4 text-left" key={item} type="button">
                  <span>{item}</span>
                  <span>›</span>
                </button>
              )
            )}
          </div>
        ) : null}
      </div>
      <div className="safe-bottom grid grid-cols-5 border-t bg-white px-2 pt-2 text-center text-xs">
        {(
          [
            ["home", "Home"],
            ["category", "Categories"],
            ["cart", "Cart"],
            ["orders", "Orders"],
            ["profile", "Me"],
          ] as const
        ).map(([key, label]) => (
          <button
            className={`py-2 ${tab === key ? "font-bold text-cyan-700" : "text-slate-500"}`}
            key={key}
            onClick={() => setTab(key)}
            type="button"
          >
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

function TabPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`shrink-0 rounded-full px-3 py-2 text-sm ${
        active ? "bg-cyan-600 text-white" : "bg-white text-slate-700"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
