import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Linking, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// Załaduj dane z pliku JSON
import userData from '../../Data/userData.json'; // Zmodyfikuj ścieżkę jeśli plik znajduje się w innym miejscu

export default function Account() {
  const router = useRouter();

  // Stan do przechowywania danych użytkownika
  const [user, setUser] = useState(null);

  // Ładowanie danych użytkownika
  useEffect(() => {
    setUser(userData); // Przypisanie danych z pliku JSON do stanu
  }, []);

  const handleBackPress = () => {
    router.push('/(tabs)/profile'); // Nawigacja do profile.tsx
  };

  const openPremiumLink = () => {
    Linking.openURL('https://www.google.com'); // Link do google.com
  };

  if (!user) {
    return null; // Wstrzymaj renderowanie, jeśli dane użytkownika nie zostały jeszcze załadowane
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Konto</Text>
      </View>

      {/* Scroll View to allow scrolling when content overflows */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.label}>Nazwa użytkownika:</Text>
          <Text style={styles.info}>{user.username}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Subskrypcja:</Text>
          <Text style={styles.info}>{user.subscription}</Text>
        </View>

        {/* Premium Link */}
        <TouchableOpacity style={styles.premiumButton} onPress={openPremiumLink}>
          <Text style={styles.premiumText}>Premium</Text>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#100A1C',
  },
  container: {
    flexGrow: 1, // Ensures the content takes the full height, allowing scroll
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#100A1C',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    // backgroundColor: '#2E1F3D',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 30, // Dodane zwiększenie odstępu między liniami
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 8,
  },
  label: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24, // Zwiększenie odstępu między liniami w etykiecie
  },
  info: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24, // Zwiększenie odstępu między liniami w informacji
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  premiumText: {
    color: 'white',
    fontSize: 16,
  },
});
