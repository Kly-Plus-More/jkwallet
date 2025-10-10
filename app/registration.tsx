import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const colors = isDarkMode ? Colors.dark : Colors.light;

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (phoneNumber.length !== 10 || !phoneNumber.startsWith("07")) {
      setError("Phone number must be 10 digits and start with '07'");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.1.69:1010/Createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        Alert.alert("Success", "Account created successfully!", [
          {
            text: "OK",
            onPress: () => router.push("/login"),
          },
        ]);
      } else {
        // Registration failed
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
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

          {/* Phone Number Input */}
          <View style={styles.inputSection}>
            <Text style={[styles.inputLabel, { color: "#ffffff" }]}>
              Phone Number
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
              <Ionicons name="call" size={20} color="#a0a0a0" />
              <TextInput
                style={[styles.input, { color: "#ffffff" }]}
                placeholder="07XXXXXXXX"
                placeholderTextColor="#666666"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
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

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Register Button */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              { backgroundColor: "#6366f1" },
              isLoading && styles.registerButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
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
  registerButtonDisabled: {
    backgroundColor: "#4a4a4a",
    opacity: 0.6,
  },
  errorContainer: {
    backgroundColor: "#ff4444",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
  loginText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
