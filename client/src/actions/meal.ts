import useSWR, { mutate } from "swr";

import axios, { endpoints, fetcher } from "@/lib/axios";
import type { Meal, MealPlate } from "@/types/meal.type";

// -------------------------------------------------------------

/* *********************************************************
 * meal
 ********************************************************* */

export async function createMealApi(
  data: Omit<Meal, "id" | "seller_information">,
) {
  const URL = endpoints.general.meal.root;

  const res = await axios.post(URL, data);

  if (res.status !== 201) {
    throw new Error("Unable to create meal!");
  }

  mutate(endpoints.general.meal.collection);

  return res.data;
}

export function useGetMeals() {
  const URL = endpoints.general.meal.root;

  return useSWR(URL, fetcher);
}

export function useGetMeal(meal_id: string) {
  const URL = `${endpoints.general.meal.root}/${meal_id}`;

  return useSWR(URL, fetcher);
}

export async function updateMealApi(
  id: string,
  data: Omit<Meal, "id" | "seller_information">,
) {
  const URL = `${endpoints.general.meal.root}/${id}`;

  const res = await axios.put(URL, data);

  if (res.status !== 201) {
    throw new Error("Unable to update meal!");
  }

  mutate(endpoints.general.meal.collection);

  return res.data;
}

export async function deleteMealApi(id: string) {
  const URL = `${endpoints.general.meal.root}/${id}`;

  const res = await axios.delete(URL);

  if (res.status !== 200) {
    throw new Error("Unable to delete meal!");
  }

  mutate(endpoints.general.meal.collection);

  return res.data;
}

/* *********************************************************
 * plate
 ********************************************************* */

export async function createMealPlateApi(
  data: Pick<MealPlate, "plate_name" | "plate_price" | "plate_img_url"> & { plate_items: string[] },
) {
  const URL = endpoints.general.meal.plate;

  const res = await axios.post(URL, data);

  if (res.status !== 201) {
    throw new Error("Unable to create meal!");
  }

  mutate(endpoints.general.meal.collection);

  return res.data;
}

export function useGetMealPlates() {
  const URL = endpoints.general.meal.plate;

  return useSWR(URL, fetcher);
}

export function useGetMealPlate(plate_id: string) {
  const URL = `${endpoints.general.meal.plate}/${plate_id}`;

  return useSWR(URL, fetcher);
}

export async function deleteMealPlateApi(id: string) {
  const URL = `${endpoints.general.meal.plate}/${id}`;

  const res = await axios.delete(URL);

  if (res.status !== 200) {
    throw new Error("Unable to delete meal plate!");
  }

  mutate(endpoints.general.meal.collection);

  return res.data;
}

export function useGetMostOrderedMeals() {
  const URL = endpoints.general.meal.most_ordered.item;

  return useSWR(URL, fetcher);
}

export function useGetMostOrderedPlates() {
  const URL = endpoints.general.meal.most_ordered.plate;

  return useSWR(URL, fetcher);
}

export function useGetMealCollection() {
  const URL = endpoints.general.meal.collection;

  return useSWR(URL, fetcher);
}
