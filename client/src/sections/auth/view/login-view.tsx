"use client";

import { useState } from "react";
import { Leaf, Truck, ShieldCheck } from "lucide-react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { RouterLink } from "@/lib/router-link";

import { useAuthActions } from "@/actions/auth";

interface LogInCredentials {
  email: string;
  password: string;
}

export function LogInView() {
  const Auth = useAuthActions();

  const [credentials, setCredentials] = useState<LogInCredentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await Auth.login(credentials);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Box
          sx={(theme) => ({
            display: { xs: "none", md: "flex" },
            flex: 1,
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
            p: 6,
            color: "common.white",
            background: `linear-gradient(160deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          })}
        >
          <Typography variant="h3" sx={{ color: "common.white", mb: 2 }}>
            Welcome back
          </Typography>
          <Typography sx={{ color: alpha("#fff", 0.85), mb: 4 }}>
            Continue your premium meal journey with fresh ingredients and
            predictable delivery.
          </Typography>
          {[
            { icon: Leaf, label: "Nutrition-balanced menus" },
            { icon: Truck, label: "Reliable daily delivery" },
            { icon: ShieldCheck, label: "Quality assured kitchens" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Box
                key={item.label}
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
              >
                <Icon size={18} />
                <Typography sx={{ color: alpha("#fff", 0.9) }}>
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, md: 6 },
            py: 6,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "secondary.main",
              }}
            />
            <Typography sx={{ color: "primary.main", fontWeight: 700 }}>
              freshmeals
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Sign in
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Access your orders and meal plans.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            sx={{ display: "grid", gap: 2.25 }}
          >
            <TextField
              label="Email address"
              name="email"
              type="email"
              value={credentials.email}
              onChange={onChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={onChange}
              fullWidth
              required
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                component={RouterLink}
                href="/forgot-password"
                sx={{ fontSize: 13 }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontSize: 14,
              }}
            >
              Don&apos;t have an account?{" "}
              <Link component={RouterLink} href="/sign-up">
                Create one
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
