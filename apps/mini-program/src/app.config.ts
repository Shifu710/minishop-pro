export default defineAppConfig({
  pages: [
    "pages/home/index",
    "pages/category/index",
    "pages/detail/index",
    "pages/cart/index",
    "pages/checkout/index",
    "pages/orders/index",
    "pages/profile/index",
  ],
  window: {
    navigationBarTitleText: "小店智选",
    navigationBarBackgroundColor: "#0891b2",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    color: "#64748b",
    selectedColor: "#0891b2",
    list: [
      { pagePath: "pages/home/index", text: "首页" },
      { pagePath: "pages/category/index", text: "分类" },
      { pagePath: "pages/cart/index", text: "购物车" },
      { pagePath: "pages/orders/index", text: "订单" },
      { pagePath: "pages/profile/index", text: "我的" },
    ],
  },
});
