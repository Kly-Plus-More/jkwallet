// Update imports at the top
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Registration() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Register:", { email, password, username });
  };

  return (
    <ImageBackground
      source={{ uri: "https://example.com/your-background-image.jpg" }} // Replace with your image URL
      // OR remove ImageBackground completely and use a solid color/gradient:
      // <View style={styles.backgroundImage}>
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.8)"]}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <LinearGradient
              colors={["#4c669f", "#3b5998", "#192f6a"]}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/")}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => {
                /* Handle Google login */
              }}
            >
              <LinearGradient
                colors={["#DB4437", "#DC4E41"]}
                style={styles.socialGradient}
              >
                <FontAwesome name="google" size={30} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={() => {
                /* Handle Facebook login */
              }}
            >
              <LinearGradient
                colors={["#4267B2", "#3b5998"]}
                style={styles.socialGradient}
              >
                <FontAwesome name="facebook" size={30} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.whatsappButton]}
              onPress={() => {
                /* Handle WhatsApp login */
              }}
            >
              <LinearGradient
                colors={["#25D366", "#128C7E"]}
                style={styles.socialGradient}
              >
                <FontAwesome name="whatsapp" size={30} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 55,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 8,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  button: {
    width: "100%",
    height: 55,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
  },
  socialButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  socialGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  facebookButton: {
    backgroundColor: "#4267B2",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
  },
});
