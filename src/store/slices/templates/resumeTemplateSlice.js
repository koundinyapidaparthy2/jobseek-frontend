// --- Redux Slice: resumeTemplateSlice.js ---
import { createSlice } from "@reduxjs/toolkit";

const resumeTemplateSlice = createSlice({
  name: "resumeTemplate",
  initialState: {
    loading: false,
    error: null,
    templates: [],
    generatedHtml: null,
    mustacheTemplate: null,
  },
  reducers: {
    uploadTemplateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadTemplateSuccess: (state, action) => {
      state.loading = false;
      state.generatedHtml = action.payload.renderedHtml;
      state.mustacheTemplate = action.payload.mustacheTemplate;
    },
    uploadTemplateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearGeneratedTemplate: (state) => {
      state.generatedHtml = null;
      state.mustacheTemplate = null;
    },
  },
});

export const {
  uploadTemplateRequest,
  uploadTemplateSuccess,
  uploadTemplateFailure,
  clearGeneratedTemplate,
} = resumeTemplateSlice.actions;

export default resumeTemplateSlice.reducer;
