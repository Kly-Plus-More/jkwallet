import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Categories() {
  const categories = [
    { id: '1', name: 'Housing', icon: 'home', budget: 800, spent: 750 },
    { id: '2', name: 'Food', icon: 'cutlery', budget: 400, spent: 320 },
    { id: '3', name: 'Transport', icon: 'car', budget: 200, spent: 180 },
    { id: '4', name: 'Utilities', icon: 'bolt', budget: 150, spent: 140 },
    { id: '5', name: 'Entertainment', icon: 'gamepad', budget: 100, spent: 85 },
    { id: '6', name: 'Health', icon: 'medkit', budget: 120, spent: 95 },
  ];

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              {/* <FontAwesome name={item.icon} size={24} color="#4cd964" /> */}
              <Text style={styles.categoryName}>{item.name}</Text>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${getProgressPercentage(item.spent, item.budget)}%`,
                    backgroundColor: item.spent > item.budget ? '#F44336' : '#4cd964'
                  }
                ]}
              />
            </View>

            <View style={styles.budgetInfo}>
              <Text style={styles.budgetText}>${item.spent}</Text>
              <Text style={styles.budgetText}>${item.budget}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  budgetText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});