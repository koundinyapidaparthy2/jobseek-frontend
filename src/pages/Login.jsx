import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginRequest, googleAuthRequest } from "../store/slices/authSlice";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../firebase";

import {
  Button,
  Divider,
  TextField,
  Typography,
  Link,
  Stack,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInButton from "../components/LinkedInButton";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = () => {
    setTouched({ email: true, password: true });
    if (!email || !password) return;
    dispatch(loginRequest({ email, password }));
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { email, displayName, uid } = result.user;
      dispatch(googleAuthRequest({ email, name: displayName, googleId: uid }));
    } catch (err) {
      alert("Google login failed");
    }
  };

  const handleLinkedIn = () => {
    alert("LinkedIn login not yet implemented.");
  };

  return (
    <AuthLayout>
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Login
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={touched.email && !email}
          helperText={touched.email && !email ? "Email is required" : ""}
        />

        <TextField
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={touched.password && !password}
          helperText={
            touched.password && !password ? "Password is required" : ""
          }
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            py: 1.3,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 2,
          }}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 1, color: theme.palette.text.secondary }}
        >
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/signup"
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            Sign up
          </Link>
        </Typography>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleGoogle}
          startIcon={<GoogleIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            "&:hover": {
              borderColor: theme.palette.primary.dark,
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          Sign in with Google
        </Button>

        <LinkedInButton onClick={handleLinkedIn} />
      </Stack>
    </AuthLayout>
  );
}
