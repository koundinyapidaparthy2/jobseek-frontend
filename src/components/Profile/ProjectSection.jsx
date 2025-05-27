import { Stack, Typography, TextField, Button, Grid } from "@mui/material";

export default function ProjectSection({ projects, setProjects }) {
  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleAdd = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        duration: "",
        link: "",
        tech: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  return (
    <Stack spacing={3} mt={4}>
      <Typography variant="h6">Projects</Typography>
      {projects.map((entry, idx) => (
        <Grid container spacing={2} key={idx}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Project Title"
              fullWidth
              size="small"
              value={entry.title}
              onChange={(e) => handleChange(idx, "title", e.target.value)}
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
              multiline
              fullWidth
              size="small"
              rows={3}
              value={entry.description}
              onChange={(e) => handleChange(idx, "description", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Project Link"
              fullWidth
              size="small"
              value={entry.link}
              onChange={(e) => handleChange(idx, "link", e.target.value)}
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
        Add Project
      </Button>
    </Stack>
  );
}
