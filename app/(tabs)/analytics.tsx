import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

export default function Analytics() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('monthly');
  const [activeTab, setActiveTab] = useState('trends');

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [3000, 3200, 2800, 3500, 4000, 3800],
        color: (opacity = 1) => `rgba(76, 217, 100, ${opacity})`,
        strokeWidth: 3
      },
      {
        data: [2200, 2400, 2000, 2500, 2800, 2600],
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
        strokeWidth: 3
      }
    ]
  };

  const categoryData = {
    labels: ['Housing', 'Food', 'Transport', 'Utilities'],
    datasets: [{
      data: [800, 400, 200, 150],
      colors: [
        (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
        (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
        (opacity = 1) => `rgba(233, 30, 99, ${opacity})`,
        (opacity = 1) => `rgba(76, 217, 100, ${opacity})`
      ]
    }]
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          {['weekly', 'monthly', 'yearly'].map((range) => (
            <TouchableOpacity
              key={range}
              style={[styles.timeRangeButton, timeRange === range && styles.activeTimeRange]}
              onPress={() => setTimeRange(range)}
            >
              <Text style={styles.timeRangeText}>{range.charAt(0).toUpperCase() + range.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.incomeBg]}>
            <MaterialCommunityIcons name="trending-up" size={24} color="#4cd964" />
            <Text style={styles.statValue}>$3,200</Text>
            <Text style={styles.statLabel}>Income</Text>
          </View>
          <View style={[styles.statCard, styles.expenseBg]}>
            <MaterialCommunityIcons name="trending-down" size={24} color="#F44336" />
            <Text style={styles.statValue}>$1,920</Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
        </View>

        {/* Analytics Tabs */}
        <View style={styles.tabContainer}>
          {['trends', 'categories', 'insights'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={styles.tabText}>
                {tab === 'trends' ? 'Trends' : 
                 tab === 'categories' ? 'Categories' : 'Insights'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Charts */}
        {activeTab === 'trends' && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Financial Trends</Text>
            <LineChart
              data={monthlyData}
              width={350}
              height={220}
              chartConfig={{
                backgroundColor: '#1e3c72',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </View>
        )}

        {activeTab === 'categories' && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Spending Breakdown</Text>
            <BarChart
              data={categoryData}
              width={350}
              height={220}
              chartConfig={{
                backgroundColor: '#1e3c72',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={styles.chart}
              showBarTops={false} yAxisLabel={''} yAxisSuffix={''}            />
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push}
        >
          <Text style={styles.actionButtonText}>Generate Full Report</Text>
          <MaterialCommunityIcons name="file-chart" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 8,
  },
  timeRangeButton: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  activeTimeRange: {
    backgroundColor: '#4a90e2',
  },
  timeRangeText: {
    color: '#fff',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  incomeBg: {
    borderLeftWidth: 4,
    borderLeftColor: '#4cd964',
  },
  expenseBg: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4a90e2',
  },
  tabText: {
    color: '#fff',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#fff',
  },
  chart: {
    borderRadius: 12,
  },
  actionButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});