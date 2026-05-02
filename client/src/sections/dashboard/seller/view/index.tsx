"use client";

import { DashboardContent } from "@/components/layout/main";
import { useAuth } from "@/auth/hooks/use-auth";

import { SellerRegistration } from "../seller-registration";
import { SellerCreateMeal } from "../seller-create-meal";

// -----------------------------------------------------------------------

export function SellerView() {
  const { user } = useAuth();

  return (
    <DashboardContent>
      {!user?.is_registered_seller ? <SellerRegistration /> : <SellerCreateMeal />}
    </DashboardContent>
  );
}
