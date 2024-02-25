import { createSlice } from "@reduxjs/toolkit";
import { fetchSchemas } from "./fetchSchemas";

const schemaSlice = createSlice({
  name: "schema",
  initialState: {
    schemas: [],
    currentSchema: null,
    formOpen: false,
    loading: false,
    error: null,
  },
  reducers: {
    schemasLoaded(state, action) {
      state.schemas = action.payload.results;
      state.loading = false;
    },
    openSchemaForm(state, action) {
      state.currentSchema = action.payload;
      state.formOpen = true;
    },
    closeSchemaForm(state) {
      state.currentSchema = null;
      state.formOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchemas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchemas.fulfilled, (state, action) => {
        state.schemas = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchSchemas.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { schemasLoaded, openSchemaForm, closeSchemaForm } =
  schemaSlice.actions;
export default schemaSlice.reducer;
