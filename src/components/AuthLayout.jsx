// components/AuthLayout.jsx
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AuthLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",

        flexDirection: { xs: "column", md: "row" },
        overflow: "hidden",
      }}
    >
      {/* Left Brand Panel */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          px: { xs: 3, md: 8 },
          py: { xs: 4, md: 0 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="text.primary" mb={2}>
          JobSeekAI
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 500, mb: 3 }}
        >
          Your AI-powered job companion — craft your resume, generate a tailored
          cover letter, and track your progress — all in one place.
        </Typography>

        <List dense sx={{ maxWidth: 480 }}>
          {[
            "AI-based resume generation",
            "AI-based cover letter creation",
            "Progress tracking for each application",
            "1-click apply with auto-filled resume",
          ].map((text, index) => (
            <ListItem key={index} disableGutters>
              <ListItemIcon
                sx={{ minWidth: 36, color: theme.palette.primary.main }}
              >
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Form Panel */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            p: 4,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
