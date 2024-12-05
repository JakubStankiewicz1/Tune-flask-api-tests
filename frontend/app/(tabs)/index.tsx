import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useMusicPlayer } from '@/components/MusicPlayerContext';
import Title from '@/components/Title';
import SongButton from '@/components/SongButton';
import data from '../../Data/data.json';
import TradingSongButton from '@/components/TradingSongButton';

export default function Index() {
  const { playSong, addToQueue } = useMusicPlayer();
  const [songs, setSongs] = useState(data.songs);
  const [visibleCount, setVisibleCount] = useState(8);

  const toggleFavorite = (id) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
  };

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 12, songs.length));
  };

  const isSeeMoreActive = visibleCount < songs.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Title text="Recommendations" style={styles.title1} />

          

          <Title text="Recommendations" onText2Press={handleSeeMore} />

          {/* Display songs */}
          {songs.slice(0, visibleCount).map((song, index) => (
            <SongButton
              key={index}
              image={song.image}
              title={song.title}
              author={song.author}
              isFavorite={song.isFavorite}
              onFavoriteToggle={() => toggleFavorite(song.id)}
              onPress={() => playSong(song)}
              onAddToQueue={() => addToQueue(song)}
            />
          ))}
          

          <TouchableOpacity
            onPress={visibleCount < 15 ? handleSeeMore : null}
            style={[styles.seeMoreButton, visibleCount >= 15 && styles.disabledButton]}
            disabled={visibleCount >= 15}
          >
            <Text style={[styles.seeMoreText, visibleCount >= 15 && styles.disabledText]}>
              See more
            </Text>
          </TouchableOpacity>

          {/* Separator line */}
          <View style={styles.separator} />

          {/* // Inside your render method or JSX */}
          {songs.slice(0, visibleCount).map((song, index) => (
            <TradingSongButton
              key={index}
              image={song.image}
              title={song.title}
              author={song.author}
              onFavoriteToggle={() => toggleFavorite(song.id)}
              onPress={() => playSong(song)}
              onAddToQueue={() => addToQueue(song)}
            />
          ))}

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
    backgroundColor: '#100A1C',
    alignItems: 'left',
    width: '100%', // Set container width to 95% of screen width
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 70,
  },
  seeMoreButton: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#98BDE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  horizontalScrollContainer: {
    width: '100%',
    paddingVertical: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
  },
  title1: {
    marginTop: 10,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#333', // Dim the background color when disabled
    borderColor: '#555', // Change border color when disabled
  },
  disabledText: {
    color: '#777', // Dim the text color when disabled
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#B0B0B0', // Light grey color for the line
    marginVertical: 20, // Space before and after the line
  },
});
