import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTH_SUCCESS, LOGOUT } from "./types";

export const login =
  (username, password, onLoginSuccess) => async (dispatch) => {
    try {
      // Отправка запроса на получение токена
      const response = await axios.post(
        "http://localhost:8000/api/auth/jwt/create/",
        {
          username,
          password,
        }
      );

      // Проверяем, что response и response.data существуют
      if (response && response.data) {
        const token = response.data.access;
        dispatch({
          type: AUTH_SUCCESS,
          payload: { token },
        });
        localStorage.setItem("token", token);
        onLoginSuccess();
      } else {
        // Обработка случая, когда response или response.data не определены
        console.error("Ответ сервера не содержит данных");
      }
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
    }
  };

export const logout = () => {
  return (dispatch) => {
    // Очистите localStorage или sessionStorage, если вы там храните токен
    localStorage.removeItem("token");
    // Отправьте действие LOGOUT в редьюсер
    dispatch({
      type: LOGOUT,
    });
  };
};
