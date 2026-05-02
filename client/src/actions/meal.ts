import useSWR from "swr";

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

  return res.data;
}

export function useGetMeals() {
  const URL = endpoints.general.meal.root;

  return useSWR(URL, fetcher);
}

export function useGetMeal(meal_id: string) {
  const URL = `${endpoints.general.meal.root}/${meal_id}`;

  return useSWR(URL);
}

/* *********************************************************
 * plate
 ********************************************************* */

export async function createMealPlateApi(
  data: Omit<MealPlate, "id" | "seller_information">,
) {
  const URL = endpoints.general.meal.plate;

  const res = await axios.post(URL, data);

  if (res.status !== 201) {
    throw new Error("Unable to create meal!");
  }

  return res.data;
}

export function useGetMealPlates() {
  const URL = endpoints.general.meal.plate;

  return useSWR(URL, fetcher);
}

export function useGetMealPlate(plate_id: string) {
  const URL = `${endpoints.general.meal.plate}/${plate_id}`;

  return useSWR(URL);
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
