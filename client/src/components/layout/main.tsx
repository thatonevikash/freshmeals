import Box from "@mui/material/Box";

import type { SxProps } from "@mui/material";

// -------------------------------------------------------------

export function Main({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) {
  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", flex: "1 0 0", ...sx }}
    >
      {children}
    </Box>
  );
}

// -------------------------------------------------------------

export function DashboardContent({
  children,
  disablePadding = false,
}: {
  children: React.ReactNode;
  disablePadding?: boolean;
}) {
  return (
    <Box sx={[{ p: 3, minWidth: "100%" }, disablePadding && { p: 0 }]}>
      {children}
    </Box>
  );
}
