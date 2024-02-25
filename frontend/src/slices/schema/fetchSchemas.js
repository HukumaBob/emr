import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, SCHEMAS, PAGE_SIZE } from "../../api/apiConfig";
import { handleError } from "../../components/error/handlerError";

export const fetchSchemas = createAsyncThunk(
  "schema/fetchSchemas",
  async (arg, { dispatch, rejectWithValue }) => {
    const { page, filters } =
      typeof arg === "object" ? arg : { page: arg, filters: {} };
    const filterParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(
        `${BASE_URL}${SCHEMAS}?page=${page}&page_size=${PAGE_SIZE}&${filterParams}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);
