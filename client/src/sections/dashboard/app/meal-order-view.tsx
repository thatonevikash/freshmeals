"use client";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useGetMeal } from "@/actions/meal";
import { placeOrderApi } from "@/actions/order";

import { LoadingScreen } from "@/components/loading";
import { DashboardContent } from "@/components/layout/main";

export function MealOrderView({ mealId }: { mealId: string }) {
  const router = useRouter();
  const { data: meal, isLoading, error } = useGetMeal(mealId);

  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!mobileNo || !address || quantity < 1) {
      setSubmitError("Please fill all order fields.");
      return;
    }

    try {
      setSubmitError(null);
      setIsSubmitting(true);

      await placeOrderApi({
        delivery_information: { mobile_no: mobileNo, address },
        order_items: [{ type: "Meal", meal: mealId, quantity }],
      });

      router.push("/dashboard/order");
    } catch (e) {
      setSubmitError("Unable to place order right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (error || !meal) return <Alert severity="error">Meal not found.</Alert>;

  return (
    <DashboardContent>
      <Stack spacing={3} sx={{ maxWidth: 760 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Order meal
        </Typography>

        <Card sx={{ p: 2, borderRadius: 3 }}>
          <Stack spacing={2}>
            <CardMedia sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Image
                src={meal.meal_img_url}
                alt={meal.meal_name}
                width={900}
                height={320}
                style={{ width: "100%", height: 240, objectFit: "cover" }}
              />
            </CardMedia>

            <Typography variant="h6">{meal.meal_name}</Typography>
            <Typography color="text.secondary">
              Seller: {meal.seller_information.seller.name}
            </Typography>
          </Stack>
        </Card>

        <Card sx={{ p: 2, borderRadius: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Mobile number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              fullWidth
            />
            <TextField
              label="Delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value) || 1))
              }
              slotProps={{ htmlInput: { min: 1 } }}
              fullWidth
            />

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Box>
              <Button
                variant="contained"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing order..." : "Place order"}
              </Button>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </DashboardContent>
  );
}
