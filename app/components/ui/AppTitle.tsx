// ...existing code...
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  title: string;
  fontSize?: string;
};

const AppTitle: React.FC<Props> = ({ title, fontSize = "text-lg" }) => {
  return (
    <View className="w-full items-center">
      <View className="flex-row items-center">
        <Image
          source={require("@/assets/icons/title-cart.png")}
          className="w-5 h-5"
          resizeMode="contain"
          accessibilityRole="image"
        />
        <Text className={`${fontSize} font-bold text-blue-700 ml-1.5`}>
          {title}
        </Text>
      </View>

      <View className=" ml-20">
        <Image
          source={require("@/assets/icons/line-01.png")}
          className="w-40 h-2"
          resizeMode="contain"
          accessibilityRole="image"
        />
      </View>
    </View>
  );
};

export default AppTitle;
// ...existing code...
