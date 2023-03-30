import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { LoginScreen } from "./assets/Screens/LoginScreen";
import { RegistrationScreen } from "./assets/Screens/RegistrationScreen";
import { HomeScreen } from "./assets/Screens/Main/Home";

SplashScreen.preventAutoHideAsync();

const AuthStack = createStackNavigator();

export default function App() {
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

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />

        <AuthStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
