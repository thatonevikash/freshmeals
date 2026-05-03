"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";

import { DashboardContent } from "@/components/layout/main";
import { LoadingScreen } from "@/components/loading";
import {
  addMealToPlateApi,
  removeMealFromPlateApi,
  updateMealApi,
  updateMealPlateApi,
  useGetMeal,
  useGetMealPlate,
  useGetMeals,
} from "@/actions/meal";

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
        <MealPlateFields name={name} setName={setName} price={price} setPrice={setPrice} imgUrl={imgUrl} setImgUrl={setImgUrl} />
        <Button variant="contained" onClick={onSubmit} loading={saving}>Save changes</Button>
      </EditCard>
    </DashboardContent>
  );
}

export function PlateEditView({ plateId }: { plateId: string }) {
  const router = useRouter();
  const { data: plate, isLoading, error } = useGetMealPlate(plateId);
  const { data: mealsData } = useGetMeals();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (plate) {
      setName(plate.plate_name);
      setPrice(String(plate.plate_price));
      setImgUrl(plate.plate_img_url);
    }
  }, [plate]);

  const mealIdsInPlate = new Set((plate?.plate_items || []).map((m: any) => m.id));
  const meals = mealsData || [];

  const onSubmit = async () => {
    setSaving(true);
    setMessage("");
    try {
      await updateMealPlateApi(plateId, {
        plate_name: name,
        plate_price: price,
        plate_img_url: imgUrl,
      });
      router.push(`/dashboard/plate/${plateId}`);
    } catch {
      setMessage("Unable to update plate");
    } finally {
      setSaving(false);
    }
  };

  const onToggle = async (mealId: string, checked: boolean) => {
    try {
      if (checked) await addMealToPlateApi(plateId, mealId);
      else await removeMealFromPlateApi(plateId, mealId);
    } catch {
      setMessage("Unable to update plate items");
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (error || !plate) return <Alert severity="error">Plate not found.</Alert>;

  return (
    <DashboardContent>
      <EditCard title="Edit plate" message={message}>
        <MealPlateFields name={name} setName={setName} price={price} setPrice={setPrice} imgUrl={imgUrl} setImgUrl={setImgUrl} />

        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Meals in plate</Typography>
          <Stack>
            {meals.map((meal: any) => (
              <FormControlLabel
                key={meal.id}
                control={<Checkbox checked={mealIdsInPlate.has(meal.id)} onChange={(_, checked) => onToggle(meal.id, checked)} />}
                label={`${meal.meal_name} ($${meal.meal_price})`}
              />
            ))}
          </Stack>
        </Box>

        <Button variant="contained" onClick={onSubmit} loading={saving}>Save changes</Button>
      </EditCard>
    </DashboardContent>
  );
}

function EditCard({ title, message, children }: any) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">{title}</Typography>
        {message && <Alert severity="error">{message}</Alert>}
        {children}
      </Stack>
    </Card>
  );
}

function MealPlateFields({ name, setName, price, setPrice, imgUrl, setImgUrl }: any) {
  return (
    <Stack spacing={2}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
      <TextField label="Image URL" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} fullWidth />
    </Stack>
  );
}
