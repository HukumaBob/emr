// В файле slices/recordsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, RECORDS, PAGE_SIZE } from "../api/apiConfig";
import { handleError } from "../components/error/handlerError";

export const fetchRecords = createAsyncThunk(
  "records/fetchRecords",
  async (arg, { dispatch, rejectWithValue }) => {
    const { page, patient_id } =
      typeof arg === "object" ? arg : { page: arg, patient_id: null };
    try {
      const response = await fetch(
        `${BASE_URL}${RECORDS}?patient_id=${patient_id}&page=${page}&page_size=${PAGE_SIZE}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);

export const recordsSlice = createSlice({
  name: "records",
  initialState: { records: [], totalPages: 0, currentPage: 1 },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      state.records = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / PAGE_SIZE);
    });
  },
});

export const { setCurrentPage } = recordsSlice.actions;
export default recordsSlice.reducer;
