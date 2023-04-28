import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/config";

import { formatDate } from "../helpers/formatDate";

export const UserComment = ({ currentDate, comment, ownerId }) => {
  const [commentAvatar, setCommentAvatar] = useState(null);

  useEffect(() => {
    getDownloadURL(ref(storage, `userAvatar/${ownerId}`))
      .then((url) => setCommentAvatar(url))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.commentsContainer}>
      <Image style={styles.commentAvatar} source={{ uri: commentAvatar }} />
      <View style={styles.commentBox}>
        <Text style={styles.textComment}>{comment}</Text>
        <View style={styles.timeBox}>
          <Text style={styles.textTimeInfo}>{formatDate(currentDate)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentAvatar: {
    marginRight: 16,
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: "#f3f3f3",
  },
  commentBox: {
    flex: 1,
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#f3f3f3",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  textComment: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 14,
    color: "#212121",
  },
  timeBox: {
    alignItems: "flex-end",
  },
  textTimeInfo: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 10,
    marginTop: 8,
    color: "#BDBDBD",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
