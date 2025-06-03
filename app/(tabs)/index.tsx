import { FontAwesome } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  const transactions = [
    { id: '1', category: 'Food', amount: -45.50, date: '2023-06-15' },
    { id: '2', category: 'Salary', amount: +2500.00, date: '2023-06-01' },
    { id: '3', category: 'Transport', amount: -30.00, date: '2023-06-10' },
  ];

  // const chartData = [
  //   { name: 'Income', amount: 3200, color: '#4CAF50' },
  //   { name: 'Expenses', amount: 1920, color: '#F44336' },
  // ];

  return (
    // <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>JK Wallet</Text>
          <FontAwesome name="bell" size={24} color="#4a90e2" />
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>$5,280.50</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={[styles.statValue, styles.income]}>+$3,200</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={[styles.statValue, styles.expense]}>-$1,920</Text>
            </View>
          </View>
        </View>

        {/* Chart */}
        {/* <View style={styles.chartContainer}>
          // In the PieChart component
          <PieChart
            data={chartData}
            width={300}
            height={220} // Increased from 120
            chartConfig={{
              backgroundColor: '#f5f7fa', // Changed from white
              decimalPlaces: 0,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15" // Changed from string to number
            absolute
          />
        </View> */}

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <FontAwesome 
                name={transaction.amount > 0 ? 'arrow-up' : 'arrow-down'} 
                size={20} 
                color={transaction.amount > 0 ? '#4CAF50' : '#F44336'} 
              />
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.amount > 0 ? styles.income : styles.expense
              ]}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
);
}

      {/* Floating Action Button */}
      // <TouchableOpacity style={styles.fab}>
      //   <FontAwesome name="plus" size={24} color="white" />
      // </TouchableOpacity>
    // </LinearGradient>
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  income: {
    color: '#4CAF50',
  },
  expense: {
    color: '#F44336',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
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