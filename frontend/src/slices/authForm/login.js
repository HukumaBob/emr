import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../components/error/handlerError";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, LOGIN_ENDPOINT } from "../../api/apiConfig";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
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
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);
