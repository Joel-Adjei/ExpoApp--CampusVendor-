import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

type Props = {
  id?: string;
  value: string;
  label?: string;
  icon?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  type?:
    | "emailAddress"
    | "password"
    | "none"
    | "username"
    | "telephoneNumber"
    | "fullStreetAddress"
    | "postalCode"
    | "countryName";
  onChangeText?: (value: any) => void | any;
  onBlur?: (value: any) => void | any;
  otherProps?: any;
  placeholder?: string;
  className?: string;
};

const AppInput = ({
  id,
  value,
  keyboardType = "default",
  onChangeText,
  type,
  onBlur,
  label,
  otherProps,
  icon,
  placeholder,
  className = "",
}: Props) => {
  return (
    <View className="">
      <View className="flex-row items-center pl-3 mb-1">
        <MaterialCommunityIcons name={icon} size={20} color={"#ffcb05"} />
        <Text className="pl-1 text-blue-700 text-sm">{label}</Text>
      </View>
      <TextInput
        value={value}
        textContentType={type}
        keyboardType={keyboardType}
        id={id}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${className} block w-full pl-4 py-2.5 border border-gray-400 rounded-full bg-gray-200/30 text-blue-900 outline-none focus:shadow-sm focus:border focus:ring-[#ffcb05] focus:border-[#ffcb05] `}
        {...otherProps}
      />
    </View>
  );
};

export default AppInput;
