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
  devTools: {
    serialize: {
      replacer: (key, value) => {
        if (key === "fileInput") return undefined;
        else return value;
      },
    },
  },
});

export default store;
