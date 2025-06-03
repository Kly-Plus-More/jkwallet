import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Transactions() {
  const transactions = [
    { id: '1', category: 'Salary', amount: 2500, date: '2023-06-01', type: 'income' },
    { id: '2', category: 'Rent', amount: 800, date: '2023-06-05', type: 'expense' },
    { id: '3', category: 'Groceries', amount: 120, date: '2023-06-10', type: 'expense' },
    { id: '4', category: 'Freelance', amount: 500, date: '2023-06-15', type: 'income' },
  ];

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <FontAwesome 
                name={item.type === 'income' ? 'arrow-up' : 'arrow-down'} 
                size={20} 
                color={item.type === 'income' ? '#4CAF50' : '#F44336'} 
              />
              <View style={styles.transactionInfo}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <Text style={[styles.amount, item.type === 'income' ? styles.income : styles.expense]}>
              {item.type === 'income' ? '+' : '-'}${item.amount}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  listContainer: {
    paddingBottom: 80,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionInfo: {
    marginLeft: 15,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
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