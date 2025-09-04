import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DepositScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: 'bank', color: '#4a90e2' },
    { id: 'card', name: 'Credit Card', icon: 'credit-card', color: '#ff6b6b' },
    { id: 'mobile', name: 'Mobile Money', icon: 'cellphone', color: '#4cd964' },
    { id: 'crypto', name: 'Crypto', icon: 'bitcoin', color: '#f7931a' },
  ];

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Fund Deposit</Text>
          <View style={{ width: 32 }} /> {/* Spacer */}
        </View>

        {/* Amount Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Deposit Amount</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.currency}>USD</Text>
        </View>

        {/* Quick Amounts */}
        <View style={styles.quickAmounts}>
          {['100', '500', '1000', '5000'].map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.amountButton}
              onPress={() => setAmount(value)}
            >
              <Text style={styles.amountButtonText}>${value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        <View style={styles.methodsGrid}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && { borderColor: method.color }
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              {/* <MaterialCommunityIcons
                name={method.icon}
                size={32}
                color={method.color}
              /> */}
              <Text style={styles.methodName}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Deposit Button */}
        <TouchableOpacity style={styles.depositButton}>
          <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
            <Text style={styles.depositText}>Confirm Deposit</Text>
            <MaterialCommunityIcons name="lock-check" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Recent Deposits */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionsList}>
          {[100, 500, 1000].map((amount, index) => (
            <View key={index} style={styles.transactionItem}>
              <MaterialCommunityIcons name="clock" size={24} color="#888" />
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionAmount}>${amount}</Text>
                <Text style={styles.transactionDate}>2023-06-{15 + index}</Text>
              </View>
              <Text style={styles.transactionStatus}>Completed</Text>
            </View>
          ))}
        </View>
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  inputLabel: {
    color: '#888',
    fontSize: 16,
    marginBottom: 10,
  },
  amountInput: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  currency: {
    color: '#4cd964',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  amountButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 12,
  },
  amountButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  methodCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodName: {
    color: '#fff',
    marginTop: 10,
    fontWeight: '500',
  },
  depositButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  depositText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },
  transactionsList: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 16,
  },
  transactionAmount: {
    color: '#fff',
    fontWeight: '500',
  },
  transactionDate: {
    color: '#888',
    fontSize: 12,
  },
  transactionStatus: {
    color: '#4cd964',
    fontWeight: '500',
  },
});