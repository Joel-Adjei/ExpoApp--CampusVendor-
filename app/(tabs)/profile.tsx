import useAuthStore from "@/store/authStore";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/CusButton";

const profile = () => {
  const { updateLogout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    updateLogout();
    router.replace("/screens/Login");
  };
  return (
    <View>
      <Text>profile</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
