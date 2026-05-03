import type { Metadata } from "next";

import { SimpleLayout } from "@/components/layout/simple";

import { GuestGuard } from "@/auth/guard/guest-guard";

// -----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "freshmeals",
  description:
    "freshmeals - get your favourite meals at your doorstep | order now",
};

// -----------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <SimpleLayout>{children}</SimpleLayout>;
    </GuestGuard>
  );
}
