import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen
      name="screens/Login"
      options={{
        headerShown: false,
      }}
    />
  </Stack>;
}
