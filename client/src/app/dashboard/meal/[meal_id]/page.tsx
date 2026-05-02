import type { Metadata } from "next";
import { MealDetailView } from "@/sections/dashboard/details/view";
import { CONFIG } from "@/config-global";

// -------------------------------------------------------------

export const metadata: Metadata = {
  title: `Meal details | ${CONFIG.site.name}`,
};

export default async function Page({
  params,
}: {
  params: Promise<{ meal_id: string }>;
}) {
  const { meal_id } = await params;
  return <MealDetailView mealId={meal_id} />;
}
