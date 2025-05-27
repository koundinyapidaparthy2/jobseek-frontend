import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    parsedProfile: {},
    uploadProgress: 0,
    generatedAbout: [],
    aboutLoading: false,
    aboutError: null,
    resumeStatus: {
      status: null,
      profile: null,
      processId: null,
      error: null,
    },
  },
  reducers: {
    getProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.parsedProfile = action.payload; // update local state
      state.resumeStatus = {
        status: null,
        profile: null,
        processId: null,
        error: null,
      };
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadResumeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadResumeSuccess: (state, action) => {
      state.loading = false;
      state.parsedProfile = action.payload;
    },
    uploadResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setResumeStatus: (state, action) => {
      state.resumeStatus = action.payload;
    },
    resetResumeStatus: (state) => {
      state.resumeStatus = {
        status: null,
        profile: null,
        processId: null,
        error: null,
      };
    },
    generateAboutRequest: (state) => {
      state.aboutLoading = true;
      state.aboutError = null;
    },
    generateAboutSuccess: (state, action) => {
      state.aboutLoading = false;
      state.generatedAbout = action.payload; // array of 3 summaries
    },
    generateAboutFailure: (state, action) => {
      state.aboutLoading = false;
      state.aboutError = action.payload;
    },
    downloadResumeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    downloadResumeSuccess: (state) => {
      state.loading = false;
    },
    downloadResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  uploadResumeRequest,
  uploadResumeSuccess,
  uploadResumeFailure,
  setUploadProgress,
  setResumeStatus,
  resetResumeStatus,
  getProfileRequest,
  generateAboutRequest,
  generateAboutSuccess,
  generateAboutFailure,
  downloadResumeRequest,
  downloadResumeSuccess,
  downloadResumeFailure,
} = profileSlice.actions;
export default profileSlice.reducer;
