import type { Metadata } from "next";

import { CONFIG } from "@/config-global";
import { PlateEditView } from "@/sections/dashboard/details/view";

export const metadata: Metadata = {
  title: `Edit plate | ${CONFIG.site.name}`,
};

export default async function Page({
  params,
}: {
  params: Promise<{ plate_id: string }>;
}) {
  const { plate_id } = await params;
  return <PlateEditView plateId={plate_id} />;
}
