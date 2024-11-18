import { AuthContextProvider } from "@/context-providers/AuthContextProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// Evita que la pantalla de splash se oculte automáticamente antes de cargar los recursos.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("./../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="modules/(auth)" />
        <Stack.Screen name="modules/(tabs)" />
        <Stack.Screen name="modules/(posts)" />
        <Stack.Screen name="modules/(profiles)" />
      </Stack>
    </AuthContextProvider>
  );
}