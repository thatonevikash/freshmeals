import { CenteredLayout } from "@/components/layout/centered";

import { GuestGuard } from "@/auth/guard/guest-guard";

// -----------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <CenteredLayout>{children}</CenteredLayout>;
    </GuestGuard>
  );
}
