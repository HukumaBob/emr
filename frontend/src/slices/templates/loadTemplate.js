import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, TEMPLATES } from "../../api/apiConfig";

export const loadTemplate = createAsyncThunk(
  "template/loadTemplate",
  async (templateId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "get",
      `${BASE_URL}${TEMPLATES}${templateId}`,
      templateId,
      { dispatch, rejectWithValue }
    );
    return response;
  }
);
