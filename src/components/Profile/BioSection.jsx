import { Stack, Typography, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileRequest } from "../../store/slices/profileSlice";

export default function BioSection() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    phone: user?.phone || "",
    altPhone: user?.altPhone || "",
    email: user?.email || "",
    altEmail: user?.altEmail || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSave = () => {
    dispatch(updateProfileRequest(form));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Bio</Typography>

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
        multiline
        rows={3}
        fullWidth
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone Number"
            value={form.phone}
            onChange={handleChange("phone")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Additional Phone Number"
            value={form.altPhone}
            onChange={handleChange("altPhone")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange("email")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Additional Email"
            value={form.altEmail}
            onChange={handleChange("altEmail")}
            fullWidth
          />
        </Grid>
      </Grid>

      <Typography variant="subtitle1" mt={2}>
        Social Links
      </Typography>

      <TextField
        label="LinkedIn URL"
        value={form.linkedin}
        onChange={handleChange("linkedin")}
        fullWidth
      />
      <TextField
        label="GitHub URL"
        value={form.github}
        onChange={handleChange("github")}
        fullWidth
      />

      <Button
        variant="contained"
        size="small"
        sx={{ width: "fit-content", alignSelf: "flex-end", mt: 1 }}
        onClick={handleSave}
      >
        Save Bio
      </Button>
    </Stack>
  );
}
