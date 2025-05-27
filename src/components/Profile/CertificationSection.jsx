import { Stack, Typography, TextField, Button, Grid } from "@mui/material";

export default function CertificationSection({
  certifications,
  setCertifications,
}) {
  const handleChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const handleAdd = () => {
    setCertifications([
      ...certifications,
      {
        name: "",
        issuer: "",
        date: "",
        link: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    setCertifications(updated);
  };

  return (
    <Stack spacing={3} mt={4}>
      <Typography variant="h6">Certifications</Typography>
      {certifications.map((entry, idx) => (
        <Grid container spacing={2} key={idx}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Certificate Name"
              fullWidth
              size="small"
              value={entry.name}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Issuer"
              fullWidth
              size="small"
              value={entry.issuer}
              onChange={(e) => handleChange(idx, "issuer", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Issue Date"
              fullWidth
              size="small"
              value={entry.date}
              onChange={(e) => handleChange(idx, "date", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Credential Link"
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
        Add Certificate
      </Button>
    </Stack>
  );
}
