import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Image } from 'expo-image';


type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <Pressable 
    style={[styles.button, { backgroundColor: '#C10EED' }]}>

    <Text style={[styles.buttonLabel, { color: '#ffffff' }]}>
      {label}
    </Text>
    <Image source={require('../assets/images/Letsstart.png')} style={styles.buttonIcon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 27,
    width: 200,
    height: 69,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    width: 33,
    height: 33,
    left: 15,
  },
  buttonLabel: {
    fontFamily: 'Outfit',
    fontWeight: 700,
    color: '#ffffff',
    fontSize: 16,
  },
});