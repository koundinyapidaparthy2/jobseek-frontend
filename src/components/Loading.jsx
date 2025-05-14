import { Box, useTheme } from "@mui/material";

// Full-screen loader with animated bouncing dots
export default function Loading() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "fixed", // stays on top
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default", // optional background
        zIndex: 9999, // ensure it's above everything
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 1.5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: theme.palette.primary.main,
              animation: "bounce 1s infinite",
              animationDelay: `${i * 0.2}s`,
              "@keyframes bounce": {
                "0%, 80%, 100%": { transform: "scale(1)" },
                "40%": { transform: "scale(1.5)" },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
