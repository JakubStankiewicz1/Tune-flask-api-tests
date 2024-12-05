import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Subtitle = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    // marginTop: 8,
    // marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    paddingLeft: 7,
    letterSpacing: 0.8,
  },
});

export default Subtitle;