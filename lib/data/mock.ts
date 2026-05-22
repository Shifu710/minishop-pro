import type { Booking, BreakdownPoint, Category, Customer, Order, Product, Promotion, TimeSeriesPoint, TopProductPoint } from "./types";

export const categories: Category[] = [
  { id: "cat-popular", name: "Popular", nameZh: "热门推荐", icon: "🔥", sortOrder: 1, isActive: true },
  { id: "cat-beauty", name: "Beauty Care", nameZh: "美容护理", icon: "💆", sortOrder: 2, isActive: true },
  { id: "cat-course", name: "Course Booking", nameZh: "课程预约", icon: "📚", sortOrder: 3, isActive: true },
  { id: "cat-travel", name: "Travel Services", nameZh: "旅游服务", icon: "🧳", sortOrder: 4, isActive: true },
  { id: "cat-digital", name: "Digital Products", nameZh: "数码产品", icon: "💻", sortOrder: 5, isActive: true },
  { id: "cat-member", name: "Membership Packages", nameZh: "会员套餐", icon: "⭐", sortOrder: 6, isActive: true },
];

const img = (text: string) => `https://placehold.co/600x420/0891b2/ffffff?text=${encodeURIComponent(text)}`;

export const products: Product[] = [
  { id: "p-001", name: "AI Productivity Course", nameZh: "AI 效率提升课程", type: "service", categoryId: "cat-course", category: "课程预约", price: 199, originalPrice: 299, stock: 30, description: "A practical AI workflow course for small teams.", descriptionZh: "面向小团队的 AI 工作流实战课程。", image: img("AI Course"), tags: ["AI", "课程"], status: "active", isFeatured: true, salesCount: 328, rating: 4.9, serviceDuration: 90, bookingSlots: ["今天 14:00", "明天 10:30", "周六 15:00"] },
  { id: "p-002", name: "Business Chinese Trial Lesson", nameZh: "商务中文试听课", type: "service", categoryId: "cat-course", category: "课程预约", price: 49, originalPrice: 99, stock: 18, description: "Trial lesson for business Mandarin learners.", descriptionZh: "适合商务中文学习者的试听课程。", image: img("Chinese Lesson"), tags: ["中文", "试听"], status: "active", isFeatured: true, salesCount: 182, rating: 4.8, serviceDuration: 60, bookingSlots: ["今天 16:00", "明天 13:00", "周日 11:00"] },
  { id: "p-003", name: "Website Consultation", nameZh: "网站建设咨询", type: "service", categoryId: "cat-digital", category: "数码产品", price: 299, stock: 12, description: "Consultation for websites, mini programs, and admin dashboards.", descriptionZh: "网站、小程序和管理后台建设咨询。", image: img("Consultation"), tags: ["咨询", "网站"], status: "active", isFeatured: true, salesCount: 91, rating: 4.9, serviceDuration: 45, bookingSlots: ["今天 18:00", "明天 09:30"] },
  { id: "p-004", name: "Premium Coffee Gift Box", nameZh: "精品咖啡礼盒", type: "product", categoryId: "cat-popular", category: "热门推荐", price: 88, originalPrice: 128, stock: 66, description: "Curated coffee gift box for office and home.", descriptionZh: "适合办公室和家庭的精品咖啡礼盒。", image: img("Coffee Box"), tags: ["礼盒", "咖啡"], status: "active", isFeatured: true, salesCount: 446, rating: 4.7 },
  { id: "p-005", name: "Facial Care Appointment", nameZh: "深层清洁护理预约", type: "service", categoryId: "cat-beauty", category: "美容护理", price: 168, originalPrice: 238, stock: 24, description: "Deep facial care appointment.", descriptionZh: "深层清洁与补水护理预约。", image: img("Facial Care"), tags: ["美容", "预约"], status: "active", isFeatured: true, salesCount: 268, rating: 4.8, serviceDuration: 75, bookingSlots: ["今天 12:00", "明天 15:30"] },
  { id: "p-006", name: "Kuala Lumpur City Tour Package", nameZh: "吉隆坡城市游套餐", type: "package", categoryId: "cat-travel", category: "旅游服务", price: 399, originalPrice: 499, stock: 10, description: "Half-day city tour package.", descriptionZh: "半日城市游与咨询预约套餐。", image: img("KL Tour"), tags: ["旅游", "套餐"], status: "active", isFeatured: false, salesCount: 73, rating: 4.6, serviceDuration: 240, bookingSlots: ["周六 09:00", "周日 09:00"] },
  { id: "p-007", name: "Mini Program Development Consultation", nameZh: "小程序开发咨询", type: "service", categoryId: "cat-digital", category: "数码产品", price: 399, stock: 8, description: "Planning session for mini program commerce and booking flows.", descriptionZh: "小程序电商与预约流程规划咨询。", image: img("Mini Program"), tags: ["小程序", "开发"], status: "active", isFeatured: true, salesCount: 56, rating: 5, serviceDuration: 60, bookingSlots: ["明天 17:00", "周五 14:00"] },
  { id: "p-008", name: "Monthly Fitness Package", nameZh: "月度健身套餐", type: "package", categoryId: "cat-member", category: "会员套餐", price: 268, stock: 32, description: "Monthly fitness membership and booking package.", descriptionZh: "月度健身会员与课程预约套餐。", image: img("Fitness"), tags: ["健身", "会员"], status: "active", isFeatured: false, salesCount: 144, rating: 4.7 },
  { id: "p-009", name: "Skincare Starter Kit", nameZh: "护肤入门套装", type: "product", categoryId: "cat-beauty", category: "美容护理", price: 129, originalPrice: 169, stock: 43, description: "Starter skincare kit for daily routine.", descriptionZh: "日常护理护肤入门套装。", image: img("Skincare"), tags: ["护肤", "商品"], status: "active", isFeatured: false, salesCount: 201, rating: 4.6 },
  { id: "p-010", name: "Travel Planning Call", nameZh: "旅行规划电话咨询", type: "service", categoryId: "cat-travel", category: "旅游服务", price: 79, stock: 20, description: "Short planning call for travel bookings.", descriptionZh: "旅行行程规划电话咨询。", image: img("Travel Call"), tags: ["旅行", "咨询"], status: "active", isFeatured: false, salesCount: 64, rating: 4.5, serviceDuration: 30, bookingSlots: ["今天 19:00", "明天 20:00"] },
  { id: "p-011", name: "Smart Desk Lamp", nameZh: "智能护眼台灯", type: "product", categoryId: "cat-digital", category: "数码产品", price: 159, stock: 0, description: "Smart desk lamp with eye-care light.", descriptionZh: "智能调光护眼台灯。", image: img("Desk Lamp"), tags: ["数码", "台灯"], status: "sold-out", isFeatured: false, salesCount: 117, rating: 4.7 },
  { id: "p-012", name: "VIP Service Membership", nameZh: "VIP 服务会员", type: "package", categoryId: "cat-member", category: "会员套餐", price: 599, originalPrice: 799, stock: 15, description: "Priority booking, discounts, and support.", descriptionZh: "优先预约、专属折扣和客户支持。", image: img("VIP"), tags: ["会员", "VIP"], status: "active", isFeatured: true, salesCount: 89, rating: 4.9 },
];

