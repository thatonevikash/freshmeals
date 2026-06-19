import { Clock3, Leaf, ShieldCheck } from "lucide-react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useAuth } from "@/auth/hooks/use-auth";

import { RouterLink } from "@/lib/router-link";

const trustItems = [
  { label: "Fresh daily", icon: Leaf },
  { label: "On-time delivery", icon: Clock3 },
  { label: "Quality assured", icon: ShieldCheck },
];

export function HomeHero() {
  const { user } = useAuth();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "calc(90vh - 72px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        px: 2,
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: -10 }}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 500,
            height: 500,
            borderRadius: "100%",
            bgcolor: alpha(theme.palette.primary.main, 0.2),
            filter: "blur(64px)",
          })}
        />
        <Box
          sx={(theme) => ({
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: 500,
            height: 500,
            borderRadius: "100%",
            bgcolor: alpha(theme.palette.secondary.main, 0.2),
            filter: "blur(64px)",
          })}
        />
      </Box>

      <Box
        sx={{
          maxWidth: "58rem",
          mx: "auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Box
          component="span"
          sx={(theme) => ({
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            bgcolor: alpha(theme.palette.primary.light, 0.15),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            color: "primary.dark",
            fontSize: 12,
            fontWeight: 600,
            px: 1.5,
            py: 0.8,
            borderRadius: 4,
          })}
        >
          Curated premium meals • Delivered daily
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            letterSpacing: "-0.0125em",
            lineHeight: 1.1,
            color: "text.primary",
            fontSize: { xs: "2.3rem", md: "5.2rem" },
          }}
        >
          Treat yourself with
          <Box component="span" sx={{ color: "success.main", ml: 2 }}>
            Freshmeals
          </Box>
        </Typography>

        <Typography variant="h2">
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              fontSize: { xs: "1.5rem", md: "2.3rem" },
            }}
          >
            thoughtfully prepared for modern routines.
          </Box>
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mt: 1 }}
        >
          <Button
            size="large"
            component={RouterLink}
            href={user ? "/dashboard" : "/login"}
            variant="outlined"
          >
            {user ? "Go to dashboard" : "Log in"}
          </Button>
          <Button
            size="large"
            component={RouterLink}
            href="/sign-up"
            variant="contained"
          >
            Order now
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mt: 2 }}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <Box
                key={item.label}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  borderRadius: 999,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Icon size={16} />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 12,
                    color: "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
