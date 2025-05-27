import { apiInstance } from "./api";

export const updateProfileApi = async (data, token) => {
  const res = await apiInstance.put("/api/profile/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getProfileApi = async (token) => {
  const res = await apiInstance.get("/api/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const uploadResumeToFirestoreApi = (file, token, onUploadProgress) => {
  const formData = new FormData();
  formData.append("resume", file);

  return apiInstance.post("/api/profile/upload-autofill-resume", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress, // 👈 support for tracking
  });
};

export const checkResumeStatusApi = async (token) => {
  return apiInstance.get("/api/profile/upload-autofill-resume/status", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const generateAboutApi = async (profileData, token) => {
  const res = await apiInstance.post(
    "/api/profile/generate-about",
    { profile: profileData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const downloadResumeViaBackend = async (fileUrl, token) => {
  const res = await apiInstance.post(
    "/api/profile/download-resume",
    { fileUrl },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
