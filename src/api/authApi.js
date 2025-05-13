import { apiInstance } from "./api";

const API_URL = "/api/auth";

export const signupApi = async (data) => {
  const res = await apiInstance.post(`${API_URL}/signup`, data);
  return res.data;
};

export const loginApi = async (data) => {
  const res = await apiInstance.post(`${API_URL}/login`, data);
  return res.data;
};

export const googleAuthApi = async (data) => {
  const res = await apiInstance.post(`${API_URL}/google`, data);
  return res.data;
};

export const refreshTokenApi = async (refreshToken) => {
  const res = await apiInstance.post(`${API_URL}/refresh`, { refreshToken });
  return res.data;
};
