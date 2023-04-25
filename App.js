import { useCallback } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { store } from "./assets/redux/store";

import { Main } from "./assets/components/Main";

SplashScreen.preventAutoHideAsync();

export default function App({}) {
  const [fontsLoaded] = useFonts({
    "SignikaNegative-Bold": require("./assets/fonts/SignikaNegative-Bold.ttf"),
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
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
