import { createReducer } from "@reduxjs/toolkit";
import { createPatient } from "./createPatient";
import { deletePatient } from "./deletePatient";
import { deletePhotoPatient } from "./deletePhotoPatient";
import { updatePatient } from "./updatePatient";
import { loadPatient } from "./loadPatient";

const reducers = {
  openForm: (state) => {
    state.showForm = true;
    state.patient = null;
  },
  closeForm: (state) => {
    state.showForm = false;
    state.status = "idle";
    state.patient = null;
  },
};

const extraReducers = (builder) => {
  builder.addCase(createPatient.pending, (state) => {
    state.status = "loading";
  });
  builder.addCase(createPatient.fulfilled, (state) => {
    state.status = "succeeded";
  });
  builder.addCase(createPatient.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  });
  builder.addCase(loadPatient.fulfilled, (state, action) => {
    state.patient = action.payload;
  });
  builder.addCase(updatePatient.fulfilled, (state, action) => {
    state.status = "succeeded";
  });
  builder.addCase(deletePatient.fulfilled, (state, action) => {
    state.status = "deleted";
  });
  builder.addCase(deletePhotoPatient.fulfilled, (state, action) => {
    state.status = "deleted";
  });

  // Добавьте дефолтный case здесь
  builder.addDefaultCase((state) => {
    return {
      ...state,
      status: "unknown",
    };
  });
};

export default createReducer(reducers, extraReducers);
