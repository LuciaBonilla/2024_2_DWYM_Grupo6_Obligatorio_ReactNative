import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// PROVEEDORES DE CONTEXTO.
import { AuthContextProvider } from "@/context-providers/AuthContextProvider";
import { WindowDimensionsProvider } from "@/context-providers/WindowDimensionsProvider";

// Evita que la pantalla de splash se oculte automáticamente antes de cargar los recursos.
SplashScreen.preventAutoHideAsync();

/**
 * Root Layout.
 * @estado TERMINADO. 
 */
export default function RootLayout() {
  const [loaded] = useFonts({
    SegoeBold: require("@/assets/fonts/Segoe UI Bold.ttf"), // Sólo esta fuente para mantener consistencia.
  });

  if (!loaded) {
    return null;
  }

  return (
    <WindowDimensionsProvider>
      <AuthContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="modules/(auth)" />
          <Stack.Screen name="modules/(tabs)" />
          <Stack.Screen name="modules/(posts)" />
          <Stack.Screen name="modules/(profiles)" />
        </Stack>
      </AuthContextProvider>
    </WindowDimensionsProvider>
  );
}