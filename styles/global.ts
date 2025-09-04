import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  elevatedCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonPrimary: {
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#4a90e2',
  },
  // ... autres styles globaux
});