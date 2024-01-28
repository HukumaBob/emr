import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, PATIENTS } from "../../api/apiConfig";

export const loadPatient = createAsyncThunk(
  "patientForm/loadPatient",
  async (patientId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "get",
      `${BASE_URL}${PATIENTS}${patientId}`,
      patientId,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
