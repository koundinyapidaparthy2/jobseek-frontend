import { Container, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ textAlign: "center", pt: 10 }}>
      <Typography variant="h1" sx={{ color: "#FFD700" }}>
        Welcome to JobSeekAI
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Roboto, sans-serif", color: "#ddd" }}>
        Find the best jobs in AI, ML, and Quantum Computing.
      </Typography>

      {/* Get Started Button with Custom Styling */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          px: 4,   // Extra padding
          py: 1.5, // Extra padding
          borderRadius: "50px",  // Makes only this button curvy
          fontWeight: "bold",
          fontSize: "1.1rem",
          textTransform: "none",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#e6c300",  // Slightly brighter gold on hover
          },
        }}
        href="/signup"
      >
        Get Started
      </Button>
    </Container>
  );
}
