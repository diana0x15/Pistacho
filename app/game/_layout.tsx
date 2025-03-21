import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function GameLayout() {
  const router = useRouter();

  const headerOptions = {
    headerShown: true,
    title: "",
    headerShadowVisible: false,
    headerLeft: ({ canGoBack }: { canGoBack: boolean }) =>
      canGoBack ? (
        <TouchableOpacity onPressIn={router.back}>
          <Ionicons size={32} name="close" color={"#7E7E7E"} />
        </TouchableOpacity>
      ) : null,
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={headerOptions} />
      <Stack.Screen name="celebration" />
      <Stack.Screen name="words" options={headerOptions} />
    </Stack>
  );
}
