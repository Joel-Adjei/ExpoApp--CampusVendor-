import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import useAuthStore from "../store/authStore";

export default function Index() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter();

  useEffect(() => {
    if (isLogin === false) {
      router.replace("/screens/Login");
    }
  }, [isLogin]);

  return (
    <View
      className="flex-1 items-center justify-center bg-white"
    >
      <View className="absolute size-60 -top-20 -right-30 bg-blue-600 rounded-full" />
      <View className="absolute size-100 -bottom-20 -left-60 bg-gray-300/30 rounded-full" />
      <View className="absolute size-75 -bottom-20 -left-30 border-12 border-white bg-blue-600 rounded-full z-0" />
      <View />
      <Image
        source={require('../assets/images/cv-logo.png')}
        resizeMode='contain' className='w-40 h-40 mr-2'
      />
      <View>
        <View className="flex-row text-center justify-center">
          <Text className="text-2xl font-bold text-blue-600">
            Campus
          </Text>
          <Text className="text-2xl font-bold text-amber-300">Vendor</Text>
        </View>

        <Text className="text-center text-gray-400 mt-1">
          Your one-stop solution for campus needs
        </Text>
      </View>
      <Link href={"/screens/Login"} className="mt-4 p-2 bg-gray-300">
        Login
      </Link>
      <ActivityIndicator size="large" color="#0000ff" />

    </View>
  );
}
