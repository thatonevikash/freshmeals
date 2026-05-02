import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// -------------------------------------------------------------

export function LoadingScreen() {
  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LinearProgress color="warning" sx={{ width: 420 }} />
    </Box>
  );
}
