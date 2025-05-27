import {
  Stack,
  Typography,
  TextField,
  Grid,
  IconButton,
  Box,
  Paper,
  Button,
  Tooltip,
  InputAdornment,
  Fade,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import {
  generateAboutRequest,
  generateAboutSuccess,
  generateAboutFailure,
} from "../../store/slices/profileSlice";
import AutoAwesomeIconGradient from "../Icon/AutoAwesomeIcon";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";

export default function BioSection({ form, setForm }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { generatedAbout, aboutLoading } = useSelector(
    (state) => state.profile
  );

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // 👈 new state

  const handleChange = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

  const handleGenerateClick = () => {
    dispatch(generateAboutRequest());
    setCurrentIndex(0); // Reset to first on new generation
  };

  const handleUse = (text) => {
    setForm((prev) => ({ ...prev, about: text }));
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <Stack spacing={2}>
      {/* Title + Full Name */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Bio</Typography>
      </Box>

      <TextField
        label="Full Name"
        value={form?.name || ""}
        onChange={handleChange("name")}
        fullWidth
        size="small"
      />

      {/* About You + AI Generation */}
      <Stack spacing={2}>
        <TextField
          label="About You"
          multiline
          rows={3}
          fullWidth
          size="small"
          value={form?.about || ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, about: e.target.value }))
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Generate using AI">
                  <IconButton onClick={handleGenerateClick}>
                    <AutoAwesomeIconGradient
                      style={{
                        fontSize: 20,
                        animation: aboutLoading
                          ? "glowPulse 1.5s infinite ease-in-out"
                          : "none",
                        color: theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              animation: aboutLoading
                ? "glowBorder 2s infinite ease-in-out"
                : "none",
              transition: "all 0.3s ease",
            },
            "@keyframes glowBorder": {
              "0%": { boxShadow: "0 0 5px #00c6ff" },
              "50%": { boxShadow: "0 0 15px #0072ff" },
              "100%": { boxShadow: "0 0 5px #00c6ff" },
            },
            "@keyframes glowPulse": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.5 },
              "100%": { opacity: 1 },
            },
          }}
        />

        {/* Carousel-style Suggestion Display */}
        {generatedAbout?.length > 0 && (
          <Fade in={generatedAbout?.length > 0}>
            <Box>
              {/* Title and regenerate */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <Box display="flex" alignItems="center">
                  <AutoAwesomeIconGradient sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    AI Suggestions
                  </Typography>
                </Box>

                <Tooltip title="Regenerate Summaries">
                  <IconButton onClick={handleGenerateClick}>
                    <RepeatRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Suggestion Box */}
              <Box
                display="flex"
                justifyContent="center"
                sx={{ position: "relative" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    pt: 5,
                    maxWidth: 700,
                    minHeight: 120,
                    borderRadius: 3,
                    backgroundColor: "#fdfdfd",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
                    border: "1px solid #e0e0e0",
                    position: "relative",
                  }}
                >
                  {/* Arrows inside top right */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 12,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => setCurrentIndex((prev) => prev - 1)}
                      disabled={currentIndex === 0}
                    >
                      <ArrowCircleLeftRoundedIcon fontSize="medium" />
                    </IconButton>
                    <IconButton
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      disabled={currentIndex === generatedAbout.length - 1}
                    >
                      <ArrowCircleRightRoundedIcon fontSize="medium" />
                    </IconButton>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {generatedAbout[currentIndex]}
                    </Typography>

                    <Button
                      onClick={() => handleUse(generatedAbout[currentIndex])}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    >
                      Use
                    </Button>
                    <IconButton
                      onClick={() =>
                        handleCopy(generatedAbout[currentIndex], currentIndex)
                      }
                      size="small"
                    >
                      {copiedIndex === currentIndex ? (
                        <CheckIcon color="success" />
                      ) : (
                        <ContentCopyIcon />
                      )}
                    </IconButton>
                  </Box>
                </Paper>
              </Box>

              {/* Index display */}
              <Box mt={1} textAlign="center">
                <Typography variant="caption" color="text.secondary">
                  {currentIndex + 1} / {generatedAbout.length}
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}
      </Stack>

      {/* Location and Contact Details — unchanged */}
      <TextField
        label="Location"
        value={form?.location || ""}
        onChange={handleChange("location")}
        fullWidth
        size="small"
      />

      <Grid container>
        <Grid item xs={12} md={6} sx={{ pr: 1, pb: 1 }}>
          <TextField
            label="Phone Number"
            value={form?.phone || ""}
            onChange={handleChange("phone")}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pl: 1, pb: 1 }}>
          <TextField
            label="Additional Phone Number"
            value={form?.altPhone || ""}
            onChange={handleChange("altPhone")}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pr: 1, pt: 1 }}>
          <TextField
            label="Email"
            value={form?.email || ""}
            onChange={handleChange("email")}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pl: 1, pt: 1 }}>
          <TextField
            label="Additional Email"
            value={form?.altEmail || ""}
            onChange={handleChange("altEmail")}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      {/* Social Links */}
      <Typography variant="subtitle1" mt={2}>
        Social Links
      </Typography>
      <TextField
        label="LinkedIn URL"
        value={form?.linkedin || ""}
        onChange={handleChange("linkedin")}
        fullWidth
        size="small"
      />
      <TextField
        label="GitHub URL"
        value={form?.github || ""}
        onChange={handleChange("github")}
        fullWidth
        size="small"
      />
      <TextField
        label="Portfolio URL"
        value={form?.portfolio || ""}
        onChange={handleChange("portfolio")}
        fullWidth
        size="small"
      />
      <TextField
        label="Other Links (Hackathons, Blogs, etc)"
        value={form?.otherLinks || ""}
        onChange={handleChange("otherLinks")}
        fullWidth
        size="small"
        multiline
        rows={2}
        placeholder="Separate multiple links with commas"
      />
    </Stack>
  );
}
