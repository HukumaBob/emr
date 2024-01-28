// apiRequest.js
import axios from "axios";
import { handleError } from "../components/error/handlerError";

export const apiRequest = async (
  method,
  url,
  data = null,
  { dispatch, rejectWithValue }
) => {
  try {
    const response = await axios[method](url, data);
    return response.data;
  } catch (error) {
    return handleError(error, dispatch, rejectWithValue);
  }
};
