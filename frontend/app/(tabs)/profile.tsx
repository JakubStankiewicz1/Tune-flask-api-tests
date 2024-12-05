import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import userData from '../../Data/userData.json'; // Import danych z pliku JSON

export default function Profile() {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push('/(auth)/login');
  };

  const handleNavigateToAccount = () => {
    router.push('/(extra)/account');
  };

  const handleNavigateToDataSaving = () => {
    router.push('/(extra)/dataSaving');
  };

  const handleNavigateToPrivacyAndSocialFunctions = () => {
    router.push('/(extra)/privacyAndSocialFunctions');
  };

  const handleNavigateToSoundQuality = () => {
    router.push('/(extra)/soundQuality');
  };

  const handleNavigateToImageQuality = () => {
    router.push('/(extra)/imageQuality');
  };

  const handleNavigateToNotifications = () => {
    router.push('/(extra)/notifications');
  };

  const handleNavigateToLocalFiles = () => {
    router.push('/(extra)/localFiles');
  };

  const handleNavigateToInformation = () => {
    router.push('/(extra)/information');
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.topElement}>
          <Text style={styles.leftSide}>My Profile</Text>
          <TouchableOpacity style={styles.rightSide}>
            <Ionicons name="pencil" size={24} color="#000" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            {/* Zdjęcie użytkownika */}
            <Image
              source={{ uri: userData.profileImage }} // Pobieranie zdjęcia z JSON
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{userData.profileName}</Text>

            <View style={styles.profileTextContainer}>
              <View style={styles.email}>
                <Text style={styles.emailText}>Email</Text>
                <Text style={styles.profileEmail}>{userData.email}</Text>
              </View>

              <View style={styles.phone}>
                <Text style={styles.phoneText}>Phone Number</Text>
                <Text style={styles.profilePhone}>{userData.phone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={24} color="white" />
              <Text style={styles.statText}>{userData.stats.songs} songs</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="musical-notes" size={24} color="white" />
              <Text style={styles.statText}>{userData.stats.playlists} playlists</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="person" size={24} color="white" />
              <Text style={styles.statText}>{userData.stats.artists} artists</Text>
            </View>
          </View>
        </View>

        <View style={styles.elements}>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigateToAccount}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Konto</Text>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigateToDataSaving}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Oszczędzanie danych</Text>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigateToPrivacyAndSocialFunctions}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Prywatność i funkcje społecznościowe</Text>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigateToSoundQuality}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Jakość dźwięku</Text>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigateToImageQuality}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Jakość obrazu</Text>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigateToInformation}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Informacje</Text>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </TouchableOpacity>

          </View>


        <TouchableOpacity style={styles.logoutButton} onPress={handleNavigateToLogin}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100A1C',
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },  
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
  },
  profileTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10,
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  profileName: {
    color: '#9a9a9a',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    color: '#EFE1D1',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'left',
  },
  profilePhone: {
    color: '#EFE1D1',
    fontSize: 16,
    marginTop: 2,
    textAlign: 'left',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 30,
  },
  statItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statText: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  logoutButton: {
    width: '25%',
    backgroundColor: '#2E1F3D',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Wyśrodkowanie przycisku
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
  topElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  leftSide: {
    color: '#F7F7F7',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#B4B4B8',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  editText: {
    fontSize: 20,
    marginLeft: 6,
    color: '#000000',
    fontWeight: '600',
  },
  emailText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 4,
    fontWeight: '600',
  },
  phoneText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 4,
    fontWeight: '600',
  },
  email: {
    marginBottom: 10,
    width: '100%',
  },
  phone: {
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 12,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elements: {
    marginLeft: 5,
    marginRight: 5,
  }
});
