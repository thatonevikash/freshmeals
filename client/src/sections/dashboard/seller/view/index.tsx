"use client";

import { useGetMealCollection } from "@/actions/meal";

import { LoadingScreen } from "@/components/loading";
import { DashboardContent } from "@/components/layout/main";

import { useAuth } from "@/auth/hooks/use-auth";

import { SellerCollection } from "../seller-collection";
import { SellerCreateMeal } from "../seller-create-meal";
import { SellerRegistration } from "../seller-registration";

// -----------------------------------------------------------------------

export function SellerView() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const {
    data: collection,
    isLoading: isCollectionLoading,
    error,
  } = useGetMealCollection();

  const isLoading = isAuthLoading || isCollectionLoading;

  if (isLoading) return <LoadingScreen />;

  if (!isLoading && error) return <>Something went wrong!</>;

  return (
    <DashboardContent>
      {!user?.is_registered_seller ? (
        <SellerRegistration />
      ) : (
        <SellerCreateMeal />
      )}

      <SellerCollection collection={collection} />
    </DashboardContent>
  );
}
