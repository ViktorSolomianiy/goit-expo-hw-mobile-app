import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./authOperation";

const state = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
  stateChange: false,
  isBottomBarShown: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    buttomBarShown: (state, { payload }) => ({
      ...state,
      isBottomBarShown: payload,
    }),
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload,
    }),
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
    }),
    authSignIn: (state, { payload }) => ({
      ...state,
      email: payload.email,
    }),
    authSingOut: () => state,
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authAddAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(
      authOperations.addAvatar.fulfilled,
      (state, { payload }) => {
        return { ...state, avatar: payload };
      }
    );
  },
});
