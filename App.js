import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useRoute } from "./assets/router/router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute(true);
  const [fontsLoaded] = useFonts({
    "SignikaNegative-Medium": require("./assets/fonts/SignikaNegative-Medium.ttf"),
    "SignikaNegative-Light": require("./assets/fonts/SignikaNegative-Light.ttf"),
    "SignikaNegative-Regular": require("./assets/fonts/SignikaNegative-Regular.ttf"),
    "SignikaNegative-SemiBold": require("./assets/fonts/SignikaNegative-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  onLayoutRootView();

  return <NavigationContainer>{routing}</NavigationContainer>;
}
