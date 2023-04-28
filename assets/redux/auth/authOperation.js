import { createAsyncThunk } from "@reduxjs/toolkit";

import { getDownloadURL, ref } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, storage } from "../../firebase/config";

import { authSlice } from "./authReducer";
import { uploadAvatarToServer } from "../../api/auth";

export const authSignOutUser = () => async (dispatch) => {
  await signOut(auth);

  dispatch(authSlice.actions.authSingOut());
};

export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
          email,
        })
      );
      getDownloadURL(ref(storage, `userAvatar/${uid}`))
        .then((url) => dispatch(authSlice.actions.updateUserAvatar(url)))
        .catch((err) => console.log(err));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

const addAvatar = createAsyncThunk(
  "auth/AddAvatar",
  async ({ avatar, uid }) => {
    await uploadAvatarToServer(uid, avatar);
    const url = await getDownloadURL(ref(storage, `userAvatar/${uid}`));
    return url;
  }
);

const authOperations = {
  addAvatar,
};

export default authOperations;
