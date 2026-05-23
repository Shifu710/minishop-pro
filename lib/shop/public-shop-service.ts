import { buildPublicShopPayload } from "./shop-data-adapter";
import { findDomainBySuffix } from "./merchant-store";
import { normalizeHost } from "./suffix";
import type { PublicShopPayload } from "./types";

export type ResolveShopResult =
  | { ok: true; data: PublicShopPayload }
  | { ok: false; code: "NOT_FOUND" | "DISABLED" | "DOMAIN_MISMATCH"; message: string };

export async function resolvePublicShop(
  suffix: string,
  host?: string | null
): Promise<ResolveShopResult> {
  const normalizedHost = normalizeHost(host ?? undefined);
  const record = await findDomainBySuffix(suffix, normalizedHost || undefined);

  if (!record) {
    return { ok: false, code: "NOT_FOUND", message: "Shop not found." };
  }

  if (record.status === "disabled") {
    return { ok: false, code: "DISABLED", message: "This shop is currently unavailable." };
  }

  return { ok: true, data: buildPublicShopPayload(record) };
}

export async function getMiniappShopByMerchantId(
  merchantId: string
): Promise<PublicShopPayload | null> {
  const { listMerchantDomains } = await import("./merchant-store");
  const domains = await listMerchantDomains();
  const record = domains.find((d) => d.merchantId === merchantId && d.status === "active");
  if (!record) return null;
  return buildPublicShopPayload(record);
}
