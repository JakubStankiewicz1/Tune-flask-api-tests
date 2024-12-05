import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface PlaylistElementProps {
  title: string;
  imageUrl: string;
  onPress: () => void; // Funkcja, która będzie wywoływana po naciśnięciu na element playlisty
}

const PlaylistElement: React.FC<PlaylistElementProps> = ({ title, imageUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#3E2A47',
  },
  title: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PlaylistElement;
