import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// -------------------------------------------------------------

export function Logo() {
  return (
    <Typography
      component="p"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontSize: "1.25rem",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "primary.main",
      }}
    >
      <Box
        component="span"
        sx={{
          width: 8, // w-2
          height: 8,
          borderRadius: "50%",
          bgcolor: "secondary.main",
          display: "inline-block",
        }}
      />
      freshmeals
    </Typography>
  );
}
