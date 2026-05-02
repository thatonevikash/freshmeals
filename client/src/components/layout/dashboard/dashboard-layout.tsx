import Box from "@mui/material/Box";

import { Main } from "../main";
import { Sidebar, DRAWER_WIDTH } from "../sidebar";
import { dashboardNavItems } from "../sidebar/config-dashboard-nav";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      <Sidebar navItems={dashboardNavItems} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          ml: `${DRAWER_WIDTH}px`,
          minHeight: "100vh",
        }}
      >
        <Main className="flex-1 flex flex-col">{children}</Main>
      </Box>
    </Box>
  );
}
