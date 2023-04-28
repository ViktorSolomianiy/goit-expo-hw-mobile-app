import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SvgCommentsPost } from "../Screens/SvgIcons";
import { Feather } from "@expo/vector-icons";

export const PostsList = ({ posts, navigation }) => {
  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => item.postId}
        renderItem={({ item }) => {
          return (
            <View style={styles.postContainer}>
              <Image style={styles.imgPost} source={{ uri: item.postImage }} />
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
                  <SvgCommentsPost fill={item.comments ? true : false} />
                  <Text style={styles.commentsCount}>
                    {item.comments ? Object.keys(item.comments).length : "0"}
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
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 160,
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
