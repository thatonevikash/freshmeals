"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
import { LoadingScreen } from "@/components/loading";

// -----------------------------------------------------------------------

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <LoadingScreen />;

  return <>{children}</>;
}
