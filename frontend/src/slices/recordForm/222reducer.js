import { createReducer } from "@reduxjs/toolkit";
import { createRecord } from "./createRecord";
import { deleteRecord } from "./deleteRecord";
import { deletePhotoRecord } from "./deletePhotoRecord";
import { updateRecord } from "./updateRecord";
import { loadRecord } from "./loadRecord";

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
  builder.addCase(createRecord.pending, (state) => {
    state.status = "loading";
  });
  builder.addCase(createRecord.fulfilled, (state) => {
    state.status = "succeeded";
  });
  builder.addCase(createRecord.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  });
  builder.addCase(loadRecord.fulfilled, (state, action) => {
    state.patient = action.payload;
  });
  builder.addCase(updateRecord.fulfilled, (state, action) => {
    state.status = "succeeded";
  });
  builder.addCase(deleteRecord.fulfilled, (state, action) => {
    state.status = "deleted";
  });
  builder.addCase(deletePhotoRecord.fulfilled, (state, action) => {
    state.status = "deleted";
  });

  builder.addDefaultCase((state) => {
    return {
      ...state,
      status: "unknown",
    };
  });
};

export default createReducer(reducers, extraReducers);
