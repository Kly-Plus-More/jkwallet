import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Analytics() {
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [3000, 3200, 2800, 3500, 4000, 3800],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Income color
        strokeWidth: 2
      },
      {
        data: [2200, 2400, 2000, 2500, 2800, 2600],
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Expense color
        strokeWidth: 2
      }
    ]
  };

  const categoryData = {
    labels: ['Housing', 'Food', 'Transport', 'Utilities'],
    datasets: [{
      data: [800, 400, 200, 150],
      colors: [
        (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
        (opacity = 1) => `rgba(255, 206, 86, ${opacity})`,
        (opacity = 1) => `rgba(75, 192, 192, ${opacity})`
      ]
    }]
  };

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.incomeBg]}>
            <FontAwesome name="arrow-up" size={20} color="#4CAF50" />
            <Text style={styles.statValue}>$3,200</Text>
            <Text style={styles.statLabel}>Income</Text>
          </View>
          <View style={[styles.statCard, styles.expenseBg]}>
            <FontAwesome name="arrow-down" size={20} color="#F44336" />
            <Text style={styles.statValue}>$1,920</Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
        </View>

        {/* Monthly Trends */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Monthly Trends</Text>
          <LineChart
            data={monthlyData}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Spending by Category */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Spending by Category</Text>
          <BarChart
            data={categoryData}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
            showBarTops={false}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  incomeBg: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  expenseBg: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    borderRadius: 8,
  },
});