import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeLayout() {
  const router = useRouter();

  const headerOptions = {
    headerShown: true,
    title: "",
    headerShadowVisible: false,
    headerBackVisible: false,
    headerLeft: ({ canGoBack }: { canGoBack: boolean }) =>
      canGoBack ? (
        <TouchableOpacity onPressIn={router.back}>
          <Ionicons size={28} name="arrow-back" color={"#7E7E7E"} />
        </TouchableOpacity>
      ) : null,
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={headerOptions} />
    </Stack>
  );
}
