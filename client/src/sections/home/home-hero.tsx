import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useAuth } from "@/auth/hooks/use-auth";

import { RouterLink } from "@/routes";

// -----------------------------------------------------------------------

export function HomeHero() {
  const { user } = useAuth();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: -10 }}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 500,
            height: 500,
            borderRadius: "100%",
            bgcolor: alpha(theme.palette.success.main, 0.24),
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
            bgcolor: alpha(theme.palette.warning.main, 0.24),
            filter: "blur(64px)",
          })}
        />
      </Box>

      <Box
        sx={{
          maxWidth: "56rem",
          mx: "auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Badge */}
        <Box
          component="span"
          sx={(theme) => ({
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            bgcolor: alpha(theme.palette.success.light, 0.12),
            border: `1px solid ${alpha(theme.palette.success.main, 0.08)}`,
            color: "success.dark",
            fontSize: 12,
            fontWeight: 500,
            px: 1.25,
            py: 0.75,
            borderRadius: 4,
          })}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Fresh meals, delivered daily
        </Box>

        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            color: "grey.900",
            fontSize: {
              xs: "2.5rem", // ~text-4xl
              md: "4.5rem", // ~text-7xl
            },
          }}
        >
          Fresh. Healthy.{" "}
          <Box
            component="span"
            sx={{
              color: "success.dark",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            Affordable.
          </Box>
          <br />
          <Box
            component="span"
            sx={{
              color: "grey.500",
              fontWeight: 300,
              fontSize: {
                xs: "2rem", // ~text-4xl
                md: "3.75rem", // ~text-6xl
              },
            }}
          >
            Meals at your doorstep.
          </Box>
        </Typography>

        {/* Subtext */}
        <Typography
          sx={{
            color: "grey.500",
            fontSize: "1.125rem", // ~text-lg
            fontWeight: 300,
            maxWidth: "36rem", // ~max-w-xl
            lineHeight: 1.625, // ~leading-relaxed
          }}
        >
          freshmeals provides healthy meals at your doorstep at an affordable
          price.{" "}
          <Link
            component={RouterLink}
            href="/login"
            sx={{
              color: "success.dark",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "success.main",
              },
            }}
          >
            Order now →
          </Link>
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Button
            component={RouterLink}
            href={user ? "/dashboard" : "/login"}
            variant="outlined"
            sx={{
              borderRadius: "999px",
              px: 3.5,
              py: 1.5,
              fontSize: "0.875rem",
              fontWeight: 500,
              borderColor: "grey.300",
              color: "text.primary",
              "&:hover": {
                borderColor: "grey.400",
                bgcolor: "common.white",
              },
            }}
          >
            {user ? "Get in" : "Log in"}
          </Button>

          <Button
            component={RouterLink}
            href="/sign-up"
            variant="contained"
            sx={{
              borderRadius: "999px",
              px: 3.5,
              py: 1.5,
              fontSize: "0.875rem",
              fontWeight: 500,
              bgcolor: "success.dark",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "success.main",
                boxShadow: "none",
              },
            }}
          >
            Sign up free →
          </Button>
        </Box>

        {/* Social proof */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 4,
            fontSize: "0.875rem", // text-sm
            color: "grey.400",
          }}
        >
          {/* Avatar group */}
          <Box
            sx={{ display: "flex", "& > *:not(:first-of-type)": { ml: -1 } }}
          >
            {["AN", "MK", "RS"].map((initials) => (
              <Box
                key={initials}
                sx={{
                  width: 28, // w-7
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: "success.light",
                  border: "2px solid",
                  borderColor: "common.white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "success.dark",
                }}
              >
                {initials}
              </Box>
            ))}
          </Box>

          {/* Text */}
          <Typography
            component="span"
            sx={{ fontSize: "inherit", color: "inherit" }}
          >
            Trusted by{" "}
            <Box component="span" sx={{ color: "grey.600", fontWeight: 500 }}>
              10,000+
            </Box>{" "}
            customers
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
