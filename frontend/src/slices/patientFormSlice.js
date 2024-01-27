import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, PATIENTS } from "../api/apiConfig";
import { handleError } from "../components/error/handlerError";

export const createPatient = createAsyncThunk(
  "patientForm/createPatient",
  async (patient, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Добавьте все поля формы в formData
      Object.keys(patient).forEach((key) => {
        if (patient[key] !== null) {
          formData.append(key, patient[key]);
        }
      });

      const response = await axios.postForm(`${BASE_URL}${PATIENTS}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadPatient = createAsyncThunk(
  "patientForm/loadPatient",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}${PATIENTS}${patientId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patientForm/deletePatient",
  async (patientId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}${PATIENTS}${patientId}`);
      return response.data;
    } catch (error) {
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);

export const deletePhotoPatient = createAsyncThunk(
  "patientForm/deletePhotoPatient",
  async (patientId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}${PATIENTS}${patientId}/delete_photo`
      );
      return response.data;
    } catch (error) {
      return handleError(error, dispatch, rejectWithValue);
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patientForm/updatePatient",
  async ({ fileInput, ...patient }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Добавьте все поля формы в formData
      Object.keys(patient).forEach((key) => {
        if (key !== "photo" && patient[key] !== null) {
          formData.append(key, patient[key]);
        }
      });

      // Если файл был выбран, добавьте его в formData
      if (fileInput.current.files[0]) {
        formData.append("photo", fileInput.current.files[0]);
      }

      const response = await axios.putForm(
        `${BASE_URL}${PATIENTS}${patient.id}/`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const patientFormSlice = createSlice({
  name: "patientForm",
  initialState: { status: "idle", error: null, showForm: false, patient: null }, // Добавлено состояние showForm
  reducers: {
    openForm: (state) => {
      state.showForm = true;
      state.patient = null;
    },
    closeForm: (state) => {
      state.showForm = false;
      state.status = "idle";
      state.patient = null;
    },
  }, // Добавлены действия openForm и closeForm
  extraReducers: (builder) => {
    builder.addCase(createPatient.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPatient.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(createPatient.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(loadPatient.fulfilled, (state, action) => {
      state.patient = action.payload;
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Обновите данные пациента в состоянии, если это необходимо
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.status = "deleted";
    });
    builder.addCase(deletePhotoPatient.fulfilled, (state, action) => {
      state.status = "deleted";
    });
  },
});

export const { openForm, closeForm } = patientFormSlice.actions; // Экспортируем действия openForm и closeForm
export const status = (state) => state.patientForm.status;
export default patientFormSlice.reducer;
