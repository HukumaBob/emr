// В файле slices/patientsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, PATIENTS } from "../api/apiConfig";
import { PAGE_SIZE } from "../api/apiConfig";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}${PATIENTS}?page=${page}&page_size=${PAGE_SIZE}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      state.totalPages = Math.ceil(action.payload.count / PAGE_SIZE); // Предполагая, что размер страницы равен 10
      // return action.payload;
    });
  },
});

export const { setCurrentPage } = patientsSlice.actions;
export default patientsSlice.reducer;
