import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome back, {user?.name || user?.email}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* 🔥 Daily Streak */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                🔥 Daily Activity Streak
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                You've maintained a 3-day streak! Keep applying 🚀
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 📄 Recent Templates */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                📄 Recent Templates
              </Typography>
              <ul style={{ marginTop: "8px" }}>
                <li>Frontend Resume</li>
                <li>React Cover Letter</li>
                <li>Startup Pitch Email</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* 🧠 AI Suggestions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                🧠 AI Suggestion
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Based on your experience, try applying for “UI Engineer @
                Google”
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ✍️ Quick Actions */}
      <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained">Create Resume</Button>
        <Button variant="outlined">Generate Cover Letter</Button>
        <Button variant="outlined">Start AI Chat</Button>
        <Button variant="text" color="error" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
