import { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  ImageBackground,
  Keyboard,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { SvgAddUserImage } from "./Svg";

const initialState = {
  login: "",
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

export const RegistrationScreen = ({ isKeyboardStatus }) => {
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsEmail] = useState(false);
  const [isFocusedPassword, setIsPassword] = useState(false);
  const { passwordVisibility, rightShow, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [state, setState] = useState(initialState);
  const [fontsLoaded] = useFonts({
    "SignikaNegative-Medium": require("../fonts/SignikaNegative-Medium.ttf"),
    "SignikaNegative-Light": require("../fonts/SignikaNegative-Light.ttf"),
    "SignikaNegative-Regular": require("../fonts/SignikaNegative-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    Keyboard.dismiss();
    setState(initialState);

    console.log(state);
  };

  const marginBottomForm = isKeyboardStatus === "Keyboard Shown" ? 32 : 78;

  return (
    <View
      style={{ ...styles.form, marginBottom: marginBottomForm }}
      onLayout={onLayoutRootView}
    >
      <ImageBackground style={styles.userImg}>
        <View style={styles.addImgIcon}>
          <SvgAddUserImage />
        </View>
      </ImageBackground>
      <Text style={styles.title}>Registration</Text>

      <View style={styles.formFlex}>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, login: value }))
            }
            onFocus={() => setIsFocusedLogin(true)}
            onBlur={() => setIsFocusedLogin(false)}
            value={state.login}
            style={isFocusedLogin ? styles.inputOnFocus : styles.input}
            placeholder="Login"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
            onFocus={() => setIsEmail(true)}
            onBlur={() => setIsEmail(false)}
            value={state.email}
            style={isFocusedEmail ? styles.inputOnFocus : styles.input}
            placeholder="Email"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, password: value }))
            }
            onFocus={() => setIsPassword(true)}
            onBlur={() => setIsPassword(false)}
            value={state.password}
            style={isFocusedPassword ? styles.inputOnFocus : styles.input}
            placeholder="Password"
            secureTextEntry={passwordVisibility}
            autoCapitalize="none"
          />
          <Pressable onPress={handlePasswordVisibility}>
            <Text style={styles.inputPasswordVisibility}>{rightShow}</Text>
          </Pressable>
        </View>
      </View>

      {isKeyboardStatus === "Keyboard Hidden" && isKeyboardStatus !== "" && (
        <>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => keyboardHide()}
          >
            <Text style={styles.btnTitle}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.btnLogin}>Have an account? Log in</Text>
          {/* <Button style={styles.btnLogin} title="Have an account? Log in" /> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
    marginBottom: 78,
  },
  formFlex: {
    display: "flex",
    gap: 16,
  },
  title: {
    fontFamily: "SignikaNegative-Medium",
    marginTop: 92,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: 500,
    color: "#212121",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    fontFamily: "SignikaNegative-Light",
    fontSize: 16,
    color: "#BDBDBD",
    width: "100%",
    height: 50,
    padding: 16,
  },
  inputOnFocus: {
    fontSize: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    padding: 16,
    color: "#212121",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
  },
  inputPasswordVisibility: {
    fontFamily: "SignikaNegative-Regular",
    position: "absolute",
    right: 0,
    top: -12,
    marginRight: 16,
    color: "#1B4371",
    fontSize: 16,
  },
  btn: {
    marginTop: 43,
    marginBottom: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "SignikaNegative-Regular",
    padding: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  btnLogin: {
    fontFamily: "SignikaNegative-Regular",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    color: "#1B4371",
  },
  userImg: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 999,
    top: -60,
    left: 121,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addImgIcon: {
    position: "absolute",
    right: -12,
    top: 80,
  },
});
