import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function ResumeUploader() {
  const theme = useTheme();
  const [resumeFile, setResumeFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleUpload = (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    if (type === "resume") setResumeFile(file);
    if (type === "cover") setCoverFile(file);
    // TODO: call upload API
  };

  const ResumeDropzone = useDropzone({
    onDrop: (files) => handleUpload(files, "resume"),
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  const CoverDropzone = useDropzone({
    onDrop: (files) => handleUpload(files, "cover"),
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Upload Resume & Cover Letter</Typography>

      <Box
        {...ResumeDropzone.getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: "#ccc",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          p: 4,
          textAlign: "center",
          transition: "all 0.2s",
          "&:hover": {
            borderColor: "primary.main",
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <input {...ResumeDropzone.getInputProps()} />
        <UploadFileIcon sx={{ fontSize: 40, color: "text.secondary" }} />
        <Typography variant="body2" mt={1}>
          Drag & drop <strong>resume</strong> here, or click to browse
        </Typography>
        {resumeFile && (
          <Typography variant="caption" mt={1}>
            {resumeFile.name}
          </Typography>
        )}
      </Box>

      <Box
        {...CoverDropzone.getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: "#ccc",
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <input {...CoverDropzone.getInputProps()} />
        <UploadFileIcon fontSize="large" />
        <Typography variant="body2" mt={1}>
          Drag & drop <strong>cover letter</strong> here, or click to browse
        </Typography>
        {coverFile && (
          <Typography variant="caption" mt={1}>
            Selected: {coverFile.name}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
