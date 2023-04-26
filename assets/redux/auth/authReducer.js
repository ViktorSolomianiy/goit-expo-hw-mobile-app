import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
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
});
