import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

export default function CurrencyScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [searchQuery, setSearchQuery] = useState('');

  const currencies = [
    { code: 'USD', name: 'US Dollar', rate: 1.0, change: '+0.12%' },
    { code: 'EUR', name: 'Euro', rate: 0.92, change: '-0.25%' },
    { code: 'GBP', name: 'British Pound', rate: 0.79, change: '+0.18%' },
    { code: 'JPY', name: 'Japanese Yen', rate: 141.23, change: '-0.32%' },
    { code: 'XAF', name: 'CFA Franc', rate: 605.5, change: '+0.05%' },
    { code: 'NGN', name: 'Naira', rate: 460.75, change: '-0.15%' },
  ];

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        // Dans le composant CurrencyScreen, modifiez le header :
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Currency Exchange</Text>
          <TouchableOpacity onPress={() => Linking.openURL('exp://127.0.0.1:19000')}>
            <MaterialCommunityIcons name="qrcode" size={32} color="#4a90e2" />
          </TouchableOpacity>
        </View>

        {/* Conversion Input */}
        <View style={styles.conversionCard}>
          <View style={styles.currencySelector}>
            <TouchableOpacity style={styles.currencyButton}>
              <Text style={styles.currencyCode}>{fromCurrency}</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={styles.amountInput}
              placeholder="Amount"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <MaterialCommunityIcons name="swap-vertical" size={32} color="#4cd964" style={styles.swapIcon} />

          <View style={styles.currencySelector}>
            <TouchableOpacity style={styles.currencyButton}>
              <Text style={styles.currencyCode}>{toCurrency}</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.convertedAmount}>≈ 0.00</Text>
          </View>
        </View>

        {/* Quick Convert Button */}
        <TouchableOpacity style={styles.convertButton}>
          <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
            <Text style={styles.convertText}>Convert Now</Text>
            <MaterialCommunityIcons name="currency-usd" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search currencies..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Currency List */}
        <FlatList
          data={filteredCurrencies}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.currencyCard}>
              <View style={styles.currencyInfo}>
                <Text style={styles.currencySymbol}>{item.code}</Text>
                <View>
                  <Text style={styles.currencyName}>{item.name}</Text>
                  <Text style={styles.exchangeRate}>1 USD = {item.rate} {item.code}</Text>
                </View>
              </View>
              <View style={styles.currencyChange}>
                <Text style={item.change.startsWith('+') ? styles.positive : styles.negative}>
                  {item.change}
                </Text>
                <MaterialCommunityIcons name="chart-line" size={24} color="#888" />
              </View>
            </View>
          )}
          keyExtractor={item => item.code}
        />
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
  conversionCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  currencySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  currencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 12,
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
    fontSize: 18,
    textAlign: 'right',
    marginLeft: 15,
  },
  convertedAmount: {
    color: '#4cd964',
    fontSize: 18,
    fontWeight: '600',
  },
  swapIcon: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  convertButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  convertText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  currencyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: '#4a90e2',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 15,
    width: 50,
  },
  currencyName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  exchangeRate: {
    color: '#888',
    fontSize: 14,
  },
  currencyChange: {
    alignItems: 'flex-end',
  },
  positive: {
    color: '#4cd964',
    fontSize: 14,
    fontWeight: '500',
  },
  negative: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '500',
  },
});