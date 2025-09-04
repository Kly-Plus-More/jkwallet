import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GroceriesScreen() {
  const router = useRouter();
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([
    { id: '1', name: 'Milk', price: 2.5, quantity: 1, category: 'dairy' },
    { id: '2', name: 'Bread', price: 1.8, quantity: 2, category: 'bakery' },
    { id: '3', name: 'Apples', price: 4.0, quantity: 1, category: 'produce' },
  ]);
  const [budget] = useState(150);
  const totalSpent = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const categories = [
    { id: 'all', name: 'All', icon: 'format-list-bulleted' },
    { id: 'produce', name: 'Produce', icon: 'food-apple' },
    { id: 'dairy', name: 'Dairy', icon: 'cheese' },
    { id: 'meat', name: 'Meat', icon: 'food-drumstick' },
    { id: 'bakery', name: 'Bakery', icon: 'bread-slice' },
  ];

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, {
        id: Date.now().toString(),
        name: newItem,
        price: 0,
        quantity: 1,
        category: 'other'
      }]);
      setNewItem('');
    }
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Groceries Tracker</Text>
        <MaterialCommunityIcons name="cart" size={32} color="#4a90e2" />
      </View>

      {/* Budget Progress */}
      <View style={styles.budgetCard}>
        <Text style={styles.budgetText}>Monthly Budget: ${budget}</Text>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={['#4cd964', '#2ecc71']}
            style={[styles.progressFill, { width: `${(totalSpent/budget)*100}%` }]}
          />
        </View>
        <Text style={styles.spentText}>Spent: ${totalSpent.toFixed(2)} / Remaining: ${(budget - totalSpent).toFixed(2)}</Text>
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        data={categories}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryButton}>
            {/* <MaterialCommunityIcons name={item.icon} size={24} color="#4a90e2" /> */}
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      {/* Add Item Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add grocery item..."
          placeholderTextColor="#888"
          value={newItem}
          onChangeText={setNewItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Groceries List */}
      <FlatList
        data={items}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            {/* <MaterialCommunityIcons 
              name={categories.find(c => c.id === item.category)?.icon || 'cart'} 
              size={32} 
              color="#4a90e2" 
            /> */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.quantityControl}>
              <TouchableOpacity>
                <MaterialCommunityIcons name="minus" size={20} color="#ff6b6b" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity>
                <MaterialCommunityIcons name="plus" size={20} color="#4cd964" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
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
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  budgetCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  budgetText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  spentText: {
    color: '#888',
    fontSize: 14,
  },
  categoryList: {
    gap: 12,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  categoryText: {
    color: '#fff',
    marginTop: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 100,
  },
  itemCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    color: '#4cd964',
    fontSize: 14,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityText: {
    color: '#fff',
    fontSize: 16,
    minWidth: 24,
    textAlign: 'center',
  },
});