import { GuestGuard } from "@/auth/guard/guest-guard";
import { CenteredLayout } from "@/components/layout/centered";

// -----------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <CenteredLayout>{children}</CenteredLayout>;
    </GuestGuard>
  );
}
