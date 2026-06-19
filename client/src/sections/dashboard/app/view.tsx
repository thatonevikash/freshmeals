"use client";

import { Star, Store, Clock3, ArrowRight } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import type { Meal } from "@/types/meal.type";

import { useGetAllMeals } from "@/actions/meal";

import { LoadingScreen } from "@/components/loading";
import { DashboardContent } from "@/components/layout/main";

const formatPrice = (price: number | string) => {
  const numericPrice = typeof price === "number" ? price : Number(price);
  const safePrice = Number.isFinite(numericPrice) ? numericPrice : 0;

  return `$${safePrice.toFixed(2)}`;
};

export function DashboardAppView() {
  const { data, isLoading, error } = useGetAllMeals();

  if (isLoading) return <LoadingScreen />;

  const meals: Meal[] = data?.meals ?? [];

  return (
    <DashboardContent>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Discover today&apos;s meals
          </Typography>
          <Typography color="text.secondary">
            Curated dishes from local sellers, designed with the new premium theme system.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 2.5 }}>
              <Typography variant="overline" color="text.secondary">Meals available</Typography>
              <Typography variant="h4">{meals.length}</Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 2.5 }}>
              <Typography variant="overline" color="text.secondary">Avg prep time</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Clock3 size={18} />
                <Typography variant="h6">25-35 mins</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 2.5 }}>
              <Typography variant="overline" color="text.secondary">Top rated</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Star size={18} />
                <Typography variant="h6">4.8 average</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {error ? (
          <Typography color="error.main">Unable to fetch meals.</Typography>
        ) : (
          <Grid container spacing={2.5}>
            {meals.map((meal) => (
              <Grid key={meal.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card sx={{ p: 1.5, height: "100%" }}>
                  <Box sx={{ position: "relative", borderRadius: 2.5, overflow: "hidden" }}>
                    <Image src={meal.meal_img_url} alt={meal.meal_name} width={360} height={220} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                    <Chip
                      size="small"
                      label="Fresh pick"
                      color="secondary"
                      sx={{ position: "absolute", top: 12, left: 12 }}
                    />
                  </Box>

                  <Box sx={{ px: 0.5, pt: 2, pb: 0.5, display: "grid", gap: 1.25 }}>
                    <Typography variant="h6" noWrap>
                      {meal.meal_name}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                      <Typography variant="h6" sx={{ color: "primary.main" }}>
                        {formatPrice(meal.meal_price)}
                      </Typography>
                      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color: "text.secondary" }}>
                        <Store size={14} />
                        <Typography variant="caption" noWrap>
                          {meal.seller_information.seller.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar src={meal.seller_information.seller.avatar_url} alt={meal.seller_information.seller.name} sx={{ width: 28, height: 28 }} />
                      <Typography variant="body2" color="text.secondary" noWrap>
                        Delivered by {meal.seller_information.seller.name}
                      </Typography>
                    </Box>

                    <Button
                      LinkComponent={Link}
                      href={`/dashboard/meal/${meal.id}/order`}
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowRight size={16} />}
                    >
                      Order meal
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </DashboardContent>
  );
}
