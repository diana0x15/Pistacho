import {
  DarkTheme,
  LightTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/useColorScheme";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //const colorScheme = useColorScheme();
  const colorScheme = "light";
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

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerBackButtonDisplayMode: "minimal",
            headerTransparent: true,
            title: "",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(category)" />
          <Stack.Screen name="(game)" />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
