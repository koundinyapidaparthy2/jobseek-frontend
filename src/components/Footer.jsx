import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
        component="footer"
        sx={{
            width: "100%",
            bgcolor: "#121212",
            color: "#FFD700",
            textAlign: "center",
            py: 2,
            mt: "auto",
            borderTop: "2px solid #FFD700",
        }}
        >
        <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} JobSeekAI. All Rights Reserved.
        </Typography>
    </Box>

  );
}
