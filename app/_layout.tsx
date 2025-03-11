import {
  DarkTheme,
  LightTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useContext } from "react";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

import { GameProvider } from "@/context/GameContext";
import { UserProvider, UserContext } from "@/context/UserContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const AppNavigator = () => {
  const [isFontReady] = useFonts({
    HankenGrotesk: require("../assets/fonts/HankenGrotesk-VariableFont_wght.ttf"),
  });
  const { isUserDataReady } = useContext(UserContext);

  useEffect(() => {
    if (isFontReady && isUserDataReady) {
      SplashScreen.hideAsync();
    }
  }, [isFontReady, isUserDataReady]);

  if (!isFontReady || !isUserDataReady) {
    return null;
  }

  const fadeOptions = {
    animation: "fade",
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tabs" options={fadeOptions} />
      <Stack.Screen name="onboarding" options={fadeOptions} />
      <Stack.Screen name="game" />
    </Stack>
  );
};

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const colorScheme = "light";

  return (
    <UserProvider>
      <GameProvider>
        <StatusBar style="dark" />
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AppNavigator />
        </ThemeProvider>
      </GameProvider>
    </UserProvider>
  );
}
