import { TextField, Typography, Stack, Button, Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileRequest } from "../../store/slices/profileSlice";

export default function SkillsSection() {
  const user = useSelector((state) => state.auth.user);
  const [skills, setSkills] = useState(user?.skills || "");

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateProfileRequest({ skills }));
  };

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <Typography variant="h6">Skills</Typography>
      <TextField
        label="Enter your skills (comma separated)"
        fullWidth
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" size="small" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}
