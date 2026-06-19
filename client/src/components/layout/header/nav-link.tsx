import Link from "next/link";

import Box from "@mui/material/Box";

export function NavLink({ href, value }: { href: string; value: string }) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        fontSize: 14,
        fontWeight: 500,
        color: "text.secondary",
        textDecoration: "none",
        transition: "color .2s ease",
        "&:hover": { color: "text.primary" },
      }}
    >
      {value}
    </Box>
  );
}
