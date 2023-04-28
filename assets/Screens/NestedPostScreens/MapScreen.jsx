import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { SvgArrowLeft } from "../SvgIcons";
import { useButtomBarShown } from "../../hooks/useButtomBarShown";

export const MapScreen = ({ navigation, route }) => {
  console.log("route", route);
  const _ = useButtomBarShown();

  const latitude = route.params.location.latitude;
  const longitude = route.params.location.longitude;
  console.log("latitude", latitude);
  console.log("longitude", longitude);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Map</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("DefaultScreen")}
          style={styles.btnLogOut}
        >
          <SvgArrowLeft />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  map: {
    flex: 1,
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
    marginTop: 50,
    color: "#212121",
    marginBottom: 11,
    fontSize: 20,
  },
  btnLogOut: {
    position: "absolute",
    left: 19,
    top: 51,
  },
});
