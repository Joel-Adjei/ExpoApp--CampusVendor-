import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

interface TabBarIconProps {
  title: string;
  icon: string;
  focused: boolean;
}

const TabBarIcon = ({ title, icon, focused }: TabBarIconProps) => {
  return (
    <View className="flex-1 min-w-20 items-center justify-end rounded-full">
      <View
        className={`rounded-full ${
          focused
            ? "bg-amber-300 size-14 items-center justify-center border-4 border-blue-50"
            : ""
        }`}
      >
        <MaterialIcons
          name={icon}
          size={23}
          color={focused ? "white" : "#bdc4ce"}
        />
      </View>
      <Text
        className={`text-xs mt-1 ${
          focused ? "mt-1.5 text-amber-300" : "text-[#bdc4ce]"
        }`}
      >
        {title}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          minHeight: 90,
          bottom: 0,
          left: 16,
          right: 16,
          elevation: 0,
          backgroundColor: "#11296B",
          borderRadius: "none",
        },

        tabBarIconStyle: { marginTop: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" icon="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" icon="search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" icon="shopping-cart" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Profile" icon="person" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
