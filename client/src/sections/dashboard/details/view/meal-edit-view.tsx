"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { updateMealApi, useGetMeal } from "@/actions/meal";

import { LoadingScreen } from "@/components/loading";
import { DashboardContent } from "@/components/layout/main";

import { EditCard } from "../components/edit-card";
import { MealPlateFields } from "../components/meal-plate-fields";

// -------------------------------------------------------------

export function MealEditView({ mealId }: { mealId: string }) {
  const router = useRouter();
  const { data: meal, isLoading, error } = useGetMeal(mealId);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (meal) {
      setName(meal.meal_name);
      setPrice(String(meal.meal_price));
      setImgUrl(meal.meal_img_url);
    }
  }, [meal]);

  const onSubmit = async () => {
    setSaving(true);
    setMessage("");
    try {
      await updateMealApi(mealId, {
        meal_name: name,
        meal_price: price,
        meal_img_url: imgUrl,
      });
      router.push(`/dashboard/meal/${mealId}`);
    } catch {
      setMessage("Unable to update meal");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (error || !meal) return <Alert severity="error">Meal not found.</Alert>;

  return (
    <DashboardContent>
      <EditCard title="Edit meal" message={message}>
        <MealPlateFields
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
        />
        <Button variant="contained" onClick={onSubmit} loading={saving}>
          Save changes
        </Button>
      </EditCard>
    </DashboardContent>
  );
}
