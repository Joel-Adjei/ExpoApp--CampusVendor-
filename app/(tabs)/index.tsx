import { MaterialIcons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import AppTitle from "../components/ui/AppTitle";

export default function Index() {
  return (
    <ScrollView className="flex-1 h-full bg-blue-50">
      <View className="px-4 pt-8 items-center justify-center space-x-2">
        <Image
          source={require("@/assets/images/cv-logo.png")}
          resizeMode="contain"
          className="w-11 h-11"
        />
        <Text className="text-lg font-bold text-center text-blue-600">
          Campus
          <Text className="text-lg font-bold text-amber-300">Vendor</Text>
        </Text>
      </View>
      <View className="px-4 pt-3">
        <View className=" w-full flex-row items-center bg-white border border-gray-300 rounded-full px-4">
          <TextInput
            placeholder="Search for products or vendors"
            className="flex-1"
          />
          <MaterialIcons name="search" size={24} color="#ffcb05" />
        </View>
      </View>

      <View className=" w-full px-4 pt-6">
        <View className="h-40 w-full bg-amber-300 rounded-2xl px-4 pt-6"></View>
      </View>

      <View className=" w-full px-4 pt-6">
        <AppTitle title="Categories" />
      </View>
    </ScrollView>
  );
}
