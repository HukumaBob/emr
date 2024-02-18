import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, RECORDS } from "../../api/apiConfig";

export const deletePhotoRecord = createAsyncThunk(
  "recordForm/deletePhotoRecord",
  async (recordId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "delete",
      `${BASE_URL}${RECORDS}${recordId}/delete_photo`,
      recordId,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
