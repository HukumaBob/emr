// В файле slices/patientsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, PATIENTS } from "../api/apiConfig";
import { PAGE_SIZE } from "../api/apiConfig";
import { handleError } from "../components/error/handlerError";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (arg, { dispatch, rejectWithValue }) => {
    const { page, filters } =
      typeof arg === "object" ? arg : { page: arg, filters: {} };
    const filterParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(
        `${BASE_URL}${PATIENTS}?page=${page}&page_size=${PAGE_SIZE}&${filterParams}`
      );
      console.log(
        `${BASE_URL}${PATIENTS}?page=${page}&page_size=${PAGE_SIZE}&${filterParams}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState: { patients: [], totalPages: 0, currentPage: 1 },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.patients = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / PAGE_SIZE);
    });
  },
});

export const { setCurrentPage } = patientsSlice.actions;
export default patientsSlice.reducer;
