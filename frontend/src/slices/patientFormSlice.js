import { createSlice } from "@reduxjs/toolkit";
import { createPatient } from "./patientForm/createPatient";
import { deletePatient } from "./patientForm/deletePatient";
import { deletePhotoPatient } from "./patientForm/deletePhotoPatient";
import { updatePatient } from "./patientForm/updatePatient";
import { loadPatient } from "./patientForm/loadPatient";
// import reducers from "./patientForm/reducer.js";

const patientFormSlice = createSlice({
  name: "patientForm",
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
    builder.addDefaultCase((state) => state);
  },
});

export const { openForm, closeForm } = patientFormSlice.actions;
export const status = (state) => state.patientForm.status;
export default patientFormSlice.reducer;
