"use client";

import { useMemo } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { Meal } from "@/types/meal.type";

import {
  deleteMealApi,
  deleteMealPlateApi,
  useGetMeal,
  useGetMealPlate,
} from "@/actions/meal";

import { LoadingScreen } from "@/components/loading";
import { DashboardContent } from "@/components/layout/main";

import { useAuth } from "@/auth/hooks/use-auth";

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
      />
    </DashboardContent>
  );
}

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
      />
    </DashboardContent>
  );
}

// -------------------------------------------------------------

interface DetailHeroProps {
  imageUrl: string;
  title: string;
  price: string;
  chipLabel: string;
  sellerName: string;
  sellerAvatar: string;
  subtitle?: string;
  isOwner: boolean;
  onDelete: () => void;
}

function DetailHero({
  imageUrl,
  title,
  price,
  chipLabel,
  sellerName,
  sellerAvatar,
  subtitle,
  isOwner,
  onDelete,
}: DetailHeroProps) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Box sx={{ position: "relative", height: { xs: 240, md: 360 } }}>
        <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
      </Box>

      <Stack spacing={2} sx={{ p: { xs: 2, md: 3 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ justifyContent: "space-between" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Chip label={chipLabel} color="primary" variant="outlined" />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              ${price}
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack
          spacing={2}
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.2}>
            <Avatar src={sellerAvatar} alt={sellerName} />
            <Typography variant="body2" color="text.secondary">
              Owned by {sellerName}
            </Typography>
          </Stack>

          {isOwner && (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined">Edit</Button>
              <Button color="error" variant="contained" onClick={onDelete}>
                Delete
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
