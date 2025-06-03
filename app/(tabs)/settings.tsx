import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
  const settingsItems = [
    { icon: 'user', title: 'Account Settings', section: 'account' },
    { icon: 'bell', title: 'Notifications', section: 'notifications' },
    { icon: 'lock', title: 'Security', section: 'security' },
    { icon: 'money', title: 'Currency', section: 'currency' },
    { icon: 'moon-o', title: 'Dark Mode', section: 'theme' },
    { icon: 'life-ring', title: 'Support', section: 'support' },
    { icon: 'info-circle', title: 'About', section: 'about' },
  ];

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCard}>
          {settingsItems.map((item, index) => (
            <View key={item.section}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.itemLeft}>
                  {/* <FontAwesome name={item.icon} size={20} color="#4a90e2" /> */}
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
                <FontAwesome name="chevron-right" size={16} color="#666" />
              </TouchableOpacity>
              {index < settingsItems.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>JK Wallet v1.0.0</Text>
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
  sectionCard: {
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  versionText: {
    color: '#666',
    fontSize: 14,
  },
});