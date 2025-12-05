import useAxios from "@/lib/axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";
import AppTitle from "../components/ui/AppTitle";

export default function Index() {
  const axios = useAxios;

  const { data } = useQuery({
    queryKey: ["list-products"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products?limit=6");
        return response.data.products;
      } catch (error) {
        // toast.error("Failed to fetch products");
        console.log("Error fetching products:", error);
      }
    },
  });

  return (
    <View className="flex-1 h-full bg-blue-50">
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

        <View className=" w-full pt-6">
          <AppTitle title="Popular Products" />
          <FlatList
            className="space-x-2"
            data={data}
            renderItem={({ item }: any) => (
              <ProductCard
                key={item.id}
                product={item}
                title={item.title}
                image={item.images[0]}
                price={item.price}
                rating={item.rating}
                reviewsCount={item.stock}
              />
            )}
            keyExtractor={(item: any) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <View className=" w-full px-4 pt-6">
        <AppTitle title="Categories" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productsContainer: {},
});
