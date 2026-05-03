"use client";

import { useGetAllMeals, useGetAllPlates } from "@/actions/meal";

import { DashboardContent } from "@/components/layout/main";

// -----------------------------------------------------------------------

export function DashboardAppView() {
  const { data: meals } = useGetAllMeals();

  const { data: plates } = useGetAllPlates();

  console.log({ meals, plates });

  return <DashboardContent>Hey: </DashboardContent>;
}
