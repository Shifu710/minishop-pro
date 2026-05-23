import { hasDatabase, prisma } from "@/lib/prisma";
import { getDefaultAppDomain } from "./constants";
import { validateDomain, validateSuffix } from "./suffix";
import type { MerchantDomainInput, MerchantDomainRecord, ShopStyle, ShopStatus } from "./types";

const SEED_DOMAINS: MerchantDomainRecord[] = [
  {
    id: "dom-demo-shop",
    merchantId: "merchant-demo",
    merchantName: "小店智选 Demo Store",
    domain: getDefaultAppDomain(),
    suffix: "demo-shop",
    defaultStyle: "style1",
    isPrimary: true,
    status: "active",
    remark: "Default demo public shop",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "dom-7iovjth",
    merchantId: "merchant-demo-2",
    merchantName: "WeCatalog Style Reference Shop",
    domain: getDefaultAppDomain(),
    suffix: "7IOvjtH",
    defaultStyle: "style2",
    isPrimary: true,
    status: "active",
    remark: "Reference-style suffix example",
    updatedAt: new Date().toISOString(),
  },
];

let memoryDomains: MerchantDomainRecord[] = [...SEED_DOMAINS];

function toRecord(row: {
  id: string;
  merchantId: string;
  domain: string;
  suffix: string;
  defaultStyle: string;
  isPrimary: boolean;
  status: string;
  remark: string | null;
  updatedAt: Date;
  merchant: { name: string };
}): MerchantDomainRecord {
  return {
    id: row.id,
    merchantId: row.merchantId,
    merchantName: row.merchant.name,
    domain: row.domain,
    suffix: row.suffix,
    defaultStyle: (row.defaultStyle === "style2" ? "style2" : "style1") as ShopStyle,
    isPrimary: row.isPrimary,
    status: (row.status === "disabled" ? "disabled" : "active") as ShopStatus,
    remark: row.remark ?? undefined,
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function ensurePrismaSeed(): Promise<void> {
  if (!hasDatabase()) return;
  try {
    const count = await prisma.merchantDomain.count();
    if (count > 0) return;

    for (const seed of SEED_DOMAINS) {
      await prisma.merchant.upsert({
        where: { shopSuffix: seed.suffix },
        update: {},
        create: {
          id: seed.merchantId,
          name: seed.merchantName,
          shopSuffix: seed.suffix,
          defaultStyle: seed.defaultStyle,
          shopStatus: seed.status,
          description: "Public shop merchant",
          contact: "contact@minishop.pro",
          customerService: "minishop-demo",
        },
      });
      await prisma.merchantDomain.upsert({
        where: { suffix: seed.suffix },
        update: {},
        create: {
          id: seed.id,
          merchantId: seed.merchantId,
          domain: seed.domain,
          suffix: seed.suffix,
          defaultStyle: seed.defaultStyle,
          isPrimary: seed.isPrimary,
          status: seed.status,
          remark: seed.remark,
        },
      });
    }
  } catch {
    // Fall back to memory store when DB is unavailable at runtime.
  }
}

export async function listMerchantDomains(): Promise<MerchantDomainRecord[]> {
  await ensurePrismaSeed();
  if (hasDatabase()) {
    try {
      const rows = await prisma.merchantDomain.findMany({
        include: { merchant: true },
        orderBy: { updatedAt: "desc" },
      });
      if (rows.length) return rows.map(toRecord);
    } catch {
      // use memory
    }
  }
  return [...memoryDomains].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function findDomainBySuffix(
  suffix: string,
  host?: string
): Promise<MerchantDomainRecord | null> {
  await ensurePrismaSeed();
  const normalizedSuffix = suffix.trim();
  const normalizedHost = host?.toLowerCase();

  if (hasDatabase()) {
    try {
      const row = await prisma.merchantDomain.findUnique({
        where: { suffix: normalizedSuffix },
        include: { merchant: true },
      });
      if (row) {
        const record = toRecord(row);
        if (normalizedHost && record.domain !== normalizedHost && record.domain !== getDefaultAppDomain()) {
          const defaultHost = getDefaultAppDomain();
          if (normalizedHost !== defaultHost && !normalizedHost.includes("localhost")) {
            return null;
          }
        }
        return record;
      }
    } catch {
      // fall through
    }
  }

  const record = memoryDomains.find((d) => d.suffix === normalizedSuffix);
  if (!record) return null;

  if (normalizedHost && record.domain !== normalizedHost) {
    const defaultHost = getDefaultAppDomain();
    if (
      normalizedHost !== defaultHost &&
      !normalizedHost.includes("localhost") &&
      !normalizedHost.endsWith(".vercel.app")
    ) {
      return null;
    }
  }
  return record;
}

export async function createMerchantDomain(
  input: MerchantDomainInput
): Promise<{ record?: MerchantDomainRecord; error?: string }> {
  const suffixCheck = validateSuffix(input.suffix);
  if (!suffixCheck.valid) return { error: suffixCheck.error };
  const domainCheck = validateDomain(input.domain);
  if (!domainCheck.valid) return { error: domainCheck.error };

  const existing = await findDomainBySuffix(input.suffix);
  if (existing) return { error: "Suffix already exists." };

  const now = new Date().toISOString();
  const record: MerchantDomainRecord = {
    id: `dom-${Date.now()}`,
    merchantId: input.merchantId,
    merchantName: input.merchantName,
    domain: input.domain.trim().toLowerCase(),
    suffix: input.suffix.trim(),
    defaultStyle: input.defaultStyle,
    isPrimary: input.isPrimary ?? false,
    status: input.status,
    remark: input.remark,
    updatedAt: now,
  };

  if (hasDatabase()) {
    try {
      await prisma.merchant.upsert({
        where: { shopSuffix: record.suffix },
        update: { name: record.merchantName, defaultStyle: record.defaultStyle, shopStatus: record.status },
        create: {
          id: record.merchantId,
          name: record.merchantName,
          shopSuffix: record.suffix,
          defaultStyle: record.defaultStyle,
          shopStatus: record.status,
        },
      });
      const created = await prisma.merchantDomain.create({
        data: {
          merchantId: record.merchantId,
          domain: record.domain,
          suffix: record.suffix,
          defaultStyle: record.defaultStyle,
          isPrimary: record.isPrimary,
          status: record.status,
          remark: record.remark,
        },
        include: { merchant: true },
      });
      return { record: toRecord(created) };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save domain.";
      return { error: message };
    }
  }

  memoryDomains = [record, ...memoryDomains];
  return { record };
}

export async function updateMerchantDomain(
  id: string,
  input: Partial<MerchantDomainInput>
): Promise<{ record?: MerchantDomainRecord; error?: string }> {
  const current = (await listMerchantDomains()).find((d) => d.id === id);
  if (!current) return { error: "Domain record not found." };

  if (input.suffix) {
    const suffixCheck = validateSuffix(input.suffix);
    if (!suffixCheck.valid) return { error: suffixCheck.error };
    const duplicate = (await listMerchantDomains()).find(
      (d) => d.suffix === input.suffix?.trim() && d.id !== id
    );
    if (duplicate) return { error: "Suffix already exists." };
  }
  if (input.domain) {
    const domainCheck = validateDomain(input.domain);
    if (!domainCheck.valid) return { error: domainCheck.error };
  }

  const updated: MerchantDomainRecord = {
    ...current,
    merchantId: input.merchantId ?? current.merchantId,
    merchantName: input.merchantName ?? current.merchantName,
    domain: input.domain?.trim().toLowerCase() ?? current.domain,
    suffix: input.suffix?.trim() ?? current.suffix,
    defaultStyle: input.defaultStyle ?? current.defaultStyle,
    status: input.status ?? current.status,
    isPrimary: input.isPrimary ?? current.isPrimary,
    remark: input.remark ?? current.remark,
    updatedAt: new Date().toISOString(),
  };

  if (hasDatabase()) {
    try {
      const row = await prisma.merchantDomain.update({
        where: { id },
        data: {
          domain: updated.domain,
          suffix: updated.suffix,
          defaultStyle: updated.defaultStyle,
          status: updated.status,
          isPrimary: updated.isPrimary,
          remark: updated.remark,
        },
        include: { merchant: true },
      });
      await prisma.merchant.update({
        where: { id: row.merchantId },
        data: { name: updated.merchantName, defaultStyle: updated.defaultStyle, shopStatus: updated.status },
      });
      return { record: toRecord(row) };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update domain.";
      return { error: message };
    }
  }

  memoryDomains = memoryDomains.map((d) => (d.id === id ? updated : d));
  return { record: updated };
}

export async function deleteMerchantDomain(id: string): Promise<{ error?: string }> {
  if (hasDatabase()) {
    try {
      await prisma.merchantDomain.delete({ where: { id } });
      return {};
    } catch {
      return { error: "Failed to delete domain record." };
    }
  }
  const before = memoryDomains.length;
  memoryDomains = memoryDomains.filter((d) => d.id !== id);
  if (memoryDomains.length === before) return { error: "Domain record not found." };
  return {};
}
