import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { updateProfileRequest } from "../../store/slices/profileSlice";

export default function ResumeAIFormModal({ open, onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleDrop = (files) => {
    const file = files[0];
    setFileName(file.name);

    // Simulate AI parsing — replace this with real API
    const parsed = {
      name: "Koundinya Pidaparthy",
      bio: "Experienced Full Stack Developer",
      skills: "React, Node.js",
      jobTitle: "Frontend Developer",
      jobLocation: "Remote",
      jobMode: "Remote",
    };
    setForm(parsed);
  };

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    dispatch(updateProfileRequest(form));
    onClose();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Auto-fill Profile with Resume</DialogTitle>

      <DialogContent dividers>
        {!form ? (
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed",
              borderColor: "divider",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
            }}
          >
            <input {...getInputProps()} />
            <UploadFileIcon sx={{ fontSize: 40 }} />
            <Typography variant="body2" mt={1}>
              Drag & drop your resume here or click to upload
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              value={form.name}
              onChange={handleChange("name")}
              fullWidth
            />
            <TextField
              label="About You"
              value={form.bio}
              onChange={handleChange("bio")}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange("skills")}
              fullWidth
            />
            <TextField
              label="Preferred Job Title"
              value={form.jobTitle}
              onChange={handleChange("jobTitle")}
              fullWidth
            />
            <TextField
              label="Preferred Location"
              value={form.jobLocation}
              onChange={handleChange("jobLocation")}
              fullWidth
            />
            <TextField
              label="Work Mode"
              value={form.jobMode}
              onChange={handleChange("jobMode")}
              fullWidth
            />
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {form && (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
