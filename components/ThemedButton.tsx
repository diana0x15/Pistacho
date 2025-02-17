import React from "react";
import { StyleSheet, GestureResponderEvent } from "react-native";
import { Button } from "react-native-paper";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedButtonProps = {
  children: React.ReactNode;
  mode?: "primary" | "secondary";
  lightColor?: string;
  darkColor?: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function ThemedButton({
  children,
  mode = "primary",
  lightColor,
  darkColor,
  onPress,
}: ThemedButtonProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );
  const onColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "onPrimary"
  );

  const buttonMode = mode === "primary" ? "contained" : "outlined";
  const backgroundColor = mode === "primary" ? color : undefined;
  const outlineColor = mode === "secondary" ? color : undefined;
  const textColor = mode === "primary" ? onColor : color;

  return (
    <Button
      mode={buttonMode}
      buttonColor={backgroundColor}
      style={[{ borderColor: outlineColor }, styles.buttonStyle]}
      labelStyle={[{ color: textColor }, styles.labelStyle]}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 52,
    borderRadius: 100,
  },
  labelStyle: {
    fontSize: 18,
    height: 52,
    borderRadius: 0,
    lineHeight: 50,
    marginVertical: 0,
  },
});
