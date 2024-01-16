import axios from "axios";
import { AUTH_SUCCESS, LOGOUT } from "./types";

export const login = (username, password) => async (dispatch) => {
  try {
    // Отправка запроса на получение токена
    const response = await axios.post(
      "http://localhost:8000/api/auth/jwt/create/",
      {
        username,
        password,
      }
    );

    const token = response.data.access;

    dispatch({
      type: AUTH_SUCCESS,
      payload: { token },
    });
  } catch (error) {
    // Обработка ошибок при входе
    console.error("Login error:", error);
  }
};

export const logout = () => ({
  type: LOGOUT,
});
