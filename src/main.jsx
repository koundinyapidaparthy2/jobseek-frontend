import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signup from "./pages/Signup.jsx"; // Adjust if path is different
import { Provider } from "react-redux";
import store from "./store/store";

// Create root
const root = createRoot(document.getElementById("root"));

// Minimal render for Zoid iframe
if (window.location.pathname === "/zoid-signup") {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <Signup />
      </Provider>
    </StrictMode>
  );
} else {
  // Full app render
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
