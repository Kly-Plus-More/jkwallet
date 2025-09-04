import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Paiement() {
  const paymentMethods = [
    { id: '1', name: 'Credit Card', icon: 'credit-card' },
    { id: '2', name: 'Mobile Money', icon: 'mobile' },
    { id: '3', name: 'PayPal', icon: 'paypal' },
    { id: '4', name: 'Bank Transfer', icon: 'bank' },
    { id: '5', name: 'Bitcoin', icon: 'bitcoin' },
    { id: '6', name: 'Cash', icon: 'money' },
  ];

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Methods</Text>
          <Text style={styles.subtitle}>Choose your preferred payment option</Text>
        </View>

        <View style={styles.paymentContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity 
              key={method.id}
              style={styles.paymentCard}
            >
              <View style={styles.paymentIcon}>
                {/* <FontAwesome name={method.icon} size={24} color="#4a90e2" /> */}
              </View>
              <Text style={styles.paymentText}>{method.name}</Text>
              <FontAwesome name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <FontAwesome name="plus" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentIcon: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginRight: 15,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});