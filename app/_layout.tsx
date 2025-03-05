import {
  DarkTheme,
  LightTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import { GameProvider } from "@/context/GameContext";
import { UserProvider } from "@/context/UserContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
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
              <Stack.Screen name="(onboarding)" options={fadeOptions} />
            </Stack>
            {/* <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={fadeOptions} />
              <Stack.Screen name="(category)" options={headerOptions} />
              <Stack.Screen name="(game)" options={headerOptions} />
              <Stack.Screen name="(onboarding)" options={fadeOptions} />
            </Stack> */}
          </ThemeProvider>
        </PaperProvider>
      </GameProvider>
    </UserProvider>
  );
}