export const customers: Customer[] = ["Li Wei", "Zhang Min", "Wang Fang", "Chen Hao", "Sarah Johnson", "Ahmed Ali", "Liu Yang", "Michael Torres", "Priya Nair", "Zhou Jie"].map((name, index) => ({
  id: `c-${index + 1}`,
  name,
  phone: `+86 13${index} 8888 10${index}`,
  email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
  language: index % 3 === 0 ? "en" : "zh",
  totalSpent: 188 + index * 126,
  totalOrders: 2 + index,
  lastActivity: `${index + 1} days ago`,
  tags: index % 2 === 0 ? ["VIP", "高价值"] : ["新客户"],
  notes: "Demo customer for recruiter review.",
}));

export const orders: Order[] = Array.from({ length: 12 }, (_, index) => ({
  id: `o-${index + 1}`,
  orderNo: `MSP202605${String(index + 1).padStart(3, "0")}`,
  customerId: customers[index % customers.length].id,
  customerName: customers[index % customers.length].name,
  items: [products[index % products.length].nameZh],
  totalAmount: products[index % products.length].price,
  paymentStatus: index % 3 === 0 ? "simulated" : index % 3 === 1 ? "paid" : "pending",
  orderStatus: ["pending", "paid", "preparing", "booked", "completed", "cancelled"][index % 6] as Order["orderStatus"],
  channel: index % 2 === 0 ? "h5-preview" : "wechat-mini-program",
  createdAt: `2026-05-${String(10 + index).padStart(2, "0")}`,
}));

