"use client";

import { DashboardContent } from "@/components/layout/main";

import { useAuth } from "@/auth/hooks/use-auth";

// -----------------------------------------------------------------------

export function DashboardAppView() {
  const { user } = useAuth();

  return <DashboardContent>Hey: {user?.name}</DashboardContent>;
}
