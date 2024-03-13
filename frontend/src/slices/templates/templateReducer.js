import { createSlice } from "@reduxjs/toolkit";
import { fetchTemplates } from "./fetchTemplates";
import { loadTemplate } from "./loadTemplate";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    templates: [],
    currentTemplate: null,
    // formOpen: false,
    loading: false,
    error: null,
  },
  reducers: {
    templatesLoaded(state, action) {
      state.templates = action.payload.results;
      state.loading = false;
    },
    closeTemplateForm(state) {
      state.currentTemplate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.templates = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(loadTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTemplate.fulfilled, (state, action) => {
        state.currentTemplate = action.payload;
        state.loading = false;
      })
      .addCase(loadTemplate.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { templatesLoaded, closeTemplateForm } = templateSlice.actions;
export default templateSlice.reducer;
