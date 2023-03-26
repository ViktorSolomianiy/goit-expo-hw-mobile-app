import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { LoginScreen } from "./assets/Screens/LoginScreen";
import { RegistrationScreen } from "./assets/Screens/RegistrationScreen";

const bgImg = require("./assets/images/bg.jpg");
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const platform = Platform.OS == "ios" ? "padding" : "height";

export default function App() {
  const [isKeyboardStatus, setIsKeyboardStatus] = useState("Keyboard Hidden");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground source={bgImg} style={styles.bgImage}>
          <KeyboardAvoidingView>
            <View style={styles.containerForm}>
              {/* <LoginScreen behavior={platform} /> */}
              <RegistrationScreen
                behavior={platform}
                isKeyboardStatus={isKeyboardStatus}
              />
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerForm: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bgImage: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
