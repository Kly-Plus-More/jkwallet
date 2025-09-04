import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddBudget() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const categories = [
    { name: 'Housing', icon: 'home', color: '#4a90e2' },
    { name: 'Food', icon: 'food', color: '#ff6b6b' },
    { name: 'Transport', icon: 'car', color: '#f7931a' },
    { name: 'Utilities', icon: 'lightbulb', color: '#4cd964' },
    { name: 'Health', icon: 'medical-bag', color: '#eb4d4b' },
    { name: 'Entertainment', icon: 'gamepad', color: '#a55eea' },
  ];

  const handleSubmit = () => {
    // Add budget submission logic
    router.back();
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Create New Budget</Text>
          <View style={{ width: 32 }} /> {/* Spacer */}
        </View>

        {/* Budget Name Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="text-box" size={24} color="#4a90e2" />
          <TextInput
            style={styles.input}
            placeholder="Budget Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Amount Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="currency-usd" size={24} color="#4a90e2" />
          <TextInput
            style={styles.input}
            placeholder="Budget Amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Category Grid */}
        <Text style={styles.sectionTitle}>Select Category</Text>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryCard,
                selectedCategory === category.name && { borderColor: category.color }
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              {/* <MaterialCommunityIcons
                name={category.icon}
                size={32}
                color={category.color}
              /> */}
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Period Selector */}
        <Text style={styles.sectionTitle}>Budget Period</Text>
        <View style={styles.periodContainer}>
          {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.activePeriod
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={styles.periodText}>{period.charAt(0).toUpperCase() + period.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Picker */}
        <Text style={styles.sectionTitle}>Start Date</Text>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          onChange={(_, date) => date && setSelectedDate(date)}
          themeVariant="dark"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
            <Text style={styles.submitText}>Create Budget</Text>
            <MaterialCommunityIcons name="check-circle" size={24} color="#fff" />
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
    marginTop: 10,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: '500',
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  periodButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activePeriod: {
    backgroundColor: '#4a90e2',
  },
  periodText: {
    color: '#fff',
    fontWeight: '500',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 30,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },
});