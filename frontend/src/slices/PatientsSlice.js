// В файле slices/patientsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, PATIENTS } from "../api/apiConfig";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await fetch(`${BASE_URL}${PATIENTS}`);
    const data = await response.json();
    return data;
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      console.log("first");
      return action.payload;
    });
  },
});

export default patientsSlice.reducer;
