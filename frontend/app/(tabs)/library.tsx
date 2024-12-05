import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusicPlayer } from '@/components/MusicPlayerContext';
import data from '../../Data/data.json';  // Assuming your JSON file is in this path
import SongButton from '@/components/SongButton';

interface PlaylistElementProps {
  title: string;
  imageUrl: string;
  onPress: () => void;
}

const PlaylistElement: React.FC<PlaylistElementProps> = ({ title, imageUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.playlistContainer} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.playlistImage} />
      <Text style={styles.playlistTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Library() {
  const { playSong, addToQueue } = useMusicPlayer();  // Get playSong and addToQueue functions from MusicPlayerContext
  const [activeButton, setActiveButton] = useState('Playlisty');
  const [selectedPlaylist, setSelectedPlaylist] = useState<null | { title: string, imageUrl: string }>(null);

  // Extract playlists and songs from the data
  const playlists = data.playlists;
  const songs = data.songs;

  // Filter favorite songs
  const favoriteSongs = songs.filter(song => song.isFavorite);

  const handlePlaylistPress = (playlist: { title: string, imageUrl: string }) => {
    setSelectedPlaylist(playlist);
  };

  const handleCloseDetails = () => {
    setSelectedPlaylist(null);
  };

  const toggleFavorite = (id: number) => {
    const updatedSongs = songs.map((song) =>
      song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
    );
    // Here you can update the state to re-render the component with updated songs
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            <View style={styles.leftSection}>
              <View style={styles.userIcon}>
                <Text style={styles.userLetter}>A</Text>
              </View>
              <Text style={styles.libraryText}>Biblioteka</Text>
            </View>
            <View style={styles.rightSection}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="search-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="add-circle-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, activeButton === 'Playlisty' && styles.activeButton]}
              onPress={() => setActiveButton('Playlisty')}
            >
              <Text style={styles.buttonText}>Playlisty</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, activeButton === 'Ulubione' && styles.activeButton]}
              onPress={() => setActiveButton('Ulubione')}
            >
              <Text style={styles.buttonText}>Ulubione</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Show favorite songs */}
          {activeButton === 'Ulubione' && (
            <FlatList
              data={favoriteSongs}
              renderItem={({ item }) => (
                <SongButton
                  image={item.image}
                  title={item.title}
                  author={item.author}
                  isFavorite={item.isFavorite}
                  onFavoriteToggle={() => toggleFavorite(item.id)}
                  onPress={() => playSong(item)}  // Play song when clicked
                  onAddToQueue={() => addToQueue(item)}  // Add to queue
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.songList}
            />
          )}

          {/* Show playlists */}
          {activeButton === 'Playlisty' && (
            <FlatList
              data={playlists}
              renderItem={({ item }) => (
                <PlaylistElement
                  title={item.title}
                  imageUrl={item.image}
                  onPress={() => handlePlaylistPress(item)}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.playlistList}
            />
          )}
        </View>
      </View>

      {/* Modal for playlist details */}
      {selectedPlaylist && (
        <Modal
          animationType="fade"
          transparent={false}
          visible={selectedPlaylist !== null}
          onRequestClose={handleCloseDetails}
        >
          <SafeAreaView style={styles.fullScreenModal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseDetails}>
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.playlistDetailsContainer}>
              <Text style={styles.playlistDetailsTitle}>{selectedPlaylist.title}</Text>
              <Image source={{ uri: selectedPlaylist.imageUrl }} style={styles.playlistDetailsImage} />
              <Text style={styles.playlistDetailsText}>Szczegóły playlisty...</Text>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100A1C',
  },
  backgroundContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    backgroundColor: '#3D3D3D',
    borderRadius: 20,
    padding: 10,
    marginRight: 8,
  },
  userLetter: {
    color: '#fff',
    fontSize: 16,
  },
  libraryText: {
    color: '#fff',
    fontSize: 24,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: '#343434',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#B0B0B0',
    marginVertical: 20,
  },
  playlistContainer: {
    marginBottom: 20,
    width: 160,
    alignItems: 'center',
  },
  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  playlistTitle: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  songList: {
    marginBottom: 20,
  },
  playlistList: {
    marginBottom: 20,
  },
  modalHeader: {
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  closeButton: {
    marginRight: 20,
  },
  playlistDetailsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  playlistDetailsTitle: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
  },
  playlistDetailsImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  playlistDetailsText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
});
