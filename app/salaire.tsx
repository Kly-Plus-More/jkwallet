import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SalaryScreen() {
  const router = useRouter();
  const [salaryData] = useState([
    { id: '1', date: '2023-06-30', amount: 2500, status: 'processed', currency: 'USD' },
    { id: '2', date: '2023-05-31', amount: 2500, status: 'processed', currency: 'USD' },
    { id: '3', date: '2023-04-28', amount: 2450, status: 'adjusted', currency: 'USD' },
  ]);

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Salary Management</Text>
        <MaterialCommunityIcons name="cash-multiple" size={32} color="#4a90e2" />
      </View>

      {/* Next Payment Card */}
      <View style={styles.nextPaymentCard}>
        <MaterialCommunityIcons name="calendar-clock" size={40} color="#4cd964" />
        <View style={styles.paymentInfo}>
          <Text style={styles.nextPaymentText}>Next Payment Date</Text>
          <Text style={styles.paymentDate}>July 31, 2023</Text>
          <Text style={styles.expectedAmount}>Expected: $2,500.00</Text>
        </View>
      </View>

      {/* Salary Breakdown */}
      <View style={styles.breakdownContainer}>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Net Salary</Text>
          <Text style={styles.breakdownValue}>$2,130.00</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Taxes</Text>
          <Text style={[styles.breakdownValue, styles.taxText]}>$320.00</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Deductions</Text>
          <Text style={[styles.breakdownValue, styles.deductionText]}>$50.00</Text>
        </View>
      </View>

      {/* History Title */}
      <Text style={styles.sectionTitle}>Payment History</Text>

      {/* Salary List */}
      <FlatList
        data={salaryData}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.salaryItem}>
            <View style={styles.itemLeft}>
              <MaterialCommunityIcons 
                name={item.status === 'processed' ? 'check-circle' : 'alert-circle'} 
                size={24} 
                color={item.status === 'processed' ? '#4cd964' : '#ff6b6b'} 
              />
              <View style={styles.itemDetails}>
                <Text style={styles.salaryDate}>{item.date}</Text>
                <Text style={styles.salaryStatus}>{item.status.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.salaryAmount}>${item.amount.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push}>
          <MaterialCommunityIcons name="file-document" size={24} color="#4a90e2" />
          <Text style={styles.actionText}>View Payslips</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push}>
          <MaterialCommunityIcons name="cog" size={24} color="#4a90e2" />
          <Text style={styles.actionText}>Salary Settings</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  nextPaymentCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  paymentInfo: {
    marginLeft: 20,
  },
  nextPaymentText: {
    color: '#888',
    fontSize: 16,
  },
  paymentDate: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 5,
  },
  expectedAmount: {
    color: '#4cd964',
    fontSize: 16,
  },
  breakdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  breakdownItem: {
    alignItems: 'center',
    flex: 1,
  },
  breakdownLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  breakdownValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  taxText: {
    color: '#ff6b6b',
  },
  deductionText: {
    color: '#ff6b6b',
  },
  separator: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  salaryItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    marginLeft: 15,
  },
  salaryDate: {
    color: '#fff',
    fontSize: 16,
  },
  salaryStatus: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  salaryAmount: {
    color: '#4cd964',
    fontSize: 16,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#4a90e2',
    marginTop: 8,
    fontWeight: '500',
  },
});