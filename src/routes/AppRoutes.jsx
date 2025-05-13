import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
import { Suspense } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import { lightTheme, darkTheme } from "../theme/theme";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicRoutes, privateRoutes } from "./routesData";
import Loading from "../components/Loading";
import { history } from "../utils/history";

function PublicRoute() {
  const user = useSelector((state) => state.auth.user);
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
}

function PrivateRoute() {
  const user = useSelector((state) => state.auth.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

function LayoutWithOptionalHeaderFooter({ children }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const isPublicPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Conditionally show Header/Footer */}
      {user && <Header />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: isPublicPage ? "center" : "flex-start",
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        <Container
          sx={{
            width: "100%",
            padding: "0 !important",
          }}
        >
          {children}
        </Container>
      </Box>
      {user && <Footer />}
    </Box>
  );
}

export default function AppRoutes() {
  const user = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) =>
    state.theme.currentTheme === "light" ? lightTheme : darkTheme
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <HistoryRouter history={history}>
        <Suspense fallback={<Loading />}>
          <LayoutWithOptionalHeaderFooter>
            <Routes>
              {/* Default entry: redirect based on auth */}
              <Route
                path="/"
                element={
                  user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                }
              />

              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                {publicRoutes.map(({ path, element: Element }, index) => (
                  <Route key={index} path={path} element={<Element />} />
                ))}
              </Route>

              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                {privateRoutes.map(({ path, element: Element }, index) => (
                  <Route key={index} path={path} element={<Element />} />
                ))}
              </Route>

              {/* Catch-all fallback: redirect to login */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LayoutWithOptionalHeaderFooter>
        </Suspense>
      </HistoryRouter>
    </ThemeProvider>
  );
}
