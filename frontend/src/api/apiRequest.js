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
    // Получите токен из localStorage
    const token = localStorage.getItem("token");

    // Создайте конфигурацию для axios
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios[method](url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error, dispatch, rejectWithValue);
  }
};
