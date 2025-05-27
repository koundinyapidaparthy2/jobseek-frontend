// src/components/ResumeBuilder.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { uploadTemplateRequest } from "../store/slices/templates/resumeTemplateSlice";

export default function ResumeBuilder() {
  const dispatch = useDispatch();
  const { templates, loading, generatedHtml } = useSelector(
    (state) => state.resumeTemplate
  );

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (file) {
      dispatch(uploadTemplateRequest(file));
      setOpen(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Resume Templates
      </Typography>
      <Grid container spacing={2}>
        {templates.map((template, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="body1" fontWeight={500}>
                {template.name}
              </Typography>
              {/* render preview here if needed */}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <IconButton onClick={() => setOpen(true)} sx={{ mt: 3 }}>
        <AddCircleOutlineIcon fontSize="large" color="primary" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Upload Resume (PDF / DOCX)</DialogTitle>
        <DialogContent>
          <Box
            {...getRootProps()}
            sx={{
              p: 4,
              border: "2px dashed #ccc",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <input {...getInputProps()} />
            <UploadFileIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography>Drag & drop a resume, or click to select</Typography>
            {file && <Typography mt={1}>{file.name}</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpload}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <CircularProgress sx={{ mt: 3 }} />}

      {generatedHtml && (
        <Box mt={4} p={2} border="1px solid #ccc" borderRadius={2}>
          <Typography variant="h6">Generated Resume</Typography>
          <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
        </Box>
      )}
    </Box>
  );
}
