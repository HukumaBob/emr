import { createSlice } from "@reduxjs/toolkit";
import { createRecord } from "./recordForm/createRecord";
import { deleteRecord } from "./recordForm/deleteRecord";
import { deletePhotoRecord } from "./recordForm/deletePhotoRecord";
import { updateRecord } from "./recordForm/updateRecord";
import { loadRecord } from "./recordForm/loadRecord";

const recordFormSlice = createSlice({
  name: "recordForm",
  initialState: { status: "idle", error: null, showForm: false, patient: null },
  reducers: {
    openForm: (state) => {
      state.showForm = true;
      state.patient = null;
    },
    closeForm: (state) => {
      state.showForm = false;
      state.status = "idle";
      state.patient = null;
    },
  },
  extraReducers: (builder) => {
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
    builder.addDefaultCase((state) => state);
  },
});

export const { openForm, closeForm } = recordFormSlice.actions;
export const status = (state) => state.patientForm.status;
export default recordFormSlice.reducer;
