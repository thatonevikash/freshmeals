"use client";

import { useGetMealCollection } from "@/actions/meal";

import { DashboardContent } from "@/components/layout/main";
import { SellerCollectionMeals } from "../seller-collection-meals";
import { LoadingScreen } from "@/components/loading";
import { useAuth } from "@/auth/hooks/use-auth";
import { SellerRegistration } from "../seller-registration";
import { SellerCreateMeal } from "../seller-create-meal";

// -----------------------------------------------------------------------

export function SellerView() {
  const { user } = useAuth();

  const { data: collection, isLoading, error } = useGetMealCollection();

  // if (isLoading) return <LoadingScreen />;

  console.log(user?.is_registered_seller);

  return (
    <DashboardContent>
      {!user?.is_registered_seller ? (
        <SellerRegistration />
      ) : (
        <SellerCreateMeal />
      )}

      {/* {collection?.meals.length && (
        <SellerCollectionMeals meals={collection.meals} />
      )} */}
    </DashboardContent>
  );
}
