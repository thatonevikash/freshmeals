"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { NavLink } from "./nav-link";
import { Logo } from "@/components/logo";
import { navItems, type NavItem } from "./config-nav";

// -----------------------------------------------------------------------

function NavUl({ navData }: { navData: NavItem[] }) {
  return (
    <Box component="ul" sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      {navData.map((navItem) => (
        <Box component="li" key={navItem.path}>
          <NavLink href={navItem.path} value={navItem.value} />
        </Box>
      ))}
    </Box>
  );
}

// -----------------------------------------------------------------------

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        width: "100%",
        bgcolor: "rgba(250, 250, 247, 0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: 3, // ~px-6
          height: 64, // h-16
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <NavUl navData={navItems} />
      </Container>
    </Box>
  );
}
