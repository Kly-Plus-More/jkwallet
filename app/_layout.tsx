import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      // Add a small delay to ensure the splash screen is visible
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
    }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { color: "#fff" },
        headerStyle: {
          backgroundColor: "#0493bf",
        },

        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="registration" options={{ headerShown: false }} />
    </Stack>
  );
}