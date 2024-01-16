import axios from "axios";
import { FETCH_USERS_SUCCESS } from "./types";

export const fetchUsers = () => async (dispatch) => {
  try {
    // Отправка запроса на получение списка пользователей
    const response = await axios.get("http://localhost:8000/api/auth/users/");

    const users = response.data;

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: { users },
    });
  } catch (error) {
    // Обработка ошибок при получении списка пользователей
    console.error("Fetch users error:", error);
  }
};
