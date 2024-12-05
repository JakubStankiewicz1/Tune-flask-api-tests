import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Title = ({ text, text2, onText2Press }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
      {text2 && onText2Press && (
        <TouchableOpacity onPress={onText2Press}>
          <Text style={styles.text2}>{text2}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCF5E5',
  },
  text2: {
    fontSize: 16,
    color: '#EDEADE',
  },
});

export default Title;
