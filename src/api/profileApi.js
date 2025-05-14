import { apiInstance } from "./api";

export const updateProfileApi = async (data, token) => {
  const res = await apiInstance.put("/api/profile/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
