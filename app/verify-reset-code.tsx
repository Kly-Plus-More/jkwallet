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

export default function VerifyResetCode() {
  const [resetCode, setResetCode] = useState("");
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

  const validateCode = () => {
    if (!resetCode.trim()) {
      setError("Reset code is required");
      return false;
    }
    if (resetCode.length < 4) {
      setError("Please enter the complete reset code");
      return false;
    }
    return true;
  };

  const handleVerifyCode = async () => {
    setError("");

    if (!validateCode()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.1.81:1010/ResetCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: resetCode.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Code verification successful
        Alert.alert("Success", "Code verified successfully!", [
          {
            text: "OK",
            onPress: () => router.push("/reset-password"),
          },
        ]);
      } else {
        // Code verification failed
        setError(data.message || "Invalid reset code. Please try again.");
      }
    } catch (error) {
      console.error("Code verification error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.1.81:1010/RequestReset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "New reset code sent to your email!");
      } else {
        setError(data.message || "Failed to resend code. Please try again.");
      }
    } catch (error) {
      console.error("Resend code error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <FontAwesome name="shield" size={50} color="#6366f1" />
        </View>

        <Text style={styles.title}>Verify Reset Code</Text>
        <Text style={styles.subtitle}>
          Enter the reset code sent to {email}
        </Text>

        <View style={styles.formContainer}>
          {/* Reset Code Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Reset Code</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="key" size={16} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Enter reset code"
                placeholderTextColor="#666666"
                value={resetCode}
                onChangeText={setResetCode}
                keyboardType="numeric"
                maxLength={6}
              />
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
            onPress={handleVerifyCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Verify Code</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendCode}
            disabled={isLoading}
          >
            <Text style={styles.resendButtonText}>Resend Code</Text>
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
    marginBottom: 16,
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
  resendButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#6366f1",
  },
  resendButtonText: {
    color: "#6366f1",
    fontSize: 16,
    fontWeight: "600",
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
