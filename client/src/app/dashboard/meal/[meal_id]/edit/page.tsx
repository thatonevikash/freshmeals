import type { Metadata } from "next";

import { CONFIG } from "@/config-global";
import { MealEditView } from "@/sections/dashboard/details/view";

export const metadata: Metadata = {
  title: `Edit meal | ${CONFIG.site.name}`,
};

export default async function Page({
  params,
}: {
  params: Promise<{ meal_id: string }>;
}) {
  const { meal_id } = await params;
  return <MealEditView mealId={meal_id} />;
}
