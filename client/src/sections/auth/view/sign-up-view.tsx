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

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// -----------------------------------------------------------------------

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
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (credentials.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const user = await Auth.signup({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });
      console.log("Sign up success! User:", user);
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
              alignItems: "center",
              flexDirection: "column",
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
              🍱
            </Box>

            <Typography
              sx={{
                color: "common.white",
                fontSize: "1.75rem",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              Start eating
              <br />
              <Box
                component="span"
                sx={{
                  color: "warning.light",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                better today.
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
              Join thousands of people who trust freshmeals for nutritious,
              affordable meals every day.
            </Typography>

            {/* Feature list */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 260,
              }}
            >
              {[
                { icon: "🌿", text: "Fresh, locally sourced ingredients" },
                { icon: "⚡", text: "Delivered in under 30 minutes" },
                { icon: "💚", text: "₹200 off your first order" },
              ].map((item) => (
                <Box
                  key={item.text}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <Typography>{item.icon}</Typography>
                  <Typography
                    sx={{
                      color: "rgba(240,255,240,0.9)",
                      fontSize: "0.75rem",
                      fontWeight: 300,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
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
            py: 5,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
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
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Create an account
            </Typography>
            <Typography
              sx={{ color: "grey.400", fontSize: "0.875rem", fontWeight: 300 }}
            >
              Free to join. No credit card required.
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
              handleSignUp();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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

            {/* Password row */}
            <Box sx={{ display: "flex", gap: 2 }}>
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
            </Box>

            <Typography sx={{ fontSize: "0.75rem", color: "grey.400" }}>
              Must be at least 8 characters long.
            </Typography>

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
                  Creating account...
                </Box>
              ) : (
                "Create account →"
              )}
            </Button>
          </Box>

          {/* Footer */}
          <Typography sx={{ textAlign: "center", mt: 4, color: "grey.400" }}>
            Already have an account?{" "}
            <Link component={RouterLink} href="/login" sx={{ fontWeight: 500 }}>
              Sign in →
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
