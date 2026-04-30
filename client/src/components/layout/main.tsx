import { cn } from "@/lib/utils";

// -------------------------------------------------------------

export function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("flex flex-col grow shrink-0 basis-0", className)}>
      {children}
    </main>
  );
}

// -------------------------------------------------------------

export function DashboardContent({
  children,
  disablePadding,
}: {
  children: React.ReactNode;
  disablePadding?: boolean;
}) {
  return <div className="p-6 min-w-full">{children}</div>;
}

// -------------------------------------------------------------

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg";
  className?: string;
  disablePadding?: boolean;
}

export function Container({
  children,
  maxWidth = "md",
  className,
  disablePadding = false,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "flex flex-col grow shrink-0 basis-0 mx-auto w-full",
        !disablePadding && "p-16",
        maxWidth === "xs" && "max-w-90",
        maxWidth === "sm" && "max-w-145",
        maxWidth === "md" && "max-w-216",
        maxWidth === "lg" && "max-w-312",
        className,
      )}
    >
      {children}
    </div>
  );
}
