import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SvgLogOut } from "../SvgIcons";

export const PostsScreen = ({ navigation }) => {
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
});
