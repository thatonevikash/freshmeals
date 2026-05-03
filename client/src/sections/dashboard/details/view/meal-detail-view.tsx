"use client";

import { useRouter } from "next/navigation";

import Alert from "@mui/material/Alert";

import { deleteMealApi, useGetMeal } from "@/actions/meal";

import { LoadingScreen } from "@/components/loading";
import { DashboardContent } from "@/components/layout/main";

import { useAuth } from "@/auth/hooks/use-auth";

import { DetailHero } from "../detail-hero";

// -------------------------------------------------------------

export function MealDetailView({ mealId }: { mealId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: meal, isLoading, error } = useGetMeal(mealId);

  const isOwner = user?.id === meal?.seller_information?.seller?.id;

  const handleDelete = async () => {
    await deleteMealApi(mealId);
    router.push("/dashboard/seller");
  };

  if (isLoading) return <LoadingScreen />;
  if (error || !meal) return <Alert severity="error">Meal not found.</Alert>;

  return (
    <DashboardContent>
      <DetailHero
        imageUrl={meal.meal_img_url}
        title={meal.meal_name}
        price={meal.meal_price}
        chipLabel="Meal"
        sellerName={meal.seller_information.seller.name}
        sellerAvatar={meal.seller_information.seller.avatar_url}
        isOwner={!!isOwner}
        onDelete={handleDelete}
        onEdit={() => router.push(`/dashboard/meal/${mealId}/edit`)}
      />
    </DashboardContent>
  );
}
