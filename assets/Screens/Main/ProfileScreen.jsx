import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { SvgAddUserImage, SvgLogOut } from "../SvgIcons";

const screenHeight = Dimensions.get("window").height;
const bgImg = require("../../images/bg.jpg");

export const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={bgImg} style={styles.bgImage} />
      <View style={styles.containerForm}>
        <View style={styles.form}>
          <View style={styles.absoluteImg}>
            <View style={styles.centetImg}>
              <ImageBackground style={styles.userImg}>
                <View style={styles.addImgIcon}>
                  <SvgAddUserImage />
                </View>
              </ImageBackground>
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnLogOut}
            onPress={() => navigation.navigate("Login")}
          >
            <SvgLogOut />
          </TouchableOpacity>
          <Text style={styles.title}>Name</Text>
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
  containerForm: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bgImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: screenHeight,
  },
  form: {
    position: "relative",
    marginHorizontal: 16,
  },
  formFlex: {
    display: "flex",
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
  btnLogOut: {
    position: "absolute",
    right: 3,
    top: 24,
  },
  absoluteImg: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  centetImg: {
    alignItems: "center",
    justifyContent: "center",
  },
  userImg: {
    width: 120,
    height: 120,
    bottom: 105,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addImgIcon: {
    position: "absolute",
    right: -12,
    top: 80,
  },
});
