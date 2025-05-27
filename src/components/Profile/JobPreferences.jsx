import { Stack, Typography, TextField } from "@mui/material";

export default function JobPreferences({ form, setForm }) {
  const handleChange = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <Typography variant="h6">Job Preferences</Typography>
      <TextField
        label="Preferred Job Title"
        value={form?.jobTitle || ""}
        onChange={handleChange("jobTitle")}
        fullWidth
        size="small"
      />
      <TextField
        label="Preferred Location"
        value={form?.jobLocation || ""}
        onChange={handleChange("jobLocation")}
        fullWidth
        size="small"
      />
      <TextField
        label="Work Mode (Remote / Onsite / Hybrid)"
        value={form?.jobMode || ""}
        onChange={handleChange("jobMode")}
        fullWidth
        size="small"
      />
    </Stack>
  );
}
