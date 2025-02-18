import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Platform, StatusBar, Dimensions } from "react-native";

// iPhone 16: 59px
// Pixel 9:    0px
export function getTopInset() {
  return useSafeAreaInsets().top;
}

// iPhone 16: 34px
// Pixel 9:    0px
export function getBottomInset() {
  return useSafeAreaInsets().bottom;
}

// iPhone 16: 83px
// Pixel 9:   49px
export function getBottomTabHeight() {
  return useBottomTabBarHeight();
}

// iPhone 16:  0px
// Pixel 9:   54px
export function getStatusBarHeight() {
  return StatusBar.currentHeight || 0;
}

// iPhone 16: 852px
// Pixel 9:   923px
export function getWindowHeight() {
  return Dimensions.get("window").height;
}

export function getWindowWidth() {
  return Dimensions.get("window").width;
}

export function getVisibleHeight() {
  return getWindowHeight() - getStatusBarHeight();
}

function print(description: string, size: number) {
  console.log(Platform.OS + " --- " + description + ": " + size);
}
