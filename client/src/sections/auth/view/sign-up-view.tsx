"use client";

import { useState } from "react";

import { BadgeCheck, Sparkles, Timer } from "lucide-react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import { useAuthActions } from "@/actions/auth";
import { RouterLink } from "@/lib/router-link";

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUpView() {
  const Auth = useAuthActions();

  const [credentials, setCredentials] = useState<SignUpCredentials>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSignUp = async () => {
    if (credentials.password !== credentials.confirmPassword)
      return setError("Passwords do not match.");
    if (credentials.password.length < 8)
      return setError("Password must be at least 8 characters.");

    setLoading(true);
    setError("");
    try {
      await Auth.signup({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={(theme) => ({
            display: { xs: "none", md: "flex" },
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            p: 6,
            color: "common.white",
            background: `linear-gradient(160deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
          })}
        >
          <Typography variant="h3" sx={{ color: "common.white", mb: 2 }}>
            Create account
          </Typography>
          <Typography sx={{ color: alpha("#fff", 0.85), mb: 4 }}>
            Join freshmeals and unlock premium food experiences tailored to your
            routine.
          </Typography>
          {[
            { icon: Sparkles, label: "Curated weekly menus" },
            { icon: Timer, label: "Fast delivery slots" },
            { icon: BadgeCheck, label: "Member-only offers" },
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
            Sign up
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Free to join. Start exploring meals today.
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
              handleSignUp();
            }}
            sx={{ display: "grid", gap: 2 }}
          >
            <TextField
              label="Username"
              name="username"
              value={credentials.username}
              onChange={onChange}
              fullWidth
              required
            />
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
            <TextField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={credentials.confirmPassword}
              onChange={onChange}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Create account"
              )}
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontSize: 14,
              }}
            >
              Already have an account?{" "}
              <Link component={RouterLink} href="/login">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
