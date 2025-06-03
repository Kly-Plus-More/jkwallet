import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <View style={styles.header}>
        {/* <FontAwesome name="walle" size={80} color="#4cd964" /> */}
        <Text style={styles.title}>JK Wallet</Text>
        <Text style={styles.subtitle}>Manage your finances with ease</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <LinearGradient
            colors={['#4cd964', '#2ecc71']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/registration')}
        >
          <LinearGradient
            colors={['#3498db', '#2980b9']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 54,
    borderRadius: 27,
    marginBottom: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Add this in your Index component's return statement
{/* <TouchableOpacity onPress={() => router.push('/login')}>
  <Text style={{color: 'white'}}>Go to Login</Text>
</TouchableOpacity> */}