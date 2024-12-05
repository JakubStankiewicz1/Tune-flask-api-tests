import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SongButton = ({ image, title, author, onPress, onAddToQueue }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleIconPress = () => {
    setIsAdded(!isAdded);
    onAddToQueue();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          {/* Zmiana ikony w zależności od stanu */}
          <Icon name={isAdded ? 'check' : 'plus'} size={16} color="white" />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    width: '95%',
    marginLeft: 10,
    marginBottom: 10,
    marginVertical: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  author: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  iconContainer: {
    marginRight: 10,
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
});

export default SongButton;
