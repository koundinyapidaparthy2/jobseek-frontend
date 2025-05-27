import { Stack, Typography, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";

export default function EducationSection({ education, setEducation }) {
  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const handleAdd = () => {
    setEducation([
      ...education,
      {
        school: "",
        degree: "",
        field: "",
        location: "",
        gpa: "",
        graduationDate: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    setEducation(updated);
  };

  return (
    <Stack spacing={3} mt={4}>
      <Typography variant="h6">Education</Typography>
      {education.map((entry, idx) => (
        <Grid container spacing={2} key={idx}>
          <Grid item xs={12} md={6}>
            <TextField
              label="School Name"
              fullWidth
              size="small"
              value={entry.school}
              onChange={(e) => handleChange(idx, "school", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Degree"
              fullWidth
              size="small"
              value={entry.degree}
              onChange={(e) => handleChange(idx, "degree", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Field of Study"
              fullWidth
              size="small"
              value={entry.field}
              onChange={(e) => handleChange(idx, "field", e.target.value)}
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
          <Grid item xs={6} md={3}>
            <TextField
              label="GPA"
              fullWidth
              size="small"
              value={entry.gpa}
              onChange={(e) => handleChange(idx, "gpa", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              label="Graduation Date"
              fullWidth
              size="small"
              value={entry.graduationDate}
              onChange={(e) =>
                handleChange(idx, "graduationDate", e.target.value)
              }
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
        Add Education
      </Button>
    </Stack>
  );
}
