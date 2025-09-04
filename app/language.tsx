import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  
  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'sn', name: 'Shona', flag: '🇿🇼' },
  ];

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Language</Text>
        <MaterialCommunityIcons name="earth" size={32} color="#4a90e2" />
      </View>

      {/* Language List */}
      <FlatList
        data={languages}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.languageItem,
              selectedLanguage === item.code && styles.selectedItem
            ]}
            onPress={() => setSelectedLanguage(item.code)}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.languageName}>{item.name}</Text>
            {selectedLanguage === item.code && (
              <MaterialCommunityIcons 
                name="check-circle" 
                size={24} 
                color="#4cd964" 
              />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.code}
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
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedItem: {
    backgroundColor: 'rgba(74,144,226,0.2)',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  flag: {
    fontSize: 28,
    marginRight: 15,
  },
  languageName: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});