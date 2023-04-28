import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import { useKeyboardStatus } from "../../hooks/useKeyboardStatus";
import { nanoid } from "nanoid";

import { storage, database } from "../../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import * as db from "firebase/database";

import { Feather, EvilIcons } from "@expo/vector-icons";
import { SvgArrowLeft, SvgCameraImage } from "../SvgIcons";
import { CustomCamera } from "../CustomCamera";

export const CreatePostsScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [locateName, setLocateName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedLocation, setIsFocusedLocation] = useState(false);
  const [isKeyboardStatus] = useKeyboardStatus();
  const isFocused = useIsFocused();

  const { userId, login, email } = useSelector((state) => state.auth);

  useEffect(() => {
    if (name !== "" && locateName !== "") {
      setDisabled(false);
    }
  }, [name, locateName]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    setPhoto(null);
  }, []);

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const nanoId = nanoid();
    const fileRef = await ref(storage, `postImage/${nanoId}`);

    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(ref(storage, `postImage/${nanoId}`));
    return url;
  };

  const uploadPostToServer = async () => {
    const url = await uploadPhotoToServer();

    await db.set(db.ref(database, `posts/${nanoid()}`), {
      postId: nanoid(),
      userId,
      userName: login,
      email,
      postImage: url,
      location,
      name,
      locateName,
    });

    resetInputs();
    setPhoto(null);

    navigation.navigate("DefaultScreen", {
      photo,
      name,
      locateName,
      location,
    });
  };

  const resetInputs = () => {
    setName("");
    setLocateName("");
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Posts</Text>
            <TouchableOpacity
              style={styles.btnLogOut}
              onPress={() => navigation.navigate("Posts")}
            >
              <SvgArrowLeft />
            </TouchableOpacity>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: photo }} />
              <TouchableOpacity
                onPress={() => {
                  setPhoto(null);
                }}
                activeOpacity={0.8}
                style={styles.cameraBtnImage}
              >
                <SvgCameraImage />
              </TouchableOpacity>
            </View>

            <Text style={{ ...styles.text, marginTop: 8 }}>Upload a photo</Text>

            <View style={styles.formContainer}>
              <TextInput
                onChangeText={(value) => setName(value)}
                style={isFocusedName ? styles.inputOnFocus : styles.input}
                placeholder={isFocusedName ? "" : "Name..."}
                value={name}
                onFocus={() => setIsFocusedName(true)}
                onBlur={() => setIsFocusedName(false)}
              />

              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(value) => setLocateName(value)}
                  style={
                    isFocusedLocation
                      ? styles.inputOnFocus
                      : { ...styles.input, paddingLeft: 30 }
                  }
                  placeholder={isFocusedLocation ? "" : "Location..."}
                  value={locateName}
                  onFocus={() => setIsFocusedLocation(true)}
                  onBlur={() => setIsFocusedLocation(false)}
                />
                {!isFocusedLocation && (
                  <Feather
                    style={styles.inputMarkerIcon}
                    name="map-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                )}
              </View>

              <TouchableOpacity
                disabled={disabled}
                style={disabled ? styles.disabledBtn : styles.btn}
                activeOpacity={0.8}
                onPress={uploadPostToServer}
              >
                <Text style={styles.btnTitle}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isKeyboardStatus === "Keyboard Hidden" && (
            <View style={styles.deletePostBtnContainer}>
              <TouchableOpacity
                style={styles.deletePostBtn}
                onPress={resetInputs}
              >
                <EvilIcons name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <>{isFocused && <CustomCamera setPhoto={setPhoto} />}</>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: "100%",
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "relative",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
  },
  headerTitle: {
    fontFamily: "SignikaNegative-SemiBold",
    textAlign: "center",
    marginTop: 55,
    color: "#212121",
    marginBottom: 11,
    fontSize: 20,
  },
  mainContainer: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  btnLogOut: {
    position: "absolute",
    left: 19,
    top: 56,
  },
  cameraBtnImage: {
    position: "absolute",
    borderRadius: 50,
    padding: 20,
    backgroundColor: "rgba(246, 246, 246, 0.6)",
  },
  image: {
    height: 240,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  formContainer: {
    marginTop: 48,
  },
  input: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomColor: "#E8E8E8",
    marginBottom: 32,
  },
  inputOnFocus: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomColor: "#FF6C00",
    backgroundColor: "#fff",
    marginBottom: 32,
    paddingBottom: 10,
    color: "#212121",
  },
  inputContainer: {
    display: "flex",
  },
  inputMarkerIcon: {
    position: "absolute",
    left: 2,
    top: 4,
  },
  btn: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  disabledBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#c9c9c9",
  },
  btnTitle: {
    fontFamily: "SignikaNegative-Regular",
    padding: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  deletePostBtn: {
    width: 70,
    height: 40,
    paddingTop: 8,
    paddingRight: 23,
    paddingBottom: 8,
    paddingLeft: 23,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  deletePostBtnContainer: {
    position: "absolute",
    bottom: 32,
    left: "50%",
    transform: [{ translateX: -70 / 2 }],
    alignItems: "center",
  },
});
