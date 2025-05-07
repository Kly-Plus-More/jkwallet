import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Use a longer delay for Android to ensure the splash screen is visible
    const timer = setTimeout(
      () => {
        router.replace("login" as any);
      },
      Platform.OS === "android" ? 3000 : 2000
    );

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* <Image source={require("@/assets/images/logo.png")} style={styles.logo} /> */}
      <Text style={styles.text}>Welcome to the App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
