import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, RECORDS } from "../../api/apiConfig";

export const deleteRecord = createAsyncThunk(
  "recordForm/deleteRecord",
  async (recordId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "delete",
      `${BASE_URL}${RECORDS}${recordId}`,
      recordId,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
