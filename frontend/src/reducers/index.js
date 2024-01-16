import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Подставьте путь к вашему редюсеру авторизации
import userReducer from "./userReducer"; // Подставьте путь к вашему редюсеру пользователей

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  // Добавьте другие редюсеры при необходимости
});

export default rootReducer;
