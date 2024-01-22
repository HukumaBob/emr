import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, LOGIN_ENDPOINT } from "../api/apiConfig";

// Создаем асинхронные действия
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}${LOGIN_ENDPOINT}`, {
        username,
        password,
      });
      const token = response.data ? response.data.access : null;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
      }
      return { token, username };
    } catch (error) {
      toast.warning(`Login failed: ${error.response.data.detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  return {};
});

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
