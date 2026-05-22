import { View, Text, Button } from "@tarojs/components";

export default function CheckoutPage() {
  return <View className="page"><View className="card"><Text>确认订单 / 联系人 / 手机号 / 模拟微信支付</Text><Text>当前为演示支付流程，不会产生真实付款。</Text></View><Button className="primary-button">提交订单</Button></View>;
}