export const bookings: Booking[] = Array.from({ length: 8 }, (_, index) => ({
  id: `b-${index + 1}`,
  customerName: customers[index].name,
  serviceName: products.filter((item) => item.type !== "product")[index % 7].nameZh,
  bookingTime: `2026-05-${24 + index} ${10 + index}:00`,
  duration: 45 + index * 10,
  status: ["pending", "confirmed", "in-progress", "completed", "cancelled", "no-show"][index % 6] as Booking["status"],
  assignedStaff: ["Mia", "Chen", "Aisha", "Mohamed"][index % 4],
  notes: "Demo booking with reschedule placeholder.",
}));

export const promotions: Promotion[] = [
  { id: "promo-1", title: "Summer New Store Offer", titleZh: "夏季新店优惠", description: "Limited-time product and booking discount.", imageUrl: img("Promotion"), type: "banner", status: "active", startDate: "2026-05-01", endDate: "2026-06-01" },
  { id: "promo-2", title: "Course Trial Coupon", titleZh: "课程试听券", description: "Save on trial lessons.", imageUrl: img("Coupon"), type: "coupon", status: "active", startDate: "2026-05-05", endDate: "2026-06-05" },
  { id: "promo-3", title: "VIP Member Campaign", titleZh: "VIP 会员活动", description: "Membership package campaign.", imageUrl: img("VIP Promo"), type: "campaign", status: "active", startDate: "2026-05-10", endDate: "2026-06-10" },
  { id: "promo-4", title: "Beauty Care Week", titleZh: "美容护理周", description: "Service booking discount week.", imageUrl: img("Beauty Promo"), type: "banner", status: "inactive", startDate: "2026-04-01", endDate: "2026-04-10" },
  { id: "promo-5", title: "Travel Mini Package", titleZh: "旅行小套餐", description: "Travel service booking campaign.", imageUrl: img("Travel Promo"), type: "campaign", status: "active", startDate: "2026-05-12", endDate: "2026-06-12" },
];

export const analyticsSeries: TimeSeriesPoint[] = Array.from({ length: 14 }, (_, index) => ({
  date: `05-${String(10 + index).padStart(2, "0")}`,
  revenue: 1800 + index * 260 + (index % 3) * 430,
  orders: 12 + index + (index % 4),
  bookings: 6 + (index % 5) + Math.floor(index / 2),
}));

export const orderBreakdown: BreakdownPoint[] = [
  { name: "Pending", value: 18 },
  { name: "Paid", value: 36 },
  { name: "Booked", value: 20 },
  { name: "Completed", value: 62 },
  { name: "Cancelled", value: 8 },
];

export const revenueByChannel: BreakdownPoint[] = [
  { name: "WeChat Mini Program", value: 62 },
  { name: "H5 Preview", value: 24 },
  { name: "Admin Demo", value: 14 },
];

export const topProducts: TopProductPoint[] = products.slice(0, 6).map((product) => ({
  name: product.nameZh,
  sales: product.salesCount,
  revenue: product.salesCount * product.price,
}));
