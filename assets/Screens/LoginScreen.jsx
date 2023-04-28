import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authSlice } from "../redux/auth/authReducer";

import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useKeyboardStatus } from "../hooks/useKeyboardStatus";

const screenHeight = Dimensions.get("window").height;
const bgImg = require("../images/bg.jpg");
const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isFocusedEmail, setIsEmail] = useState(false);
  const [isFocusedPassword, setIsPassword] = useState(false);
  const { passwordVisibility, rightShow, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isKeyboardStatus] = useKeyboardStatus();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    Keyboard.dismiss();

    signInWithEmailAndPassword(auth, state.email, state.password)
      .then(async (userCredential) => {
        const { uid, displayName, email } = userCredential.user;

        currentUser = { userId: uid, login: displayName, email };
        dispatch(authSlice.actions.updateUserProfile(currentUser));
      })
      .catch((error) => {
        console.log("error.code:", error.code);
        console.log("error.message:", error.message);
      });

    setState(initialState);
  };

  const marginBottomForm = isKeyboardStatus === "Keyboard Shown" ? 32 : 78;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image source={bgImg} style={styles.bgImage} />
        <KeyboardAvoidingView>
          <View style={styles.containerForm}>
            <View style={{ ...styles.form, marginBottom: marginBottomForm }}>
              <Text style={styles.title}>Login</Text>

              <View style={styles.formFlex}>
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
                    <Text style={styles.btnTitle}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.btnLogin}>
                      Don't have an account? Register
                    </Text>
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
    marginTop: 32,
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
});
