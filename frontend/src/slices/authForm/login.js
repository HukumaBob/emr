import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../components/error/handlerError";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, LOGIN_ENDPOINT, ME, PROFILE } from "../../api/apiConfig";

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
      const meResponse = await axios.get(`${BASE_URL}${ME}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const id = meResponse.data.id;
      const profileResponse = await axios.get(`${BASE_URL}${PROFILE}${id}`);
      const profile = profileResponse.data;
      if (profile) {
        localStorage.setItem("id", id);
        localStorage.setItem("profile", JSON.stringify(profile));
      }
      return { token, username, id, profile };
    } catch (error) {
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);
