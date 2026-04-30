"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardNavItem } from "./config-dashboard-nav";
import { LucideIcon } from "lucide-react";
import { useAuthActions } from "@/actions/auth";
import { useAuth } from "@/auth/hooks/use-auth";

// -----------------------------------------------------------------------

function SidebarNavLink({
  href,
  value,
  icon: Icon,
}: {
  href: string;
  value: string;
  icon: LucideIcon;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-green-800 text-white"
          : "text-gray-500 hover:bg-green-50 hover:text-green-800",
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-colors",
          isActive
            ? "text-amber-400 fill-amber-400"
            : "text-gray-400 fill-none",
        )}
      />

      {value}
    </Link>
  );
}

// -----------------------------------------------------------------------

function SidebarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 px-3 py-1 select-none">
      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
      <span className="text-green-800 font-semibold text-base tracking-tight">
        freshmeals
      </span>
    </Link>
  );
}

// -----------------------------------------------------------------------

function SidebarUserProfile() {
  const { user } = useAuth();
  const Auth = useAuthActions();

  const initials = user?.username.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    try {
      await Auth.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/profile"
        className="group flex items-center gap-3 px-3 py-3 rounded-xl border border-gray-200/60 bg-white hover:border-green-200 hover:bg-green-50/60 transition-all duration-150"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-lg bg-green-800 flex items-center justify-center text-white text-xs font-semibold shrink-0">
          {initials}
        </div>

        {/* User info */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-medium text-gray-800 truncate leading-tight">
            {user?.username}
          </span>
          <span className="text-xs text-gray-400 truncate leading-tight">
            {user?.email}
          </span>
        </div>

        {/* Arrow indicator */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-300 group-hover:text-green-600 shrink-0 transition-colors"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Link>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-150 group"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 transition-colors text-gray-300 group-hover:text-red-500"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sign out
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------

export function Sidebar({ navItems }: { navItems: DashboardNavItem[] }) {
  return (
    <aside className="fixed top-0 left-0 h-screen w-60 flex flex-col bg-[#FAFAF7] border-r border-gray-200/60 z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200/60 shrink-0">
        <SidebarLogo />
      </div>

      {/* Nav */}
      <nav
        aria-label="Dashboard navigation"
        className="flex-1 overflow-y-auto px-3 py-4"
      >
        {navItems.map((navItem) => (
          <div key={navItem.section}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
              {navItem.section}
            </p>
            <ul className="flex flex-col gap-0.5">
              {navItem.items.map((item) => (
                <li key={item.path}>
                  <SidebarNavLink
                    href={item.path}
                    value={item.value}
                    icon={item.icon}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className="px-3 py-4 border-t border-gray-200/60 shrink-0">
        <SidebarUserProfile />
      </div>
    </aside>
  );
}
