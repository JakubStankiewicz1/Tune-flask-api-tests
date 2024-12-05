import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeadphonesImage from '@/assets/images/headphones.png';

// Pobierz szerokość ekranu, aby ustawić szerokość komponentu na 90% szerokości ekranu
const { width } = Dimensions.get('window');

const TradingSongButton = ({ image, title, author, onPress, onAddToQueue, onPlayPress }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleIconPress = () => {
    setIsAdded(!isAdded);
    onAddToQueue();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Zdjęcie z nakładką */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.overlay} />
        {/* Headphones Image */}
        <View style={styles.headphonesWrapper}>
          <Image source={HeadphonesImage} style={styles.headphonesImage} />
          <Text style={styles.tuneText}>Tune</Text> {/* Tekst obok ikony słuchawek */}
        </View>
      </View>

      {/* Kontener z tekstami */}
      <View style={styles.textOverlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>

      {/* Ikona dodawania do kolejki */}
      {/* <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Icon name={isAdded ? 'check' : 'plus'} size={16} color="white" />
        </View>
      </TouchableOpacity> */}

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    marginLeft: '5%',
    marginBottom: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  headphonesWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center', // Aby ikona i tekst były obok siebie
  },
  headphonesImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  tuneText: {
    marginLeft: 5, // Odstęp między obrazem słuchawek a tekstem
    fontSize: 16,
    color: '#C6E7FF',
    fontWeight: 'bold',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    color: '#FFDDAE',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  author: {
    fontSize: 20,
    color: '#D4F6FF',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  iconBackground: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconContainer: {
    position: 'absolute',
    top: 15,
    right: 50, // Przesunięcie ikony Play w prawo, aby nie nachodziła na ikonę plusa
  },
});

export default TradingSongButton;
