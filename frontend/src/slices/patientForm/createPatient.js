import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, PATIENTS } from "../../api/apiConfig";

export const createPatient = createAsyncThunk(
  "patientForm/createPatient",
  async (patient, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "postForm",
      `${BASE_URL}${PATIENTS}`,
      patient,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
