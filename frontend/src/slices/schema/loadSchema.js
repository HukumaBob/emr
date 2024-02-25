import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiRequest";
import { BASE_URL, SCHEMAS } from "../../api/apiConfig";
import { openSchemaForm } from "./schemaReducer";

export const loadSchema = createAsyncThunk(
  "schema/loadSchema",
  async (schemadId, { dispatch, rejectWithValue }) => {
    const response = await apiRequest(
      "get",
      `${BASE_URL}${SCHEMAS}${schemadId}`,
      schemadId,
      { dispatch, rejectWithValue }
    );
    if (response) {
      dispatch(openSchemaForm(response));
    }
    return response;
  }
);
