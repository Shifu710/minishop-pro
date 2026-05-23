"use client";

import type { ShopStyle } from "@/lib/shop/types";

type Props = {
  current: ShopStyle;
  onSwitch: (style: ShopStyle) => void;
  compact?: boolean;
};

export function StyleSwitcher({ current, onSwitch, compact }: Props) {
  return (
    <div
      className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-wrap items-center justify-center"}`}
    >
      <button
        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
          current === "style1"
            ? "bg-cyan-600 text-white"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        }`}
        onClick={() => onSwitch("style1")}
        type="button"
      >
        Style 1 · Catalog
      </button>
      <button
        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
          current === "style2"
            ? "bg-cyan-600 text-white"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        }`}
        onClick={() => onSwitch("style2")}
        type="button"
      >
        Style 2 · Mini App
      </button>
    </div>
  );
}
