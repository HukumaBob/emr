import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, RECORDS } from "../../api/apiConfig";

export const updateRecord = createAsyncThunk(
  "recordForm/updateRecord",
  async (
    { fileInput, fieldName, ...record },
    { dispatch, rejectWithValue }
  ) => {
    const formData = new FormData();

    // Добавьте все поля формы в formData
    Object.keys(record).forEach((key) => {
      if (key !== fieldName && record[key] !== null) {
        formData.append(key, record[key]);
      }
    });

    // Если файл был выбран, добавьте его в formData
    if (fileInput && fileInput.current.files[0]) {
      formData.append(fieldName, fileInput.current.files[0]);
    }

    const response = await apiRequest(
      "putForm",
      `${BASE_URL}${RECORDS}${record.id}/`,
      formData,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
