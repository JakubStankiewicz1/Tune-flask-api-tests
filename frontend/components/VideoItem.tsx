import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';  // Jeśli używasz expo-av do odtwarzania video

interface VideoItemProps {
  text: string;
  videoUri: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ text, videoUri }) => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay
        isMuted // opcjonalnie, aby wyciszyć dźwięk w pętli
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * (10 / 37), // 1/3 szerokości okna minus margines
    height: 250,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    left: 5, // Margines od lewej strony
    bottom: 5, // Margines od dołu
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Opcjonalne tło dla czytelności
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});

export default VideoItem;
