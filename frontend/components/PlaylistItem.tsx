import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import SongButton from './SongButton';

interface PlaylistItemProps {
  title: string;
  author: string;
  image: string;
  songs: { image: string, title: string, author: string, audioUrl: string }[]; 
  onPress?: () => void;
  style?: object;
  onPlay: () => void;  
  onPause: () => void;  
  isPlaying: boolean;  
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ title, author, image, songs, onPress, style, onPlay, onPause, isPlaying }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
    if (onPress) onPress(); // Obsługa dodatkowej funkcji, jeśli przekazano
  };

  const closeModal = () => setModalVisible(false);

  return (
    <>
      {/* Element wyświetlany w liście */}
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={handlePress}
      >
        {/* Obraz tła */}
        <Image source={{ uri: image }} style={styles.image} />
        
        {/* Warstwa tekstu na obrazie */}
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal wyświetlany po kliknięciu */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal} 
      >
        <LinearGradient
          colors={['#009688', '#000']} // Gradient
          style={styles.gradientBackground}
        >
          <SafeAreaView style={styles.modalContainer}>
            {/* Przyciski zamknięcia po lewej stronie */}
            <TouchableOpacity onPress={closeModal} style={styles.backButton}>
              <Ionicons name="arrow-back" size={30} color="#fff" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            {/* ScrollView do przewijania całego modalu */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.upperPage}>
                <Image source={{ uri: image }} style={styles.topImage} />
              </View>

              <View style={styles.content}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text style={styles.modalAuthor}>{author}</Text>

                {/* Lista piosenek */}
                <View style={styles.songsContainer}>
                  {songs.map((song, index) => (
                    <SongButton
                      key={index}
                      image={song.image}
                      title={song.title}
                      author={song.author}
                      onPress={() => console.log(`Playing ${song.title}`)}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    aspectRatio: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  author: {
    fontSize: 11,
    color: '#ccc',
  },
  gradientBackground: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  upperPage: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
    marginTop: 50,
  },
  topImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'flex-start',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  modalAuthor: {
    fontSize: 18,
    color: '#aaa',
    marginTop: 10,
  },
  songsContainer: {
    marginTop: 20,
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  }
});

export default PlaylistItem;
