import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice"; // Updated import
import { Container, Button, Typography } from "@mui/material";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Container>
      <Typography variant="h4">Welcome, {user?.email}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </Container>
  );
}
