import { MealDetailView } from "@/sections/dashboard/details/detail-view";

export default async function MealPage({ params }: { params: Promise<{ meal_id: string }> }) {
  const { meal_id } = await params;
  return <MealDetailView mealId={meal_id} />;
}
