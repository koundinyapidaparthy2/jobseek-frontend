import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { publicRoutes, privateRoutes } from "../routes/routesData";
import socialMediaData from "../utils/socialMediaData";

export default function Footer() {
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const links = user ? privateRoutes : publicRoutes;

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.06)", // soft elevation effect
        pt: 4,
        pb: 3,
        px: { xs: 2, md: 6 },
        borderTopLeftRadius: { xs: 12, md: 16 },
        borderTopRightRadius: { xs: 12, md: 16 },
        mt: "auto",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Logo Placeholder (Optional future update) */}
        <Grid item xs={12} sm={4} textAlign="center">
          {/* <img src={Logo} alt="JobSeekAI Logo" style={{ height: "50px" }} /> */}
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={12} sm={4} textAlign="center">
          {links.map(({ path, label }, index) => (
            <Link
              key={index}
              href={path}
              underline="none"
              sx={{
                mx: 1,
                fontSize: "0.85rem",
                color: theme.palette.text.secondary,
                transition: "color 0.2s",
                "&:hover": {
                  color: theme.palette.primary.main,
                  textDecoration: "underline",
                },
              }}
            >
              {label}
            </Link>
          ))}
        </Grid>

        {/* Social Icons */}
        <Grid item xs={12} sm={4} textAlign="center">
          {socialMediaData.map(({ name, href, icon: Icon }, index) => (
            <IconButton
              key={index}
              href={href}
              target="_blank"
              aria-label={name}
              sx={{
                color: theme.palette.primary.main,
                transition: "color 0.2s",
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            >
              <Icon fontSize="small" />
            </IconButton>
          ))}
        </Grid>
      </Grid>

      <Divider sx={{ mt: 3, mb: 2 }} />

      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          fontSize: "0.75rem",
          color: theme.palette.text.secondary,
        }}
      >
        © {new Date().getFullYear()} JobSeekAI. All Rights Reserved.
      </Typography>
    </Box>
  );
}
