import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DataSaving() {
  const router = useRouter();

  // States for controlling data saving
  const [isDataSavingEnabled, setIsDataSavingEnabled] = useState(false);
  const [isAudioDownloadOnly, setIsAudioDownloadOnly] = useState(false);
  const [isAudioPlaybackEnabled, setIsAudioPlaybackEnabled] = useState(false);

  const handleBackPress = () => {
    router.push('/(tabs)/profile'); // Navigation to profile.tsx
  };

  const handleDataSavingToggle = () => {
    setIsDataSavingEnabled(prevState => !prevState); // Toggle data saving state
  };

  const handleAudioDownloadToggle = () => {
    setIsAudioDownloadOnly(prevState => !prevState); // Toggle audio download only
  };

  const handleAudioPlaybackToggle = () => {
    setIsAudioPlaybackEnabled(prevState => !prevState); // Toggle audio playback
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Oszczędzanie danych</Text>
      </View>

      {/* ScrollView for content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Data Saving Title */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Oszczędzanie danych</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              Obniż jakość dźwięku, ukryj wizualizacje i fragmenty utworów oraz filmów na stronie home
            </Text>
            <Switch
              style={styles.toggleSwitch}
              value={isDataSavingEnabled}
              onValueChange={handleDataSavingToggle}
            />
          </View>
        </View>

        {/* New Section: Podscasty wideo */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Podscasty wideo</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              Pobieraj tylko pliki audio. Zapisuje tylko pliki audio przy pobieraniu podcastew wideo
            </Text>
            <Switch
              style={styles.toggleSwitch}
              value={isAudioDownloadOnly}
              onValueChange={handleAudioDownloadToggle}
            />
          </View>
        </View>

        {/* New Section: Odtwarzaj sam dźwięk */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Odtwarzaj sam dźwięk</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              Odtwarzaj sam dźwięk podcastew wideo, gdy nie ma połączenia z siecią Wi-Fi
            </Text>
            <Switch
              style={styles.toggleSwitch}
              value={isAudioPlaybackEnabled}
              onValueChange={handleAudioPlaybackToggle}
            />
          </View>
        </View>
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
    flexGrow: 1, // Allow the ScrollView to expand and handle overflow
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#100A1C',
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
    lineHeight: 30,
  },
  sectionContainer: {
    width: '100%',
    marginVertical: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',  // Align title to the left
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: 'row', // Align text and switch horizontally
    justifyContent: 'space-between', // Spread out the items
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  toggleLabel: {
    color: '#ccc',
    fontSize: 16,
    marginRight: 10, // Space between label and switch
    flex: 1, // Allow the label to take up available space
  },
  toggleSwitch: {
    marginTop: 10,
  },
});
