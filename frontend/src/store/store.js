import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
