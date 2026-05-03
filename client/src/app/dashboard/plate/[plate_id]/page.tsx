import type { Metadata } from "next";

import { CONFIG } from "@/config-global";
import { PlateDetailView } from "@/sections/dashboard/details/view";

// -------------------------------------------------------------

export const metadata: Metadata = {
  title: `Plate details | ${CONFIG.site.name}`,
};

export default async function Page({
  params,
}: {
  params: Promise<{ plate_id: string }>;
}) {
  const { plate_id } = await params;
  return <PlateDetailView plateId={plate_id} />;
}
