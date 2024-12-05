import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CustomItemProps {
  title: string;
  color?: string;
  image?: string;
  onPress: () => void;
  style?: object;
}

const CustomItem: React.FC<CustomItemProps> = ({ title, color, image, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color || '#333' }, style]}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '43%',
    height: 80,
    padding: 5,
    margin: 5,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    flexWrap: 'wrap',
    marginTop: "2%",
    marginLeft: "2%",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    transform: [{ rotate: '25deg' }],
    position: 'absolute',
    right: -20,
    top: 20,
    borderRadius: 4,
  },
});

export default CustomItem;
