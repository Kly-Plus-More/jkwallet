import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/(tabs)');
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {/* <FontAwesome name="wallet" size={50} color="#4cd964" /> */}
        </View>
        <Text style={styles.title}>Welcome to JK Wallet</Text>
        <Text style={styles.subtitle}>Sign in to manage your finances</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Email Input */}
        <View style={[styles.inputGroup, isEmailFocused && styles.inputFocused]}>
          <FontAwesome name="envelope" size={18} color="#4cd964" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </View>

        {/* Password Input */}
        <View style={[styles.inputGroup, isPasswordFocused && styles.inputFocused]}>
          <FontAwesome name="lock" size={18} color="#4cd964" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesome 
              name={showPassword ? 'eye-slash' : 'eye'} 
              size={20} 
              color="#4cd964" 
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#4cd964', '#2ecc71']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Additional Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Section */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity 
            style={styles.signupButton}
            onPress={() => router.push('/registration')}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Social Login */}
        <View style={styles.socialLoginContainer}>
          <View style={styles.divider} />
          <Text style={styles.socialText}>Or continue with</Text>
          <View style={styles.divider} />
        </View>
        
        <View style={styles.socialIconsContainer}>
          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="google" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="apple" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="facebook" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: '#4cd964',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  input: {
    flex: 1,
    height: 54,
    color: '#fff',
    paddingHorizontal: 15,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    height: 54,
    borderRadius: 12,
    marginTop: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  optionsContainer: {
    alignItems: 'flex-end',
    marginTop: 15,
  },
  forgotPassword: {
    color: '#4cd964',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signupText: {
    color: '#ccc',
    marginRight: 8,
  },
  signupButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#4cd964',
  },
  signupButtonText: {
    color: '#4cd964',
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  socialText: {
    color: '#ccc',
    marginHorizontal: 15,
    fontSize: 12,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
  },
  socialIcon: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 12,
  },
});