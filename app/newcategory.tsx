import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function NewCategoryScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [selectedPeriod, setSelectedPeriod] = useState('M');

  const icons = [
    'home', 'food', 'car', 'medical-bag', 'gamepad', 'tshirt-crew', 
    'lightbulb', 'book', 'cellphone', 'currency-usd', 'gift', 'palette'
  ];

  const periods = [
    { id: 'D', name: 'Daily', icon: 'calendar-day' },
    { id: 'W', name: 'Weekly', icon: 'calendar-week' },
    { id: 'M', name: 'Monthly', icon: 'calendar-month' },
    { id: 'Y', name: 'Yearly', icon: 'calendar' }
  ];

  const handleCreateCategory = () => {
    // Add category creation logic
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
          <Text style={styles.title}>New Category</Text>
          <MaterialCommunityIcons name="shape" size={32} color="#4a90e2" />
        </View>

        {/* Category Name Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="text-box" size={24} color="#4a90e2" />
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Budget Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="currency-usd" size={24} color="#4a90e2" />
          <TextInput
            style={styles.input}
            placeholder="Monthly Budget"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
          />
        </View>

        {/* Icon Selection */}
        <Text style={styles.sectionTitle}>Choose Icon</Text>
        <FlatList
          data={icons}
          numColumns={6}
          contentContainerStyle={styles.iconGrid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.iconButton,
                selectedIcon === item && styles.selectedIcon
              ]}
              onPress={() => setSelectedIcon(item)}
            >
              {/* <MaterialCommunityIcons 
                name={item} 
                size={28} 
                color={selectedIcon === item ? '#4cd964' : '#fff'} 
              /> */}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />

        {/* Period Selection */}
        <Text style={styles.sectionTitle}>Budget Period</Text>
        <View style={styles.periodContainer}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.activePeriod
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              {/* <MaterialCommunityIcons 
                name={period.icon} 
                size={20} 
                color={selectedPeriod === period.id ? '#fff' : '#4a90e2'} 
              /> */}
              <Text style={styles.periodText}>{period.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateCategory}>
          <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
            <Text style={styles.buttonText}>Create Category</Text>
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
  iconGrid: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 25,
  },
  selectedIcon: {
    backgroundColor: 'rgba(76,217,100,0.2)',
    borderWidth: 2,
    borderColor: '#4cd964',
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  periodButton: {
    width: '24%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  activePeriod: {
    backgroundColor: '#4a90e2',
  },
  periodText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
  },
  createButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
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