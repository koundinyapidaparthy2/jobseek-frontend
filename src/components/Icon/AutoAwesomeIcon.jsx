import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function AutoAwesomeIconGradient({ style = {} }) {
  return (
    <AutoAwesomeIcon
      style={{
        background: "linear-gradient(to right, #00c6ff, #0072ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "1.2rem",
        ...style,
      }}
    />
  );
}
