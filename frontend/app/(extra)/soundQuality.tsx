import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SoundQuality() {
  const router = useRouter();

  // States for selecting options
  const [selectedNetworkQuality, setSelectedNetworkQuality] = useState('Normalna'); // Default: "Normalna"
  const [selectedDownloadQuality, setSelectedDownloadQuality] = useState('Normalna'); // Default: "Normalna"
  const [isAutomaticSoundQualityEnabled, setIsAutomaticSoundQualityEnabled] = useState(false);
  const [isDownloadOnCellularEnabled, setIsDownloadOnCellularEnabled] = useState(false);

  const handleBackPress = () => {
    router.push('/(tabs)/profile'); // Navigate to profile.tsx
  };

  const handleNetworkQualitySelect = (quality) => {
    setSelectedNetworkQuality(quality);
  };

  const handleDownloadQualitySelect = (quality) => {
    setSelectedDownloadQuality(quality);
  };

  const handleAutomaticSoundQualityToggle = () => {
    setIsAutomaticSoundQualityEnabled((prev) => !prev);
  };

  const handleDownloadOnCellularToggle = () => {
    setIsDownloadOnCellularEnabled((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      

        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Jakość dźwięku</Text>
        </View>

        <ScrollView contentContainerStyle={styles.container}>

        {/* Back Button
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity> */}

        {/* Title
        <Text style={styles.title}>Jakość dźwięku</Text> */}

        {/* Network Quality Section */}
        <Text style={styles.sectionTitle}>Przesył danych przez sieć komórkową</Text>
        {['Automatyczna', 'Niska', 'Normalna', 'Wysoka', 'Bardzo Wysoka'].map((quality) => (
          <TouchableOpacity
            key={quality}
            style={[styles.optionContainer, selectedNetworkQuality === quality && styles.selectedOption]}
            onPress={() => handleNetworkQualitySelect(quality)}
          >
            <Text style={styles.optionText}>{quality}</Text>
            {selectedNetworkQuality === quality && <Ionicons name="checkmark" size={24} color="green" />}
          </TouchableOpacity>
        ))}

        {/* Sound Quality Optimization Section */}
        <Text style={styles.sectionTitle}>Optymalizacja dźwięku</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Automatyczna jakość dźwięku</Text>
          <Switch
            value={isAutomaticSoundQualityEnabled}
            onValueChange={handleAutomaticSoundQualityToggle}
          />
        </View>

        {/* Lorem Ipsum Text */}
        <Text style={styles.loremText}>
          Dostosujemy jakość dźwięku do wolniejszej prędkości Twojego łącza internetowego. Wyłączenie funkcji może spowodować zakłócenia w słuchaniu.
        </Text>

        {/* Download Section */}
        <Text style={styles.sectionTitle}>Pobierz</Text>
        {['Niska', 'Normalna', 'Wysoka', 'Bardzo Wysoka'].map((quality) => (
          <TouchableOpacity
            key={quality}
            style={[styles.optionContainer, selectedDownloadQuality === quality && styles.selectedOption]}
            onPress={() => handleDownloadQualitySelect(quality)}
          >
            <Text style={styles.optionText}>{quality}</Text>
            {selectedDownloadQuality === quality && <Ionicons name="checkmark" size={24} color="green" />}
          </TouchableOpacity>
        ))}

        {/* Cellular Download Section */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Pobierz, korzystając z sieci komórkowej</Text>
          <Switch
            value={isDownloadOnCellularEnabled}
            onValueChange={handleDownloadOnCellularToggle}
          />
        </View>

        {/* Lorem Ipsum Text */}
        <Text style={styles.loremText}>
          Nie wyłączaj aplikacji Tune i upewnij się, czy ekran urządzenia jest odblokowany. Pobieranie zostanie wstrzymane, jeśli urządzenie będzie bezczynne przez ponad dwie minuty.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#100A1C', // Background color
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#100A1C',
    padding: 16,
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
    padding: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    padding: 10,
    // backgroundColor: '#2E1F3D',
    borderRadius: 8,
  },
  selectedOption: {
    // backgroundColor: '#3C2A55', // Darker background for selected option
  },
  optionText: {
    color: '#ccc',
    fontSize: 16,
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  toggleLabel: {
    color: '#ccc',
    fontSize: 16,
    flex: 1,
  },
  loremText: {
    color: '#666666',
    fontSize: 14,
    marginVertical: 20,
    textAlign: 'justify',
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
