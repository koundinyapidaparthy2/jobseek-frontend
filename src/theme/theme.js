import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins"; // Import Poppins Font
import "@fontsource/roboto"; // Import Roboto Font
import "@fontsource/montserrat"; // Import Montserrat Font

const themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196F3", // Blue
    },
    secondary: {
      main: "#F50057", // Pink
    },
    background: {
      default: "#fff", // White
      paper: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#2196F3",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif", // Default Global Font
    h1: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "0.9rem",
      lineHeight: 1.5,
    },
    button: { fontFamily: "Poppins, sans-serif", fontWeight: 600 },
  },
});

const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD700", // Gold
    },
    secondary: {
      main: "#8B0000", // Dark Red
    },
    background: {
      default: "#121212", // Black
      paper: "#1E1E1E",
    },
    text: {
      primary: "#ffffff",
      secondary: "#FFD700",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif", // Default Global Font
    h1: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "0.9rem",
      lineHeight: 1.5,
    },
    button: { fontFamily: "Poppins, sans-serif", fontWeight: 600 },
  },
});

export { themeLight, themeDark };
