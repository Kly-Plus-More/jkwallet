import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Login = () => {
  const router = useRouter();

  const handlesignup = () => {
    router.push("registration" as any);
  };

  const handlegototabs = () => {
    router.replace("/(tabs)");
    // or router.push("/(tabs)"); depending on your desired behavior
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
      <TouchableOpacity onPress={handlesignup}>
        <Text style={{ color: "blue", paddingTop: 15 }}>
          Go to registration
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlegototabs}>
        <Text style={{ color: "red", paddingTop: 15 }}>Go to tabs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
