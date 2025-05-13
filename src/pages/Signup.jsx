import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupRequest, googleAuthRequest } from "../store/slices/authSlice";
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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSignup = () => {
    setTouched({ email: true, password: true });
    if (!email || !password) return;
    dispatch(signupRequest({ email, password }));
    navigate("/dashboard");
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { email, displayName, uid } = result.user;
      dispatch(googleAuthRequest({ email, name: displayName, googleId: uid }));
      navigate("/dashboard");
    } catch (err) {
      alert("Google signup failed");
    }
  };

  const handleLinkedIn = () => {
    alert("LinkedIn signup not yet implemented.");
  };

  return (
    <AuthLayout>
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Sign Up
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
          onClick={handleSignup}
          sx={{
            py: 1.3,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 2,
          }}
        >
          Sign Up
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 1, color: theme.palette.text.secondary }}
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            Login
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
          Sign up with Google
        </Button>

        <LinkedInButton onClick={handleLinkedIn} />
      </Stack>
    </AuthLayout>
  );
}
