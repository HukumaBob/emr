import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, PATIENTS } from "../../api/apiConfig";

export const deletePhotoPatient = createAsyncThunk(
  "patientForm/deletePhotoPatient",
  async (patientId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "delete",
      `${BASE_URL}${PATIENTS}${patientId}/delete_photo`,
      patientId,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
