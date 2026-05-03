import type { Metadata } from "next";

import { CONFIG } from "@/config-global";
import { SellerView } from "@/sections/dashboard/seller/view";

// -----------------------------------------------------------------------

export const metadata: Metadata = { title: `Dashboard | ${CONFIG.site.name}` };

// -----------------------------------------------------------------------

export default function Page() {
  return <SellerView />;
}
