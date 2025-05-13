import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  useTheme,
} from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({ email: "", feedback: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.feedback) return;
    setSubmitted(true);
    // TODO: handle actual submission
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 6, bgcolor: theme.palette.background.default }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.primary, mb: 2 }}
        >
          We'd love to hear from you! Reach out for support, partnership, or
          feedback.
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.primary.main }}
          >
            Email:{" "}
            <span style={{ color: theme.palette.text.primary }}>
              support@jobseekai.com
            </span>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.primary.main }}
          >
            Office:{" "}
            <span style={{ color: theme.palette.text.primary }}>
              +1 234-567-8901
            </span>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.primary.main }}
          >
            Contact Person:{" "}
            <span style={{ color: theme.palette.text.primary }}>
              Amit Kumar
            </span>
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.main, mb: 2 }}
        >
          Send us your feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Email"
            name="email"
            type="email"
            required
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number (optional)"
            name="phone"
            type="tel"
            fullWidth
            margin="normal"
            value={form.phone}
            onChange={handleChange}
          />
          <TextField
            label="Your Feedback"
            name="feedback"
            required
            fullWidth
            margin="normal"
            multiline
            minRows={3}
            value={form.feedback}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
          {submitted && (
            <Typography sx={{ mt: 2, color: theme.palette.primary.main }}>
              Thank you for your feedback!
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
}
