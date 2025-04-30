import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login({ email }));
    navigate("/dashboard");
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#1E1E1E",
          p: 4,
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#FFD700", fontWeight: "bold", mb: 2 }}>
          Login
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          sx={{
            bgcolor: "#2E2E2E",
            borderRadius: "8px",
            input: { color: "#FFD700" },
            "& label": { color: "#FFD700" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FFD700" },
              "&:hover fieldset": { borderColor: "#E6C300" },
              "&.Mui-focused fieldset": { borderColor: "#FFD700" },
            },
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: "50px",
            background: "linear-gradient(90deg, #FFD700, #E6C300)",
            fontWeight: "bold",
            color: "#121212",
            textTransform: "none",
            fontSize: "1.1rem",
            transition: "0.3s",
            "&:hover": {
              background: "linear-gradient(90deg, #E6C300, #FFD700)",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
