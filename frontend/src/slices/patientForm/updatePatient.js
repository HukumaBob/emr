import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, PATIENTS } from "../../api/apiConfig";

export const updatePatient = createAsyncThunk(
  "patientForm/updatePatient",
  async (
    { fileInput, fieldName, ...patient },
    { dispatch, rejectWithValue }
  ) => {
    const formData = new FormData();

    // Добавьте все поля формы в formData
    Object.keys(patient).forEach((key) => {
      if (key !== fieldName && patient[key] !== null) {
        formData.append(key, patient[key]);
      }
    });

    // Если файл был выбран, добавьте его в formData
    if (fileInput && fileInput.current.files[0]) {
      formData.append(fieldName, fileInput.current.files[0]);
    }

    const response = await apiRequest(
      "putForm",
      `${BASE_URL}${PATIENTS}${patient.id}/`,
      formData,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
