import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="screens/LoadingScreen" options={{ headerShown: false}} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
    <Stack.Screen name="screens/verifyOtp" options={{ headerShown: false}} />
    <Stack.Screen name="screens/Signup" options={{ headerShown: false}} />

    <Stack.Screen 
      name="screens/Login"
      options={{
        headerShown: false,
      }}
    />
  </Stack>;
}
