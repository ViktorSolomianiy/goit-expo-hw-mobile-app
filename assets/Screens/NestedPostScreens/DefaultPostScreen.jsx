import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperation";
import { database } from "../../firebase/config";
import * as db from "firebase/database";

import { SvgLogOut } from "../SvgIcons";
import { PostsList } from "../../components/PostsList";

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { login, email, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const getAllPosts = async () => {
    const postsCountRef = await db.ref(database, `posts/`);

    await db.onValue(postsCountRef, async (snapshot) => {
      const data = await snapshot.val();
      if (!data) return;

      setPosts(
        Object.entries(data).map((item) => ({ ...item[1], postId: item[0] }))
      );
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Publications</Text>
        <TouchableOpacity style={styles.btnLogOut} onPress={signOut}>
          <SvgLogOut />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Image style={styles.imgUser} source={{ uri: avatar }} />
        <View style={styles.nameAndEmailInfo}>
          <Text style={styles.textNameinfo}>{login}</Text>
          <Text style={styles.textEmailinfo}>{email}</Text>
        </View>
      </View>

      <View style={styles.main}>
        <PostsList posts={posts} navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  btnLogOut: {
    position: "absolute",
    right: 19,
    top: 56,
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    marginLeft: 16,
    marginBottom: 32,
  },
  imgUser: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#F6F6F6",
  },
  nameAndEmailInfo: {
    justifyContent: "center",
  },
  textNameinfo: {
    fontFamily: "SignikaNegative-Bold",
    fontSize: 13,
  },
  textEmailinfo: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 11,
  },
  main: {
    marginHorizontal: 16,
    marginBottom: 200,
  },
});
