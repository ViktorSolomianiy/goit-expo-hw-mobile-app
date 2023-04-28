import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { removeAvatarFromServer } from "../api/auth";
import { authSlice } from "../redux/auth/authReducer";
import authOperations from "../redux/auth/authOperation";

import { SvgAddUserImage, SvgRemoveUserImage } from "../Screens/SvgIcons";

export const Avatar = ({ avatar, setAvatar, isProfile = false }) => {
  const { userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const resultAvatar = result.assets[0].uri;

      if (isProfile) {
        dispatch(
          authOperations.addAvatar({ uid: userId, avatar: resultAvatar })
        );
      } else {
        setAvatar(resultAvatar);
      }
    }
  };

  const removeImage = async () => {
    await removeAvatarFromServer(userId);
    dispatch(authSlice.actions.updateUserAvatar(null));
  };

  return (
    <>
      {avatar ? (
        <TouchableOpacity style={styles.removeImgIcon} onPress={removeImage}>
          <SvgRemoveUserImage />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.addImgIcon} onPress={pickImage}>
          <SvgAddUserImage />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  removeImgIcon: {
    position: "absolute",
    right: -18,
    top: 74,
  },
  addImgIcon: {
    position: "absolute",
    right: -12,
    top: 80,
  },
});
