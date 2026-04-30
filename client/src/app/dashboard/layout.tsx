"use client";

import { AuthGuard } from "@/auth/guard/auth-guard";
import { DashboardLayout } from "@/components/layout/dashboard";

// -----------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
