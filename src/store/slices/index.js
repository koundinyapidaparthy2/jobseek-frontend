import authReducer from "./authSlice"; // Updated to use slice
import themeReducer from "./themeSlice";
import profileReducer from "./profileSlice"; // New import for profile slice
import resumeTemplateReducer from "../slices/templates/resumeTemplateSlice";
const reducers = {
  auth: authReducer,
  theme: themeReducer,
  profile: profileReducer,
  resumeTemplate: resumeTemplateReducer,
};
export default reducers; // Export all reducers
