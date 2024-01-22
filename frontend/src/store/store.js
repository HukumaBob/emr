import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import patientsReducer from "../slices/patientsSlice";
import patientFormReducer from "../slices/patientFormSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientsReducer,
  patientForm: patientFormReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
