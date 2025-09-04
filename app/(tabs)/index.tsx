import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Dashboard() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Add to existing data
  const walletMetrics = [
    { id: '1', title: 'Total Assets', value: '$12,450', change: '+2.4%', icon: 'wallet' },
    { id: '2', title: 'Investment', value: '$4,230', change: '+1.2%', icon: 'chart-line' },
    { id: '3', title: 'Crypto', value: '0.54 BTC', change: '-0.8%', icon: 'bitcoin' },
  ];

  return (
    <LinearGradient colors={darkMode ? ['#0f0f0f', '#1a1a1a'] : ['#f5f7fa', '#c3cfe2']} style={styles.container}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="wallet" size={32} color="#4a90e2" />
          <Text style={[styles.title, darkMode && styles.darkText]}>JK Wallet</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.themeToggle} onPress={() => setDarkMode(!darkMode)}>
            <MaterialCommunityIcons 
              name={darkMode ? 'weather-night' : 'white-balance-sunny'} 
              size={24} 
              color={darkMode ? '#fff' : '#4a90e2'} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.aiButton} onPress={() => router.push('/ai')}>
            <MaterialCommunityIcons name="robot" size={24} color={darkMode ? '#fff' : '#4a90e2'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Wallet Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsContainer}>
        {walletMetrics.map((metric) => (
          <LinearGradient
            key={metric.id}
            colors={darkMode ? ['#2a2a2a', '#1a1a1a'] : ['#fff', '#f8f9fa']}
            style={[styles.metricCard, darkMode && styles.darkCard]}
          >
            {/* <MaterialCommunityIcons 
              name={metric.icon} 
              size={24} 
              color={metric.change.startsWith('+') ? '#4cd964' : '#F44336'} 
            /> */}
            <Text style={[styles.metricTitle, darkMode && styles.darkText]}>{metric.title}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={[
              styles.metricChange ,
              // metric.change.startsWith('+') ? styles.positive : styles.negative
            ]}>
              {metric.change}
            </Text>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Enhanced Balance Card */}
      <LinearGradient colors={['#4a90e2', '#2a5298']} style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <TouchableOpacity onPress={() => router.push}>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceAmount}>$5,280.50</Text>
        
        {/* Add Financial Health Indicator */}
        <View style={styles.healthIndicator}>
          <Text style={styles.healthText}>Financial Health: Excellent</Text>
          <MaterialCommunityIcons name="heart-pulse" size={20} color="#4cd964" />
        </View>
      </LinearGradient>

      {/* Interactive Tabs */}
      <View style={[styles.tabContainer, darkMode && styles.darkTabContainer]}>
        {['overview', 'analytics', 'markets'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, darkMode && styles.darkText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Enhanced Calendar */}
      <Calendar
        style={[styles.calendar, darkMode && styles.darkCalendar]}
        theme={{
          ...(darkMode ? {
            backgroundColor: '#1a1a1a',
            calendarBackground: '#1a1a1a',
            textSectionTitleColor: '#888',
            selectedDayBackgroundColor: '#4a90e2',
            selectedDayTextColor: '#fff',
            todayTextColor: '#4cd964',
            dayTextColor: '#fff',
          } : {})
        }}
      />

      {/* Rest of the components with dark mode styles ... */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  languageButton: {
    marginLeft: 12,
    backgroundColor: '#4a90e210',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
// from here and up
  aiButton: {
    backgroundColor: '#4a90e210',
    padding: 8,
    borderRadius: 20,
  },

  balanceCard: {
    backgroundColor: '#4a90e2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
 

  calendar: {
    borderRadius: 12,
    marginTop: 8,
  },

  // Add new styles
  darkText: {
    color: '#fff',
  },
  darkCard: {
    backgroundColor: '#2a2a2a',
    shadowColor: '#000',
  },
  metricsContainer: {
    marginBottom: 16,
  },
  metricCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  metricChange: {
    fontSize: 12,
    marginTop: 4,
  },
  healthIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  healthText: {
    color: '#fff',
    marginRight: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
  },
  darkTabContainer: {
    backgroundColor: '#2a2a2a',
  },
  tabButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4a90e2',
  },
  darkCalendar: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
  },
  themeToggle: {},
balanceHeader: {},
viewDetails: {},
tabText: {},
});