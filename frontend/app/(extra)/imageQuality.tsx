import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ImageQuality() {
  const router = useRouter();

  // States for controlling image quality options
  const [selectedWifiQuality, setSelectedWifiQuality] = useState('Średnia'); // Default: "Średnia"
  const [selectedCellularQuality, setSelectedCellularQuality] = useState('Średnia'); // Default: "Średnia"
  const [isAutomaticImageQualityEnabled, setIsAutomaticImageQualityEnabled] = useState(false);
  const [isImageDownloadOnCellularEnabled, setIsImageDownloadOnCellularEnabled] = useState(false);

  const handleBackPress = () => {
    router.push('/(tabs)/profile'); // Navigate to profile.tsx
  };

  const handleWifiQualitySelect = (quality) => {
    setSelectedWifiQuality(quality);
  };

  const handleCellularQualitySelect = (quality) => {
    setSelectedCellularQuality(quality);
  };

  const handleAutomaticImageQualityToggle = () => {
    setIsAutomaticImageQualityEnabled((prev) => !prev);
  };

  const handleImageDownloadOnCellularToggle = () => {
    setIsImageDownloadOnCellularEnabled((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Jakość obrazu</Text>
      </View>

      {/* ScrollView for content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Image Quality Wi-Fi Section */}
        <Text style={styles.sectionTitle}>Odtwarzanie przesył danych przez Wi-Fi</Text>
        {['Niska', 'Średnia', 'Wysoka', 'Bardzo wysoka'].map((quality) => (
          <TouchableOpacity
            key={quality}
            style={[styles.optionContainer, selectedWifiQuality === quality && styles.selectedOption]}
            onPress={() => handleWifiQualitySelect(quality)}
          >
            <Text style={styles.optionText}>{quality}</Text>
            {selectedWifiQuality === quality && <Ionicons name="checkmark" size={24} color="green" />}
          </TouchableOpacity>
        ))}

        {/* Image Quality Cellular Section */}
        <Text style={styles.sectionTitle}>Przesył danych przez sieć komórkową</Text>
        {['Niska', 'Średnia', 'Wysoka', 'Bardzo wysoka'].map((quality) => (
          <TouchableOpacity
            key={quality}
            style={[styles.optionContainer, selectedCellularQuality === quality && styles.selectedOption]}
            onPress={() => handleCellularQualitySelect(quality)}
          >
            <Text style={styles.optionText}>{quality}</Text>
            {selectedCellularQuality === quality && <Ionicons name="checkmark" size={24} color="green" />}
          </TouchableOpacity>
        ))}

        {/* Lorem Ipsum Text */}
        <Text style={styles.loremText}>
          Odtwarzanie filmu w wysokiej jakości zwiększa zużycie danych komórkowych. W zależności od rodzaju abonamentu warto rozważyć obnieżenie ustawień.
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
    flexGrow: 1, // Allow ScrollView to expand
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#100A1C',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    lineHeight: 30,
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
  // selectedOption: {
  //   backgroundColor: '#3C2A55', // Darker background for selected option
  // },
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
    color: '#ccc',
    fontSize: 14,
    marginVertical: 20,
    textAlign: 'justify',
  },
});
