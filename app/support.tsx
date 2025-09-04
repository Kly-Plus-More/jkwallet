import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SupportScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const contactMethods = [
    { 
      icon: 'chat', 
      title: 'Live Chat', 
      description: 'Instant support 24/7',
      color: '#4cd964'
    },
    { 
      icon: 'email', 
      title: 'Email Support', 
      description: 'support@jkwallet.com',
      color: '#4a90e2'
    },
    { 
      icon: 'phone', 
      title: 'Call Us', 
      description: '+1 (800) 555-0199',
      color: '#ff6b6b'
    },
  ];

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Support Center</Text>
          <MaterialCommunityIcons name="headset" size={32} color="#4a90e2" />
        </View>

        {/* Contact Methods */}
        <View style={styles.contactGrid}>
          {contactMethods.map((method, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.contactCard, { backgroundColor: method.color + '20' }]}
            >
              {/* <MaterialCommunityIcons 
                name={method.icon} 
                size={32} 
                color={method.color} 
              /> */}
              <Text style={styles.contactTitle}>{method.title}</Text>
              <Text style={styles.contactSubtitle}>{method.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Common Questions</Text>
        <View style={styles.faqContainer}>
          {[
            'How to reset password?',
            'Transaction verification process',
            'Mobile money deposit fees'
          ].map((question, index) => (
            <TouchableOpacity key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{question}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#4a90e2" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Form */}
        <Text style={styles.sectionTitle}>Send Message</Text>
        <TextInput
          style={styles.messageInput}
          placeholder="Describe your issue..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />
        
        <TouchableOpacity style={styles.submitButton}>
          <LinearGradient colors={['#4cd964', '#2ecc71']} style={styles.gradient}>
            <Text style={styles.buttonText}>Send Message</Text>
            <MaterialCommunityIcons name="send" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Social Links */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="twitter" size={24} color="#4a90e2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="facebook" size={24} color="#4a90e2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="linkedin" size={24} color="#4a90e2" />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  contactCard: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  contactTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  contactSubtitle: {
    color: '#ddd',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  faqContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  faqQuestion: {
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  messageInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    color: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 25,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
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
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 15,
  },
  socialButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});