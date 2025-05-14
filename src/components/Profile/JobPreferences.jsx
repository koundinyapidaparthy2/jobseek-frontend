import { Stack, Typography, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileRequest } from "../../store/slices/profileSlice";

export default function JobPreferences() {
  const user = useSelector((state) => state.auth.user);
  const [title, setTitle] = useState(user?.jobTitle || "");
  const [location, setLocation] = useState(user?.jobLocation || "");
  const [workMode, setWorkMode] = useState(user?.jobMode || "");

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      updateProfileRequest({
        jobTitle: title,
        jobLocation: location,
        jobMode: workMode,
      })
    );
  };

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <Typography variant="h6">Job Preferences</Typography>
      <TextField
        label="Preferred Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Preferred Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
      />
      <TextField
        label="Work Mode (Remote / Onsite / Hybrid)"
        value={workMode}
        onChange={(e) => setWorkMode(e.target.value)}
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" size="small" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}
