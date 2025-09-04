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
       <Stack.Screen
        name="ai"
        options={{
          headerShown: false,
          headerTitle: "ai",
        }}
      />
       <Stack.Screen
        name="about"
        options={{
          headerShown: false,
          headerTitle: "about",
        }}
      />
       <Stack.Screen
        name="account"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      /> <Stack.Screen
      name="add budget"
      options={{
        headerShown: false,
        headerTitle: "",
      }}
    /> <Stack.Screen
    name="currency"
    options={{
      headerShown: false,
      headerTitle: "",
    }}
  /> <Stack.Screen
  name="depot"
  options={{
    headerShown: false,
    headerTitle: "",
  }}
/> <Stack.Screen
        name="exchange"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      /> <Stack.Screen
      name="groceries"
      options={{
        headerShown: false,
        headerTitle: "",
      }}
    /> <Stack.Screen
    name="language"
    options={{
      headerShown: false,
      headerTitle: "",
    }}
  /> <Stack.Screen
  name="logout"
  options={{
    headerShown: false,
    headerTitle: "",
  }}
/> <Stack.Screen
        name="new category"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      /> <Stack.Screen
      name="paiement"
      options={{
        headerShown: false,
        headerTitle: "paiement",
      }}
    /> <Stack.Screen
    name="rent"
    options={{
      headerShown: false,
      headerTitle: "rent",
    }}
  /> <Stack.Screen
  name="salaire"
  options={{
    headerShown: false,
    headerTitle: "salaire",
  }}
/> <Stack.Screen
        name="support"
        options={{
          headerShown: false,
          headerTitle: "support",
        }}
      /> 
       <Stack.Screen
    name="transfer"
    options={{
      headerShown: false,
      headerTitle: "transfer",
    }}
  /> 
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="registration" options={{ headerShown: false }} />
    </Stack>
  );
}