"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Copy, Headphones, Share2 } from "lucide-react";
import { ProductImage } from "./ProductImage";
import type { PublicShopPayload } from "@/lib/shop/types";

type Props = {
  data: PublicShopPayload;
  shareUrl: string;
};

export function Style1Shop({ data, shareUrl }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copied, setCopied] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return data.products;
    return data.products.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory, data.products]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const hasCategories = data.categories.length > 0;
  const hasProducts = data.products.length > 0;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3f5f8]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            {data.merchant.logo ? (
              <Image
                alt={data.merchant.name}
                className="rounded-2xl border border-slate-100 object-cover"
                height={80}
                src={data.merchant.logo}
                width={80}
              />
            ) : null}
            <div>
              <h1 className="text-2xl font-black text-slate-900 md:text-3xl">
                {data.merchant.nameZh ?? data.merchant.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                {data.merchant.descriptionZh ?? data.merchant.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="btn-secondary text-sm"
              href={`mailto:${data.merchant.contact ?? "contact@minishop.pro"}`}
            >
              <Headphones size={16} />
              Customer Service
            </a>
            <button className="btn-primary text-sm" onClick={() => void copyLink()} type="button">
              {copied ? "Copied!" : <><Share2 size={16} /> Copy shop link</>}
            </button>
            <button className="btn-secondary text-sm" onClick={() => void copyLink()} type="button">
              <Copy size={16} />
              Share
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        {data.banners.length > 0 ? (
          <section className="mb-8 grid gap-4 md:grid-cols-2">
            {data.banners.slice(0, 2).map((banner) => (
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm" key={banner.id}>
                <Image
                  alt={banner.titleZh}
                  className="h-40 w-full object-cover md:h-52"
                  height={280}
                  src={banner.imageUrl}
                  width={640}
                />
                <div className="p-4">
                  <p className="font-bold text-slate-900">{banner.titleZh}</p>
                  {banner.description ? (
                    <p className="mt-1 text-sm text-slate-500">{banner.description}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        <section className="mb-6">
          {hasCategories ? (
            <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <CategoryTab
                active={activeCategory === "all"}
                label="All"
                onClick={() => setActiveCategory("all")}
              />
              {data.categories.map((cat) => (
                <CategoryTab
                  active={activeCategory === cat.id}
                  icon={cat.icon}
                  key={cat.id}
                  label={cat.nameZh}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-500">
              No categories yet. Products will appear here when added.
            </div>
          )}
        </section>

        <section>
          {!hasProducts ? (
            <div className="rounded-2xl bg-white p-12 text-center text-slate-500">
              No products available yet. Please check back later.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center text-slate-500">
              No products in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((product) => (
                <article
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                  key={product.id}
                >
                  <ProductImage
                    alt={product.nameZh}
                    className="h-44 w-full object-cover"
                    height={220}
                    src={product.image}
                    width={320}
                  />
                  <div className="p-4">
                    <p className="line-clamp-2 font-bold text-slate-900">{product.nameZh}</p>
                    <p className="mt-1 text-xs text-slate-500">{product.categoryName}</p>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-black text-orange-500">¥{product.price}</span>
                      {product.originalPrice ? (
                        <span className="text-xs text-slate-400 line-through">
                          ¥{product.originalPrice}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {product.status === "sold-out" ? "Sold out" : `Stock ${product.stock}`}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 lg:px-8">
          <p className="font-bold text-slate-900">{data.merchant.name}</p>
          <p className="mt-2">Contact: {data.merchant.contact}</p>
          <p className="mt-1">Customer service: {data.merchant.customerService}</p>
        </div>
      </footer>

      <div className="safe-bottom fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex justify-center gap-3">
          <a className="btn-secondary flex-1 text-sm" href={`mailto:${data.merchant.contact}`}>
            Service
          </a>
          <button
            className="btn-primary flex-1 text-sm"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            type="button"
          >
            Top
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryTab({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-cyan-600 text-white" : "bg-white text-slate-700 shadow-sm"
      }`}
      onClick={onClick}
      type="button"
    >
      {icon ? `${icon} ` : ""}
      {label}
    </button>
  );
}
