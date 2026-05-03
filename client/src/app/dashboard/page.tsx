import { Metadata } from "next";

import { CONFIG } from "@/config-global";
import { DashboardAppView } from "@/sections/dashboard/app/view";

// -----------------------------------------------------------------------

export const metadata: Metadata = { title: `Dashboard | ${CONFIG.site.name}` };

// -----------------------------------------------------------------------

export default function Page() {
  return <DashboardAppView />;
}
