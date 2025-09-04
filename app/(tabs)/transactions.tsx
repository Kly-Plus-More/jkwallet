import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Transactions() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [activePaymentMethod, setActivePaymentMethod] = useState('card');

  const transactions = [
    { id: '1', category: 'Salary', amount: 2500, date: '2023-06-01', type: 'income', icon: 'wallet', method: 'bank' },
    { id: '2', category: 'Rent', amount: 800, date: '2023-06-05', type: 'expense', icon: 'home', method: 'card' },
    { id: '3', category: 'Groceries', amount: 120, date: '2023-06-10', type: 'expense', icon: 'shopping-cart', method: 'mobile' },
    { id: '4', category: 'Bitcoin Purchase', amount: 500, date: '2023-06-15', type: 'income', icon: 'bitcoin', method: 'crypto' },
  ];

  const exchangeRates = [
    { currency: 'USD', rate: 1.0, change: '+0.02%' },
    { currency: 'EUR', rate: 0.92, change: '-0.15%' },
    { currency: 'BTC', rate: 0.000032, change: '+1.2%' },
  ];

  const filteredTransactions = activeTab === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Financial Transactions</Text>
        
        {/* Payment Method Selector */}
        <View style={styles.paymentMethodContainer}>
          {['card', 'mobile', 'crypto'].map((method) => (
            <TouchableOpacity
              key={method}
              style={[styles.paymentMethodButton, activePaymentMethod === method && styles.activePaymentMethod]}
              onPress={() => setActivePaymentMethod(method)}
            >
              <MaterialCommunityIcons 
                name={
                  method === 'card' ? 'credit-card' : 
                  method === 'mobile' ? 'cellphone' : 'bitcoin'
                } 
                size={20} 
                color={activePaymentMethod === method ? '#fff' : '#4a90e2'} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {['deposit', 'withdraw', 'transfer', 'exchange'].map((action) => (
          <TouchableOpacity 
            key={action}
            style={styles.actionButton}
            onPress={() => router.push}
          >
            <MaterialCommunityIcons 
              name={
                action === 'deposit' ? 'bank-plus' : 
                action === 'withdraw' ? 'bank-minus' :
                action === 'transfer' ? 'bank-transfer' : 'currency-usd'
              } 
              size={24} 
              color="#4a90e2" 
            />
            <Text style={styles.actionText}>
              {action === 'deposit' ? 'Deposit' : 
               action === 'withdraw' ? 'Withdraw' :
               action === 'transfer' ? 'Transfer' : 'Exchange'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exchange Rates */}
      <View style={styles.exchangeContainer}>
        <Text style={styles.sectionTitle}>Live Exchange Rates</Text>
        {exchangeRates.map((rate) => (
          <View key={rate.currency} style={styles.rateItem}>
            <Text style={styles.currency}>{rate.currency}</Text>
            <Text style={styles.rateValue}>{rate.rate}</Text>
            <Text style={[
              styles.rateChange,
              rate.change.startsWith('exchange') ? styles.positive : styles.negative
            ]}>
              {rate.change}
            </Text>
          </View>
        ))}
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.transactionCard}
            onPress={() => router.push}
          >
            <View style={styles.transactionHeader}>
              <View style={[
                styles.iconContainer,
                // item.type === 'income' ? styles.incomeBg : styles.expenseBg,
                // styles[item.method]
              ]}>
                {/* <MaterialCommunityIcons 
                  name={item.icon} 
                  size={20} 
                  color={item.type === 'income' ? '#4CAF50' : '#F44336'} 
                /> */}
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <Text style={[styles.amount, item.type === 'income' ? styles.income : styles.expense]}>
              {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'space-around',
  },
  paymentMethodButton: {
    padding: 12,
    borderRadius: 12,
  },
  activePaymentMethod: {
    backgroundColor: '#4a90e2',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  exchangeContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    width: 60,
  },
  rateValue: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  rateChange: {
    fontSize: 14,
    fontWeight: '600',
    width: 80,
    textAlign: 'right',
  },
  positive: {
    color: '#4cd964',
  },
  negative: {
    color: '#ff6b6b',
  },
  listContainer: {
    paddingBottom: 20,
  },
  transactionCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  incomeBg: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  expenseBg: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  card: {
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  mobile: {
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  crypto: {
    borderWidth: 1,
    borderColor: '#f7931a',
  },
  bank: {
    borderWidth: 1,
    borderColor: '#4cd964',
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  date: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#4CAF50',
  },
  expense: {
    color: '#F44336',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4a90e2',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});