import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import patientsReducer from "../slices/patientsSlice";
import recordsReducer from "../slices/recordsSlice";
import patientFormReducer from "../slices/patientFormSlice";
import recordFormReducer from "../slices/recordFormSlice";
import errorReducer from "../slices/errorSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientsReducer,
  records: recordsReducer,
  patientForm: patientFormReducer,
  recordForm: recordFormReducer,
  error: errorReducer,
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
