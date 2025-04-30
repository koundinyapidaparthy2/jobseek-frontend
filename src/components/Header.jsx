import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ background: "linear-gradient(135deg, #000000, #333333)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          <Typography variant="h6" sx={{ color: "#FFD700", fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}>
            JobSeekAI
          </Typography>

          <div sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path} sx={{ color: "gold", fontFamily: "Poppins, sans-serif" }}>
                {item.text}
              </Button>
            ))}
            <Button variant="contained" color="secondary" component={Link} to="/login" sx={{ fontFamily: "Poppins, sans-serif" }}>
              Login
            </Button>
          </div>

          <IconButton color="inherit" edge="end" sx={{ display: { xs: "block", md: "none" } }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer}>
              <ListItemText primary={item.text} sx={{ color: "black", fontFamily: "Roboto, sans-serif" }} />
            </ListItem>
          ))}
          <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
            <ListItemText primary="Login" sx={{ fontWeight: "bold", color: "#8B0000", fontFamily: "Poppins, sans-serif" }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
