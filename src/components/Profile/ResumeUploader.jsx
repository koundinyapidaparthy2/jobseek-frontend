import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  Link,
  Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { downloadResumeRequest } from "../../store/slices/profileSlice";
export default function ResumeUploader({ resumeUrl, coverLetterUrl }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [resumeFile, setResumeFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const downloadViaAnchor = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // Doesn't force download for signed URLs
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleUpload = (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    if (type === "resume") setResumeFile(file);
    if (type === "cover") setCoverFile(file);
    // TODO: call upload API here
  };

  const onClickDownloadResume = () => {
    dispatch(downloadResumeRequest({ resumeUrl }));
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

  const dropzoneStyles = {
    border: "2px dashed #ccc",
    borderRadius: "12px",
    backgroundColor: "#fafafa",
    p: 4,
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s ease",
    "&:hover": {
      borderColor: "primary.main",
      backgroundColor: "#f4f9ff",
    },
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" fontWeight={600}>
        Resume & Cover Letter
      </Typography>

      {/* Resume Section */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Resume
        </Typography>

        {resumeUrl && (
          <Box mb={2}>
            <Button
              startIcon={<CloudDownloadIcon />}
              variant="outlined"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 2.5,
                py: 1.2,
              }}
              onClick={onClickDownloadResume}
            >
              Download Resume
            </Button>
          </Box>
        )}

        <Box {...ResumeDropzone.getRootProps()} sx={dropzoneStyles}>
          <input {...ResumeDropzone.getInputProps()} />
          <UploadFileIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography variant="body2" mt={1}>
            Drag & drop <strong>resume</strong> here, or click to upload new
          </Typography>
          {resumeFile && (
            <Typography variant="caption" mt={1}>
              Selected: {resumeFile.name}
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Cover Letter Section */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Cover Letter
        </Typography>

        {coverLetterUrl && (
          <Box mb={2}>
            <Link href={coverLetterUrl} target="_blank" underline="none">
              <Button
                startIcon={<CloudDownloadIcon />}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 2.5,
                  py: 1.2,
                }}
              >
                Download Cover Letter
              </Button>
            </Link>
          </Box>
        )}

        <Box {...CoverDropzone.getRootProps()} sx={dropzoneStyles}>
          <input {...CoverDropzone.getInputProps()} />
          <UploadFileIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography variant="body2" mt={1}>
            Drag & drop <strong>cover letter</strong> here, or click to upload
            new
          </Typography>
          {coverFile && (
            <Typography variant="caption" mt={1}>
              Selected: {coverFile.name}
            </Typography>
          )}
        </Box>
      </Paper>
    </Stack>
  );
}
