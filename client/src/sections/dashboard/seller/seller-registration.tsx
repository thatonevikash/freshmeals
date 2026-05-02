import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { registerSellerApi } from "@/actions/seller";

// -------------------------------------------------------------

export function SellerRegistration() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await registerSellerApi();
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Join as a seller!
      </Typography>

      <Button loading={isLoading} onClick={handleRegister} variant="contained">
        Register
      </Button>
    </Card>
  );
}
