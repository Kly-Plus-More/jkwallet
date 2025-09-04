import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AIAssistantScreen() { // Change to AIAssistantScreen
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to JK Wallet AI! How can I assist you today?", isAI: true },
    { id: 2, text: "You can ask me about transactions, budgets, or financial advice", isAI: true }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { id: Date.now(), text: message, isAI: false }]);
      setMessage('');
      // Add AI response logic here
    }
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Financial Assistant</Text>
        <MaterialCommunityIcons name="robot" size={32} color="#4a90e2" />
      </View>

      {/* Chat Container */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {/* AI Introduction */}
        <View style={styles.aiIntro}>
          <MaterialCommunityIcons name="brain" size={48} color="#4a90e2" />
          <Text style={styles.introText}>How can I help you today?</Text>
          <Text style={styles.introSubtext}>Try asking about your spending patterns or investment opportunities</Text>
        </View>

        {/* Messages */}
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble,
              msg.isAI ? styles.aiBubble : styles.userBubble
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {['Show my budget', 'Analyze spending', 'Investment tips'].map((action) => (
          <TouchableOpacity 
            key={action} 
            style={styles.actionButton}
            onPress={() => setMessage(action)}
          >
            <Text style={styles.actionText}>{action}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <MaterialCommunityIcons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  aiIntro: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 30,
  },
  introText: {
    fontSize: 20,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '600',
  },
  introSubtext: {
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 16,
    marginVertical: 8,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4a90e2',
    borderBottomRightRadius: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 20,
    borderRadius: 16,
  },
  actionButton: {
    backgroundColor: 'rgba(74,144,226,0.2)',
    padding: 10,
    borderRadius: 12,
  },
  actionText: {
    color: '#4a90e2',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 20,
    borderRadius: 30,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 50,
  },
});