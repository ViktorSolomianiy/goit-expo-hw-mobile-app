import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Keyboard,
} from "react-native";

export const LoginScreen = () => {
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

  const marginBottomForm = isKeyboardStatus === "Keyboard Shown" ? 32 : 78;

  return (
    <View style={{ ...styles.form, marginBottom: marginBottomForm }}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.formFlex}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>

      {isKeyboardStatus === "Keyboard Hidden" && isKeyboardStatus !== "" && (
        <>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => Keyboard.dismiss()}
          >
            <Text style={styles.btnTitle}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.btnRegistr}>Don't have an account? Register</Text>
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
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: 500,
    color: "#212121",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
    height: 50,
    backgroundColor: "#F6F6F6",
    padding: 16,
    color: "#212121",
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
    padding: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  btnRegistratiom: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    color: "#1B4371",
  },
});
