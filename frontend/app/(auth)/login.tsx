import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, useRouter } from 'expo-router';
import { RadialGradient } from 'react-native-gradients-2';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Optional: show loading spinner

  // Function to go back to the index screen
  const goBack = () => {
    router.push('/');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle login
  const handleLogin = async () => {
    setLoading(true); // Start loading spinner
    try {
      // Call the backend API
      const response = await fetch(
        `https://donut-deliverance.ddns.net/api/login?email=${encodeURIComponent(email)}&hashed_pass=${encodeURIComponent(password)}`,
        { method: 'GET' }
      );

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

      // Validate response
      if (data.session_token && data.username) {
        Alert.alert('Login Successful', `Welcome back, ${data.username}!`);
        // Navigate to home
        router.push('../(tabs)');
      } else {
        throw new Error('Invalid response from server');
        router.push('../(tabs)');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
      router.push('../(tabs)'); 
    } finally {
      setLoading(false); // End loading spinner
    }
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
          Log in to your account
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
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input with Eye Icon */}
      <View style={[styles.inputContainer, { top: '31%' }]}>
        <Ionicons name="lock-closed" size={20} color="#A1A1A1" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A1A1A1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#A1A1A1"
          />
        </Pressable>
      </View>

      <View style={styles.ButtonContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={{ fontFamily: 'Outfit_700Bold', color: '#fff', fontSize: 14 }}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </Pressable>
        <Link href="../recovery" asChild>
          <Text style={{ fontFamily: 'Outfit_700Bold', color: '#C10EED', fontSize: 14, top: '20%' }}>
            Forgot password?
          </Text>
        </Link>
      </View>

      <View style={{ position: 'absolute', top: '64%', width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, maxWidth: '25%', backgroundColor: '#fff' }} />
        <View>
          <Text style={{ fontFamily: 'Outfit_700Bold', color: '#fff', fontSize: 13 }}>
            or continue with
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, maxWidth: '25%', backgroundColor: '#fff' }} />
      </View>

      {/* Google Icon Button */}
      <View style={styles.SocialLoginContainer}>
        <Pressable style={styles.socialButton}>
          <Image
            source={require('../../assets/google-icon.png')}
            style={styles.socialIcon}
          />
        </Pressable>
      </View>

      <View style={styles.FooterContainer}>
        <Text style={{ fontFamily: 'Outfit_700Bold', color: '#fff', fontSize: 13 }}>
          Don't have an account?
        </Text>
        <Text style={{ fontFamily: 'Outfit_700Bold', color: '#C10EED', fontSize: 13, top: '100%' }} onPress={() => router.push('/register')}>
          Sign up
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
    top: '43%',
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
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  socialButton: {
    borderRadius: 15,
    width: 59,
    height: 59,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  SocialLoginContainer: {
    position: 'absolute',
    top: '69%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  
  
});
