import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function WithdrawalScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('mobile');
  const [accountDetails, setAccountDetails] = useState('');

  const methods = [
    { id: 'bank', name: 'Bank Transfer', icon: 'bank', fee: '1.5%' },
    { id: 'mobile', name: 'Mobile Money', icon: 'cellphone', fee: '2.0%' },
    { id: 'crypto', name: 'Crypto Wallet', icon: 'bitcoin', fee: '0.5%' },
  ];

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Fund Withdrawal</Text>
          <MaterialCommunityIcons name="bank-remove" size={32} color="#4a90e2" />
        </View>

        {/* Balance Overview */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$5,280.50</Text>
          <View style={styles.feeBadge}>
            <MaterialCommunityIcons name="alert-circle" size={16} color="#ff6b6b" />
            <Text style={styles.feeText}>Fees may apply</Text>
          </View>
        </View>

        {/* Amount Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="currency-usd" size={28} color="#4cd964" />
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
          {['100', '500', '1000', 'MAX'].map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.amountButton}
              onPress={() => value === 'MAX' ? setAmount('5280.50') : setAmount(value)}
            >
              <Text style={styles.amountButtonText}>{value === 'MAX' ? 'Max' : `$${value}`}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Withdrawal Methods */}
        <Text style={styles.sectionTitle}>Withdrawal Method</Text>
        <View style={styles.methodsContainer}>
          {methods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && { borderColor: '#4cd964' }
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              {/* <MaterialCommunityIcons name={method.icon} size={32} color="#4a90e2" /> */}
              <Text style={styles.methodName}>{method.name}</Text>
              <Text style={styles.methodFee}>Fee: {method.fee}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Details */}
        <Text style={styles.sectionTitle}>Destination Details</Text>
        <TextInput
          style={styles.accountInput}
          placeholder="Enter account number/wallet address"
          placeholderTextColor="#888"
          value={accountDetails}
          onChangeText={setAccountDetails}
        />

        {/* Security Verification */}
        <TouchableOpacity 
          style={styles.securityButton}
          onPress={() => router.push}
        >
          <MaterialCommunityIcons name="shield-lock" size={24} color="#4cd964" />
          <Text style={styles.securityText}>Verify Identity</Text>
        </TouchableOpacity>

        {/* Withdraw Button */}
        <TouchableOpacity style={styles.withdrawButton}>
          <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
            <Text style={styles.buttonText}>Confirm Withdrawal</Text>
            <MaterialCommunityIcons name="arrow-right-circle" size={24} color="#fff" />
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
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#888',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  feeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,107,107,0.1)',
    padding: 8,
    borderRadius: 8,
  },
  feeText: {
    color: '#ff6b6b',
    marginLeft: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  amountInput: {
    flex: 1,
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  currency: {
    color: '#4cd964',
    fontSize: 20,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
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
  methodsContainer: {
    gap: 12,
    marginBottom: 25,
  },
  methodCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  methodFee: {
    color: '#888',
    fontSize: 14,
  },
  accountInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    marginBottom: 25,
  },
  securityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 25,
  },
  securityText: {
    color: '#4cd964',
    marginLeft: 10,
    fontWeight: '600',
  },
  withdrawButton: {
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