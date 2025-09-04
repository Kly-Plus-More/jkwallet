import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RentScreen() {
  const router = useRouter();
  const [properties] = useState([
    { id: '1', name: 'Downtown Apartment', amount: 1200, dueDate: '2023-07-05', status: 'upcoming' },
    { id: '2', name: 'Office Space', amount: 2500, dueDate: '2023-06-28', status: 'overdue' },
    { id: '3', name: 'Vacation Home', amount: 800, dueDate: '2023-07-15', status: 'paid' },
  ]);

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Rent Management</Text>
        <MaterialCommunityIcons name="home-city" size={32} color="#4a90e2" />
      </View>

      {/* Add Property Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push}
      >
        <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Property</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Upcoming Payments */}
      <Text style={styles.sectionTitle}>Upcoming Payments</Text>
      <View style={styles.paymentCard}>
        <MaterialCommunityIcons name="calendar-clock" size={40} color="#4a90e2" />
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentDue}>Next Payment Due</Text>
          <Text style={styles.paymentAmount}>$1,200</Text>
          <Text style={styles.paymentDate}>July 5, 2023</Text>
        </View>
      </View>

      {/* Properties List */}
      <FlatList
        data={properties}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.propertyCard}>
            <MaterialCommunityIcons 
              name="office-building" 
              size={32} 
              color={item.status === 'overdue' ? '#ff6b6b' : '#4cd964'} 
            />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyName}>{item.name}</Text>
              <Text style={styles.propertyDetails}>
                ${item.amount} • Due {item.dueDate}
              </Text>
            </View>
            <View style={styles.statusBadge }>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  );
}

const statusColors = {
  paid: '#4cd96420',
  upcoming: '#4a90e220',
  overdue: '#ff6b6b20'
};

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
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  paymentCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  paymentInfo: {
    marginLeft: 15,
  },
  paymentDue: {
    color: '#888',
    fontSize: 14,
  },
  paymentAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  paymentDate: {
    color: '#4cd964',
    fontSize: 16,
  },
  propertyCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 15,
  },
  propertyName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  propertyDetails: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "red"
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  listContainer: {
    paddingBottom: 20,
  },
});