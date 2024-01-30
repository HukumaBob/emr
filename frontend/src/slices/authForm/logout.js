import { createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { handleError } from "../../components/error/handlerError";

export const logout = createAsyncThunk(
  "auth/logout",
  ({ dispatch, rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return {};
    } catch (error) {
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);
