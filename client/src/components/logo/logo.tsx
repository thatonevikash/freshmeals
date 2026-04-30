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
        color: "success.dark",
      }}
    >
      <Box
        component="span"
        sx={{
          width: 8, // w-2
          height: 8,
          borderRadius: "50%",
          bgcolor: "warning.main", // amber-400 equivalent
          display: "inline-block",
        }}
      />
      freshmeals
    </Typography>
  );
}
