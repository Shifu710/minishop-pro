import { categories, products, promotions } from "@/lib/data";
import type { PublicBanner, PublicCategory, PublicProduct, PublicShopPayload } from "./types";
import type { MerchantDomainRecord } from "./types";

export function toPublicCategories(): PublicCategory[] {
  return categories
    .filter((c) => c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      id: c.id,
      name: c.name,
      nameZh: c.nameZh,
      icon: c.icon,
      sortOrder: c.sortOrder,
    }));
}

export function toPublicProducts(): PublicProduct[] {
  return products
    .filter((p) => p.status !== "draft")
    .map((p) => ({
      id: p.id,
      name: p.name,
      nameZh: p.nameZh,
      type: p.type,
      categoryId: p.categoryId,
      categoryName: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: p.stock,
      description: p.description,
      descriptionZh: p.descriptionZh,
      image: p.image,
      tags: p.tags,
      status: p.status,
      isFeatured: p.isFeatured,
      salesCount: p.salesCount,
      rating: p.rating,
      serviceDuration: p.serviceDuration,
      bookingSlots: p.bookingSlots,
    }));
}

export function toPublicBanners(): PublicBanner[] {
  return promotions
    .filter((p) => p.status === "active" && p.type === "banner")
    .map((p) => ({
      id: p.id,
      title: p.title,
      titleZh: p.titleZh,
      description: p.description,
      imageUrl: p.imageUrl,
      type: p.type,
    }));
}

export function buildPublicShopPayload(record: MerchantDomainRecord): PublicShopPayload {
  return {
    merchant: {
      id: record.merchantId,
      name: record.merchantName,
      nameZh: record.merchantName,
      logo: `https://placehold.co/120x120/0891b2/ffffff?text=${encodeURIComponent(record.merchantName.slice(0, 2))}`,
      description: "Welcome to our shop. Browse products and book services online.",
      descriptionZh: "欢迎光临本店，在线选购商品与预约服务。",
      contact: "contact@minishop.pro",
      customerService: "WeChat / WhatsApp: minishop-demo",
    },
    shop: {
      suffix: record.suffix,
      defaultStyle: record.defaultStyle,
      status: record.status,
    },
    banners: toPublicBanners(),
    categories: toPublicCategories(),
    products: toPublicProducts(),
  };
}
