import { Container, Typography, Button, Box, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: theme.palette.background.default,
        overflow: "hidden",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          bgcolor: theme.palette.background.paper,
          borderRadius: 6,
          py: 8,
          px: 4,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          position: "relative",
        }}
      >
        {/* Simple animated icon */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "float 2.5s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-20px)" },
            },
          }}
        >
          <img
            src="https://img.icons8.com/ios-filled/100/2979FF/artificial-intelligence.png"
            alt="AI Icon"
            width={80}
            height={80}
            style={{
              filter: `drop-shadow(0 0 10px ${theme.palette.primary.main}88)`,
            }}
          />
        </Box>
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
            letterSpacing: 2,
            mb: 2,
            fontSize: { xs: "2.5rem", md: "4rem" },
          }}
        >
          Welcome to JobSeekAI
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.primary,
            mb: 3,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
          }}
        >
          Discover your dream job in AI, ML, and Quantum Computing.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.secondary.main,
            mb: 4,
            fontSize: "1.2rem",
            fontStyle: "italic",
          }}
        >
          Empowering the next generation of innovators and thinkers.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            px: 5,
            py: 1.7,
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: "1.2rem",
            textTransform: "none",
            color: "#fff",
            boxShadow: `0 2px 8px ${theme.palette.primary.main}55`,
          }}
          href="/signup"
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
