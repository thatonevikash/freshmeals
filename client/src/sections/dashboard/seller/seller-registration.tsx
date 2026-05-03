import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import { registerSellerApi } from "@/actions/seller";

import { useAuth } from "@/auth/hooks/use-auth";

// -------------------------------------------------------------

export function SellerRegistration() {
  const { refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await registerSellerApi();
      await refreshUser();
      setSuccessMessage("You are now registered as a seller.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to register as seller";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
          <StorefrontIcon color="primary" fontSize="large" />
          <Typography variant="h4">Become a FreshMeals Seller</Typography>
        </Stack>

        <Typography color="text.secondary">
          Register your account to start listing meals and managing your menu
          from the seller dashboard.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Chip
            icon={<VerifiedUserIcon />}
            label="Instant activation"
            color="success"
          />
          <Chip label="Secure seller access" variant="outlined" />
          <Chip label="Start creating meals" variant="outlined" />
        </Box>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Box>
          <Button
            loading={isLoading}
            variant="contained"
            size="large"
            onClick={handleRegister}
            startIcon={<StorefrontIcon />}
          >
            Register as Seller
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}
