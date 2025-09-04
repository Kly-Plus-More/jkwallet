import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>About JK Wallet</Text>
        </View>

        {/* App Info Card */}
        <View style={styles.card}>
          <MaterialCommunityIcons name="information" size={32} color="#4a90e2" />
          <Text style={styles.cardTitle}>App Information</Text>
          <Text style={styles.cardText}>
            JK Wallet is a modern financial management solution combining banking, 
            digital payments, and crypto management in one secure platform.
          </Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Development Team */}
        <View style={styles.card}>
          <MaterialCommunityIcons name="account" size={32} color="#4a90e2" />
          <Text style={styles.cardTitle}>Development Team</Text>
          <View style={styles.teamContainer}>
            <View style={styles.teamMember}>
              <MaterialCommunityIcons name="code-tags" size={24} color="#fff" />
              <Text style={styles.memberName}>John Doe</Text>
              <Text style={styles.memberRole}>Lead Developer</Text>
            </View>
            <View style={styles.teamMember}>
              <MaterialCommunityIcons name="palette" size={24} color="#fff" />
              <Text style={styles.memberName}>Jane Smith</Text>
              <Text style={styles.memberRole}>UI/UX Designer</Text>
            </View>
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.card}>
          <MaterialCommunityIcons name="headset" size={32} color="#4a90e2" />
          <Text style={styles.cardTitle}>Contact Support</Text>
          <TouchableOpacity style={styles.contactItem}>
            <MaterialCommunityIcons name="email" size={20} color="#fff" />
            <Text style={styles.contactText}>support@jkwallet.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <MaterialCommunityIcons name="phone" size={20} color="#fff" />
            <Text style={styles.contactText}>+1 (800) 555-0199</Text>
          </TouchableOpacity>
        </View>

        {/* Social Links */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="twitter" size={24} color="#4a90e2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="linkedin" size={24} color="#4a90e2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="github" size={24} color="#4a90e2" />
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 15,
  },
  cardText: {
    color: '#ddd',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
  },
  versionBadge: {
    backgroundColor: '#4a90e2',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  versionText: {
    color: '#fff',
    fontWeight: '500',
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  teamMember: {
    alignItems: 'center',
    width: '48%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  memberName: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 8,
  },
  memberRole: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 12,
    marginVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  contactText: {
    color: '#fff',
    marginLeft: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  socialButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});