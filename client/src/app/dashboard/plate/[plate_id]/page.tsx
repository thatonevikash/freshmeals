import { PlateDetailView } from "@/sections/dashboard/details/detail-view";

export default async function PlatePage({ params }: { params: Promise<{ plate_id: string }> }) {
  const { plate_id } = await params;
  return <PlateDetailView plateId={plate_id} />;
}
