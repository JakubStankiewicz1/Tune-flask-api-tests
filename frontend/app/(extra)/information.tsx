import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Information() {
  const router = useRouter();

  const handleBackPress = () => {
    router.push('/(tabs)/profile'); // Nawigacja do profile.tsx
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Informacje</Text>
      </View>

      {/* Content Area with ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Version Info */}
        <View style={styles.versionRow}>
          <Text style={styles.versionLabel}>Wersja</Text>
          <Text style={styles.versionValue}>v1.0</Text>
        </View>

        {/* Links */}
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.google.com')}>
          <View style={styles.linkContent}>
            <Text style={styles.linkText}>Warunki użytkownika</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.google.com')}>
          <View style={styles.linkContent}>
            <Text style={styles.linkText}>Polityka treści</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.google.com')}>
          <View style={styles.linkContent}>
            <Text style={styles.linkText}>Pomoc</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.google.com')}>
          <View style={styles.linkContent}>
            <Text style={styles.linkText}>Polityka prywatności</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.google.com')}>
          <View style={styles.linkContent}>
            <Text style={styles.linkText}>Licencje na oprogramowanie stron trzecich</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
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
  scrollContainer: {
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
    backgroundColor: '#100A1C',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  versionLabel: {
    color: '#ccc',
    fontSize: 18,
  },
  versionValue: {
    color: '#ccc',
    fontSize: 18,
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    // backgroundColor: '#2E1F3D', // Możesz zmienić kolor tła, jeśli chcesz
    borderRadius: 8,
    flexDirection: 'row', // Zapewnia, że tekst i strzałka są obok siebie
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  linkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    flexWrap: 'wrap', // Dodano zawijanie tekstu
    maxWidth: '90%',  // Ustalamy, żeby tekst nie wychodził poza kontener
  },
});
