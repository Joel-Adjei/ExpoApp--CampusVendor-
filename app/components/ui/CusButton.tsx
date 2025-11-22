import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type Props = {
  children: any,
  iconSize?: number,
  iconStyle?: string,
  onPress?: () => void,
  disabled?: boolean,
  isLoading?: boolean,
  variant?: string,
  iconType?: string,
  Icon?: string,
  className?: string
}

const Button = ({
  children,
  iconSize,
  iconStyle,
  onPress,
  disabled = false,
  isLoading = false,
  variant = "primary",
  iconType = "icon-left",
  Icon,
  className = "",
}: Props) => {
  function getColors() {
    switch (variant) {
      case "primary" || "":
        return "bg-blue-600 text-white cursor-pointer";

      case "secondary":
        return "bg-yellow-300 text-blue-950 shadow-lg cursor-pointer";

      case "outline":
        return "bg-none border-1 border-blue-700 text-blue-700 cursor-pointer";

      default:
        return "bg-gray-400 text-gray-300 cursor-not-allowed";
    }
  }

  return (
    <>
      {!(iconType === "icon-only") ? (
        <TouchableOpacity
          disabled={disabled || isLoading}
          onPress={onPress}
          className={`${className}  w-fit flex-row justify-center font-medium items-center gap-2 px-9 py-2 rounded-full 
                        disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300
                        ${getColors()}`}
        >
            {isLoading && iconType === "icon-left" ? (
              <ActivityIndicator size={"small"} color={"white"}/>
            ) : (
              iconType === "icon-left" && Icon && <MaterialIcons name={Icon} size={iconSize} color={"white"} />
            )}

            <Text className="text-white text-md">{children}</Text>

            {isLoading && iconType === "icon-right" ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              iconType === "icon-right" && Icon && <MaterialIcons name={Icon} size={iconSize} />
            )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          className={`${className} size-12 cursor-pointer flex justify-center items-center  rounded-full  ${getColors()}`}
        >
          {Icon && <MaterialIcons name={Icon} size={iconSize} className={iconStyle} />}
        </TouchableOpacity>
      )}
    </>
  );
};

export default Button;
