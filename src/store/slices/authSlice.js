import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../utils/history";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      history.push("/dashboard");
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    signupRequest: (state) => {
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      history.push("/dashboard");
    },
    signupFailure: (state, action) => {
      state.error = action.payload;
    },
    googleAuthRequest: (state) => {
      state.error = null;
    },
    googleAuthSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      history.push("/dashboard");
    },
    googleAuthFailure: (state, action) => {
      state.error = action.payload;
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    refreshTokenFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  signupRequest,
  signupSuccess,
  signupFailure,
  googleAuthRequest,
  googleAuthSuccess,
  googleAuthFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
} = authSlice.actions;
export default authSlice.reducer;
