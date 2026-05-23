"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Style1Shop } from "./Style1Shop";
import { Style2Shop } from "./Style2Shop";
import { StyleSwitcher } from "./StyleSwitcher";
import {
  resolveActiveStyle,
  setStoredStyle,
  usePublicShop,
} from "@/hooks/usePublicShop";
import type { ShopStyle } from "@/lib/shop/types";

type Props = {
  suffix: string;
};

export function PublicShopPage({ suffix }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data, loading, error, errorCode, reload } = usePublicShop(suffix);
  const queryStyle = searchParams.get("style");

  const activeStyle = useMemo((): ShopStyle => {
    if (!data) return "style1";
    return resolveActiveStyle(queryStyle, suffix, data.shop.defaultStyle);
  }, [data, queryStyle, suffix]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("style", activeStyle);
    return url.toString();
  }, [activeStyle]);

  const handleStyleSwitch = useCallback(
    (style: ShopStyle) => {
      setStoredStyle(suffix, style);
      const params = new URLSearchParams(searchParams.toString());
      params.set("style", style);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams, suffix]
  );

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600" />
          <p className="mt-4 text-slate-600">Loading shop...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">{errorCode === "DISABLED" ? "🚫" : "🔍"}</p>
          <h1 className="mt-4 text-xl font-black text-slate-900">
            {errorCode === "DISABLED" ? "Shop unavailable" : "Shop not found"}
          </h1>
          <p className="mt-2 text-slate-600">{error ?? "Unable to load this shop."}</p>
          <button className="btn-primary mt-6" onClick={() => void reload()} type="button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="public-shop-root relative min-h-screen">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm font-semibold text-slate-600">
            Public shop · <span className="text-slate-900">/t/{suffix}</span>
          </p>
          <StyleSwitcher current={activeStyle} onSwitch={handleStyleSwitch} />
        </div>
      </div>

      {activeStyle === "style1" ? (
        <Style1Shop data={data} shareUrl={shareUrl} />
      ) : (
        <div className="bg-slate-100 py-6 md:py-10">
          <Style2Shop data={data} />
        </div>
      )}
    </div>
  );
}
