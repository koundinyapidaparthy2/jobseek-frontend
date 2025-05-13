import axios from "axios";
import config from "../config";

export const BACKEND_URL = config.backendUrl;

export const apiInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally, add interceptors here if needed
