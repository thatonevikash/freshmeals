import type { Metadata } from "next";
import { PlateDetailView } from "@/sections/dashboard/details/view";
import { CONFIG } from "@/config-global";

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
