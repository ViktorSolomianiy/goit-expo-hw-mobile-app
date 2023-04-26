import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { authSignOutUser } from "../../redux/auth/authOperation";
import { database } from "../../firebase/config";
import * as db from "firebase/database";

import {
  SvgAddUserImage,
  SvgCommentsPost,
  SvgLogOut,
  SvgRemoveUserImage,
} from "../SvgIcons";
import { Feather } from "@expo/vector-icons";
import { authSlice } from "../../redux/auth/authReducer";

const screenHeight = Dimensions.get("window").height;
const bgImg = require("../../images/bg.jpg");

export const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState(null);
  const { userId, avatar, login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const getUserPosts = async () => {
    const postsUserRef = await db.ref(database, `posts/`);

    await db.onValue(postsUserRef, async (snapshot) => {
      const data = await snapshot.val();
      setUserPosts(
        Object.entries(data).map((item) => ({ ...item[1], postId: item[0] }))
      );
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(
        authSlice.actions.authAddAvatar({ avatar: result.assets[0].uri })
      );
    }
  };

  const removeImage = () => {
    dispatch(authSlice.actions.authAddAvatar({ avatar: null }));
  };

  return (
    <View style={styles.container}>
      <Image source={bgImg} style={styles.bgImage} />
      <View style={styles.containerForm}>
        <View style={styles.absoluteImg}>
          <View style={styles.centerImg}>
            <Image style={styles.userImg} source={{ uri: avatar }} />
            {avatar ? (
              <TouchableOpacity
                style={styles.removeImgIcon}
                onPress={removeImage}
              >
                <SvgRemoveUserImage />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.addImgIcon} onPress={pickImage}>
                <SvgAddUserImage />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.btnLogOut} onPress={signOut}>
          <SvgLogOut />
        </TouchableOpacity>
        <Text style={styles.title}>{login}</Text>

        <View style={styles.main}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={userPosts}
            keyExtractor={(item) => item.postId}
            renderItem={({ item }) => {
              const isUserPosts = item.userId === userId;

              return (
                isUserPosts && (
                  <View style={styles.postContainer}>
                    <Image
                      style={styles.imgPost}
                      source={{ uri: item.postImage }}
                    />
                    <Text style={styles.postTitle}>{item.name}</Text>
                    <View style={styles.commentsMapContainer}>
                      <TouchableOpacity
                        style={styles.commentsBtn}
                        onPress={() =>
                          navigation.navigate("Comments", {
                            photo: item.postImage,
                            postId: item.postId,
                          })
                        }
                      >
                        <SvgCommentsPost />
                        <Text style={styles.commentsCount}>
                          {item.comments
                            ? Object.keys(item.comments).length
                            : "0"}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.mapBtn}
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.location.coords,
                          })
                        }
                      >
                        <Feather
                          name="map-pin"
                          size={24}
                          color="#BDBDBD"
                          style={{ marginRight: 8 }}
                        />
                        <Text style={styles.mapLink}>{item.locateName}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  bgImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: screenHeight,
  },
  containerForm: {
    position: "relative",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 347,
    paddingHorizontal: 16,
  },
  btnLogOut: {
    position: "absolute",
    right: 16,
    top: 24,
  },
  absoluteImg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -60,
    alignItems: "center",
    justifyContent: "center",
  },
  centerImg: {
    position: "relative",
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
  removeImgIcon: {
    position: "absolute",
    right: -18,
    top: 74,
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
  main: {
    marginBottom: 320,
  },
  postContainer: {
    marginBottom: 35,
  },
  imgPost: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 16,
    fontFamily: "SignikaNegative-Medium",
    color: "#212121",
    marginTop: 8,
  },
  commentsMapContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
  },
  commentsBtn: {
    alignItems: "center",
    flexDirection: "row",
  },
  commentsCount: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 16,
    marginLeft: 9,
    color: "#BDBDBD",
  },
  mapLink: {
    fontSize: 16,
    fontFamily: "SignikaNegative-Regular",
    color: "#212121",
    textDecorationLine: "underline",
  },
  mapBtn: {
    alignItems: "center",
    flexDirection: "row",
  },
});
