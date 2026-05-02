"use client";

import { useGetMealCollection } from "@/actions/meal";

import { DashboardContent } from "@/components/layout/main";
import { SellerCollectionMeals } from "../seller-collection-meals";

// -----------------------------------------------------------------------

export function SellerView() {
  const { data: collection, isLoading, error } = useGetMealCollection();

  console.log(collection);

  return (
    <DashboardContent>
      <SellerCollectionMeals meals={collection.meals} />
    </DashboardContent>
  );
}
