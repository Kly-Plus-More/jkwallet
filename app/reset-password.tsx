import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Load email from AsyncStorage
    const loadEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("resetEmail");
        if (savedEmail) {
          setEmail(savedEmail);
        } else {
          // If no email found, redirect to forgot password page
          router.replace("/forgot-password");
        }
      } catch (error) {
        console.error("Error loading email:", error);
        router.replace("/forgot-password");
      }
    };
    loadEmail();
  }, []);

  const validateForm = () => {
    if (!newPassword.trim()) {
      setError("New password is required");
      return false;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!confirmPassword.trim()) {
      setError("Please confirm your password");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.1.69:1010/ResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Password reset successful
        Alert.alert("Success", "Password reset successfully!", [
          {
            text: "OK",
            onPress: async () => {
              // Clear the stored email
              await AsyncStorage.removeItem("resetEmail");
              router.replace("/login");
            },
          },
        ]);
      } else {
        // Password reset failed
        setError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <FontAwesome name="lock" size={50} color="#6366f1" />
        </View>

        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your new password for {email}</Text>

        <View style={styles.formContainer}>
          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="lock" size={16} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#666666"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome
                  name={showPassword ? "eye-slash" : "eye"}
                  size={18}
                  color="#6366f1"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="check-circle" size={16} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#666666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesome
                  name={showConfirmPassword ? "eye-slash" : "eye"}
                  size={18}
                  color="#6366f1"
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.primaryButton,
              isLoading && styles.primaryButtonDisabled,
            ]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Reset Password</Text>
            )}
          </TouchableOpacity>

          <View style={styles.backToLoginContainer}>
            <Text style={styles.backToLoginText}>Remember your password? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.backToLoginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    textAlign: "center",
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333333",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#444444",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#ffffff",
  },
  primaryButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  primaryButtonDisabled: {
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
  backToLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backToLoginText: {
    color: "#a0a0a0",
    fontSize: 16,
  },
  backToLoginLink: {
    color: "#6366f1",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
