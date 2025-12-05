import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

/**
 * Props largely mirror the original web component.
 * - onViewDetails will be called if provided; otherwise navigation to 'ProductDetails' is attempted.
 * - image expects a remote URL string or local require() value.
 */
type Props = {
  product?: any;
  price?: number;
  image?: string | number;
  title?: string;
  onAddToCart?: (p: any) => void;
  onViewDetails?: (p: any) => void;
  onToggleFavorite?: (p: any) => void;
  rating?: number;
  type?: "new" | "out" | "service" | string;
  reviewsCount?: number;
  className?: string;
  variant?: "default" | "featured" | "sale";
};

const ProductCard: React.FC<Props> = ({
  product = {},
  price,
  image,
  title = "Product Name",
  onViewDetails,
  rating = 4,
  type = "new",
  reviewsCount = 0,
  variant = "default",
}) => {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (onViewDetails) return onViewDetails(product);
    // fallback navigation; ensure a screen named "ProductDetails" exists
    // @ts-ignore
    navigation.navigate?.("ProductDetails", { id: product?.id });
  };

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  const getVariantStyles = () => {
    switch (variant) {
      case "featured":
        return "bg-gradient-to-br from-blue-50 to-yellow-50 border-2 border-blue-200";
      case "sale":
        return "bg-gradient-to-br from-red-50 to-yellow-50 border-2 border-red-200";
      default:
        return "bg-white border border-gray-200";
    }
  };

  const getTypePill = () => {
    switch (type) {
      case "new":
        return {
          label: "New",
          icon: (
            <MaterialCommunityIcons
              name="star-circle"
              size={14}
              color="#065f46"
            />
          ),
        };
      case "out":
        return {
          label: "Out",
          icon: <Feather name="clock" size={14} color="#991b1b" />,
        };
      case "service":
        return {
          label: "Service",
          icon: <Feather name="user" size={14} color="#1e3a8a" />,
        };
      default:
        return null;
    }
  };

  const typePill = getTypePill();

  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const filled = i < Math.round(count);
      stars.push(
        <MaterialCommunityIcons
          key={i}
          name={filled ? "star" : "star-outline"}
          size={14}
          color={filled ? "#f59e0b" : "#cbd5e1"}
        />
      );
    }
    return <View className="flex-row gap-1">{stars}</View>;
  };

  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString(undefined, { style: "currency", currency: "USD" })
      : price;

  return (
    <TouchableWithoutFeedback
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={handlePress}
    >
      <View
        className={`rounded-2xl overflow-hidden w-42 bg-white border border-gray-300 shadow-lg`}
      >
        {/* Decorative circles */}
        <View
          className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-300 opacity-10 rounded-full"
          pointerEvents="none"
        />
        <View
          className="absolute -bottom-6 -left-6 w-14 h-14 bg-blue-500 opacity-10 rounded-full"
          pointerEvents="none"
        />

        {/* Top: type pill */}
        {typePill && (
          <View className="absolute top-3 right-3 z-10">
            <View className="flex-row items-center px-2 py-1 rounded bg-green-100">
              {typePill.icon}
              <Text className="text-xs font-medium text-green-800 ml-1">
                {typePill.label}
              </Text>
            </View>
          </View>
        )}

        {/* Image */}
        <View className="h-40 bg-gray-100 justify-center items-center">
          {!imageLoaded && <ActivityIndicator size="small" color="#60a5fa" />}
          <Image
            source={
              typeof image === "string"
                ? { uri: image }
                : image || require("@/assets/icons/title-cart.png")
            }
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />
          {/* overlay (shown on web hover originally) - kept subtle for mobile */}
          <View className="absolute inset-0 bg-black/5" pointerEvents="none" />
        </View>

        {/* Content */}
        <View className="p-4 space-y-2">
          <Text className="text-sm font-medium text-gray-700">{title}</Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              {renderStars(rating)}
              <Text className="text-xs text-gray-500">({reviewsCount})</Text>
            </View>

            {product?.type && (
              <View className="bg-gray-100 px-2 py-1 rounded">
                <Text className="text-xs text-gray-500">new</Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
            <View>
              <Text className="text-sm font-medium text-slate-600">
                {formattedPrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductCard;
