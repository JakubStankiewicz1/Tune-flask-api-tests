import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PrivacyAndSocialFunctions() {
  const router = useRouter();

  // States for controlling privacy and social functions
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(false);
  const [isPlaybackActivityEnabled, setIsPlaybackActivityEnabled] = useState(false);
  const [isRecentlyPlayedEnabled, setIsRecentlyPlayedEnabled] = useState(false);
  const [isFollowersVisible, setIsFollowersVisible] = useState(false); // New state for Followers visibility

  const handleBackPress = () => {
    router.push('/(tabs)/profile'); // Navigation to profile.tsx
  };

  const handlePrivacyToggle = () => {
    setIsPrivacyEnabled(prevState => !prevState); // Toggle privacy of playback
  };

  const handlePlaybackActivityToggle = () => {
    setIsPlaybackActivityEnabled(prevState => !prevState); // Toggle playback activity visibility
  };

  const handleRecentlyPlayedToggle = () => {
    setIsRecentlyPlayedEnabled(prevState => !prevState); // Toggle recently played artists visibility
  };

  const handleFollowersVisibilityToggle = () => {
    setIsFollowersVisible(prevState => !prevState); // Toggle followers visibility
  };

  const handleBlockedUsersPress = () => {
    Linking.openURL('https://www.google.com'); // Open Google link
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.container}>


        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
            <Text style={styles.title}>Prywatność i funkcje społecznościowe</Text>
          </View>


        {/* ScrollView for content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Playback Activity Section */}
          <Text style={styles.sectionTitle}>Aktywność odtwarzania</Text>

          {/* Element 1: Sejsa prywatna */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              Tymczasowo ukrywa twoją aktywność odtwarzania przed obserwującymi
            </Text>
            <Switch
              style={styles.toggleSwitch}
              value={isPrivacyEnabled}
              onValueChange={handlePrivacyToggle}
            />
          </View>

          {/* Element 2: Aktywność odtwarzania */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              Twoi obserwujący mogą zobaczyć czego słuchasz
            </Text>
            <Switch
              style={styles.toggleSwitch}
              value={isPlaybackActivityEnabled}
              onValueChange={handlePlaybackActivityToggle}
            />
          </View>

          {/* Element 3: Ostatnio słuchani wykonawcy */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              Ostatnio słuchani wykonawcy są widoczni na Twoim profilu
            </Text>
            <Switch
              style={styles.toggleSwitch}
              value={isRecentlyPlayedEnabled}
              onValueChange={handleRecentlyPlayedToggle}
            />
          </View>

          {/* Horizontal Line */}
          <View style={styles.hrLine} />

          {/* New Section: Widoczność profilu */}
          <Text style={styles.sectionTitle}>Widoczność profilu</Text>

          {/* Element: Obserujący i obserwowani */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              Obserwujący i obserwowanie są widoczni na Twoim profilu
            </Text>
            <Switch
              style={styles.toggleSwitch}
              value={isFollowersVisible}
              onValueChange={handleFollowersVisibilityToggle}
            />
          </View>

          <View style={styles.hrLine} />

          {/* Element: Zablokowanie użytkowników */}
          <TouchableOpacity style={styles.blockedUsersContainer} onPress={handleBlockedUsersPress}>
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>
                Zarządzaj listą zablokowanych użytkowników, których nie mogą wyświetlić Twojego profilu
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </View>
          </TouchableOpacity>

          <View style={styles.hrLine} />

          {/* Horizontal Line */}
          <View style={styles.hrLine} />
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#100A1C',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#100A1C',
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
  contentContainer: {
    flexGrow: 1,
    alignItems: 'flex-start',
    width: '100%',
    padding: 5,
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
    marginRight: 10,
    flex: 1,
  },
  toggleSwitch: {
    marginTop: 10,
  },
  hrLine: {
    width: '100%',
    height: 4,
    backgroundColor: '#000',
    marginVertical: 20,
  },
  blockedUsersContainer: {
    // backgroundColor: '#2E1F3D',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
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
