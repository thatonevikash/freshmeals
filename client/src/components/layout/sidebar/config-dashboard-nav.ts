"use client";

import {
  type LucideIcon,
  Tag,
  LayoutDashboard,
  ShoppingCart,
} from "lucide-react";

// -------------------------------------------------------------

export type DashboardNavItem = {
  section: string;
  items: {
    path: string;
    value: string;
    icon: LucideIcon;
  }[];
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    section: "User",
    items: [
      { path: "/dashboard", value: "Dashboard", icon: LayoutDashboard },
      { path: "/dashboard/seller", value: "Seller", icon: Tag },
      { path: "/dashboard/order", value: "Order", icon: ShoppingCart },
    ],
  },
];
