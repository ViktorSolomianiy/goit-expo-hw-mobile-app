import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";

import { authSlice } from "../redux/auth/authReducer";
import { auth } from "../firebase/config";

import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useKeyboardStatus } from "../hooks/useKeyboardStatus";
import { SvgAddUserImage } from "./SvgIcons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const screenHeight = Dimensions.get("window").height;
const bgImg = require("../images/bg.jpg");
const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsEmail] = useState(false);
  const [isFocusedPassword, setIsPassword] = useState(false);
  const { passwordVisibility, rightShow, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isKeyboardStatus] = useKeyboardStatus();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    Keyboard.dismiss();

    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, { displayName: state.login });
        const { uid, displayName, email } = await userCredential.user;

        dispatch(
          authSlice.actions.updateUserProfile({
            userId: uid,
            login: displayName,
            email,
          })
        );
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });

    setState(initialState);
  };

  const marginBottomForm = isKeyboardStatus === "Keyboard Shown" ? 32 : 78;
  const topImage = isKeyboardStatus === "Keyboard Shown" ? -350 : -485;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image source={bgImg} style={styles.bgImage} />
        <KeyboardAvoidingView>
          <View style={styles.containerForm}>
            <View style={{ ...styles.form, marginBottom: marginBottomForm }}>
              <View style={{ ...styles.absoluteImg, top: topImage }}>
                <View style={styles.centetImg}>
                  <ImageBackground style={styles.userImg}>
                    <View style={styles.addImgIcon}>
                      <SvgAddUserImage />
                    </View>
                  </ImageBackground>
                </View>
              </View>

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
                <View style={[styles.inputContainer, { marginBottom: 0 }]}>
                  <TextInput
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    onFocus={() => setIsPassword(true)}
                    onBlur={() => setIsPassword(false)}
                    value={state.password}
                    style={
                      isFocusedPassword ? styles.inputOnFocus : styles.input
                    }
                    placeholder="Password"
                    secureTextEntry={passwordVisibility}
                    autoCapitalize="none"
                  />
                  <Pressable onPress={handlePasswordVisibility}>
                    <Text style={styles.inputPasswordVisibility}>
                      {rightShow}
                    </Text>
                  </Pressable>
                </View>
              </View>
              {isKeyboardStatus === "Keyboard Hidden" && (
                <View>
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={styles.btnTitle}>Register</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.btnLogin}>Have an account? Log in</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  containerForm: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bgImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: screenHeight,
  },
  form: {
    position: "relative",
    marginHorizontal: 16,
  },
  formFlex: {
    display: "flex",
  },
  title: {
    fontFamily: "SignikaNegative-Medium",
    marginTop: 92,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: "medium",
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
    marginBottom: 16,
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
  absoluteImg: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  centetImg: {
    alignItems: "center",
    justifyContent: "center",
  },
  userImg: {
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
