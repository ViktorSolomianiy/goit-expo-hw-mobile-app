import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SvgArrowLeft } from "../SvgIcons";

export const CreatePostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Posts</Text>
        <TouchableOpacity
          style={styles.btnLogOut}
          onPress={() => navigation.navigate("Posts")}
        >
          <SvgArrowLeft />
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
});
