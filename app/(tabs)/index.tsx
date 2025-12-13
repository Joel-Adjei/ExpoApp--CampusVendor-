import useAxios from "@/lib/axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import {
  FlatList,
  Image,
  ScrollView,
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

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products/categories?limit=6");
        return response.data || [];
      } catch (error) {
        // toast.error("Failed to fetch categories");
        console.log("Error fetching categories:", error);
      }
    },
  });

  return (
    <ScrollView className="flex-1 h-full bg-blue-50 mb-27  ">
      <View className="pb-6">
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
          <View className="relative h-40 w-full flex-row justify-between bg-blue-900 rounded-2xl overflow-hidden">
            <View className="size-46 rounded-full absolute bottom-0 -right-20 border-33 border-amber-300 " />
            <View className="size-55 rounded-full absolute bottom-0 -right-20 border-20 border-amber-200 shadow-md" />

            <View className="h-full w-[57%] pl-4 pt-4.5 items-">
              <Text className="text-2xl font-bold text-amber-300 leading-4.5 font-montserrat ">
                Welcome to Campus Vendor!
              </Text>
              <Text className="text-sm text-slate-200 leading-5 mt-2 font-montserrat ">
                Discover amazing products from your campus community.
              </Text>
            </View>
            <View className="overflow-hidden">
              <Image
                source={require("@/assets/images/woman-holding-shopping-bags.png")}
                resizeMode="contain"
                className="size-40 mt-2"
              />
            </View>
          </View>

          <View className=" w-full pt-6">
            <View className="mb-1">
              <AppTitle title="Categories" />
            </View>
            <View className="">
              <FlatList
                data={categories}
                renderItem={({ item }: any) => (
                  <View className="py-1.5 px-3 bg-amber-300 rounded-sm  border-(--blue-color) mr-2">
                    <Text className="text-sm font-medium text-slate-600">
                      {item.name}
                    </Text>
                  </View>
                )}
                keyExtractor={(item: any, index: number) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <View className=" w-full pt-6">
            <AppTitle title="Popular Products" />
            <FlatList
              className="space-x-2"
              data={data}
              renderItem={({ item }: any) => (
                <View className="p-2">
                  <ProductCard
                    key={item.id}
                    product={item}
                    title={item.title}
                    image={item.images[0]}
                    price={item.price}
                    rating={item.rating}
                    reviewsCount={item.stock}
                  />
                </View>
              )}
              keyExtractor={(item: any) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productsContainer: {},
});
