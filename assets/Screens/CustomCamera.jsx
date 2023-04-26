import { MaterialCommunityIcons } from "@expo/vector-icons/build/Icons";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgCamera } from "./SvgIcons";

export const CustomCamera = ({ setPhoto }) => {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  //   useEffect(() => {
  //     if (!permission.granted) {
  //       requestPermission();
  //     }
  //   }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        <TouchableOpacity
          style={styles.cameraBtn}
          activeOpacity={0.8}
          onPress={takePhoto}
        >
          <SvgCamera />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraBtn}
          activeOpacity={0.8}
          onPress={toggleCameraType}
        >
          <MaterialCommunityIcons
            name="camera-flip-outline"
            size={24}
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  cameraBtn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
    borderRadius: 50,
    padding: 20,
    backgroundColor: "#fff",
  },
});
