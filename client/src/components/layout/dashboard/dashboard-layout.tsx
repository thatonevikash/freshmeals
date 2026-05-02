import Box from "@mui/material/Box";

import { Main } from "../main";
import { Sidebar } from "../sidebar";
import { dashboardNavItems } from "../sidebar/config-dashboard-nav";

// -------------------------------------------------------------

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.100" }}>
      <Sidebar navItems={dashboardNavItems} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Main sx={{ flex: 1 }}>{children}</Main>
      </Box>
    </Box>
  );
}
