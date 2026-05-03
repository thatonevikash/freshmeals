"use client";

import { useMemo } from "react";

import { useRouter } from "next/navigation";

import Alert from "@mui/material/Alert";

import { Meal } from "@/types/meal.type";

import { deleteMealPlateApi, useGetMealPlate } from "@/actions/meal";

import { LoadingScreen } from "@/components/loading";
import { DashboardContent } from "@/components/layout/main";

import { useAuth } from "@/auth/hooks/use-auth";

import { DetailHero } from "../detail-hero";

// -------------------------------------------------------------

export function PlateDetailView({ plateId }: { plateId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: plate, isLoading, error } = useGetMealPlate(plateId);

  const isOwner = user?.id === plate?.seller_information?.seller?.id;

  const handleDelete = async () => {
    await deleteMealPlateApi(plateId);
    router.push("/dashboard/seller");
  };

  const subtitle = useMemo(
    () => plate?.plate_items?.map((item: Meal) => item.meal_name).join(" • "),
    [plate?.plate_items],
  );

  if (isLoading) return <LoadingScreen />;
  if (error || !plate) return <Alert severity="error">Plate not found.</Alert>;

  return (
    <DashboardContent>
      <DetailHero
        imageUrl={plate.plate_img_url}
        title={plate.plate_name}
        price={plate.plate_price}
        chipLabel={`${plate.plate_items.length} meals`}
        subtitle={subtitle}
        sellerName={plate.seller_information.seller.name}
        sellerAvatar={plate.seller_information.seller.avatar_url}
        isOwner={!!isOwner}
        onDelete={handleDelete}
        onEdit={() => router.push(`/dashboard/plate/${plateId}/edit`)}
      />
    </DashboardContent>
  );
}
