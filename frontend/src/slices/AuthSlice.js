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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      action.meta.arg.onLoginSuccess();
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
    });
  },
});

export const token = (state) => state.auth.token;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const username = (state) => state.auth.username;
export default authSlice.reducer;
