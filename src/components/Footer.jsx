import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
// import Logo from "../assets/logo.svg"; // Replace with your logo path
import { publicRoutes, privateRoutes } from "../routes/routesData"; // Import routes
import socialMediaData from "../utils/socialMediaData"; // Import social media data

export default function Footer() {
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const links = user ? privateRoutes : publicRoutes;

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderTop: "2px solid",
        borderColor: theme.palette.primary.main,
        mt: "auto",
        py: 3,
        px: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Logo Section */}
        <Grid item xs={12} sm={4} textAlign="center">
          {/* <img src={Logo} alt="JobSeekAI Logo" style={{ height: "50px" }} /> */}
        </Grid>

        {/* Links Section */}
        <Grid item xs={12} sm={4} textAlign="center">
          {links.map(({ path, label }, index) => (
            <Link
              key={index}
              href={path}
              underline="hover"
              sx={{
                mx: 1,
                color: theme.palette.text.secondary,
                fontSize: "0.9rem",
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              {label}
            </Link>
          ))}
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} sm={4} textAlign="center">
          {socialMediaData.map(({ name, href, icon: Icon }, index) => (
            <IconButton
              key={index}
              href={href}
              target="_blank"
              aria-label={name}
              sx={{ color: theme.palette.primary.main }}
            >
              <Icon />
            </IconButton>
          ))}
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mt: 2,
          fontSize: "0.8rem",
          color: theme.palette.text.secondary,
        }}
      >
        © {new Date().getFullYear()} JobSeekAI. All Rights Reserved.
      </Typography>
    </Box>
  );
}
