"use client";

import { useAuth } from "@/auth/hooks/use-auth";
import { DashboardContent } from "@/components/layout/main";

// -----------------------------------------------------------------------

export function DashboardAppView() {
  const { user } = useAuth();

  return <DashboardContent>Hey: {user?.username}</DashboardContent>;
}
