"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, ChevronRight, LogOut } from "lucide-react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { DashboardNavItem } from "./config-dashboard-nav";
import { useAuthActions } from "@/actions/auth";
import { useAuth } from "@/auth/hooks/use-auth";

const DRAWER_WIDTH = 240;

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
  const theme = useTheme();
  const isActive = pathname === href;

  return (
    <ListItem sx={{ p: 0, mb: 0.5 }}>
      <Button
        LinkComponent={Link}
        href={href}
        startIcon={<Icon size={18} strokeWidth={2} />}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          py: 1.1,
          px: 1.5,
          borderRadius: 1.5,
          fontWeight: 600,
          textTransform: "none",
          color: isActive ? "common.white" : "grey.600",
          bgcolor: isActive ? "success.main" : "transparent",
          "& .MuiButton-startIcon": {
            color: isActive ? "warning.light" : "grey.500",
          },
          "&:hover": {
            bgcolor: isActive
              ? "success.dark"
              : alpha(theme.palette.success.main, 0.08),
          },
        }}
      >
        {value}
      </Button>
    </ListItem>
  );
}

function SidebarLogo() {
  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "warning.light",
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{ color: "success.dark", fontWeight: 700, letterSpacing: -0.2 }}
        >
          freshmeals
        </Typography>
      </Box>
    </Link>
  );
}

function SidebarUserProfile() {
  const { user } = useAuth();
  const Auth = useAuthActions();

  const initials = user?.name?.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    try {
      await Auth.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Button
        LinkComponent={Link}
        href="/profile"
        fullWidth
        sx={{
          justifyContent: "space-between",
          borderRadius: 2,
          p: 1.2,
          border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
          bgcolor: "common.white",
          textTransform: "none",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 0 }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "success.main",
              fontSize: 12,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ minWidth: 0, textAlign: "left" }}>
            <Typography
              variant="body2"
              sx={{ color: "grey.800", fontWeight: 600 }}
              noWrap
            >
              {user?.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.500" }} noWrap>
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <ChevronRight size={14} color="currentColor" />
      </Button>

      <Button
        onClick={handleLogout}
        startIcon={<LogOut size={14} />}
        sx={{
          justifyContent: "flex-start",
          color: "grey.500",
          textTransform: "none",
          borderRadius: 1.5,
        }}
      >
        Sign out
      </Button>
    </Box>
  );
}

export function Sidebar({ navItems }: { navItems: DashboardNavItem[] }) {
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          bgcolor: "grey.50",
          borderRight: (theme) =>
            `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        },
      }}
    >
      <Box sx={{ px: 2, height: 64, display: "flex", alignItems: "center" }}>
        <SidebarLogo />
      </Box>

      <Divider />

      <List sx={{ px: 1.5, py: 2, flex: 1, overflowY: "auto" }}>
        {navItems.map((navItem) => (
          <Box key={navItem.section} sx={{ mb: 2.5 }}>
            <ListSubheader
              disableSticky
              sx={{
                px: 1.5,
                mb: 0.75,
                bgcolor: "transparent",
                color: "grey.500",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.2,
              }}
            >
              {navItem.section}
            </ListSubheader>
            {navItem.items.map((item) => (
              <SidebarNavLink
                key={item.path}
                href={item.path}
                value={item.value}
                icon={item.icon}
              />
            ))}
          </Box>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <SidebarUserProfile />
      </Box>
    </Drawer>
  );
}

export { DRAWER_WIDTH };
