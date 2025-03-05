import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HomeLayout() {
  const router = useRouter();

  const headerOptions = {
    headerShown: true,
    title: "",
    headerBackButtonDisplayMode: "minimal" as "minimal",
    headerShadowVisible: false,
    headerLeft: ({ canGoBack }: { canGoBack: boolean }) =>
      canGoBack ? (
        <TouchableOpacity onPress={router.back}>
          <IconSymbol size={28} name="xmark" color={"#7E7E7E"} />
        </TouchableOpacity>
      ) : null,
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={headerOptions} />
      <Stack.Screen name="game" options={headerOptions} />
    </Stack>
  );
}
