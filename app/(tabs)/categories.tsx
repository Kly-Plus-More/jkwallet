import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function Categories() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = ('M');
  const [categories, setCategories] = ([
    { id: '1', name: 'Housing', icon: 'home', budget: 800, spent: 750, period: 'M' },
    { id: '2', name: 'Food', icon: 'food', budget: 400, spent: 420, period: 'W' },
    { id: '3', name: 'Transport', icon: 'car', budget: 200, spent: 180, period: 'M' },
    { id: '4', name: 'Utilities', icon: 'lightbulb', budget: 150, spent: 140, period: 'M' },
    { id: '5', name: 'Entertainment', icon: 'gamepad', budget: 100, spent: 85, period: 'M' },
    { id: '6', name: 'Health', icon: 'medkit', budget: 120, spent: 95, period: 'M' },
  ]);

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const periodOptions = [
    { id: 'H', name: 'Hourly', icon: 'clock' },
    { id: 'D', name: 'Daily', icon: 'calendar-day' },
    { id: 'W', name: 'Weekly', icon: 'calendar-week' },
    { id: 'M', name: 'Monthly', icon: 'calendar-month' },
    { id: 'Y', name: 'Yearly', icon: 'calendar' },
  ];

  const handleAddCategory = () => {
    // Add your category creation logic here
    router.push('/newcategory');
  };

  // Add swipe to delete functionality
  const renderRightActions = (progress: any, dragX: any, id: string) => {
    return (
      <TouchableOpacity 
        style={styles.deleteContainer}
        onPress={() => {
          Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this category?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Delete" }
            ]
          );
        }}
      >
        <MaterialCommunityIcons name="trash-can" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Budget Categories</Text>
          <TouchableOpacity style={styles.languageButton}>
            <MaterialCommunityIcons name="earth" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.aiButton}>
          <MaterialCommunityIcons name="robot-happy" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Period Selector with Animation */}
      <View style={styles.periodContainer}>
        {periodOptions.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodButton,
              selectedPeriod === period.id && styles.periodButtonActive
            ]}
            onPress={() => setSelectedPeriod(period.id)}
          >
            {/* <MaterialCommunityIcons 
              name={period.icon} 
              size={20} 
              color={selectedPeriod === period.id ? '#fff' : '#4cd964'} 
            /> */}
            <Text style={[
              styles.periodText,
              selectedPeriod === period.id && styles.periodTextActive
            ]}>
              {period.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Enhanced Add Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddCategory}
      >
        <LinearGradient
          colors={['#4cd964', '#2ecc71']}
          style={styles.gradient}
        >
          <MaterialCommunityIcons name="plus-circle" size={24} color="#fff" />
          <Text style={styles.addButtonText}>New Category</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Swipeable Categories List */}
      <FlatList
        data={categories || []}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
          >
            <View style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <LinearGradient
                  colors={['#4a90e2', '#2a5298']}
                  style={styles.categoryIcon}
                >
                  <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Text style={styles.categoryPeriod}>
                    {item.period === 'H' ? 'Hourly' : 
                     item.period === 'D' ? 'Daily' :
                     item.period === 'W' ? 'Weekly' :
                     item.period === 'M' ? 'Monthly' : 'Yearly'}
                  </Text>
                </View>
              </View>
              
              {/* Progress Bar with Animation */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={item.spent > item.budget ? ['#ff6b6b', '#ff5252'] : ['#4cd964', '#2ecc71']}
                    style={[
                      styles.progressFill,
                      { width: `${getProgressPercentage(item.spent, item.budget)}%` }
                    ]}
                  />
                </View>
                <Text style={styles.percentageText}>
                  {Math.round(getProgressPercentage(item.spent, item.budget))}%
                </Text>
              </View>

              <View style={styles.budgetInfo}>
                <Text style={styles.spentText}>${item.spent}</Text>
                <Text style={styles.budgetText}>/ ${item.budget}</Text>
              </View>
            </View>
          </Swipeable>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  languageButton: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  aiButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 20,
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 8,
  },
  periodButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  periodButtonActive: {
    backgroundColor: '#4cd964',
  },
  periodText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#4cd964',
    fontWeight: '600',
  },
  periodTextActive: {
    color: '#fff',
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    minWidth: '45%',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteContainer: {
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    margin: 8,
    borderRadius: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    padding: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoryPeriod: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  spentText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  budgetText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  headerLeft: {},
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 8,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});