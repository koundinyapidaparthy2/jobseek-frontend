import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { currentTheme: "light" }, // Store theme as "light" or "dark"
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
    },
    setThemeAsync: (state, action) => {
      // This action will be handled by saga, so no state change here
    },
  },
});

export const { toggleTheme, setThemeAsync } = themeSlice.actions;
export default themeSlice.reducer;
