import React, { createContext, useContext, useState } from 'react';
import { Audio } from 'expo-av';

interface MusicPlayerContextProps {
  currentSong: any;
  isPlaying: boolean;
  position: number;
  duration: number;
  queue: any[];
  playSong: (song: any, startQueue?: boolean) => void;
  pauseSong: () => void;
  stopSong: () => void;
  nextSong: () => void;
  previousSong: () => void;
  addToQueue: (song: any) => void;
  seekToPosition: (seconds: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(undefined);

export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSong = async (song, startQueue = true) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.audioUrl },
      { shouldPlay: true }
    );
    setSound(newSound);
    setCurrentSong(song);
    setIsPlaying(true);

    if (startQueue) {
      setQueue((prevQueue) => {
        const newQueue = prevQueue.filter((s) => s.id !== song.id); // Usuń duplikaty
        return [song, ...newQueue];
      });
    }

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis / 1000); // Pozycja w sekundach
        setDuration(status.durationMillis / 1000 || 0); // Długość w sekundach
      }
      if (status.didJustFinish) {
        nextSong();
      }
    });
  };

  const pauseSong = async () => {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const stopSong = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    const currentIndex = queue.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex >= 0 && currentIndex < queue.length - 1) {
      playSong(queue[currentIndex + 1], false); // Nie restartuj kolejki
    }
  };

  const previousSong = () => {
    const currentIndex = queue.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex > 0) {
      playSong(queue[currentIndex - 1], false);
    }
  };

  const addToQueue = (song) => {
    setQueue((prevQueue) => {
      if (prevQueue.find((s) => s.id === song.id)) {
        return prevQueue;
      }
      return [...prevQueue, song];
    });
  };

  const seekToPosition = async (seconds: number) => {
    if (sound) {
      try {
        await sound.setPositionAsync(seconds * 1000); // Pozycja w milisekundach
        setPosition(seconds); // Aktualizuj stan pozycji
      } catch (error) {
        console.error('Error seeking to position:', error);
      }
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        position,
        duration,
        queue,
        playSong,
        pauseSong,
        stopSong,
        nextSong,
        previousSong,
        addToQueue,
        seekToPosition,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
