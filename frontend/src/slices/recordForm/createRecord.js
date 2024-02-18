import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, RECORDS } from "../../api/apiConfig";

export const createRecord = createAsyncThunk(
  "recordForm/createRecord",
  async (record, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "postForm",
      `${BASE_URL}${RECORDS}`,
      record,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
