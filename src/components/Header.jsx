import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useRef } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice";
import { logout } from "../store/slices/authSlice";
import {
  publicRoutes,
  privateRoutes,
  templatesMenu,
} from "../routes/routesData";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarAnchor, setAvatarAnchor] = useState(null);
  const [templateAnchorEl, setTemplateAnchorEl] = useState(null);
  const isTemplateMenuOpen = Boolean(templateAnchorEl);

  const menuTimeout = useRef(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const navItems = user ? privateRoutes : publicRoutes;

  const handleThemeToggle = () => dispatch(toggleTheme());
  const handleLogout = () => dispatch(logout());

  return (
    <>
      <AppBar
        position="fixed"
        elevation={10}
        sx={{
          backgroundColor: theme.palette.background.default, // THEME-AWARE
          zIndex: 1201,
          borderRadius: 0, // remove any rounding
          padding: "0px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 56,
            px: { xs: 2, md: 3 },
            py: 0.5,
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/dashboard"
            sx={{
              textDecoration: "none",
              color: theme.palette.primary.main,
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              borderRadius: 2,
              px: 1,
            }}
          >
            JobSeekAI
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {privateRoutes
                .filter(
                  ({ label }) =>
                    label !== "Resume" &&
                    label !== "Cover Letter" &&
                    label !== "LinkedIn" &&
                    label !== "Email"
                )
                .map(({ path, label }) => (
                  <Button
                    key={path}
                    component={Link}
                    to={path}
                    sx={{
                      fontSize: "0.875rem",
                      padding: "4px 8px",
                      fontFamily: "Poppins",
                      color:
                        location.pathname === path
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      fontWeight: location.pathname === path ? "bold" : 500,
                      borderBottom:
                        location.pathname === path
                          ? `2px solid ${theme.palette.primary.main}`
                          : "none",
                      borderRadius: 1,
                      textTransform: "none",
                    }}
                  >
                    {label}
                  </Button>
                ))}

              {/* Templates Dropdown */}
              <Box>
                <Button
                  onClick={(e) =>
                    setTemplateAnchorEl((prev) =>
                      prev ? null : e.currentTarget
                    )
                  }
                  endIcon={
                    <ExpandMoreIcon
                      sx={{
                        transition: "0.2s",
                        transform: isTemplateMenuOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  }
                  sx={{
                    fontSize: "0.875rem",
                    padding: "4px 8px",
                    fontFamily: "Poppins",
                    color: theme.palette.text.primary,
                    fontWeight: "medium",
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  Templates
                </Button>

                <Menu
                  anchorEl={templateAnchorEl}
                  open={isTemplateMenuOpen}
                  onClose={() => setTemplateAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      mt: 1,
                      minWidth: 180,
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  {templatesMenu.map(({ path, label }) => (
                    <MenuItem
                      key={path}
                      component={Link}
                      to={path}
                      onClick={() => setTemplateAnchorEl(null)}
                      selected={location.pathname === path}
                      sx={{ borderRadius: 1 }}
                    >
                      {label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          )}

          {/* Controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton onClick={handleThemeToggle} title="Toggle Theme">
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>

            {user && (
              <>
                <IconButton onClick={(e) => setAvatarAnchor(e.currentTarget)}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.name?.charAt(0) || "U"}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={avatarAnchor}
                  open={Boolean(avatarAnchor)}
                  onClose={() => setAvatarAnchor(null)}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      mt: 1,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => setAvatarAnchor(null)}
                    component={Link}
                    to="/profile"
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAvatarAnchor(null);
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRadius: "16px 0 0 16px",
          },
        }}
      >
        <Box sx={{ width: 250, py: 2 }}>
          <Typography
            textAlign="center"
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Navigation
          </Typography>
          <Divider />
          <List>
            {navItems.map(({ path, label }) => (
              <ListItem
                button
                key={path}
                component={Link}
                to={path}
                onClick={() => setDrawerOpen(false)}
                sx={{ borderRadius: 1 }}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button onClick={handleThemeToggle} size="small" variant="outlined">
              Toggle Theme
            </Button>
            {user && (
              <Button
                onClick={() => {
                  setDrawerOpen(false);
                  dispatch(logout());
                }}
                size="small"
                variant="text"
                color="error"
                sx={{ mt: 1 }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
