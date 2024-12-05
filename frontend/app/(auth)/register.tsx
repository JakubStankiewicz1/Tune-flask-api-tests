import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RadialGradient } from 'react-native-gradients-2';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Navigate back to login screen
  const goBack = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.GradientBG}>
        <RadialGradient x="0%" y="100%" rx="272px" ry="272px" colorList={colorList1} />
      </View>
      <View style={styles.GradientBG}>
        <RadialGradient x="0%" y="0%" rx="272px" ry="272px" colorList={colorList2} />
      </View>
      <View style={styles.GradientBG}>
        <RadialGradient x="100%" y="50%" rx="220px" ry="220px" colorList={colorList2} />
      </View>

      <View style={styles.HeaderContainer}>
        <Text style={{ fontFamily: 'Outfit_700Bold', color: '#fff', fontSize: 26, lineHeight: 26 }}>
          Create a new account
        </Text>
      </View>

      <Pressable onPress={goBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={32} color="white" />
      </Pressable>

      {/* Email Input */}
      <View style={[styles.inputContainer, { top: '23%' }]}>
        <Ionicons name="mail" size={20} color="#A1A1A1" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A1A1A1"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={[styles.inputContainer, { top: '31%' }]}>
        <Ionicons name="lock-closed" size={20} color="#A1A1A1" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A1A1A1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Confirm Password Input */}
      <View style={[styles.inputContainer, { top: '39%' }]}>
        <Ionicons name="lock-closed" size={20} color="#A1A1A1" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#A1A1A1"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Register Button */}
      <View style={styles.ButtonContainer}>
        <Pressable style={styles.button}>
          <Text style={{ fontFamily: 'Outfit_700Bold', color: '#fff', fontSize: 14 }}>
            Sign Up
          </Text>
        </Pressable>
      </View>

      {/* Navigate to Login */}
      <View style={styles.FooterContainer}>
        <Text style={{ fontFamily: 'Outfit_700Bold', color: '#fff', fontSize: 13 }}>
          Already have an account?
        </Text>
        <Text 
          style={{ fontFamily: 'Outfit_700Bold', color: '#C10EED', fontSize: 13, top: '100%' }}
          onPress={() => router.push('/login')}
        >
          Login
        </Text>
      </View>
    </View>
  );
}

const colorList1 = [
  { offset: '0%', color: '#C10EED', opacity: '0.4' },
  { offset: '100%', color: '#100A1C', opacity: '0.2' },
];
const colorList2 = [
  { offset: '0%', color: '#34BDEB', opacity: '0.2' },
  { offset: '100%', color: '#100A1C', opacity: '0.2' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100A1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderContainer: {
    position: 'absolute',
    top: '13%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FooterContainer: {
    position: 'absolute',
    top: '78%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  GradientBG: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 15,
    width: 337,
    height: 59,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#C10EED',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F2157',
    borderRadius: 8,
    marginTop: 15,
    width: '80%',
    height: 50,
    paddingHorizontal: 15,
    position: 'absolute',
    borderWidth: 0.2,
    borderColor: '#fff',
  },
  input: {
    flex: 1,
    fontFamily: 'Outfit_700Bold',
    fontSize: 14,
    color: '#fff',
  },
  icon: {
    marginRight: 10,
  },
});
