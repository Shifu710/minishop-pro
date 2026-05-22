export type ItemType = "product" | "service" | "package";
export type OrderStatus = "pending" | "paid" | "preparing" | "booked" | "completed" | "cancelled" | "refunded";
export type BookingStatus = "pending" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show";

export type Category = {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
};

export type Product = {
  id: string;
  name: string;
  nameZh: string;
  type: ItemType;
  categoryId: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  descriptionZh: string;
  image: string;
  tags: string[];
  status: "active" | "draft" | "sold-out";
  isFeatured: boolean;
  salesCount: number;
  rating: number;
  serviceDuration?: number;
  bookingSlots?: string[];
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  language: "zh" | "en";
  totalSpent: number;
  totalOrders: number;
  lastActivity: string;
  tags: string[];
  notes: string;
};

export type Order = {
  id: string;
  orderNo: string;
  customerId: string;
  customerName: string;
  items: string[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "simulated";
  orderStatus: OrderStatus;
  channel: "wechat-mini-program" | "h5-preview" | "admin-demo";
  createdAt: string;
};

export type Booking = {
  id: string;
  customerName: string;
  serviceName: string;
  bookingTime: string;
  duration: number;
  status: BookingStatus;
  assignedStaff: string;
  notes: string;
};

export type Promotion = {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  imageUrl: string;
  type: "banner" | "coupon" | "campaign";
  status: "active" | "inactive";
  startDate: string;
  endDate: string;
};

export type TimeSeriesPoint = { date: string; revenue: number; orders: number; bookings: number };
export type BreakdownPoint = { name: string; value: number };
export type TopProductPoint = { name: string; sales: number; revenue: number };
