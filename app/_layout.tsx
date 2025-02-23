import {
  DarkTheme,
  LightTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import { GameProvider } from "@/context/GameContext";
import { UserProvider } from "@/context/UserContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const colorScheme = "light";
  const navigation = useNavigation();
  const [isFontReady] = useFonts({
    HankenGrotesk: require("../assets/fonts/HankenGrotesk-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (isFontReady) {
      SplashScreen.hideAsync();
    }
  }, [isFontReady]);

  if (!isFontReady) {
    return null;
  }

  const headerOptions = {
    headerShown: true,
    title: "",
    headerBackButtonDisplayMode: "minimal" as "minimal",
    headerShadowVisible: false,
    headerLeft: () => (
      <TouchableOpacity onPress={navigation.goBack}>
        <IconSymbol size={28} name="xmark" color={"#7E7E7E"} />
      </TouchableOpacity>
    ),
  };

  const fadeOptions = {
    animation: "fade",
  };

  return (
    <UserProvider>
      <GameProvider>
        <PaperProvider>
          <StatusBar style="dark" />
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={fadeOptions} />
              <Stack.Screen name="(category)" options={headerOptions} />
              <Stack.Screen name="(game)" options={headerOptions} />
              <Stack.Screen name="(onboarding)" options={fadeOptions} />
            </Stack>
          </ThemeProvider>
        </PaperProvider>
      </GameProvider>
    </UserProvider>
  );
}
