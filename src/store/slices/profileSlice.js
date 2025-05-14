import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    updateProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} = profileSlice.actions;
export default profileSlice.reducer;
