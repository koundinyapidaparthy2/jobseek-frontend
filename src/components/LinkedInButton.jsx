// components/LinkedInButton.jsx
import { Button } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function LinkedInButton({ onClick }) {
  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={onClick}
      startIcon={<LinkedInIcon />}
      sx={{
        textTransform: "none",
        fontWeight: 500,
        color: "#0A66C2",
        borderColor: "#0A66C2",
        "&:hover": {
          borderColor: "#004182",
          backgroundColor: "#f3faff",
        },
      }}
    >
      Continue with LinkedIn
    </Button>
  );
}
