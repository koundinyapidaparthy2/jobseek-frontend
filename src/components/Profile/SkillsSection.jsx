import { TextField, Typography, Stack } from "@mui/material";

export default function SkillsSection({ skills, setSkills }) {
  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <Typography variant="h6">Skills</Typography>
      <TextField
        label="Enter your skills (comma separated)"
        fullWidth
        size="small"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
    </Stack>
  );
}
