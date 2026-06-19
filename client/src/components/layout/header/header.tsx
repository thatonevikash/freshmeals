"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { RouterLink } from "@/lib/router-link";

import { Logo } from "@/components/logo";

import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { navItems, type NavItem } from "./config-nav";

function NavUl({ navData }: { navData: NavItem[] }) {
  return (
    <Box
      component="ul"
      sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}
    >
      {navData.map((navItem) => (
        <Box component="li" key={navItem.path}>
          <NavLink href={navItem.path} value={navItem.value} />
        </Box>
      ))}
    </Box>
  );
}

export function Header() {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
        width: "100%",
        // bgcolor: alpha(theme.palette.common.white, 0.12),
        // boxShadow: "0 8px 24px rgba(31,31,28,0.08)",
      })}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: 3,
          height: 84,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Logo />
        <NavUl navData={navItems} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <ThemeToggle />
          <Button
            component={RouterLink}
            size="medium"
            href="/login"
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
