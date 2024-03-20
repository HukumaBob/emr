import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { login } from "./authForm/login";
import { logout } from "./authForm/logout";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    id: localStorage.getItem("id") || null,
    profile: localStorage.getItem("profile") || null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.profile = action.payload.profile;
      action.meta.arg.onLoginSuccess();
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
      state.id = null;
      state.profile = null;
    });
  },
});

export const token = (state) => state.auth.token;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const username = (state) => state.auth.username;
export const me = (state) => state.auth.me;
export const profile = (state) => state.auth.profile;
export default authSlice.reducer;
