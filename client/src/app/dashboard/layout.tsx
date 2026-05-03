"use client";

import { DashboardLayout } from "@/components/layout/dashboard";

import { AuthGuard } from "@/auth/guard/auth-guard";

// -----------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
