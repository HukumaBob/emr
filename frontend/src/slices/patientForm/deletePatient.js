import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, PATIENTS } from "../../api/apiConfig";

export const deletePatient = createAsyncThunk(
  "patientForm/deletePatient",
  async (patientId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "delete",
      `${BASE_URL}${PATIENTS}${patientId}`,
      patientId,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
