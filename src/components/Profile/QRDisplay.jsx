import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import QRCode from "react-qr-code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import config from "../../config";
export default function QRDisplay() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const profileUrl = `${config.frontendUrl}/public-profile/${userId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl);
    enqueueSnackbar("Profile link copied!", { variant: "success" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My JobSeekAI Profile",
        url: profileUrl,
      });
    } else {
      enqueueSnackbar("Share not supported on this device.", {
        variant: "warning",
      });
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="subtitle1" mb={2}>
        Share your profile
      </Typography>

      <Box
        sx={{
          display: "inline-block",
          background: "#fff",
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <QRCode value={profileUrl} size={150} />
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Tooltip title="Copy Link">
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1, wordBreak: "break-all", display: "block" }}
      >
        {profileUrl}
      </Typography>
    </Box>
  );
}
