import { configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer from "../reducers";

const store = configureStore({
  reducer: rootReducer,
  //   middleware: [thunk],
});

export default store;
