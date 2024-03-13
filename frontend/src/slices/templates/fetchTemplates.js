import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, TEMPLATES, PAGE_SIZE } from "../../api/apiConfig";
import { handleError } from "../../components/error/handlerError";

export const fetchTemplates = createAsyncThunk(
  "template/fetchTemplates",
  async (arg, { dispatch, rejectWithValue }) => {
    const { page, page_size, filters } =
      typeof arg === "object" ? arg : { page: arg, filters: {} };
    const filterParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(
        `${BASE_URL}${TEMPLATES}?page=${page}&page_size=${page_size}&${filterParams}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);
