import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import patientsReducer from "../slices/PatientsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
