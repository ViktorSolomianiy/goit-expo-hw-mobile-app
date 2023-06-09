import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

import { database } from "../../firebase/config";
import * as db from "firebase/database";
import { filterCommets } from "../../helpers/filterComments";

import { SvgArrowLeft, SvgSendComments } from "../SvgIcons";
import { AuthorComment } from "../../components/AuthorComment";
import { UserComment } from "../../components/UserComment";
import { useButtomBarShown } from "../../hooks/useButtomBarShown";

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(null);
  const { login, userId } = useSelector((state) => state.auth);
  const { photo, postId } = route.params;
  const _ = useButtomBarShown();

  useEffect(() => {
    getAllComments();
  }, []);

  const createComments = async () => {
    const currentDate = new Date().getTime();

    await db.set(db.ref(database, `posts/${postId}/comments/${nanoid()}`), {
      login,
      comment,
      commentId: nanoid(),
      currentDate,
      ownerId: userId,
    });
  };

  const getAllComments = async () => {
    const postsCountRef = await db.ref(database, `posts/${postId}/comments/`);

    await db.onValue(postsCountRef, async (snapshot) => {
      const data = await snapshot.val();
      if (!data) return;
      const filteredCommets = filterCommets(data);

      setAllComments(filteredCommets);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comments</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("DefaultScreen")}
          style={styles.btnLogOut}
        >
          <SvgArrowLeft />
        </TouchableOpacity>
      </View>

      <View style={styles.commentsMain}>
        <Image style={styles.img} source={{ uri: photo }} />

        <SafeAreaView style={styles.commentsContainerAll}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={allComments}
            keyExtractor={(item) => item.commentId}
            renderItem={({ item }) => {
              const isUsersComment = item.ownerId === userId;
              console.log(item);

              return isUsersComment ? (
                <AuthorComment
                  currentDate={item.currentDate}
                  comment={item.comment}
                  ownerId={item.ownerId}
                />
              ) : (
                <UserComment
                  currentDate={item.currentDate}
                  comment={item.comment}
                  ownerId={item.ownerId}
                />
              );
            }}
          />
        </SafeAreaView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setComment}
          style={styles.commentsInput}
          placeholder="Comment..."
          value={comment}
        />
        <TouchableOpacity
          onPress={() => {
            createComments();
            setComment("");
          }}
          style={styles.btnSendComment}
        >
          <SvgSendComments />
        </TouchableOpacity>
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
    left: 19,
    top: 56,
  },
  commentsMain: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  img: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 32,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  commentsInput: {
    height: 50,
    position: "relative",
    fontFamily: "SignikaNegative-Medium",
    fontSize: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingRight: 50,
  },
  btnSendComment: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  commentsContainerAll: {
    marginBottom: 31,
  },
});
