import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts, Outfit_400Regular, Outfit_700Bold } from "@expo-google-fonts/outfit";
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MusicPlayerProvider } from "@/components/MusicPlayerContext";
import Toast from 'react-native-toast-message';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({Outfit_400Regular, Outfit_700Bold});
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MusicPlayerProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(extra)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </MusicPlayerProvider>
    </GestureHandlerRootView>
  );
};
