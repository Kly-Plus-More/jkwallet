import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TransferScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('wallet');

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Money Transfer</Text>
          <MaterialCommunityIcons name="bank-transfer" size={32} color="#4a90e2" />
        </View>

        {/* Recipient Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} color="#4a90e2" />
          <TextInput
            style={styles.input}
            placeholder="Recipient's phone or account"
            placeholderTextColor="#888"
            value={recipient}
            onChangeText={setRecipient}
          />
        </View>

        {/* Amount Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="currency-usd" size={24} color="#4a90e2" />
          <TextInput
            style={styles.input}
            placeholder="Amount to send"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodsContainer}>
          {[
            { id: 'wallet', name: 'JK Wallet', icon: 'wallet' },
            { id: 'bank', name: 'Bank Account', icon: 'bank' },
            { id: 'mobile', name: 'Mobile Money', icon: 'cellphone' },
          ].map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.selectedMethod
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              {/* <MaterialCommunityIcons 
                name={method.icon} 
                size={28} 
                color={selectedMethod === method.id ? '#4cd964' : '#fff'}
              /> */}
              <Text style={styles.methodText}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transaction Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transfer Amount</Text>
            <Text style={styles.detailValue}>${amount || '0.00'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service Fee</Text>
            <Text style={styles.detailValue}>$1.50</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTotal}>Total to Pay</Text>
            <Text style={styles.detailTotal}>${(parseFloat(amount) || 0) + 1.50}</Text>
          </View>
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton}>
          <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
            <Text style={styles.buttonText}>Confirm Transfer</Text>
            <MaterialCommunityIcons name="send" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  methodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  methodCard: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  selectedMethod: {
    backgroundColor: 'rgba(76,217,100,0.2)',
    borderWidth: 1,
    borderColor: '#4cd964',
  },
  methodText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  detailsCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    color: '#888',
    fontSize: 16,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
  },
  detailTotal: {
    color: '#4cd964',
    fontSize: 18,
    fontWeight: '600',
  },
  sendButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },
});