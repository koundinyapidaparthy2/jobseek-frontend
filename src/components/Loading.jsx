import { Box, useTheme } from "@mui/material";

// Animated bouncing dots loader, responsive and visually appealing
export default function Loading() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 120,
        minWidth: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
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
