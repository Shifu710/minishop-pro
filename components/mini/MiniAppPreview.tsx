"use client";

import { Style2Shop } from "@/components/shop/Style2Shop";
import { usePublicShop } from "@/hooks/usePublicShop";

/** Embedded H5 preview on landing — uses live API, Style 2 layout. */
export function MiniAppPreview() {
  const { data, loading, error } = usePublicShop("demo-shop");

  if (loading) {
    return (
      <div className="phone-frame mx-auto grid place-items-center">
        <p className="text-sm text-slate-500">Loading shop...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="phone-frame mx-auto grid place-items-center p-6 text-center text-sm text-slate-500">
        {error ?? "Shop unavailable"}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[390px]">
      <Style2Shop data={data} />
    </div>
  );
}
