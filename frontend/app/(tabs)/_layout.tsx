import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMusicPlayer } from '@/components/MusicPlayerContext';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const { 
    currentSong, 
    isPlaying, 
    pauseSong, 
    playSong, 
    nextSong, 
    previousSong, 
    queue,
    position,
    duration,
    seekToPosition 
  } = useMusicPlayer();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldPlayInModal, setShouldPlayInModal] = useState(false);
  const [songPosition, setSongPosition] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.translationY > 100) {
        handleCloseModal();
      }
    });

  const handleMiniPlayerPress = () => {
    setModalVisible(true);
    setShouldPlayInModal(isPlaying);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setShouldPlayInModal(false);
  };

  const handleSliderChange = async (value: number) => {
    setSongPosition(value);
    if (currentSong && sound) {
      await sound.setPositionAsync(value * 1000);
    }
  };
  
  useEffect(() => {
    if (!isDragging && currentSong) {
      setSongPosition(position); // Synchronizacja pozycji slidera
    }
  }, [position, isDragging]);
  
  useEffect(() => {
    if (!isDragging) {
      setSliderValue(position);
    }
  }, [position, isDragging]);


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const elapsedTime = formatTime(songPosition);
  const remainingTime = currentSong
    ? formatTime((currentSong.duration || 0) - songPosition)
    : '0:00';
  
  const handleFavoritePress = () => {
    const updatedSong = { ...currentSong, isFavorite: !currentSong.isFavorite };
};


  // useEffect(() => {
  //   if (!isDragging && currentSong?.position !== undefined) {
  //     setSongPosition(currentSong.position / 1000);
  //   }
  // }, [currentSong?.position, isDragging]);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffffff',
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: '#1B1624', 
            borderTopWidth: 0, 
            height: 80,
            opacity: 1
          },
        }}
      >
        <Tabs.Screen 
          name="index" 
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="search" 
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="library" 
          options={{
            title: 'Library',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'library' : 'library-outline'} color={color} size={24} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="profile" 
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name={focused ? 'user' : 'user'} size={24} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="../extra/account" 
          options={{
            title: 'Extra 1',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'extension-puzzle' : 'extension-puzzle-outline'} color={color} size={24} />
            ),
          }} 
        />
      </Tabs>


      {/* Mini Player */}
      {currentSong && !modalVisible && (
        <View style={styles.miniPlayer}>
          <TouchableOpacity onPress={handleMiniPlayerPress} style={styles.miniPlayerContent}>
            <Image source={{ uri: currentSong.image }} style={styles.miniPlayerImage} />
            <View style={styles.miniPlayerInfo}>
              <Text style={styles.miniPlayerTitle}>{currentSong.title}</Text>
              <Text style={styles.miniPlayerAuthor}>{currentSong.author}</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.miniPlayerControls}>
            <TouchableOpacity onPress={pauseSong}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Fullscreen Modal */}
      {currentSong && modalVisible && (
        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <GestureDetector gesture={swipeGesture}>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={handleCloseModal}
          >
            <SafeAreaView style={styles.modalContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.closeModalButtonContainer}>
                  <TouchableOpacity onPress={handleCloseModal} style={styles.closeModalButton}>
                    <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
                    <Text style={styles.closeModalButtonText}>Back</Text>
                  </TouchableOpacity>
                </View>

              <Image source={{ uri: currentSong.image }} style={styles.modalImage} />

              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <View style={styles.infoLeft}>
                    <Text style={styles.modalAuthor}>{currentSong.author}</Text>
                    <Text style={styles.modalTitle}>{currentSong.title}</Text>
                  </View>
                  
                  <TouchableOpacity onPress={handleFavoritePress} style={styles.heartIconContainer}>
                    <Ionicons 
                      name={currentSong.isFavorite ? 'heart' : 'heart-outline'} 
                      size={24} 
                      color="white" 
                    />
                  </TouchableOpacity>


                </View>
              </View>


              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={duration}
                value={sliderValue}
                onSlidingStart={() => setIsDragging(true)}
                onSlidingComplete={(value) => {
                  setIsDragging(false);
                  seekToPosition(value);
                }}
                onValueChange={(value) => setSliderValue(value)}
              />




                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{elapsedTime}</Text>
                  {/* <Text style={styles.timeText}>{remainingTime}</Text> */}
                  <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>

                <View style={styles.bottomItems}>
                  <TouchableOpacity onPress={previousSong}>
                    <FontAwesome5 name="step-backward" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={pauseSong}>
                    <Ionicons
                      name={isPlaying ? 'pause-circle' : 'play-circle'}
                      size={64}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={nextSong}>
                    <FontAwesome5 name="step-forward" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Kolejka */}
                <View style={styles.queueContainer}>
                  <Text style={styles.queueTitle}>Songs Queue</Text>
                  {queue.map((song, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.queueItem}
                      onPress={() => playSong(song, false)}
                    >
                      <Image source={{ uri: song.image }} style={styles.queueImage} />
                      <View style={styles.queueInfo}>
                        <Text style={styles.queueSongTitle}>{song.title}</Text>
                        <Text style={styles.queueSongAuthor}>{song.author}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.closeModalButtonContainer}>
                  <TouchableOpacity onPress={handleCloseModal} style={styles.closeModalButton}>
                    <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
                    <Text style={styles.closeModalButtonText}>Back</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>

          </GestureDetector>
        </GestureHandlerRootView>
      )}

    </>
  );
}



const styles = StyleSheet.create({
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#2C2C2C',
    position: 'absolute',
    bottom: 80,
    width: '100%',
    height: 65,
    paddingHorizontal: 15,
  },
  miniPlayerContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  miniPlayerImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  miniPlayerInfo: {
    flex: 1,
    marginLeft: 15,
    lineHeight: 50,
    justifyContent: 'center',
  },
  miniPlayerTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 6,
  },
  miniPlayerAuthor: {
    color: '#DCDCDC',
    fontSize: 11,
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopButton: {
    marginLeft: 10,
  },

  // Fullscreen Modal Styles
  gestureHandlerRootView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1B1624',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  closeArrow: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  modalImage: {
    width: 350,
    height: 350,
    borderRadius: 25,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  infoLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 100,
  },
  modalAuthor: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  heartIcon: {
    marginTop: 5,
  },
  slider: {
    width: '90%',
    marginBottom: 30,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
  bottomItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 30,
  },
  queueContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  queueTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  queueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  queueImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 2,
  },
  queueSongTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 2,
  },
  queueSongAuthor: {
    color: 'gray',
    fontSize: 14,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 30,
  },
  closeModalButtonContainer: {
    position: 'absolute', 
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  closeModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1B1624',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  modalImage: {
    width: 350,
    height: 350,
    borderRadius: 25,
    marginTop: 40,
  },
  queueInfo: {
    marginLeft: "4%",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  }
});