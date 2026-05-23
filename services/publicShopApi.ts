import type { PublicShopPayload } from "@/lib/shop/types";

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: { code?: string; message: string } };

export async function resolvePublicShop(
  suffix: string,
  host?: string
): Promise<ApiResponse<PublicShopPayload>> {
  const params = new URLSearchParams({ suffix });
  if (host) params.set("host", host);

  const res = await fetch(`/api/public/shop/resolve?${params.toString()}`, {
    cache: "no-store",
  });
  const json = (await res.json()) as ApiResponse<PublicShopPayload>;
  return json;
}
