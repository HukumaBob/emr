import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, SCHEMAS } from "../../api/apiConfig";

export const loadRecord = createAsyncThunk(
  "recordForm/loadRecord",
  async (schemadId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "get",
      `${BASE_URL}${SCHEMAS}${schemadId}`,
      schemadId,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
