import { Main } from "../main";
import { Sidebar } from "../sidebar";
import { dashboardNavItems } from "../sidebar/config-dashboard-nav";

// -----------------------------------------------------------------------

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FAFAF7]">
      <Sidebar navItems={dashboardNavItems} />

      <div className="flex flex-col flex-1 ml-60 min-h-screen">
        <Main className="flex-1 flex flex-col">{children}</Main>
      </div>
    </div>
  );
}
