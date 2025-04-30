import { BrowserRouter as Router } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Grid2,
} from "@mui/material";
import { Provider } from "react-redux";
import store from "./store/store";
import { themeLight, themeDark } from "./theme/theme";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        {" "}
        {/* Changed to themeLight */}
        <CssBaseline />
        <Router>
          <Grid2 display={"flex"} fle>
            <Header />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: { xs: "70px", md: "100px" }, // ADJUSTS FOR HEADER HEIGHT
                pb: 4, // Prevents Footer from Overlapping
                width: "100%",
              }}
            >
              <Container maxWidth="lg">
                <AppRoutes />
              </Container>
            </Box>
            <Footer />
          </Grid2>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
