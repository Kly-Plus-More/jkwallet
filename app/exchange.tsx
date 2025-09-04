import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ExchangeScreen() {
  const router = useRouter();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [exchangeRate] = useState(0.92);

  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'XAF', name: 'CFA Franc', flag: '🇲🇱' },
    { code: 'NGN', name: 'Naira', flag: '🇳🇬' },
    { code: 'JPY', name: 'Yen', flag: '🇯🇵' },
  ];

  const recentTransactions = [
    { id: '1', date: '2023-06-15', from: 'USD', to: 'XAF', amount: 500, rate: 605.5 },
    { id: '2', date: '2023-06-14', from: 'EUR', to: 'NGN', amount: 200, rate: 460.75 },
    { id: '3', date: '2023-06-13', from: 'XAF', to: 'USD', amount: 302750, rate: 0.00165 },
  ];

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Currency Exchange</Text>
          <MaterialCommunityIcons name="bank-transfer" size={32} color="#4a90e2" />
        </View>

        {/* Exchange Interface */}
        <View style={styles.exchangeCard}>
          {/* From Currency */}
          <View style={styles.currencySection}>
            <Text style={styles.sectionLabel}>From</Text>
            <View style={styles.currencyInput}>
              <TouchableOpacity style={styles.currencySelector}>
                <Text style={styles.currencyFlag}>{currencies.find(c => c.code === fromCurrency)?.flag}</Text>
                <Text style={styles.currencyCode}>{fromCurrency}</Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#fff" />
              </TouchableOpacity>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={fromAmount}
                onChangeText={(text) => {
                  setFromAmount(text);
                  setToAmount((parseFloat(text) * exchangeRate).toFixed(2));
                }}
              />
            </View>
          </View>

          {/* Swap Button */}
          <TouchableOpacity style={styles.swapButton} onPress={handleSwapCurrencies}>
            <MaterialCommunityIcons name="swap-vertical" size={28} color="#4cd964" />
          </TouchableOpacity>

          {/* To Currency */}
          <View style={styles.currencySection}>
            <Text style={styles.sectionLabel}>To</Text>
            <View style={styles.currencyInput}>
              <TouchableOpacity style={styles.currencySelector}>
                <Text style={styles.currencyFlag}>{currencies.find(c => c.code === toCurrency)?.flag}</Text>
                <Text style={styles.currencyCode}>{toCurrency}</Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.amountDisplay}>{toAmount || '0.00'}</Text>
            </View>
          </View>

          {/* Exchange Rate */}
          <Text style={styles.rateText}>
            1 {fromCurrency} = {exchangeRate} {toCurrency}
          </Text>
        </View>

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Recent Exchanges</Text>
        <FlatList
          data={recentTransactions}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <Text style={styles.transactionDate}>{item.date}</Text>
                <Text style={styles.transactionAmount}>
                  {item.amount} {item.from} → {item.to}
                </Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.rateText}>Rate: {item.rate}</Text>
                <MaterialCommunityIcons name="check-circle" size={20} color="#4cd964" />
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        {/* Exchange Button */}
        <TouchableOpacity style={styles.exchangeButton}>
          <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
            <Text style={styles.buttonText}>Confirm Exchange</Text>
            <MaterialCommunityIcons name="currency-usd" size={24} color="#fff" />
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
  exchangeCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  currencySection: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#888',
    fontSize: 16,
    marginBottom: 10,
  },
  currencyInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 12,
  },
  currencyFlag: {
    fontSize: 24,
    marginRight: 10,
  },
  currencyCode: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 15,
  },
  amountDisplay: {
    color: '#4cd964',
    fontSize: 24,
    fontWeight: 'bold',
  },
  swapButton: {
    alignSelf: 'center',
    padding: 10,
    marginVertical: 15,
  },
  rateText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  transactionCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionDate: {
    color: '#888',
    fontSize: 14,
  },
  transactionAmount: {
    color: '#fff',
    fontWeight: '500',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exchangeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 25,
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