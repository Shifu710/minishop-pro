export type ShopStyle = "style1" | "style2";
export type ShopStatus = "active" | "disabled";

export type PublicMerchant = {
  id: string;
  name: string;
  nameZh?: string;
  logo?: string;
  description?: string;
  descriptionZh?: string;
  contact?: string;
  customerService?: string;
};

export type PublicShop = {
  suffix: string;
  defaultStyle: ShopStyle;
  status: ShopStatus;
};

export type PublicBanner = {
  id: string;
  title: string;
  titleZh: string;
  description?: string;
  imageUrl: string;
  type: string;
};

export type PublicCategory = {
  id: string;
  name: string;
  nameZh: string;
  icon?: string;
  sortOrder: number;
};

export type PublicProduct = {
  id: string;
  name: string;
  nameZh: string;
  type: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  descriptionZh?: string;
  image: string;
  tags: string[];
  status: string;
  isFeatured: boolean;
  salesCount: number;
  rating: number;
  serviceDuration?: number;
  bookingSlots?: string[];
};

export type PublicShopPayload = {
  merchant: PublicMerchant;
  shop: PublicShop;
  banners: PublicBanner[];
  categories: PublicCategory[];
  products: PublicProduct[];
};

export type MerchantDomainRecord = {
  id: string;
  merchantId: string;
  merchantName: string;
  domain: string;
  suffix: string;
  defaultStyle: ShopStyle;
  isPrimary: boolean;
  status: ShopStatus;
  remark?: string;
  updatedAt: string;
};

export type MerchantDomainInput = {
  merchantId: string;
  merchantName: string;
  domain: string;
  suffix: string;
  defaultStyle: ShopStyle;
  status: ShopStatus;
  isPrimary?: boolean;
  remark?: string;
};
