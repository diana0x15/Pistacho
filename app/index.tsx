import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Text } from "react-native";

export default function AppIndex() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Maybe also load app data here, while the splash screen is shown.
    const checkLogin = async () => {
      const hasSeenLogin = await AsyncStorage.getItem("hasSeenLogin");
      // router.replace(hasSeenLogin ? "/(tabs)" : "/(welcome)/welcome");
      router.replace("/(welcome)/welcome");
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  if (isLoading) {
    // TODO: show splash screen.
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
