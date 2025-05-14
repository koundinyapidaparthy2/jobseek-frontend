import { SvgIcon } from "@mui/material";
import AutoAwesome from "@mui/icons-material/AutoAwesome";

export default function AutoAwesomeIconGradient(props) {
  return (
    <SvgIcon {...props}>
      <defs>
        <linearGradient id="aiGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00c6ff" />
          <stop offset="100%" stopColor="#0072ff" />
        </linearGradient>
      </defs>
      <AutoAwesome sx={{ fill: "url(#aiGradient)" }} />
    </SvgIcon>
  );
}
