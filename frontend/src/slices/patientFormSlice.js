import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, PATIENTS } from "../api/apiConfig";

export const createPatient = createAsyncThunk(
  "patientForm/createPatient",
  async (patient, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Добавьте все поля формы в formData
      Object.keys(patient).forEach((key) => {
        formData.append(key, patient[key]);
      });
      const response = await axios.post(`${BASE_URL}${PATIENTS}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Установите заголовок Content-Type в multipart/form-data
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const patientFormSlice = createSlice({
  name: "patientForm",
  initialState: { status: "idle", error: null, showForm: false }, // Добавлено состояние showForm
  reducers: {
    openForm: (state) => {
      state.showForm = true;
    },
    closeForm: (state) => {
      state.showForm = false;
    },
  }, // Добавлены действия openForm и closeForm
  extraReducers: (builder) => {
    builder.addCase(createPatient.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPatient.fulfilled, (state) => {
      state.status = "succeeded";
      state.showForm = false; // Закрываем форму после успешного создания пациента
    });
    builder.addCase(createPatient.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { openForm, closeForm } = patientFormSlice.actions; // Экспортируем действия openForm и closeForm
export const status = (state) => state.patientForm.status;
export default patientFormSlice.reducer;
