import { Stack } from "expo-router";
import React from "react";

export default function WelcomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
}
