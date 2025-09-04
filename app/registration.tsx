<<<<<<< HEAD
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
=======
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
>>>>>>> 757b63e10296907585123c776262c7da71eb591b

export default function Registration() {
  const [profileName, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    router.replace('/(tabs)');
  };

  return (
<<<<<<< HEAD
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
=======
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-plus" size={50} color="#4cd964" />
        <Text style={styles.title}>Create Account</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <FontAwesome name="envelope" size={20} color="#4cd964" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
>>>>>>> 757b63e10296907585123c776262c7da71eb591b
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="lock" size={20} color="#4cd964" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome 
              name={showPassword ? 'eye-slash' : 'eye'} 
              size={20} 
              color="#4cd964" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="check-circle" size={20} color="#4cd964" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
=======
>>>>>>> 757b63e10296907585123c776262c7da71eb591b
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
  },
  formContainer: {
<<<<<<< HEAD
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
=======
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
>>>>>>> 757b63e10296907585123c776262c7da71eb591b
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  input: {
<<<<<<< HEAD
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
=======
    flex: 1,
    height: 50,
    color: '#fff',
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  registerButton: {
    height: 50,
    backgroundColor: '#4cd964',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#4cd964',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
>>>>>>> 757b63e10296907585123c776262c7da71eb591b
