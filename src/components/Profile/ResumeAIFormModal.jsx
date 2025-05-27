import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileRequest,
  uploadResumeRequest,
  resetResumeStatus,
} from "../../store/slices/profileSlice";
import { useSnackbar } from "notistack";
import BioSection from "./BioSection";
import SkillsSection from "./SkillsSection";
import JobPreferences from "./JobPreferences";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectSection from "./ProjectSection";
import CertificationSection from "./CertificationSection";

export default function ResumeAIFormModal({ open, onClose }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [bio, setBio] = useState({});
  const [skills, setSkills] = useState("");
  const [jobPreferences, setJobPreferences] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const { uploadProgress, resumeStatus } = useSelector(
    (state) => state.profile
  );

  const [fileName, setFileName] = useState("");

  const handleDrop = async (files) => {
    if (!files || files.length === 0) {
      enqueueSnackbar(
        "Invalid file. Please select a PDF or Word document under 1MB.",
        {
          variant: "error",
        }
      );
      return;
    }

    const file = files[0];

    const isAllowedType =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isAllowedType) {
      enqueueSnackbar("Only PDF or Word documents are allowed", {
        variant: "error",
      });
      return;
    }

    if (file.size > 1024 * 1024) {
      enqueueSnackbar("File size must be less than or equal to 1MB", {
        variant: "error",
      });
      return;
    }

    setFileName(file.name);
    dispatch(uploadResumeRequest(file));
  };

  const handleSave = () => {
    const payload = {
      bio,
      skills,
      jobPreferences,
      education,
      experience,
      projects,
      certifications,
      resumeUrl: resumeStatus.profile?.resumeUrl,
    };

    dispatch(updateProfileRequest(payload));
    handleClose(); // use the reset version
  };

  const handleClose = () => {
    dispatch(resetResumeStatus());
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
    multiple: false,
    maxFiles: 1,
    disabled: resumeStatus.status === "processing",
  });

  useEffect(() => {
    if (resumeStatus.status === "completed" && resumeStatus.profile) {
      const parsed = resumeStatus.profile;
      setSkills((parsed.skills || []).join(", "));
      setJobPreferences(parsed.jobPreferences || {});
      setBio(parsed.bio || {});
      setEducation(parsed.education || []);
      setExperience(parsed.experience || []);
      setProjects(parsed.projects || []);
      setCertifications(parsed.certifications || []);
    } else {
      setSkills("");
      setJobPreferences({});
      setBio({});
      setEducation([]);
      setExperience([]);
      setProjects([]);
      setCertifications([]);
      setFileName("");
    }
  }, [resumeStatus, dispatch]);
  console.log({
    bio,
    skills,
    jobPreferences,
    education,
    experience,
    projects,
    resumeStatus,
  });
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Auto-fill Profile with Resume</DialogTitle>

      <DialogContent dividers>
        {!bio?.name ? (
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed",
              borderColor: "#ccc",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
              position: "relative",
              borderRadius: "16px",
              textAlign: "center",
              animation:
                resumeStatus.status === "processing"
                  ? "glowBorder 2s ease-in-out infinite"
                  : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                resumeStatus.status === "processing"
                  ? "0 0 20px 5px rgba(0, 114, 255, 0.4)"
                  : "0 0 8px rgba(0,0,0,0.05)",
              "&:hover": {
                boxShadow:
                  resumeStatus.status === "processing"
                    ? "0 0 25px 6px rgba(0, 114, 255, 0.5)"
                    : "0 0 8px rgba(0,0,0,0.1)",

                borderColor: "primary.main",
                backgroundColor: "#f0f0f0",
              },
              "@keyframes glowBorder": {
                "0%": {
                  boxShadow: "0 0 10px #00c6ff, 0 0 20px #0072ff",
                },
                "50%": {
                  boxShadow: "0 0 20px #00c6ff, 0 0 30px #0072ff",
                },
                "100%": {
                  boxShadow: "0 0 10px #00c6ff, 0 0 20px #0072ff",
                },
              },
            }}
          >
            <input {...getInputProps()} />
            <UploadFileIcon
              sx={{ fontSize: 40, color: "text.secondary", mt: 1 }}
            />

            <Typography variant="h6" sx={{ mb: 1 }} color="text.secondary">
              {resumeStatus.status === "processing" ? (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress
                    variant={uploadProgress ? "determinate" : "indeterminate"}
                    value={uploadProgress}
                    size={60}
                    thickness={4}
                    sx={{ color: "#00c6ff", mb: 1 }}
                  />
                  <Typography variant="caption">
                    {uploadProgress ? `${uploadProgress}%` : "Parsing..."}
                  </Typography>
                </Box>
              ) : (
                "Upload Your Resume"
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Drag & drop your resume (PDF or Word, max 1MB), or click to upload
            </Typography>
            {fileName && (
              <Typography variant="caption" mt={2}>
                Selected: {fileName}
              </Typography>
            )}
            {resumeStatus.status === "failed" && (
              <Typography variant="caption" color="error" mt={1}>
                Parsing failed: {resumeStatus.error}
              </Typography>
            )}
          </Box>
        ) : (
          <Stack spacing={4} sx={{ pr: 1 }}>
            <BioSection form={bio} setForm={setBio} />
            <SkillsSection skills={skills} setSkills={setSkills} />
            <EducationSection
              education={education}
              setEducation={setEducation}
            />
            <ExperienceSection
              experience={experience}
              setExperience={setExperience}
            />
            <ProjectSection projects={projects} setProjects={setProjects} />
            <CertificationSection
              certifications={certifications}
              setCertifications={setCertifications}
            />
            <JobPreferences form={jobPreferences} setForm={setJobPreferences} />
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {bio?.name && (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
