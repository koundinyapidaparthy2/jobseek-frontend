import { Container, Typography, Box, Paper, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  BioSection,
  SkillsSection,
  JobPreferences,
  ResumeUploader,
  QRDisplay,
  ResumeAIFormModal,
  AutoAwesomeIconGradient,
  EducationSection,
  ExperienceSection,
  ProjectSection,
  CertificationSection,
} from "../components";
import {
  getProfileRequest,
  updateProfileRequest,
} from "../store/slices/profileSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { parsedProfile = {} } = useSelector((state) => state.profile);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [bio, setBio] = useState({});
  const [skills, setSkills] = useState("");
  const [jobPreferences, setJobPreferences] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const handleSaveAll = () => {
    const payload = {
      bio,
      skills,
      jobPreferences,
      education,
      experience,
      projects,
      certifications,
    };
    dispatch(updateProfileRequest(payload));
  };

  useEffect(() => {
    if (Object.keys(parsedProfile).length === 0) {
      dispatch(getProfileRequest());
    }
  }, []);

  useEffect(() => {
    if (parsedProfile?.bio?.name) {
      setBio(parsedProfile.bio);
      setSkills(parsedProfile.skills);
      setJobPreferences(parsedProfile.jobPreferences);
      setEducation(parsedProfile.education);
      setExperience(parsedProfile.experience);
      setProjects(parsedProfile.projects);
      setCertifications(parsedProfile.certifications);
    }
  }, [parsedProfile]);
  console.log("parsedProfile", parsedProfile);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Profile
        </Typography>

        <Button
          variant="contained"
          startIcon={<AutoAwesomeIconGradient />}
          onClick={() => setAiModalOpen(true)}
          sx={{
            background: "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(90deg, #00a6e0 0%, #005edc 100%)",
            },
          }}
        >
          Auto-fill with Resume
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <QRDisplay />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <BioSection form={bio} setForm={setBio} />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <SkillsSection skills={skills} setSkills={setSkills} />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <JobPreferences form={jobPreferences} setForm={setJobPreferences} />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <EducationSection
              education={education}
              setEducation={setEducation}
            />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <ExperienceSection
              experience={experience}
              setExperience={setExperience}
            />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <ProjectSection projects={projects} setProjects={setProjects} />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <CertificationSection
              certifications={certifications}
              setCertifications={setCertifications}
            />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <ResumeUploader resumeUrl={parsedProfile.resumeUrl} />
          </Paper>

          <Box textAlign="right" mt={2}>
            <Button variant="contained" size="large" onClick={handleSaveAll}>
              Save All Changes
            </Button>
          </Box>
        </Grid>
      </Grid>

      <ResumeAIFormModal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </Container>
  );
}
