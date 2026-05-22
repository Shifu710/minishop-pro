import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function HomePage() {
  return (
    <View className="page">
      <View className="card">
        <Text>小店智选</Text>
        <Text>搜索商品或服务</Text>
      </View>
      <View className="card">
        <Text>热门推荐 / 精选服务 / 限时优惠</Text>
      </View>
      <Button className="primary-button" onClick={() => Taro.navigateTo({ url: "/pages/category/index" })}>查看更多</Button>
    </View>
  );
}
