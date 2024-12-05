import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#rgba(255, 255, 255, 0.5)" />
        <TextInput
          style={styles.input}
          placeholder="Search for a song"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    marginVertical: 20,
    marginTop: "1%",
    // paddingTop: '10%',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#322251',
    borderRadius: 20,
    width: '90%',
    outline: 'none',
    border: 'none',
    height: 50,
  },
  searchIcon: {
    padding: 10,
    paddingLeft: 15
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 16,
    paddingLeft: 5
  },
});

export default SearchBar;