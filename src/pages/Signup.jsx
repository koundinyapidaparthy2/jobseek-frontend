import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function Signup() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    dispatch(login({ email }));
    navigate("/dashboard");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>Sign Up</Button>
    </Container>
  );
}
