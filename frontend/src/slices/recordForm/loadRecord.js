import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, RECORDS } from "../../api/apiConfig";

export const loadRecord = createAsyncThunk(
  "recordForm/loadRecord",
  async (recordId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "get",
      `${BASE_URL}${RECORDS}${recordId}`,
      recordId,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
