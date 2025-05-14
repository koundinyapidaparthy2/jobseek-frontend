import { Container, Typography, Box, Paper, Grid, Button } from "@mui/material";
import { useState } from "react";

import QRDisplay from "../components/Profile/QRDisplay";
import BioSection from "../components/Profile/BioSection";
import SkillsSection from "../components/Profile/SkillsSection";
import JobPreferences from "../components/Profile/JobPreferences";
import ResumeUploader from "../components/Profile/ResumeUploader";
import ResumeAIFormModal from "../components/Profile/ResumeAIFormModal";
import AutoAwesomeIconGradient from "../components/Icon/AutoAwesomeIcon";

export default function Profile() {
  const [aiModalOpen, setAiModalOpen] = useState(false);

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
            <BioSection />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <SkillsSection />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <JobPreferences />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <ResumeUploader />
          </Paper>
        </Grid>
      </Grid>

      <ResumeAIFormModal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </Container>
  );
}
