import { Stack, Typography, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";

export default function ExperienceSection({ experience, setExperience }) {
  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const handleAdd = () => {
    setExperience([
      ...experience,
      {
        company: "",
        title: "",
        location: "",
        duration: "",
        description: "",
        tech: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setExperience(updated);
  };

  return (
    <Stack spacing={3} mt={4}>
      <Typography variant="h6">Experience</Typography>
      {experience.map((entry, idx) => (
        <Grid container spacing={2} key={idx}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Company Name"
              fullWidth
              size="small"
              value={entry.company}
              onChange={(e) => handleChange(idx, "company", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Job Title"
              fullWidth
              size="small"
              value={entry.title}
              onChange={(e) => handleChange(idx, "title", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Location"
              fullWidth
              size="small"
              value={entry.location}
              onChange={(e) => handleChange(idx, "location", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Duration"
              fullWidth
              size="small"
              value={entry.duration}
              onChange={(e) => handleChange(idx, "duration", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              size="small"
              multiline
              rows={3}
              value={entry.description}
              onChange={(e) => handleChange(idx, "description", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="error" onClick={() => handleRemove(idx)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button onClick={handleAdd} variant="outlined">
        Add Experience
      </Button>
    </Stack>
  );
}
