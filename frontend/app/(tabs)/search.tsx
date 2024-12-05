import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import CustomItem from "@/components/CustomItem";
import SearchBar from "@/components/SearchBar";
import Subtitle from "@/components/Subtitle";
import VideoItem from "@/components/VideoItem";
import SongButton from "@/components/SongButton";
import itemsData from "../../Data/itemsData.json";
import songsData from "../../Data/data.json";
import Icon from "react-native-vector-icons/AntDesign";
import { useMusicPlayer } from "@/components/MusicPlayerContext"; // Import the context for music player

const { width, height } = Dimensions.get("window");

export default function Search() {
  const { playSong, addToQueue } = useMusicPlayer(); // Destructure the methods to play songs and add them to queue
  const [fullView, setFullView] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#100A1C");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const [isSearching, setIsSearching] = useState(false); // To control visibility of other content

  const handleItemPress = (item) => {
    setBackgroundColor(item.color);
    setSelectedItem(item);
    setFullView(true);
  };

  const handleCloseFullView = () => {
    setFullView(false);
  };

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0); // Show or hide content based on search input length
  };

  // Filter songs based on search query and sort by title and author
  const filteredSongs = songsData.songs
    .filter((song) => {
      const query = searchQuery.toLowerCase();
      return (
        song.title.toLowerCase().includes(query) ||
        song.author.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      // Sort primarily by title, and if equal, sort by author
      const titleComparison = a.title
        .toLowerCase()
        .localeCompare(b.title.toLowerCase());
      if (titleComparison !== 0) return titleComparison;
      return a.author.toLowerCase().localeCompare(b.author.toLowerCase());
    })
    .slice(0, 10); // Limit to the first 10 results

  if (fullView && selectedItem) {
    const { songIds = [], image2, title } = selectedItem;
    const songs = songsData.songs || [];

    const darkBackgroundColor = "rgba(16, 10, 28, 0.8)"; // Darker shade with 80% opacity

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: "#100A1C" }]}>
        <View
          style={[
            styles.fullScreenView,
            { backgroundColor: darkBackgroundColor },
          ]}
        >
          <ScrollView contentContainerStyle={styles.fullScreenContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseFullView}
            >
              <Icon name="arrowleft" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.itemTitle}>{title}</Text>

            {/* Image2 */}
            {image2 && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image2 }} style={styles.image} />
              </View>
            )}

            {/* Render songs */}
            <View style={styles.songsContainer}>
              {songIds.length > 0 ? (
                songIds.map((songId) => {
                  const song = songs.find((song) => song.id === songId);
                  return song ? (
                    <SongButton
                      key={song.id}
                      image={song.image}
                      title={song.title}
                      author={song.author}
                      onPress={() => playSong(song)} // Play song on press
                      onAddToQueue={() => addToQueue(song)} // Add song to queue
                      style={styles.songButton}
                    />
                  ) : (
                    <Text key={songId} style={styles.noSongText}>
                      Song not found (ID: {songId})
                    </Text>
                  );
                })
              ) : (
                <Text style={styles.noSongsText}>No songs available</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: "#100A1C" }]}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.searchBarWrapper}>
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              style={styles.searchBar}
            />

            {/* Conditionally render subtitle based on whether search query is empty */}
            {searchQuery.length === 0 && (
              <Subtitle
                text="Odkrywaj nowe gatunki"
                style={styles.subtitleSpacing}
              />
            )}

            {isSearching ? (
              <View style={styles.songResultsContainer}>
                {filteredSongs.length > 0 ? (
                  filteredSongs.map((song) => (
                    <SongButton
                      key={song.id}
                      image={song.image}
                      title={song.title}
                      author={song.author}
                      onPress={() => playSong(song)} // Play song on press
                      onAddToQueue={() => addToQueue(song)} // Add song to queue
                      style={styles.songButton}
                    />
                  ))
                ) : (
                  <Text style={styles.noSongsText}>
                    No matching songs found
                  </Text>
                )}
              </View>
            ) : (
              <>
                <View style={styles.videoItemsContainer}>
                  <VideoItem
                    text="#street rap"
                    videoUri="https://drive.google.com/uc?export=download&id=17RCe60k1VoS_E2si8Ue3HLJAXdPD-8H7"
                  />
                  <VideoItem
                    text="#pop"
                    videoUri="https://drive.google.com/uc?export=download&id=1eKXx5UIQ_iIt905qqRyW2UlfURFy8z9f"
                  />
                  <VideoItem
                    text="#hip-pop"
                    videoUri="https://drive.google.com/uc?export=download&id=1BAwlMt8DWf0Z_pPy2CLO6zNIhg1zEoZE"
                  />
                </View>

                <Subtitle text="Discover new categories" />

                <View style={styles.itemsContainer}>
                  {itemsData.map((item, index) => (
                    <CustomItem
                      key={index}
                      title={item.title}
                      color={item.color}
                      image={item.image}
                      onPress={() => handleItemPress(item)}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#100A1C", // Ensure background is consistent across the screen
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
    flexGrow: 1,
  },
  searchBarWrapper: {
    width: width,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchBar: {
    width: "100%",
    paddingTop: "5%",
    marginTop: "10%",
  },
  subtitleSpacing: {
    marginBottom: 0,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  videoItemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  songResultsContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  fullScreenView: {
    flex: 1,
    width: "100%",
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenContent: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    left: 20,
    padding: 0,
    borderRadius: 5,
    zIndex: 999, // Ensure the button is on top
  },
  songsContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "left",
  },
  noSongsText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  songButton: {
    marginBottom: 10,
  },
  noSongText: {
    color: "#ff5555",
    fontSize: 16,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  itemTitle: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});
