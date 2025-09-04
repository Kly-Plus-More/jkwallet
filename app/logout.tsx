import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Add your actual logout logic here
    // Example: Clear AsyncStorage, auth tokens, etc.
    router.replace('/login');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FontAwesome name="sign-out" size={60} color="#e74c3c" />
        </View>
        
        <Text style={styles.title}>Log Out?</Text>
        <Text style={styles.subtitle}>Are you sure you want to sign out?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
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
    alignItems: 'center',
    padding: 25,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    padding: 25,
    borderRadius: 50,
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#4cd964',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  cancelButtonText: {
    color: '#4cd964',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});