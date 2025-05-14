import authReducer from "./authSlice"; // Updated to use slice
import themeReducer from "./themeSlice";
import profileReducer from "./profileSlice"; // New import for profile slice
const reducers = {
  auth: authReducer,
  theme: themeReducer,
  profile: profileReducer,
};
export default reducers; // Export all reducers
