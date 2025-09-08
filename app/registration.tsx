import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const router = useRouter();

  const colors = isDarkMode ? Colors.dark : Colors.light;

  const handleRegister = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: "#1a1a1a" }]} // Dark background
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeToggle, { backgroundColor: "#333333" }]}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={20}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: "#6366f1" + "20" },
            ]}
          >
            <Ionicons name="person-add" size={40} color="#6366f1" />
          </View>
          <Text style={[styles.title, { color: "#ffffff" }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: "#a0a0a0" }]}>
            Start tracking your budget today
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Username Input */}
          <View style={styles.inputSection}>
            <Text style={[styles.inputLabel, { color: "#ffffff" }]}>
              Username
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: "#333333",
                  borderColor: "#444444",
                },
              ]}
            >
              <Ionicons name="person" size={20} color="#a0a0a0" />
              <TextInput
                style={[styles.input, { color: "#ffffff" }]}
                placeholder="Enter your username"
                placeholderTextColor="#666666"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputSection}>
            <Text style={[styles.inputLabel, { color: "#ffffff" }]}>Email</Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: "#333333",
                  borderColor: "#444444",
                },
              ]}
            >
              <Ionicons name="mail" size={20} color="#a0a0a0" />
              <TextInput
                style={[styles.input, { color: "#ffffff" }]}
                placeholder="Enter your email"
                placeholderTextColor="#666666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputSection}>
            <Text style={[styles.inputLabel, { color: "#ffffff" }]}>
              Password
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: "#333333",
                  borderColor: "#444444",
                },
              ]}
            >
              <Ionicons name="lock-closed" size={20} color="#a0a0a0" />
              <TextInput
                style={[styles.input, { color: "#ffffff" }]}
                placeholder="Enter your password"
                placeholderTextColor="#666666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#a0a0a0"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputSection}>
            <Text style={[styles.inputLabel, { color: "#ffffff" }]}>
              Confirm Password
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: "#333333",
                  borderColor: "#444444",
                },
              ]}
            >
              <Ionicons name="checkmark-circle" size={20} color="#a0a0a0" />
              <TextInput
                style={[styles.input, { color: "#ffffff" }]}
                placeholder="Confirm your password"
                placeholderTextColor="#666666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: "#6366f1" }]}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={[styles.loginText, { color: "#6366f1" }]}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
  },
  themeToggle: {
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  registerButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
