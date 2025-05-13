import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Switch,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
import { styled, useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../routes/routesData";
import { toggleTheme } from "../store/slices/themeSlice";

// Custom styled theme switch
const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      transform: "translateX(28px)",
      "& .MuiSwitch-thumb:before": {
        content: '"🌛"',
        fontSize: "16px",
      },
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.background.default,
    width: 23,
    height: 23,
    marginTop: "4.5px",
    "&:before": {
      content: '"🔆"', // Sun emoji for light mode
      fontSize: "16px",
    },
  },
  "& .MuiSwitch-track": {
    width: "43px",
    borderRadius: 34 / 2,
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
  },
}));

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const navItems = user ? privateRoutes : publicRoutes;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: theme.palette.background.main,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
            }}
          >
            JobSeekAI
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {navItems.map(({ path }, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={path}
                sx={{
                  color: theme.palette.primary.main,
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                }}
              >
                {path.replace("/", "").toUpperCase() || "HOME"}
              </Button>
            ))}
            <ThemeSwitch
              onClick={handleThemeToggle}
              title="Toggle Theme"
              sx={{
                color: "#fff",
              }}
            >
              Theme
            </ThemeSwitch>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: theme.palette.background.paper,
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
              }}
            >
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navItems.map(({ path }, index) => (
              <ListItem
                button
                key={index}
                component={Link}
                to={path}
                onClick={toggleDrawer}
              >
                <ListItemText
                  primary={path.replace("/", "").toUpperCase() || "HOME"}
                  sx={{
                    color: theme.palette.primary.main,
                    fontFamily: "Roboto, sans-serif",
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 0",
            }}
          >
            <ThemeSwitch
              onClick={handleThemeToggle}
              title="Toggle Theme"
              sx={{
                color: "#fff",
              }}
            >
              Theme
            </ThemeSwitch>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
