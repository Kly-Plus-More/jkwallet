import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Registration() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Registration</Text>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={{ color: "blue", paddingTop: 15 }}>Back to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("(tabs)" as any)}>
        <Text style={{ color: "red", paddingTop: 15 }}>Go to Tabs</Text>
      </TouchableOpacity>
    </View>
  );
}
