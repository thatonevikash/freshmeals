"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useAuthActions } from "@/actions/auth";

import { RouterLink } from "@/routes";

// -----------------------------------------------------------------------

interface logInCredentials {
  email: string;
  password: string;
}

// -----------------------------------------------------------------------

export function LogInView() {
  const Auth = useAuthActions();

  const [credentials, setCredentials] = useState<logInCredentials>({
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
      const user = await Auth.login(credentials);
      console.log("Login Success! User:", user);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
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
          maxWidth: 900,
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "grey.200",
          boxShadow: 1,
        }}
      >
        {/* ── Left Panel ── */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flex: 1,
            position: "relative",
            bgcolor: "success.dark",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
            overflow: "hidden",
          }}
        >
          {/* Decorative blobs */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 260,
              height: 260,
              borderRadius: "50%",
              bgcolor: "success.main",
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              bgcolor: "warning.main",
              opacity: 0.2,
            }}
          />

          {/* Content */}
          <Box
            sx={{
              textAlign: "center",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                mb: 3,
              }}
            >
              🥗
            </Box>

            <Typography
              sx={{
                color: "common.white",
                fontSize: "1.75rem",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              Good food,
              <br />
              <Box
                component="span"
                sx={{
                  color: "warning.light",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                every day.
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "rgba(200,230,200,0.8)",
                fontSize: "0.875rem",
                fontWeight: 300,
                mt: 2,
                maxWidth: 260,
                mx: "auto",
              }}
            >
              Healthy chef-crafted meals delivered to your door. Fresh
              ingredients, zero compromise.
            </Typography>
          </Box>
        </Box>

        {/* ── Right Panel ── */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "common.white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, md: 6 },
            py: 6,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "warning.main",
              }}
            />
            <Typography sx={{ color: "success.dark", fontWeight: 600 }}>
              freshmeals
            </Typography>
          </Box>

          {/* Heading */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Welcome back
            </Typography>
            <Typography
              sx={{ color: "grey.400", fontSize: "0.875rem", fontWeight: 300 }}
            >
              Sign in to your account to continue
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Email address"
              name="email"
              type="email"
              value={credentials.email}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              fullWidth
              required
            />

            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ fontSize: "0.875rem" }}>Password</Typography>
                <Link
                  component={RouterLink}
                  href="/forgot-password"
                  sx={{ fontSize: "0.75rem" }}
                >
                  Forgot password?
                </Link>
              </Box>

              <TextField
                name="password"
                type="password"
                value={credentials.password}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                fullWidth
                required
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                borderRadius: "999px",
                py: 1.5,
                bgcolor: "success.dark",
                "&:hover": { bgcolor: "success.main" },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={16} color="inherit" />
                  Signing in...
                </Box>
              ) : (
                "Sign in"
              )}
            </Button>
          </Box>

          {/* Footer */}
          <Typography sx={{ textAlign: "center", mt: 4, color: "grey.400" }}>
            Don&apos;t have an account?{" "}
            <Link
              component={RouterLink}
              href="/sign-up"
              sx={{ fontWeight: 500 }}
            >
              Sign up free →
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
