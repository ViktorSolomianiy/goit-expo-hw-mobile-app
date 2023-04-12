import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { SvgLogOut, SvgCommentsPost } from "../SvgIcons";

export const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) setPosts((prev) => [...prev, route.params]);
  }, [route.params]);

  console.log(route.params);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Publications</Text>
        <TouchableOpacity
          style={styles.btnLogOut}
          onPress={() => navigation.navigate("Login")}
        >
          <SvgLogOut />
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image style={styles.imgPost} source={{ uri: item.photo }} />
              <Text style={styles.postTitle}>{item.name}</Text>
              <View style={styles.commentsMapContainer}>
                <TouchableOpacity
                  style={styles.commentsBtn}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <SvgCommentsPost />
                  <Text style={styles.commentsCount}>0</Text>
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
          )}
        />
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
  main: {
    marginHorizontal: 16,
  },
  postContainer: {
    marginTop: 35,
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
