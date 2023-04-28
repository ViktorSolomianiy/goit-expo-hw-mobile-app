import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { authSignOutUser } from "../../redux/auth/authOperation";
import { database } from "../../firebase/config";
import * as db from "firebase/database";

import { SvgLogOut } from "../SvgIcons";
import { Avatar } from "../../components/Avatar";
import { PostsList } from "../../components/PostsList";

const screenHeight = Dimensions.get("window").height;
const bgImg = require("../../images/bg.jpg");

export const ProfileScreen = ({ navigation }) => {
  const { avatar: customAvatar } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const { userId, login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setAvatar(customAvatar);
  }, [customAvatar]);

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
        Object.entries(data)
          .map((item) => ({ ...item[1], postId: item[0] }))
          .filter((item) => item.userId === userId)
      );
    });
  };

  return (
    <View style={styles.container}>
      <Image source={bgImg} style={styles.bgImage} />
      <View style={styles.containerForm}>
        <View style={styles.absoluteImg}>
          <View style={styles.centerImg}>
            <Image style={styles.userImg} source={{ uri: avatar }} />
            <Avatar setAvatar={setAvatar} avatar={avatar} isProfile={true} />
          </View>
        </View>
        <TouchableOpacity style={styles.btnLogOut} onPress={signOut}>
          <SvgLogOut />
        </TouchableOpacity>
        <Text style={styles.title}>{login}</Text>

        <View style={styles.main}>
          <PostsList posts={userPosts} navigation={navigation} />
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
    marginBottom: 160,
  },
});
