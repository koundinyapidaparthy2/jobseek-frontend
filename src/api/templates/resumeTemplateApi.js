import { apiInstance } from "../api";

export const uploadResumeTemplateApi = async (formData, token) => {
  const res = await apiInstance.post(
    "/api/templates/resume/upload-resume-html",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
